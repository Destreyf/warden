import type { z } from 'zod';
import type { UsageStats } from '../types/index.js';
import { type Runtime, type RuntimeName } from './runtimes/index.js';
export type ParseJsonFromOutputResult<T> = {
    success: true;
    data: T;
    json: string;
    repaired: boolean;
    usage?: UsageStats;
} | {
    success: false;
    error: string;
    json?: string;
    usage?: UsageStats;
};
export interface JsonOutputRepairOptions {
    apiKey?: string;
    agentName?: string;
    runtime?: Runtime;
    runtimeName?: RuntimeName;
    model?: string;
    maxRetries?: number;
    maxTokens?: number;
    timeout?: number;
}
export interface ParseJsonFromOutputOptions<T> {
    output: string;
    schema: z.ZodType<T>;
    repair?: JsonOutputRepairOptions;
}
export declare function parseJsonFromOutput<T>(options: ParseJsonFromOutputOptions<T>): Promise<ParseJsonFromOutputResult<T>>;
//# sourceMappingURL=json-output.d.ts.map