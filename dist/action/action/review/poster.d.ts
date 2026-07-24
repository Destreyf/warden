/**
 * Review Poster
 *
 * Handles posting GitHub PR reviews with deduplication.
 * Extracted from main.ts to isolate the complex review posting state machine.
 */
import type { Octokit } from '@octokit/rest';
import type { EventContext } from '../../types/index.js';
import type { ExistingComment } from '../../output/dedup.js';
import type { RuntimeName } from '../../sdk/runtimes/index.js';
import type { TriggerResult } from '../triggers/executor.js';
import type { FindingObservation } from '../reporting/outcomes.js';
import type { ReviewFeedbackGate } from './review-feedback-gate.js';
/**
 * Context for posting a review for a single trigger.
 */
export interface ReviewPostingContext {
    result: TriggerResult;
    existingComments: ExistingComment[];
    apiKey: string;
    runtime?: RuntimeName;
    model?: string;
    maxRetries?: number;
    /** Throw review posting failures instead of converting them to warnings. */
    failOnPostError?: boolean;
}
/**
 * Result from posting a review.
 */
export interface ReviewPostResult {
    /** Whether a review was posted */
    posted: boolean;
    /** New comments that were posted (for cross-trigger deduplication) */
    newComments: ExistingComment[];
    /** Existing Warden comment IDs matched by current findings */
    activeWardenCommentIds: Set<number>;
    /** Structured finding outcomes produced while posting this review */
    findingObservations: FindingObservation[];
    /** Whether this trigger should cause the action to fail */
    shouldFail: boolean;
    /** Reason for failure, if any */
    failureReason?: string;
}
/**
 * Dependencies for the review poster.
 */
export interface ReviewPosterDeps {
    octokit: Octokit;
    context: EventContext;
    /** Head-freshness gate shared with the rest of the workflow run. */
    feedbackGate: ReviewFeedbackGate;
}
/**
 * Post a review for a single trigger result.
 *
 * Handles:
 * - Filtering findings by reportOn threshold
 * - Deduplicating against existing comments
 * - Processing duplicate actions (reactions, updates)
 * - Posting the final review
 */
export declare function postTriggerReview(ctx: ReviewPostingContext, deps: ReviewPosterDeps): Promise<ReviewPostResult>;
//# sourceMappingURL=poster.d.ts.map