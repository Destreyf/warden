import { z } from 'zod';
import type { Finding } from '../../types/index.js';
export type FindingOutcome = 'posted' | 'deduped' | 'skipped' | 'resolved' | 'failed';
export type DedupeSource = 'warden' | 'external';
export type DedupeMatchType = 'hash' | 'semantic';
export type SkippedReason = 'max_findings' | 'duplicate_in_batch' | 'no_inline_location';
export type ResolvedReason = 'fix_evaluation' | 'stale_check';
export declare const DedupeDetailSchema: z.ZodObject<{
    source: z.ZodEnum<{
        warden: "warden";
        external: "external";
    }>;
    matchType: z.ZodEnum<{
        hash: "hash";
        semantic: "semantic";
    }>;
    existingFindingId: z.ZodOptional<z.ZodString>;
    existingCommentId: z.ZodOptional<z.ZodNumber>;
    existingThreadId: z.ZodOptional<z.ZodString>;
    existingResolved: z.ZodOptional<z.ZodBoolean>;
    actor: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DedupeDetail = z.infer<typeof DedupeDetailSchema>;
interface BaseFindingObservation {
    finding: Finding;
    skill?: string;
}
export interface PostedFindingObservation extends BaseFindingObservation {
    outcome: 'posted';
}
export interface DedupedFindingObservation extends BaseFindingObservation {
    outcome: 'deduped';
    dedupe: DedupeDetail;
}
export interface SkippedFindingObservation extends BaseFindingObservation {
    outcome: 'skipped';
    skippedReason: SkippedReason;
}
export interface ResolvedFindingObservation extends BaseFindingObservation {
    outcome: 'resolved';
    resolvedReason: ResolvedReason;
}
export interface FailedFindingObservation extends BaseFindingObservation {
    outcome: 'failed';
}
export type FindingObservation = PostedFindingObservation | DedupedFindingObservation | SkippedFindingObservation | ResolvedFindingObservation | FailedFindingObservation;
export declare const FindingObservationSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    outcome: z.ZodLiteral<"posted">;
    finding: z.ZodObject<{
        id: z.ZodString;
        severity: z.ZodPreprocess<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        confidence: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        title: z.ZodString;
        description: z.ZodString;
        verification: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        additionalLocations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        sourceSnippet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            language: z.ZodOptional<z.ZodString>;
            startLine: z.ZodNumber;
            endLine: z.ZodNumber;
            targetStartLine: z.ZodNumber;
            targetEndLine: z.ZodNumber;
            lines: z.ZodArray<z.ZodObject<{
                line: z.ZodNumber;
                content: z.ZodString;
                highlighted: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        elapsedMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    skill: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    outcome: z.ZodLiteral<"deduped">;
    finding: z.ZodObject<{
        id: z.ZodString;
        severity: z.ZodPreprocess<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        confidence: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        title: z.ZodString;
        description: z.ZodString;
        verification: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        additionalLocations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        sourceSnippet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            language: z.ZodOptional<z.ZodString>;
            startLine: z.ZodNumber;
            endLine: z.ZodNumber;
            targetStartLine: z.ZodNumber;
            targetEndLine: z.ZodNumber;
            lines: z.ZodArray<z.ZodObject<{
                line: z.ZodNumber;
                content: z.ZodString;
                highlighted: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        elapsedMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    skill: z.ZodOptional<z.ZodString>;
    dedupe: z.ZodObject<{
        source: z.ZodEnum<{
            warden: "warden";
            external: "external";
        }>;
        matchType: z.ZodEnum<{
            hash: "hash";
            semantic: "semantic";
        }>;
        existingFindingId: z.ZodOptional<z.ZodString>;
        existingCommentId: z.ZodOptional<z.ZodNumber>;
        existingThreadId: z.ZodOptional<z.ZodString>;
        existingResolved: z.ZodOptional<z.ZodBoolean>;
        actor: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    outcome: z.ZodLiteral<"skipped">;
    finding: z.ZodObject<{
        id: z.ZodString;
        severity: z.ZodPreprocess<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        confidence: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        title: z.ZodString;
        description: z.ZodString;
        verification: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        additionalLocations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        sourceSnippet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            language: z.ZodOptional<z.ZodString>;
            startLine: z.ZodNumber;
            endLine: z.ZodNumber;
            targetStartLine: z.ZodNumber;
            targetEndLine: z.ZodNumber;
            lines: z.ZodArray<z.ZodObject<{
                line: z.ZodNumber;
                content: z.ZodString;
                highlighted: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        elapsedMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    skill: z.ZodOptional<z.ZodString>;
    skippedReason: z.ZodEnum<{
        max_findings: "max_findings";
        duplicate_in_batch: "duplicate_in_batch";
        no_inline_location: "no_inline_location";
    }>;
}, z.core.$strip>, z.ZodObject<{
    outcome: z.ZodLiteral<"resolved">;
    finding: z.ZodObject<{
        id: z.ZodString;
        severity: z.ZodPreprocess<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        confidence: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        title: z.ZodString;
        description: z.ZodString;
        verification: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        additionalLocations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        sourceSnippet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            language: z.ZodOptional<z.ZodString>;
            startLine: z.ZodNumber;
            endLine: z.ZodNumber;
            targetStartLine: z.ZodNumber;
            targetEndLine: z.ZodNumber;
            lines: z.ZodArray<z.ZodObject<{
                line: z.ZodNumber;
                content: z.ZodString;
                highlighted: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        elapsedMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    skill: z.ZodOptional<z.ZodString>;
    resolvedReason: z.ZodEnum<{
        fix_evaluation: "fix_evaluation";
        stale_check: "stale_check";
    }>;
}, z.core.$strip>, z.ZodObject<{
    outcome: z.ZodLiteral<"failed">;
    finding: z.ZodObject<{
        id: z.ZodString;
        severity: z.ZodPreprocess<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        confidence: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        title: z.ZodString;
        description: z.ZodString;
        verification: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        additionalLocations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            startLine: z.ZodNumber;
            endLine: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        sourceSnippet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            language: z.ZodOptional<z.ZodString>;
            startLine: z.ZodNumber;
            endLine: z.ZodNumber;
            targetStartLine: z.ZodNumber;
            targetEndLine: z.ZodNumber;
            lines: z.ZodArray<z.ZodObject<{
                line: z.ZodNumber;
                content: z.ZodString;
                highlighted: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        elapsedMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    skill: z.ZodOptional<z.ZodString>;
}, z.core.$strip>], "outcome">;
export type ParsedFindingObservation = z.infer<typeof FindingObservationSchema>;
export {};
//# sourceMappingURL=outcomes.d.ts.map