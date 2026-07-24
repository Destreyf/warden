import type { Severity, Confidence, Finding, FileChange, UsageStats, AuxiliaryUsageMap } from '../../types/index.js';
/**
 * Capitalize the first letter of a string.
 * @example capitalize('critical') // 'Critical'
 */
export declare function capitalize(str: string): string;
/**
 * Pluralize a word based on count.
 * @example pluralize(1, 'file') // 'file'
 * @example pluralize(2, 'file') // 'files'
 * @example pluralize(1, 'fix', 'fixes') // 'fix'
 * @example pluralize(2, 'fix', 'fixes') // 'fixes'
 */
export declare function pluralize(count: number, singular: string, plural?: string): string;
/**
 * Format a duration in milliseconds to a human-readable string.
 * Under 1s: "50ms". Under 60s: "3.2s". Over 60s: "5m 3s".
 */
export declare function formatDuration(ms: number): string;
/**
 * Format an elapsed time for display (e.g., "+0.8s", "+2m 3s").
 */
export declare function formatElapsed(ms: number): string;
/**
 * Format bytes into a compact human-readable size.
 */
export declare function formatBytes(bytes: number): string;
/**
 * Format a severity dot for terminal output.
 */
export declare function formatSeverityDot(severity: Severity): string;
/**
 * Format a severity badge for terminal output (colored dot + severity text).
 */
export declare function formatSeverityBadge(severity: Severity): string;
/**
 * Format a severity for plain text (CI mode).
 */
export declare function formatSeverityPlain(severity: Severity): string;
/**
 * Format a confidence badge for terminal output.
 * Returns empty string if confidence is undefined.
 */
export declare function formatConfidenceBadge(confidence: Confidence | undefined): string;
/**
 * Format a file location string.
 */
export declare function formatLocation(path: string, startLine?: number, endLine?: number): string;
/**
 * Format a finding for terminal display.
 */
export declare function formatFindingCompact(finding: Finding): string;
/**
 * Format finding counts for display (with colored dots).
 */
export declare function formatFindingCounts(counts: Record<Severity, number>): string;
/**
 * Format finding counts for plain text.
 */
export declare function formatFindingCountsPlain(counts: Record<Severity, number>): string;
/**
 * Format a progress indicator like [1/3].
 */
export declare function formatProgress(current: number, total: number): string;
/**
 * Format file change summary.
 */
export declare function formatFileStats(files: FileChange[]): string;
/**
 * Truncate a string to fit within a width, adding ellipsis if needed.
 */
export declare function truncate(str: string, maxWidth: number): string;
/**
 * Pad a string on the right to reach a certain width.
 */
export declare function padRight(str: string, width: number): string;
/**
 * Count findings by severity.
 */
export declare function countBySeverity(findings: Finding[]): Record<Severity, number>;
/**
 * Format a USD cost for display.
 */
export declare function formatCost(costUSD: number): string;
/**
 * Calculate total usage across primary and auxiliary calls.
 */
export declare function totalUsageStats(usage?: UsageStats, auxiliaryUsage?: AuxiliaryUsageMap): UsageStats | undefined;
/**
 * Calculate total cost across primary and auxiliary usage.
 */
export declare function totalUsageCost(usage?: UsageStats, auxiliaryUsage?: AuxiliaryUsageMap): number | undefined;
/**
 * Format token counts for display.
 */
export declare function formatTokens(tokens: number): string;
/**
 * Format usage stats for terminal display.
 */
export declare function formatUsage(usage: UsageStats, auxiliaryUsage?: AuxiliaryUsageMap): string;
/**
 * Format usage stats for plain text display.
 */
export declare function formatUsagePlain(usage: UsageStats, auxiliaryUsage?: AuxiliaryUsageMap): string;
/**
 * Calculate total auxiliary cost from an AuxiliaryUsageMap.
 */
export declare function totalAuxiliaryCost(auxiliaryUsage: AuxiliaryUsageMap): number;
/**
 * Format stats (duration, tokens, cost) into a compact single-line format.
 * Used for markdown footers in PR comments and check annotations.
 *
 * When auxiliaryUsage is provided, tokens and cost are primary + auxiliary totals.
 *
 * @example formatStatsCompact(15800, { inputTokens: 3000, outputTokens: 680, costUSD: 0.0048 })
 * // Returns: "⏱ 15.8s · 3.0k in / 680 out · $0.00"
 *
 * @example formatStatsCompact(15800, usage, { extraction: { inputTokens: 100, outputTokens: 50, costUSD: 0.001 } })
 * // Returns: "⏱ 15.8s · 3.1k in / 730 out · $0.01"
 */
export declare function formatStatsCompact(durationMs?: number, usage?: UsageStats, auxiliaryUsage?: AuxiliaryUsageMap): string;
//# sourceMappingURL=formatters.d.ts.map