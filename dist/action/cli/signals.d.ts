interface SigintHandlerOptions {
    abortController: AbortController;
    interrupted: {
        value: boolean;
    };
    now?: () => number;
    exit?: (code: number) => void;
    duplicateWindowMs?: number;
}
/**
 * Create the CLI SIGINT handler.
 */
export declare function createSigintHandler(options: SigintHandlerOptions): () => void;
export {};
//# sourceMappingURL=signals.d.ts.map