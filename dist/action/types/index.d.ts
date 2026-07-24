import { z } from 'zod';
/**
 * Normalize legacy severity values to the 3-level scale.
 * Maps 'critical' → 'high' and 'info' → 'low' for backwards compatibility
 * with old JSONL logs and LLM responses.
 */
export declare function normalizeSeverity(val: unknown): unknown;
export declare const SeveritySchema: z.ZodPreprocess<z.ZodEnum<{
    low: "low";
    medium: "medium";
    high: "high";
}>>;
export type Severity = z.infer<typeof SeveritySchema>;
export declare const ConfidenceSchema: z.ZodEnum<{
    low: "low";
    medium: "medium";
    high: "high";
}>;
export type Confidence = z.infer<typeof ConfidenceSchema>;
/**
 * Confidence order for comparison (lower = more confident).
 * Single source of truth for confidence ordering across the codebase.
 */
export declare const CONFIDENCE_ORDER: Record<Confidence, number>;
export declare const SeverityThresholdSchema: z.ZodPreprocess<z.ZodEnum<{
    off: "off";
    low: "low";
    medium: "medium";
    high: "high";
}>>;
export type SeverityThreshold = z.infer<typeof SeverityThresholdSchema>;
export declare const ConfidenceThresholdSchema: z.ZodEnum<{
    off: "off";
    low: "low";
    medium: "medium";
    high: "high";
}>;
export type ConfidenceThreshold = z.infer<typeof ConfidenceThresholdSchema>;
/**
 * Severity order for comparison (lower = more severe).
 * Single source of truth for severity ordering across the codebase.
 */
export declare const SEVERITY_ORDER: Record<Severity, number>;
/**
 * Filter findings to only include those at or above the given severity threshold.
 * If no threshold is provided, returns all findings unchanged.
 * If threshold is 'off', returns empty array (disabled).
 */
export declare function filterFindingsBySeverity(findings: Finding[], threshold?: SeverityThreshold): Finding[];
/**
 * Filter findings to only include those at or above the given confidence threshold.
 * If no threshold is provided or threshold is 'off', returns all findings unchanged.
 * Findings without a confidence field are always included (backwards compat).
 */
export declare function filterFindingsByConfidence(findings: Finding[], threshold?: ConfidenceThreshold): Finding[];
/**
 * Filter findings by both severity and confidence thresholds.
 * Applies severity filtering first, then confidence filtering.
 * Either threshold can be omitted to skip that filter.
 */
export declare function filterFindings(findings: Finding[], reportOn?: SeverityThreshold, minConfidence?: ConfidenceThreshold): Finding[];
export declare const LocationSchema: z.ZodObject<{
    path: z.ZodString;
    startLine: z.ZodNumber;
    endLine: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type Location = z.infer<typeof LocationSchema>;
export declare const SourceSnippetLineSchema: z.ZodObject<{
    line: z.ZodNumber;
    content: z.ZodString;
    highlighted: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type SourceSnippetLine = z.infer<typeof SourceSnippetLineSchema>;
export declare const SourceSnippetSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type SourceSnippet = z.infer<typeof SourceSnippetSchema>;
export declare const FindingSchema: z.ZodObject<{
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
export type Finding = z.infer<typeof FindingSchema>;
/**
 * Get the effective line number for a finding (endLine if present, otherwise startLine).
 */
export declare function findingLine(f: Finding): number;
/**
 * Compare two findings by priority for winner selection.
 * Lower return value = higher priority (more severe, more confident, earlier path/line).
 */
export declare function compareFindingPriority(a: Finding, b: Finding): number;
export declare const UsageStatsSchema: z.ZodObject<{
    inputTokens: z.ZodNumber;
    outputTokens: z.ZodNumber;
    cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
    cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
    cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
    cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
    webSearchRequests: z.ZodOptional<z.ZodNumber>;
    costUSD: z.ZodNumber;
}, z.core.$strip>;
export type UsageStats = z.infer<typeof UsageStatsSchema>;
export declare const UsageAttributionSchema: z.ZodObject<{
    model: z.ZodOptional<z.ZodString>;
    models: z.ZodOptional<z.ZodArray<z.ZodString>>;
    runtime: z.ZodOptional<z.ZodString>;
    runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type UsageAttribution = z.infer<typeof UsageAttributionSchema>;
export declare const AuxiliaryUsageMapSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    inputTokens: z.ZodNumber;
    outputTokens: z.ZodNumber;
    cacheReadInputTokens: z.ZodOptional<z.ZodNumber>;
    cacheCreationInputTokens: z.ZodOptional<z.ZodNumber>;
    cacheCreation5mInputTokens: z.ZodOptional<z.ZodNumber>;
    cacheCreation1hInputTokens: z.ZodOptional<z.ZodNumber>;
    webSearchRequests: z.ZodOptional<z.ZodNumber>;
    costUSD: z.ZodNumber;
}, z.core.$strip>>;
export type AuxiliaryUsageMap = z.infer<typeof AuxiliaryUsageMapSchema>;
export declare const AuxiliaryUsageAttributionMapSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    model: z.ZodOptional<z.ZodString>;
    models: z.ZodOptional<z.ZodArray<z.ZodString>>;
    runtime: z.ZodOptional<z.ZodString>;
    runtimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>>;
export type AuxiliaryUsageAttributionMap = z.infer<typeof AuxiliaryUsageAttributionMapSchema>;
export declare const SkippedFileSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type SkippedFile = z.infer<typeof SkippedFileSchema>;
export declare const FileReportSchema: z.ZodPreprocess<z.ZodObject<{
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
export type FileReport = z.infer<typeof FileReportSchema>;
export declare const ErrorCodeSchema: z.ZodEnum<{
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
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;
export declare function isExtractionErrorCode(code: ErrorCode): boolean;
export declare const SkillErrorSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type SkillError = z.infer<typeof SkillErrorSchema>;
export declare const HunkFailureSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type HunkFailure = z.infer<typeof HunkFailureSchema>;
declare const TraceSpanAttributeValueSchema: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>]>;
export type TraceSpanAttributeValue = z.infer<typeof TraceSpanAttributeValueSchema>;
export declare const TraceSpanSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type TraceSpan = z.infer<typeof TraceSpanSchema>;
export declare const HunkTraceSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type HunkTrace = z.infer<typeof HunkTraceSchema>;
export declare const SkillReportSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type SkillReport = z.infer<typeof SkillReportSchema>;
export declare const GitHubEventTypeSchema: z.ZodEnum<{
    pull_request: "pull_request";
    schedule: "schedule";
    issues: "issues";
    issue_comment: "issue_comment";
    pull_request_review: "pull_request_review";
    pull_request_review_comment: "pull_request_review_comment";
}>;
export type GitHubEventType = z.infer<typeof GitHubEventTypeSchema>;
export declare const PullRequestActionSchema: z.ZodEnum<{
    opened: "opened";
    synchronize: "synchronize";
    reopened: "reopened";
    closed: "closed";
    labeled: "labeled";
}>;
export type PullRequestAction = z.infer<typeof PullRequestActionSchema>;
export declare const FileChangeSchema: z.ZodObject<{
    filename: z.ZodString;
    previousFilename: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        added: "added";
        removed: "removed";
        modified: "modified";
        renamed: "renamed";
        copied: "copied";
        changed: "changed";
        unchanged: "unchanged";
    }>;
    additions: z.ZodNumber;
    deletions: z.ZodNumber;
    patch: z.ZodOptional<z.ZodString>;
    chunks: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type FileChange = z.infer<typeof FileChangeSchema>;
export declare const DiffContextSourceSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"working-tree">;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"git-index">;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"git-ref">;
    ref: z.ZodString;
}, z.core.$strip>], "type">;
export type DiffContextSource = z.infer<typeof DiffContextSourceSchema>;
/**
 * Count the number of chunks/hunks in a patch string.
 * Each chunk starts with @@ -X,Y +A,B @@
 */
export declare function countPatchChunks(patch: string | undefined): number;
export declare const PullRequestContextSchema: z.ZodObject<{
    number: z.ZodNumber;
    title: z.ZodString;
    body: z.ZodNullable<z.ZodString>;
    author: z.ZodString;
    draft: z.ZodOptional<z.ZodBoolean>;
    labels: z.ZodOptional<z.ZodArray<z.ZodString>>;
    baseBranch: z.ZodString;
    headBranch: z.ZodString;
    headSha: z.ZodString;
    baseSha: z.ZodString;
    files: z.ZodArray<z.ZodObject<{
        filename: z.ZodString;
        previousFilename: z.ZodOptional<z.ZodString>;
        status: z.ZodEnum<{
            added: "added";
            removed: "removed";
            modified: "modified";
            renamed: "renamed";
            copied: "copied";
            changed: "changed";
            unchanged: "unchanged";
        }>;
        additions: z.ZodNumber;
        deletions: z.ZodNumber;
        patch: z.ZodOptional<z.ZodString>;
        chunks: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PullRequestContext = z.infer<typeof PullRequestContextSchema>;
export declare const RepositoryContextSchema: z.ZodObject<{
    owner: z.ZodString;
    name: z.ZodString;
    fullName: z.ZodString;
    defaultBranch: z.ZodString;
}, z.core.$strip>;
export type RepositoryContext = z.infer<typeof RepositoryContextSchema>;
export declare const EventContextSchema: z.ZodObject<{
    eventType: z.ZodEnum<{
        pull_request: "pull_request";
        schedule: "schedule";
        issues: "issues";
        issue_comment: "issue_comment";
        pull_request_review: "pull_request_review";
        pull_request_review_comment: "pull_request_review_comment";
    }>;
    action: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    repository: z.ZodObject<{
        owner: z.ZodString;
        name: z.ZodString;
        fullName: z.ZodString;
        defaultBranch: z.ZodString;
    }, z.core.$strip>;
    pullRequest: z.ZodOptional<z.ZodObject<{
        number: z.ZodNumber;
        title: z.ZodString;
        body: z.ZodNullable<z.ZodString>;
        author: z.ZodString;
        draft: z.ZodOptional<z.ZodBoolean>;
        labels: z.ZodOptional<z.ZodArray<z.ZodString>>;
        baseBranch: z.ZodString;
        headBranch: z.ZodString;
        headSha: z.ZodString;
        baseSha: z.ZodString;
        files: z.ZodArray<z.ZodObject<{
            filename: z.ZodString;
            previousFilename: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<{
                added: "added";
                removed: "removed";
                modified: "modified";
                renamed: "renamed";
                copied: "copied";
                changed: "changed";
                unchanged: "unchanged";
            }>;
            additions: z.ZodNumber;
            deletions: z.ZodNumber;
            patch: z.ZodOptional<z.ZodString>;
            chunks: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    repoPath: z.ZodString;
    diffContextSource: z.ZodOptional<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"working-tree">;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"git-index">;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"git-ref">;
        ref: z.ZodString;
    }, z.core.$strip>], "type">>;
    explicitFileTargets: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type EventContext = z.infer<typeof EventContextSchema>;
export declare const FixStatusSchema: z.ZodEnum<{
    resolved: "resolved";
    not_attempted: "not_attempted";
    attempted_failed: "attempted_failed";
}>;
export type FixStatus = z.infer<typeof FixStatusSchema>;
export declare const RetryConfigSchema: z.ZodObject<{
    maxRetries: z.ZodDefault<z.ZodNumber>;
    initialDelayMs: z.ZodDefault<z.ZodNumber>;
    backoffMultiplier: z.ZodDefault<z.ZodNumber>;
    maxDelayMs: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type RetryConfig = z.infer<typeof RetryConfigSchema>;
export {};
//# sourceMappingURL=index.d.ts.map