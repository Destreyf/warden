/**
 * File classification for chunking - determines how files should be processed
 */
import type { FilePattern } from '../config/schema.js';
/** Processing mode for a file */
export type FileMode = 'per-hunk' | 'whole-file' | 'skip';
/**
 * Classify a file to determine how it should be processed.
 *
 * @param filename - The file path to classify
 * @param userPatterns - Optional user-defined chunking patterns
 * @returns The processing mode: 'per-hunk', 'whole-file', or 'skip'
 */
export declare function classifyFile(filename: string, userPatterns?: FilePattern[]): FileMode;
//# sourceMappingURL=classify.d.ts.map