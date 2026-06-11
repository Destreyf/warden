import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import type { Octokit } from '@octokit/rest';
import type { ResolvedTrigger } from '../config/loader.js';
import type { FileChange } from '../types/index.js';
import { countPatchChunks } from '../types/index.js';
import { GIT_NON_INTERACTIVE_ENV } from '../utils/exec.js';
import type { ActionInputs } from './inputs.js';

export type IncrementalMode = 'full' | 'delta';

export type CommentMutationScope =
  | { kind: 'full'; files: Set<string>; allowOutOfScopeStale: true }
  | { kind: 'incremental'; files: Set<string>; allowOutOfScopeStale: false };

export interface IncrementalState {
  enabled: boolean;
  mode: IncrementalMode;
  headSha: string;
  previousHeadSha?: string;
  configFingerprint?: string;
  files: FileChange[];
  mutationScope: CommentMutationScope;
}

export interface ResolveIncrementalStateOptions {
  octokit: Octokit;
  owner: string;
  repo: string;
  pullNumber: number;
  repoPath: string;
  headSha: string;
  fullFiles: FileChange[];
  inputs: ActionInputs;
  triggers: ResolvedTrigger[];
}

const INCREMENTAL_EXTERNAL_ID_PREFIX = 'warden:incremental:v1:';

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

/** Build the stable fingerprint used to decide whether an old baseline is reusable. */
export function buildIncrementalConfigFingerprint(
  inputs: ActionInputs,
  triggers: ResolvedTrigger[]
): string {
  const payload = {
    configPath: inputs.configPath,
    baseConfigPath: inputs.baseConfigPath,
    baseSkillRoot: inputs.baseSkillRoot,
    triggers: triggers.map((trigger) => ({
      id: trigger.id,
      name: trigger.name,
      skill: trigger.skill,
      type: trigger.type,
      filters: trigger.filters,
      labels: trigger.labels,
      draft: trigger.draft,
      model: trigger.model,
      runtime: trigger.runtime,
      effort: trigger.effort,
      maxTurns: trigger.maxTurns,
      ignore: trigger.ignore,
      scan: trigger.scan,
      chunking: trigger.chunking,
      verifyFindings: trigger.verifyFindings,
    })),
  };
  return createHash('sha256').update(stableStringify(payload)).digest('hex').slice(0, 16);
}

/** Return the GitHub Check external_id used to mark reusable incremental baselines. */
export function incrementalExternalId(configFingerprint: string | undefined): string | undefined {
  return configFingerprint
    ? `${INCREMENTAL_EXTERNAL_ID_PREFIX}${configFingerprint}`
    : undefined;
}

/** Build a comment mutation scope from a file list. */
export function buildMutationScope(
  kind: 'full' | 'incremental',
  files: FileChange[]
): CommentMutationScope {
  const scopedFiles = new Set<string>();
  for (const file of files) {
    scopedFiles.add(file.filename);
    if (file.previousFilename) {
      scopedFiles.add(file.previousFilename);
    }
  }
  return kind === 'full'
    ? { kind: 'full', files: scopedFiles, allowOutOfScopeStale: true }
    : { kind: 'incremental', files: scopedFiles, allowOutOfScopeStale: false };
}

function git(args: string[], cwd: string): string {
  const result = spawnSync('git', args, {
    cwd,
    encoding: 'utf-8',
    env: { ...process.env, ...GIT_NON_INTERACTIVE_ENV },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || `git ${args.join(' ')} failed`).trim());
  }
  return result.stdout.trimEnd();
}

function gitStatus(args: string[], cwd: string): number | null {
  const result = spawnSync('git', args, {
    cwd,
    encoding: 'utf-8',
    env: { ...process.env, ...GIT_NON_INTERACTIVE_ENV },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return typeof result.status === 'number' ? result.status : null;
}

function mapStatus(status: string): FileChange['status'] {
  const code = status[0];
  switch (code) {
    case 'A': return 'added';
    case 'D': return 'removed';
    case 'R': return 'renamed';
    case 'C': return 'copied';
    default: return 'modified';
  }
}

function parseNameStatus(output: string): FileChange[] {
  if (!output.trim()) return [];
  return output.split('\n').flatMap((line) => {
    const parts = line.split('\t');
    const status = parts[0] ?? '';
    if (!status) return [];
    const isRename = status.startsWith('R') || status.startsWith('C');
    const filename = isRename ? parts[2] : parts[1];
    if (!filename) return [];
    return [{
      filename,
      ...(isRename && parts[1] ? { previousFilename: parts[1] } : {}),
      status: mapStatus(status),
      additions: 0,
      deletions: 0,
    }];
  });
}

function applyNumstat(files: FileChange[], output: string): void {
  const byName = new Map(files.map((file) => [file.filename, file]));
  for (const line of output.split('\n')) {
    if (!line.trim()) continue;
    const parts = line.split('\t');
    const filename = parts[parts.length - 1];
    const file = filename ? byName.get(filename) : undefined;
    if (!file) continue;
    file.additions = parts[0] === '-' ? 0 : Number.parseInt(parts[0] ?? '0', 10);
    file.deletions = parts[1] === '-' ? 0 : Number.parseInt(parts[1] ?? '0', 10);
  }
}

function parseCombinedDiff(diffOutput: string): Map<string, string> {
  const patches = new Map<string, string>();
  for (const part of diffOutput.split(/(?=^diff --git )/m)) {
    if (!part.trim()) continue;
    const match = part.match(/^diff --git a\/(.+?) b\/(.+?)\n/);
    const filename = match?.[2];
    if (filename) {
      patches.set(filename, part);
    }
  }
  return patches;
}

/** Build delta file changes from local git history. */
export function buildLocalDeltaFiles(
  previousHeadSha: string,
  headSha: string,
  repoPath: string
): FileChange[] {
  const previousExists = gitStatus(['rev-parse', '--verify', `${previousHeadSha}^{commit}`], repoPath);
  if (previousExists !== 0) {
    throw new Error(
      `Warden incremental baseline ${previousHeadSha} is not available in the checkout. ` +
      'Set actions/checkout fetch-depth: 0 for incremental mode.'
    );
  }

  const ancestorStatus = gitStatus(['merge-base', '--is-ancestor', previousHeadSha, headSha], repoPath);
  if (ancestorStatus === 1) {
    return [];
  }
  if (ancestorStatus !== 0) {
    throw new Error(`Unable to compare Warden incremental baseline ${previousHeadSha} with ${headSha}.`);
  }

  const files = parseNameStatus(git(['diff', '--name-status', '--find-renames', previousHeadSha, headSha], repoPath));
  if (files.length === 0) {
    return [];
  }

  applyNumstat(files, git(['diff', '--numstat', '--find-renames', previousHeadSha, headSha], repoPath));
  const patches = parseCombinedDiff(git(['diff', '--find-renames', previousHeadSha, headSha], repoPath));
  for (const file of files) {
    file.patch = patches.get(file.filename);
    file.chunks = countPatchChunks(file.patch);
  }
  return files;
}

async function findPreviousIncrementalHeadSha(
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number,
  currentHeadSha: string,
  externalId: string
): Promise<string | undefined> {
  const commits = await octokit.paginate(octokit.pulls.listCommits, {
    owner,
    repo,
    pull_number: pullNumber,
    per_page: 100,
  });
  const shas = commits
    .map((commit) => commit.sha)
    .filter((sha) => sha !== currentHeadSha)
    .reverse();

  for (const sha of shas) {
    const { data } = await octokit.checks.listForRef({
      owner,
      repo,
      ref: sha,
      check_name: 'warden',
      status: 'completed',
      per_page: 100,
    });
    const hasBaseline = data.check_runs.some((check) => check.external_id === externalId);
    if (hasBaseline) {
      return sha;
    }
  }

  return undefined;
}

/** Resolve the file list and mutation scope for an action run. */
export async function resolveIncrementalState(
  options: ResolveIncrementalStateOptions
): Promise<IncrementalState> {
  const { inputs, fullFiles, headSha } = options;
  if (!inputs.incremental) {
    return {
      enabled: false,
      mode: 'full',
      headSha,
      files: fullFiles,
      mutationScope: buildMutationScope('full', fullFiles),
    };
  }

  const configFingerprint = buildIncrementalConfigFingerprint(inputs, options.triggers);
  const externalId = incrementalExternalId(configFingerprint);
  const previousHeadSha = externalId
    ? await findPreviousIncrementalHeadSha(
      options.octokit,
      options.owner,
      options.repo,
      options.pullNumber,
      headSha,
      externalId
    )
    : undefined;

  if (!previousHeadSha) {
    return {
      enabled: true,
      mode: 'full',
      headSha,
      configFingerprint,
      files: fullFiles,
      mutationScope: buildMutationScope('full', fullFiles),
    };
  }

  const deltaFiles = buildLocalDeltaFiles(previousHeadSha, headSha, options.repoPath);
  if (deltaFiles.length === 0) {
    return {
      enabled: true,
      mode: 'full',
      headSha,
      previousHeadSha,
      configFingerprint,
      files: fullFiles,
      mutationScope: buildMutationScope('full', fullFiles),
    };
  }

  return {
    enabled: true,
    mode: 'delta',
    headSha,
    previousHeadSha,
    configFingerprint,
    files: deltaFiles,
    mutationScope: buildMutationScope('incremental', deltaFiles),
  };
}
