/**
 * Ink-based skill runner with real-time progress display.
 *
 * While skills run, the dynamic Ink area shows running skills and active files.
 * After Ink unmounts, the full per-skill + per-file breakdown is printed to
 * stderr, followed by the normal findings report.
 *
 * UI updates are batched via setImmediate() to prevent rapid consecutive
 * rerender() calls from producing duplicate output lines.
 *
 * Reporter spec: specs/reporters.md
 * Terminal output design guide: specs/terminal-output.md
 */
import { type SkillTaskOptions, type SkillTaskResult, type RunTasksOptions, type SkillState } from './tasks.js';
export declare function getSkillCostUSD(skill: SkillState): number | undefined;
/**
 * Run skill tasks with Ink-based real-time progress display.
 */
export declare function runSkillTasksWithInk(tasks: SkillTaskOptions[], options: RunTasksOptions): Promise<SkillTaskResult[]>;
//# sourceMappingURL=ink-runner.d.ts.map