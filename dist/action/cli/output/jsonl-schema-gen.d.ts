/**
 * Generator for specs/jsonl-schema.json.
 *
 * The formal JSON Schema for Warden's JSONL output is derived from the Zod
 * schemas (single source of truth). Running this produces a JSON string that
 * matches specs/jsonl-schema.json; a test asserts they stay in sync.
 */
/**
 * Build the full JSON Schema for Warden's JSONL output as a plain object.
 * Shared Zod schemas are registered by ID so they surface as `$defs` entries
 * with stable names instead of auto-numbered refs.
 */
export declare function buildJsonlJsonSchema(): Record<string, unknown>;
/** Render the JSON Schema as a stable, newline-terminated string. */
export declare function renderJsonlJsonSchema(): string;
//# sourceMappingURL=jsonl-schema-gen.d.ts.map