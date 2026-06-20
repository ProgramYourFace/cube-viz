import { z } from "zod";

/**
 * cube-viz spec contract (v1) — the stable, library-agnostic source of truth.
 * zod schemas are authoritative; all TS types are `z.infer`-ed from them, so the
 * runtime guard and the compile-time type can never drift.
 *
 * See docs/01-spec-schema.md for the full rationale.
 */

export const SCHEMA_VERSION = 1 as const;

/* ────────────────────────── variable reference token ────────────────────── */

/** Anywhere a literal value may appear, the spec may instead carry `{ var: "name" }`. */
export const VarRefSchema = z.object({ var: z.string().min(1) }).strict();
export type VarRef = z.infer<typeof VarRefSchema>;

export function isVarRef(v: unknown): v is VarRef {
  return typeof v === "object" && v !== null && "var" in v && typeof (v as VarRef).var === "string";
}

/** `T | VarRef` — a value position that may be bound to a variable. */
const orVar = <T extends z.ZodTypeAny>(s: T) => z.union([s, VarRefSchema]);

/* ────────────────────────────── primitives ──────────────────────────────── */

export const ScalarSchema = z.union([z.string(), z.number(), z.boolean()]);
export type Scalar = z.infer<typeof ScalarSchema>;

export const GranularitySchema = z.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year",
]);
export type Granularity = z.infer<typeof GranularitySchema>;

/** Absolute `[from, to]` pair OR a relative string like "last 30 days" / "This month". */
export const DateRangeSchema = z.union([z.tuple([z.string(), z.string()]), z.string()]);
export type DateRange = z.infer<typeof DateRangeSchema>;

export const VariableValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.tuple([z.string(), z.string()]), // absolute date range
  z.array(z.string()),
  z.array(z.number()),
]);
export type VariableValue = z.infer<typeof VariableValueSchema>;

/** Fully-qualified, dot-namespaced Cube member, e.g. "device_trips.total_distance". */
export const MemberSchema = z.string().min(1);
export type Member = z.infer<typeof MemberSchema>;

/* ──────────────────────────────── query ─────────────────────────────────── */

export const FilterOperatorSchema = z.enum([
  "equals",
  "notEquals",
  "gt",
  "gte",
  "lt",
  "lte",
  "contains",
  "notContains",
  "startsWith",
  "endsWith",
  "set",
  "notSet",
  "inDateRange",
  "notInDateRange",
  "beforeDate",
  "beforeOrOnDate",
  "afterDate",
  "afterOrOnDate",
  "measureFilter",
]);
export type FilterOperator = z.infer<typeof FilterOperatorSchema>;

export const LeafFilterSchema = z
  .object({
    member: MemberSchema,
    operator: FilterOperatorSchema,
    values: z.array(z.union([ScalarSchema, VarRefSchema])).optional(),
  })
  .strict();
export type LeafFilter = z.infer<typeof LeafFilterSchema>;

export type QueryFilter = LeafFilter | { and: QueryFilter[] } | { or: QueryFilter[] };
export const QueryFilterSchema: z.ZodType<QueryFilter> = z.lazy(() =>
  z.union([
    LeafFilterSchema,
    z.object({ and: z.array(QueryFilterSchema) }).strict(),
    z.object({ or: z.array(QueryFilterSchema) }).strict(),
  ]),
);

export const TimeDimensionSchema = z
  .object({
    dimension: MemberSchema,
    granularity: orVar(GranularitySchema).optional(),
    dateRange: orVar(DateRangeSchema).optional(),
    compareDateRange: z.array(DateRangeSchema).optional(),
  })
  .strict();
export type TimeDimension = z.infer<typeof TimeDimensionSchema>;

export const OrderDirSchema = z.enum(["asc", "desc"]);
export const OrderSpecSchema = z.union([
  z.record(MemberSchema, OrderDirSchema),
  z.array(z.tuple([MemberSchema, OrderDirSchema])),
]);
export type OrderSpec = z.infer<typeof OrderSpecSchema>;

export const CubeQuerySchema = z
  .object({
    measures: z.array(MemberSchema).optional(),
    dimensions: z.array(MemberSchema).optional(),
    timeDimensions: z.array(TimeDimensionSchema).optional(),
    filters: z.array(QueryFilterSchema).optional(),
    segments: z.array(MemberSchema).optional(),
    order: OrderSpecSchema.optional(),
    limit: orVar(z.number()).optional(),
    offset: orVar(z.number()).optional(),
    total: z.boolean().optional(),
    timezone: z.string().optional(),
  })
  .strict();
export type CubeQuery = z.infer<typeof CubeQuerySchema>;

/* ───────────────────────────── chart options ────────────────────────────── */

export const ChartFamilySchema = z.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo",
]);
export type ChartFamily = z.infer<typeof ChartFamilySchema>;

export const ChartColorTokenSchema = z.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]);
export type ChartColorToken = z.infer<typeof ChartColorTokenSchema>;

export const FormatKindSchema = z.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto",
]);
export type FormatKind = z.infer<typeof FormatKindSchema>;

export const FormatOptionsSchema = z
  .object({
    kind: FormatKindSchema.optional(),
    decimals: z.number().optional(),
    abbreviate: z.boolean().optional(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
    unitSystem: z.enum(["metric", "imperial"]).optional(),
    dateFormat: z.string().optional(),
  })
  .strict();
export type FormatOptions = z.infer<typeof FormatOptionsSchema>;

export const SeriesMetaSchema = z
  .object({
    label: z.string().optional(),
    colorToken: ChartColorTokenSchema.optional(),
    stackId: z.string().optional(),
    axis: z.enum(["left", "right"]).optional(),
    format: FormatOptionsSchema.optional(),
  })
  .strict();
export type SeriesMeta = z.infer<typeof SeriesMetaSchema>;

export const SeriesMappingSchema = z
  .object({
    category: z.object({ member: MemberSchema }).strict(),
    series: z.union([
      z
        .object({
          mode: z.literal("measures"),
          members: z.array(MemberSchema),
          meta: z.record(MemberSchema, SeriesMetaSchema).optional(),
        })
        .strict(),
      z
        .object({
          mode: z.literal("pivot"),
          value: MemberSchema,
          pivot: MemberSchema,
        })
        .strict(),
    ]),
  })
  .strict();
export type SeriesMapping = z.infer<typeof SeriesMappingSchema>;

export const LegendOptionsSchema = z
  .object({
    show: z.boolean().optional(),
    position: z.enum(["top", "right", "bottom", "left"]).optional(),
  })
  .strict();
export type LegendOptions = z.infer<typeof LegendOptionsSchema>;

export const TooltipOptionsSchema = z
  .object({
    show: z.boolean().optional(),
    indicator: z.enum(["dot", "line", "dashed"]).optional(),
    showTotal: z.boolean().optional(),
  })
  .strict();
export type TooltipOptions = z.infer<typeof TooltipOptionsSchema>;

const AxisBoundSchema = z.union([z.number(), z.literal("auto")]);
export const AxisOptionsSchema = z
  .object({
    label: z.string().optional(),
    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
    labelHide: z.boolean().optional(),
    hide: z.boolean().optional(),
    scale: z.enum(["linear", "log"]).optional(),
    domain: z.tuple([AxisBoundSchema, AxisBoundSchema]).optional(),
    tickFormat: FormatOptionsSchema.optional(),
  })
  .strict();
export type AxisOptions = z.infer<typeof AxisOptionsSchema>;

export const AxesOptionsSchema = z
  .object({
    x: AxisOptionsSchema.optional(),
    y: AxisOptionsSchema.optional(),
    y2: AxisOptionsSchema.optional(),
  })
  .strict();
export type AxesOptions = z.infer<typeof AxesOptionsSchema>;

export const ColorAssignmentSchema = z
  .object({
    byKey: z.record(z.string(), ChartColorTokenSchema).optional(),
    ramp: z.array(ChartColorTokenSchema).optional(),
  })
  .strict();
export type ColorAssignment = z.infer<typeof ColorAssignmentSchema>;

export const ChartOptionsSchema = z
  .object({
    family: ChartFamilySchema,
    /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
        carry their own mapping inside familyOptions, so this is optional at the envelope. */
    mapping: SeriesMappingSchema.optional(),
    orientation: z.enum(["vertical", "horizontal"]).optional(),
    stackMode: z.enum(["none", "stacked", "grouped", "percent"]).optional(),
    legend: LegendOptionsSchema.optional(),
    tooltip: TooltipOptionsSchema.optional(),
    axes: AxesOptionsSchema.optional(),
    colors: ColorAssignmentSchema.optional(),
    format: FormatOptionsSchema.optional(),
    /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
    familyOptions: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();
export type ChartOptions = z.infer<typeof ChartOptionsSchema>;

/* ─────────────────────────────── widgets ────────────────────────────────── */

/** ProseMirror / TipTap document JSON (`editor.getJSON()`). Loosely typed on purpose. */
export const TipTapDocSchema: z.ZodType<{ type: string; content?: unknown[] }> = z
  .object({ type: z.string(), content: z.array(z.unknown()).optional() })
  .passthrough();
export type TipTapDoc = z.infer<typeof TipTapDocSchema>;

export const InputControlKindSchema = z.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle",
]);
export type InputControlKind = z.infer<typeof InputControlKindSchema>;

export const InputControlSchema = z
  .object({
    variable: z.string().min(1),
    control: z.discriminatedUnion("kind", [
      z
        .object({
          kind: z.literal("dateRange"),
          presets: z.array(z.string()).optional(),
          allowFuture: z.boolean().optional(),
        })
        .strict(),
      z
        .object({
          kind: z.literal("granularity"),
          options: z.array(GranularitySchema).optional(),
          /** A dateRange variable whose span narrows the offered granularities. */
          rangeVariable: z.string().optional(),
        })
        .strict(),
      z
        .object({
          kind: z.literal("select"),
          options: z.array(z.object({ value: VariableValueSchema, label: z.string() }).strict()),
          multiple: z.boolean().optional(),
        })
        .strict(),
      z
        .object({
          kind: z.literal("memberSelect"),
          from: z.enum(["dimension", "measure", "dimensionOrMeasure"]),
          cube: z.string().optional(),
        })
        .strict(),
      z.object({ kind: z.literal("text"), placeholder: z.string().optional() }).strict(),
      z
        .object({
          kind: z.literal("number"),
          min: z.number().optional(),
          max: z.number().optional(),
          step: z.number().optional(),
        })
        .strict(),
      z.object({ kind: z.literal("toggle") }).strict(),
    ]),
  })
  .strict();
export type InputControl = z.infer<typeof InputControlSchema>;

const widgetBase = {
  id: z.string().min(1),
  title: z.string().optional(),
};

export const ChartWidgetSchema = z
  .object({ ...widgetBase, type: z.literal("chart"), query: CubeQuerySchema, chart: ChartOptionsSchema })
  .strict();
export type ChartWidget = z.infer<typeof ChartWidgetSchema>;

export const TextWidgetSchema = z
  .object({ ...widgetBase, type: z.literal("text"), doc: TipTapDocSchema })
  .strict();
export type TextWidget = z.infer<typeof TextWidgetSchema>;

export const InputWidgetSchema = z
  .object({ ...widgetBase, type: z.literal("input"), control: InputControlSchema })
  .strict();
export type InputWidget = z.infer<typeof InputWidgetSchema>;

export const WidgetSpecSchema = z.discriminatedUnion("type", [
  ChartWidgetSchema,
  TextWidgetSchema,
  InputWidgetSchema,
]);
export type WidgetSpec = z.infer<typeof WidgetSpecSchema>;

/* ──────────────────────────── dashboard layout ──────────────────────────── */

export const LayoutItemSchema = z
  .object({
    i: z.string(),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    minW: z.number().optional(),
    minH: z.number().optional(),
    static: z.boolean().optional(),
  })
  .strict();
export type LayoutItem = z.infer<typeof LayoutItemSchema>;

export const GridConfigSchema = z
  .object({
    cols: z.number().optional(),
    rowHeight: z.number().optional(),
    margin: z.tuple([z.number(), z.number()]).optional(),
    containerPadding: z.tuple([z.number(), z.number()]).optional(),
  })
  .strict();
export type GridConfig = z.infer<typeof GridConfigSchema>;

export const VariableTypeSchema = z.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure",
]);
export type VariableType = z.infer<typeof VariableTypeSchema>;

export const VariableDeclSchema = z
  .object({
    name: z.string().min(1),
    type: VariableTypeSchema,
    label: z.string().optional(),
    array: z.boolean().optional(),
    default: VariableValueSchema.optional(),
  })
  .strict();
export type VariableDecl = z.infer<typeof VariableDeclSchema>;

/* ────────────────────────────── top-level specs ─────────────────────────── */

const specMeta = {
  schemaVersion: z.literal(SCHEMA_VERSION),
  id: z.string().min(1),
  name: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
};

export const ChartSpecSchema = z
  .object({ ...specMeta, kind: z.literal("chart"), query: CubeQuerySchema, chart: ChartOptionsSchema })
  .strict();
export type ChartSpec = z.infer<typeof ChartSpecSchema>;

export const DashboardSpecSchema = z
  .object({
    ...specMeta,
    kind: z.literal("dashboard"),
    variables: z.array(VariableDeclSchema),
    widgets: z.array(WidgetSpecSchema),
    layout: z.array(LayoutItemSchema),
    grid: GridConfigSchema.optional(),
  })
  .strict();
export type DashboardSpec = z.infer<typeof DashboardSpecSchema>;

export const SpecSchema = z.discriminatedUnion("kind", [ChartSpecSchema, DashboardSpecSchema]);
export type Spec = z.infer<typeof SpecSchema>;
