import { z } from 'zod';
import type { UsageStats } from '../types/index.js';
import type { Runtime } from '../sdk/runtimes/index.js';
export interface StructuredSkillBuilderAgentResult<T> {
    data: T;
    usage: UsageStats;
    durationMs: number;
    responseModel?: string;
    numTurns?: number;
}
export declare class StructuredSkillBuilderAgentError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
export declare function runStructuredSkillBuilderAgent<T>(args: {
    runtime: Runtime;
    repoPath: string;
    skillName: string;
    systemPrompt: string;
    userPrompt: string;
    schema: z.ZodType<T>;
    model?: string;
    maxTurns?: number;
    writeAccess?: boolean;
    abortController?: AbortController;
    apiKey?: string;
    repair?: {
        apiKey?: string;
        model?: string;
        maxRetries?: number;
    };
}): Promise<StructuredSkillBuilderAgentResult<T>>;
//# sourceMappingURL=agentic.d.ts.map