import type {
  ChartColorToken,
  ChartSpec,
  DateRange,
  Granularity,
  SeriesMeta,
  TimeDimension,
  VarRef,
} from "@/spec";

import { buildSeries, categoryOf, seriesMetaOf, timeDimensionOf } from "../helpers";
import { removeField, type FieldKind, type WellDef } from "../builder/wells";
import type { MemberOption } from "../../primitives/meta-helpers";

/**
 * Per-field spec writers for the on-chart editor — the single implementation that
 * knows which CORNER of the spec backs a placed field's label / color / granularity
 * / render, by family + well (lifted verbatim from the old BuilderChip so the new
 * {@link FieldPill} + its config popover stay in lockstep with the `wells.ts` seam).
 * Pure: every writer funnels a full next-spec through `update`.
 */

export type ComboRender = "bar" | "line" | "area";

interface ComboSeriesEntry {
  member: string;
  render: ComboRender;
  label?: string;
  colorToken?: ChartColorToken;
}

interface TableColumnEntry {
  member: string;
  label?: string;
}

export interface ChipBindings {
  /** The field's primitive role (single-kind wells are unambiguous). */
  kind: FieldKind;
  /** A rename override, if any. */
  label?: string;
  /** The EXPLICIT color token (undefined = auto/ramp); for the color picker's value. */
  colorToken?: ChartColorToken;
  /** The time bucket — a literal granularity OR a `{var}` binding — when this is the time field. */
  granularity?: Granularity | VarRef;
  /** The date range — a literal range OR a `{var}` binding — when this is the time field. */
  dateRange?: DateRange | VarRef;
  /** A combo render type, when this is a combo Y field. */
  render?: ComboRender;
  canRename: boolean;
  /** Whether a per-series color is meaningful (one rendered series ↔ this field). */
  canColor: boolean;
  /** Whether this placed field IS the (groupable) time dimension → granularity + date range. */
  isTimeField: boolean;
  isComboY: boolean;
  onRename: (label: string | undefined) => void;
  onRecolor: (token: ChartColorToken | null) => void;
  onGranularity: (g: Granularity | VarRef | undefined) => void;
  onDateRange: (range: DateRange | VarRef | undefined) => void;
  onRender: (r: ComboRender) => void;
  onRemove: () => void;
}

/**
 * Derive a placed field's current metadata + writers from the spec for well `well`.
 * `update` receives a full, validated next-spec on every edit.
 */
export function chipBindings(
  spec: ChartSpec,
  update: (next: ChartSpec) => void,
  well: WellDef,
  member: string,
  option: MemberOption | undefined,
): ChipBindings {
  const { chart, query } = spec;
  const family = chart.family;
  const kind: FieldKind = well.kinds.length === 1 ? well.kinds[0] : kindOf(option);

  const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
  const comboSeries = (Array.isArray(fo.series) ? fo.series : []) as ComboSeriesEntry[];
  const tableColumns = (Array.isArray(fo.columns) ? fo.columns : []) as TableColumnEntry[];
  const seriesMeta = seriesMetaOf(chart);
  const meta = seriesMeta[member];

  const isComboY = family === "combo" && well.id === "y";
  const isTableCol = family === "table" && well.id === "columns";
  const isCartesian = family === "bar" || family === "line" || family === "area";
  const measuresMode = chart.mapping?.series?.mode === "measures";
  const isCartesianY = isCartesian && well.id === "y";
  // Per-series meta (label/colour) only applies in MEASURES mode. In PIVOT mode the
  // Y well holds the single split VALUE whose rendered series are data-driven (one
  // per pivot value), so editing its meta must NOT run patchSeriesMeta — that rebuilds
  // the mapping as measures-mode and orphans the colour dimension, blanking the chart.
  const usesSeriesMeta = isCartesianY && measuresMode;

  const label = isComboY
    ? comboSeries.find((s) => s.member === member)?.label
    : isTableCol
      ? tableColumns.find((c) => c.member === member)?.label
      : usesSeriesMeta
        ? meta?.label
        : undefined;

  const colorToken: ChartColorToken | undefined = isComboY
    ? comboSeries.find((s) => s.member === member)?.colorToken
    : usesSeriesMeta
      ? meta?.colorToken
      : undefined;

  const timeDim = timeDimensionOf(query);
  // This placed field IS the (groupable) time dimension — so it owns granularity +
  // date range, each of which may be a literal OR a `{var}` binding.
  const isTimeField = well.kinds.includes("time") && timeDim?.dimension === member;
  const granularity = isTimeField ? timeDim?.granularity : undefined;
  const dateRange = isTimeField ? timeDim?.dateRange : undefined;

  const render = isComboY
    ? (comboSeries.find((s) => s.member === member)?.render ?? "line")
    : undefined;

  /* ── writers ────────────────────────────────────────────────────────────── */

  const patchSeriesMeta = (next: SeriesMeta | undefined): void => {
    // Defensive: never rebuild the mapping out of pivot mode (would orphan the split).
    if (chart.mapping?.series && chart.mapping.series.mode !== "measures") return;
    const measures =
      (chart.mapping?.series && chart.mapping.series.mode === "measures"
        ? chart.mapping.series.members
        : query.measures) ?? [];
    const nextMeta: Record<string, SeriesMeta> = { ...seriesMeta };
    if (next && Object.keys(next).length > 0) nextMeta[member] = next;
    else delete nextMeta[member];
    const category = categoryOf(chart);
    if (!category) return;
    update({
      ...spec,
      chart: {
        ...chart,
        mapping: { category: { member: category }, series: buildSeries(measures, nextMeta) },
      },
    });
  };

  const patchComboSeries = (patch: Partial<ComboSeriesEntry>): void => {
    const next = comboSeries.map((s) => (s.member === member ? { ...s, ...patch } : s));
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, series: next } } });
  };

  const patchTableColumn = (patch: Partial<TableColumnEntry>): void => {
    const next = tableColumns.map((c) => (c.member === member ? { ...c, ...patch } : c));
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, columns: next } } });
  };

  const onRename = (value: string | undefined): void => {
    if (isComboY) patchComboSeries({ label: value });
    else if (isTableCol) patchTableColumn({ label: value });
    else if (usesSeriesMeta) patchSeriesMeta({ ...meta, label: value });
  };

  const onRecolor = (token: ChartColorToken | null): void => {
    if (isComboY) patchComboSeries({ colorToken: token ?? undefined });
    else if (usesSeriesMeta) patchSeriesMeta({ ...meta, colorToken: token ?? undefined });
  };

  // Set a time-dimension field (granularity / dateRange), dropping a key set to undefined.
  const patchTimeDim = (patch: Partial<TimeDimension>): void => {
    if (!timeDim) return;
    const next: TimeDimension = { ...timeDim };
    for (const key of Object.keys(patch) as (keyof TimeDimension)[]) {
      const v = patch[key];
      if (v === undefined) delete next[key];
      else (next as Record<string, unknown>)[key] = v;
    }
    update({ ...spec, query: { ...query, timeDimensions: [next] } });
  };

  const onGranularity = (g: Granularity | VarRef | undefined): void => patchTimeDim({ granularity: g });
  const onDateRange = (range: DateRange | VarRef | undefined): void => patchTimeDim({ dateRange: range });

  const onRender = (r: ComboRender): void => patchComboSeries({ render: r });

  const onRemove = (): void => update(removeField(spec, family, well.id, member));

  return {
    kind,
    label,
    colorToken,
    granularity,
    dateRange,
    render,
    canRename: isComboY || isTableCol || usesSeriesMeta,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: (isCartesianY && measuresMode) || isComboY,
    isTimeField,
    isComboY,
    onRename,
    onRecolor,
    onGranularity,
    onDateRange,
    onRender,
    onRemove,
  };
}

function kindOf(option: MemberOption | undefined): FieldKind {
  if (!option) return "category";
  if (option.memberType === "measure") return "number";
  if (option.type === "time") return "time";
  return "category";
}

/**
 * Reorder a member within a many-cardinality well, rewriting the backing array(s)
 * in lockstep (cartesian measures + mapping members; combo series + query.measures;
 * table columns). Returns a full spec. Lifted verbatim from the old panel.
 */
export function reorderWell(
  spec: ChartSpec,
  well: WellDef,
  from: number,
  to: number,
): ChartSpec {
  const { chart, query } = spec;
  const family = chart.family;
  const move = <T,>(arr: T[]): T[] => {
    if (to < 0 || to >= arr.length || from === to) return arr;
    const next = arr.slice();
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    return next;
  };

  if (family === "combo" && well.id === "y") {
    const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
    const series = move((Array.isArray(fo.series) ? fo.series : []) as ComboSeriesEntry[]);
    const measures = move(query.measures ?? []);
    return {
      ...spec,
      query: { ...query, measures },
      chart: { ...chart, familyOptions: { ...fo, series } },
    };
  }

  if (family === "table" && well.id === "columns") {
    const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
    const columns = move((Array.isArray(fo.columns) ? fo.columns : []) as TableColumnEntry[]);
    return { ...spec, chart: { ...chart, familyOptions: { ...fo, columns } } };
  }

  // cartesian Y (measures) — reorder measures + mapping series members in lockstep.
  const measures = move(query.measures ?? []);
  const series = chart.mapping?.series;
  const mapping =
    series && series.mode === "measures"
      ? { ...chart.mapping!, series: { ...series, members: measures } }
      : chart.mapping;
  return { ...spec, query: { ...query, measures }, chart: { ...chart, mapping } };
}
