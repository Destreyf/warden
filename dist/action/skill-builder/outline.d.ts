import type { SkillDefinition } from '../config/schema.js';
import type { Runtime, RuntimeName } from '../sdk/runtimes/index.js';
import { type SkillBuildOutline, type SkillBuildOutlineResult, type SkillBuildSource } from './outline-contract.js';
export { outlineHash, SKILL_BUILD_OUTLINE_SCHEMA_VERSION, SKILL_BUILD_VERSION, SkillBuildOutlineSchema } from './outline-contract.js';
export type { SkillBuildOutline, SkillBuildOutlineResult, SkillBuildSource, SkillBuildSourceFile } from './outline-contract.js';
export declare const SKILL_BUILD_MAX_TOKENS = 64000;
export declare const SKILL_BUILD_TIMEOUT_MS = 180000;
export declare const SKILL_BUILD_MAX_TURNS = 80;
export interface BuildSkillOutlineOptions {
    skill: SkillDefinition;
    runtime?: Runtime;
    runtimeName?: RuntimeName;
    apiKey?: string;
    model?: string;
    previousOutline?: SkillBuildOutline;
    maxRetries?: number;
    regenerate?: boolean;
    abortController?: AbortController;
    repoPath?: string;
    maxTurns?: number;
    repairModel?: string;
    repairMaxRetries?: number;
    onStatus?: (message: string) => void;
    source?: SkillBuildSource;
}
export declare class SkillBuildOutlineError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
export declare function collectSkillBuildSource(skill: SkillDefinition): SkillBuildSource;
/** Collect the improvement brief and current artifacts as source material. */
export declare function collectSkillImproveSource(skill: SkillDefinition, improvementPrompt: string): SkillBuildSource;
export declare function buildSkillOutline(options: BuildSkillOutlineOptions): Promise<SkillBuildOutlineResult>;
export declare function defaultOutlineExportPath(skillName: string): string;
//# sourceMappingURL=outline.d.ts.map