import { z } from 'zod';
import type { AuxiliaryUsageAttributionMap, AuxiliaryUsageMap, SkillReport, UsageAttribution, UsageStats } from '../../types/index.js';
/** Usage plus model/runtime attribution for one billable JSONL component. */
export declare const JsonlUsageBreakdownEntrySchema: z.ZodObject<{
    model: z.ZodOptional<z.ZodString>;
    models: z.ZodOptional<z.ZodArray<z.ZodString>>;
    runtime: z.ZodOptional<z.ZodString>;
    runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    usage: z.ZodObject<{
        inputTokens: z.ZodNumber;
        outputTokens: z.ZodNumber;
        cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
        webSearchRequests: z.ZodOptional<z.ZodNumber>;
        costUSD: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export type JsonlUsageBreakdownEntry = z.infer<typeof JsonlUsageBreakdownEntrySchema>;
/** Detailed usage accounting for one durable JSONL record. */
export declare const JsonlUsageBreakdownSchema: z.ZodObject<{
    scan: z.ZodOptional<z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        models: z.ZodOptional<z.ZodArray<z.ZodString>>;
        runtime: z.ZodOptional<z.ZodString>;
        runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        usage: z.ZodObject<{
            inputTokens: z.ZodNumber;
            outputTokens: z.ZodNumber;
            cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
            webSearchRequests: z.ZodOptional<z.ZodNumber>;
            costUSD: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    auxiliary: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        models: z.ZodOptional<z.ZodArray<z.ZodString>>;
        runtime: z.ZodOptional<z.ZodString>;
        runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        usage: z.ZodObject<{
            inputTokens: z.ZodNumber;
            outputTokens: z.ZodNumber;
            cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
            webSearchRequests: z.ZodOptional<z.ZodNumber>;
            costUSD: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
    total: z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        models: z.ZodOptional<z.ZodArray<z.ZodString>>;
        runtime: z.ZodOptional<z.ZodString>;
        runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        usage: z.ZodObject<{
            inputTokens: z.ZodNumber;
            outputTokens: z.ZodNumber;
            cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
            webSearchRequests: z.ZodOptional<z.ZodNumber>;
            costUSD: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type JsonlUsageBreakdown = z.infer<typeof JsonlUsageBreakdownSchema>;
/** Return true when usage contains non-zero token, tool, or cost data. */
export declare function usageStatsHaveValue(usage: UsageStats | undefined): usage is UsageStats;
/** Aggregate usage stats while avoiding optional zero fields unless inputs had them. */
export declare function aggregateUsageStatsPreservingOptional(usages: UsageStats[]): UsageStats;
/** Build detailed usage accounting for a JSONL record. */
export declare function buildJsonlUsageBreakdown(usage: UsageStats | undefined, auxiliaryUsage: AuxiliaryUsageMap | undefined, options?: {
    scan?: UsageAttribution;
    auxiliary?: AuxiliaryUsageAttributionMap;
}): JsonlUsageBreakdown | undefined;
/** Return only the primary scan usage from a usage breakdown. */
export declare function scanUsageFromBreakdown(breakdown: JsonlUsageBreakdown | undefined): UsageStats | undefined;
/** Return auxiliary usage from a usage breakdown in the legacy map shape. */
export declare function auxiliaryUsageFromBreakdown(breakdown: JsonlUsageBreakdown | undefined): AuxiliaryUsageMap | undefined;
/** Return auxiliary model/runtime attribution from a usage breakdown. */
export declare function auxiliaryUsageAttributionFromBreakdown(breakdown: JsonlUsageBreakdown | undefined): AuxiliaryUsageAttributionMap | undefined;
/** Aggregate model/runtime attribution across scan reports. */
export declare function usageAttributionFromReports(reports: SkillReport[]): UsageAttribution | undefined;
/** Aggregate auxiliary model/runtime attribution across reports. */
export declare function aggregateReportAuxiliaryUsageAttribution(reports: SkillReport[]): AuxiliaryUsageAttributionMap | undefined;
//# sourceMappingURL=usage-breakdown.d.ts.map