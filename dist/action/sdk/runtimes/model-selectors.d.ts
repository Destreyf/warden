/**
 * Return true when a Pi model selector uses provider/model-id syntax.
 */
export declare function isPiModelSelector(model: string): boolean;
export type PiModelSelectorOption = 'model' | 'auxiliaryModel' | 'synthesisModel';
export interface PiModelSelectorTarget {
    name?: string;
    runtime?: string;
    model?: string;
    auxiliaryModel?: string;
    synthesisModel?: string;
}
export interface InvalidPiModelSelector {
    specName?: string;
    option: PiModelSelectorOption;
    model: string;
}
/**
 * Format the user-facing error for an invalid Pi model selector.
 */
export declare function invalidPiModelSelectorMessage(invalid: InvalidPiModelSelector): string;
/**
 * Preserve invalid Pi selector details through shared error classification.
 */
export declare class InvalidPiModelSelectorError extends Error {
    invalid: InvalidPiModelSelector;
    constructor(invalid: InvalidPiModelSelector);
}
/**
 * Find the first Pi runner option using a model ID that is not provider/model.
 */
export declare function findInvalidPiModelSelector(targets: PiModelSelectorTarget[]): InvalidPiModelSelector | undefined;
/**
 * Throw when any Pi runner option is not a provider/model selector.
 */
export declare function assertValidPiModelSelectors(targets: PiModelSelectorTarget[]): void;
//# sourceMappingURL=model-selectors.d.ts.map