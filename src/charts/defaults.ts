import { z } from "zod";

import {
  ChartColorTokenSchema,
  FormatOptionsSchema,
  MemberSchema,
  type ChartFamily,
  type ChartOptions,
} from "@/spec";

/**
 * Per-family option DEFAULTS, the `familyOptions` zod schemas, and the
 * default-merge (`resolveOptions`). See docs/02-chart-options.md §4.
 *
 * Two rules the doc nails down:
 *  - Defaults are TOTAL: a `{}` familyOptions still renders a sensible chart.
 *  - Deep-merge merges objects recursively but REPLACES arrays wholesale
 *    (`referenceLines`/`columns`/`series` are predictable, never element-merged).
 */

/* ─────────────────────── shared familyOptions sub-schemas ────────────────── */

/** A reference line on the x or y axis (bar/line/area/scatter/combo). */
export const ReferenceLineOptSchema = z
  .object({
    axis: z.enum(["x", "y"]),
    value: z.number(),
    label: z.string().optional(),
    colorToken: ChartColorTokenSchema.optional(),
  })
  .strict();
export type ReferenceLineOpt = z.infer<typeof ReferenceLineOptSchema>;

/* ─────────────────────────── per-family schemas ──────────────────────────── */

export const BarFamilyOptionsSchema = z
  .object({
    barRadius: z.number().optional(),
    barCategoryGap: z.union([z.number(), z.string()]).optional(),
    barGap: z.union([z.number(), z.string()]).optional(),
    maxBarSize: z.number().optional(),
    showValueLabels: z.boolean().optional(),
    referenceLines: z.array(ReferenceLineOptSchema).optional(),
  })
  .strict();
export type BarFamilyOptions = z.infer<typeof BarFamilyOptionsSchema>;

const CurveSchema = z.enum(["linear", "monotone", "step", "natural"]);

export const LineFamilyOptionsSchema = z
  .object({
    curve: CurveSchema.optional(),
    strokeWidth: z.number().optional(),
    dots: z.union([z.boolean(), z.literal("active")]).optional(),
    connectNulls: z.boolean().optional(),
    showArea: z.boolean().optional(),
    chrome: z.enum(["full", "none"]).optional(),
    referenceLines: z.array(ReferenceLineOptSchema).optional(),
    showValueLabels: z.boolean().optional(),
  })
  .strict();
export type LineFamilyOptions = z.infer<typeof LineFamilyOptionsSchema>;

export const AreaFamilyOptionsSchema = z
  .object({
    curve: CurveSchema.optional(),
    fillOpacity: z.number().optional(),
    strokeWidth: z.number().optional(),
    connectNulls: z.boolean().optional(),
    dots: z.boolean().optional(),
    referenceLines: z.array(ReferenceLineOptSchema).optional(),
  })
  .strict();
export type AreaFamilyOptions = z.infer<typeof AreaFamilyOptionsSchema>;

export const PieFamilyOptionsSchema = z
  .object({
    innerRadiusPct: z.number().optional(),
    outerRadiusPct: z.number().optional(),
    padAngle: z.number().optional(),
    cornerRadius: z.number().optional(),
    showLabels: z.enum(["none", "value", "percent", "name"]).optional(),
    centerLabel: z
      .object({ value: z.string().optional(), label: z.string().optional() })
      .strict()
      .optional(),
    maxSlices: z.number().optional(),
  })
  .strict();
export type PieFamilyOptions = z.infer<typeof PieFamilyOptionsSchema>;

export const ScatterFamilyOptionsSchema = z
  .object({
    x: MemberSchema,
    y: MemberSchema,
    size: MemberSchema.optional(),
    sizeRange: z.tuple([z.number(), z.number()]).optional(),
    groupBy: MemberSchema.optional(),
    shape: z.enum(["circle", "square", "triangle", "diamond"]).optional(),
    referenceLines: z.array(ReferenceLineOptSchema).optional(),
  })
  .strict();
export type ScatterFamilyOptions = z.infer<typeof ScatterFamilyOptionsSchema>;

export const KpiFamilyOptionsSchema = z
  .object({
    display: z.enum(["number", "gauge"]).optional(),
    measure: MemberSchema,
    comparison: z
      .object({
        mode: z.enum(["previousPeriod", "value"]),
        value: z.union([MemberSchema, z.number()]).optional(),
        showAsPercent: z.boolean().optional(),
        goodDirection: z.enum(["up", "down"]).optional(),
      })
      .strict()
      .optional(),
    sparkline: z
      .object({ member: MemberSchema, timeDimension: MemberSchema })
      .strict()
      .optional(),
    gauge: z
      .object({
        min: z.number().optional(),
        max: z.number(),
        thresholds: z
          .array(z.object({ at: z.number(), colorToken: ChartColorTokenSchema }).strict())
          .optional(),
      })
      .strict()
      .optional(),
    icon: z.string().optional(),
  })
  .strict();
export type KpiFamilyOptions = z.infer<typeof KpiFamilyOptionsSchema>;

export const TableColumnOptSchema = z
  .object({
    member: MemberSchema,
    label: z.string().optional(),
    format: FormatOptionsSchema.optional(),
    align: z.enum(["left", "right", "center"]).optional(),
    width: z.number().optional(),
    hidden: z.boolean().optional(),
  })
  .strict();
export type TableColumnOpt = z.infer<typeof TableColumnOptSchema>;

export const CondFormatRuleSchema = z
  .object({
    member: MemberSchema,
    when: z
      .object({
        op: z.enum(["gt", "lt", "gte", "lte", "eq"]),
        value: z.number(),
      })
      .strict(),
    colorToken: ChartColorTokenSchema.optional(),
  })
  .strict();
export type CondFormatRule = z.infer<typeof CondFormatRuleSchema>;

export const TableFamilyOptionsSchema = z
  .object({
    columns: z.array(TableColumnOptSchema).optional(),
    pageSize: z.number().optional(),
    sortable: z.boolean().optional(),
    stickyHeader: z.boolean().optional(),
    rowHeight: z.enum(["compact", "default"]).optional(),
    showRowNumbers: z.boolean().optional(),
    conditionalFormat: z.array(CondFormatRuleSchema).optional(),
  })
  .strict();
export type TableFamilyOptions = z.infer<typeof TableFamilyOptionsSchema>;

export const ComboSeriesOptSchema = z
  .object({
    member: MemberSchema,
    render: z.enum(["bar", "line", "area"]),
    axis: z.enum(["left", "right"]).optional(),
    colorToken: ChartColorTokenSchema.optional(),
    stackId: z.string().optional(),
    curve: z.enum(["linear", "monotone", "step"]).optional(),
    label: z.string().optional(),
  })
  .strict();
export type ComboSeriesOpt = z.infer<typeof ComboSeriesOptSchema>;

export const ComboFamilyOptionsSchema = z
  .object({
    series: z.array(ComboSeriesOptSchema),
    referenceLines: z.array(ReferenceLineOptSchema).optional(),
  })
  .strict();
export type ComboFamilyOptions = z.infer<typeof ComboFamilyOptionsSchema>;

/** Map a family to its `familyOptions` zod schema (validated AFTER default-merge). */
const FAMILY_OPTION_SCHEMAS = {
  bar: BarFamilyOptionsSchema,
  line: LineFamilyOptionsSchema,
  area: AreaFamilyOptionsSchema,
  pie: PieFamilyOptionsSchema,
  scatter: ScatterFamilyOptionsSchema,
  kpi: KpiFamilyOptionsSchema,
  table: TableFamilyOptionsSchema,
  combo: ComboFamilyOptionsSchema,
} as const satisfies Record<ChartFamily, z.ZodTypeAny>;

/** Accessor: the zod schema validating a family's `familyOptions`. */
export function familyOptionsSchema(family: ChartFamily): z.ZodTypeAny {
  return FAMILY_OPTION_SCHEMAS[family];
}

/* ──────────────────────────────── defaults ───────────────────────────────── */

/** A family default = an envelope slice + a complete familyOptions object. */
export interface FamilyDefault {
  envelope: Partial<ChartOptions>;
  familyOptions: Record<string, unknown>;
}

/**
 * Total defaults per family (docs/02-chart-options.md §4). Stored specs carry
 * only overrides, deep-merged over these. Rationale per family is in the doc.
 */
export const DEFAULTS: Record<ChartFamily, FamilyDefault> = {
  bar: {
    envelope: {
      orientation: "vertical",
      stackMode: "none",
      legend: { show: true, position: "bottom" },
      tooltip: { show: true, indicator: "dot" },
      format: { kind: "auto" },
    },
    familyOptions: {
      barRadius: 4,
      maxBarSize: 64,
      showValueLabels: false,
    } satisfies BarFamilyOptions,
  },
  line: {
    envelope: {
      legend: { show: true, position: "bottom" },
      tooltip: { show: true, indicator: "line" },
      format: { kind: "auto" },
    },
    familyOptions: {
      curve: "monotone",
      strokeWidth: 2,
      dots: "active",
      connectNulls: false,
      chrome: "full",
    } satisfies LineFamilyOptions,
  },
  area: {
    envelope: {
      stackMode: "stacked",
      legend: { show: true, position: "bottom" },
      tooltip: { show: true, indicator: "dot" },
      format: { kind: "auto" },
    },
    familyOptions: {
      curve: "monotone",
      fillOpacity: 0.4,
      strokeWidth: 2,
      connectNulls: false,
    } satisfies AreaFamilyOptions,
  },
  pie: {
    envelope: {
      legend: { show: true, position: "right" },
      tooltip: { show: true, indicator: "dot" },
      format: { kind: "auto" },
    },
    familyOptions: {
      innerRadiusPct: 0,
      outerRadiusPct: 80,
      showLabels: "percent",
      maxSlices: 8,
    } satisfies PieFamilyOptions,
  },
  scatter: {
    envelope: {
      legend: { show: true, position: "bottom" },
      tooltip: { show: true, indicator: "dot" },
      format: { kind: "auto" },
    },
    // x/y are required from the spec, so they are absent from the default skeleton.
    familyOptions: {
      shape: "circle",
      sizeRange: [40, 400],
    } as Record<string, unknown>,
  },
  kpi: {
    envelope: { format: { kind: "auto" } },
    // measure is required from the spec.
    familyOptions: { display: "number" } as Record<string, unknown>,
  },
  table: {
    envelope: {},
    familyOptions: {
      pageSize: 25,
      sortable: true,
      stickyHeader: true,
      rowHeight: "default",
    } satisfies TableFamilyOptions,
  },
  combo: {
    envelope: {
      legend: { show: true, position: "bottom" },
      tooltip: { show: true, indicator: "dot" },
      format: { kind: "auto" },
    },
    // series is required from the spec; an empty combo renders the empty state.
    familyOptions: { series: [] } satisfies ComboFamilyOptions,
  },
};

/* ──────────────────────────────── merge ──────────────────────────────────── */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Deep-merge `override` over `base`: objects recurse, **arrays replace wholesale**,
 * scalars/undefined-aware (an explicit `undefined` does not clobber a base value).
 */
export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) {
    // Arrays + scalars: the override wins outright (arrays are never element-merged).
    return override as T;
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const ov = override[key];
    if (ov === undefined) continue;
    out[key] = key in base ? deepMerge(base[key], ov) : ov;
  }
  return out as T;
}

/**
 * Resolve a chart's options: deep-merge the family's envelope defaults under the
 * spec's envelope, and the family's familyOptions defaults under the spec's
 * familyOptions. Arrays (referenceLines/columns/series) are replaced, not merged.
 */
export function resolveOptions(options: ChartOptions): ChartOptions {
  const d = DEFAULTS[options.family];
  const merged = deepMerge<ChartOptions>({ ...(d.envelope as ChartOptions) }, options);
  return {
    ...merged,
    familyOptions: deepMerge(
      { ...d.familyOptions },
      options.familyOptions ?? {},
    ) as Record<string, unknown>,
  };
}
