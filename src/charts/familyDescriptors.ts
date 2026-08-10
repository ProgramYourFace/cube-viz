import {
  AreaChart,
  BarChart3,
  Gauge,
  Grid3X3,
  LineChart,
  PieChart,
  ScatterChart,
  Table,
  type LucideIcon,
} from "lucide-react";
import type * as React from "react";
import type { z } from "zod";

import type { BuiltinChartFamily, ChartFamily, ChartSpec } from "@/spec";
// Type-only import — keeps this registry a runtime leaf w.r.t. the editor (so
// `wells.ts` can read its well shapes from here without a module cycle).
import type { WellDef, FieldKind } from "@/editor/chart/builder/wells";

import type { ChartComponent } from "./types";
import type { FamilyDefault } from "./defaults";
import {
  BUILTIN_DEFAULTS,
  BUILTIN_FAMILY_OPTION_SCHEMAS,
} from "./defaults";
import { BarChartFamily } from "./bar";
import { LineChartFamily } from "./line";
import { AreaChartFamily } from "./area";
import { PieChartFamily } from "./pie";
import { ScatterChartFamily } from "./scatter";
import { HeatmapChartFamily } from "./heatmap";
import { KpiFamily } from "./kpi";
import { TableFamily } from "./table";

/**
 * The SINGLE SOURCE OF TRUTH for per-chart-family behaviour.
 *
 * Before this registry, each family's identity was smeared across ~10 scattered
 * tables/switches/Sets (icon + label in the picker, component in the dispatcher,
 * option schema + defaults in `defaults.ts`, wells + zones + legend in
 * the editor overlay, customize-options Set, mapping/cartesian/measure-only/compare
 * booleans, axis-enforcement). A {@link ChartFamilyDescriptor} centralizes all of
 * that DATA + dispatch so adding a family later is "write one descriptor (+ its
 * procedural field writers)" rather than editing every table.
 *
 * What is INTENTIONALLY NOT absorbed (Phase 1): the procedural per-family bodies —
 * `placeField`/`removeField` impls (`wells.ts`), `migrateToFamily`, the
 * `CustomizeSection` per-family control JSX, the chip-binding patch writers, and
 * `readWells`. Those READ descriptor flags but their bodies stay; the DATA/dispatch
 * is what centralizes here.
 */
export interface ChartFamilyDescriptor {
  /** The family key (the discriminator). */
  family: ChartFamily;
  /** Human label (the type picker tiles + the chart-type pill). */
  label: string;
  /** The picker tile / pill icon. */
  icon: LucideIcon;
  /** UI ordering in the type picker grid (ascending). */
  order: number;

  /** The family component (overridable per-slot via the {@link ComponentRegistry}). */
  component: ChartComponent;
  /** The zod schema validating this family's `familyOptions` (after default-merge). */
  optionsSchema: z.ZodTypeAny;
  /** Total defaults (envelope slice + familyOptions) for this family. */
  defaults: FamilyDefault;

  /** The typed wells (top→bottom), as the editor's pure shape. */
  wells: WellDef[];
  /** Which wells anchor LEFT (value axis) vs BOTTOM (category + splits) in the overlay. */
  zones: { left: string[]; bottom: string[] };

  /** Consumes the generic `mapping` envelope (vs. storing fields in `familyOptions`). */
  supportsMapping: boolean;
  /** Exposes the cross-family display envelope (orientation/stack/axes). */
  supportsCartesianAxes: boolean;
  /** Enforces per-axis unit consistency on the multi-number value ("y") well. */
  enforcesAxisUnit: boolean;
  /** Still renders from a measure-only (category-less) query (mapping families). */
  measureOnly: boolean;
  /** Has a chart legend (everything except kpi/table). */
  hasLegend: boolean;
  /** Shows a type-level "Options" section in the chart-type picker. */
  hasCustomizeOptions: boolean;
  /** Supports previous-period comparison (bar/line/area series, kpi row). */
  supportsComparePrevious: boolean;
  /**
   * HOW the previous-period result merges into render data, when supported:
   *  - "series": one muted/dashed companion series per current series (bar/line/area).
   *  - "kpiRow": the prior aggregate appended as a second row (kpi delta).
   * `undefined` ⇔ `supportsComparePrevious === false`.
   */
  comparePreviousMode?: "series" | "kpiRow";

  /** Editor left-strip width class — KPI needs a wider strip for its config blocks. */
  sidebarWidthClass: string;

  /**
   * QUERY-LESS family: renders from its own state, NOT a Cube query. When true the
   * renderer skips the data fetch entirely and the loading/error/empty chrome, handing
   * the family component an empty dataset — so a host family that draws its own content
   * (e.g. an AI summary tile keyed by familyOptions) works even with NO `widget.query`.
   * Builtins leave this unset (false). A query-less family has no wells/zones.
   */
  queryless?: boolean;

  /**
   * Whether the editor's live preview requires a measure before it renders. When unset,
   * the editor falls back to "everything except `table` needs a measure" (the historical
   * builtin rule). A measure-LESS family (a points-mode host `map`, or a query-less `ai`
   * tile) sets this `false` so the preview renders instead of showing a misleading
   * "Add a value (measure)" hint. Query-less families are treated as measure-less
   * regardless of this flag.
   */
  requiresMeasure?: boolean;

  /**
   * A well id the editor AUTO-FILLS with the cube's canonical time dimension (member
   * meta `canonicalTime: true`) when a field is placed and this well is still empty —
   * so time-oriented families come up chronological without the user picking "the"
   * time axis. Builtins: `line`/`area` → `"x"`; `bar` deliberately unset (its
   * default axis is categorical). A host family points this at its own time well
   * (e.g. the map's `"time"` path-order well). The auto-fill is a plain placement —
   * one tap removes it.
   */
  canonicalTimeWell?: string;

  /* ───────── host-extensibility hooks (OPTIONAL; builtins leave these unset) ─────────
   *
   * A HOST-registered family is self-contained: it supplies its own field-placement
   * logic and customize UI here, so the editor never needs a builtin `switch` arm for
   * it. Builtin families leave these undefined and keep their procedural bodies in
   * `wells.ts` / `CustomizeSection.tsx`; the editor dispatches to the descriptor hook
   * when present, else falls back to the builtin switch. */

  /** The type-level "Options" panel for this family (rendered in the type picker). */
  Customize?: React.ComponentType<{ spec: ChartSpec; update: (next: ChartSpec) => void }>;
  /** Place `member` (of `kind`) into well `wellId`, returning a FULL next spec. */
  placeField?: (spec: ChartSpec, wellId: string, member: string, kind: FieldKind) => ChartSpec;
  /** Remove `member` from well `wellId`, returning a FULL next spec. */
  removeField?: (spec: ChartSpec, wellId: string, member: string) => ChartSpec;
  /** Derive each well's current member name(s) from the spec (inverse of place/remove). */
  readWells?: (spec: ChartSpec) => Record<string, string[]>;
}

/* ─────────────────────────── per-family icons + order ─────────────────────── */
//
// The label/icon/order were previously inlined in CenterTypePicker + helpers; the
// descriptor is now the home and those modules re-derive their maps from here.

const SIDEBAR_DEFAULT = "cv-sidebar--default";
const SIDEBAR_WIDE = "cv-sidebar--wide";

/* ─────────────────────────── per-family well sets ─────────────────────────── */
//
// The typed wells (top→bottom) — the editor's PURE shape, reading nothing from the
// spec. These were previously the `getWells()` switch in `wells.ts`; the descriptor
// is now their home and `getWells()` reads them back from here.

const X_AXIS_HINT = "a date or category";

const CARTESIAN_WELLS: WellDef[] = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: X_AXIS_HINT, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: true,
  },
];

const HEATMAP_WELLS: WellDef[] = [
  { id: "value", label: "Value", hint: "the number that colors each cell", cardinality: "one", kinds: ["number"] },
  { id: "hy", label: "Rows", hint: "a category (one row each)", cardinality: "one", kinds: ["category"] },
  { id: "hx", label: "Columns", hint: X_AXIS_HINT, cardinality: "one", kinds: ["time", "category"] },
];

const PIE_WELLS: WellDef[] = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] },
];

const SCATTER_WELLS: WellDef[] = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: true },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: true },
];

const KPI_WELLS: WellDef[] = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] },
];

const TABLE_WELLS: WellDef[] = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"],
  },
];

/**
 * The builtin family → descriptor table. The ORDER of the keys here is the picker's
 * `order` (assigned below), matching the original `FAMILY_ORDER`. `map` REMOVED — it
 * moved to the host app and is now provided via `<CubeVizProvider families={[...]}>`.
 * The ordered builtin array + per-family named exports live in `./familyRegistry`
 * (which imports this record), keeping this module a pure data leaf.
 */
const ORDER: BuiltinChartFamily[] = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"];
const orderOf = (family: BuiltinChartFamily): number => ORDER.indexOf(family);

export const builtinFamilyDescriptors: Record<BuiltinChartFamily, ChartFamilyDescriptor> = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: BarChart3,
    order: orderOf("bar"),
    component: BarChartFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.bar,
    defaults: BUILTIN_DEFAULTS.bar,
    wells: CARTESIAN_WELLS,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: true,
    supportsCartesianAxes: true,
    enforcesAxisUnit: true,
    measureOnly: true,
    hasLegend: true,
    hasCustomizeOptions: true,
    supportsComparePrevious: true,
    comparePreviousMode: "series",
    sidebarWidthClass: SIDEBAR_DEFAULT,
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: LineChart,
    order: orderOf("line"),
    component: LineChartFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.line,
    defaults: BUILTIN_DEFAULTS.line,
    wells: CARTESIAN_WELLS,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: true,
    supportsCartesianAxes: true,
    enforcesAxisUnit: true,
    measureOnly: true,
    hasLegend: true,
    hasCustomizeOptions: false,
    supportsComparePrevious: true,
    comparePreviousMode: "series",
    sidebarWidthClass: SIDEBAR_DEFAULT,
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: AreaChart,
    order: orderOf("area"),
    component: AreaChartFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.area,
    defaults: BUILTIN_DEFAULTS.area,
    wells: CARTESIAN_WELLS,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: true,
    supportsCartesianAxes: true,
    enforcesAxisUnit: true,
    measureOnly: true,
    hasLegend: true,
    hasCustomizeOptions: true,
    supportsComparePrevious: true,
    comparePreviousMode: "series",
    sidebarWidthClass: SIDEBAR_DEFAULT,
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: PieChart,
    order: orderOf("pie"),
    component: PieChartFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.pie,
    defaults: BUILTIN_DEFAULTS.pie,
    wells: PIE_WELLS,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: true,
    supportsCartesianAxes: false,
    enforcesAxisUnit: false,
    measureOnly: true,
    hasLegend: true,
    hasCustomizeOptions: true,
    supportsComparePrevious: false,
    sidebarWidthClass: SIDEBAR_DEFAULT,
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: ScatterChart,
    order: orderOf("scatter"),
    component: ScatterChartFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.scatter,
    defaults: BUILTIN_DEFAULTS.scatter,
    wells: SCATTER_WELLS,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: false,
    supportsCartesianAxes: false,
    enforcesAxisUnit: false,
    measureOnly: false,
    hasLegend: true,
    hasCustomizeOptions: false,
    supportsComparePrevious: false,
    sidebarWidthClass: SIDEBAR_DEFAULT,
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Gauge,
    order: orderOf("kpi"),
    component: KpiFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.kpi,
    defaults: BUILTIN_DEFAULTS.kpi,
    wells: KPI_WELLS,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: false,
    supportsCartesianAxes: false,
    enforcesAxisUnit: false,
    measureOnly: false,
    hasLegend: false,
    hasCustomizeOptions: false,
    supportsComparePrevious: true,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: SIDEBAR_WIDE,
  },
  table: {
    family: "table",
    label: "Table",
    icon: Table,
    order: orderOf("table"),
    component: TableFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.table,
    defaults: BUILTIN_DEFAULTS.table,
    wells: TABLE_WELLS,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: false,
    supportsCartesianAxes: false,
    enforcesAxisUnit: false,
    measureOnly: false,
    hasLegend: false,
    hasCustomizeOptions: true,
    supportsComparePrevious: false,
    sidebarWidthClass: SIDEBAR_DEFAULT,
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: Grid3X3,
    order: orderOf("heatmap"),
    component: HeatmapChartFamily,
    optionsSchema: BUILTIN_FAMILY_OPTION_SCHEMAS.heatmap,
    defaults: BUILTIN_DEFAULTS.heatmap,
    wells: HEATMAP_WELLS,
    zones: { left: ["value", "hy"], bottom: ["hx"] },
    // Roles live in the generic mapping envelope: category = x, pivot = y, value = measure.
    supportsMapping: true,
    // No cartesian display envelope: both axes are band (category) axes and color is the
    // value — orientation/stacking/axis-scale options don't apply, so the editor shows no
    // axis chrome for the heatmap (coherent with pie/scatter).
    supportsCartesianAxes: false,
    enforcesAxisUnit: false, // single measure — nothing to keep consistent
    measureOnly: false,
    hasLegend: false, // the color ramp IS the value encoding; no series legend
    hasCustomizeOptions: true, // the "Show values" toggle
    supportsComparePrevious: false,
    requiresMeasure: true,
    sidebarWidthClass: SIDEBAR_DEFAULT,
  },
};
