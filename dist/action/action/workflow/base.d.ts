/**
 * Workflow Base
 *
 * Shared infrastructure for PR and schedule workflows.
 */
import type { Octokit } from '@octokit/rest';
import type { EventContext, SkillReport } from '../../types/index.js';
import type { FindingObservation } from '../reporting/outcomes.js';
import type { IncrementalOutput, ReplayTriggerResult } from '../reporting/output.js';
import type { RuntimeName } from '../../sdk/runtimes/index.js';
import type { ActionInputs } from '../inputs.js';
import type { TriggerResult } from '../triggers/executor.js';
/**
 * Sentinel error thrown by setFailed() so the top-level catch handler
 * can distinguish expected failures from unexpected crashes.
 */
export declare class ActionFailedError extends Error {
    constructor(message: string);
}
/**
 * Set a GitHub Actions output variable.
 */
export declare function setOutput(name: string, value: string | number): void;
/**
 * Fail the GitHub Action with an error message.
 * Throws ActionFailedError so spans end cleanly before the process exits.
 */
export declare function setFailed(message: string): never;
/** Validate Claude runtime auth before invoking the Claude Code SDK. */
export declare function ensureClaudeAuth(inputs: ActionInputs): void;
/**
 * Start a collapsible log group.
 */
export declare function logGroup(name: string): void;
/**
 * End a collapsible log group.
 */
export declare function logGroupEnd(): void;
export interface RuntimeEnvironment {
    pathToClaudeCodeExecutable?: string;
}
/** Prepare runtime-specific process dependencies required by matched triggers. */
export declare function prepareRuntimeEnvironment(triggers: Iterable<{
    runtime?: RuntimeName;
}>, inputs: ActionInputs): Promise<RuntimeEnvironment>;
/**
 * Find the Claude Code CLI executable path, installing it on demand when the
 * selected runtime needs Claude Code in CI.
 */
export declare function findClaudeCodeExecutable(): Promise<string>;
/**
 * Log trigger error summary and, by default, fail if all triggers failed.
 */
export declare function handleTriggerErrors(triggerErrors: string[], totalTriggers: number, options?: {
    failAll?: boolean;
}): void;
/**
 * Collect error messages from trigger results.
 */
export declare function collectTriggerErrors(results: TriggerResult[]): string[];
export interface WorkflowOutputs {
    findingsCount: number;
    highCount: number;
    summary: string;
}
/**
 * Compute workflow outputs from reports.
 */
export declare function computeWorkflowOutputs(reports: SkillReport[]): WorkflowOutputs;
/**
 * Set workflow output variables.
 */
export declare function setWorkflowOutputs(outputs: WorkflowOutputs): void;
/**
 * Get the authenticated bot's login name.
 *
 * Tries three strategies in order:
 * 1. GraphQL `viewer` query (works for both installation tokens and PATs)
 * 2. `octokit.apps.getAuthenticated()` → `${slug}[bot]` (GitHub App JWT fallback)
 * 3. `octokit.users.getAuthenticated()` (PAT fallback)
 */
export declare function getAuthenticatedBotLogin(octokit: Octokit): Promise<string | null>;
/**
 * Get the default branch for a repository from the GitHub API.
 */
export declare function getDefaultBranchFromAPI(octokit: Octokit, owner: string, repo: string): Promise<string>;
/**
 * Get the path for the findings output file.
 *
 * Uses the GitHub Actions workspace when available so action consumers can pass
 * the output to upload actions that expect repo-relative paths. Falls back to
 * RUNNER_TEMP for local callers and tests.
 */
export declare function getFindingsOutputPath(repoPath?: string): string;
/**
 * Write structured findings data to a JSON file for external export (GCS, S3, etc.).
 *
 * Sets `findings-file` to a repo-relative path when possible so downstream
 * steps can reference the path without tripping ignore processors on absolute
 * runner temp paths.
 */
export declare function writeFindingsOutput(reports: SkillReport[], context: EventContext, findingObservations?: FindingObservation[], options?: {
    triggerResults?: ReplayTriggerResult[];
    incremental?: IncrementalOutput;
}): string;
//# sourceMappingURL=base.d.ts.map