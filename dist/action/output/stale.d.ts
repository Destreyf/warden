import type { Octokit } from '@octokit/rest';
import type { ExistingComment } from './dedup.js';
import type { Finding, FileChange } from '../types/index.js';
/**
 * Scope of analyzed files in the PR.
 */
export interface AnalyzedScope {
    /** Set of file paths that were in the diff */
    files: Set<string>;
}
export interface FindStaleCommentsOptions {
    /** How to treat unresolved comments outside the analyzed scope. */
    outOfScope?: 'stale' | 'ignore';
}
/**
 * Build the analyzed scope from file changes.
 */
export declare function buildAnalyzedScope(fileChanges: FileChange[]): AnalyzedScope;
/**
 * Check if a comment's file was in the analyzed scope.
 * Only comments on files that were analyzed should be considered for resolution.
 */
export declare function isInAnalyzedScope(comment: ExistingComment, scope: AnalyzedScope): boolean;
/**
 * Check if a finding matches a comment (same location and similar content).
 * Checks both the primary location and any additional locations.
 */
export declare function findingMatchesComment(finding: Finding, comment: ExistingComment): boolean;
/**
 * Find comments that no longer have matching findings (stale comments).
 * Only considers comments on files that were in the analyzed scope.
 */
export declare function findStaleComments(existingComments: ExistingComment[], allFindings: Finding[], scope: AnalyzedScope, options?: FindStaleCommentsOptions): ExistingComment[];
export interface ResolveResult {
    resolvedCount: number;
    resolvedIds: Set<number>;
}
interface ResolveOptions {
    failOnError?: boolean;
}
/**
 * Resolve stale comment threads via GraphQL.
 * Returns the count and IDs of threads successfully resolved.
 * Limited to MAX_STALE_RESOLUTIONS per run as a safeguard.
 * Set failOnError when stale cleanup is part of report-mode delivery.
 */
export declare function resolveStaleComments(octokit: Octokit, staleComments: ExistingComment[], options?: ResolveOptions): Promise<ResolveResult>;
export {};
//# sourceMappingURL=stale.d.ts.map