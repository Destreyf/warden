/**
 * Task execution for skills.
 * Callback-based state updates for CLI and Ink rendering.
 *
 * Reporter spec: specs/reporters.md
 */
import type { SkillReport, SeverityThreshold, ConfidenceThreshold, Finding, UsageStats, EventContext, AuxiliaryUsageMap } from '../../types/index.js';
import type { SkillDefinition } from '../../config/schema.js';
import { type SkillRunnerOptions, type ChunkAnalysisResult, type FindingProcessingEvent } from '../../sdk/runner.js';
import { ProviderFailureCircuitBreaker } from '../../sdk/circuit-breaker.js';
import { Verbosity } from './verbosity.js';
import type { OutputMode } from './tty.js';
import { Semaphore } from '../../utils/index.js';
/**
 * State of a file being processed by a skill.
 */
export interface FileState {
    filename: string;
    status: 'pending' | 'running' | 'done' | 'skipped';
    currentHunk: number;
    totalHunks: number;
    findings: Finding[];
    usage?: UsageStats;
    durationMs?: number;
}
/**
 * State of a skill being executed.
 */
export interface SkillState {
    name: string;
    displayName: string;
    status: 'pending' | 'running' | 'done' | 'skipped' | 'error';
    startTime?: number;
    durationMs?: number;
    files: FileState[];
    findings: Finding[];
    usage?: UsageStats;
    auxiliaryUsage?: AuxiliaryUsageMap;
    error?: string;
}
/**
 * Result from running a skill task.
 */
export interface SkillTaskResult {
    name: string;
    report?: SkillReport;
    failOn?: SeverityThreshold;
    minConfidence?: ConfidenceThreshold;
    error?: unknown;
}
/**
 * Options for creating a skill task.
 */
export interface SkillTaskOptions {
    name: string;
    displayName?: string;
    triggerName?: string;
    failOn?: SeverityThreshold;
    minConfidence?: ConfidenceThreshold;
    /** Resolve the skill definition (may be async for loading) */
    resolveSkill: () => Promise<SkillDefinition>;
    /** The event context with files to analyze */
    context: EventContext;
    /** Options passed to the runner */
    runnerOptions?: SkillRunnerOptions;
}
/**
 * Options for running skill tasks.
 */
export interface RunTasksOptions {
    mode: OutputMode;
    verbosity: Verbosity;
    concurrency: number;
    /** Controller that fires when fail-fast detects a finding. Created by caller. */
    failFastController?: AbortController;
    /** Hook fired after each skill finishes; used by the CLI to stream JSONL to disk. */
    onSkillComplete?: (report: SkillReport) => void;
    /** Hook fired after each chunk finishes; used by the CLI to stream JSONL to disk. */
    onChunkComplete?: (skillName: string, chunk: ChunkAnalysisResult) => void;
}
/**
 * Callbacks for reporting skill execution progress to the UI.
 */
export interface SkillProgressCallbacks {
    onSkillStart: (skill: SkillState) => void;
    onSkillUpdate: (name: string, updates: Partial<SkillState>) => void;
    onFileUpdate: (skillName: string, filename: string, updates: Partial<FileState>) => void;
    /** Called when a hunk analysis starts (one SDK invocation per hunk) */
    onHunkStart?: (skillName: string, filename: string, hunkNum: number, totalHunks: number, lineRange: string) => void;
    onChunkComplete?: (skillName: string, chunk: ChunkAnalysisResult) => void;
    onSkillComplete: (name: string, report: SkillReport) => void;
    onSkillSkipped: (name: string) => void;
    onSkillError: (name: string, error: string) => void;
    /** Called when a prompt exceeds the large prompt threshold */
    onLargePrompt?: (skillName: string, filename: string, lineRange: string, chars: number, estimatedTokens: number) => void;
    /** Called with prompt size info in debug mode */
    onPromptSize?: (skillName: string, filename: string, lineRange: string, systemChars: number, userChars: number, totalChars: number, estimatedTokens: number) => void;
    /** Called with extraction result details (debug mode) */
    onExtractionResult?: (skillName: string, filename: string, lineRange: string, findingsCount: number, method: 'regex' | 'llm' | 'none') => void;
    /** Called when findings are dropped, revised, merged, or stripped after analysis */
    onFindingProcessing?: (skillName: string, event: FindingProcessingEvent) => void;
    /** Called when hunk analysis fails (SDK error, API error, abort) */
    onHunkFailed?: (skillName: string, filename: string, lineRange: string, error: string) => void;
    /** Called when findings extraction fails (both regex and LLM fallback failed) */
    onExtractionFailure?: (skillName: string, filename: string, lineRange: string, error: string, preview: string) => void;
    /** Called when a retry attempt is made */
    onRetry?: (skillName: string, filename: string, lineRange: string, attempt: number, maxRetries: number, error: string, delayMs: number) => void;
}
/**
 * Run a single skill task.
 */
export declare function runSkillTask(options: SkillTaskOptions, fileConcurrency: number, callbacks: SkillProgressCallbacks, semaphore?: Semaphore): Promise<SkillTaskResult>;
/**
 * Create default progress callbacks for console output.
 * In TTY mode: colored icons, chalk formatting.
 * In non-TTY/log mode: timestamped lines with finding details.
 */
export declare function createDefaultCallbacks(tasks: SkillTaskOptions[], mode: OutputMode, verbosity: Verbosity): SkillProgressCallbacks;
/**
 * Share abort/circuit state across task runner options.
 */
export declare function composeTasksWithFailFast(tasks: SkillTaskOptions[], failFastController?: AbortController, circuitBreaker?: ProviderFailureCircuitBreaker, circuitAbortController?: AbortController): SkillTaskOptions[];
/**
 * Launch all skill tasks in parallel using a shared semaphore for concurrency.
 */
export declare function runComposedSkillTasks(tasks: SkillTaskOptions[], callbacks: SkillProgressCallbacks, semaphore: Semaphore): Promise<SkillTaskResult[]>;
/**
 * Run multiple skill tasks with optional concurrency.
 * Uses callbacks to report progress for Ink rendering.
 */
export declare function runSkillTasks(tasks: SkillTaskOptions[], options: RunTasksOptions, callbacks?: SkillProgressCallbacks): Promise<SkillTaskResult[]>;
//# sourceMappingURL=tasks.d.ts.map