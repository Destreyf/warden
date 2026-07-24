import type { Octokit } from '@octokit/rest';
import type { ExistingComment } from '../../output/dedup.js';
import type { Finding } from '../../types/index.js';
import type { EvaluateFixAttemptsContext, EvaluateFixAttemptsResult } from './types.js';
import type { FixJudgeRuntimeOptions } from './judge.js';
export { postThreadReply } from './github.js';
export type { EvaluateFixAttemptsResult, FixEvaluation } from './types.js';
/**
 * Evaluate fix attempts for all unresolved Warden comments.
 *
 * Flow:
 * 1. Fetch patches between base and head SHAs
 * 2. For each unresolved comment, let judge explore changes with tools
 * 3. Cross-check against current findings for re-detection (safety override)
 * 4. Categorize into toResolve and toReply
 * 5. Accumulate usage stats from all evaluations
 */
export declare function evaluateFixAttempts(octokit: Octokit, comments: ExistingComment[], context: EvaluateFixAttemptsContext, currentFindings: Finding[], apiKey: string, runtimeOptionsOrMaxRetries?: number | FixJudgeRuntimeOptions): Promise<EvaluateFixAttemptsResult>;
//# sourceMappingURL=index.d.ts.map