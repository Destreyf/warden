import { z } from 'zod';
import { GitError, type GitErrorDetails } from '@sentry/dotagents-lib';
import type { SkillDefinition } from '../config/schema.js';
/** Schema for a single remote entry in state.json */
declare const RemoteEntrySchema: z.ZodObject<{
    sha: z.ZodString;
    fetchedAt: z.ZodString;
    cloneUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Schema for the entire state.json file */
declare const RemoteStateSchema: z.ZodObject<{
    remotes: z.ZodRecord<z.ZodString, z.ZodObject<{
        sha: z.ZodString;
        fetchedAt: z.ZodString;
        cloneUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type RemoteEntry = z.infer<typeof RemoteEntrySchema>;
export type RemoteState = z.infer<typeof RemoteStateSchema>;
/** Parsed remote reference */
export interface ParsedRemoteRef {
    owner: string;
    repo: string;
    sha?: string;
    /** Original clone URL when a full URL was provided (SSH or HTTPS). Undefined for owner/repo shorthand. */
    cloneUrl?: string;
}
/**
 * Parse a remote reference string into its components. Delegates the grammar
 * to `@sentry/dotagents-lib`'s `parseSource` and the safety gate to
 * `validateGitNameSafety`. Lib errors are translated to `SkillLoaderError`
 * with warden-formatted messages so the public contract stays stable.
 *
 * Accepted shapes: `owner/repo[@sha]` (GitHub), `https://github.com/...`,
 * `git@github.com:...`, GitLab equivalents (incl. nested groups), and HTTP
 * forms which are upgraded to HTTPS.
 */
export declare function parseRemoteRef(ref: string): ParsedRemoteRef;
/**
 * Format a parsed remote ref back to string format.
 */
export declare function formatRemoteRef(parsed: ParsedRemoteRef): string;
/**
 * Get the base directory for caching remote skills.
 * Respects WARDEN_STATE_DIR environment variable.
 * Default: ~/.local/warden/skills/
 */
export declare function getSkillsCacheDir(): string;
/**
 * Get the cache path for a specific remote ref.
 * - Unpinned: ~/.local/warden/skills/owner/repo/
 * - Pinned: ~/.local/warden/skills/owner/repo@sha/
 */
export declare function getRemotePath(ref: string): string;
/**
 * Get the path to the state.json file.
 */
export declare function getStatePath(): string;
/**
 * Load the remote state from state.json.
 * Returns an empty state if the file doesn't exist.
 */
export declare function loadState(): RemoteState;
/**
 * Save the remote state to state.json.
 * Uses atomic write (write to temp, then rename).
 */
export declare function saveState(state: RemoteState): void;
/**
 * Get the TTL for remote skill cache in seconds.
 * Respects WARDEN_SKILL_CACHE_TTL environment variable.
 */
export declare function getCacheTtlSeconds(): number;
/**
 * Check if an unpinned remote ref needs to be refreshed.
 * Pinned refs (with @sha) never need refresh.
 */
export declare function shouldRefresh(ref: string, state: RemoteState): boolean;
export interface FetchRemoteOptions {
    /** Force refresh even if cache is valid */
    force?: boolean;
    /** Skip network operations - only use cache */
    offline?: boolean;
    /** Callback for progress messages */
    onProgress?: (message: string) => void;
}
export { GitError };
export type { GitErrorDetails };
/**
 * Clone or update a remote repository to the cache.
 * Returns the SHA of the fetched commit.
 */
export declare function fetchRemote(ref: string, options?: FetchRemoteOptions): Promise<string>;
export interface DiscoveredRemoteSkill {
    name: string;
    description: string;
    path: string;
    /** Plugin name for marketplace format skills */
    pluginName?: string;
}
/**
 * Discover all skills in a cached remote repository.
 * Detects format and delegates to appropriate discovery function:
 * - If .claude-plugin/marketplace.json exists, uses marketplace discovery
 * - Otherwise, uses traditional discovery (root, skills/, .warden/skills, etc.)
 */
export declare function discoverRemoteSkills(ref: string): Promise<DiscoveredRemoteSkill[]>;
/**
 * Resolve a skill from a remote repository.
 * Ensures the remote is fetched/cached, then loads the skill.
 * Matches by skill name (from SKILL.md), not directory name.
 */
export declare function resolveRemoteSkill(ref: string, skillName: string, options?: FetchRemoteOptions): Promise<SkillDefinition>;
/**
 * Remove a remote from the cache.
 */
export declare function removeRemote(ref: string): void;
/**
 * List all cached remotes with their metadata.
 */
export declare function listCachedRemotes(): {
    ref: string;
    entry: RemoteEntry;
}[];
export type DiscoveredRemoteAgent = DiscoveredRemoteSkill;
/**
 * Discover all agents in a cached remote repository.
 * Uses traditional discovery only (no marketplace format for agents).
 */
export declare function discoverRemoteAgents(ref: string): Promise<DiscoveredRemoteAgent[]>;
/**
 * Resolve an agent from a remote repository.
 * Ensures the remote is fetched/cached, then loads the agent.
 * Matches by agent name (from AGENT.md), not directory name.
 */
export declare function resolveRemoteAgent(ref: string, agentName: string, options?: FetchRemoteOptions): Promise<SkillDefinition>;
//# sourceMappingURL=remote.d.ts.map