import type { Octokit } from '@octokit/rest';
import { type EventContext, type FileChange } from '../types/index.js';
export declare class EventContextError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
export interface BuildEventContextOptions {
    /** Use this file list instead of fetching pull request files from GitHub. */
    pullRequestFiles?: FileChange[];
    /** Skip file fetching and build PR metadata with an empty file list. */
    skipPullRequestFiles?: boolean;
}
export declare function buildEventContext(eventName: string, eventPayload: unknown, repoPath: string, octokit: Octokit, options?: BuildEventContextOptions): Promise<EventContext>;
export declare function fetchPullRequestFiles(octokit: Octokit, owner: string, repo: string, pullNumber: number): Promise<FileChange[]>;
//# sourceMappingURL=context.d.ts.map