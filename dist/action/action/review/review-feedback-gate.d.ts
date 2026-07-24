/**
 * Review Feedback Gate
 *
 * Single owner of the "is this run still analyzing the current PR head?"
 * check that guards every PR review feedback mutation (posting reviews,
 * resolving threads, replying, dismissing reviews).
 */
import type { Octokit } from '@octokit/rest';
import type { EventContext } from '../../types/index.js';
export type ReviewFeedbackWritability = 'writable' | 'blocked' | 'unknown';
/**
 * Guards PR review feedback writes behind a head-freshness check.
 *
 * States returned by {@link ReviewFeedbackGate.check}:
 * - `writable`: the PR head matched this run's head within the TTL window.
 * - `blocked`: no PR context, or the head advanced past this run. Permanent
 *   for the run; a head that advanced never becomes current again.
 * - `unknown`: the head could not be verified after retries. Writes must be
 *   skipped (fail closed), but the state is cached only briefly so later
 *   phases retry instead of disabling feedback for the whole run. Callers
 *   that suppress a blocking review because of `unknown` must fail the run
 *   instead of letting it pass silently.
 *
 * Results are memoized for a short TTL so bursts of writes share one
 * `pulls.get` call while long LLM phases still trigger a fresh check.
 */
export declare class ReviewFeedbackGate {
    private readonly octokit;
    private readonly context;
    private readonly options;
    private blocked;
    private cached?;
    constructor(octokit: Octokit, context: EventContext, options?: {
        ttlMs?: number;
        attempts?: number;
        retryDelayMs?: number;
    });
    /** Report whether this run may still mutate PR review feedback. */
    check(): Promise<ReviewFeedbackWritability>;
    /** True when review feedback writes are allowed right now. */
    canWrite(): Promise<boolean>;
}
//# sourceMappingURL=review-feedback-gate.d.ts.map