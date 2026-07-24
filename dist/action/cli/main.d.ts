import type { SkillDefinition, WardenConfig, Effort } from '../config/schema.js';
import { type SkillRunnerOptions } from '../sdk/runner.js';
import { type InvalidPiModelSelector } from '../sdk/runtimes/model-selectors.js';
import type { SkillReport, SeverityThreshold, ConfidenceThreshold, SkillError } from '../types/index.js';
import { type CLIOptions } from './args.js';
import { buildLocalEventContext } from './context.js';
import { Reporter, runSkillTasks, type JsonlChunkRecord, type JsonlRunMetadata, type SkillTaskOptions } from './output/index.js';
/**
 * Global abort controller for graceful shutdown on SIGINT.
 * Used to cancel in-progress SDK queries.
 */
export declare const abortController: AbortController;
/**
 * Track whether SIGINT was received so the main flow can
 * render partial results and exit with code 130.
 */
export declare const interrupted: {
    value: boolean;
};
/** Resolve the directory Warden should treat as the invocation root. */
export declare function resolveInvocationCwd(baseCwd: string, cliCwd: string | undefined): string;
/**
 * In-flight JSONL log state for a run. Chunk records are streamed while
 * skills run, then rewritten from final reports after post-processing.
 * A path is dropped from `paths` if its initial write failed.
 */
export interface RunLog {
    paths: string[];
    primaryLogPath: string;
    primaryLogWritten: boolean;
    outputPath: string | undefined;
    startTime: number;
    baseRun: Omit<JsonlRunMetadata, 'durationMs'>;
    chunks: JsonlChunkRecord[];
}
/**
 * Append a report-level JSONL record when streaming has not already captured one.
 */
export declare function appendReportToRunLog(log: RunLog, report: SkillReport): void;
/**
 * Build finalized chunk records from streamed chunks and final reports.
 */
export declare function buildFinalChunkRecords(log: RunLog, reports: SkillReport[], totalDurationMs: number, error?: SkillError): JsonlChunkRecord[];
/**
 * Render the finalized JSONL content for a run log.
 */
export declare function renderFinalRunLogContent(log: RunLog, reports: SkillReport[], totalDurationMs: number, error?: SkillError): string;
export interface RunSkillSpec {
    name: string;
    displayName?: string;
    triggerName?: string;
    skill: string;
    remote?: string;
    failOn?: SeverityThreshold;
    minConfidence?: ConfidenceThreshold;
    context: Awaited<ReturnType<typeof buildLocalEventContext>>;
    runnerOptions: SkillRunnerOptions;
}
interface ProcessedResults {
    reports: SkillReport[];
    filteredReports: SkillReport[];
    hasFailure: boolean;
    failureReasons: string[];
}
type SkillRunnerOptionOverrides = Pick<SkillRunnerOptions, 'model' | 'maxTurns' | 'effort' | 'runtime' | 'auxiliaryModel' | 'synthesisModel' | 'auxiliaryMaxRetries' | 'verifyFindings'>;
/** Format a skill source path for the CLI run header. */
export declare function formatSkillSource(skill: Pick<SkillDefinition, 'rootDir'>, repoPath?: string): string | undefined;
/** Apply per-skill runner overrides on top of the shared execution defaults. */
export declare function mergeSkillRunnerOptions(base: SkillRunnerOptions, overrides: SkillRunnerOptionOverrides): SkillRunnerOptions;
/**
 * Find the first Pi runner option using a model ID that is not provider/model.
 */
export declare function findInvalidPiModelSelector(specs: Pick<RunSkillSpec, 'name' | 'runnerOptions'>[]): InvalidPiModelSelector | undefined;
/** Expand configured skills into runnable direct tasks. */
export declare function createSkillTasks(args: {
    specs: RunSkillSpec[];
    repoPath?: string;
    options: CLIOptions;
    parallel: number;
    reporter: Reporter;
}): Promise<SkillTaskOptions[]>;
/** Resolve the default analysis model from config, CLI overrides, or environment. */
export declare function resolveCliDefaultModel(config: Pick<WardenConfig, 'defaults'> | null | undefined, cliModel?: string): string | undefined;
/** Resolve the default auxiliary model used for helper and repair passes. */
export declare function resolveCliDefaultAuxiliaryModel(config: Pick<WardenConfig, 'defaults'> | null | undefined): string | undefined;
/** Resolve the default synthesis model, falling back to the auxiliary lane when unset. */
export declare function resolveCliDefaultSynthesisModel(config: Pick<WardenConfig, 'defaults'> | null | undefined): string | undefined;
/** Resolve the model label recorded in JSONL output, including the default sentinel. */
export declare function resolveCliLogModel(config: Pick<WardenConfig, 'defaults'> | null | undefined, cliModel?: string): string;
/** Resolve run-scoped effort, with the CLI flag overriding config. */
export declare function resolveCliEffort(config: Pick<WardenConfig, 'defaults'> | null | undefined, cliEffort?: Effort): Effort | undefined;
/**
 * Process skill task results into reports and check for failures.
 * Exported for testing; callers inside main.ts use it directly.
 */
export declare function processTaskResults(results: Awaited<ReturnType<typeof runSkillTasks>>, reportOn: CLIOptions['reportOn'], minConfidence?: ConfidenceThreshold): ProcessedResults;
/** Run one or more skills against an already constructed review context. */
export declare function runSkills(context: Awaited<ReturnType<typeof buildLocalEventContext>>, options: CLIOptions, reporter: Reporter): Promise<number>;
/** Parse CLI input, dispatch the selected command, and perform shutdown cleanup. */
export declare function main(): Promise<void>;
export {};
//# sourceMappingURL=main.d.ts.map