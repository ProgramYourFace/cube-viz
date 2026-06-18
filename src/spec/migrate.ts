import { SCHEMA_VERSION, SpecSchema, ChartSpecSchema, DashboardSpecSchema, type Spec } from "./schema";

/**
 * Forward-migration ladder. Each entry lifts a spec from version `n` to `n+1`.
 * Migrations run BEFORE zod parsing so old shapes are repaired, then proven valid
 * against the current schema. v1 is the initial version, so the ladder is empty.
 */
type Migration = (raw: Record<string, unknown>) => Record<string, unknown>;

const migrations: Record<number, Migration> = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};

/**
 * Load an untrusted JSON value as a validated Spec: migrate forward to the current
 * version, then zod-parse. Throws on an unrepairable or future-versioned spec.
 */
export function loadSpec(raw: unknown): Spec {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("cube-viz: spec must be a JSON object");
  }
  let r = { ...(raw as Record<string, unknown>) };
  let v = typeof r.schemaVersion === "number" ? r.schemaVersion : 1;

  if (v > SCHEMA_VERSION) {
    throw new Error(
      `cube-viz: spec schemaVersion ${v} is newer than supported ${SCHEMA_VERSION} — update the library`,
    );
  }
  while (v < SCHEMA_VERSION) {
    const migrate = migrations[v];
    if (!migrate) throw new Error(`cube-viz: no migration registered from schemaVersion ${v}`);
    r = migrate(r);
    v += 1;
    r.schemaVersion = v;
  }
  return SpecSchema.parse(r);
}

export type LoadResult =
  | { ok: true; spec: Spec }
  | { ok: false; error: string };

/** Non-throwing variant for editor/preview boundaries. */
export function safeLoadSpec(raw: unknown): LoadResult {
  try {
    return { ok: true, spec: loadSpec(raw) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Validate an already-current-version Spec (no migration). */
export function validateSpec(raw: unknown): Spec {
  return SpecSchema.parse(raw);
}

export { ChartSpecSchema, DashboardSpecSchema };
