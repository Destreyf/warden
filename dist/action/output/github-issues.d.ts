import type { Octokit } from '@octokit/rest';
import type { SkillReport } from '../types/index.js';
export interface IssueResult {
    issueNumber: number;
    issueUrl: string;
    created: boolean;
}
export interface CreateIssueOptions {
    title: string;
    commitSha: string;
}
/**
 * Create or update a GitHub issue with findings.
 * Searches for existing open issue by title prefix, updates if found.
 */
export declare function createOrUpdateIssue(octokit: Octokit, owner: string, repo: string, reports: SkillReport[], options: CreateIssueOptions): Promise<IssueResult | null>;
//# sourceMappingURL=github-issues.d.ts.map