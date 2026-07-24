/**
 * GitHub Action dispatcher.
 *
 * Parses action inputs, builds the GitHub client, and selects the workflow for
 * the current GitHub event. The top-level run module owns process exit handling.
 */
/** Run the GitHub Action dispatcher once. */
export declare function runAction(): Promise<void>;
//# sourceMappingURL=runner.d.ts.map