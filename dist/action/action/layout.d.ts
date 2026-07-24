export interface ValidateActionLayoutOptions {
    repoRoot: string;
    requireDist?: boolean;
}
/**
 * Validates files that GitHub must stage before the composite action can run.
 */
export declare function validateActionLayout(options: ValidateActionLayoutOptions): string[];
//# sourceMappingURL=layout.d.ts.map