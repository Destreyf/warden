import type { ErrorCode } from '../types/index.js';
interface TriggerErrorContext {
    triggerName: string;
    skillName: string;
}
/**
 * Capture trigger failures with stable tags and grouped fingerprints.
 */
export declare function captureActionTriggerError(error: unknown, context: TriggerErrorContext): ErrorCode;
export {};
//# sourceMappingURL=error-reporting.d.ts.map