import type { ErrorCode } from '../types/index.js';
import { type ProviderErrorContext } from './errors.js';
type CircuitBreakerCode = Extract<ErrorCode, 'auth_failed' | 'provider_unavailable' | 'invalid_model_selector'>;
export interface CircuitBreakerReason {
    code: CircuitBreakerCode;
    message: string;
    providerContext?: ProviderErrorContext;
}
interface ProviderFailureCircuitBreakerOptions {
    maxConsecutiveProviderFailures?: number;
    abortController?: AbortController;
}
/**
 * Tracks unrecoverable provider failures across a Warden run.
 */
export declare class ProviderFailureCircuitBreaker {
    private consecutiveProviderFailures;
    private openReason?;
    /** Avoid retaining sensitive runner options or adding them to the serializable reason. */
    private providerContextScope?;
    private readonly maxConsecutiveProviderFailures;
    private readonly abortController?;
    constructor(options?: ProviderFailureCircuitBreakerOptions);
    get reason(): CircuitBreakerReason | undefined;
    recordSuccess(): void;
    recordFailure(code: ErrorCode, message: string, providerContext?: ProviderErrorContext, providerContextScope?: object): void;
    /** Return provider diagnostics only to the skill run that recorded them. */
    providerContextFor(scope: object | undefined): ProviderErrorContext | undefined;
    private open;
}
export {};
//# sourceMappingURL=circuit-breaker.d.ts.map