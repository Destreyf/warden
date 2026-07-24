import { z } from 'zod';
import type { UsageStats } from '../types/index.js';
export declare const SKILL_BUILD_VERSION = "1";
export declare const SKILL_BUILD_OUTLINE_SCHEMA_VERSION = 1;
export declare const SkillBuildExternalSourceSchema: z.ZodObject<{
    title: z.ZodString;
    url: z.ZodString;
    reason: z.ZodString;
}, z.core.$strict>;
export declare const SkillBuildPhaseSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<{
        cached: "cached";
        generated: "generated";
        validated: "validated";
    }>;
}, z.core.$strict>;
export declare const SkillBuildScopeProfileSchema: z.ZodObject<{
    kind: z.ZodEnum<{
        repository: "repository";
        ecosystem: "ecosystem";
        domain: "domain";
        product: "product";
    }>;
    subject: z.ZodString;
    localContextUsed: z.ZodBoolean;
    observedContext: z.ZodArray<z.ZodString>;
    unresolvedContext: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const SkillBuildTrackSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    goal: z.ZodString;
    rationale: z.ZodString;
    sourceSignals: z.ZodArray<z.ZodString>;
    owns: z.ZodArray<z.ZodString>;
    excludes: z.ZodDefault<z.ZodArray<z.ZodString>>;
    relevanceSignals: z.ZodArray<z.ZodString>;
    evidenceFocus: z.ZodArray<z.ZodString>;
    checks: z.ZodArray<z.ZodString>;
    safeCounterpatterns: z.ZodArray<z.ZodString>;
    falsePositiveTraps: z.ZodArray<z.ZodString>;
    researchHints: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const SkillBuildOutlineSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    skill: z.ZodString;
    sourceHash: z.ZodString;
    buildVersion: z.ZodString;
    scopeProfile: z.ZodObject<{
        kind: z.ZodEnum<{
            repository: "repository";
            ecosystem: "ecosystem";
            domain: "domain";
            product: "product";
        }>;
        subject: z.ZodString;
        localContextUsed: z.ZodBoolean;
        observedContext: z.ZodArray<z.ZodString>;
        unresolvedContext: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>;
    build: z.ZodObject<{
        phases: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            status: z.ZodEnum<{
                cached: "cached";
                generated: "generated";
                validated: "validated";
            }>;
        }, z.core.$strict>>;
        externalSources: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            url: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strict>>>;
    }, z.core.$strict>;
    tracks: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        goal: z.ZodString;
        rationale: z.ZodString;
        sourceSignals: z.ZodArray<z.ZodString>;
        owns: z.ZodArray<z.ZodString>;
        excludes: z.ZodDefault<z.ZodArray<z.ZodString>>;
        relevanceSignals: z.ZodArray<z.ZodString>;
        evidenceFocus: z.ZodArray<z.ZodString>;
        checks: z.ZodArray<z.ZodString>;
        safeCounterpatterns: z.ZodArray<z.ZodString>;
        falsePositiveTraps: z.ZodArray<z.ZodString>;
        researchHints: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type SkillBuildOutline = z.infer<typeof SkillBuildOutlineSchema>;
export interface SkillBuildSourceFile {
    path: string;
    content: string;
}
export interface SkillBuildSource {
    hash: string;
    files: SkillBuildSourceFile[];
}
export type SkillBuildOutlineSource = 'cache' | 'generated';
export interface SkillBuildOutlineResult {
    outline: SkillBuildOutline;
    source: SkillBuildOutlineSource;
    statePath: string;
    usage?: UsageStats;
    durationMs?: number;
    responseModel?: string;
    numTurns?: number;
}
export declare function outlineHash(outline: SkillBuildOutline): string;
//# sourceMappingURL=outline-contract.d.ts.map