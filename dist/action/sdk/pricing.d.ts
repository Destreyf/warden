import type { UsageStats } from '../types/index.js';
export interface UsageCostBreakdown {
    freshInputUSD: number;
    outputUSD: number;
    cacheReadUSD: number;
    cacheCreationUSD: number;
    cacheCreation5mUSD: number;
    cacheCreation1hUSD: number;
    webSearchUSD: number;
    totalUSD: number;
}
/** Return categorized costs when the Anthropic model resolves to Pi's catalog. */
export declare function estimateUsageCostBreakdown(model: string | undefined, usage: UsageStats): UsageCostBreakdown | undefined;
/**
 * Usage shape returned by the Anthropic Messages API.
 */
export interface AnthropicApiUsage {
    input_tokens: number;
    output_tokens: number;
    cache_read_input_tokens?: number | null;
    cache_creation_input_tokens?: number | null;
    cache_creation?: {
        ephemeral_1h_input_tokens?: number | null;
        ephemeral_5m_input_tokens?: number | null;
    } | null;
    server_tool_use?: {
        web_search_requests?: number | null;
    } | null;
}
/**
 * Convert Anthropic API usage to our UsageStats format.
 * Calculates cost from token counts using model pricing.
 *
 * The Anthropic API reports `input_tokens` as only the non-cached portion.
 * We normalize so that `inputTokens` is the *total* input tokens
 * (non-cached + cache_read + cache_creation), with the cache fields
 * being subsets of that total.
 */
export declare function anthropicUsageToStats(model: string, usage: AnthropicApiUsage): UsageStats;
/** @deprecated Use anthropicUsageToStats. */
export declare const apiUsageToStats: typeof anthropicUsageToStats;
//# sourceMappingURL=pricing.d.ts.map