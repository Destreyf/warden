/**
 * Cross-platform browser opener.
 */
/**
 * Open a URL in the default browser.
 * Returns a promise that resolves when the browser open command has been executed.
 * Uses execFile (no shell) to avoid command injection via URL.
 */
export declare function openBrowser(url: string): Promise<void>;
//# sourceMappingURL=browser.d.ts.map