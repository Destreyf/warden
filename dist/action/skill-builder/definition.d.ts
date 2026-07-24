import { z } from 'zod';
import type { SkillDefinition } from '../config/schema.js';
export declare const GENERATED_SKILLS_DIR = ".warden/skills";
export declare const GENERATED_SKILL_DEFINITION_FILE = "warden.yaml";
export declare const BUILD_STATE_FILE = "build-state.json";
export declare const GeneratedSkillDefinitionSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    kind: z.ZodLiteral<"generated-skill">;
    name: z.ZodString;
    prompt: z.ZodString;
    instructions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    coverage: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$loose>;
export type GeneratedSkillDefinition = z.infer<typeof GeneratedSkillDefinitionSchema>;
/** A generated skill target resolved from a CLI name or filesystem path. */
export interface GeneratedSkillTarget {
    displayName: string;
    isPath: boolean;
    rootDir: string;
}
export interface GeneratedSkillArtifactFile {
    path: string;
    content: string;
    bytes: number;
}
export declare function inferGeneratedSkillDescription(name: string, prompt: string): string;
export declare function getGeneratedSkillRoot(repoRoot: string, skillName: string): string;
export declare function generatedSkillDefinitionRootExists(rootDir: string): boolean;
/** Resolve a generated skill CLI target using the shared name and path semantics. */
export declare function resolveGeneratedSkillTarget(repoRoot: string, target: string): GeneratedSkillTarget;
export declare function resolveGeneratedSkillRoot(repoRoot: string, skillName: string): string;
export declare function loadGeneratedSkillDefinition(rootDir: string): {
    content: string;
    data: GeneratedSkillDefinition;
};
export declare function buildGeneratedSkillDefinition(rootDir: string): SkillDefinition;
export declare function createGeneratedSkillDefinition(args: {
    repoRoot: string;
    name: string;
    prompt: string;
    rootDir?: string;
}): SkillDefinition;
export declare function clearGeneratedSkillArtifacts(rootDir: string): void;
/** Read generated runtime artifacts while excluding Warden-owned metadata files. */
export declare function readGeneratedSkillArtifactFiles(rootDir: string): GeneratedSkillArtifactFile[];
//# sourceMappingURL=definition.d.ts.map