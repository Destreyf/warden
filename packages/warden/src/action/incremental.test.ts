import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Octokit } from '@octokit/rest';
import type { ResolvedTrigger } from '../config/loader.js';
import type { FileChange } from '../types/index.js';
import type { ActionInputs } from './inputs.js';
import {
  buildIncrementalConfigFingerprint,
  buildLocalDeltaFiles,
  buildMutationScope,
  incrementalExternalId,
  resolveIncrementalState,
} from './incremental.js';

const tempDirs: string[] = [];

function git(cwd: string, ...args: string[]): string {
  return execFileSync('git', args, { cwd, encoding: 'utf-8' }).trim();
}

function createRepo(): string {
  const dir = mkdtempSync(join(tmpdir(), 'warden-incremental-'));
  tempDirs.push(dir);
  git(dir, 'init');
  git(dir, 'config', 'user.email', 'warden@example.com');
  git(dir, 'config', 'user.name', 'Warden Test');
  return dir;
}

function commitFile(repoPath: string, path: string, content: string): string {
  const fullPath = join(repoPath, path);
  mkdirSync(join(fullPath, '..'), { recursive: true });
  writeFileSync(fullPath, content);
  git(repoPath, 'add', path);
  git(repoPath, 'commit', '-m', `update ${path}`);
  return git(repoPath, 'rev-parse', 'HEAD');
}

function createInputs(overrides: Partial<ActionInputs> = {}): ActionInputs {
  return {
    anthropicApiKey: '',
    oauthToken: '',
    githubToken: 'github-token',
    mode: 'run',
    configPath: 'warden.toml',
    maxFindings: 50,
    parallel: 2,
    incremental: true,
    ...overrides,
  };
}

function createTrigger(overrides: Partial<ResolvedTrigger> = {}): ResolvedTrigger {
  return {
    id: 'security-review:0',
    name: 'security-review',
    skill: 'security-review',
    type: 'pull_request',
    actions: ['opened', 'synchronize'],
    filters: {},
    useBuiltinSkill: true,
    ...overrides,
  } as ResolvedTrigger;
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe('buildLocalDeltaFiles', () => {
  it('returns patches for files changed between two commits', () => {
    const repoPath = createRepo();
    const baseSha = commitFile(repoPath, 'src/app.ts', 'const value = 1;\n');
    const headSha = commitFile(repoPath, 'src/app.ts', 'const value = 2;\n');

    const files = buildLocalDeltaFiles(baseSha, headSha, repoPath);

    expect(files).toEqual([
      expect.objectContaining({
        filename: 'src/app.ts',
        status: 'modified',
        additions: 1,
        deletions: 1,
        chunks: 1,
      }),
    ]);
    expect(files[0]?.patch).toContain('-const value = 1;');
    expect(files[0]?.patch).toContain('+const value = 2;');
  });

  it('tracks renamed files in the mutation scope', () => {
    const repoPath = createRepo();
    const baseSha = commitFile(repoPath, 'src/old.ts', 'const value = 1;\n');
    renameSync(join(repoPath, 'src/old.ts'), join(repoPath, 'src/new.ts'));
    git(repoPath, 'add', '-A');
    git(repoPath, 'commit', '-m', 'rename file');
    const headSha = git(repoPath, 'rev-parse', 'HEAD');

    const files = buildLocalDeltaFiles(baseSha, headSha, repoPath);
    const scope = buildMutationScope('incremental', files);

    expect(files[0]).toEqual(expect.objectContaining({
      filename: 'src/new.ts',
      previousFilename: 'src/old.ts',
      status: 'renamed',
    }));
    expect(scope.files.has('src/new.ts')).toBe(true);
    expect(scope.files.has('src/old.ts')).toBe(true);
  });

  it('fails clearly when the baseline commit is unavailable', () => {
    const repoPath = createRepo();
    const headSha = commitFile(repoPath, 'src/app.ts', 'const value = 1;\n');

    expect(() => buildLocalDeltaFiles('0'.repeat(40), headSha, repoPath)).toThrow(
      'Set actions/checkout fetch-depth: 0 for incremental mode'
    );
  });
});

describe('resolveIncrementalState', () => {
  it('uses full mode when there is no previous marked check', async () => {
    const repoPath = createRepo();
    const headSha = commitFile(repoPath, 'src/app.ts', 'const value = 1;\n');
    const fullFiles: FileChange[] = [
      { filename: 'src/app.ts', status: 'modified', additions: 1, deletions: 0, patch: 'patch' },
    ];
    const octokit = {
      paginate: vi.fn().mockResolvedValue([{ sha: headSha }]),
      pulls: { listCommits: vi.fn() },
      checks: { listForRef: vi.fn() },
    } as unknown as Octokit;

    const state = await resolveIncrementalState({
      octokit,
      owner: 'getsentry',
      repo: 'warden',
      pullNumber: 1,
      repoPath,
      headSha,
      fullFiles,
      inputs: createInputs(),
      triggers: [createTrigger()],
    });

    expect(state.mode).toBe('full');
    expect(state.files).toBe(fullFiles);
  });

  it('uses delta mode from the latest completed matching marked check', async () => {
    const repoPath = createRepo();
    const baseSha = commitFile(repoPath, 'src/app.ts', 'const value = 1;\n');
    const headSha = commitFile(repoPath, 'src/app.ts', 'const value = 2;\n');
    const inputs = createInputs();
    const triggers = [createTrigger()];
    const externalId = incrementalExternalId(buildIncrementalConfigFingerprint(inputs, triggers));
    const octokit = {
      paginate: vi.fn().mockResolvedValue([{ sha: baseSha }, { sha: headSha }]),
      pulls: { listCommits: vi.fn() },
      checks: {
        listForRef: vi.fn().mockResolvedValue({
          data: { check_runs: [{ name: 'warden', external_id: externalId }] },
        }),
      },
    } as unknown as Octokit;

    const state = await resolveIncrementalState({
      octokit,
      owner: 'getsentry',
      repo: 'warden',
      pullNumber: 1,
      repoPath,
      headSha,
      fullFiles: [],
      inputs,
      triggers,
    });

    expect(state).toEqual(expect.objectContaining({
      mode: 'delta',
      previousHeadSha: baseSha,
    }));
    expect(state.files).toEqual([
      expect.objectContaining({ filename: 'src/app.ts', status: 'modified' }),
    ]);
    expect(state.mutationScope.kind).toBe('incremental');
  });
});
