import type { FileChange } from '../types/index.js';
import type { IgnoreConfig, ScanConfig } from '../config/schema.js';
export interface ExpandGlobOptions {
    /** Working directory for glob expansion (default: process.cwd()) */
    cwd?: string;
    /** Respect .gitignore files (default: true) */
    gitignore?: boolean;
}
export interface SyntheticFileChangeOptions {
    ignore?: IgnoreConfig;
    scan?: ScanConfig;
}
/**
 * Expand glob patterns to a list of file paths.
 *
 * By default, respects .gitignore files to automatically exclude ignored
 * directories like node_modules/. This can be disabled by setting
 * gitignore: false.
 */
export declare function expandFileGlobs(patterns: string[], cwdOrOptions?: string | ExpandGlobOptions): Promise<string[]>;
/**
 * Create a unified diff patch for a file, treating entire content as added.
 */
export declare function createPatchFromContent(content: string): string;
/**
 * Read a file and create a synthetic FileChange treating it as newly added.
 * Scan limits can return a patchless placeholder without reading file content.
 */
export declare function createSyntheticFileChange(absolutePath: string, basePath: string, options?: SyntheticFileChangeOptions): FileChange;
/**
 * Process a list of file paths into FileChange objects.
 */
export declare function createSyntheticFileChanges(absolutePaths: string[], basePath: string, options?: SyntheticFileChangeOptions): FileChange[];
/**
 * Expand glob patterns and create FileChange objects for all matching files.
 */
export declare function expandAndCreateFileChanges(patterns: string[], cwd?: string, options?: SyntheticFileChangeOptions): Promise<FileChange[]>;
//# sourceMappingURL=files.d.ts.map