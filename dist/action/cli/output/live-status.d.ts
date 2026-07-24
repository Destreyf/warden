/**
 * Shared transient status renderers for command-level CLI orchestration.
 *
 * Terminal output design guide: `specs/terminal-output.md`
 */
import React from 'react';
import type { OutputMode } from './tty.js';
import { Verbosity } from './verbosity.js';
interface LiveStatusListItemState {
    label: string;
    status: 'pending' | 'running' | 'done' | 'error';
    detail?: string;
    startedAt?: number;
    durationMs?: number;
    showRunningDuration?: boolean;
    error?: string;
}
/** Render the transient list UI used for concurrent build progress. */
export declare function LiveStatusList({ items }: {
    items: LiveStatusListItemState[];
}): React.ReactElement;
export declare function runWithLiveStatus<T>(args: {
    mode: OutputMode;
    verbosity: Verbosity;
    message: string;
    detail?: string;
    task: (controls: {
        setDetail: (detail: string | undefined) => void;
    }) => Promise<T>;
}): Promise<T>;
/**
 * Run concurrent work items with a live TTY list that mirrors Warden's normal
 * multi-item progress rendering instead of collapsing active work into one line.
 */
export declare function runWithLiveStatusList<TItem, TResult>(args: {
    mode: OutputMode;
    verbosity: Verbosity;
    items: TItem[];
    concurrency: number;
    getLabel: (item: TItem, index: number) => string;
    task: (item: TItem, index: number) => Promise<TResult>;
    getDoneDetail?: (result: TResult, item: TItem, index: number) => string | undefined;
    showRunningDuration?: (item: TItem, index: number) => boolean;
    showDoneDuration?: (result: TResult, item: TItem, index: number) => boolean;
    shouldAbort?: () => boolean;
}): Promise<TResult[]>;
export {};
//# sourceMappingURL=live-status.d.ts.map