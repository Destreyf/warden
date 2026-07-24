import type { SkillDefinition } from '../config/schema.js';
import { type HunkWithContext } from '../diff/index.js';
import { type PromptPRContext } from './prompt-sections.js';
export type PRPromptContext = PromptPRContext;
/**
 * Builds the system prompt for hunk-based analysis.
 *
 * Future enhancement: Could have the agent output a structured `contextAssessment`
 * (applicationType, trustBoundaries, filesChecked) to cache across hunks, allow
 * user overrides, or build analytics. Not implemented since we don't consume it yet.
 */
export declare function buildHunkSystemPrompt(skill: SkillDefinition): string;
/**
 * Builds the user prompt for a single hunk.
 */
export declare function buildHunkUserPrompt(skill: SkillDefinition, hunkCtx: HunkWithContext, prContext?: PRPromptContext): string;
//# sourceMappingURL=prompt.d.ts.map