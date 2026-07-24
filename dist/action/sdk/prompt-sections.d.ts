import { type Finding } from '../types/index.js';
export interface PromptPRContext {
    /** Repository full name, e.g. "getsentry/sentry" */
    repository?: string;
    /** All files being changed in the PR */
    changedFiles: string[];
    /** PR title - explains what the change does */
    title?: string;
    /** PR description/body - explains why and provides additional context */
    body?: string | null;
    /** Max number of changed files to list. 0 disables the section. Default: 50. */
    maxContextFiles?: number;
}
/**
 * Build a tagged prompt section, omitting empty content.
 */
export declare function buildTaggedSection(tag: string, content: string | string[]): string | undefined;
/**
 * Join prompt sections with consistent spacing, skipping omitted sections.
 */
export declare function joinPromptSections(sections: (string | undefined)[]): string;
/**
 * Build a tagged JSON-only output contract.
 */
export declare function buildJsonOutputSection(instructions: string): string;
/**
 * Build tagged pull request context shared by Warden agents.
 */
export declare function buildPullRequestContextSection(prContext?: PromptPRContext): string | undefined;
export interface FileListSectionOptions {
    currentFile?: string;
    maxFiles?: number;
}
/**
 * Build a tagged file list section with optional current-file exclusion.
 */
export declare function buildFileListSection(tag: string, files: string[], options?: FileListSectionOptions): string | undefined;
/**
 * Build tagged changed-file context shared by Warden agents.
 */
export declare function buildChangedFilesSection(prContext: PromptPRContext | undefined, currentFile?: string): string | undefined;
interface PromptFindingFormatOptions {
    includeSeverity?: boolean;
    includeConfidence?: boolean;
    includeVerification?: boolean;
    locationStyle?: 'line' | 'range';
    snippet?: (finding: Finding) => string | undefined;
}
/**
 * Format one finding for prompt lists shared by auxiliary agents.
 */
export declare function formatFindingForPrompt(finding: Finding, options?: PromptFindingFormatOptions): string;
/**
 * Format findings as a stable 1-based prompt list.
 */
export declare function formatIndexedFindingsForPrompt(findings: Finding[], options?: PromptFindingFormatOptions): string;
export {};
//# sourceMappingURL=prompt-sections.d.ts.map