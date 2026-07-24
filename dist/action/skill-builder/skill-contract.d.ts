import { z } from 'zod';
import type { UsageStats } from '../types/index.js';
export interface SkillBuildExternalSource {
    title: string;
    url: string;
    reason: string;
}
export interface SkillBuildAuthoringProvider {
    name: string;
    rootDir: string;
    contentHash: string;
}
export type GeneratedSkillAuthoringMode = 'build' | 'improve';
export declare const GeneratedSkillAuthoringPlanSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    summary: z.ZodString;
    workflow: z.ZodArray<z.ZodString>;
    researchPlan: z.ZodDefault<z.ZodArray<z.ZodString>>;
    sourceDecisions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        source: z.ZodString;
        decision: z.ZodString;
        implication: z.ZodString;
    }, z.core.$strict>>>;
    lookupQuestions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        question: z.ZodString;
        openWhen: z.ZodString;
        requiredEvidence: z.ZodArray<z.ZodString>;
    }, z.core.$strict>>>;
    qualityBar: z.ZodDefault<z.ZodArray<z.ZodString>>;
    artifactPlan: z.ZodArray<z.ZodString>;
    validationPlan: z.ZodArray<z.ZodString>;
    risks: z.ZodDefault<z.ZodArray<z.ZodString>>;
    missingInputs: z.ZodDefault<z.ZodArray<z.ZodString>>;
    externalSources: z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        url: z.ZodString;
        reason: z.ZodString;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export type GeneratedSkillAuthoringPlan = z.infer<typeof GeneratedSkillAuthoringPlanSchema>;
export declare const GeneratedSkillWriterResultSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    summary: z.ZodString;
    validationNotes: z.ZodDefault<z.ZodArray<z.ZodString>>;
    missingInputs: z.ZodDefault<z.ZodArray<z.ZodString>>;
    externalSources: z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        url: z.ZodString;
        reason: z.ZodString;
    }, z.core.$strict>>>;
}, z.core.$strip>;
export type GeneratedSkillWriterResult = z.infer<typeof GeneratedSkillWriterResultSchema>;
export declare const GeneratedSkillReviewIssueSchema: z.ZodObject<{
    severity: z.ZodEnum<{
        error: "error";
        warning: "warning";
    }>;
    path: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
    suggestedFix: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const GeneratedSkillReviewResultSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    valid: z.ZodBoolean;
    summary: z.ZodString;
    issues: z.ZodDefault<z.ZodArray<z.ZodObject<{
        severity: z.ZodEnum<{
            error: "error";
            warning: "warning";
        }>;
        path: z.ZodOptional<z.ZodString>;
        message: z.ZodString;
        suggestedFix: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>;
    missingInputs: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export type GeneratedSkillReviewResult = z.infer<typeof GeneratedSkillReviewResultSchema>;
export interface GeneratedSkillArtifact {
    kind: 'generated-skill';
    source: 'cache' | 'generated';
    name: string;
    path: string;
    bytes: number;
    durationMs: number;
    usage: UsageStats;
    externalSources: SkillBuildExternalSource[];
    missingInputs: string[];
    warnings: string[];
    responseModel?: string;
    numTurns?: number;
}
export declare class GeneratedSkillBuildError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
//# sourceMappingURL=skill-contract.d.ts.map