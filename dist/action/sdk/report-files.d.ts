import type { FileReport, Finding, UsageStats } from '../types/index.js';
export interface FileReportInput {
    filename: string;
    durationMs?: number;
    usage?: UsageStats;
}
/**
 * Return whether a final finding should be counted against a file.
 */
export declare function findingAppliesToFile(finding: Finding, filename: string): boolean;
/**
 * Count final findings per file while preserving timing and usage metadata.
 */
export declare function buildFileReports(files: FileReportInput[], findings: Finding[]): FileReport[];
//# sourceMappingURL=report-files.d.ts.map