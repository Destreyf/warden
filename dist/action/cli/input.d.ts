export interface PromptMultilineOptions {
    hint?: string | false;
    prompt?: string;
}
/**
 * Custom error thrown when the user aborts via Ctrl+C during interactive input.
 * Allows callers to handle cleanup (e.g. Sentry flush) before exiting.
 */
export declare class UserAbortError extends Error {
    constructor();
}
/**
 * Read a single keypress from stdin in raw mode.
 */
export declare function readSingleKey(): Promise<string>;
/**
 * Prompt for a single line of text on stderr.
 */
export declare function promptLine(question: string): Promise<string>;
/**
 * Prompt for multiline text on stderr. The user finishes with an empty line.
 */
export declare function promptMultiline(intro: string, options?: PromptMultilineOptions): Promise<string>;
//# sourceMappingURL=input.d.ts.map