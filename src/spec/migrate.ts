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

/* ──────────────────── v2 → v3 (options that never rendered) ─────────────────── */

/**
 * Strip `mapping.series.meta[*].format`. A per-series format printed nothing: every
 * value surface formats through the chart-bound `ChartFormat`, which reads
 * `chart.format` plus the per-axis/per-column overrides and never series meta.
 */
function stripSeriesMetaFormat(chart: Record<string, unknown>): void {
  if (!isRecord(chart.mapping)) return;
  const series = chart.mapping.series;
  if (!isRecord(series) || !isRecord(series.meta)) return;
  const meta: Record<string, unknown> = {};
  for (const [member, entry] of Object.entries(series.meta)) {
    if (!isRecord(entry)) continue;
    const cleaned = without(entry, "format");
    if (cleaned) meta[member] = cleaned;
  }
  if (Object.keys(meta).length > 0) series.meta = meta;
  else delete series.meta;
}

/**
 * `legend.position` lost `left`/`right`. Both already RENDERED as bottom, so
 * rewriting them to `"bottom"` preserves exactly what the user was seeing.
 */
function migrateLegendPosition(chart: Record<string, unknown>): void {
  if (!isRecord(chart.legend)) return;
  const pos = chart.legend.position;
  if (pos === "left" || pos === "right") chart.legend.position = "bottom";
}

/**
 * `axes.{x,y}.domain` lost its `"auto"` bound. A half-`"auto"` domain was ignored
 * whole — the axis inferred BOTH ends — so dropping it keeps the rendered result and
 * makes the spec say what actually happens. `["auto","auto"]` was already just auto.
 */
function stripAutoAxisDomains(chart: Record<string, unknown>): void {
  if (!isRecord(chart.axes)) return;
  for (const key of ["x", "y"]) {
    const axis = chart.axes[key];
    if (!isRecord(axis) || !Array.isArray(axis.domain)) continue;
    if (axis.domain.every((b) => typeof b === "number")) continue;
    const cleaned = without(axis, "domain");
    if (cleaned) chart.axes[key] = cleaned;
    else delete chart.axes[key];
  }
  if (Object.keys(chart.axes).length === 0) delete chart.axes;
}

/**
 * Drop family options that never reached the canvas: `scatter.shape` (the dot mark
 * draws one symbol — every value already rendered as a circle) and `kpi.icon` (never
 * painted in any renderer this library has shipped).
 */
function stripDeadFamilyOptions(chart: Record<string, unknown>): void {
  if (!isRecord(chart.familyOptions)) return;
  const dead = chart.family === "scatter" ? "shape" : chart.family === "kpi" ? "icon" : undefined;
  if (dead === undefined) return;
  const cleaned = without(chart.familyOptions, dead);
  chart.familyOptions = cleaned ?? {};
}

function migrateChartOptionsV2(chart: unknown): void {
  if (!isRecord(chart)) return;
  stripSeriesMetaFormat(chart);
  migrateLegendPosition(chart);
  stripAutoAxisDomains(chart);
  stripDeadFamilyOptions(chart);
}

/**
 * v2 → v3: removal of five options that parsed but never rendered — per-series
 * `meta.format`, `legend.position: left|right`, half-`"auto"` `axes.*.domain`,
 * `scatter.shape` and `kpi.icon`. Every rewrite below preserves the PIXELS the spec
 * was already producing; see docs/02-chart-options.md §7.
 */
function migrateV2(raw: Record<string, unknown>): Record<string, unknown> {
  const next = structuredClone(raw);
  if (next.kind === "chart") {
    migrateChartOptionsV2(next.chart);
  } else if (next.kind === "dashboard" && Array.isArray(next.widgets)) {
    for (const w of next.widgets) {
      if (isRecord(w) && w.type === "chart") migrateChartOptionsV2(w.chart);
    }
  }
  return next;
}

/* ─────────────── v3 → v4 (mark geometry became app-level theme) ─────────────── */

/**
 * What each family no longer accepts. The geometry entries moved to the host's
 * `theme.marks` ({@link import("@/charts/theme").ChartMarkTheme}) — appearance, set once
 * for the app; asking a chart author about them was never a question about their data.
 * The rest became fixed behavior or a data-driven default.
 *
 * `pie.innerRadiusPct` is deliberately NOT here: it is the donut/pie switch, which
 * changes what the chart IS rather than how it is painted.
 */
const GEOMETRY_BY_FAMILY: Record<string, readonly string[]> = {
  bar: ["barRadius", "barCategoryGap", "barGap", "maxBarSize"],
  line: ["strokeWidth"],
  area: ["fillOpacity", "strokeWidth"],
  pie: ["outerRadiusPct", "padAngle", "cornerRadius", "maxSlices"],
  scatter: ["sizeRange"],
  // Not geometry, same reasoning: settings whose every value was defensible, replaced
  // by one right answer. Sorting and a pinned header are always on, row density follows
  // the row count, row numbers are gone, and the heatmap prints in-cell values whenever
  // the grid is small enough to read them.
  table: ["sortable", "stickyHeader", "rowHeight", "showRowNumbers"],
  heatmap: ["showValues"],
};

/**
 * Drop the retired keys. A stored value is DISCARDED rather than promoted into the
 * theme: the theme is app-wide, so honoring one chart's `barRadius: 12` would restyle
 * every other chart on the dashboard. Any spec that had customized these shifts to the
 * app default — the one step in this ladder that is not pixel-preserving, and the whole
 * point of the change.
 */
function stripRetiredOptions(chart: Record<string, unknown>): void {
  if (!isRecord(chart.familyOptions)) return;
  const family = typeof chart.family === "string" ? chart.family : "";
  const moved = GEOMETRY_BY_FAMILY[family];
  if (!moved) return;
  let fo = chart.familyOptions;
  for (const key of moved) fo = without(fo, key) ?? {};
  chart.familyOptions = fo;
}

/**
 * `axes.*.labelHide: true` becomes `label: ""`. The separate flag is gone: an axis
 * title is now said entirely by the title field, where empty means none. A hidden
 * title that ALSO carried override text loses the text — it was invisible either way,
 * and keeping it would resurrect a title the user had turned off.
 */
function migrateAxisLabelHide(chart: Record<string, unknown>): void {
  if (!isRecord(chart.axes)) return;
  for (const key of ["x", "y"]) {
    const axis = chart.axes[key];
    if (!isRecord(axis) || axis.labelHide !== true) continue;
    const cleaned = without(axis, "labelHide") ?? {};
    cleaned.label = "";
    chart.axes[key] = cleaned;
  }
}

/**
 * v3 → v4: the ten mark-geometry options left the spec for the host theme, and the
 * axis title absorbed its own hide flag. See charts/theme.ts, editor ChartChrome, and
 * docs/02-chart-options.md §4.1.
 */
function migrateChartOptionsV3(chart: unknown): void {
  if (!isRecord(chart)) return;
  stripRetiredOptions(chart);
  migrateAxisLabelHide(chart);
}

function migrateV3(raw: Record<string, unknown>): Record<string, unknown> {
  const next = structuredClone(raw);
  if (next.kind === "chart") {
    migrateChartOptionsV3(next.chart);
  } else if (next.kind === "dashboard" && Array.isArray(next.widgets)) {
    for (const w of next.widgets) {
      if (isRecord(w) && w.type === "chart") migrateChartOptionsV3(w.chart);
    }
  }
  return next;
}

const migrations: Record<number, Migration> = {
  1: migrateV1,
  2: migrateV2,
  3: migrateV3,
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
