import * as Sentry from '@sentry/node';
import type { NodeOptions } from '@sentry/node';
import type { ErrorCode, SkillReport } from './types/index.js';
export type SentryContext = 'cli' | 'action';
type SentryInitOptions = Pick<NodeOptions, 'beforeSend' | 'beforeSendTransaction' | 'transport'>;
type TelemetryAttributes = Record<string, string | number | boolean>;
/** Initialize production telemetry, with optional SDK hooks for local observation. */
export declare function initSentry(context: SentryContext, options?: SentryInitOptions): void;
/** Ensure local span objects are materialized for structured trace output. */
export declare function ensureLocalTracing(): void;
export { Sentry };
export declare const logger: typeof Sentry.logger;
/**
 * Set attributes on the global Sentry scope.
 * These apply to logs and metrics. Pass them explicitly when starting spans.
 */
export declare function setGlobalAttributes(attrs: TelemetryAttributes): void;
/**
 * Set repository metadata on the global Sentry scope.
 */
export declare function setRepositoryScope(repository: string | undefined): void;
/**
 * Set GitHub Actions metadata on the global Sentry scope and return the
 * attributes that must be passed explicitly to the action's root span.
 */
export declare function setGitHubActionScope(eventName: string | undefined): TelemetryAttributes;
/**
 * Get the trace ID from the active span, if available.
 * Useful for correlating runs to Sentry traces in logs and output.
 */
export declare function getTraceId(): string | undefined;
/**
 * Emit a single run count. Call once per analysis workflow execution.
 * Inherits warden.source, repository, and GitHub Actions attributes from global scope.
 */
export declare function emitRunMetric(): void;
/** Emit the final outcome of a GitHub Action invocation, including startup failures. */
export declare function emitActionRunMetric(outcome: 'success' | 'failure', stage: 'input' | 'environment' | 'dispatch', errorCode?: ErrorCode): void;
export declare function emitSkillMetrics(report: SkillReport): void;
export declare function emitExtractionMetrics(skill: string, method: 'regex' | 'llm' | 'none', count: number): void;
export declare function emitFixEvalMetrics(evaluated: number, resolved: number, failed: number, skipped: number, uniqueFindingsEvaluated: number, uniqueFindingsCodeChanged: number, uniqueFindingsResolved: number): void;
export declare function emitRetryMetric(skill: string, attempt: number): void;
export declare function emitDedupMetrics(skill: string, total: number, unique: number): void;
/**
 * Emit the final fix-evaluation outcome for one comment.
 */
export declare function emitFixEvalVerdictMetric(verdict: string, skill?: string, options?: {
    usedFallback?: boolean;
}): void;
export declare function emitStaleResolutionMetric(count: number, skill?: string): void;
/**
 * Flush pending Sentry events. Safe to call even if Sentry is not initialized.
 */
export declare function flushSentry(timeoutMs?: number): Promise<void>;
