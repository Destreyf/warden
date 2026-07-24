import type { Span } from '@sentry/node';
import { Sentry } from './sentry.js';
import type { TraceSpan } from './types/index.js';
type SentryStartSpanOptions = Parameters<typeof Sentry.startSpan>[0];
type SentrySpanContext = ReturnType<Span['spanContext']>;
export interface TraceRecorder {
    record(span: Span | undefined): void;
    snapshot(): TraceSpan[] | undefined;
}
/** Run a callback with a hunk-scoped trace recorder for Warden-created spans. */
export declare function withTraceRecorder<T>(recorder: TraceRecorder | undefined, callback: () => T): T;
/** Return the Sentry span context when available. */
export declare function getSpanContext(span: Span | undefined): SentrySpanContext | undefined;
/**
 * Start a real Sentry span and record it in Warden's active hunk trace buffer.
 *
 * The span still participates in Sentry's distributed trace. The buffer is
 * Warden-owned, though, so structured run output only depends on spans we
 * explicitly create through this helper.
 */
export declare function startTracedSpan<T>(options: SentryStartSpanOptions, callback: (span: Span) => T, traceRecorder?: TraceRecorder): T;
/** Start an inactive Sentry span that can be ended and recorded manually. */
export declare function startInactiveTracedSpan(options: SentryStartSpanOptions): Span;
/** Record a manually-ended span in Warden's active or explicit trace buffer. */
export declare function recordTracedSpan(span: Span | undefined, traceRecorder?: TraceRecorder): void;
/** Create a hunk-scoped recorder for Warden-owned spans under a Sentry parent span. */
export declare function startTraceRecorder(parentSpan: Span | undefined): TraceRecorder | undefined;
export {};
