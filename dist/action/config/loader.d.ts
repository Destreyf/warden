import { type WardenConfig, type ScheduleConfig, type TriggerType, type ChunkingConfig, type IgnoreConfig, type ScanConfig, type RuntimeName, type AgentRuntimeConfig } from './schema.js';
import type { SeverityThreshold, ConfidenceThreshold } from '../types/index.js';
export declare class ConfigLoadError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
export declare function loadWardenConfigFile(configPath: string): WardenConfig;
export declare function loadWardenConfig(configDir: string): WardenConfig;
export interface MergeWardenConfigOptions {
    baseConfigPath?: string;
    repoConfigPath?: string;
    onWarning?: (message: string) => void;
}
export declare function mergeWardenConfigs(base: WardenConfig, overlay: WardenConfig, options?: MergeWardenConfigOptions): WardenConfig;
export interface LayeredConfigOptions {
    baseConfigPath?: string;
    configPath?: string;
    onWarning?: (message: string) => void;
}
export interface LoadedLayeredConfig {
    config: WardenConfig;
    baseConfig?: WardenConfig;
    repoConfig?: WardenConfig;
}
export interface LayeredSkillRootsByName {
    base?: Record<string, string | undefined>;
    repo?: Record<string, string | undefined>;
}
export declare function buildSkillRootsByName(repoPath: string, layered: LoadedLayeredConfig, baseSkillRoot?: string): LayeredSkillRootsByName | undefined;
export declare function loadLayeredWardenConfig(repoPath: string, options?: LayeredConfigOptions): LoadedLayeredConfig;
/**
 * Resolved trigger configuration with defaults applied.
 * Each skill x trigger combination produces one ResolvedTrigger.
 * Skills with no triggers produce a wildcard entry (type: '*').
 */
export interface ResolvedTrigger {
    /** Stable replay identity derived from the skill and trigger configuration */
    id: string;
    /** Skill name (used for display and deduplication) */
    name: string;
    /** Skill reference (same as name, for downstream compatibility) */
    skill: string;
    /** Trigger type, or '*' for wildcard (runs everywhere) */
    type: TriggerType | '*';
    /** Actions for pull_request triggers */
    actions?: string[];
    /** Draft state for pull_request triggers. false means non-draft only. */
    draft?: boolean;
    /** Pull request labels that can match this trigger. */
    labels?: string[];
    /** Remote repository reference */
    remote?: string;
    /** Repository root to use when resolving local skill names or paths */
    skillRoot?: string;
    /** Resolve from package built-ins instead of repo-local skill directories */
    useBuiltinSkill?: boolean;
    /** Path filters */
    filters: {
        paths?: string[];
        ignorePaths?: string[];
    };
    failOn?: SeverityThreshold;
    reportOn?: SeverityThreshold;
    maxFindings?: number;
    reportOnSuccess?: boolean;
    /** Use REQUEST_CHANGES review event when findings exceed failOn */
    requestChanges?: boolean;
    /** Fail the check run when findings exceed failOn */
    failCheck?: boolean;
    /** Model (merged: trigger > skill > defaults > cli > env) */
    model?: string;
    /** Max agentic turns (merged: trigger > skill > defaults) */
    maxTurns?: number;
    /** Effort level for repo-aware skill execution. */
    effort?: AgentRuntimeConfig['effort'];
    /** Runtime backend for all model-backed execution. */
    runtime?: RuntimeName;
    /** Model for auxiliary structured model calls. */
    auxiliaryModel?: string;
    /** Model for post-analysis synthesis/consolidation. */
    synthesisModel?: string;
    /** Max retries for auxiliary structured model calls. */
    auxiliaryMaxRetries?: number;
    /** Whether candidate findings should be verified in a second pass. */
    verifyFindings?: boolean;
    /** Minimum confidence for findings (merged: trigger > skill > defaults) */
    minConfidence?: ConfidenceThreshold;
    /** Batch delay to use for this trigger's skill execution */
    batchDelayMs?: number;
    /** Max number of context files to include in prompts for this trigger */
    maxContextFiles?: number;
    /** Global file ignore policy applied before scan limits and chunking */
    ignore?: IgnoreConfig;
    /** Global scan limits applied after ignore filtering */
    scan?: ScanConfig;
    /** Chunking configuration for eligible files */
    chunking?: ChunkingConfig;
    /** Schedule-specific configuration */
    schedule?: ScheduleConfig;
}
/**
 * Convert empty strings to undefined.
 * GitHub Actions substitutes unconfigured secrets with empty strings,
 * so we need to treat '' as "not set" for optional config values.
 */
export declare function emptyToUndefined(value: string | undefined): string | undefined;
/**
 * Resolve all skills in a config into a flat array of ResolvedTriggers.
 * Each skill x trigger combination produces one entry.
 * Skills with no triggers produce one wildcard entry (type: '*').
 *
 * Model precedence (highest to lowest):
 * 1. trigger-level model
 * 2. skill-level model
 * 3. defaults.agent.model
 * 4. defaults.model (legacy warden.toml [defaults])
 * 5. cliModel (--model flag)
 * 6. WARDEN_MODEL env var
 * 7. SDK default (not set here)
 */
export declare function resolveSkillConfigs(config: WardenConfig, cliModel?: string, skillRootsByName?: Record<string, string | undefined>): ResolvedTrigger[];
export declare function resolveLayeredSkillConfigs(layered: LoadedLayeredConfig, cliModel?: string, skillRootsByName?: LayeredSkillRootsByName): ResolvedTrigger[];
//# sourceMappingURL=loader.d.ts.map