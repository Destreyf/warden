import { type IgnoreConfig, type ScanConfig } from '../config/schema.js';
import type { DiffContextSource, FileChange, SkippedFile } from '../types/index.js';
export interface ScanPolicyOptions {
    repoPath: string;
    ignore?: IgnoreConfig;
    scan?: ScanConfig;
    diffContextSource?: DiffContextSource;
    /** Whether to enforce PR/diff changed-line scan budgets. Defaults to true. */
    enforceChangedLineBudget?: boolean;
}
export type ScannableFileChange = FileChange & {
    patch: string;
};
export interface ApplyScanPolicyResult {
    files: ScannableFileChange[];
    skippedFiles: SkippedFile[];
}
/**
 * Return the scan-limit skip reason for a file without reading more content than needed.
 */
export declare function getFileLimitSkip(filename: string, repoPath: string, config?: ScanConfig, diffContextSource?: DiffContextSource): SkippedFile | undefined;
/**
 * Return scan-policy skips that can be decided before synthetic patch creation.
 */
export declare function getPrePatchFileSkip(filename: string, options: ScanPolicyOptions, file?: FileChange): SkippedFile | undefined;
/**
 * Apply Warden's global file ignore policy and scan budgets.
 *
 * The budget pass intentionally keeps existing file order for now. If large PRs
 * need smarter coverage later, this is the place to add deterministic sampling
 * or scoring before the budget is consumed.
 */
export declare function applyScanPolicy(files: FileChange[], options: ScanPolicyOptions): ApplyScanPolicyResult;
//# sourceMappingURL=scan-policy.d.ts.map