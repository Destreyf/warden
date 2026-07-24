import type { Octokit } from '@octokit/rest';
import type { ExistingComment } from '../../output/dedup.js';
import { type RuntimeName } from '../../sdk/runtimes/index.js';
import type { FixJudgeResult } from './types.js';
export interface FixJudgeInput {
    comment: ExistingComment;
    skillName?: string;
    changedFiles: string[];
    codeBeforeFix: string;
    codeAfterFix?: string;
    commitMessages?: string[];
}
export interface FixJudgeContext {
    octokit: Octokit;
    owner: string;
    repo: string;
    baseSha: string;
    headSha: string;
    patches: Map<string, string>;
}
export interface FixJudgeRuntimeOptions {
    runtime?: RuntimeName;
    model?: string;
    maxRetries?: number;
}
/**
 * Evaluate whether a code change fixed a reported issue.
 * Uses Haiku with tool use to explore the changes.
 */
export declare function evaluateFix(input: FixJudgeInput, context: FixJudgeContext, apiKey: string, runtimeOptionsOrMaxRetries?: number | FixJudgeRuntimeOptions): Promise<FixJudgeResult>;
//# sourceMappingURL=judge.d.ts.map