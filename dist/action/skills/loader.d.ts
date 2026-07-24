import type { SkillDefinition } from '../config/schema.js';
export declare class SkillLoaderError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
/**
 * A loaded skill with its source entry path.
 */
export interface LoadedSkill {
    skill: SkillDefinition;
    /** The entry name (file or directory) where the skill was found */
    entry: string;
}
/**
 * Conventional skill directories, checked in priority order.
 *
 * Skills are discovered from these directories in order:
 * 1. .warden/skills - Repo-local generated skills
 * 2. .agents/skills - Primary authored skills
 * 3. .claude/skills - Backup (matches Claude Code convention)
 *
 * Skills follow the agentskills.io specification:
 * - skill-name/SKILL.md (directory with SKILL.md inside - preferred)
 * - skill-name.md (flat markdown with SKILL.md frontmatter format)
 *
 * When a skill name exists in multiple directories, the first one found wins.
 */
export declare const SKILL_DIRECTORIES: readonly [".warden/skills", ".agents/skills", ".claude/skills"];
/**
 * Package-native Warden skills, resolved by name without installation.
 *
 * Repo-local conventional skills take precedence over these defaults so teams
 * can override built-ins with their own policy.
 */
export declare const BUILTIN_SKILL_DIRECTORIES: readonly ["src/builtin-skills"];
export declare const BUILTIN_SKILL_NAMES: readonly ["code-review", "security-review"];
/**
 * Conventional agent directories, checked in priority order.
 *
 * Agents are discovered from these directories in order:
 * 1. .agents/agents - Primary (recommended)
 * 2. .claude/agents - Backup (matches Claude Code convention)
 * 3. .warden/agents - Legacy
 *
 * Agents use the same format as skills but with AGENT.md marker files.
 */
export declare const AGENT_DIRECTORIES: readonly [".agents/agents", ".claude/agents", ".warden/agents"];
/** Marker filename for agent definitions */
export declare const AGENT_MARKER_FILE = "AGENT.md";
/**
 * Resolve a skill path, handling absolute paths, tilde expansion, and relative paths.
 */
export declare function resolveSkillPath(nameOrPath: string, repoRoot?: string): string;
/**
 * Resolve likely package roots from source, compiled package, or ncc action bundle locations.
 */
export declare function resolvePackageRootCandidates(): string[];
/**
 * Return true when a skill name resolves to a package-native built-in skill.
 */
export declare function isBuiltinSkillName(name: string): boolean;
/**
 * Clear the skills cache. Useful for testing or when skills may have changed.
 */
export declare function clearSkillsCache(): void;
/**
 * Options for loading a skill from markdown.
 */
export interface LoadSkillFromMarkdownOptions {
    /** Callback for reporting warnings (e.g., invalid tool names) */
    onWarning?: (message: string) => void;
}
/**
 * Load a skill from a SKILL.md file (agentskills.io format).
 *
 * Frontmatter parsing and `allowed-tools` interpretation are delegated to
 * `@sentry/dotagents-lib`; this wrapper attaches warden-specific fields
 * (`prompt` body, `rootDir`, `tools.allowed`) and translates lib errors to
 * `SkillLoaderError` for callers that catch on warden's error type.
 */
export declare function loadSkillFromMarkdown(filePath: string, options?: LoadSkillFromMarkdownOptions): Promise<SkillDefinition>;
/**
 * Load a skill from a file (agentskills.io format .md files).
 */
export declare function loadSkillFromFile(filePath: string, options?: LoadSkillFromMarkdownOptions): Promise<SkillDefinition>;
/**
 * Options for loading skills from a directory.
 */
export interface LoadSkillsOptions {
    /** Callback for reporting warnings (e.g., failed skill loading) */
    onWarning?: (message: string) => void;
    /** Marker filename for directory-format entries. Default: 'SKILL.md' */
    markerFile?: string;
}
/**
 * Load all skills from a directory.
 *
 * Supports the agentskills.io specification:
 * - skill-name/SKILL.md (directory with SKILL.md inside - preferred)
 * - skill-name.md (flat markdown with SKILL.md frontmatter format)
 *
 * Results are cached to avoid repeated disk reads.
 *
 * @returns Map of skill name to LoadedSkill (includes entry path for tracking)
 */
export declare function loadSkillsFromDirectory(dirPath: string, options?: LoadSkillsOptions): Promise<Map<string, LoadedSkill>>;
/**
 * A discovered skill with source metadata.
 */
export interface DiscoveredSkill {
    skill: SkillDefinition;
    /** Source label where the skill was found (e.g., "./.agents/skills" or "built-in") */
    directory: string;
    /** Full path to the skill */
    path: string;
}
/**
 * Discover all available skills from conventional directories.
 *
 * @param repoRoot - Repository root path for finding skills
 * @param options - Options for skill loading (e.g., warning callback)
 * @returns Map of skill name to discovered skill info
 */
export declare function discoverAllSkills(repoRoot?: string, options?: LoadSkillsOptions): Promise<Map<string, DiscoveredSkill>>;
export interface ResolveSkillOptions {
    /** Remote repository reference (e.g., "owner/repo" or "owner/repo@sha") */
    remote?: string;
    /** Skip network operations - only use cache for remote skills */
    offline?: boolean;
}
/**
 * Resolve a skill by name or path.
 *
 * Resolution order:
 * 1. Remote repository (if remote option is set)
 * 2. Direct path (if nameOrPath contains / or \ or starts with .)
 *    - Directory: load SKILL.md from it
 *    - File: load the .md file directly
 * 3. Conventional directories (if repoRoot provided)
 *    - .warden/skills/{name}/SKILL.md or .warden/skills/{name}.md
 *    - .agents/skills/{name}/SKILL.md or .agents/skills/{name}.md
 *    - .claude/skills/{name}/SKILL.md or .claude/skills/{name}.md
 * 4. Package-native built-in skills
 *    - src/builtin-skills/{name}/SKILL.md or src/builtin-skills/{name}.md
 */
export declare function resolveSkillAsync(nameOrPath: string, repoRoot?: string, options?: ResolveSkillOptions): Promise<SkillDefinition>;
/** An agent definition uses the same shape as a skill definition */
export type AgentDefinition = SkillDefinition;
/** A loaded agent with its source entry path */
export type LoadedAgent = LoadedSkill;
/** A discovered agent with source metadata */
export type DiscoveredAgent = DiscoveredSkill;
/**
 * Discover all available agents from conventional directories.
 *
 * @param repoRoot - Repository root path for finding agents
 * @param options - Options for loading (e.g., warning callback)
 * @returns Map of agent name to discovered agent info
 */
export declare function discoverAllAgents(repoRoot?: string, options?: LoadSkillsOptions): Promise<Map<string, DiscoveredAgent>>;
/**
 * Resolve an agent by name or path.
 *
 * Resolution order:
 * 1. Remote repository (if remote option is set)
 * 2. Direct path (if nameOrPath contains / or \ or starts with .)
 *    - Directory: load AGENT.md from it
 *    - File: load the .md file directly
 * 3. Conventional directories (if repoRoot provided)
 *    - .agents/agents/{name}/AGENT.md or .agents/agents/{name}.md
 *    - .claude/agents/{name}/AGENT.md or .claude/agents/{name}.md
 *    - .warden/agents/{name}/AGENT.md or .warden/agents/{name}.md
 */
export declare function resolveAgentAsync(nameOrPath: string, repoRoot?: string, options?: ResolveSkillOptions): Promise<AgentDefinition>;
//# sourceMappingURL=loader.d.ts.map