import type { UsageStats } from '../types/index.js';
interface SpanLike {
    setAttribute(key: string, value: string | number | boolean | string[] | undefined): unknown;
}
/**
 * Provider-neutral message envelope used before writing OTel GenAI attributes.
 *
 * Runtime adapters pass raw provider content blocks here. This module owns the
 * conversion to the current `gen_ai.*.messages` schema so Claude, Pi, and
 * Anthropic API shapes do not leak into trace consumers.
 */
export interface GenAiMessage {
    role: string;
    content: unknown;
    /** Tool result messages from some runtimes carry the call ID outside content. */
    toolCallId?: string;
    /** Provider finish/stop reason, emitted as OTel `finish_reason`. */
    finishReason?: string | null;
}
type GenAiUsageAttributes = Record<string, number>;
type GenAiToolAttributeValue = string | number | boolean | string[] | undefined;
/** Resolve the OpenTelemetry GenAI provider name, preferring the observed provider over selector fallbacks. */
export declare function genAiProviderName(runtime: string | undefined, model: string | undefined, provider?: string): string;
/** Build OTel GenAI span names as `<operation> <semantic target>`, when known. */
export declare function genAiSpanName(operationName: string, targetName: string | undefined): string;
/** Build current OpenTelemetry GenAI usage attributes from normalized usage. */
export declare function genAiUsageAttributes(usage: UsageStats): GenAiUsageAttributes;
/**
 * Build OpenTelemetry GenAI attributes for an executed tool call span.
 *
 * Tool arguments and results are opt-in content attributes in OTel. Sentry span
 * data and Warden's local trace schema only preserve primitive attributes, so
 * structured values are JSON-encoded at this boundary.
 */
export declare function genAiToolCallAttributes(args: {
    agentName?: string;
    task?: string;
    toolName: string;
    toolDescription?: string;
    toolCallId?: string;
    toolType?: string;
    arguments?: unknown;
    result?: unknown;
    isError?: boolean;
}): Record<string, GenAiToolAttributeValue>;
/** Set GenAI token usage attributes expected by Sentry AI monitoring. */
export declare function setGenAiUsageAttrs(span: SpanLike, usage: UsageStats): void;
/** Set OpenTelemetry GenAI system-instruction attributes for prompt spans. */
export declare function setGenAiSystemInstructionsAttr(span: SpanLike, systemPrompt: string): void;
/** Set OTel GenAI input messages from raw runtime transcript messages. */
export declare function setGenAiInputMessagesAttr(span: SpanLike, messages: GenAiMessage[]): void;
/** Set OTel GenAI output messages from raw runtime response messages. */
export declare function setGenAiOutputMessagesAttrFromMessages(span: SpanLike, messages: GenAiMessage[]): void;
/** Set OpenTelemetry GenAI output message attributes for text responses. */
export declare function setGenAiOutputMessagesAttr(span: SpanLike, responseText: string, finishReason?: string | null): void;
export {};
//# sourceMappingURL=otel.d.ts.map