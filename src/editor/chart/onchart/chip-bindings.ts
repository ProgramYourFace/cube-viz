import type {
  ChartColorToken,
  ChartSpec,
  DateRange,
  Granularity,
  OrderSpec,
  SeriesMeta,
  TimeDimension,
  VarRef,
} from "@/spec";
import type { FamilyRegistry } from "@/charts";

import { buildSeries, categoryOf, measuresOf, seriesMetaOf, timeDimensionOf } from "../helpers";
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
export type LineCurve = "linear" | "monotone" | "step" | "natural";

type AxisSide = "left" | "right";

/** How the category axis is ordered (contextual: by value, by label, or chronological). */
export type SortKey =
  | "none"
  | "value-desc"
  | "value-asc"
  | "label-asc"
  | "label-desc"
  | "time-asc"
  | "time-desc";

export interface SortOption {
  key: SortKey;
  label: string;
}

/** Normalize an {@link OrderSpec} (record OR tuple array) to ordered `[member, dir]` pairs. */
function orderEntries(order: OrderSpec | undefined): [string, "asc" | "desc"][] {
  if (!order) return [];
  return Array.isArray(order) ? order : (Object.entries(order) as [string, "asc" | "desc"][]);
}

interface ComboSeriesEntry {
  member: string;
  render: ComboRender;
  label?: string;
  colorToken?: ChartColorToken;
  axis?: AxisSide;
  curve?: LineCurve;
  dots?: boolean;
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
  /** The value axis (left/right) this series is on — for dual-axis families. */
  axis?: AxisSide;
  /** Per-series line shape, when this series draws a line/area. */
  curve?: LineCurve;
  /** Per-series point markers, when this series draws a line/area. */
  dots?: boolean;
  /** Whether per-series line style (shape + points) applies to this field. */
  canLineStyle: boolean;
  /** Whether this field can be moved between left/right value axes (line + combo Y). */
  canAxis: boolean;
  canRename: boolean;
  /** Whether a per-series color is meaningful (one rendered series ↔ this field). */
  canColor: boolean;
  /** Whether this placed field IS the (groupable) time dimension → granularity + date range. */
  isTimeField: boolean;
  isComboY: boolean;
  /** Whether this field IS the single category axis (x / pie slices) → sort + top-N apply. */
  isCategoryField: boolean;
  /** Whether a previous-period comparison toggle applies here (time field of bar/line/area). */
  canComparePrevious: boolean;
  /** Whether previous-period comparison is currently on. */
  comparePrevious: boolean;
  /** Whether a literal date range is set, so a previous period CAN be computed. When
   *  false, turning comparison on does nothing (nothing to offset) — surface a hint. */
  comparePreviousReady: boolean;
  /** Toggle the previous-period companion overlay — writes `familyOptions.comparePrevious`. */
  onComparePrevious: (on: boolean) => void;
  /** The current category ordering (derived from `query.order`). */
  sortValue: SortKey;
  /** The contextual sort choices for this category (time vs label, ± by-value). */
  sortOptions: SortOption[];
  /** Set the category ordering — writes `query.order`. */
  onSort: (key: SortKey) => void;
  /** The current row cap (`query.limit`), if a literal number is set. */
  limit?: number;
  /** Set the top-N row cap — writes `query.limit` (undefined clears it). */
  onLimit: (n: number | undefined) => void;
  onRename: (label: string | undefined) => void;
  onRecolor: (token: ChartColorToken | null) => void;
  onGranularity: (g: Granularity | VarRef | undefined) => void;
  onDateRange: (range: DateRange | VarRef | undefined) => void;
  onRender: (r: ComboRender) => void;
  onAxis: (side: AxisSide) => void;
  onCurve: (c: LineCurve) => void;
  onDots: (on: boolean) => void;
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
  registry: FamilyRegistry,
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

  // Dual value axes (left/right) are renderer-supported for line + VERTICAL bar
  // (SeriesMeta.axis) and combo (ComboSeriesOpt.axis). A horizontal bar has a single
  // value axis → no axis control.
  const isLineY = family === "line" && well.id === "y";
  const isBarY = family === "bar" && well.id === "y" && chart.orientation !== "horizontal";
  // A color split (pivot) can also be dual-axis: each MEASURE owns an axis, stored in the
  // pivot mapping's per-measure meta.
  const isPivotMode = chart.mapping?.series?.mode === "pivot";
  const pivotSeriesMeta =
    chart.mapping?.series?.mode === "pivot" ? chart.mapping.series.meta : undefined;
  const canAxis = ((isLineY || isBarY) && (measuresMode || isPivotMode)) || isComboY;
  const axis: AxisSide | undefined = canAxis
    ? ((isComboY
        ? comboSeries.find((s) => s.member === member)?.axis
        : measuresMode
          ? meta?.axis
          : pivotSeriesMeta?.[member]?.axis) ?? "left")
    : undefined;

  // Per-series line shape + points: line/area measures-mode Y, or a combo line/area series.
  const isLineAreaY = (family === "line" || family === "area") && well.id === "y" && measuresMode;
  const comboLineArea = isComboY && (render === "line" || render === "area");
  const canLineStyle = isLineAreaY || comboLineArea;
  const comboEntry = isComboY ? comboSeries.find((s) => s.member === member) : undefined;
  const curve: LineCurve | undefined = canLineStyle
    ? (isComboY ? comboEntry?.curve : (meta?.curve as LineCurve | undefined))
    : undefined;
  const dots: boolean | undefined = canLineStyle
    ? (isComboY ? comboEntry?.dots : meta?.dots)
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

  const onAxis = (side: AxisSide): void => {
    if (isComboY) patchComboSeries({ axis: side });
    else if (usesSeriesMeta) patchSeriesMeta({ ...meta, axis: side });
    // Pivot (color split): write the per-measure axis straight into the pivot mapping meta.
    else if (chart.mapping?.series?.mode === "pivot") update(withSeriesAxis(spec, family, member, side));
  };

  const onCurve = (c: LineCurve): void => {
    if (isComboY) patchComboSeries({ curve: c });
    else if (usesSeriesMeta) patchSeriesMeta({ ...meta, curve: c });
  };
  const onDots = (on: boolean): void => {
    if (isComboY) patchComboSeries({ dots: on });
    else if (usesSeriesMeta) patchSeriesMeta({ ...meta, dots: on });
  };

  const onRemove = (): void => update(removeField(spec, family, well.id, member, registry));

  /* ── category ordering (sort) + top-N (limit) ─────────────────────────────── */

  // The single category axis: cartesian/combo "x" or pie "slices". Sort + top-N
  // shape the whole query, but read most naturally pinned to this chip.
  const isCategoryField = (well.id === "x" || well.id === "slices") && (kind === "category" || kind === "time");
  // Order by the primary measure (the first one). In pivot mode that's the split value.
  const pivotSeries = chart.mapping?.series;
  const primaryMeasure =
    (pivotSeries && pivotSeries.mode === "pivot" ? pivotSeries.value : measuresOf(chart)[0]) ??
    query.measures?.[0];

  const sortOptions: SortOption[] = isCategoryField
    ? kind === "time"
      ? [
          { key: "none", label: "Default" },
          { key: "time-asc", label: "Oldest first" },
          { key: "time-desc", label: "Newest first" },
          ...(primaryMeasure
            ? ([
                { key: "value-desc", label: "Highest first" },
                { key: "value-asc", label: "Lowest first" },
              ] as SortOption[])
            : []),
        ]
      : [
          { key: "none", label: "Default" },
          ...(primaryMeasure
            ? ([
                { key: "value-desc", label: "Biggest first" },
                { key: "value-asc", label: "Smallest first" },
              ] as SortOption[])
            : []),
          { key: "label-asc", label: "A → Z" },
          { key: "label-desc", label: "Z → A" },
        ]
    : [];

  const sortValue: SortKey = ((): SortKey => {
    const first = orderEntries(query.order)[0];
    if (!first) return "none";
    const [m, dir] = first;
    if (primaryMeasure && m === primaryMeasure) return dir === "desc" ? "value-desc" : "value-asc";
    if (m === member) {
      if (kind === "time") return dir === "desc" ? "time-desc" : "time-asc";
      return dir === "asc" ? "label-asc" : "label-desc";
    }
    return "none";
  })();

  const onSort = (key: SortKey): void => {
    let order: OrderSpec | undefined;
    switch (key) {
      case "none":
        order = undefined;
        break;
      case "value-desc":
        order = primaryMeasure ? [[primaryMeasure, "desc"]] : undefined;
        break;
      case "value-asc":
        order = primaryMeasure ? [[primaryMeasure, "asc"]] : undefined;
        break;
      case "label-asc":
      case "time-asc":
        order = [[member, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        order = [[member, "desc"]];
        break;
    }
    update({ ...spec, query: { ...query, order } });
  };

  const limit = typeof query.limit === "number" ? query.limit : undefined;
  const onLimit = (n: number | undefined): void =>
    update({ ...spec, query: { ...query, limit: n && n > 0 ? n : undefined } });

  /* ── previous-period comparison (on the time chip, for bar/line/area) ─────── */
  const supportsCompare = family === "bar" || family === "line" || family === "area";
  const canComparePrevious = supportsCompare && isTimeField;
  const comparePrevious = canComparePrevious && fo.comparePrevious === true;
  // A previous period needs a current window to offset. Any set range works — a literal
  // preset/[from,to] OR a {var} binding (resolved at render). Only all-time can't compare.
  const comparePreviousReady = canComparePrevious && dateRange !== undefined;
  const onComparePrevious = (on: boolean): void =>
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, comparePrevious: on || undefined } } });

  return {
    kind,
    label,
    colorToken,
    granularity,
    dateRange,
    render,
    axis,
    curve,
    dots,
    canLineStyle,
    canAxis,
    canRename: isComboY || isTableCol || usesSeriesMeta,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: (isCartesianY && measuresMode) || isComboY,
    isTimeField,
    isComboY,
    isCategoryField,
    sortValue,
    sortOptions,
    onSort,
    limit,
    onLimit,
    canComparePrevious,
    comparePrevious,
    comparePreviousReady,
    onComparePrevious,
    onRename,
    onRecolor,
    onGranularity,
    onDateRange,
    onRender,
    onAxis,
    onCurve,
    onDots,
    onRemove,
  };
}

/**
 * Set a Y series' value AXIS (left/right) for a dual-axis family — combo
 * (`ComboSeriesOpt.axis`) or measures-mode cartesian/line (`SeriesMeta.axis`). Pure;
 * used by the overlay to auto-assign a freshly-added measure to an axis by its unit.
 */
export function withSeriesAxis(spec: ChartSpec, family: string, member: string, side: AxisSide): ChartSpec {
  const { chart } = spec;
  if (family === "combo") {
    const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
    const series = (Array.isArray(fo.series) ? fo.series : []).map((s) =>
      (s as ComboSeriesEntry).member === member ? { ...(s as ComboSeriesEntry), axis: side } : s,
    );
    return { ...spec, chart: { ...chart, familyOptions: { ...fo, series } } };
  }
  const s = chart.mapping?.series;
  // Both measures-mode AND pivot-mode (color split) carry a per-member meta map, so a
  // multi-measure color split can assign each MEASURE to its own value axis.
  if (s && (s.mode === "measures" || s.mode === "pivot")) {
    const meta: Record<string, SeriesMeta> = { ...(s.meta ?? {}) };
    meta[member] = { ...(meta[member] ?? {}), axis: side };
    return { ...spec, chart: { ...chart, mapping: { ...chart.mapping!, series: { ...s, meta } } } };
  }
  return spec;
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

  // cartesian Y — reorder measures + the mapping in lockstep (measures-mode members
  // OR pivot-mode values, so multi-measure color splits reorder correctly too).
  const measures = move(query.measures ?? []);
  const series = chart.mapping?.series;
  let mapping = chart.mapping;
  if (series && series.mode === "measures") {
    mapping = { ...chart.mapping!, series: { ...series, members: measures } };
  } else if (series && series.mode === "pivot" && series.values && series.values.length > 1) {
    const values = move(series.values);
    mapping = { ...chart.mapping!, series: { ...series, value: values[0], values } };
  }
  return { ...spec, query: { ...query, measures }, chart: { ...chart, mapping } };
}
