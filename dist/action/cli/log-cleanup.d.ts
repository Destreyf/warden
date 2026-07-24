import type { LogCleanupMode } from '../config/schema.js';
import type { Reporter } from './output/reporter.js';
/**
 * Find .jsonl files in a directory that are older than retentionDays.
 */
export declare function findExpiredArtifacts(dir: string, retentionDays: number): string[];
/**
 * Clean up expired .jsonl artifact files based on the configured mode.
 * Works for both log and session directories.
 * Returns the number of files deleted.
 */
export declare function cleanupArtifacts(opts: {
    dir: string;
    retentionDays: number;
    mode: LogCleanupMode;
    isTTY: boolean;
    reporter: Reporter;
}): Promise<number>;
//# sourceMappingURL=log-cleanup.d.ts.map