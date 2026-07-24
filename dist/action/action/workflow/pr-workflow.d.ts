/**
 * PR Workflow
 *
 * Handles pull_request and push events. PR runs may execute in legacy `run`
 * mode or the split `analyze`/`report` flow: analyze owns skill execution and
 * artifact creation, while report owns GitHub writes and must only replay an
 * artifact that matches the current PR context.
 */
import type { Octokit } from '@octokit/rest';
import type { ActionInputs } from '../inputs.js';
/**
 * Dispatch PR and push events through legacy run mode or split analyze/report mode.
 */
export declare function runPRWorkflow(octokit: Octokit, inputs: ActionInputs, eventName: string, eventPath: string, repoPath: string): Promise<void>;
//# sourceMappingURL=pr-workflow.d.ts.map