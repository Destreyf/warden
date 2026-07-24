import type { CLIOptions } from '../args.js';
import type { Reporter } from '../output/reporter.js';
interface RunBuildState {
    abortController?: AbortController;
    interrupted?: {
        value: boolean;
    };
}
export declare function runBuild(options: CLIOptions, reporter: Reporter, state?: RunBuildState): Promise<number>;
/** Run the generated skill improvement command through the shared builder. */
export declare function runImprove(options: CLIOptions, reporter: Reporter, state?: RunBuildState): Promise<number>;
export {};
//# sourceMappingURL=build.d.ts.map