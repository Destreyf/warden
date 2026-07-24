import type { ErrorCode } from '../types/index.js';
import type { RuntimeName, SkillRunStatus } from './runtimes/types.js';
export interface ProviderErrorContext {
    runtime: RuntimeName;
    provider?: string;
    model?: string;
    status: SkillRunStatus;
    responseId?: string;
    attempts?: number;
    message: string;
}
export declare class SkillRunnerError extends Error {
    /** Optional classification so callers skip message-sniffing. */
    code?: ErrorCode;
    /** Sanitized provider diagnostics safe to attach to telemetry. */
    providerContext?: ProviderErrorContext;
    constructor(message: string, options?: {
        cause?: unknown;
        code?: ErrorCode;
        providerContext?: ProviderErrorContext;
    });
}
/**
 * Remove likely credential material before an error message is surfaced through
 * logs, callbacks, reports, or telemetry.
 */
export declare function sanitizeErrorMessage(message: string): string;
/**
 * Check if an error message indicates an authentication failure.
 */
export declare function isAuthenticationErrorMessage(message: string): boolean;
/**
 * Check if an error is an IPC/subprocess failure.
 * These occur when the Claude Code subprocess can't communicate (e.g., sandbox restrictions).
 */
export declare function isSubprocessError(error: unknown): boolean;
export declare class WardenAuthenticationError extends Error {
    constructor(sdkError?: string, options?: {
        cause?: unknown;
        runtime?: string;
    });
}
/**
 * Check if an error is retryable.
 * Retries on: rate limits (429), server errors (5xx), connection errors, timeouts.
 */
export declare function isRetryableError(error: unknown): boolean;
/**
 * Check if an error is an authentication failure.
 * These require user action (login or API key) and should not be retried.
 */
export declare function isAuthenticationError(error: unknown): boolean;
/** Classify an unknown error into a stable ErrorCode + message. */
export declare function classifyError(error: unknown): {
    code: ErrorCode;
    message: string;
};
/**
 * Extract a human-readable summary from a raw provider error.
 *
 * Structured Anthropic error bodies are preferred so summaries are based on the
 * provider error type. String errors fall back to parsing embedded JSON
 * before returning the text prefix or original message.
 */
export declare function humanizeProviderError(error: unknown): string;
/** Map an internal extract.ts error string to a stable public ErrorCode. */
export declare function mapExtractionErrorCode(raw: string | undefined): ErrorCode;
//# sourceMappingURL=errors.d.ts.map