/**
 * Normalize path separators to forward slashes for cross-platform consistency.
 */
export declare function normalizePath(path: string): string;
/**
 * Check whether a normalized path stays within a repository-relative boundary.
 */
export declare function isRepoRelativePath(path: string): boolean;
/**
 * Check whether a target string should be treated as a filesystem path.
 */
export declare function isPathLike(value: string): boolean;
/**
 * Resolve a user-supplied config input to the absolute path of a warden.toml
 * file. If the resolved path is a directory, appends 'warden.toml'; otherwise
 * treats the input as a direct file path.
 */
export declare function resolveConfigInput(input: string): string;
/**
 * Resolve a CLI path target against a base directory.
 */
export declare function resolvePathTarget(path: string, baseDir?: string): string;
//# sourceMappingURL=path.d.ts.map