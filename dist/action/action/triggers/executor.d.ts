/**
 * Trigger Executor
 *
 * Executes a single trigger. GitHub check writes are optional and must be
 * injected by legacy run mode; split analyze mode omits that capability.
 * Extracted from main.ts to enable isolated testing and clearer dependencies.
 */
import type { ResolvedTrigger } from '../../config/loader.js';
import type { EventContext, SkillReport, SeverityThreshold, ConfidenceThreshold } from '../../types/index.js';
import type { RenderResult } from '../../output/types.js';
import type { Semaphore } from '../../utils/index.js';
import type { ProviderFailureCircuitBreaker } from '../../sdk/circuit-breaker.js';
/**
 * Optional check lifecycle for trigger execution.
 */
export interface TriggerCheckRun {
    url?: string;
    complete(report: SkillReport, options: TriggerCheckCompleteOptions): Promise<void>;
    fail(error: unknown): Promise<void>;
}
/**
 * Reporting policy applied when completing a trigger check.
 */
export interface TriggerCheckCompleteOptions {
    failOn?: SeverityThreshold;
    reportOn?: SeverityThreshold;
    minConfidence?: ConfidenceThreshold;
    failCheck?: boolean;
}
/**
 * Optional context-bound check capability. Omit for analyze mode.
 */
export interface TriggerCheckReporter {
    start(skillName: string): Promise<TriggerCheckRun>;
}
/**
 * Dependencies required for trigger execution.
 * Making these explicit enables testing with mock implementations.
 */
export interface TriggerExecutorDeps {
    context: EventContext;
    anthropicApiKey: string;
    claudePath?: string;
    /** Global fail-on from action inputs (trigger-specific takes precedence) */
    globalFailOn?: SeverityThreshold;
    /** Global report-on from action inputs (trigger-specific takes precedence) */
    globalReportOn?: SeverityThreshold;
    /** Global max-findings from action inputs (trigger-specific takes precedence) */
    globalMaxFindings: number;
    /** Global request-changes from action inputs (trigger-specific takes precedence) */
    globalRequestChanges?: boolean;
    /** Global fail-check from action inputs (trigger-specific takes precedence) */
    globalFailCheck?: boolean;
    /** Global semaphore for limiting concurrent file analyses across triggers */
    semaphore?: Semaphore;
    /** Shared controller for stopping the whole action run */
    abortController?: AbortController;
    /** Shared circuit breaker for auth/provider failures */
    circuitBreaker?: ProviderFailureCircuitBreaker;
    /** Optional context-bound check writer. Omit for analyze mode. */
    checks?: TriggerCheckReporter;
}
/**
 * Result from executing a single trigger.
 */
export interface TriggerResult {
    triggerId?: string;
    triggerName: string;
    skillName: string;
    report?: SkillReport;
    renderResult?: RenderResult;
    failOn?: SeverityThreshold;
    reportOn?: SeverityThreshold;
    minConfidence?: ConfidenceThreshold;
    reportOnSuccess?: boolean;
    requestChanges?: boolean;
    failCheck?: boolean;
    checkRunUrl?: string;
    maxFindings?: number;
    error?: unknown;
}
/**
 * Execute a single trigger and return results.
 *
 * Handles:
 * - Running the skill via Claude Code SDK
 * - Rendering results for GitHub review
 * - Creating/updating GitHub check runs only when a check reporter is provided
 */
export declare function executeTrigger(trigger: ResolvedTrigger, deps: TriggerExecutorDeps): Promise<TriggerResult>;
//# sourceMappingURL=executor.d.ts.map