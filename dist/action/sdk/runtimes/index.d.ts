import type { Runtime, RuntimeName } from './types.js';
export { claudeRuntime } from './claude.js';
export { piRuntime } from './pi.js';
export type { AuxiliaryRunRequest, AuxiliaryRunResult, AuxiliaryTask, AuxiliaryTool, Runtime, RuntimeName, SynthesisRunRequest, SynthesisTask, SkillRunOptions, SkillRunRequest, SkillRunResponse, SkillRunResult, SkillRunStatus, } from './types.js';
/** Return the runtime adapter for model-backed execution. */
export declare function getRuntime(name?: RuntimeName): Runtime;
export interface RuntimeProviderOptionsInput {
    pathToClaudeCodeExecutable?: string;
}
/**
 * Build provider-specific runtime options at the runtime boundary.
 */
export declare function getRuntimeProviderOptions(name: RuntimeName, options: RuntimeProviderOptionsInput): unknown;
//# sourceMappingURL=index.d.ts.map