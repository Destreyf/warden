/**
 * Schedule Workflow
 *
 * Handles schedule and workflow_dispatch events.
 */
import type { Octokit } from '@octokit/rest';
import type { ActionInputs } from '../inputs.js';
export declare function runScheduleWorkflow(octokit: Octokit, inputs: ActionInputs, repoPath: string): Promise<void>;
//# sourceMappingURL=schedule.d.ts.map