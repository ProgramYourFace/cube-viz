import { SCHEMA_VERSION, SpecSchema, ChartSpecSchema, DashboardSpecSchema, type Spec } from "./schema";

/**
 * Forward-migration ladder. Each entry lifts a spec from version `n` to `n+1`.
 * Migrations run BEFORE zod parsing so old shapes are repaired, then proven valid
 * against the current schema. Every step treats its input as UNTRUSTED JSON —
 * missing/odd shapes flow through unchanged and the final zod parse is the proof.
 */
type Migration = (raw: Record<string, unknown>) => Record<string, unknown>;

/* ─────────────────────────── v1 → v2 (combo + dual-axis removal) ─────────── */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Drop `key` from a record, returning undefined when nothing (else) remains. */
function without(
  obj: Record<string, unknown>,
  key: string,
): Record<string, unknown> | undefined {
  const { [key]: _dropped, ...rest } = obj;
  return Object.keys(rest).length > 0 ? rest : undefined;
}

/** Strip `axes.y2` — the right value axis no longer exists. */
function stripY2(chart: Record<string, unknown>): void {
  if (!isRecord(chart.axes)) return;
  const axes = without(chart.axes, "y2");
  if (axes) chart.axes = axes;
  else delete chart.axes;
}

/** Strip `axis: "left"|"right"` from every `mapping.series.meta[member]`. */
function stripSeriesMetaAxis(chart: Record<string, unknown>): void {
  if (!isRecord(chart.mapping)) return;
  const series = chart.mapping.series;
  if (!isRecord(series) || !isRecord(series.meta)) return;
  const meta: Record<string, unknown> = {};
  for (const [member, entry] of Object.entries(series.meta)) {
    if (!isRecord(entry)) continue;
    const cleaned = without(entry, "axis");
    if (cleaned) meta[member] = cleaned;
  }
  if (Object.keys(meta).length > 0) series.meta = meta;
  else delete series.meta;
}

/** Strip the combo-only `side` (left/right y-scale) from familyOptions.referenceLines. */
function stripReferenceLineSides(chart: Record<string, unknown>): void {
  if (!isRecord(chart.familyOptions)) return;
  const refs = chart.familyOptions.referenceLines;
  if (!Array.isArray(refs)) return;
  chart.familyOptions.referenceLines = refs.map((r) =>
    isRecord(r) ? (without(r, "side") ?? {}) : r,
  );
}

/**
 * Rewrite a combo chart to bar or line:
 *  - family → "bar" when ANY `familyOptions.series[].render === "bar"`, else "line";
 *  - per-series `colorToken`s move onto the measures-mode `mapping.series.meta`
 *    (keyed by measure) when the mapping lists that measure — the shape bar/line
 *    read color from — else they are dropped;
 *  - everything else in the combo familyOptions has no bar/line equivalent, so
 *    familyOptions collapses to `{}` and the new family's defaults win.
 */
function migrateComboChart(chart: Record<string, unknown>): void {
  const fo = isRecord(chart.familyOptions) ? chart.familyOptions : {};
  const series = Array.isArray(fo.series) ? fo.series.filter(isRecord) : [];

  chart.family = series.some((s) => s.render === "bar") ? "bar" : "line";

  // Carry colorToken per measure onto the mapping meta when representable.
  const mapping = isRecord(chart.mapping) ? chart.mapping : undefined;
  const mapSeries = mapping && isRecord(mapping.series) ? mapping.series : undefined;
  const members =
    mapSeries?.mode === "measures" && Array.isArray(mapSeries.members)
      ? mapSeries.members.filter((m): m is string => typeof m === "string")
      : [];
  if (mapSeries && members.length > 0) {
    const meta: Record<string, { colorToken: unknown }> = {};
    for (const s of series) {
      if (typeof s.member === "string" && s.colorToken !== undefined && members.includes(s.member)) {
        meta[s.member] = { colorToken: s.colorToken };
      }
    }
    if (Object.keys(meta).length > 0) {
      // Merge UNDER any existing meta (there should be none on a combo, but stay safe).
      const existing = isRecord(mapSeries.meta) ? mapSeries.meta : {};
      mapSeries.meta = { ...meta, ...existing };
    }
  }

  chart.familyOptions = {};
}

/** Sanitize one chart-options object (a widget's `chart` / a chart spec's `chart`). */
function migrateChartOptionsV1(chart: unknown): void {
  if (!isRecord(chart)) return;
  if (chart.family === "combo") migrateComboChart(chart);
  stripY2(chart);
  stripSeriesMetaAxis(chart);
  stripReferenceLineSides(chart);
}

/**
 * v1 → v2: the combo family and all dual-axis support were removed.
 * Rewrites combo widgets to bar/line, strips `axes.y2`, per-series `meta.axis`
 * and reference-line `side` remnants everywhere a chart-options object lives.
 */
function migrateV1(raw: Record<string, unknown>): Record<string, unknown> {
  // Deep-clone before the in-place sanitizers below — never mutate caller JSON.
  const next = structuredClone(raw);
  if (next.kind === "chart") {
    migrateChartOptionsV1(next.chart);
  } else if (next.kind === "dashboard" && Array.isArray(next.widgets)) {
    for (const w of next.widgets) {
      if (isRecord(w) && w.type === "chart") migrateChartOptionsV1(w.chart);
    }
  }
  return next;
}

const migrations: Record<number, Migration> = {
  1: migrateV1,
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
