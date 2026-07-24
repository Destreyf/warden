import type { CLIOptions, RunsOptions } from '../args.js';
import type { Reporter } from '../output/reporter.js';
/**
 * List sessions in `.warden/logs/`. Empty (no-file, no-skill) runs
 * are hidden unless `all` is set.
 */
export declare function runRunsList(options: CLIOptions, reporter: Reporter, listOptions?: {
    all?: boolean;
}): Promise<number>;
/**
 * Show results from JSONL log files (replaces `warden replay`).
 */
export declare function runRunsShow(runsOptions: RunsOptions, options: CLIOptions, reporter: Reporter): Promise<number>;
/**
 * Garbage-collect expired log files.
 */
export declare function runRunsGc(_options: CLIOptions, reporter: Reporter): Promise<number>;
/**
 * Tail a JSONL session file, rendering each appended record live.
 * Exits 0 on summary record or Ctrl-C — never on findings; this is a
 * viewer, not a build gate.
 */
export declare function runRunsFollow(runsOptions: RunsOptions, options: CLIOptions, reporter: Reporter): Promise<number>;
/** Dispatch to the appropriate `runs` subcommand. */
export declare function runRuns(runsOptions: RunsOptions, options: CLIOptions, reporter: Reporter): Promise<number>;
//# sourceMappingURL=runs.d.ts.map