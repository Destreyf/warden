import type { Effort, SkillDefinition } from '../config/schema.js';
import { type Finding, type UsageStats } from '../types/index.js';
import { type RuntimeName } from './runtimes/index.js';
import type { FindingProcessingEvent } from './types.js';
import { type PromptPRContext } from './prompt-sections.js';
export interface VerifyFindingsOptions {
    repoPath: string;
    skill: SkillDefinition;
    apiKey?: string;
    runtime?: RuntimeName;
    model?: string;
    maxTurns?: number;
    effort?: Effort;
    abortController?: AbortController;
    pathToClaudeCodeExecutable?: string;
    prContext?: PromptPRContext;
    onFindingProcessing?: (event: FindingProcessingEvent) => void;
}
export interface VerifyFindingsResult {
    findings: Finding[];
    usage?: UsageStats;
}
/**
 * Verify candidate findings with a second read-only repo-aware agent pass.
 */
export declare function verifyFindings(findings: Finding[], options: VerifyFindingsOptions): Promise<VerifyFindingsResult>;
//# sourceMappingURL=verify.d.ts.map