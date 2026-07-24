import { z } from 'zod';
import type { HelpTarget } from './help.js';
export declare const CLIOptionsSchema: z.ZodObject<{
    targets: z.ZodOptional<z.ZodArray<z.ZodString>>;
    skill: z.ZodOptional<z.ZodString>;
    cwd: z.ZodOptional<z.ZodString>;
    configPath: z.ZodOptional<z.ZodString>;
    json: z.ZodDefault<z.ZodBoolean>;
    output: z.ZodOptional<z.ZodString>;
    traces: z.ZodDefault<z.ZodBoolean>;
    failOn: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        off: "off";
        low: "low";
        medium: "medium";
        high: "high";
    }>>>;
    reportOn: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        off: "off";
        low: "low";
        medium: "medium";
        high: "high";
    }>>>;
    minConfidence: z.ZodOptional<z.ZodEnum<{
        off: "off";
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
    help: z.ZodDefault<z.ZodBoolean>;
    parallel: z.ZodOptional<z.ZodNumber>;
    model: z.ZodOptional<z.ZodString>;
    effort: z.ZodOptional<z.ZodEnum<{
        off: "off";
        low: "low";
        medium: "medium";
        high: "high";
        xhigh: "xhigh";
        max: "max";
    }>>;
    runtime: z.ZodOptional<z.ZodEnum<{
        claude: "claude";
        pi: "pi";
    }>>;
    quiet: z.ZodDefault<z.ZodBoolean>;
    verbose: z.ZodDefault<z.ZodNumber>;
    debug: z.ZodDefault<z.ZodBoolean>;
    log: z.ZodDefault<z.ZodBoolean>;
    color: z.ZodOptional<z.ZodBoolean>;
    force: z.ZodDefault<z.ZodBoolean>;
    list: z.ZodDefault<z.ZodBoolean>;
    git: z.ZodDefault<z.ZodBoolean>;
    staged: z.ZodDefault<z.ZodBoolean>;
    remote: z.ZodOptional<z.ZodString>;
    offline: z.ZodDefault<z.ZodBoolean>;
    failFast: z.ZodDefault<z.ZodBoolean>;
    regenerate: z.ZodDefault<z.ZodBoolean>;
    prompt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CLIOptions = z.infer<typeof CLIOptionsSchema>;
export interface SetupAppOptions {
    org?: string;
    port: number;
    timeout: number;
    name?: string;
    open: boolean;
}
export type RunsSubcommand = 'list' | 'show' | 'gc' | 'follow';
export interface RunsOptions {
    subcommand: RunsSubcommand;
    files: string[];
    /** Include sessions with zero analyzed files in `list` output. */
    all?: boolean;
}
export interface ParsedArgs {
    command: 'run' | 'help' | 'init' | 'add' | 'version' | 'setup-app' | 'sync' | 'runs' | 'build' | 'improve';
    options: CLIOptions;
    helpTarget?: HelpTarget;
    setupAppOptions?: SetupAppOptions;
    runsOptions?: RunsOptions;
}
export declare function showVersion(): void;
export interface DetectTargetTypeOptions {
    /** Current working directory for filesystem checks */
    cwd?: string;
    /** Force git ref interpretation for ambiguous targets */
    forceGit?: boolean;
}
/**
 * Detect if a target looks like a git ref vs a file path.
 * Returns 'git' for git refs, 'file' for file paths.
 *
 * For ambiguous targets (no path separators, no extension), checks
 * if a file/directory exists at that path before defaulting to git ref.
 */
export declare function detectTargetType(target: string, options?: DetectTargetTypeOptions): 'git' | 'file';
/**
 * Classify targets into git refs and file patterns.
 */
export declare function classifyTargets(targets: string[], options?: DetectTargetTypeOptions): {
    gitRefs: string[];
    filePatterns: string[];
};
/**
 * Expand @file target references into newline-delimited target lists.
 */
export declare function expandTargetFileReferences(targets: string[], cwd?: string): string[];
export declare function parseCliArgs(argv?: string[]): ParsedArgs;
//# sourceMappingURL=args.d.ts.map