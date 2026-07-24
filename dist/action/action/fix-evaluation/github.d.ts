import type { Octokit } from '@octokit/rest';
/**
 * Result from fetching follow-up changes between two commits.
 */
export interface FollowUpChanges {
    /** Map of file path to patch content */
    patches: Map<string, string>;
    /** Commit messages from the follow-up commits */
    commitMessages: string[];
}
/**
 * Fetch the patches and commit messages between two commits.
 */
export declare function fetchFollowUpChanges(octokit: Octokit, owner: string, repo: string, baseSha: string, headSha: string): Promise<FollowUpChanges>;
/**
 * Fetch file content at a specific commit SHA.
 */
export declare function fetchFileContent(octokit: Octokit, owner: string, repo: string, path: string, sha: string): Promise<string>;
/**
 * Fetch specific lines from a file at a commit.
 * startLine and endLine are 1-indexed and inclusive.
 */
export declare function fetchFileLines(octokit: Octokit, owner: string, repo: string, path: string, sha: string, startLine: number, endLine: number): Promise<string>;
/**
 * Post a reply to a review thread.
 */
export declare function postThreadReply(octokit: Octokit, threadId: string, body: string): Promise<void>;
/**
 * Format a reply for a failed fix attempt.
 */
export declare function formatFailedFixReply(commitSha: string, reasoning: string): string;
//# sourceMappingURL=github.d.ts.map