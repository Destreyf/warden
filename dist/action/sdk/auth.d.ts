/**
 * Pre-flight auth check: verify that authentication will work before starting analysis.
 *
 * - If an API key is provided, returns immediately (direct API auth).
 * - If no API key, verifies the configured Claude Code executable, or the
 *   `claude` binary on PATH, so the SDK can use local Claude Code auth.
 *   Throws WardenAuthenticationError if the binary is missing.
 *
 * This catches the most common failure mode (binary not installed) early.
 * Subtler failures (binary exists but sandbox blocks IPC) are caught by the
 * isSubprocessError() handler in analyzeHunk().
 */
export declare function verifyAuth({ apiKey, pathToClaudeCodeExecutable, }: {
    apiKey?: string;
    pathToClaudeCodeExecutable?: string;
}): void;
//# sourceMappingURL=auth.d.ts.map