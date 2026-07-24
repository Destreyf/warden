type UnhandledRejectionListener = (reason: unknown) => void;
type PiRuntimeImporter = () => Promise<unknown>;
type PiProviderPreloader = () => Promise<void>;
interface UnhandledRejectionTarget {
    prependListener(eventName: 'unhandledRejection', listener: UnhandledRejectionListener): unknown;
    removeListener(eventName: 'unhandledRejection', listener: UnhandledRejectionListener): unknown;
}
/**
 * Preload Pi before action initialization so ncc's dynamic-import rewrite for
 * Pi's env-key helper and node-only providers cannot terminate the bundled GitHub Action.
 */
export declare function preloadPiRuntimeForActionBundle(importPiRuntime?: PiRuntimeImporter, unhandledRejections?: UnhandledRejectionTarget, preloadProviders?: PiProviderPreloader): Promise<void>;
export {};
//# sourceMappingURL=pi-ncc-compat.d.ts.map