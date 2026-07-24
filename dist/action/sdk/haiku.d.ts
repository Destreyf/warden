import Anthropic from '@anthropic-ai/sdk';
import type { Span } from '@sentry/node';
import type { z } from 'zod';
import type { UsageStats } from '../types/index.js';
export declare const HAIKU_MODEL = "claude-haiku-4-5";
export declare const DEFAULT_AUXILIARY_MAX_RETRIES = 5;
/**
 * Anthropic Messages API usage shape accepted by setGenAiResponseAttrs.
 */
interface ApiResponseUsage {
    input_tokens: number;
    output_tokens: number;
    cache_read_input_tokens?: number | null;
    cache_creation_input_tokens?: number | null;
    cache_creation?: {
        ephemeral_1h_input_tokens?: number | null;
        ephemeral_5m_input_tokens?: number | null;
    } | null;
}
/**
 * Set standard gen_ai response attributes on a Sentry span.
 *
 * Follows the same token accounting as analyze.ts: gen_ai.usage.input_tokens
 * is the total (non-cached + cache_read + cache_creation), with cache fields
 * as subsets.
 */
export declare function setGenAiResponseAttrs(span: Span, usage: ApiResponseUsage, stopReason?: string | null, responseText?: string): void;
/**
 * Extract the first JSON object or array from LLM text.
 * Handles markdown code fences and prose before/after JSON.
 */
export declare function extractJson(text: string): string | null;
/**
 * Result from a structured Haiku call.
 */
export type HaikuResult<T> = {
    success: true;
    data: T;
    usage: UsageStats;
} | {
    success: false;
    error: string;
    usage: UsageStats;
};
/**
 * Options for callHaiku.
 */
export interface CallHaikuOptions<T> {
    apiKey: string;
    prompt: string;
    schema: z.ZodType<T>;
    agentName?: string;
    task?: string;
    model?: string;
    maxTokens?: number;
    timeout?: number;
    maxRetries?: number;
}
/**
 * Single-turn structured Haiku call.
 * Auto-prefills based on Zod schema type, extracts JSON, validates with Zod.
 */
export declare function callHaiku<T>(options: CallHaikuOptions<T>): Promise<HaikuResult<T>>;
/**
 * Options for callHaikuWithTools.
 */
export interface CallHaikuWithToolsOptions<T> {
    apiKey: string;
    prompt: string;
    schema: z.ZodType<T>;
    tools: Anthropic.Tool[];
    executeTool: (name: string, input: Record<string, unknown>) => Promise<string>;
    agentName?: string;
    task?: string;
    model?: string;
    maxTokens?: number;
    maxIterations?: number;
    timeout?: number;
    maxRetries?: number;
}
/**
 * Multi-turn Haiku call with tool use loop.
 * Iterates tool calls until the model produces a final text response.
 * Accumulates usage across all iterations.
 *
 * Telemetry mirrors an agent run: the outer span describes the local
 * orchestration, each Anthropic API call gets its own `gen_ai.chat` span, and
 * every application-executed tool call is recorded as `gen_ai.execute_tool`.
 */
export declare function callHaikuWithTools<T>(options: CallHaikuWithToolsOptions<T>): Promise<HaikuResult<T>>;
export {};
//# sourceMappingURL=haiku.d.ts.map