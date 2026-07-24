import type { UsageStats, AuxiliaryUsageMap, AuxiliaryUsageAttributionMap } from '../types/index.js';
import type { AuxiliaryUsageEntry } from './types.js';
export interface RuntimeUsageResult {
    usage?: {
        input_tokens?: number | null;
        output_tokens?: number | null;
        cache_read_input_tokens?: number | null;
        cache_creation_input_tokens?: number | null;
        cache_creation?: {
            ephemeral_1h_input_tokens?: number | null;
            ephemeral_5m_input_tokens?: number | null;
        } | null;
        server_tool_use?: {
            web_search_requests?: number | null;
        } | null;
    } | null;
    total_cost_usd?: number | null;
}
/**
 * Extract usage stats from a runtime result message.
 *
 * The Anthropic API reports `input_tokens` as only the non-cached portion.
 * We normalize so that `inputTokens` is the total input token count
 * (non-cached + cache_read + cache_creation), with cache fields reported
 * separately as subsets of that total.
 */
export declare function extractUsage(result: RuntimeUsageResult): UsageStats;
/**
 * Create empty usage stats.
 */
export declare function emptyUsage(): UsageStats;
/**
 * Aggregate multiple usage stats into one.
 */
export declare function aggregateUsage(usages: UsageStats[]): UsageStats;
/**
 * Aggregate auxiliary usage entries by agent name.
 * Merges multiple entries for the same agent into a single UsageStats.
 * Returns undefined if no entries are provided.
 */
export declare function aggregateAuxiliaryUsage(entries: AuxiliaryUsageEntry[]): AuxiliaryUsageMap | undefined;
/**
 * Aggregate auxiliary usage model/runtime attribution by agent name.
 */
export declare function aggregateAuxiliaryUsageAttribution(entries: AuxiliaryUsageEntry[]): AuxiliaryUsageAttributionMap | undefined;
/**
 * Merge two auxiliary usage attribution maps.
 */
export declare function mergeAuxiliaryUsageAttribution(a: AuxiliaryUsageAttributionMap | undefined, b: AuxiliaryUsageAttributionMap | undefined): AuxiliaryUsageAttributionMap | undefined;
/**
 * Merge two AuxiliaryUsageMaps together.
 * Entries for the same agent are summed.
 */
export declare function mergeAuxiliaryUsage(a: AuxiliaryUsageMap | undefined, b: AuxiliaryUsageMap | undefined): AuxiliaryUsageMap | undefined;
/**
 * Estimate token count from character count.
 * Uses chars/4 as a rough approximation for English text.
 */
export declare function estimateTokens(chars: number): number;
//# sourceMappingURL=usage.d.ts.map