import type { Runtime } from '../sdk/runtimes/index.js';
import { type SkillBuildOutline, type SkillBuildSource } from './outline-contract.js';
import { type GeneratedSkillAuthoringMode, type GeneratedSkillArtifact } from './skill-contract.js';
export { GeneratedSkillBuildError } from './skill-contract.js';
export declare function buildGeneratedSkill(args: {
    outline: SkillBuildOutline;
    source: SkillBuildSource;
    rootDir: string;
    runtime: Runtime;
    repoPath: string;
    mode?: GeneratedSkillAuthoringMode;
    improvementPrompt?: string;
    model?: string;
    maxTurns?: number;
    abortController?: AbortController;
    regenerate?: boolean;
    apiKey?: string;
    repairModel?: string;
    repairMaxRetries?: number;
    authoringSkillRoot?: string;
    onStatus?: (message: string) => void;
}): Promise<GeneratedSkillArtifact>;
//# sourceMappingURL=skill.d.ts.map