import type { SkillReport, SeverityThreshold, ConfidenceThreshold } from '../types/index.js';
import { Verbosity } from './output/verbosity.js';
import type { OutputMode } from './output/tty.js';
interface RenderOptions {
    verbosity?: Verbosity;
}
/**
 * Render skill reports for terminal output.
 * @param reports - The skill reports to render
 * @param mode - Output mode (TTY vs non-TTY)
 */
export declare function renderTerminalReport(reports: SkillReport[], mode?: OutputMode, options?: RenderOptions): string;
/**
 * Filter reports to only include findings at or above the given severity threshold
 * and confidence threshold.
 * Returns new report objects with filtered findings; does not mutate the originals.
 * If reportOn is 'off', returns reports with empty findings.
 */
export declare function filterReports(reports: SkillReport[], reportOn?: SeverityThreshold, minConfidence?: ConfidenceThreshold): SkillReport[];
export {};
//# sourceMappingURL=terminal.d.ts.map