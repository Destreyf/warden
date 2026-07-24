import { z } from 'zod';
import type { SkillReport, SkillError } from '../../types/index.js';
export { JsonlUsageBreakdownEntrySchema, JsonlUsageBreakdownSchema, auxiliaryUsageFromBreakdown, buildJsonlUsageBreakdown, scanUsageFromBreakdown, usageStatsHaveValue, type JsonlUsageBreakdown, type JsonlUsageBreakdownEntry, } from './usage-breakdown.js';
/**
 * Sentinel value recorded in JSONL metadata when no model is explicitly configured.
 */
export declare const MODEL_DEFAULT_SENTINEL = "(default)";
/**
 * Generate a unique run ID for this execution.
 */
export declare function generateRunId(): string;
/**
 * Get the first 8 hex chars (no dashes) of a UUID for use in filenames.
 */
export declare function shortRunId(runId: string): string;
/**
 * Get the repo-local log file path.
 * Returns: {repoRoot}/.warden/logs/{runId8}-{ISO-datetime}.jsonl
 */
export declare function getRepoLogPath(repoRoot: string, runId: string, timestamp?: Date): string;
/**
 * JSONL record schemas for Warden's structured run output.
 *
 * Formal JSON Schema: specs/jsonl-schema.json
 * Example payloads:   specs/jsonl-examples.jsonl
 * Reporter spec:      specs/reporters.md Section 3 "JSONL Specification"
 *
 * BACKWARD COMPATIBILITY: breaking on-disk JSONL log formats is NEVER
 * ALLOWED. Users keep .warden/logs/*.jsonl across versions. The schema
 * may evolve — new optional fields, additive enum values, normalization
 * — but every historical shape must continue to parse cleanly. Field
 * renames require a preprocess that maps the old name to the new one
 * (see FileReportSchema's `findingCount → findings` preprocess in
 * src/types/index.ts). Removing a field is fine; making it optional in
 * the schema preserves old logs. If you can't reconcile an old shape
 * with a preprocess, the change is wrong — find a different path.
 */
/** Metadata common to every JSONL record. */
export declare const JsonlRunMetadataSchema: z.ZodObject<{
    timestamp: z.ZodString;
    durationMs: z.ZodNumber;
    cwd: z.ZodString;
    runId: z.ZodString;
    traceId: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    headSha: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type JsonlRunMetadata = z.infer<typeof JsonlRunMetadataSchema>;
/** Per-file breakdown within a skill record (re-exported from shared types). */
export declare const JsonlFileRecordSchema: z.ZodPreprocess<z.ZodObject<{
    filename: z.ZodString;
    findings: z.ZodNumber;
    durationMs: z.ZodOptional<z.ZodNumber>;
    usage: z.ZodOptional<z.ZodObject<{
        inputTokens: z.ZodNumber;
        outputTokens: z.ZodNumber;
        cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
        webSearchRequests: z.ZodOptional<z.ZodNumber>;
        costUSD: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>>;
export type JsonlFileRecord = z.infer<typeof JsonlFileRecordSchema>;
/** Unit of work scanned by Warden, emitted during streaming and finalization. */
export declare const JsonlChunkRecordSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    run: z.ZodObject<{
        timestamp: z.ZodString;
        durationMs: z.ZodNumber;
        cwd: z.ZodString;
        runId: z.ZodString;
        traceId: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        headSha: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    skill: z.ZodString;
    model: z.ZodOptional<z.ZodString>;
    chunk: z.ZodObject<{
        file: z.ZodString;
        index: z.ZodNumber;
        total: z.ZodNumber;
        lineRange: z.ZodString;
    }, z.core.$strip>;
    status: z.ZodEnum<{
        error: "error";
        ok: "ok";
        skipped: "skipped";
    }>;
    findings: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
    usageBreakdown: z.ZodOptional<z.ZodObject<{
        scan: z.ZodOptional<z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        auxiliary: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>>>;
        total: z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    durationMs: z.ZodNumber;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodEnum<{
            unknown: "unknown";
            auth_failed: "auth_failed";
            provider_unavailable: "provider_unavailable";
            sdk_error: "sdk_error";
            subprocess_failure: "subprocess_failure";
            max_turns: "max_turns";
            aborted: "aborted";
            all_hunks_failed: "all_hunks_failed";
            invalid_model_selector: "invalid_model_selector";
            skill_resolution_failed: "skill_resolution_failed";
            extraction_invalid_json: "extraction_invalid_json";
            extraction_unbalanced_json: "extraction_unbalanced_json";
            extraction_no_findings_json: "extraction_no_findings_json";
            extraction_missing_findings_key: "extraction_missing_findings_key";
            extraction_findings_not_array: "extraction_findings_not_array";
            extraction_llm_failed: "extraction_llm_failed";
            extraction_llm_timeout: "extraction_llm_timeout";
            extraction_no_api_key: "extraction_no_api_key";
        }>;
        message: z.ZodString;
        timestamp: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    skippedFiles: z.ZodOptional<z.ZodArray<z.ZodObject<{
        filename: z.ZodString;
        reason: z.ZodEnum<{
            pattern: "pattern";
            builtin: "builtin";
            "ignored:builtin": "ignored:builtin";
            "ignored:user": "ignored:user";
            "ignored:generated": "ignored:generated";
            "limit:file_size": "limit:file_size";
            "limit:file_lines": "limit:file_lines";
            "limit:file_read": "limit:file_read";
            "limit:file_count": "limit:file_count";
            "limit:changed_lines": "limit:changed_lines";
            "limit:missing_patch": "limit:missing_patch";
        }>;
        pattern: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    trace: z.ZodOptional<z.ZodObject<{
        filename: z.ZodString;
        lineRange: z.ZodString;
        runtime: z.ZodString;
        status: z.ZodString;
        traceId: z.ZodOptional<z.ZodString>;
        spanId: z.ZodOptional<z.ZodString>;
        responseId: z.ZodOptional<z.ZodString>;
        responseModel: z.ZodOptional<z.ZodString>;
        sessionId: z.ZodOptional<z.ZodString>;
        durationMs: z.ZodOptional<z.ZodNumber>;
        durationApiMs: z.ZodOptional<z.ZodNumber>;
        numTurns: z.ZodOptional<z.ZodNumber>;
        spans: z.ZodOptional<z.ZodArray<z.ZodObject<{
            traceId: z.ZodString;
            spanId: z.ZodString;
            parentSpanId: z.ZodOptional<z.ZodString>;
            op: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            startTimeUnixMs: z.ZodOptional<z.ZodNumber>;
            endTimeUnixMs: z.ZodOptional<z.ZodNumber>;
            durationMs: z.ZodOptional<z.ZodNumber>;
            status: z.ZodOptional<z.ZodString>;
            origin: z.ZodOptional<z.ZodString>;
            attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>]>>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type JsonlChunkRecord = z.infer<typeof JsonlChunkRecordSchema>;
export declare function parseJsonlChunkRecord(value: unknown): JsonlChunkRecord | undefined;
/**
 * One skill's analysis results. This is the shared SkillReport plus a `run`
 * block of run-wide metadata, so any new SkillReport field is automatically
 * part of the JSONL contract without a parallel schema.
 */
export declare const JsonlRecordSchema: z.ZodObject<{
    skill: z.ZodString;
    summary: z.ZodString;
    findings: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    durationMs: z.ZodOptional<z.ZodNumber>;
    usage: z.ZodOptional<z.ZodObject<{
        inputTokens: z.ZodNumber;
        outputTokens: z.ZodNumber;
        cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
        webSearchRequests: z.ZodOptional<z.ZodNumber>;
        costUSD: z.ZodNumber;
    }, z.core.$strip>>;
    skippedFiles: z.ZodOptional<z.ZodArray<z.ZodObject<{
        filename: z.ZodString;
        reason: z.ZodEnum<{
            pattern: "pattern";
            builtin: "builtin";
            "ignored:builtin": "ignored:builtin";
            "ignored:user": "ignored:user";
            "ignored:generated": "ignored:generated";
            "limit:file_size": "limit:file_size";
            "limit:file_lines": "limit:file_lines";
            "limit:file_read": "limit:file_read";
            "limit:file_count": "limit:file_count";
            "limit:changed_lines": "limit:changed_lines";
            "limit:missing_patch": "limit:missing_patch";
        }>;
        pattern: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    failedHunks: z.ZodOptional<z.ZodNumber>;
    failedExtractions: z.ZodOptional<z.ZodNumber>;
    hunkFailures: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            analysis: "analysis";
            extraction: "extraction";
        }>;
        filename: z.ZodString;
        lineRange: z.ZodString;
        code: z.ZodEnum<{
            unknown: "unknown";
            auth_failed: "auth_failed";
            provider_unavailable: "provider_unavailable";
            sdk_error: "sdk_error";
            subprocess_failure: "subprocess_failure";
            max_turns: "max_turns";
            aborted: "aborted";
            all_hunks_failed: "all_hunks_failed";
            invalid_model_selector: "invalid_model_selector";
            skill_resolution_failed: "skill_resolution_failed";
            extraction_invalid_json: "extraction_invalid_json";
            extraction_unbalanced_json: "extraction_unbalanced_json";
            extraction_no_findings_json: "extraction_no_findings_json";
            extraction_missing_findings_key: "extraction_missing_findings_key";
            extraction_findings_not_array: "extraction_findings_not_array";
            extraction_llm_failed: "extraction_llm_failed";
            extraction_llm_timeout: "extraction_llm_timeout";
            extraction_no_api_key: "extraction_no_api_key";
        }>;
        message: z.ZodString;
        preview: z.ZodOptional<z.ZodString>;
        attempts: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    traces: z.ZodOptional<z.ZodArray<z.ZodObject<{
        filename: z.ZodString;
        lineRange: z.ZodString;
        runtime: z.ZodString;
        status: z.ZodString;
        traceId: z.ZodOptional<z.ZodString>;
        spanId: z.ZodOptional<z.ZodString>;
        responseId: z.ZodOptional<z.ZodString>;
        responseModel: z.ZodOptional<z.ZodString>;
        sessionId: z.ZodOptional<z.ZodString>;
        durationMs: z.ZodOptional<z.ZodNumber>;
        durationApiMs: z.ZodOptional<z.ZodNumber>;
        numTurns: z.ZodOptional<z.ZodNumber>;
        spans: z.ZodOptional<z.ZodArray<z.ZodObject<{
            traceId: z.ZodString;
            spanId: z.ZodString;
            parentSpanId: z.ZodOptional<z.ZodString>;
            op: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            startTimeUnixMs: z.ZodOptional<z.ZodNumber>;
            endTimeUnixMs: z.ZodOptional<z.ZodNumber>;
            durationMs: z.ZodOptional<z.ZodNumber>;
            status: z.ZodOptional<z.ZodString>;
            origin: z.ZodOptional<z.ZodString>;
            attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>]>>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodEnum<{
            unknown: "unknown";
            auth_failed: "auth_failed";
            provider_unavailable: "provider_unavailable";
            sdk_error: "sdk_error";
            subprocess_failure: "subprocess_failure";
            max_turns: "max_turns";
            aborted: "aborted";
            all_hunks_failed: "all_hunks_failed";
            invalid_model_selector: "invalid_model_selector";
            skill_resolution_failed: "skill_resolution_failed";
            extraction_invalid_json: "extraction_invalid_json";
            extraction_unbalanced_json: "extraction_unbalanced_json";
            extraction_no_findings_json: "extraction_no_findings_json";
            extraction_missing_findings_key: "extraction_missing_findings_key";
            extraction_findings_not_array: "extraction_findings_not_array";
            extraction_llm_failed: "extraction_llm_failed";
            extraction_llm_timeout: "extraction_llm_timeout";
            extraction_no_api_key: "extraction_no_api_key";
        }>;
        message: z.ZodString;
        timestamp: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    auxiliaryUsage: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        inputTokens: z.ZodNumber;
        outputTokens: z.ZodNumber;
        cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
        webSearchRequests: z.ZodOptional<z.ZodNumber>;
        costUSD: z.ZodNumber;
    }, z.core.$strip>>>;
    auxiliaryUsageAttribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        models: z.ZodOptional<z.ZodArray<z.ZodString>>;
        runtime: z.ZodOptional<z.ZodString>;
        runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
    files: z.ZodOptional<z.ZodArray<z.ZodPreprocess<z.ZodObject<{
        filename: z.ZodString;
        findings: z.ZodNumber;
        durationMs: z.ZodOptional<z.ZodNumber>;
        usage: z.ZodOptional<z.ZodObject<{
            inputTokens: z.ZodNumber;
            outputTokens: z.ZodNumber;
            cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
            webSearchRequests: z.ZodOptional<z.ZodNumber>;
            costUSD: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>>>;
    model: z.ZodOptional<z.ZodString>;
    runtime: z.ZodOptional<z.ZodString>;
    run: z.ZodObject<{
        timestamp: z.ZodString;
        durationMs: z.ZodNumber;
        cwd: z.ZodString;
        runId: z.ZodString;
        traceId: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        headSha: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    usageBreakdown: z.ZodOptional<z.ZodObject<{
        scan: z.ZodOptional<z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        auxiliary: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>>>;
        total: z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type JsonlRecord = z.infer<typeof JsonlRecordSchema>;
/** Aggregate summary across all skills (always the last JSONL line). */
export declare const JsonlSummaryRecordSchema: z.ZodObject<{
    run: z.ZodObject<{
        timestamp: z.ZodString;
        durationMs: z.ZodNumber;
        cwd: z.ZodString;
        runId: z.ZodString;
        traceId: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        headSha: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"summary">;
    totalFindings: z.ZodNumber;
    bySeverity: z.ZodPipe<z.ZodPipe<z.ZodRecord<z.ZodString, z.ZodNumber>, z.ZodTransform<{
        high: number;
        medium: number;
        low: number;
    }, Record<string, number>>>, z.ZodObject<{
        high: z.ZodNumber;
        medium: z.ZodNumber;
        low: z.ZodNumber;
    }, z.core.$strip>>;
    usageBreakdown: z.ZodOptional<z.ZodObject<{
        scan: z.ZodOptional<z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        auxiliary: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>>>;
        total: z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodArray<z.ZodString>>;
            runtime: z.ZodOptional<z.ZodString>;
            runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            usage: z.ZodObject<{
                inputTokens: z.ZodNumber;
                outputTokens: z.ZodNumber;
                cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
                cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
                webSearchRequests: z.ZodOptional<z.ZodNumber>;
                costUSD: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    totalSkippedFiles: z.ZodOptional<z.ZodNumber>;
    failedSkills: z.ZodOptional<z.ZodArray<z.ZodString>>;
    totalFailedHunks: z.ZodOptional<z.ZodNumber>;
    totalFailedExtractions: z.ZodOptional<z.ZodNumber>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodEnum<{
            unknown: "unknown";
            auth_failed: "auth_failed";
            provider_unavailable: "provider_unavailable";
            sdk_error: "sdk_error";
            subprocess_failure: "subprocess_failure";
            max_turns: "max_turns";
            aborted: "aborted";
            all_hunks_failed: "all_hunks_failed";
            invalid_model_selector: "invalid_model_selector";
            skill_resolution_failed: "skill_resolution_failed";
            extraction_invalid_json: "extraction_invalid_json";
            extraction_unbalanced_json: "extraction_unbalanced_json";
            extraction_no_findings_json: "extraction_no_findings_json";
            extraction_missing_findings_key: "extraction_missing_findings_key";
            extraction_findings_not_array: "extraction_findings_not_array";
            extraction_llm_failed: "extraction_llm_failed";
            extraction_llm_timeout: "extraction_llm_timeout";
            extraction_no_api_key: "extraction_no_api_key";
        }>;
        message: z.ZodString;
        timestamp: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type JsonlSummaryRecord = z.infer<typeof JsonlSummaryRecordSchema>;
export declare function parseJsonlSummaryRecord(value: unknown): JsonlSummaryRecord | undefined;
/** Per-evaluation detail for fix evaluation records. */
export declare const JsonlFixEvalDetailSchema: z.ZodObject<{
    path: z.ZodString;
    line: z.ZodNumber;
    findingId: z.ZodOptional<z.ZodString>;
    verdict: z.ZodUnion<readonly [z.ZodEnum<{
        resolved: "resolved";
        not_attempted: "not_attempted";
        attempted_failed: "attempted_failed";
    }>, z.ZodLiteral<"re_detected">, z.ZodLiteral<"eval_error">]>;
    reasoning: z.ZodOptional<z.ZodString>;
    durationMs: z.ZodNumber;
    usage: z.ZodObject<{
        inputTokens: z.ZodNumber;
        outputTokens: z.ZodNumber;
        cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
        webSearchRequests: z.ZodOptional<z.ZodNumber>;
        costUSD: z.ZodNumber;
    }, z.core.$strip>;
    usedFallback: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type JsonlFixEvalDetail = z.infer<typeof JsonlFixEvalDetailSchema>;
/** Fix evaluation results record. */
export declare const JsonlFixEvaluationRecordSchema: z.ZodObject<{
    run: z.ZodObject<{
        timestamp: z.ZodString;
        durationMs: z.ZodNumber;
        cwd: z.ZodString;
        runId: z.ZodString;
        traceId: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        headSha: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"fix-evaluation">;
    evaluated: z.ZodNumber;
    resolved: z.ZodNumber;
    needsAttention: z.ZodNumber;
    skipped: z.ZodNumber;
    failedEvaluations: z.ZodNumber;
    usage: z.ZodOptional<z.ZodObject<{
        inputTokens: z.ZodNumber;
        outputTokens: z.ZodNumber;
        cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
        cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
        webSearchRequests: z.ZodOptional<z.ZodNumber>;
        costUSD: z.ZodNumber;
    }, z.core.$strip>>;
    evaluations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        line: z.ZodNumber;
        findingId: z.ZodOptional<z.ZodString>;
        verdict: z.ZodUnion<readonly [z.ZodEnum<{
            resolved: "resolved";
            not_attempted: "not_attempted";
            attempted_failed: "attempted_failed";
        }>, z.ZodLiteral<"re_detected">, z.ZodLiteral<"eval_error">]>;
        reasoning: z.ZodOptional<z.ZodString>;
        durationMs: z.ZodNumber;
        usage: z.ZodObject<{
            inputTokens: z.ZodNumber;
            outputTokens: z.ZodNumber;
            cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
            cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
            webSearchRequests: z.ZodOptional<z.ZodNumber>;
            costUSD: z.ZodNumber;
        }, z.core.$strip>;
        usedFallback: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type JsonlFixEvaluationRecord = z.infer<typeof JsonlFixEvaluationRecordSchema>;
/**
 * Build a JSONL run metadata block. `durationMs` is a snapshot at write
 * time for skill records, the run total on the trailing summary record.
 */
export declare function buildRunMetadata(options: {
    runId: string;
    durationMs: number;
    timestamp?: Date;
    traceId?: string;
    model?: string;
    headSha?: string;
    cwd?: string;
}): JsonlRunMetadata;
/** Build a skill JSONL record, dropping zero-valued optional fields. */
export declare function buildSkillJsonlRecord(report: SkillReport, run: JsonlRunMetadata): JsonlRecord;
/** Build the aggregate summary JSONL record. */
export declare function buildSummaryJsonlRecord(reports: SkillReport[], run: JsonlRunMetadata, error?: SkillError): JsonlSummaryRecord;
/** Render a single skill JSONL record as one line including trailing newline. */
export declare function renderJsonlSkillLine(report: SkillReport, run: JsonlRunMetadata): string;
/** Render the summary JSONL record as one line including trailing newline. */
export declare function renderJsonlSummaryLine(reports: SkillReport[], run: JsonlRunMetadata, error?: SkillError): string;
/** Render one chunk result record as one JSONL line. */
export declare function renderJsonlChunkLine(record: JsonlChunkRecord): string;
export declare function renderJsonlChunkRecords(records: JsonlChunkRecord[]): string;
/** Create parent dirs and truncate the file to empty. */
export declare function initJsonlFile(outputPath: string): void;
/**
 * Append a pre-rendered line (must include its trailing newline).
 * This uses one synchronous append call so parallel skill callbacks in this
 * process cannot interleave partial JSON records.
 */
export declare function appendJsonlLine(outputPath: string, line: string): void;
/**
 * Render skill reports as a JSONL string.
 * Each line contains one skill report with run metadata.
 * A final summary line is appended at the end.
 */
export declare function renderJsonlString(reports: SkillReport[], durationMs: number, options?: {
    runId?: string;
    traceId?: string;
    timestamp?: Date;
    model?: string;
    headSha?: string;
    cwd?: string;
    /** Top-level run error (e.g. auth failure) recorded on the summary record. */
    error?: SkillError;
}): string;
/**
 * Write skill reports to a JSONL file.
 */
export declare function writeJsonlReport(outputPath: string, reports: SkillReport[], durationMs: number, options?: {
    runId?: string;
    traceId?: string;
}): void;
/**
 * Write pre-rendered JSONL content to a file path.
 */
export declare function writeJsonlContent(outputPath: string, content: string): void;
/**
 * Read a JSONL log file and return its contents.
 */
export declare function readJsonlLog(logPath: string): string;
/**
 * Parse JSONL content and reconstruct SkillReport objects.
 * Returns an object with the reports array, run metadata from the summary,
 * and total duration.
 */
export interface ParsedJsonlLog {
    reports: SkillReport[];
    runMetadata?: JsonlRunMetadata;
    totalDurationMs: number;
}
export declare function parseJsonlReports(content: string): ParsedJsonlLog;
/**
 * Lightweight metadata extracted from a JSONL log file. `summary` is
 * parsed from legacy summary records or synthesized from chunk records;
 * use `inProgress` to distinguish active runs from completed runs.
 */
export interface LogFileMetadata {
    summary?: JsonlSummaryRecord;
    inProgress: boolean;
    /** Run metadata pulled from the summary or, failing that, the first skill record. */
    runMetadata?: JsonlRunMetadata;
    skills: string[];
    model?: string;
    headSha?: string;
    totalFiles: number;
}
/**
 * Parse a JSONL log file's summary, skill names, and high-level metadata.
 * Returns undefined when the file can't be read or contains no parseable
 * records; in-progress files (valid records but no summary yet) return
 * metadata with `inProgress: true`.
 */
export declare function parseLogMetadata(filePath: string): LogFileMetadata | undefined;
//# sourceMappingURL=jsonl.d.ts.map