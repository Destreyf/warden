export { processInBatches, runPool, Semaphore } from './async.js';
export { getVersion, getMajorVersion } from './version.js';
export { ExecError, execNonInteractive, execFileNonInteractive, execGitNonInteractive, GIT_NON_INTERACTIVE_ENV, } from './exec.js';
export { isPathLike } from './path.js';
export type { ExecOptions } from './exec.js';
/** Default concurrency for parallel trigger/skill execution */
export declare const DEFAULT_CONCURRENCY = 4;
/**
 * Escape HTML special characters to prevent them from being interpreted as HTML.
 * Preserves content inside markdown code blocks (```) and inline code (`).
 * Used when rendering finding titles/descriptions in GitHub comments.
 */
export declare function escapeHtml(text: string): string;
/**
 * Get the Anthropic API key from environment variables.
 * Checks WARDEN_ANTHROPIC_API_KEY first, then falls back to ANTHROPIC_API_KEY.
 */
export declare function getAnthropicApiKey(): string | undefined;
/**
 * Mirrors WARDEN-prefixed provider API keys to the env names expected by SDKs.
 */
export declare function bridgeWardenProviderApiKeyEnv(env?: NodeJS.ProcessEnv): void;
//# sourceMappingURL=index.d.ts.map