import type { Octokit } from '@octokit/rest';
import type { ResolvedTrigger } from '../config/loader.js';
import type { FileChange } from '../types/index.js';
import type { ActionInputs } from './inputs.js';
export type IncrementalMode = 'full' | 'delta';
export type CommentMutationScope = {
    kind: 'full';
    files: Set<string>;
    allowOutOfScopeStale: true;
} | {
    kind: 'incremental';
    files: Set<string>;
    allowOutOfScopeStale: false;
};
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
/** Build the stable fingerprint used to decide whether an old baseline is reusable. */
export declare function buildIncrementalConfigFingerprint(inputs: ActionInputs, triggers: ResolvedTrigger[]): string;
/** Return the GitHub Check external_id used to mark reusable incremental baselines. */
export declare function incrementalExternalId(configFingerprint: string | undefined): string | undefined;
/** Build a comment mutation scope from a file list. */
export declare function buildMutationScope(kind: 'full' | 'incremental', files: FileChange[]): CommentMutationScope;
/** Build delta file changes from local git history. */
export declare function buildLocalDeltaFiles(previousHeadSha: string, headSha: string, repoPath: string): FileChange[];
/** Resolve the file list and mutation scope for an action run. */
export declare function resolveIncrementalState(options: ResolveIncrementalStateOptions): Promise<IncrementalState>;
//# sourceMappingURL=incremental.d.ts.map