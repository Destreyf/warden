import type { SkillDefinition } from '../config/schema.js';
import { type LocalContextOptions } from '../cli/context.js';
import type { EventContext, Finding, SkillReport } from '../types/index.js';
import type { VerifyFindingsOptions, VerifyFindingsResult } from './verify.js';
import type { SkillRunnerOptions } from './types.js';
export interface RunLocalSkillOptions extends LocalContextOptions, SkillRunnerOptions {
    /** Skill file or directory to run. */
    skillPath: string;
}
export interface RunLocalSkillResult {
    /** Resolved skill definition used for the run. */
    skill: SkillDefinition;
    /** Synthetic pull request context built from the local git diff. */
    context: EventContext;
    /** Skill report returned by the Warden pipeline. */
    report: SkillReport;
}
export interface VerifyLocalFindingsOptions extends Omit<VerifyFindingsOptions, 'skill'> {
    /** Candidate findings to verify. */
    findings: Finding[];
    /** Skill file or directory that produced the candidate findings. */
    skillPath: string;
}
export interface VerifyLocalFindingsResult extends VerifyFindingsResult {
    /** Resolved skill definition used for verification. */
    skill: SkillDefinition;
}
/** Run a skill against a local git diff using Warden's normal analysis pipeline. */
export declare function runLocalSkill(options: RunLocalSkillOptions): Promise<RunLocalSkillResult>;
/** Verify candidate findings against a local repository using Warden's verifier. */
export declare function verifyLocalFindings(options: VerifyLocalFindingsOptions): Promise<VerifyLocalFindingsResult>;
//# sourceMappingURL=local.d.ts.map