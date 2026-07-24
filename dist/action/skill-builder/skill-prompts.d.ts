import type { GeneratedSkillAuthoringPlan, GeneratedSkillAuthoringMode, GeneratedSkillReviewResult, SkillBuildExternalSource } from './skill-contract.js';
import type { SkillBuildOutline, SkillBuildSource } from './outline-contract.js';
interface GeneratedSkillArtifactSnapshot {
    summary: string;
    files: {
        path: string;
        content: string;
    }[];
    validationNotes: string[];
    missingInputs: string[];
    externalSources: SkillBuildExternalSource[];
}
export declare function defaultBuildMaxTurns(): number;
export declare function defaultValidationMaxTurns(): number;
export declare function authoringSystemPrompt(): string;
export declare function buildAuthoringPlanPrompt(args: {
    outline: SkillBuildOutline;
    source: SkillBuildSource;
    authoringSkillRoot: string;
    targetName: string;
    targetRootDir: string;
    mode?: GeneratedSkillAuthoringMode;
    improvementPrompt?: string;
}): string;
export declare function buildAuthoringImplementationPrompt(args: {
    outline: SkillBuildOutline;
    source: SkillBuildSource;
    authoringSkillRoot: string;
    targetName: string;
    targetRootDir: string;
    plan: GeneratedSkillAuthoringPlan;
    mode?: GeneratedSkillAuthoringMode;
    improvementPrompt?: string;
}): string;
export declare function buildAuthoringValidationPrompt(args: {
    outline: SkillBuildOutline;
    source: SkillBuildSource;
    authoringSkillRoot: string;
    targetName: string;
    targetRootDir: string;
    plan: GeneratedSkillAuthoringPlan;
    artifact: GeneratedSkillArtifactSnapshot;
    deterministicIssues: string[];
    mode?: GeneratedSkillAuthoringMode;
    improvementPrompt?: string;
}): string;
export declare function buildAuthoringRevisionPrompt(args: {
    outline: SkillBuildOutline;
    source: SkillBuildSource;
    authoringSkillRoot: string;
    targetName: string;
    targetRootDir: string;
    plan: GeneratedSkillAuthoringPlan;
    artifact: GeneratedSkillArtifactSnapshot;
    review: GeneratedSkillReviewResult;
    deterministicIssues: string[];
    mode?: GeneratedSkillAuthoringMode;
    improvementPrompt?: string;
}): string;
export {};
//# sourceMappingURL=skill-prompts.d.ts.map