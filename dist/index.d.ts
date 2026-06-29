import { Context } from 'react';
import { Cube } from '@cubejs-client/core';
import { CubeApi } from '@cubejs-client/core';
import { Layout } from 'react-grid-layout';
import { LucideIcon } from 'lucide-react';
import { Meta } from '@cubejs-client/core';
import * as React_2 from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { ResultSet } from '@cubejs-client/core';
import { z } from 'zod';

/** Subset of Cube's annotation we rely on for labels + formatting. */
export declare interface AnnotatedMember {
    title?: string;
    shortTitle?: string;
    type?: string;
    /** Cube's `format` annotation (e.g. "currency", "percent") — refines auto formatting. */
    format?: string;
    meta?: {
        unit?: string;
        quantity?: string;
        convert?: boolean;
    } & Record<string, unknown>;
}

/** A ResultSet with the handful of methods we use, loosely typed. */
declare type AnyResultSet = ResultSet<Record<string, unknown>>;

/** A dashboard spec with a widget (+ its layout item) appended. Pure. */
export declare function appendWidget(spec: DashboardSpec, widget: WidgetSpec, cols?: number): DashboardSpec;

/**
 * `area` — absorbs Area/StackedArea/AreaPercent (docs/02-chart-options.md §2.3).
 * `stackMode` is the load-bearing input: none = overlapping areas, stacked =
 * shared stackId, percent = stackId + stackOffset="expand". orientation ignored.
 */
export declare function AreaChartFamily({ data, options, config, format, editing, }: ChartComponentProps): React_2.ReactElement;

export declare const areaChartFamily: ChartFamilyDescriptor;

export declare type AreaFamilyOptions = z.infer<typeof AreaFamilyOptionsSchema>;

export declare const AreaFamilyOptionsSchema: z.ZodObject<{
    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
    fillOpacity: z.ZodOptional<z.ZodNumber>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    connectNulls: z.ZodOptional<z.ZodBoolean>;
    dots: z.ZodOptional<z.ZodBoolean>;
    referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        axis: z.ZodEnum<["x", "y"]>;
        value: z.ZodNumber;
        side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
        label: z.ZodOptional<z.ZodString>;
        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    }, "strict", z.ZodTypeAny, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }>, "many">>;
    comparePrevious: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
    fillOpacity?: number | undefined;
    strokeWidth?: number | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    comparePrevious?: boolean | undefined;
    connectNulls?: boolean | undefined;
}, {
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
    fillOpacity?: number | undefined;
    strokeWidth?: number | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    comparePrevious?: boolean | undefined;
    connectNulls?: boolean | undefined;
}>;

/**
 * Assign a `colorToken` to each series via {@link resolveSeriesColors}. Mutates and
 * returns the same array for ergonomic chaining.
 */
export declare function assignColors(series: NormalizedSeries[], colors?: ChartOptions["colors"]): NormalizedSeries[];

export declare type AxesOptions = z.infer<typeof AxesOptionsSchema>;

export declare const AxesOptionsSchema: z.ZodObject<{
    x: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
        labelHide: z.ZodOptional<z.ZodBoolean>;
        hide: z.ZodOptional<z.ZodBoolean>;
        scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
        domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
        tickFormat: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    }, {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    }>>;
    y: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
        labelHide: z.ZodOptional<z.ZodBoolean>;
        hide: z.ZodOptional<z.ZodBoolean>;
        scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
        domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
        tickFormat: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    }, {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    }>>;
    y2: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
        labelHide: z.ZodOptional<z.ZodBoolean>;
        hide: z.ZodOptional<z.ZodBoolean>;
        scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
        domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
        tickFormat: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    }, {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    x?: {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    } | undefined;
    y?: {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    } | undefined;
    y2?: {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    x?: {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    } | undefined;
    y?: {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    } | undefined;
    y2?: {
        label?: string | undefined;
        labelHide?: boolean | undefined;
        hide?: boolean | undefined;
        scale?: "linear" | "log" | undefined;
        domain?: [number | "auto", number | "auto"] | undefined;
        tickFormat?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
    } | undefined;
}>;

/**
 * The per-axis COMPATIBILITY key for a member. Two members may share a value-axis
 * IFF their `axisKey`s are equal, so an axis is always consistent in units.
 *
 * Priority: `meta.quantity` (the semantic kind — distance, time, fuelEfficiency…),
 * then `unit:<unit>` when only a raw unit is declared, else `"number"` (a bare
 * number — bare numbers are mutually compatible). So distance↔distance and
 * count↔count are allowed; distance↔duration and distance↔count are BLOCKED.
 */
export declare function axisKey(meta: MemberMeta | undefined): string;

export declare type AxisOptions = z.infer<typeof AxisOptionsSchema>;

export declare const AxisOptionsSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
    labelHide: z.ZodOptional<z.ZodBoolean>;
    hide: z.ZodOptional<z.ZodBoolean>;
    scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
    domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
    tickFormat: z.ZodOptional<z.ZodObject<{
        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
        decimals: z.ZodOptional<z.ZodNumber>;
        abbreviate: z.ZodOptional<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodString>;
        suffix: z.ZodOptional<z.ZodString>;
        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
        dateFormat: z.ZodOptional<z.ZodString>;
        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
        currency: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    label?: string | undefined;
    labelHide?: boolean | undefined;
    hide?: boolean | undefined;
    scale?: "linear" | "log" | undefined;
    domain?: [number | "auto", number | "auto"] | undefined;
    tickFormat?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
}, {
    label?: string | undefined;
    labelHide?: boolean | undefined;
    hide?: boolean | undefined;
    scale?: "linear" | "log" | undefined;
    domain?: [number | "auto", number | "auto"] | undefined;
    tickFormat?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
}>;

/**
 * `bar` — absorbs all six Embeddable Bar Pros via `orientation` × `stackMode`
 * (docs/02-chart-options.md §2.1). orientation→layout, stackMode→stackId/
 * stackOffset are translated HERE; the spec never carries a Recharts prop.
 */
export declare function BarChartFamily({ data, options, config, format, editing, }: ChartComponentProps): React_2.ReactElement;

/**
 * The chart-family registry — an IMMUTABLE value (no module-mutable state). A
 * {@link FamilyRegistry} is built ONCE by {@link buildFamilyRegistry} (seeded by the
 * ordered builtins, then host families augment/override by `descriptor.family`), and
 * carried through React context (see {@link import("@/provider").CubeVizProvider}). A
 * host extends families declaratively via `<CubeVizProvider families={[...]}>` — there
 * is no module-global `Map` and no imperative `registerChartFamily` anymore.
 *
 * Cycle discipline: this module imports the builtin DATA (`familyDescriptors`,
 * `defaults`) but those leaves NEVER import back here. The per-family named exports +
 * `defaultChartFamilies` are declared HERE (this module already imports the builtin
 * record), keeping `familyDescriptors.ts` a pure data leaf.
 */
export declare const barChartFamily: ChartFamilyDescriptor;

export declare type BarFamilyOptions = z.infer<typeof BarFamilyOptionsSchema>;

export declare const BarFamilyOptionsSchema: z.ZodObject<{
    barRadius: z.ZodOptional<z.ZodNumber>;
    barCategoryGap: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    barGap: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    maxBarSize: z.ZodOptional<z.ZodNumber>;
    showValueLabels: z.ZodOptional<z.ZodBoolean>;
    referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        axis: z.ZodEnum<["x", "y"]>;
        value: z.ZodNumber;
        side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
        label: z.ZodOptional<z.ZodString>;
        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    }, "strict", z.ZodTypeAny, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }>, "many">>;
    comparePrevious: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    barRadius?: number | undefined;
    barCategoryGap?: string | number | undefined;
    barGap?: string | number | undefined;
    maxBarSize?: number | undefined;
    showValueLabels?: boolean | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    comparePrevious?: boolean | undefined;
}, {
    barRadius?: number | undefined;
    barCategoryGap?: string | number | undefined;
    barGap?: string | number | undefined;
    maxBarSize?: number | undefined;
    showValueLabels?: boolean | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    comparePrevious?: boolean | undefined;
}>;

export declare interface BridgeError {
    code: "LOAD_FAILED" | "NO_CONNECTION" | "CUBE_ERROR" | "VALIDATION_ERROR" | "PROTOCOL_MISMATCH" | "UNKNOWN";
    message: string;
    fatal: boolean;
    detail?: unknown;
}

/**
 * Build an immutable {@link FamilyRegistry}. Seeds `defaults` in order, then `host`
 * augments/overrides by `descriptor.family` key (host wins — a host family reusing a
 * builtin key replaces it wholesale). Builds a frozen `ReadonlyMap` once; pure, no
 * module state. The order-sorted list + family-keys array are computed ONCE here
 * (closure cache), so `list()`/`families()` never re-sort per call.
 */
export declare function buildFamilyRegistry(defaults: readonly ChartFamilyDescriptor[], host?: readonly ChartFamilyDescriptor[]): FamilyRegistry;

/** The families cube-viz ships in-box (the picker order). `map` REMOVED. */
export declare const BUILTIN_CHART_FAMILIES: readonly ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo"];

/**
 * Total defaults per family (docs/02-chart-options.md §4). Stored specs carry
 * only overrides, deep-merged over these. Rationale per family is in the doc.
 */
export declare const BUILTIN_DEFAULTS: {
    bar: {
        envelope: {
            orientation: "vertical";
            stackMode: "none";
            legend: {
                show: true;
                position: "bottom";
            };
            tooltip: {
                show: true;
                indicator: "dot";
            };
            format: {
                kind: "auto";
            };
        };
        familyOptions: {
            barRadius: number;
            maxBarSize: number;
            showValueLabels: false;
        };
    };
    line: {
        envelope: {
            legend: {
                show: true;
                position: "bottom";
            };
            tooltip: {
                show: true;
                indicator: "line";
            };
            format: {
                kind: "auto";
            };
        };
        familyOptions: {
            curve: "monotone";
            strokeWidth: number;
            dots: "active";
            connectNulls: false;
            chrome: "full";
        };
    };
    area: {
        envelope: {
            legend: {
                show: true;
                position: "bottom";
            };
            tooltip: {
                show: true;
                indicator: "dot";
            };
            format: {
                kind: "auto";
            };
        };
        familyOptions: {
            curve: "monotone";
            fillOpacity: number;
            strokeWidth: number;
            connectNulls: false;
        };
    };
    pie: {
        envelope: {
            legend: {
                show: true;
                position: "right";
            };
            tooltip: {
                show: true;
                indicator: "dot";
            };
            format: {
                kind: "auto";
            };
        };
        familyOptions: {
            innerRadiusPct: number;
            outerRadiusPct: number;
            showLabels: "percent";
            maxSlices: number;
        };
    };
    scatter: {
        envelope: {
            legend: {
                show: true;
                position: "bottom";
            };
            tooltip: {
                show: true;
                indicator: "dot";
            };
            format: {
                kind: "auto";
            };
        };
        familyOptions: Record<string, unknown>;
    };
    kpi: {
        envelope: {
            format: {
                kind: "auto";
            };
        };
        familyOptions: Record<string, unknown>;
    };
    table: {
        envelope: {};
        familyOptions: {
            pageSize: number;
            sortable: true;
            stickyHeader: true;
            rowHeight: "default";
        };
    };
    combo: {
        envelope: {
            legend: {
                show: true;
                position: "bottom";
            };
            tooltip: {
                show: true;
                indicator: "dot";
            };
            format: {
                kind: "auto";
            };
        };
        familyOptions: {
            series: never[];
        };
    };
};

/**
 * The builtin family → `familyOptions` zod schemas (validated AFTER default-merge).
 * RAW DATA ONLY — this module is a registry leaf (the family registry seeds itself
 * from here; routing the other way would create a module cycle). The public
 * accessor that tolerates host families lives on the registry
 * ({@link import("./familyRegistry").getFamilyOptionsSchema}).
 */
export declare const BUILTIN_FAMILY_OPTION_SCHEMAS: {
    bar: z.ZodObject<{
        barRadius: z.ZodOptional<z.ZodNumber>;
        barCategoryGap: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        barGap: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        maxBarSize: z.ZodOptional<z.ZodNumber>;
        showValueLabels: z.ZodOptional<z.ZodBoolean>;
        referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
            axis: z.ZodEnum<["x", "y"]>;
            value: z.ZodNumber;
            side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            label: z.ZodOptional<z.ZodString>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
        }, "strict", z.ZodTypeAny, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }>, "many">>;
        comparePrevious: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        barRadius?: number | undefined;
        barCategoryGap?: string | number | undefined;
        barGap?: string | number | undefined;
        maxBarSize?: number | undefined;
        showValueLabels?: boolean | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        comparePrevious?: boolean | undefined;
    }, {
        barRadius?: number | undefined;
        barCategoryGap?: string | number | undefined;
        barGap?: string | number | undefined;
        maxBarSize?: number | undefined;
        showValueLabels?: boolean | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        comparePrevious?: boolean | undefined;
    }>;
    line: z.ZodObject<{
        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        dots: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodLiteral<"active">]>>;
        connectNulls: z.ZodOptional<z.ZodBoolean>;
        chrome: z.ZodOptional<z.ZodEnum<["full", "none"]>>;
        referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
            axis: z.ZodEnum<["x", "y"]>;
            value: z.ZodNumber;
            side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            label: z.ZodOptional<z.ZodString>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
        }, "strict", z.ZodTypeAny, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }>, "many">>;
        showValueLabels: z.ZodOptional<z.ZodBoolean>;
        comparePrevious: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | "active" | undefined;
        strokeWidth?: number | undefined;
        showValueLabels?: boolean | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        comparePrevious?: boolean | undefined;
        connectNulls?: boolean | undefined;
        chrome?: "none" | "full" | undefined;
    }, {
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | "active" | undefined;
        strokeWidth?: number | undefined;
        showValueLabels?: boolean | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        comparePrevious?: boolean | undefined;
        connectNulls?: boolean | undefined;
        chrome?: "none" | "full" | undefined;
    }>;
    area: z.ZodObject<{
        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
        fillOpacity: z.ZodOptional<z.ZodNumber>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        connectNulls: z.ZodOptional<z.ZodBoolean>;
        dots: z.ZodOptional<z.ZodBoolean>;
        referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
            axis: z.ZodEnum<["x", "y"]>;
            value: z.ZodNumber;
            side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            label: z.ZodOptional<z.ZodString>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
        }, "strict", z.ZodTypeAny, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }>, "many">>;
        comparePrevious: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
        fillOpacity?: number | undefined;
        strokeWidth?: number | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        comparePrevious?: boolean | undefined;
        connectNulls?: boolean | undefined;
    }, {
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
        fillOpacity?: number | undefined;
        strokeWidth?: number | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        comparePrevious?: boolean | undefined;
        connectNulls?: boolean | undefined;
    }>;
    pie: z.ZodObject<{
        innerRadiusPct: z.ZodOptional<z.ZodNumber>;
        outerRadiusPct: z.ZodOptional<z.ZodNumber>;
        padAngle: z.ZodOptional<z.ZodNumber>;
        cornerRadius: z.ZodOptional<z.ZodNumber>;
        showLabels: z.ZodOptional<z.ZodEnum<["none", "value", "percent", "name"]>>;
        centerLabel: z.ZodOptional<z.ZodObject<{
            value: z.ZodOptional<z.ZodString>;
            label: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            value?: string | undefined;
            label?: string | undefined;
        }, {
            value?: string | undefined;
            label?: string | undefined;
        }>>;
        maxSlices: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        innerRadiusPct?: number | undefined;
        outerRadiusPct?: number | undefined;
        padAngle?: number | undefined;
        cornerRadius?: number | undefined;
        showLabels?: "value" | "percent" | "none" | "name" | undefined;
        centerLabel?: {
            value?: string | undefined;
            label?: string | undefined;
        } | undefined;
        maxSlices?: number | undefined;
    }, {
        innerRadiusPct?: number | undefined;
        outerRadiusPct?: number | undefined;
        padAngle?: number | undefined;
        cornerRadius?: number | undefined;
        showLabels?: "value" | "percent" | "none" | "name" | undefined;
        centerLabel?: {
            value?: string | undefined;
            label?: string | undefined;
        } | undefined;
        maxSlices?: number | undefined;
    }>;
    scatter: z.ZodObject<{
        x: z.ZodString;
        y: z.ZodString;
        size: z.ZodOptional<z.ZodString>;
        sizeRange: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
        groupBy: z.ZodOptional<z.ZodString>;
        shape: z.ZodOptional<z.ZodEnum<["circle", "square", "triangle", "diamond"]>>;
        referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
            axis: z.ZodEnum<["x", "y"]>;
            value: z.ZodNumber;
            side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            label: z.ZodOptional<z.ZodString>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
        }, "strict", z.ZodTypeAny, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        x: string;
        y: string;
        shape?: "circle" | "square" | "triangle" | "diamond" | undefined;
        size?: string | undefined;
        groupBy?: string | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        sizeRange?: [number, number] | undefined;
    }, {
        x: string;
        y: string;
        shape?: "circle" | "square" | "triangle" | "diamond" | undefined;
        size?: string | undefined;
        groupBy?: string | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        sizeRange?: [number, number] | undefined;
    }>;
    kpi: z.ZodObject<{
        display: z.ZodOptional<z.ZodEnum<["number", "gauge"]>>;
        measure: z.ZodString;
        comparison: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<["previousPeriod", "value"]>;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            showAsPercent: z.ZodOptional<z.ZodBoolean>;
            goodDirection: z.ZodOptional<z.ZodEnum<["up", "down"]>>;
        }, "strict", z.ZodTypeAny, {
            mode: "value" | "previousPeriod";
            value?: string | number | undefined;
            showAsPercent?: boolean | undefined;
            goodDirection?: "up" | "down" | undefined;
        }, {
            mode: "value" | "previousPeriod";
            value?: string | number | undefined;
            showAsPercent?: boolean | undefined;
            goodDirection?: "up" | "down" | undefined;
        }>>;
        /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
         *  `measure` and its time dimension / range to the KPI's own query — only the
         *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
         *  same good/bad direction as the comparison delta (see `goodDirection`). */
        sparkline: z.ZodOptional<z.ZodObject<{
            member: z.ZodOptional<z.ZodString>;
            timeDimension: z.ZodOptional<z.ZodString>;
            granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
        }, "strict", z.ZodTypeAny, {
            member?: string | undefined;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            timeDimension?: string | undefined;
        }, {
            member?: string | undefined;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            timeDimension?: string | undefined;
        }>>;
        /** The change direction that counts as "good" — drives BOTH the comparison delta
         *  color and the sparkline area color. Configured once for the KPI. */
        goodDirection: z.ZodOptional<z.ZodEnum<["up", "down"]>>;
        gauge: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodNumber;
            thresholds: z.ZodOptional<z.ZodArray<z.ZodObject<{
                at: z.ZodNumber;
                colorToken: z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>;
            }, "strict", z.ZodTypeAny, {
                at: number;
                colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
            }, {
                at: number;
                colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            max: number;
            min?: number | undefined;
            thresholds?: {
                at: number;
                colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
            }[] | undefined;
        }, {
            max: number;
            min?: number | undefined;
            thresholds?: {
                at: number;
                colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
            }[] | undefined;
        }>>;
        icon: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        measure: string;
        display?: "number" | "gauge" | undefined;
        icon?: string | undefined;
        gauge?: {
            max: number;
            min?: number | undefined;
            thresholds?: {
                at: number;
                colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
            }[] | undefined;
        } | undefined;
        goodDirection?: "up" | "down" | undefined;
        comparison?: {
            mode: "value" | "previousPeriod";
            value?: string | number | undefined;
            showAsPercent?: boolean | undefined;
            goodDirection?: "up" | "down" | undefined;
        } | undefined;
        sparkline?: {
            member?: string | undefined;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            timeDimension?: string | undefined;
        } | undefined;
    }, {
        measure: string;
        display?: "number" | "gauge" | undefined;
        icon?: string | undefined;
        gauge?: {
            max: number;
            min?: number | undefined;
            thresholds?: {
                at: number;
                colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
            }[] | undefined;
        } | undefined;
        goodDirection?: "up" | "down" | undefined;
        comparison?: {
            mode: "value" | "previousPeriod";
            value?: string | number | undefined;
            showAsPercent?: boolean | undefined;
            goodDirection?: "up" | "down" | undefined;
        } | undefined;
        sparkline?: {
            member?: string | undefined;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            timeDimension?: string | undefined;
        } | undefined;
    }>;
    table: z.ZodObject<{
        columns: z.ZodOptional<z.ZodArray<z.ZodObject<{
            member: z.ZodString;
            label: z.ZodOptional<z.ZodString>;
            format: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
            align: z.ZodOptional<z.ZodEnum<["left", "right", "center"]>>;
            width: z.ZodOptional<z.ZodNumber>;
            hidden: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            member: string;
            label?: string | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            hidden?: boolean | undefined;
            width?: number | undefined;
            align?: "left" | "right" | "center" | undefined;
        }, {
            member: string;
            label?: string | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            hidden?: boolean | undefined;
            width?: number | undefined;
            align?: "left" | "right" | "center" | undefined;
        }>, "many">>;
        pageSize: z.ZodOptional<z.ZodNumber>;
        sortable: z.ZodOptional<z.ZodBoolean>;
        stickyHeader: z.ZodOptional<z.ZodBoolean>;
        rowHeight: z.ZodOptional<z.ZodEnum<["compact", "default"]>>;
        showRowNumbers: z.ZodOptional<z.ZodBoolean>;
        conditionalFormat: z.ZodOptional<z.ZodArray<z.ZodObject<{
            member: z.ZodString;
            when: z.ZodObject<{
                op: z.ZodEnum<["gt", "lt", "gte", "lte", "eq"]>;
                value: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                value: number;
                op: "gt" | "gte" | "lt" | "lte" | "eq";
            }, {
                value: number;
                op: "gt" | "gte" | "lt" | "lte" | "eq";
            }>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
        }, "strict", z.ZodTypeAny, {
            member: string;
            when: {
                value: number;
                op: "gt" | "gte" | "lt" | "lte" | "eq";
            };
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        }, {
            member: string;
            when: {
                value: number;
                op: "gt" | "gte" | "lt" | "lte" | "eq";
            };
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        rowHeight?: "default" | "compact" | undefined;
        columns?: {
            member: string;
            label?: string | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            hidden?: boolean | undefined;
            width?: number | undefined;
            align?: "left" | "right" | "center" | undefined;
        }[] | undefined;
        pageSize?: number | undefined;
        sortable?: boolean | undefined;
        stickyHeader?: boolean | undefined;
        showRowNumbers?: boolean | undefined;
        conditionalFormat?: {
            member: string;
            when: {
                value: number;
                op: "gt" | "gte" | "lt" | "lte" | "eq";
            };
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        }[] | undefined;
    }, {
        rowHeight?: "default" | "compact" | undefined;
        columns?: {
            member: string;
            label?: string | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            hidden?: boolean | undefined;
            width?: number | undefined;
            align?: "left" | "right" | "center" | undefined;
        }[] | undefined;
        pageSize?: number | undefined;
        sortable?: boolean | undefined;
        stickyHeader?: boolean | undefined;
        showRowNumbers?: boolean | undefined;
        conditionalFormat?: {
            member: string;
            when: {
                value: number;
                op: "gt" | "gte" | "lt" | "lte" | "eq";
            };
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        }[] | undefined;
    }>;
    combo: z.ZodObject<{
        series: z.ZodArray<z.ZodObject<{
            member: z.ZodString;
            render: z.ZodEnum<["bar", "line", "area"]>;
            axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
            stackId: z.ZodOptional<z.ZodString>;
            curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
            dots: z.ZodOptional<z.ZodBoolean>;
            label: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            member: string;
            render: "bar" | "line" | "area";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
        }, {
            member: string;
            render: "bar" | "line" | "area";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
        }>, "many">;
        referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
            axis: z.ZodEnum<["x", "y"]>;
            value: z.ZodNumber;
            side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            label: z.ZodOptional<z.ZodString>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
        }, "strict", z.ZodTypeAny, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }, {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }>, "many">>;
        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
        dots: z.ZodOptional<z.ZodBoolean>;
        connectNulls: z.ZodOptional<z.ZodBoolean>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        fillOpacity: z.ZodOptional<z.ZodNumber>;
        barRadius: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        series: {
            member: string;
            render: "bar" | "line" | "area";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
        }[];
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
        fillOpacity?: number | undefined;
        strokeWidth?: number | undefined;
        barRadius?: number | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        connectNulls?: boolean | undefined;
    }, {
        series: {
            member: string;
            render: "bar" | "line" | "area";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
        }[];
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
        fillOpacity?: number | undefined;
        strokeWidth?: number | undefined;
        barRadius?: number | undefined;
        referenceLines?: {
            value: number;
            axis: "x" | "y";
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            side?: "left" | "right" | undefined;
        }[] | undefined;
        connectNulls?: boolean | undefined;
    }>;
};

export declare type BuiltinChartFamily = (typeof BUILTIN_CHART_FAMILIES)[number];

/**
 * The builtin family → component table, DERIVED from the builtin descriptors. Note
 * this is BUILTIN-ONLY (host-registered families are NOT here); dispatch resolves the
 * component from the injected {@link FamilyRegistry}, so a host family still renders.
 * Override any entry via `components`.
 */
export declare const builtinCharts: Record<string, ChartComponent>;

export declare const builtinFamilyDescriptors: Record<BuiltinChartFamily, ChartFamilyDescriptor>;

/**
 * A pre-built {@link FamilyRegistry} over {@link defaultChartFamilies} only (no host
 * families). The back-compat default for the public pure exports
 * ({@link resolveOptions}, {@link import("@/adapter").normalize},
 * {@link import("@/render").comparePreviousInput}) and the fallback for components
 * rendered outside a provider (e.g. {@link import("@/charts").ChartRenderer} in tests).
 */
export declare const builtinFamilyRegistry: FamilyRegistry;

/** The breakpoint key under which {@link Dashboard} stores the canonical layout. */
export declare const CANONICAL_BREAKPOINT: "lg";

export declare type ChartColorToken = z.infer<typeof ChartColorTokenSchema>;

export declare const ChartColorTokenSchema: z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>;

/** A chart family is any component rendering {@link ChartComponentProps}. */
export declare type ChartComponent = React_2.ComponentType<ChartComponentProps>;

/**
 * The chart-family seam (docs/02-chart-options.md §3): every family is a PURE
 * component `(NormalizedChartData, ChartOptions, ChartConfig) → ReactElement`.
 * It receives already-fetched, already-normalized data + the resolved options +
 * the derived shadcn `ChartConfig`. It NEVER fetches and NEVER sees a Cube
 * ResultSet — Recharts props are confined inside each family component.
 */
export declare interface ChartComponentProps {
    /** Already-fetched, normalized adapter output. */
    data: NormalizedChartData;
    /** Resolved chart options (envelope + familyOptions, defaults already merged). */
    options: ChartOptions;
    /** shadcn ChartConfig derived from `data.series` (key → {label, color}). */
    config: ChartConfig;
    /**
     * The host-pluggable, member-aware value formatter for this chart. Families call
     * `format.value(v, member, role)` / `format.category(v)` — they NEVER read the
     * annotation or hardcode units/durations. Built from the resolved
     * {@link ValueFormatter} + annotation + options.
     */
    format: ChartFormat;
    /** Optional fetch state; families render their own loading/error chrome from it. */
    state?: {
        loading?: boolean;
        error?: Error;
    };
    /**
     * Editing surface hint. When true, the chart is shown inside the on-chart editor:
     * hidden chrome (e.g. a `legend.show:false` legend) renders GREYED rather than
     * removed, so the in-context show/hide controls have something to toggle.
     */
    editing?: boolean;
}

export declare type ChartConfig = {
    [k in string]: {
        label?: React_2.ReactNode;
        icon?: React_2.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};

export declare function ChartEditor({ spec, onChange, onSave, debounceMs, fill, className, }: ChartEditorProps): React_2.ReactElement;

/**
 * The ChartEditor's controlled-spec engine (docs/03 §A3.1). It keeps an in-memory
 * working `ChartSpec`, validates EVERY candidate with the zod {@link ChartSpecSchema},
 * surfaces a flat list of issues, and only emits VALID specs to the host (debounced
 * so keystroke edits don't flood `onChange`). An invalid candidate is held as the
 * working draft (so the form keeps the user's input) but never emitted.
 */
export declare interface ChartEditorIssue {
    /** Dotted path into the spec, e.g. "query.measures.0". */
    path: string;
    message: string;
}

/**
 * ChartEditor (docs/03 §A3.1, docs/05) — the JSON-in / JSON-out chart editor. It takes
 * a {@link ChartSpec} and turns the live `<CubeChart>` preview itself into the editing
 * surface: a {@link ChartEditOverlay} wraps the chart with on-chart field slots (a left
 * Y-axis strip, a bottom X-axis slot, a centre type widget, a ⋯ chrome menu) — no side
 * panel. Every edit emits a NEW validated `ChartSpec` via `onChange` (debounced).
 *
 * Contract / assumptions:
 *  - Performs NO I/O beyond reading `/v1/meta` (via the slot pickers) and the preview's
 *    own `<CubeChart>` fetch. The host decides where the emitted spec goes.
 *  - MUST be rendered inside a `<CubeVizProvider>` (the Cube client). A `<DashboardProvider>`
 *    ancestor, when present, resolves `{var}` tokens in the preview query.
 *  - Every candidate is validated with the zod `ChartSpecSchema`. An invalid draft is held
 *    (so input isn't lost) and surfaced inline, but NEVER emitted; the preview renders the
 *    last VALID spec so it never issues a malformed `/v1/load`.
 *  - `onSave` is an OPTIONAL explicit-commit hook; when set, a "Save" button appears.
 */
export declare interface ChartEditorProps {
    /** The chart spec to edit. Treated as a controlled input: swapping its identity re-seeds the editor. */
    spec: ChartSpec;
    /** Emits a new, schema-VALID `ChartSpec` on each edit (debounced). */
    onChange?: (spec: ChartSpec) => void;
    /** Optional explicit-save hook; when set, a "Save" button hands over the current valid spec. */
    onSave?: (spec: ChartSpec) => void;
    /** Debounce for both `onChange` and the live preview (ms). Default 250. */
    debounceMs?: number;
    /** Fill the parent's height (full-screen editing) so the preview fills the screen. */
    fill?: boolean;
    className?: string;
}

/**
 * The panel-less, on-chart chart editor (replaces ChartBuilderPanel). The preview IS
 * the editing surface: a left Y-axis strip of selectable field slots, a bottom X-axis
 * (single) slot + any splits, a centre chart-type widget, and a top-right ⋯ chrome
 * menu — every edit funnelling through the unchanged `wells.ts` seam + `update`. The
 * left strip's per-field colour swatches use the SAME {@link resolveSeriesColors}
 * resolver as the renderer, so the editor never disagrees with the chart.
 */
export declare function ChartEditOverlay({ spec, update, toolbar, children, }: ChartEditOverlayProps): React_2.ReactElement;

export declare interface ChartEditOverlayProps {
    spec: ChartSpec;
    update: (next: ChartSpec) => void;
    /** Optional controls (e.g. a Save button) shown at the left of the top bar. */
    toolbar?: React_2.ReactNode;
    /** The live chart preview (or empty placeholder) the slots are arranged around. */
    children: React_2.ReactNode;
}

export declare type ChartFamily = z.infer<typeof ChartFamilySchema>;

/**
 * The SINGLE SOURCE OF TRUTH for per-chart-family behaviour.
 *
 * Before this registry, each family's identity was smeared across ~10 scattered
 * tables/switches/Sets (icon + label in the picker, component in the dispatcher,
 * option schema + defaults in `defaults.ts`, wells + zones + dual-axis + legend in
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
export declare interface ChartFamilyDescriptor {
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
    zones: {
        left: string[];
        bottom: string[];
    };
    /** Has TWO renderer-supported value axes (left + right). */
    dualAxisY: boolean;
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
    /** The type-level "Options" panel for this family (rendered in the type picker). */
    Customize?: React_2.ComponentType<{
        spec: ChartSpec;
        update: (next: ChartSpec) => void;
    }>;
    /** Place `member` (of `kind`) into well `wellId`, returning a FULL next spec. */
    placeField?: (spec: ChartSpec, wellId: string, member: string, kind: FieldKind) => ChartSpec;
    /** Remove `member` from well `wellId`, returning a FULL next spec. */
    removeField?: (spec: ChartSpec, wellId: string, member: string) => ChartSpec;
    /** Derive each well's current member name(s) from the spec (inverse of place/remove). */
    readWells?: (spec: ChartSpec) => Record<string, string[]>;
    /**
     * Assign `member` to a value axis (`"left"`/`"right"`) for a `dualAxisY` family,
     * returning a FULL next spec. The editor calls this after `placeField` on a
     * dual-axis family so the axis lands in the SAME shape the host's own
     * placeField/readWells read. Builtins leave this unset and the editor falls back to
     * the builtin `withSeriesAxis` (combo / cartesian `mapping.series` meta) — so a host
     * with its own field storage must supply this to control dual-axis assignment.
     */
    assignSeriesAxis?: (spec: ChartSpec, member: string, side: "left" | "right") => ChartSpec;
}

/**
 * The chart-family discriminator is an OPEN string, not a closed enum: a host can
 * add an entirely new family (via `<CubeVizProvider families={[...]}>`) and its specs
 * must validate. The builtin families ship in {@link BUILTIN_CHART_FAMILIES}; unknown
 * (host) families are dispatched through the injected family registry before any
 * builtin switch. `map` is no longer builtin — it moved to the host app.
 */
export declare const ChartFamilySchema: z.ZodString;

/**
 * The bound, member-aware formatter every chart family consumes. Built by
 * {@link import("./chart-format").makeChartFormat} from a result annotation, the
 * resolved chart options, and a {@link ValueFormatter}. Families never read the
 * annotation or build a FormatContext themselves — they call these two methods.
 */
export declare interface ChartFormat {
    /**
     * Format a single value. Looks `member` up in the annotation for meta+title,
     * builds a {@link FormatContext} (with the options' `format`), and delegates to
     * the resolved {@link ValueFormatter}. `role` defaults to `"value"`.
     */
    value: (value: number | string | null | undefined, member?: string, role?: FormatRole) => string;
    /**
     * Format a category-axis label (role `"category"`), threading the time-dimension
     * granularity from the chart options/query when discoverable.
     */
    category: (value: string | number | null | undefined) => string;
}

export declare type ChartOptions = z.infer<typeof ChartOptionsSchema>;

export declare const ChartOptionsSchema: z.ZodObject<{
    family: z.ZodString;
    /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
     carry their own mapping inside familyOptions, so this is optional at the envelope. */
    mapping: z.ZodOptional<z.ZodObject<{
        category: z.ZodObject<{
            member: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            member: string;
        }, {
            member: string;
        }>;
        series: z.ZodUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"measures">;
            members: z.ZodArray<z.ZodString, "many">;
            meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                stackId: z.ZodOptional<z.ZodString>;
                axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                /** Per-series line shape (line/area) — overrides the family default. */
                curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                /** Per-series point markers (line/area) — overrides the family default. */
                dots: z.ZodOptional<z.ZodBoolean>;
                format: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>>;
        }, "strict", z.ZodTypeAny, {
            mode: "measures";
            members: string[];
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        }, {
            mode: "measures";
            members: string[];
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"pivot">;
            /** The primary split measure — drives the value-axis unit. Always set
             *  (also the only value when a single measure is split by colour). */
            value: z.ZodString;
            /** When MORE THAN ONE measure is split by the colour dimension, the full
             *  ordered measure list (series = measure × pivot value). `value` is
             *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
            values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            pivot: z.ZodString;
            /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
             *  each measure's series sit on, so a multi-measure color split can be
             *  dual-axis (each axis one unit). */
            meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                stackId: z.ZodOptional<z.ZodString>;
                axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                /** Per-series line shape (line/area) — overrides the family default. */
                curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                /** Per-series point markers (line/area) — overrides the family default. */
                dots: z.ZodOptional<z.ZodBoolean>;
                format: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>>;
        }, "strict", z.ZodTypeAny, {
            value: string;
            mode: "pivot";
            pivot: string;
            values?: string[] | undefined;
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        }, {
            value: string;
            mode: "pivot";
            pivot: string;
            values?: string[] | undefined;
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        }>]>;
    }, "strict", z.ZodTypeAny, {
        category: {
            member: string;
        };
        series: {
            mode: "measures";
            members: string[];
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        } | {
            value: string;
            mode: "pivot";
            pivot: string;
            values?: string[] | undefined;
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        };
    }, {
        category: {
            member: string;
        };
        series: {
            mode: "measures";
            members: string[];
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        } | {
            value: string;
            mode: "pivot";
            pivot: string;
            values?: string[] | undefined;
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        };
    }>>;
    orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal"]>>;
    stackMode: z.ZodOptional<z.ZodEnum<["none", "stacked", "grouped", "percent"]>>;
    legend: z.ZodOptional<z.ZodObject<{
        show: z.ZodOptional<z.ZodBoolean>;
        position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
    }, "strict", z.ZodTypeAny, {
        show?: boolean | undefined;
        position?: "left" | "right" | "top" | "bottom" | undefined;
    }, {
        show?: boolean | undefined;
        position?: "left" | "right" | "top" | "bottom" | undefined;
    }>>;
    tooltip: z.ZodOptional<z.ZodObject<{
        show: z.ZodOptional<z.ZodBoolean>;
        indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
        showTotal: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        show?: boolean | undefined;
        indicator?: "line" | "dot" | "dashed" | undefined;
        showTotal?: boolean | undefined;
    }, {
        show?: boolean | undefined;
        indicator?: "line" | "dot" | "dashed" | undefined;
        showTotal?: boolean | undefined;
    }>>;
    axes: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
            labelHide: z.ZodOptional<z.ZodBoolean>;
            hide: z.ZodOptional<z.ZodBoolean>;
            scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
            domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
            tickFormat: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }, {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }>>;
        y: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
            labelHide: z.ZodOptional<z.ZodBoolean>;
            hide: z.ZodOptional<z.ZodBoolean>;
            scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
            domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
            tickFormat: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }, {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }>>;
        y2: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
            labelHide: z.ZodOptional<z.ZodBoolean>;
            hide: z.ZodOptional<z.ZodBoolean>;
            scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
            domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
            tickFormat: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }, {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        x?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y2?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        x?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y2?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
    }>>;
    colors: z.ZodOptional<z.ZodObject<{
        byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
        ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
    }, "strict", z.ZodTypeAny, {
        byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
        ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
    }, {
        byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
        ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
    }>>;
    format: z.ZodOptional<z.ZodObject<{
        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
        decimals: z.ZodOptional<z.ZodNumber>;
        abbreviate: z.ZodOptional<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodString>;
        suffix: z.ZodOptional<z.ZodString>;
        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
        dateFormat: z.ZodOptional<z.ZodString>;
        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
        currency: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }>>;
    /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
    familyOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strict", z.ZodTypeAny, {
    family: string;
    format?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
    mapping?: {
        category: {
            member: string;
        };
        series: {
            mode: "measures";
            members: string[];
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        } | {
            value: string;
            mode: "pivot";
            pivot: string;
            values?: string[] | undefined;
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        };
    } | undefined;
    orientation?: "vertical" | "horizontal" | undefined;
    stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
    legend?: {
        show?: boolean | undefined;
        position?: "left" | "right" | "top" | "bottom" | undefined;
    } | undefined;
    tooltip?: {
        show?: boolean | undefined;
        indicator?: "line" | "dot" | "dashed" | undefined;
        showTotal?: boolean | undefined;
    } | undefined;
    axes?: {
        x?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y2?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    colors?: {
        byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
        ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
    } | undefined;
    familyOptions?: Record<string, unknown> | undefined;
}, {
    family: string;
    format?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
    mapping?: {
        category: {
            member: string;
        };
        series: {
            mode: "measures";
            members: string[];
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        } | {
            value: string;
            mode: "pivot";
            pivot: string;
            values?: string[] | undefined;
            meta?: Record<string, {
                label?: string | undefined;
                colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                stackId?: string | undefined;
                axis?: "left" | "right" | undefined;
                curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                dots?: boolean | undefined;
                format?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }> | undefined;
        };
    } | undefined;
    orientation?: "vertical" | "horizontal" | undefined;
    stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
    legend?: {
        show?: boolean | undefined;
        position?: "left" | "right" | "top" | "bottom" | undefined;
    } | undefined;
    tooltip?: {
        show?: boolean | undefined;
        indicator?: "line" | "dot" | "dashed" | undefined;
        showTotal?: boolean | undefined;
    } | undefined;
    axes?: {
        x?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
        y2?: {
            label?: string | undefined;
            labelHide?: boolean | undefined;
            hide?: boolean | undefined;
            scale?: "linear" | "log" | undefined;
            domain?: [number | "auto", number | "auto"] | undefined;
            tickFormat?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    colors?: {
        byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
        ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
    } | undefined;
    familyOptions?: Record<string, unknown> | undefined;
}>;

export declare function ChartRenderer({ data, options, config, format, state, components, editing, registry, }: ChartRendererProps): ReactElement;

export declare interface ChartRendererProps extends Omit<ChartComponentProps, "format"> {
    /**
     * The bound value formatter. Optional here: when absent the renderer builds a
     * default from `data.raw.annotation` + the resolved options + the minimal
     * {@link defaultFormatter}. `CubeChart` supplies the context-resolved one.
     */
    format?: ChartFormat;
    /** Per-family component overrides; a missing family falls back to the builtin. */
    components?: Partial<Record<ChartFamily, ChartComponent>>;
    /**
     * The family registry to dispatch + resolve options against. Optional — defaults to
     * the builtin-only {@link builtinFamilyRegistry} so the renderer stays pure and works
     * standalone. `CubeChart` passes the context registry (builtins + host families).
     */
    registry?: FamilyRegistry;
}

export declare type ChartSpec = z.infer<typeof ChartSpecSchema>;

export declare const ChartSpecSchema: z.ZodObject<{
    kind: z.ZodLiteral<"chart">;
    query: z.ZodObject<{
        measures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeDimensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            dimension: z.ZodString;
            granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }>, "many">>;
        filters: z.ZodOptional<z.ZodArray<z.ZodType<QueryFilter, z.ZodTypeDef, QueryFilter>, "many">>;
        segments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        order: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>>;
        limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        total: z.ZodOptional<z.ZodBoolean>;
        timezone: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }>;
    chart: z.ZodObject<{
        family: z.ZodString;
        /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
         carry their own mapping inside familyOptions, so this is optional at the envelope. */
        mapping: z.ZodOptional<z.ZodObject<{
            category: z.ZodObject<{
                member: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                member: string;
            }, {
                member: string;
            }>;
            series: z.ZodUnion<[z.ZodObject<{
                mode: z.ZodLiteral<"measures">;
                members: z.ZodArray<z.ZodString, "many">;
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"pivot">;
                /** The primary split measure — drives the value-axis unit. Always set
                 *  (also the only value when a single measure is split by colour). */
                value: z.ZodString;
                /** When MORE THAN ONE measure is split by the colour dimension, the full
                 *  ordered measure list (series = measure × pivot value). `value` is
                 *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
                values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                pivot: z.ZodString;
                /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
                 *  each measure's series sit on, so a multi-measure color split can be
                 *  dual-axis (each axis one unit). */
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>]>;
        }, "strict", z.ZodTypeAny, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }>>;
        orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal"]>>;
        stackMode: z.ZodOptional<z.ZodEnum<["none", "stacked", "grouped", "percent"]>>;
        legend: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }>>;
        tooltip: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
            showTotal: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }>>;
        axes: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y2: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }>>;
        colors: z.ZodOptional<z.ZodObject<{
            byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
            ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }>>;
        format: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
        /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
        familyOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strict", z.ZodTypeAny, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }>;
    schemaVersion: z.ZodLiteral<1>;
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    kind: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    schemaVersion: 1;
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}, {
    kind: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    schemaVersion: 1;
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}>;

/**
 * Render a standalone {@link ChartSpec} inside the default {@link WidgetChrome}, so a
 * lone chart file looks consistent with a dashboard cell. No `DashboardProvider` —
 * a top-level chart resolves variables against an empty store (fail-safe noFilter).
 */
export declare function ChartView({ spec, families }: ChartViewProps): ReactElement;

export declare interface ChartViewProps {
    /** A standalone chart spec to render (no dashboard / variables). */
    spec: ChartSpec;
    /**
     * Per-component chart-families override (see {@link DashboardProps.families}). When
     * set, this chart resolves families from `defaultChartFamilies` + these descriptors.
     */
    families?: ChartFamilyDescriptor[];
}

export declare type ChartWidget = z.infer<typeof ChartWidgetSchema>;

export declare const ChartWidgetSchema: z.ZodObject<{
    type: z.ZodLiteral<"chart">;
    query: z.ZodObject<{
        measures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeDimensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            dimension: z.ZodString;
            granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }>, "many">>;
        filters: z.ZodOptional<z.ZodArray<z.ZodType<QueryFilter, z.ZodTypeDef, QueryFilter>, "many">>;
        segments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        order: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>>;
        limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        total: z.ZodOptional<z.ZodBoolean>;
        timezone: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }>;
    chart: z.ZodObject<{
        family: z.ZodString;
        /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
         carry their own mapping inside familyOptions, so this is optional at the envelope. */
        mapping: z.ZodOptional<z.ZodObject<{
            category: z.ZodObject<{
                member: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                member: string;
            }, {
                member: string;
            }>;
            series: z.ZodUnion<[z.ZodObject<{
                mode: z.ZodLiteral<"measures">;
                members: z.ZodArray<z.ZodString, "many">;
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"pivot">;
                /** The primary split measure — drives the value-axis unit. Always set
                 *  (also the only value when a single measure is split by colour). */
                value: z.ZodString;
                /** When MORE THAN ONE measure is split by the colour dimension, the full
                 *  ordered measure list (series = measure × pivot value). `value` is
                 *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
                values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                pivot: z.ZodString;
                /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
                 *  each measure's series sit on, so a multi-measure color split can be
                 *  dual-axis (each axis one unit). */
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>]>;
        }, "strict", z.ZodTypeAny, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }>>;
        orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal"]>>;
        stackMode: z.ZodOptional<z.ZodEnum<["none", "stacked", "grouped", "percent"]>>;
        legend: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }>>;
        tooltip: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
            showTotal: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }>>;
        axes: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y2: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }>>;
        colors: z.ZodOptional<z.ZodObject<{
            byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
            ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }>>;
        format: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
        /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
        familyOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strict", z.ZodTypeAny, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }>;
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    title?: string | undefined;
}, {
    type: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    title?: string | undefined;
}>;

export declare type ColorAssignment = z.infer<typeof ColorAssignmentSchema>;

export declare const ColorAssignmentSchema: z.ZodObject<{
    byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
    ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
}, "strict", z.ZodTypeAny, {
    byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
    ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
}, {
    byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
    ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
}>;

/**
 * `combo` — covers Combo / Bar+Line / Dual-axis (docs/02-chart-options.md §2.8).
 * Each `ComboSeriesOpt` declares its own `render` (bar|line|area) and `axis`
 * (left|right → mounts a 2nd YAxis). `mapping.category` is the shared x. The
 * inline `series` list is the combo seam, so envelope `mapping.series` is ignored.
 */
export declare function ComboChartFamily({ data, options, format, editing }: ChartComponentProps): React_2.ReactElement;

export declare const comboChartFamily: ChartFamilyDescriptor;

export declare type ComboFamilyOptions = z.infer<typeof ComboFamilyOptionsSchema>;

export declare const ComboFamilyOptionsSchema: z.ZodObject<{
    series: z.ZodArray<z.ZodObject<{
        member: z.ZodString;
        render: z.ZodEnum<["bar", "line", "area"]>;
        axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
        stackId: z.ZodOptional<z.ZodString>;
        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
        dots: z.ZodOptional<z.ZodBoolean>;
        label: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        member: string;
        render: "bar" | "line" | "area";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        stackId?: string | undefined;
        axis?: "left" | "right" | undefined;
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
    }, {
        member: string;
        render: "bar" | "line" | "area";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        stackId?: string | undefined;
        axis?: "left" | "right" | undefined;
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
    }>, "many">;
    referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        axis: z.ZodEnum<["x", "y"]>;
        value: z.ZodNumber;
        side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
        label: z.ZodOptional<z.ZodString>;
        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    }, "strict", z.ZodTypeAny, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }>, "many">>;
    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
    dots: z.ZodOptional<z.ZodBoolean>;
    connectNulls: z.ZodOptional<z.ZodBoolean>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    fillOpacity: z.ZodOptional<z.ZodNumber>;
    barRadius: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    series: {
        member: string;
        render: "bar" | "line" | "area";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        stackId?: string | undefined;
        axis?: "left" | "right" | undefined;
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
    }[];
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
    fillOpacity?: number | undefined;
    strokeWidth?: number | undefined;
    barRadius?: number | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    connectNulls?: boolean | undefined;
}, {
    series: {
        member: string;
        render: "bar" | "line" | "area";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        stackId?: string | undefined;
        axis?: "left" | "right" | undefined;
        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
        dots?: boolean | undefined;
    }[];
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
    fillOpacity?: number | undefined;
    strokeWidth?: number | undefined;
    barRadius?: number | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    connectNulls?: boolean | undefined;
}>;

export declare type ComboSeriesOpt = z.infer<typeof ComboSeriesOptSchema>;

export declare const ComboSeriesOptSchema: z.ZodObject<{
    member: z.ZodString;
    render: z.ZodEnum<["bar", "line", "area"]>;
    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    stackId: z.ZodOptional<z.ZodString>;
    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
    dots: z.ZodOptional<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    member: string;
    render: "bar" | "line" | "area";
    label?: string | undefined;
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    stackId?: string | undefined;
    axis?: "left" | "right" | undefined;
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
}, {
    member: string;
    render: "bar" | "line" | "area";
    label?: string | undefined;
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    stackId?: string | undefined;
    axis?: "left" | "right" | undefined;
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
}>;

/**
 * Every overridable slot in cube-viz, keyed by stable slot name. Each field is
 * optional; a missing slot falls back to the built-in. See {@link resolveChart}.
 */
export declare interface ComponentRegistry {
    /** (a) Whole chart-family components — one slot per family. */
    charts?: Partial<Record<ChartFamily, ChartComponent>>;
    /** (b) Widget chrome — the frame + empty/error/loading body states. */
    chrome?: {
        /** Wraps every widget. */
        widget?: WidgetChromeComponent;
        /** Rendered when `NormalizedChartData.empty === true`. */
        empty?: StateComponent;
        /** Rendered on fetch error (message only). */
        error?: ErrorStateComponent;
        /** Rendered while a widget is loading. */
        loading?: StateComponent;
    };
    /** (c) Input controls — one slot per {@link InputControlKind}. */
    controls?: Partial<Record<InputControlKind, InputControlComponent>>;
}

export declare type CondFormatRule = z.infer<typeof CondFormatRuleSchema>;

export declare const CondFormatRuleSchema: z.ZodObject<{
    member: z.ZodString;
    when: z.ZodObject<{
        op: z.ZodEnum<["gt", "lt", "gte", "lte", "eq"]>;
        value: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        value: number;
        op: "gt" | "gte" | "lt" | "lte" | "eq";
    }, {
        value: number;
        op: "gt" | "gte" | "lt" | "lte" | "eq";
    }>;
    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
}, "strict", z.ZodTypeAny, {
    member: string;
    when: {
        value: number;
        op: "gt" | "gte" | "lt" | "lte" | "eq";
    };
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
}, {
    member: string;
    when: {
        value: number;
        op: "gt" | "gte" | "lt" | "lte" | "eq";
    };
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
}>;

/** The viewer's unit system + the conversion table, threaded in from the provider. */
declare interface ConvertCtx {
    unitSystem?: "metric" | "imperial";
    conversions?: Record<string, UnitDef>;
}

/**
 * Construct a Cube API client from connection material.
 *
 * `cube(tokenOrThunk, { apiUrl })` is the documented v1.6 entrypoint; the token
 * may be a string or a `() => Promise<string>` so the host can refresh JWTs
 * without rebuilding the client.
 */
export declare function createCubeClient(conn: CubeConnection): CubeClient;

/**
 * Build a counter-based id factory: `${prefix}-1`, `${prefix}-2`, … The counter is
 * created on call (NOT at module scope), so each editor instance gets its own.
 */
export declare function createIdFactory(prefix?: string): IdFactory;

/**
 * A per-caller memoized {@link resolveQuery}: caches the last input + the serialized
 * resolved output, and returns the PRIOR resolved object (same reference) when the new
 * resolution is byte-identical. This gives downstream identity-based memos (e.g.
 * `useNormalizedSeries`' `data` memo) referential stability — a `setVar` that doesn't
 * affect THIS query produces no new `resolvedQuery` reference, so `normalize()` does not
 * re-run. A real change to a bound variable still yields a new reference (the
 * serialization differs), so the bound widget correctly updates.
 *
 * Each caller (one per chart) gets its own memoizer, so unrelated queries never evict
 * each other's cache.
 */
export declare function createQueryResolver(): (query: CubeQuery, store: Record<string, VariableValue>, decls: VariableDecl[]) => CubeQuery;

/**
 * Build the core unit-aware {@link ValueFormatter}. `conversions` (storage-unit →
 * {@link UnitDef}) drives metric→imperial; omit it to use the built-in defaults.
 */
export declare function createUnitsFormatter(conversions?: Record<string, UnitDef>): ValueFormatter;

/**
 * Create a reactive store seeded from each decl's `default`, then overlaid with
 * any `seed` overrides. Only declared variables are tracked; a `set` to an unknown
 * name is still stored (so an Input bound to a not-yet-declared var degrades
 * gracefully), but only declared defaults seed the initial snapshot.
 */
export declare function createVariableStore(decls: VariableDecl[], seed?: Record<string, VariableValue>): VariableStore;

export declare function CubeChart({ query, chart, onState, editing }: CubeChartProps): ReactElement;

/**
 * The data-fetching wrapper around the pure {@link ChartRenderer}
 * (docs/03-override-theme-preview.md A3, A2.5). `CubeChart` is the JSON→UI surface
 * for a single chart: it fetches + normalizes via `useNormalizedSeries` (which
 * picks up dashboard variable resolution + noFilter automatically when inside a
 * `DashboardProvider`), resolves the family component from the registry, and hands
 * `NormalizedChartData` + `ChartOptions` to `ChartRenderer`.
 *
 * Everything semantic (fetch / castNumerics / Continue-wait polling / variable
 * substitution / annotation-driven formatting) happens below `useNormalizedSeries`;
 * the renderer only maps `NormalizedChartData` → Recharts. Loading / error / empty
 * pass straight through to `ChartRenderer`, which renders the shared state chrome.
 */
export declare interface CubeChartProps {
    /** The Cube query (may carry `{var}` tokens — resolved by the surrounding dashboard). */
    query: CubeQuery;
    /** The chart option envelope (family, mapping, axes, …). */
    chart: ChartOptions;
    /** Lifts the resolved rows + a refetch up to the chrome (for export / refresh). */
    onState?: (state: {
        rows: Record<string, unknown>[];
        refetch?: () => void;
        isLoading: boolean;
    }) => void;
    /** Editing surface: hidden chrome renders greyed (not removed) — see ChartComponentProps. */
    editing?: boolean;
}

/** Convenience wrapper that renders a standalone {@link ChartSpec}. */
export declare function CubeChartSpec({ spec }: CubeChartSpecProps): ReactElement;

export declare interface CubeChartSpecProps {
    /** A standalone chart spec; its `query` + `chart` drive the render. */
    spec: ChartSpec;
}

/**
 * The Cube transport layer. This is the only file in cube-viz that constructs a
 * `@cubejs-client/core` instance — everything downstream consumes a `CubeApi`.
 * See docs/01-spec-schema.md §6.
 *
 * The SDK owns the `Continue wait` long-poll loop and sets the raw JWT as the
 * `Authorization` header (no `Bearer ` prefix), which is exactly what Cube's
 * `/v1/load` expects. We never re-implement either.
 */
/** A constructed Cube API client. Aliased so downstream code never imports the SDK class directly. */
export declare type CubeClient = CubeApi;

/** Connection material, shape-compatible with `CubeConnectionWire` from `@/transport/types`. */
export declare interface CubeConnection {
    /** Full base URL, MUST include `/cubejs-api/v1`. */
    endpoint: string;
    /** Raw JWT, or a thunk that resolves one (refresh-friendly). */
    token: string | (() => Promise<string>);
    /** Extra headers (e.g. tracing) merged into every request. */
    headers?: Record<string, string>;
}

/**
 * The single seam between the cube-viz core and its host environment. The core
 * gets its spec/connection/theme/mode from a Transport and reports changes back.
 * Three implementations (browser, preview server, WebView) — one core.
 *
 * Defined here for the render core; the WebView/preview implementations land in
 * later milestones. See docs/04-webview-bridge.md §C3.
 */
export declare interface CubeConnectionWire {
    endpoint: string;
    token: string | (() => Promise<string>);
    headers?: Record<string, string>;
}

/**
 * The subset of Cube's `/meta` response cube-viz consumes: cubes/views with
 * their members. Returned by {@link fetchMeta}.
 */
export declare interface CubeMeta {
    cubes: Cube[];
    meta: Meta;
}

/** A cube or view entry for the CubePicker. */
declare interface CubeOption {
    name: string;
    title: string;
    /** "cube" | "view" — defaults to "cube" when meta omits `type`. */
    type: "cube" | "view";
    /** Join-graph id (see {@link MemberOption.connectedComponent}). */
    connectedComponent?: number;
}

export declare type CubeQuery = z.infer<typeof CubeQuerySchema>;

export declare const CubeQuerySchema: z.ZodObject<{
    measures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    timeDimensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        dimension: z.ZodString;
        granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
    }, "strict", z.ZodTypeAny, {
        dimension: string;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        compareDateRange?: (string | [string, string])[] | undefined;
    }, {
        dimension: string;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        compareDateRange?: (string | [string, string])[] | undefined;
    }>, "many">>;
    filters: z.ZodOptional<z.ZodArray<z.ZodType<QueryFilter, z.ZodTypeDef, QueryFilter>, "many">>;
    segments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    order: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>>;
    limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        var: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        var: string;
    }, {
        var: string;
    }>]>>;
    offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        var: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        var: string;
    }, {
        var: string;
    }>]>>;
    total: z.ZodOptional<z.ZodBoolean>;
    timezone: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    measures?: string[] | undefined;
    dimensions?: string[] | undefined;
    timeDimensions?: {
        dimension: string;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        compareDateRange?: (string | [string, string])[] | undefined;
    }[] | undefined;
    filters?: QueryFilter[] | undefined;
    segments?: string[] | undefined;
    order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
    limit?: number | {
        var: string;
    } | undefined;
    offset?: number | {
        var: string;
    } | undefined;
    total?: boolean | undefined;
    timezone?: string | undefined;
}, {
    measures?: string[] | undefined;
    dimensions?: string[] | undefined;
    timeDimensions?: {
        dimension: string;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        compareDateRange?: (string | [string, string])[] | undefined;
    }[] | undefined;
    filters?: QueryFilter[] | undefined;
    segments?: string[] | undefined;
    order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
    limit?: number | {
        var: string;
    } | undefined;
    offset?: number | {
        var: string;
    } | undefined;
    total?: boolean | undefined;
    timezone?: string | undefined;
}>;

/** The React context. `null` until a {@link CubeVizProvider} mounts above. */
export declare const CubeVizContext: Context<CubeVizContextValue | null>;

/** The full context value provided by {@link CubeVizProvider}. */
export declare interface CubeVizContextValue {
    /** The host-built Cube client. The token is held only inside this instance. */
    cubeClient: CubeClient;
    /** Component overrides; absent slots fall back to the built-ins. */
    registry: ComponentRegistry;
    /**
     * The immutable chart-family registry (builtins + host `families`). Built once by
     * the provider and carried here; read it via {@link useFamilyRegistry}. The single
     * source of truth for which families exist and how each behaves (dispatch / wells /
     * defaults / options schema), replacing the old module-global registry.
     */
    families: FamilyRegistry;
    /** Resolved locale / formatting config. */
    locale: ResolvedLocale;
    /** Resolved theme config. */
    theme: ResolvedTheme;
    /**
     * Host-injected Google Maps config for the `map` chart family. `undefined` (or an
     * absent `apiKey`) ⇒ the map renders a graceful placeholder instead of crashing.
     */
    maps?: ResolvedMaps;
}

/** Host-supplied locale / formatting config. */
export declare type CubeVizLocaleConfig = ResolvedLocale;

/**
 * Host-supplied Google Maps config for the `map` chart family. The host injects its
 * own Google Maps JS API key here (e.g. from `GOOGLE_API_KEY`); the library never
 * hardcodes, stores, or logs it — it only forwards it to `<APIProvider>`. Omit it
 * (or its `apiKey`) and the map family renders a graceful placeholder.
 */
export declare type CubeVizMapsConfig = ResolvedMaps;

export declare function CubeVizProvider({ cube, theme, locale, maps, registry, families, children, }: CubeVizProviderProps): React_2.ReactElement;

export declare interface CubeVizProviderProps {
    /**
     * Cube access — either a fully-built {@link CubeClient} (a `@cubejs-client/core`
     * CubeApi) the host already constructed, or a {@link CubeConnection} the library
     * turns into one. Either way the token is host-owned; the library only forwards it.
     */
    cube: CubeClient | CubeConnection;
    /** Theme token/ramp/mode overrides. */
    theme?: CubeVizThemeConfig;
    /** Locale / formatting / unit-system / timezone config. */
    locale?: CubeVizLocaleConfig;
    /**
     * Google Maps config (api key / map id) for the `map` chart family. Host-owned;
     * the library only forwards it. Absent ⇒ maps degrade to a placeholder.
     */
    maps?: CubeVizMapsConfig;
    /** Component overrides; absent slots fall back to the built-ins. */
    registry?: ComponentRegistry;
    /**
     * Host-registered chart families (the extension point now that `map` is no longer
     * builtin — a host ships its own `map` descriptor here). Built into an immutable
     * {@link FamilyRegistry} (builtins first, then these augment/override by
     * `descriptor.family`) and carried through context, so they appear in the type
     * picker, are editable (wells/placement/customize), validate (optionsSchema/defaults),
     * and render (component). The registry is memoized by the families' CONTENT (the
     * family keys), so a fresh array literal each render (`families={[mapDescriptor]}`)
     * does NOT churn the registry identity.
     */
    families?: ChartFamilyDescriptor[];
    children: React_2.ReactNode;
}

/**
 * The single config surface (docs/03-override-theme-preview.md §A1.4). One context
 * provider supplies the Cube client, theme, locale, and component-override registry.
 *
 * **Credential discipline (non-negotiable):** the library never mints, stores,
 * persists, or logs credentials. When given a {@link CubeConnection} it builds a
 * client via {@link createCubeClient}, forwarding the host-owned token (or thunk)
 * unmodified — the token lives only in memory for the provider's lifetime. RLS /
 * tenancy stays entirely in the host's JWT; no prop here can widen tenant scope.
 */
/** Host-supplied theme overrides (token *names* only, never raw colors). */
export declare interface CubeVizThemeConfig {
    /** Override the default series ramp order/contents. */
    chartRamp?: ChartColorToken[];
    /** Force a mode; "system" (default) defers to the host's existing dark selector. */
    mode?: "light" | "dark" | "system";
}

export declare function Dashboard({ spec, editable, families }: DashboardProps): ReactElement;

/**
 * The dashboard variable layer (docs/03-override-theme-preview.md §A2.5): a React
 * adapter over the framework-free {@link createVariableStore}, wiring the three-
 * legged binding model. `DashboardProvider` owns one store seeded from the spec's
 * `VariableDecl[]` defaults; `useDashboard` reads it reactively and exposes:
 *
 *  - `vars`         — current store snapshot (re-renders on every `set`)
 *  - `setVar`       — Leg 1 write
 *  - `resolveQuery` — Leg 2: substitute `{var}` tokens + apply the noFilter rule
 *  - `resolveValue` — Leg 3: read one variable back (store → decl default)
 *
 * The same context is consumed optionally by {@link useNormalizedSeries}, so a
 * widget inside a `DashboardProvider` automatically picks up variable resolution.
 */
/** The reactive dashboard API surfaced by {@link useDashboard}. */
export declare interface DashboardContextValue {
    /**
     * Current store snapshot. NOTE: reading this on the context value is a point-in-time
     * read — it is NOT reactive by itself. Components that must re-render when a variable
     * changes should call {@link useDashboardVar} (a per-name subscription) or
     * {@link resolveValue} inside a component that subscribes; depending on this object's
     * `vars` no longer forces a board-wide re-render on every `setVar`.
     */
    vars: Record<string, VariableValue>;
    /** Leg 1: write a variable (`undefined` clears it back toward its default). */
    setVar: (name: string, value: VariableValue | undefined) => void;
    /** Leg 2: resolve a query (substitute `{var}` + drop emptied predicates). */
    resolveQuery: (query: CubeQuery) => CubeQuery;
    /** Leg 3: read one variable back (store value → decl default → undefined). */
    resolveValue: (name: string) => VariableValue | undefined;
    /** The declarations backing the store (for control UIs / validation). */
    decls: VariableDecl[];
}

export declare function DashboardEditor({ spec, remoteSpec, onRemoteAdopted, onChange, onSave, newId, debounceMs, onUndo, onRedo, canUndo, canRedo, onDiscard, families, className, }: DashboardEditorProps): React_2.ReactElement;

/**
 * DashboardEditor (docs/03 §A3.2) — the JSON-in / JSON-out dashboard editor.
 *
 * `spec` is a {@link DashboardSpec}; every edit produces a new `DashboardSpec` and
 * fires `onChange` (debounced). `onSave` receives the spec re-validated through
 * {@link DashboardSpecSchema}. The editor itself NEVER persists — the host owns I/O.
 *
 * Layout: an {@link EditorShell} in `canvas-panel` mode — WIDE docks an edit panel
 * to the right and the {@link EditorCanvas} reflows into the remaining width; NARROW
 * stacks a full-width inline panel above the canvas (NO native sheet), so the same
 * web build edits correctly inside a mobile WebView. Selecting a widget opens its
 * editor in the panel; with nothing selected the panel shows dashboard variables.
 *
 * The canvas captures RGL drag/resize and writes back the single canonical (widest)
 * `spec.layout`, preserving each item's `minW`/`minH`/`static`.
 */
export declare interface DashboardEditorProps {
    /** The dashboard spec to edit (JSON-in). Identity change = a host re-seed (undo/
     *  redo / discard / switching dashboards) — it fully replaces the working draft. */
    spec: DashboardSpec;
    /**
     * Live-collaboration channel: a merged spec from OTHER editors. The host passes it
     * ONLY for genuine remote revisions (never this client's own echoes). When it
     * changes, its widgets/layout are merged into the local draft once the user is
     * momentarily idle — preserving the widget under active edit so a collaborator's
     * change never yanks the widget out from under your cursor. In-place (no remount).
     * Distinct from `spec`, which is a hard re-seed.
     */
    remoteSpec?: DashboardSpec;
    /**
     * Called when a {@link remoteSpec} is merged into the local draft, with the merged
     * result. NOT a user edit (so it isn't echoed back out) — the host uses it to keep
     * its diff base in sync with what the editor now shows.
     */
    onRemoteAdopted?: (spec: DashboardSpec) => void;
    /**
     * Called on every edit with the next spec (debounced by {@link debounceMs}). The
     * editor writes nothing itself — wire this to your store/preview.
     */
    onChange?: (spec: DashboardSpec) => void;
    /**
     * Called when the user clicks Save, with the spec re-validated through
     * {@link DashboardSpecSchema}. Omit to hide the Save button.
     */
    onSave?: (spec: DashboardSpec) => void;
    /**
     * Mint new widget ids. Defaults to a per-mount counter (`w-1`, `w-2`, …) — never
     * `Math.random`/`Date.now` at module scope, so SSR + tests stay deterministic.
     */
    newId?: IdFactory;
    /** `onChange` debounce in ms. Default 300. */
    debounceMs?: number;
    /**
     * Edit-history controls, surfaced in the toolbar. cube-viz is intentionally
     * history-less; the HOST owns the undo/redo stack (it re-seeds `spec` on
     * undo/redo) and passes the handlers + enablement here so the controls live in
     * the one unified toolbar. Buttons hidden when the handlers are omitted.
     */
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    /** Throw away unsaved changes (host clears its draft + re-seeds the published spec). */
    onDiscard?: () => void;
    /**
     * Per-component chart-families override. When set, the editor's subtree resolves
     * families from `defaultChartFamilies` + these descriptors (augmenting the provider's
     * families just for this editor); the rest of the context is inherited unchanged.
     */
    families?: ChartFamilyDescriptor[];
    className?: string;
}

export declare interface DashboardProps {
    /** The dashboard spec (variables + widgets + canonical layout + grid). */
    spec: DashboardSpec;
    /** Edit mode: enables drag/resize (handle = chrome header). Default `false`. */
    editable?: boolean;
    /**
     * Per-component chart-families override. When set, this dashboard's subtree resolves
     * families from a registry built from `defaultChartFamilies` + these descriptors —
     * augmenting the provider's families just for this dashboard (the rest of the context
     * is inherited unchanged). Omit to inherit the provider's families.
     */
    families?: ChartFamilyDescriptor[];
}

/**
 * Provide a reactive variable store seeded from a dashboard's declarations. The
 * store is created once per provider instance (keyed by decl identity) and
 * survives re-renders; `setVar` mutations re-render consumers via
 * `useSyncExternalStore`.
 */
export declare function DashboardProvider({ spec, initialValues, children, }: DashboardProviderProps): ReactElement;

export declare interface DashboardProviderProps {
    /** The dashboard whose `variables` seed the store (uses `spec.variables`). */
    spec: DashboardSpec;
    /** Optional initial overrides layered over the decl defaults. */
    initialValues?: Record<string, VariableValue>;
    children: ReactNode;
}

export declare type DashboardSpec = z.infer<typeof DashboardSpecSchema>;

export declare const DashboardSpecSchema: z.ZodObject<{
    kind: z.ZodLiteral<"dashboard">;
    variables: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["dateRange", "time", "granularity", "string", "number", "boolean", "dimension", "measure", "dimensionOrMeasure"]>;
        label: z.ZodOptional<z.ZodString>;
        array: z.ZodOptional<z.ZodBoolean>;
        default: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
    }, "strict", z.ZodTypeAny, {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }, {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }>, "many">;
    widgets: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"chart">;
        query: z.ZodObject<{
            measures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            timeDimensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                dimension: z.ZodString;
                granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
                    var: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    var: string;
                }, {
                    var: string;
                }>]>>;
                dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
                    var: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    var: string;
                }, {
                    var: string;
                }>]>>;
                compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
            }, "strict", z.ZodTypeAny, {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }, {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }>, "many">>;
            filters: z.ZodOptional<z.ZodArray<z.ZodType<QueryFilter, z.ZodTypeDef, QueryFilter>, "many">>;
            segments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            order: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>>;
            limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            total: z.ZodOptional<z.ZodBoolean>;
            timezone: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        }, {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        }>;
        chart: z.ZodObject<{
            family: z.ZodString;
            /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
             carry their own mapping inside familyOptions, so this is optional at the envelope. */
            mapping: z.ZodOptional<z.ZodObject<{
                category: z.ZodObject<{
                    member: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    member: string;
                }, {
                    member: string;
                }>;
                series: z.ZodUnion<[z.ZodObject<{
                    mode: z.ZodLiteral<"measures">;
                    members: z.ZodArray<z.ZodString, "many">;
                    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodOptional<z.ZodString>;
                        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                        stackId: z.ZodOptional<z.ZodString>;
                        axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                        /** Per-series line shape (line/area) — overrides the family default. */
                        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                        /** Per-series point markers (line/area) — overrides the family default. */
                        dots: z.ZodOptional<z.ZodBoolean>;
                        format: z.ZodOptional<z.ZodObject<{
                            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                            decimals: z.ZodOptional<z.ZodNumber>;
                            abbreviate: z.ZodOptional<z.ZodBoolean>;
                            prefix: z.ZodOptional<z.ZodString>;
                            suffix: z.ZodOptional<z.ZodString>;
                            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                            dateFormat: z.ZodOptional<z.ZodString>;
                            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                            currency: z.ZodOptional<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }>>;
                    }, "strict", z.ZodTypeAny, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }>>>;
                }, "strict", z.ZodTypeAny, {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }, {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }>, z.ZodObject<{
                    mode: z.ZodLiteral<"pivot">;
                    /** The primary split measure — drives the value-axis unit. Always set
                     *  (also the only value when a single measure is split by colour). */
                    value: z.ZodString;
                    /** When MORE THAN ONE measure is split by the colour dimension, the full
                     *  ordered measure list (series = measure × pivot value). `value` is
                     *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
                    values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    pivot: z.ZodString;
                    /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
                     *  each measure's series sit on, so a multi-measure color split can be
                     *  dual-axis (each axis one unit). */
                    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodOptional<z.ZodString>;
                        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                        stackId: z.ZodOptional<z.ZodString>;
                        axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                        /** Per-series line shape (line/area) — overrides the family default. */
                        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                        /** Per-series point markers (line/area) — overrides the family default. */
                        dots: z.ZodOptional<z.ZodBoolean>;
                        format: z.ZodOptional<z.ZodObject<{
                            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                            decimals: z.ZodOptional<z.ZodNumber>;
                            abbreviate: z.ZodOptional<z.ZodBoolean>;
                            prefix: z.ZodOptional<z.ZodString>;
                            suffix: z.ZodOptional<z.ZodString>;
                            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                            dateFormat: z.ZodOptional<z.ZodString>;
                            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                            currency: z.ZodOptional<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }>>;
                    }, "strict", z.ZodTypeAny, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }>>>;
                }, "strict", z.ZodTypeAny, {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }, {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }>]>;
            }, "strict", z.ZodTypeAny, {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            }, {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            }>>;
            orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal"]>>;
            stackMode: z.ZodOptional<z.ZodEnum<["none", "stacked", "grouped", "percent"]>>;
            legend: z.ZodOptional<z.ZodObject<{
                show: z.ZodOptional<z.ZodBoolean>;
                position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
            }, "strict", z.ZodTypeAny, {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            }, {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            }>>;
            tooltip: z.ZodOptional<z.ZodObject<{
                show: z.ZodOptional<z.ZodBoolean>;
                indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
                showTotal: z.ZodOptional<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            }, {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            }>>;
            axes: z.ZodOptional<z.ZodObject<{
                x: z.ZodOptional<z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                    labelHide: z.ZodOptional<z.ZodBoolean>;
                    hide: z.ZodOptional<z.ZodBoolean>;
                    scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                    domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                    tickFormat: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>;
                y: z.ZodOptional<z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                    labelHide: z.ZodOptional<z.ZodBoolean>;
                    hide: z.ZodOptional<z.ZodBoolean>;
                    scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                    domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                    tickFormat: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>;
                y2: z.ZodOptional<z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                    labelHide: z.ZodOptional<z.ZodBoolean>;
                    hide: z.ZodOptional<z.ZodBoolean>;
                    scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                    domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                    tickFormat: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            }, {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            }>>;
            colors: z.ZodOptional<z.ZodObject<{
                byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
                ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
            }, "strict", z.ZodTypeAny, {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            }, {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            }>>;
            format: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
            /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
            familyOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strict", z.ZodTypeAny, {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        }, {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        }>;
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    }, {
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
        doc: z.ZodType<{
            type: string;
            content?: unknown[];
        }, z.ZodTypeDef, {
            type: string;
            content?: unknown[];
        }>;
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    }, {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"input">;
        control: z.ZodObject<{
            variable: z.ZodString;
            control: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"dateRange">;
                presets: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                allowFuture: z.ZodOptional<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            }, {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"granularity">;
                options: z.ZodOptional<z.ZodArray<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, "many">>;
                /** A dateRange variable whose span narrows the offered granularities. */
                rangeVariable: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            }, {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"select">;
                options: z.ZodArray<z.ZodObject<{
                    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>;
                    label: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }, {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }>, "many">;
                multiple: z.ZodOptional<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            }, {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"memberSelect">;
                from: z.ZodEnum<["dimension", "measure", "dimensionOrMeasure"]>;
                cube: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            }, {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"text">;
                placeholder: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                kind: "text";
                placeholder?: string | undefined;
            }, {
                kind: "text";
                placeholder?: string | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"number">;
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                step: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            }, {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"toggle">;
            }, "strict", z.ZodTypeAny, {
                kind: "toggle";
            }, {
                kind: "toggle";
            }>]>;
        }, "strict", z.ZodTypeAny, {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        }, {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        }>;
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    }, {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    }>]>, "many">;
    layout: z.ZodArray<z.ZodObject<{
        i: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        w: z.ZodNumber;
        h: z.ZodNumber;
        minW: z.ZodOptional<z.ZodNumber>;
        minH: z.ZodOptional<z.ZodNumber>;
        static: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }, {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }>, "many">;
    grid: z.ZodOptional<z.ZodObject<{
        cols: z.ZodOptional<z.ZodNumber>;
        rowHeight: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
        containerPadding: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
    }, "strict", z.ZodTypeAny, {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    }, {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    }>>;
    schemaVersion: z.ZodLiteral<1>;
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    kind: "dashboard";
    id: string;
    schemaVersion: 1;
    variables: {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }[];
    widgets: ({
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    } | {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    } | {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    })[];
    layout: {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }[];
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    grid?: {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    } | undefined;
}, {
    kind: "dashboard";
    id: string;
    schemaVersion: 1;
    variables: {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }[];
    widgets: ({
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    } | {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    } | {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    })[];
    layout: {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }[];
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    grid?: {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    } | undefined;
}>;

/**
 * Resolve the date pattern: an explicit `format.dateFormat` wins, otherwise the
 * per-granularity default, otherwise {@link DEFAULT_DATE_PATTERN}.
 */
export declare function datePattern(format?: FormatOptions, granularity?: Granularity): string;

export declare type DateRange = z.infer<typeof DateRangeSchema>;

/** Absolute `[from, to]` pair OR a relative string like "last 30 days" / "This month". */
export declare const DateRangeSchema: z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>;

/**
 * Deep-merge `override` over `base`: objects recurse, **arrays replace wholesale**,
 * scalars/undefined-aware (an explicit `undefined` does not clobber a base value).
 */
export declare function deepMerge<T>(base: T, override: unknown): T;

/** The default 5-token shadcn ramp, used when `ColorAssignment.ramp` is absent. */
export declare const DEFAULT_COLOR_RAMP: ChartColorToken[];

/** Mirror of {@link Dashboard}'s default grid column count (12). */
export declare const DEFAULT_COLS = 12;

/**
 * The default metric-storage-unit → imperial display rule table. EXTENSIBLE: hosts
 * add or override entries through the provider `units` prop. Keys match the Cube
 * `meta.unit` value (the storage unit). Conversions run through convert-units;
 * fuel economy (km/L↔mpg) is kept as an explicit factor because convert-units has
 * no fuel-economy measure.
 */
export declare const DEFAULT_UNIT_CONVERSIONS: Record<string, UnitDef>;

/**
 * The eight builtin families, in picker (`order`) order. Pass to
 * {@link import("@/provider").CubeVizProvider} `families` to compose, or spread into a
 * host list. The default the registry is seeded from.
 */
export declare const defaultChartFamilies: readonly ChartFamilyDescriptor[];

export declare const defaultFormatter: ValueFormatter;

/** Per-type sensible default value when a variable's `type` changes. */
export declare function defaultForType(type: VariableDecl["type"]): VariableDecl["default"];

/** The RGL drag-handle class — Dashboard passes this as `draggableHandle`. */
export declare const DRAG_HANDLE_CLASS = "cube-viz-drag-handle";

/**
 * The canvas renders a live CubeChart per widget, so it is the single most expensive
 * subtree in the editor. Memoize it so unrelated DashboardEditor re-renders (e.g. the
 * deferred whole-dashboard validation settling, or a selection change handled by
 * stable callbacks) don't reconcile the whole grid — it re-renders only when its own
 * props (the draft spec / selection / handlers) actually change identity.
 */
export declare const EditorCanvas: React_2.MemoExoticComponent<typeof EditorCanvasImpl>;

declare function EditorCanvasImpl({ spec, selectedId, onSelect, onEdit, onDuplicate, onDelete, onLayoutChange, }: EditorCanvasProps): React_2.ReactElement;

export declare interface EditorCanvasProps {
    spec: DashboardSpec;
    /** Currently-selected widget id (rings + opens the edit panel). */
    selectedId: string | null;
    onSelect: (id: string) => void;
    /** A widget's edit button was clicked (opens the full-screen editor). */
    onEdit: (id: string) => void;
    /** A widget's duplicate button was clicked. */
    onDuplicate: (id: string) => void;
    /** A widget's delete button was clicked. */
    onDelete: (id: string) => void;
    /** Canonical (widest) layout captured from a drag/resize. */
    onLayoutChange: (layout: LayoutItem[]) => void;
}

export declare function EditorToolbar({ name, onNameChange, onAdd, onEditVariables, onUndo, onRedo, canUndo, canRedo, onDiscard, discardDisabled, onSave, saveDisabled, className, }: EditorToolbarProps): React_2.ReactElement;

/**
 * The dashboard editor toolbar (docs/03 §A3.2): the single, unified control bar for
 * editing — the dashboard name, the add-widget buttons (chart / text / input /
 * variables), and the edit-session actions (Undo / Redo / Discard / Save) grouped on
 * the right. Wraps to extra rows on a narrow container so it stays usable in a mobile
 * WebView. Purely presentational — every action is a callback; history (undo/redo) and
 * persistence (save/discard) are owned by the host and surfaced here as props.
 */
export declare interface EditorToolbarProps {
    name: string;
    onNameChange: (name: string) => void;
    onAdd: (type: WidgetSpec["type"]) => void;
    /** Open the dashboard-variables editor (full-screen). */
    onEditVariables?: () => void;
    /** Step back/forward through edit history. Buttons hidden if the handler is omitted. */
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    /** Throw away unsaved changes (revert to the last saved/published spec). */
    onDiscard?: () => void;
    /** Disable Discard when there's nothing to revert. */
    discardDisabled?: boolean;
    /** Omit to hide the Save button (host saves elsewhere). */
    onSave?: () => void;
    /** Disables Save (e.g. while the spec fails validation). */
    saveDisabled?: boolean;
    className?: string;
}

/**
 * The MINIMAL default {@link ValueFormatter} cube-viz ships when a host does not
 * supply one. It intentionally does NOT convert units (km→mi), humanize durations,
 * or apply quantity rules — those are host policy via `provider.locale.formatValue`.
 *
 * Rules:
 *  - null / undefined / NaN          → "—"
 *  - role "category" or a date-ish   → date via date-fns (format.dateFormat or a
 *    value (ISO string / Date /         per-granularity default pattern)
 *    number+granularity)
 *  - number                          → Intl.NumberFormat honoring
 *                                      format.decimals / abbreviate / prefix /
 *                                      suffix, with `meta.unit` appended as a
 *                                      PLAIN suffix when present (no conversion)
 *  - string / boolean                → String()
 *
 * Pure + framework-free. See docs/02-chart-options.md §5.
 */
export declare const EM_DASH = "\u2014";

/** The neutral default for a family that has none registered (no envelope, no opts). */
export declare const EMPTY_FAMILY_DEFAULT: FamilyDefault;

/** The error state slot. Never receives tenant data — message only. */
export declare type ErrorStateComponent = React_2.ComponentType<ErrorStateProps>;

/** Props the error state receives — the surfaced (message-only) error. */
export declare interface ErrorStateProps {
    error: Error;
}

/** A family default = an envelope slice + a complete familyOptions object. */
export declare interface FamilyDefault {
    envelope: Partial<ChartOptions>;
    familyOptions: Record<string, unknown>;
}

/**
 * An immutable chart-family registry: the runtime single source of truth for which
 * families exist and how each behaves. Built once by {@link buildFamilyRegistry} and
 * carried through context — every reader holds the same frozen instance (stable
 * identity, so it can sit in `useMemo` deps without churn).
 */
export declare interface FamilyRegistry {
    /** The descriptor for `family`, or `undefined` if no such family is registered. */
    get(family: ChartFamily): ChartFamilyDescriptor | undefined;
    /**
     * The descriptor for `family` (the single dispatch point). Throws on an unknown
     * family — every editor/render path that calls this has already resolved a real
     * family, so an unknown key is a programming error worth failing loudly on.
     */
    require(family: ChartFamily): ChartFamilyDescriptor;
    /** All registered descriptors, sorted by `order` (ascending), then key for ties. */
    list(): ChartFamilyDescriptor[];
    /** All registered family keys, in picker order. */
    families(): ChartFamily[];
    /** The family's total defaults (envelope + familyOptions); empty for an unknown family. */
    defaults(family: ChartFamily): FamilyDefault;
    /** The zod schema validating a family's `familyOptions`; permissive for unknown. */
    optionsSchema(family: ChartFamily): z.ZodTypeAny;
    /** Resolve a chart's options against ITS family's defaults (host resolves like a builtin). */
    resolveOptions(options: ChartOptions): ChartOptions;
}

/**
 * A per-component chart-families override. When a `families` array is given, it
 * re-publishes the parent {@link CubeVizContext} value with ONLY its `families` field
 * replaced by a registry built from those descriptors (builtins first, then the
 * override augments/overrides by key) — every other context field (cubeClient /
 * registry / locale / theme / maps) is spread through unchanged, so the Cube client is
 * never blanked. With no override it renders children inheriting the provider's
 * registry untouched.
 *
 * This is the safe implementation of the per-component `families?` prop on
 * {@link import("@/render").Dashboard} / `ChartView` / `DashboardEditor`: it reads the
 * surrounding provider rather than building a second, divergent merge path.
 */
export declare function FamilyRegistryOverride({ families, children, }: {
    families?: ChartFamilyDescriptor[];
    children: ReactNode;
}): ReactElement;

/**
 * Fetch `/v1/meta` and return the cubes/views list alongside the raw `Meta`
 * helper (for `resolveMember`, `membersGroupedByCube`, etc.). The member editor
 * reads real member names from here — they are never guessed.
 */
export declare function fetchMeta(api: CubeClient): Promise<CubeMeta>;

/**
 * Chart Builder v2 — the PURE seam (no React). It is the single place that knows
 * the typed-well ↔ {@link ChartSpec} mapping (docs/05 §2). Every writer returns a
 * FULL `ChartSpec`, so the panel funnels each edit through the unchanged
 * `update → validate → debounce-emit` engine. Unit-testable in isolation.
 */
/** A field's primitive role: a measure / a non-time dimension / a time dimension. */
export declare type FieldKind = "number" | "category" | "time";

export declare function FilterBuilder({ cube, cubes, scope, value, onChange, disabled, className, }: FilterBuilderProps): React_2.ReactElement;

/**
 * Leaf-filter list builder (docs/03 §A3.1 step 5). Edits the flat list of leaf
 * predicates on a query — the editor's common case. The member's primitive `type`
 * (read from `/v1/meta`) drives the operator list; valueless operators (`set`/
 * `notSet`) hide the value input. Nested `and`/`or` groups in an existing query are
 * preserved verbatim (passed through untouched), so this never silently drops them.
 *
 * Values are edited as a comma-separated string and emitted as `string[]`. Cube
 * coerces by member type at query time, so we keep them as strings here (no guessing
 * numeric vs. string — the same discipline the rest of the editor follows).
 */
export declare interface FilterBuilderProps {
    /** Owning cube/view; restricts the member picker to that source. */
    cube?: string;
    /**
     * Joinable cross-table scope: when set, filters may target any field in the chart's
     * join graph (e.g. filter a `device_trips` chart by `devices.name`). Overrides `cube`.
     */
    cubes?: string[];
    /**
     * The chart's cross-table join scope. When provided, the Field selector uses the
     * rich {@link FieldPickerPopover} (matching the axis wells); without it, falls back
     * to the plain {@link MemberPicker} (standalone/host use).
     */
    scope?: JoinScope;
    /** The query's current `filters` (may be undefined). */
    value?: QueryFilter[];
    onChange: (filters: QueryFilter[] | undefined) => void;
    disabled?: boolean;
    className?: string;
}

export declare type FilterOperator = z.infer<typeof FilterOperatorSchema>;

export declare const FilterOperatorSchema: z.ZodEnum<["equals", "notEquals", "gt", "gte", "lt", "lte", "contains", "notContains", "startsWith", "endsWith", "set", "notSet", "inDateRange", "notInDateRange", "beforeDate", "beforeOrOnDate", "afterDate", "afterOrOnDate", "measureFilter"]>;

/* Excluded from this release type: formatCategory */

/* Excluded from this release type: FormatCategoryOptions */

/**
 * The full context handed to a {@link ValueFormatter}. It carries the raw value,
 * the member it belongs to (with its annotation meta + title), the rendering role,
 * the spec's {@link FormatOptions}, and the resolved locale/unit-system so a host
 * can implement any policy it likes without re-reading the annotation.
 */
export declare interface FormatContext {
    /** The raw value to format. */
    value: number | string | null | undefined;
    /** Fully-qualified Cube member (series key / measure / dimension / column), when known. */
    member?: string;
    /** Member meta from the Cube annotation. */
    meta?: MemberMeta;
    /** Member shortTitle/title from the annotation, for label-style formatting. */
    title?: string;
    /** The rendering surface. */
    role: FormatRole;
    /** The spec's resolved FormatOptions (decimals/abbreviate/prefix/suffix/dateFormat/kind…). */
    format?: FormatOptions;
    /** Granularity of a time-dimension category bucket, when applicable. */
    granularity?: Granularity;
    /** BCP-47 locale tag, e.g. "en-US". */
    locale?: string;
    /** Resolved host unit system; a host formatter keys conversion off this. */
    unitSystem?: "metric" | "imperial";
}

/**
 * Format a date value with the resolved pattern. Accepts an ISO string, an
 * epoch-millis number, or a Date; returns `String(value)` when it does not parse.
 */
export declare function formatDateValue(value: string | number | Date, format?: FormatOptions, granularity?: Granularity): string;

export declare type FormatKind = z.infer<typeof FormatKindSchema>;

export declare const FormatKindSchema: z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>;

export declare type FormatOptions = z.infer<typeof FormatOptionsSchema>;

export declare const FormatOptionsSchema: z.ZodObject<{
    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
    decimals: z.ZodOptional<z.ZodNumber>;
    abbreviate: z.ZodOptional<z.ZodBoolean>;
    prefix: z.ZodOptional<z.ZodString>;
    suffix: z.ZodOptional<z.ZodString>;
    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
    dateFormat: z.ZodOptional<z.ZodString>;
    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
    currency: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    currency?: string | undefined;
    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
    decimals?: number | undefined;
    abbreviate?: boolean | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    unitSystem?: "metric" | "imperial" | undefined;
    dateFormat?: string | undefined;
}, {
    currency?: string | undefined;
    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
    decimals?: number | undefined;
    abbreviate?: boolean | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    unitSystem?: "metric" | "imperial" | undefined;
    dateFormat?: string | undefined;
}>;

/**
 * The host-pluggable value-formatting contract for cube-viz.
 *
 * cube-viz does NOT hardcode unit conversion (km→mi), duration humanization, or
 * quantity rules. Those are host policy: a host supplies a {@link ValueFormatter}
 * (via the provider's `locale.formatValue`) and the library ships only a MINIMAL
 * default ({@link import("./default").defaultFormatter}). Every layer — families,
 * axes, tooltips, KPIs, tables — formats through one resolved {@link ChartFormat}.
 *
 * See docs/02-chart-options.md §5 and docs/01-spec-schema.md §3.3.
 */
/** Where a value is being rendered. Lets a host vary formatting by surface. */
export declare type FormatRole = "value" | "axis" | "tooltip" | "label" | "category" | "kpi";

export declare type Granularity = z.infer<typeof GranularitySchema>;

/** Default date-fns patterns per granularity bucket. */
export declare const GRANULARITY_PATTERN: Record<Granularity, string>;

export declare const GranularitySchema: z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>;

export declare type GridConfig = z.infer<typeof GridConfigSchema>;

export declare const GridConfigSchema: z.ZodObject<{
    cols: z.ZodOptional<z.ZodNumber>;
    rowHeight: z.ZodOptional<z.ZodNumber>;
    margin: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
    containerPadding: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
}, "strict", z.ZodTypeAny, {
    cols?: number | undefined;
    rowHeight?: number | undefined;
    margin?: [number, number] | undefined;
    containerPadding?: [number, number] | undefined;
}, {
    cols?: number | undefined;
    rowHeight?: number | undefined;
    margin?: [number, number] | undefined;
    containerPadding?: [number, number] | undefined;
}>;

/**
 * Factories for new widgets / variables (docs/03 §A3.2 "Add"). Every blank widget
 * is a VALID, minimal `WidgetSpec` so the canvas can render it immediately and the
 * spec stays schema-valid before the user edits anything.
 *
 * Ids come from a caller-supplied {@link IdFactory} (the editor's `newId` prop) —
 * we never call `Math.random()`/`Date.now()` at module scope (deterministic SSR +
 * test-friendly). The default factory is a closure-counter the editor instantiates
 * once per mount.
 */
/** Produces unique widget ids. The editor's `newId` prop. */
export declare type IdFactory = () => string;

export declare type InputControl = z.infer<typeof InputControlSchema>;

/** An input-control override component. */
export declare type InputControlComponent = React_2.ComponentType<InputControlProps>;

export declare type InputControlKind = z.infer<typeof InputControlKindSchema>;

export declare const InputControlKindSchema: z.ZodEnum<["dateRange", "granularity", "select", "memberSelect", "text", "number", "toggle"]>;

/**
 * An input control is a pure value editor bound to one dashboard variable
 * (Leg 1 write / Leg 3 read-back of the binding model). It never sees the Cube
 * client or the token, and it can only write its own declared variable — so a
 * custom control can never widen tenant scope.
 */
export declare interface InputControlProps<V extends VariableValue = VariableValue> {
    /** Current store value (Leg 3 read-back). */
    value: V | undefined;
    /** Writes `store[control.variable]` (Leg 1). */
    onChange: (next: V | undefined) => void;
    /** The variable declaration: type/array/label/default for validation + UI. */
    decl: VariableDecl;
    /** Kind-specific config (presets, options, min/max, …). */
    control: InputControl["control"];
    /** Id for the focusable element, so the field's `<label htmlFor>` associates (a11y). */
    controlId?: string;
}

export declare const InputControlSchema: z.ZodObject<{
    variable: z.ZodString;
    control: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"dateRange">;
        presets: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        allowFuture: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        kind: "dateRange";
        presets?: string[] | undefined;
        allowFuture?: boolean | undefined;
    }, {
        kind: "dateRange";
        presets?: string[] | undefined;
        allowFuture?: boolean | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"granularity">;
        options: z.ZodOptional<z.ZodArray<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, "many">>;
        /** A dateRange variable whose span narrows the offered granularities. */
        rangeVariable: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        kind: "granularity";
        options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
        rangeVariable?: string | undefined;
    }, {
        kind: "granularity";
        options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
        rangeVariable?: string | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"select">;
        options: z.ZodArray<z.ZodObject<{
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>;
            label: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            value: string | number | boolean | [string, string] | string[] | number[];
            label: string;
        }, {
            value: string | number | boolean | [string, string] | string[] | number[];
            label: string;
        }>, "many">;
        multiple: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        options: {
            value: string | number | boolean | [string, string] | string[] | number[];
            label: string;
        }[];
        kind: "select";
        multiple?: boolean | undefined;
    }, {
        options: {
            value: string | number | boolean | [string, string] | string[] | number[];
            label: string;
        }[];
        kind: "select";
        multiple?: boolean | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"memberSelect">;
        from: z.ZodEnum<["dimension", "measure", "dimensionOrMeasure"]>;
        cube: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        kind: "memberSelect";
        from: "dimension" | "measure" | "dimensionOrMeasure";
        cube?: string | undefined;
    }, {
        kind: "memberSelect";
        from: "dimension" | "measure" | "dimensionOrMeasure";
        cube?: string | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"text">;
        placeholder: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        kind: "text";
        placeholder?: string | undefined;
    }, {
        kind: "text";
        placeholder?: string | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"number">;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        step: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        kind: "number";
        step?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        kind: "number";
        step?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"toggle">;
    }, "strict", z.ZodTypeAny, {
        kind: "toggle";
    }, {
        kind: "toggle";
    }>]>;
}, "strict", z.ZodTypeAny, {
    variable: string;
    control: {
        kind: "dateRange";
        presets?: string[] | undefined;
        allowFuture?: boolean | undefined;
    } | {
        kind: "granularity";
        options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
        rangeVariable?: string | undefined;
    } | {
        options: {
            value: string | number | boolean | [string, string] | string[] | number[];
            label: string;
        }[];
        kind: "select";
        multiple?: boolean | undefined;
    } | {
        kind: "memberSelect";
        from: "dimension" | "measure" | "dimensionOrMeasure";
        cube?: string | undefined;
    } | {
        kind: "text";
        placeholder?: string | undefined;
    } | {
        kind: "number";
        step?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
    } | {
        kind: "toggle";
    };
}, {
    variable: string;
    control: {
        kind: "dateRange";
        presets?: string[] | undefined;
        allowFuture?: boolean | undefined;
    } | {
        kind: "granularity";
        options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
        rangeVariable?: string | undefined;
    } | {
        options: {
            value: string | number | boolean | [string, string] | string[] | number[];
            label: string;
        }[];
        kind: "select";
        multiple?: boolean | undefined;
    } | {
        kind: "memberSelect";
        from: "dimension" | "measure" | "dimensionOrMeasure";
        cube?: string | undefined;
    } | {
        kind: "text";
        placeholder?: string | undefined;
    } | {
        kind: "number";
        step?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
    } | {
        kind: "toggle";
    };
}>;

export declare type InputWidget = z.infer<typeof InputWidgetSchema>;

export declare function InputWidgetEditor({ widget, variables, onChange, }: InputWidgetEditorProps): React_2.ReactElement;

/**
 * Config editor for an {@link InputWidget} (docs/03 §A3.2 "Add" → input). An input
 * widget binds a declared dashboard variable to a control kind; this panel picks the
 * variable, the kind, and the kind-specific options, always emitting a schema-valid
 * `InputControl`. It only LISTS the dashboard's declared variables — declaring new
 * ones happens in the Variables panel.
 */
export declare interface InputWidgetEditorProps {
    widget: InputWidget;
    /** The dashboard's declared variables (to bind the control to). */
    variables: VariableDecl[];
    onChange: (widget: InputWidget) => void;
}

export declare const InputWidgetSchema: z.ZodObject<{
    type: z.ZodLiteral<"input">;
    control: z.ZodObject<{
        variable: z.ZodString;
        control: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
            kind: z.ZodLiteral<"dateRange">;
            presets: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            allowFuture: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        }, {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"granularity">;
            options: z.ZodOptional<z.ZodArray<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, "many">>;
            /** A dateRange variable whose span narrows the offered granularities. */
            rangeVariable: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        }, {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"select">;
            options: z.ZodArray<z.ZodObject<{
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>;
                label: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }, {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }>, "many">;
            multiple: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        }, {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"memberSelect">;
            from: z.ZodEnum<["dimension", "measure", "dimensionOrMeasure"]>;
            cube: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        }, {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"text">;
            placeholder: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            kind: "text";
            placeholder?: string | undefined;
        }, {
            kind: "text";
            placeholder?: string | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"number">;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            step: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        }, {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"toggle">;
        }, "strict", z.ZodTypeAny, {
            kind: "toggle";
        }, {
            kind: "toggle";
        }>]>;
    }, "strict", z.ZodTypeAny, {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    }, {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    }>;
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "input";
    control: {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    };
    id: string;
    title?: string | undefined;
}, {
    type: "input";
    control: {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    };
    id: string;
    title?: string | undefined;
}>;

export declare function InputWidgetView({ control, title }: InputWidgetViewProps): ReactElement;

/**
 * Render an {@link InputControl} bound to a dashboard variable (Leg 1 write / Leg 3
 * read-back of the binding model — docs/01-spec-schema.md §5,
 * docs/03-override-theme-preview.md A2.4). The control is a pure value editor: it
 * reads `resolveValue(variable)` and writes `setVar(variable, …)`, and it can ONLY
 * write its own declared variable — so a control can never widen tenant scope.
 *
 * Each `control.kind` resolves through the registry (`registry.controls[kind]`) with
 * the built-in as fallback. The built-ins are shadcn/ui primitives (Select, Popover,
 * Calendar) that render through a Radix portal, so they work inside a mobile WebView.
 */
export declare interface InputWidgetViewProps {
    /** The input control (variable name + kind-specific config). */
    control: InputControl;
    /** The widget title — used as the field LABEL (replaces the old card header). */
    title?: string;
}

/**
 * The variable resolver — legs 2 & 3 of the binding model, plus the `noFilter`
 * fail-safe rule. Pure, framework-free. See docs/01-spec-schema.md §5.
 *
 * Leg 2 (READ into data): {@link resolveQuery} deep-walks a `CubeQuery`, replaces
 * every `{var:"name"}` token with `store[name] ?? decl.default`, then drops any
 * filter / time-dimension field whose token resolved to *empty* — the result is a
 * literal-only query safe to POST to `/v1/load`.
 *
 * Leg 3 (READ into control): {@link resolveValue} reads a single variable back the
 * same way, so an Input control reflects the same value it writes.
 *
 * The rule is strictly narrowing-or-neutral: an unset variable can only *remove* a
 * predicate, never widen scope. RLS is orthogonal and lives in the JWT, untouchable
 * by anything here.
 */
/**
 * The single source of truth for "this resolved value contributes nothing."
 * Treats `undefined`, `null`, empty string, and empty array as empty. A `0` or
 * `false` is a real value (a filter on `count = 0` or `flag = false` is valid).
 */
export declare function isEmptyValue(v: unknown): boolean;

export declare function isVarRef(v: unknown): v is VarRef;

/**
 * The chart's CROSS-TABLE scope, derived purely from Cube `/v1/meta`'s
 * `connectedComponent` (the only join signal it exposes). A chart is bound either to
 * a curated VIEW (flat, pre-joined, fan-out-safe) or to the raw TABLE graph — and in
 * the table graph it may draw measures from ONE table but dimensions from any table
 * in the same join component. That single-measure-source rule is what keeps the UI
 * from building a query Cube would reject as a fan-out ("can't find join path").
 */
declare interface JoinScope {
    /** When the chart is bound to a curated view, its name (single flat source). */
    viewLocked?: string;
    /** The primary source table (the measure owner / first field) — listed first. */
    sourceCube?: CubeOption;
    /** Other joinable cube tables (same connectedComponent), excluding the source. */
    relatedCubes: CubeOption[];
    /** Curated views, offered as ready-made cross-table datasets. */
    views: CubeOption[];
    /** The cube currently owning the measures (single-measure-source guardrail). */
    measureSource?: string;
    /** The join-graph id the chart is anchored to (undefined when empty). */
    scopeComponent?: number;
}

export declare const kpiChartFamily: ChartFamilyDescriptor;

/**
 * `kpi` — covers KPI/Number/Comparison + the folded-in radial gauge
 * (docs/02-chart-options.md §2.6). `display:"number"` is a styled card (NOT
 * Recharts) with an optional comparison delta chip; `display:"gauge"` is a
 * Recharts RadialBarChart. `sparkline` reuses the line family with chrome:"none".
 */
export declare function KpiFamily(props: ChartComponentProps): React_2.ReactElement;

export declare type KpiFamilyOptions = z.infer<typeof KpiFamilyOptionsSchema>;

export declare const KpiFamilyOptionsSchema: z.ZodObject<{
    display: z.ZodOptional<z.ZodEnum<["number", "gauge"]>>;
    measure: z.ZodString;
    comparison: z.ZodOptional<z.ZodObject<{
        mode: z.ZodEnum<["previousPeriod", "value"]>;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        showAsPercent: z.ZodOptional<z.ZodBoolean>;
        goodDirection: z.ZodOptional<z.ZodEnum<["up", "down"]>>;
    }, "strict", z.ZodTypeAny, {
        mode: "value" | "previousPeriod";
        value?: string | number | undefined;
        showAsPercent?: boolean | undefined;
        goodDirection?: "up" | "down" | undefined;
    }, {
        mode: "value" | "previousPeriod";
        value?: string | number | undefined;
        showAsPercent?: boolean | undefined;
        goodDirection?: "up" | "down" | undefined;
    }>>;
    /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
     *  `measure` and its time dimension / range to the KPI's own query — only the
     *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
     *  same good/bad direction as the comparison delta (see `goodDirection`). */
    sparkline: z.ZodOptional<z.ZodObject<{
        member: z.ZodOptional<z.ZodString>;
        timeDimension: z.ZodOptional<z.ZodString>;
        granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
    }, "strict", z.ZodTypeAny, {
        member?: string | undefined;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        timeDimension?: string | undefined;
    }, {
        member?: string | undefined;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        timeDimension?: string | undefined;
    }>>;
    /** The change direction that counts as "good" — drives BOTH the comparison delta
     *  color and the sparkline area color. Configured once for the KPI. */
    goodDirection: z.ZodOptional<z.ZodEnum<["up", "down"]>>;
    gauge: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodNumber;
        thresholds: z.ZodOptional<z.ZodArray<z.ZodObject<{
            at: z.ZodNumber;
            colorToken: z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>;
        }, "strict", z.ZodTypeAny, {
            at: number;
            colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
        }, {
            at: number;
            colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        max: number;
        min?: number | undefined;
        thresholds?: {
            at: number;
            colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
        }[] | undefined;
    }, {
        max: number;
        min?: number | undefined;
        thresholds?: {
            at: number;
            colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
        }[] | undefined;
    }>>;
    icon: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    measure: string;
    display?: "number" | "gauge" | undefined;
    icon?: string | undefined;
    gauge?: {
        max: number;
        min?: number | undefined;
        thresholds?: {
            at: number;
            colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
        }[] | undefined;
    } | undefined;
    goodDirection?: "up" | "down" | undefined;
    comparison?: {
        mode: "value" | "previousPeriod";
        value?: string | number | undefined;
        showAsPercent?: boolean | undefined;
        goodDirection?: "up" | "down" | undefined;
    } | undefined;
    sparkline?: {
        member?: string | undefined;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        timeDimension?: string | undefined;
    } | undefined;
}, {
    measure: string;
    display?: "number" | "gauge" | undefined;
    icon?: string | undefined;
    gauge?: {
        max: number;
        min?: number | undefined;
        thresholds?: {
            at: number;
            colorToken: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
        }[] | undefined;
    } | undefined;
    goodDirection?: "up" | "down" | undefined;
    comparison?: {
        mode: "value" | "previousPeriod";
        value?: string | number | undefined;
        showAsPercent?: boolean | undefined;
        goodDirection?: "up" | "down" | undefined;
    } | undefined;
    sparkline?: {
        member?: string | undefined;
        granularity?: {
            var: string;
        } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
        dateRange?: string | {
            var: string;
        } | [string, string] | undefined;
        timeDimension?: string | undefined;
    } | undefined;
}>;

export declare type LayoutItem = z.infer<typeof LayoutItemSchema>;

export declare const LayoutItemSchema: z.ZodObject<{
    i: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
    w: z.ZodNumber;
    h: z.ZodNumber;
    minW: z.ZodOptional<z.ZodNumber>;
    minH: z.ZodOptional<z.ZodNumber>;
    static: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    x: number;
    y: number;
    i: string;
    w: number;
    h: number;
    minW?: number | undefined;
    minH?: number | undefined;
    static?: boolean | undefined;
}, {
    x: number;
    y: number;
    i: string;
    w: number;
    h: number;
    minW?: number | undefined;
    minH?: number | undefined;
    static?: boolean | undefined;
}>;

export declare type LeafFilter = z.infer<typeof LeafFilterSchema>;

export declare const LeafFilterSchema: z.ZodObject<{
    member: z.ZodString;
    operator: z.ZodEnum<["equals", "notEquals", "gt", "gte", "lt", "lte", "contains", "notContains", "startsWith", "endsWith", "set", "notSet", "inDateRange", "notInDateRange", "beforeDate", "beforeOrOnDate", "afterDate", "afterOrOnDate", "measureFilter"]>;
    values: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>, z.ZodObject<{
        var: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        var: string;
    }, {
        var: string;
    }>]>, "many">>;
}, "strict", z.ZodTypeAny, {
    member: string;
    operator: "set" | "equals" | "notEquals" | "gt" | "gte" | "lt" | "lte" | "contains" | "notContains" | "startsWith" | "endsWith" | "notSet" | "inDateRange" | "notInDateRange" | "beforeDate" | "beforeOrOnDate" | "afterDate" | "afterOrOnDate" | "measureFilter";
    values?: (string | number | boolean | {
        var: string;
    })[] | undefined;
}, {
    member: string;
    operator: "set" | "equals" | "notEquals" | "gt" | "gte" | "lt" | "lte" | "contains" | "notContains" | "startsWith" | "endsWith" | "notSet" | "inDateRange" | "notInDateRange" | "beforeDate" | "beforeOrOnDate" | "afterDate" | "afterOrOnDate" | "measureFilter";
    values?: (string | number | boolean | {
        var: string;
    })[] | undefined;
}>;

export declare type LegendOptions = z.infer<typeof LegendOptionsSchema>;

export declare const LegendOptionsSchema: z.ZodObject<{
    show: z.ZodOptional<z.ZodBoolean>;
    position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
}, "strict", z.ZodTypeAny, {
    show?: boolean | undefined;
    position?: "left" | "right" | "top" | "bottom" | undefined;
}, {
    show?: boolean | undefined;
    position?: "left" | "right" | "top" | "bottom" | undefined;
}>;

/**
 * `line` — absorbs Line/Grouped/Multi/Sparkline (docs/02-chart-options.md §2.2).
 * Multi-series = `series.length`; sparkline = `chrome:"none"` (no axes/grid/
 * legend/tooltip); dual-axis = a series with `meta.axis:"right"`. Line ignores
 * orientation/stackMode (stacked lines use the `area` family).
 */
export declare function LineChartFamily({ data, options, config, format, editing, }: ChartComponentProps): React_2.ReactElement;

export declare const lineChartFamily: ChartFamilyDescriptor;

export declare type LineFamilyOptions = z.infer<typeof LineFamilyOptionsSchema>;

export declare const LineFamilyOptionsSchema: z.ZodObject<{
    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    dots: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodLiteral<"active">]>>;
    connectNulls: z.ZodOptional<z.ZodBoolean>;
    chrome: z.ZodOptional<z.ZodEnum<["full", "none"]>>;
    referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        axis: z.ZodEnum<["x", "y"]>;
        value: z.ZodNumber;
        side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
        label: z.ZodOptional<z.ZodString>;
        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    }, "strict", z.ZodTypeAny, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }>, "many">>;
    showValueLabels: z.ZodOptional<z.ZodBoolean>;
    comparePrevious: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | "active" | undefined;
    strokeWidth?: number | undefined;
    showValueLabels?: boolean | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    comparePrevious?: boolean | undefined;
    connectNulls?: boolean | undefined;
    chrome?: "none" | "full" | undefined;
}, {
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | "active" | undefined;
    strokeWidth?: number | undefined;
    showValueLabels?: boolean | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    comparePrevious?: boolean | undefined;
    connectNulls?: boolean | undefined;
    chrome?: "none" | "full" | undefined;
}>;

export declare type LoadResult = {
    ok: true;
    spec: Spec;
} | {
    ok: false;
    error: string;
};

/**
 * Load an untrusted JSON value as a validated Spec: migrate forward to the current
 * version, then zod-parse. Throws on an unrepairable or future-versioned spec.
 */
export declare function loadSpec(raw: unknown): Spec;

/** Cheap ISO-date sniff (avoids treating arbitrary numeric strings as dates). */
export declare function looksLikeIsoDate(value: string): boolean;

export declare function makeChartFormat(annotation: ResultAnnotation | undefined, options: ChartOptions, formatter: ValueFormatter, ctx?: {
    locale?: string;
    unitSystem?: "metric" | "imperial";
}): ChartFormat;

/* Excluded from this release type: makeDateFormatter */

/* Excluded from this release type: makeFormatter */

export declare type Member = z.infer<typeof MemberSchema>;

/**
 * The single runtime context cube-viz reads (docs/03-override-theme-preview.md
 * §A1.4). It carries everything the host injects through {@link CubeVizProvider}:
 * the Cube client, the component-override registry, the resolved locale/formatting
 * config, and the resolved theme. The library NEVER stores, serializes, or logs
 * the Cube token — it lives only inside the host-built `cubeClient`.
 */
/**
 * Member-level formatting metadata, retained as the host-facing shape for the
 * legacy `useFormatter` convenience hook. The pluggable formatter seam is now the
 * richer {@link import("@/format").FormatContext}; this stays a flat, host-friendly
 * projection of it.
 */
export declare interface MemberFormatMeta {
    /** Fully-qualified member name, when known. */
    member?: string;
    /** Cube `meta.unit` (e.g. "km", "s", "%"). */
    unit?: string;
    /** Cube `meta.quantity` (e.g. "time", "ratio", "distance"). */
    quantity?: string;
    /** Cube `meta.convert` opt-in (host policy; the default formatter never converts). */
    convert?: boolean;
    /** Resolved spec-level format override for this value position. */
    format?: FormatOptions;
}

/**
 * Member-level metadata from the Cube annotation (`annotation().<bucket>.<member>.meta`).
 * `unit`/`quantity`/`convert` are the conventional keys cube-viz forwards, but the
 * shape is open so a host can read any custom meta its schema attaches.
 */
export declare interface MemberMeta {
    /** e.g. "km", "s", "%". Forwarded verbatim; the default appends it as a plain suffix. */
    unit?: string;
    /** e.g. "time", "ratio", "distance". Host policy may key conversion/duration off this. */
    quantity?: string;
    /** Host opt-in for unit conversion. The default NEVER converts regardless of this flag. */
    convert?: boolean;
    [k: string]: unknown;
}

/** Fully-qualified, dot-namespaced Cube member, e.g. "device_trips.total_distance". */
export declare const MemberSchema: z.ZodString;

/**
 * Merge a freshly-captured RGL layout back into the spec's `LayoutItem[]`, keeping
 * the spec's `minW`/`minH`/`static` (RGL strips these from derived breakpoints) and
 * preserving spec item order. New items present only in RGL are appended; items
 * absent from RGL (e.g. just removed) are dropped.
 */
export declare function mergeLayout(prev: LayoutItem[], next: Layout): LayoutItem[];

/**
 * Merge host-supplied conversions over the defaults (the extension seam). Host
 * entries win on key collision; passing nothing returns the default table.
 */
export declare function mergeUnitConversions(extra?: Record<string, UnitDef>): Record<string, UnitDef>;

/** A blank chart widget: an empty query + a bar family (a valid, renderable shell). */
export declare function newChartWidget(id: string): ChartWidget;

/**
 * A blank input widget. `variable` starts empty — the panel makes the user bind it
 * to a declared variable. Defaults to a `select` control with no options yet.
 */
export declare function newInputWidget(id: string): InputWidget;

/** A blank text widget: an empty TipTap doc with a single empty paragraph. */
export declare function newTextWidget(id: string): TextWidget;

/**
 * A blank variable declaration. Date-range variables default to a relative preset
 * string (host-friendly, no absolute dates baked in — docs/03 §A3.2 "Variables").
 */
export declare function newVariable(name: string): VariableDecl;

/** Dispatch a fresh widget of the requested kind. */
export declare function newWidget(type: WidgetSpec["type"], id: string): WidgetSpec;

/**
 * Normalize a Cube `ResultSet` into `NormalizedChartData` using the chart's
 * `SeriesMapping`. `resolvedQuery` is the literal (variables-substituted) query
 * that produced the result — stored verbatim on `raw.query`.
 *
 * - `mode: "measures"` → one series per listed measure; categories from the
 *   category member's buckets; data aligned via `chartPivot()`.
 * - `mode: "pivot"` → one series per distinct pivot value, via
 *   `pivotConfig.y = [pivot, "measures"]`; ramp colors round-robin.
 */
export declare function normalize(resultSet: AnyResultSet, options: ChartOptions, resolvedQuery: CubeQuery, convertCtx?: ConvertCtx, families?: FamilyRegistry): NormalizedChartData;

export declare interface NormalizedChartData {
    /** x labels (time buckets or dimension values), aligned to every series' `data` index. */
    categories: (string | number)[];
    series: NormalizedSeries[];
    raw: {
        /** resultSet.tablePivot() — for tables / KPIs / scatter / debug. */
        rows: Record<string, unknown>[];
        /** resultSet.annotation() — titles, types, member meta. */
        annotation?: ResultAnnotation;
        /** The RESOLVED (literal, variables-substituted) query that produced this. */
        query: CubeQuery;
    };
    /** true when noFilter dropped everything or the query returned zero rows. */
    empty: boolean;
}

export declare interface NormalizedSeries {
    /** Stable series id — a measure name (mode "measures") or a pivot value (mode "pivot"). */
    key: string;
    label: string;
    /** Aligned 1:1 with `categories`; null = gap. */
    data: (number | null)[];
    colorToken?: ChartColorToken;
    meta?: SeriesValueMeta;
}

export declare const OrderDirSchema: z.ZodEnum<["asc", "desc"]>;

export declare type OrderSpec = z.infer<typeof OrderSpecSchema>;

export declare const OrderSpecSchema: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>;

/**
 * Pick the canonical (widest) layout out of RGL's `allLayouts`. Prefers the
 * `lg` entry the spec is keyed on; falls back to the entry with the most columns'
 * worth of items, then to the flat `layout` arg, so we never lose a change.
 */
export declare function pickCanonicalLayout(layout: Layout, allLayouts: Partial<Record<string, Layout>>): Layout;

/**
 * `pie` — covers pie + donut (donut = innerRadiusPct > 0); per-slice color comes
 * from the DATA ROW via <Cell> (a Recharts-3 requirement), cycling chart-1..5.
 * `maxSlices` keeps the top-N and folds the remainder into an "Other" slice.
 * See docs/02-chart-options.md §2.4. Pie plots `categories` × the FIRST series.
 */
export declare function PieChartFamily({ data, options, format, editing }: ChartComponentProps): React_2.ReactElement;

export declare const pieChartFamily: ChartFamilyDescriptor;

export declare type PieFamilyOptions = z.infer<typeof PieFamilyOptionsSchema>;

export declare const PieFamilyOptionsSchema: z.ZodObject<{
    innerRadiusPct: z.ZodOptional<z.ZodNumber>;
    outerRadiusPct: z.ZodOptional<z.ZodNumber>;
    padAngle: z.ZodOptional<z.ZodNumber>;
    cornerRadius: z.ZodOptional<z.ZodNumber>;
    showLabels: z.ZodOptional<z.ZodEnum<["none", "value", "percent", "name"]>>;
    centerLabel: z.ZodOptional<z.ZodObject<{
        value: z.ZodOptional<z.ZodString>;
        label: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        value?: string | undefined;
        label?: string | undefined;
    }, {
        value?: string | undefined;
        label?: string | undefined;
    }>>;
    maxSlices: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    innerRadiusPct?: number | undefined;
    outerRadiusPct?: number | undefined;
    padAngle?: number | undefined;
    cornerRadius?: number | undefined;
    showLabels?: "value" | "percent" | "none" | "name" | undefined;
    centerLabel?: {
        value?: string | undefined;
        label?: string | undefined;
    } | undefined;
    maxSlices?: number | undefined;
}, {
    innerRadiusPct?: number | undefined;
    outerRadiusPct?: number | undefined;
    padAngle?: number | undefined;
    cornerRadius?: number | undefined;
    showLabels?: "value" | "percent" | "none" | "name" | undefined;
    centerLabel?: {
        value?: string | undefined;
        label?: string | undefined;
    } | undefined;
    maxSlices?: number | undefined;
}>;

/**
 * Compute a non-overlapping placement for a new widget: full-grid-width row below
 * everything that exists, snapped to the widget kind's default footprint. RGL's
 * compactor tidies it afterwards, but starting below the current max-y guarantees
 * no initial overlap regardless of compaction direction.
 */
export declare function placeNewItem(existing: LayoutItem[], id: string, type: WidgetSpec["type"], cols?: number): LayoutItem;

/**
 * A human label for an axis-consistency message. Prefers the quantity
 * ("fuelEfficiency" → "Fuel efficiency"), falls back to the unit, else "number".
 */
export declare function quantityLabel(meta: MemberMeta | undefined): string;

export declare type QueryFilter = LeafFilter | {
    and: QueryFilter[];
} | {
    or: QueryFilter[];
};

export declare const QueryFilterSchema: z.ZodType<QueryFilter>;

export declare interface QueryState {
    data?: NormalizedChartData;
    isLoading: boolean;
    error?: Error;
}

export declare type ReferenceLineOpt = z.infer<typeof ReferenceLineOptSchema>;

/** A reference line on the x or y axis (bar/line/area/scatter/combo). */
export declare const ReferenceLineOptSchema: z.ZodObject<{
    axis: z.ZodEnum<["x", "y"]>;
    value: z.ZodNumber;
    side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
    label: z.ZodOptional<z.ZodString>;
    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
}, "strict", z.ZodTypeAny, {
    value: number;
    axis: "x" | "y";
    label?: string | undefined;
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    side?: "left" | "right" | undefined;
}, {
    value: number;
    axis: "x" | "y";
    label?: string | undefined;
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    side?: "left" | "right" | undefined;
}>;

/** A dashboard spec with one widget (+ its layout item) removed. Pure. */
export declare function removeWidget(spec: DashboardSpec, id: string): DashboardSpec;

export declare function RenderWidget({ widget, dragHandleProps, editable }: RenderWidgetProps): ReactElement;

/**
 * Dispatch a {@link WidgetSpec} by `type` (chart / text / input) to its renderer,
 * wrapped in the (overridable) {@link WidgetChrome} (docs/03-override-theme-preview.md
 * A2.3, A3). The body owns its own loading / error / empty states (a chart fetches
 * via `CubeChart`); the chrome owns the frame + drag handle.
 *
 * `dragHandleProps` come from the Dashboard's grid item and are spread onto the
 * chrome header so the title bar is the RGL drag handle in edit mode.
 */
export declare interface RenderWidgetProps {
    /** The widget to render. */
    widget: WidgetSpec;
    /** Spread onto the chrome header so it acts as the RGL drag handle. */
    dragHandleProps?: Record<string, unknown>;
    /** Edit mode — gates the chrome actions menu (export/edit affordances). */
    editable?: boolean;
}

/** A dashboard spec with one widget replaced (matched by id). Pure. */
export declare function replaceWidget(spec: DashboardSpec, widget: WidgetSpec): DashboardSpec;

/**
 * Resolve the chart component for `family`: the {@link ComponentRegistry} override
 * if present, else the family's registered component (builtin OR host family) from the
 * injected {@link FamilyRegistry}. This is the per-slot resolution every renderer uses.
 * Throws on an unknown family (a spec referencing an unregistered family is a
 * programming error). Pure — the React caller (`CubeChart`) passes the context registry
 * from {@link import("./context").useFamilyRegistry}.
 */
export declare function resolveChart(registry: ComponentRegistry | undefined, family: ChartFamily, families: FamilyRegistry): ChartComponent;

/** Resolved locale / formatting config (defaults applied in the provider). */
export declare interface ResolvedLocale {
    /** BCP-47 locale tag, e.g. "en-US". */
    locale?: string;
    /** IANA timezone; default query/host tz. */
    timezone?: string;
    /** The host's unit system, threaded into every {@link import("@/format").FormatContext}. */
    unitSystem?: "metric" | "imperial";
    /**
     * Central host-pluggable {@link ValueFormatter} (the Embeddable lesson: formatting
     * is DRY — defined once, not per chart). When present it is the formatter every
     * chart/axis/tooltip/KPI/table uses; otherwise the library's minimal
     * {@link import("@/format").defaultFormatter} is used. This is where a host plugs
     * in unit conversion / duration humanization / quantity rules — the library ships
     * none of those.
     */
    formatValue?: ValueFormatter;
    /**
     * Extra/override metric→imperial unit conversions, merged OVER the core
     * {@link import("@/units").DEFAULT_UNIT_CONVERSIONS}. This is the EXTENSION POINT
     * for the core units feature: hosts register additional storage units (or
     * override a default rule) without touching the library. Ignored when a host
     * supplies `formatValue` (that fully overrides the core formatter).
     */
    units?: Record<string, UnitDef>;
}

/**
 * Google Maps config for the `map` chart family. The HOST injects its Google Maps
 * JavaScript API key (and optional Cloud `mapId` for vector/styled maps) — the
 * library NEVER hardcodes or stores a key. When `apiKey` is absent the map family
 * degrades to a graceful placeholder (it never crashes), so the rest of cube-viz
 * works with no maps config at all.
 */
export declare interface ResolvedMaps {
    /** Google Maps JS API key (host-owned; the library only forwards it). */
    apiKey?: string;
    /** Optional Cloud-based Map ID (enables vector maps + AdvancedMarker). */
    mapId?: string;
}

/** Resolved theme config (defaults applied in the provider). */
export declare interface ResolvedTheme {
    /** Series color ramp as token *names* (never raw colors); cycles when exhausted. */
    chartRamp: ChartColorToken[];
    /** Forced color mode; "system" defers to the host's existing dark selector. */
    mode: "light" | "dark" | "system";
}

/**
 * Resolve a chart's options against ITS family's defaults — the public free function,
 * kept for back-compat. Deep-merges envelope + familyOptions defaults under the spec
 * (arrays replace wholesale). Defaults to the builtin-only registry when none is
 * passed, so `resolveOptions(options)` still works for external/test callers; pass a
 * registry (from context) to resolve host families.
 */
export declare function resolveOptions(options: ChartOptions, registry?: FamilyRegistry): ChartOptions;

/**
 * Resolve a chart's options against a family default: deep-merge the family's
 * envelope defaults under the spec's envelope, and the family's familyOptions
 * defaults under the spec's familyOptions. Arrays (referenceLines/columns/series)
 * are replaced, not merged.
 *
 * `resolveOptionsWith` takes the default EXPLICITLY so this module stays a registry
 * leaf (no import of the family registry). The public {@link
 * import("./familyRegistry").resolveOptions} looks the default up from the registry
 * — supporting host families — and delegates here.
 */
export declare function resolveOptionsWith(options: ChartOptions, d: FamilyDefault): ChartOptions;

/**
 * Leg-2 resolution: deep-walk a `CubeQuery`, substitute every `{var}` token, then
 * apply the `noFilter` rule. The returned query is a fresh, literal-only object;
 * the input is never mutated.
 */
export declare function resolveQuery(query: CubeQuery, store: Record<string, VariableValue>, decls: VariableDecl[]): CubeQuery;

/**
 * Resolve the `colorToken` for each series position — the SINGLE source of truth
 * for series color, shared by the renderer ({@link assignColors}) and the editor
 * (the on-chart FieldPill swatch) so they NEVER disagree. Explicit colors
 * (per-series `colorToken` or `colors.byKey[key]`) win; unset series take the next
 * ramp colour (`colors.ramp` ?? {@link DEFAULT_COLOR_RAMP}) that isn't already
 * CLAIMED — by an explicit colour anywhere or an earlier auto-assignment — so
 * auto-coloured series stay distinct (e.g. an explicit `chart-1` won't make the
 * next unset series also `chart-1`). Returns one token per input, index-aligned; pure.
 */
export declare function resolveSeriesColors(series: ReadonlyArray<{
    key: string;
    colorToken?: ChartColorToken;
}>, colors?: ChartOptions["colors"]): ChartColorToken[];

/**
 * Leg-3 read-back: resolve one variable name to its current value using the
 * default-resolution order — store value, else decl default, else `undefined`.
 */
export declare function resolveValue(name: string, store: Record<string, VariableValue>, decls: VariableDecl[]): VariableValue | undefined;

export declare interface ResultAnnotation {
    measures: Record<string, AnnotatedMember>;
    dimensions: Record<string, AnnotatedMember>;
    segments: Record<string, AnnotatedMember>;
    timeDimensions: Record<string, AnnotatedMember>;
}

/** Non-throwing variant for editor/preview boundaries. */
export declare function safeLoadSpec(raw: unknown): LoadResult;

export declare type Scalar = z.infer<typeof ScalarSchema>;

export declare const ScalarSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;

/**
 * `scatter` — covers scatter + bubble (docs/02-chart-options.md §2.5). Its
 * mapping does NOT reduce to category+series: it consumes `raw.rows` and projects
 * {x,y,z} per point from members named in familyOptions. `size` ⇒ <ZAxis> bubble;
 * `groupBy` ⇒ one <Scatter> series per distinct value, each colored from the ramp.
 */
export declare function ScatterChartFamily({ data, options, format, editing }: ChartComponentProps): React_2.ReactElement;

export declare const scatterChartFamily: ChartFamilyDescriptor;

export declare type ScatterFamilyOptions = z.infer<typeof ScatterFamilyOptionsSchema>;

export declare const ScatterFamilyOptionsSchema: z.ZodObject<{
    x: z.ZodString;
    y: z.ZodString;
    size: z.ZodOptional<z.ZodString>;
    sizeRange: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
    groupBy: z.ZodOptional<z.ZodString>;
    shape: z.ZodOptional<z.ZodEnum<["circle", "square", "triangle", "diamond"]>>;
    referenceLines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        axis: z.ZodEnum<["x", "y"]>;
        value: z.ZodNumber;
        side: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
        label: z.ZodOptional<z.ZodString>;
        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    }, "strict", z.ZodTypeAny, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }, {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    x: string;
    y: string;
    shape?: "circle" | "square" | "triangle" | "diamond" | undefined;
    size?: string | undefined;
    groupBy?: string | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    sizeRange?: [number, number] | undefined;
}, {
    x: string;
    y: string;
    shape?: "circle" | "square" | "triangle" | "diamond" | undefined;
    size?: string | undefined;
    groupBy?: string | undefined;
    referenceLines?: {
        value: number;
        axis: "x" | "y";
        label?: string | undefined;
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
        side?: "left" | "right" | undefined;
    }[] | undefined;
    sizeRange?: [number, number] | undefined;
}>;

/**
 * cube-viz spec contract (v1) — the stable, library-agnostic source of truth.
 * zod schemas are authoritative; all TS types are `z.infer`-ed from them, so the
 * runtime guard and the compile-time type can never drift.
 *
 * See docs/01-spec-schema.md for the full rationale.
 */
export declare const SCHEMA_VERSION: 1;

export declare type SeriesMapping = z.infer<typeof SeriesMappingSchema>;

export declare const SeriesMappingSchema: z.ZodObject<{
    category: z.ZodObject<{
        member: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        member: string;
    }, {
        member: string;
    }>;
    series: z.ZodUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"measures">;
        members: z.ZodArray<z.ZodString, "many">;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
            stackId: z.ZodOptional<z.ZodString>;
            axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            /** Per-series line shape (line/area) — overrides the family default. */
            curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
            /** Per-series point markers (line/area) — overrides the family default. */
            dots: z.ZodOptional<z.ZodBoolean>;
            format: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }>>>;
    }, "strict", z.ZodTypeAny, {
        mode: "measures";
        members: string[];
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    }, {
        mode: "measures";
        members: string[];
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"pivot">;
        /** The primary split measure — drives the value-axis unit. Always set
         *  (also the only value when a single measure is split by colour). */
        value: z.ZodString;
        /** When MORE THAN ONE measure is split by the colour dimension, the full
         *  ordered measure list (series = measure × pivot value). `value` is
         *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
        values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        pivot: z.ZodString;
        /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
         *  each measure's series sit on, so a multi-measure color split can be
         *  dual-axis (each axis one unit). */
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
            stackId: z.ZodOptional<z.ZodString>;
            axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
            /** Per-series line shape (line/area) — overrides the family default. */
            curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
            /** Per-series point markers (line/area) — overrides the family default. */
            dots: z.ZodOptional<z.ZodBoolean>;
            format: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }>>>;
    }, "strict", z.ZodTypeAny, {
        value: string;
        mode: "pivot";
        pivot: string;
        values?: string[] | undefined;
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    }, {
        value: string;
        mode: "pivot";
        pivot: string;
        values?: string[] | undefined;
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    }>]>;
}, "strict", z.ZodTypeAny, {
    category: {
        member: string;
    };
    series: {
        mode: "measures";
        members: string[];
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    } | {
        value: string;
        mode: "pivot";
        pivot: string;
        values?: string[] | undefined;
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    };
}, {
    category: {
        member: string;
    };
    series: {
        mode: "measures";
        members: string[];
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    } | {
        value: string;
        mode: "pivot";
        pivot: string;
        values?: string[] | undefined;
        meta?: Record<string, {
            label?: string | undefined;
            colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
            stackId?: string | undefined;
            axis?: "left" | "right" | undefined;
            curve?: "linear" | "monotone" | "step" | "natural" | undefined;
            dots?: boolean | undefined;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
        }> | undefined;
    };
}>;

export declare type SeriesMeta = z.infer<typeof SeriesMetaSchema>;

export declare const SeriesMetaSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    stackId: z.ZodOptional<z.ZodString>;
    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
    /** Per-series line shape (line/area) — overrides the family default. */
    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
    /** Per-series point markers (line/area) — overrides the family default. */
    dots: z.ZodOptional<z.ZodBoolean>;
    format: z.ZodOptional<z.ZodObject<{
        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
        decimals: z.ZodOptional<z.ZodNumber>;
        abbreviate: z.ZodOptional<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodString>;
        suffix: z.ZodOptional<z.ZodString>;
        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
        dateFormat: z.ZodOptional<z.ZodString>;
        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
        currency: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    label?: string | undefined;
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    stackId?: string | undefined;
    axis?: "left" | "right" | undefined;
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
    format?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
}, {
    label?: string | undefined;
    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    stackId?: string | undefined;
    axis?: "left" | "right" | undefined;
    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
    dots?: boolean | undefined;
    format?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
}>;

/**
 * The normalized shape every chart family consumes. This is THE abstraction seam:
 * components never see a Cube ResultSet or Recharts prop shapes — only this.
 * See docs/01-spec-schema.md §6.
 */
export declare interface SeriesValueMeta {
    /** Resolved formatting (auto from member meta.quantity/unit, then spec overrides). */
    format?: FormatOptions;
    unit?: string;
    quantity?: string;
    convert?: boolean;
    axis?: "left" | "right";
    stackId?: string;
    /** Per-series line shape (line/area) carried from the spec's SeriesMeta. */
    curve?: "linear" | "monotone" | "step" | "natural";
    /** Per-series point markers (line/area) carried from the spec's SeriesMeta. */
    dots?: boolean;
    /** This series is a previous-period overlay → renderers draw it muted + dashed. */
    companion?: boolean;
    /** The source Cube MEASURE this series derives from — the member whose unit/format
     *  drives the value-axis tick + tooltip. In measures mode it equals `key`; in pivot
     *  mode `key` is a pivot VALUE (no unit), so this points at the split measure. */
    measure?: string;
}

export declare type Spec = z.infer<typeof SpecSchema>;

export declare const SpecSchema: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
    kind: z.ZodLiteral<"chart">;
    query: z.ZodObject<{
        measures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeDimensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            dimension: z.ZodString;
            granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }>, "many">>;
        filters: z.ZodOptional<z.ZodArray<z.ZodType<QueryFilter, z.ZodTypeDef, QueryFilter>, "many">>;
        segments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        order: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>>;
        limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        total: z.ZodOptional<z.ZodBoolean>;
        timezone: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }>;
    chart: z.ZodObject<{
        family: z.ZodString;
        /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
         carry their own mapping inside familyOptions, so this is optional at the envelope. */
        mapping: z.ZodOptional<z.ZodObject<{
            category: z.ZodObject<{
                member: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                member: string;
            }, {
                member: string;
            }>;
            series: z.ZodUnion<[z.ZodObject<{
                mode: z.ZodLiteral<"measures">;
                members: z.ZodArray<z.ZodString, "many">;
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"pivot">;
                /** The primary split measure — drives the value-axis unit. Always set
                 *  (also the only value when a single measure is split by colour). */
                value: z.ZodString;
                /** When MORE THAN ONE measure is split by the colour dimension, the full
                 *  ordered measure list (series = measure × pivot value). `value` is
                 *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
                values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                pivot: z.ZodString;
                /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
                 *  each measure's series sit on, so a multi-measure color split can be
                 *  dual-axis (each axis one unit). */
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>]>;
        }, "strict", z.ZodTypeAny, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }>>;
        orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal"]>>;
        stackMode: z.ZodOptional<z.ZodEnum<["none", "stacked", "grouped", "percent"]>>;
        legend: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }>>;
        tooltip: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
            showTotal: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }>>;
        axes: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y2: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }>>;
        colors: z.ZodOptional<z.ZodObject<{
            byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
            ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }>>;
        format: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
        /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
        familyOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strict", z.ZodTypeAny, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }>;
    schemaVersion: z.ZodLiteral<1>;
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    kind: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    schemaVersion: 1;
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}, {
    kind: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    schemaVersion: 1;
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"dashboard">;
    variables: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["dateRange", "time", "granularity", "string", "number", "boolean", "dimension", "measure", "dimensionOrMeasure"]>;
        label: z.ZodOptional<z.ZodString>;
        array: z.ZodOptional<z.ZodBoolean>;
        default: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
    }, "strict", z.ZodTypeAny, {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }, {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }>, "many">;
    widgets: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"chart">;
        query: z.ZodObject<{
            measures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            timeDimensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                dimension: z.ZodString;
                granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
                    var: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    var: string;
                }, {
                    var: string;
                }>]>>;
                dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
                    var: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    var: string;
                }, {
                    var: string;
                }>]>>;
                compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
            }, "strict", z.ZodTypeAny, {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }, {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }>, "many">>;
            filters: z.ZodOptional<z.ZodArray<z.ZodType<QueryFilter, z.ZodTypeDef, QueryFilter>, "many">>;
            segments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            order: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>>;
            limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            total: z.ZodOptional<z.ZodBoolean>;
            timezone: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        }, {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        }>;
        chart: z.ZodObject<{
            family: z.ZodString;
            /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
             carry their own mapping inside familyOptions, so this is optional at the envelope. */
            mapping: z.ZodOptional<z.ZodObject<{
                category: z.ZodObject<{
                    member: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    member: string;
                }, {
                    member: string;
                }>;
                series: z.ZodUnion<[z.ZodObject<{
                    mode: z.ZodLiteral<"measures">;
                    members: z.ZodArray<z.ZodString, "many">;
                    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodOptional<z.ZodString>;
                        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                        stackId: z.ZodOptional<z.ZodString>;
                        axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                        /** Per-series line shape (line/area) — overrides the family default. */
                        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                        /** Per-series point markers (line/area) — overrides the family default. */
                        dots: z.ZodOptional<z.ZodBoolean>;
                        format: z.ZodOptional<z.ZodObject<{
                            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                            decimals: z.ZodOptional<z.ZodNumber>;
                            abbreviate: z.ZodOptional<z.ZodBoolean>;
                            prefix: z.ZodOptional<z.ZodString>;
                            suffix: z.ZodOptional<z.ZodString>;
                            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                            dateFormat: z.ZodOptional<z.ZodString>;
                            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                            currency: z.ZodOptional<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }>>;
                    }, "strict", z.ZodTypeAny, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }>>>;
                }, "strict", z.ZodTypeAny, {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }, {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }>, z.ZodObject<{
                    mode: z.ZodLiteral<"pivot">;
                    /** The primary split measure — drives the value-axis unit. Always set
                     *  (also the only value when a single measure is split by colour). */
                    value: z.ZodString;
                    /** When MORE THAN ONE measure is split by the colour dimension, the full
                     *  ordered measure list (series = measure × pivot value). `value` is
                     *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
                    values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    pivot: z.ZodString;
                    /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
                     *  each measure's series sit on, so a multi-measure color split can be
                     *  dual-axis (each axis one unit). */
                    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                        label: z.ZodOptional<z.ZodString>;
                        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                        stackId: z.ZodOptional<z.ZodString>;
                        axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                        /** Per-series line shape (line/area) — overrides the family default. */
                        curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                        /** Per-series point markers (line/area) — overrides the family default. */
                        dots: z.ZodOptional<z.ZodBoolean>;
                        format: z.ZodOptional<z.ZodObject<{
                            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                            decimals: z.ZodOptional<z.ZodNumber>;
                            abbreviate: z.ZodOptional<z.ZodBoolean>;
                            prefix: z.ZodOptional<z.ZodString>;
                            suffix: z.ZodOptional<z.ZodString>;
                            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                            dateFormat: z.ZodOptional<z.ZodString>;
                            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                            currency: z.ZodOptional<z.ZodString>;
                        }, "strict", z.ZodTypeAny, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }, {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        }>>;
                    }, "strict", z.ZodTypeAny, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }>>>;
                }, "strict", z.ZodTypeAny, {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }, {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                }>]>;
            }, "strict", z.ZodTypeAny, {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            }, {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            }>>;
            orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal"]>>;
            stackMode: z.ZodOptional<z.ZodEnum<["none", "stacked", "grouped", "percent"]>>;
            legend: z.ZodOptional<z.ZodObject<{
                show: z.ZodOptional<z.ZodBoolean>;
                position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
            }, "strict", z.ZodTypeAny, {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            }, {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            }>>;
            tooltip: z.ZodOptional<z.ZodObject<{
                show: z.ZodOptional<z.ZodBoolean>;
                indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
                showTotal: z.ZodOptional<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            }, {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            }>>;
            axes: z.ZodOptional<z.ZodObject<{
                x: z.ZodOptional<z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                    labelHide: z.ZodOptional<z.ZodBoolean>;
                    hide: z.ZodOptional<z.ZodBoolean>;
                    scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                    domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                    tickFormat: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>;
                y: z.ZodOptional<z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                    labelHide: z.ZodOptional<z.ZodBoolean>;
                    hide: z.ZodOptional<z.ZodBoolean>;
                    scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                    domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                    tickFormat: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>;
                y2: z.ZodOptional<z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                    labelHide: z.ZodOptional<z.ZodBoolean>;
                    hide: z.ZodOptional<z.ZodBoolean>;
                    scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                    domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                    tickFormat: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            }, {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            }>>;
            colors: z.ZodOptional<z.ZodObject<{
                byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
                ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
            }, "strict", z.ZodTypeAny, {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            }, {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            }>>;
            format: z.ZodOptional<z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                decimals: z.ZodOptional<z.ZodNumber>;
                abbreviate: z.ZodOptional<z.ZodBoolean>;
                prefix: z.ZodOptional<z.ZodString>;
                suffix: z.ZodOptional<z.ZodString>;
                unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                dateFormat: z.ZodOptional<z.ZodString>;
                /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                currency: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }, {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            }>>;
            /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
            familyOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strict", z.ZodTypeAny, {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        }, {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        }>;
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    }, {
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
        doc: z.ZodType<{
            type: string;
            content?: unknown[];
        }, z.ZodTypeDef, {
            type: string;
            content?: unknown[];
        }>;
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    }, {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"input">;
        control: z.ZodObject<{
            variable: z.ZodString;
            control: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"dateRange">;
                presets: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                allowFuture: z.ZodOptional<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            }, {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"granularity">;
                options: z.ZodOptional<z.ZodArray<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, "many">>;
                /** A dateRange variable whose span narrows the offered granularities. */
                rangeVariable: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            }, {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"select">;
                options: z.ZodArray<z.ZodObject<{
                    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>;
                    label: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }, {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }>, "many">;
                multiple: z.ZodOptional<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            }, {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"memberSelect">;
                from: z.ZodEnum<["dimension", "measure", "dimensionOrMeasure"]>;
                cube: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            }, {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"text">;
                placeholder: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                kind: "text";
                placeholder?: string | undefined;
            }, {
                kind: "text";
                placeholder?: string | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"number">;
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                step: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            }, {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"toggle">;
            }, "strict", z.ZodTypeAny, {
                kind: "toggle";
            }, {
                kind: "toggle";
            }>]>;
        }, "strict", z.ZodTypeAny, {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        }, {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        }>;
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    }, {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    }>]>, "many">;
    layout: z.ZodArray<z.ZodObject<{
        i: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        w: z.ZodNumber;
        h: z.ZodNumber;
        minW: z.ZodOptional<z.ZodNumber>;
        minH: z.ZodOptional<z.ZodNumber>;
        static: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }, {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }>, "many">;
    grid: z.ZodOptional<z.ZodObject<{
        cols: z.ZodOptional<z.ZodNumber>;
        rowHeight: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
        containerPadding: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
    }, "strict", z.ZodTypeAny, {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    }, {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    }>>;
    schemaVersion: z.ZodLiteral<1>;
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    kind: "dashboard";
    id: string;
    schemaVersion: 1;
    variables: {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }[];
    widgets: ({
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    } | {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    } | {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    })[];
    layout: {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }[];
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    grid?: {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    } | undefined;
}, {
    kind: "dashboard";
    id: string;
    schemaVersion: 1;
    variables: {
        type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
        name: string;
        array?: boolean | undefined;
        label?: string | undefined;
        default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
    }[];
    widgets: ({
        type: "chart";
        chart: {
            family: string;
            format?: {
                currency?: string | undefined;
                kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                decimals?: number | undefined;
                abbreviate?: boolean | undefined;
                prefix?: string | undefined;
                suffix?: string | undefined;
                unitSystem?: "metric" | "imperial" | undefined;
                dateFormat?: string | undefined;
            } | undefined;
            mapping?: {
                category: {
                    member: string;
                };
                series: {
                    mode: "measures";
                    members: string[];
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                } | {
                    value: string;
                    mode: "pivot";
                    pivot: string;
                    values?: string[] | undefined;
                    meta?: Record<string, {
                        label?: string | undefined;
                        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                        stackId?: string | undefined;
                        axis?: "left" | "right" | undefined;
                        curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                        dots?: boolean | undefined;
                        format?: {
                            currency?: string | undefined;
                            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                            decimals?: number | undefined;
                            abbreviate?: boolean | undefined;
                            prefix?: string | undefined;
                            suffix?: string | undefined;
                            unitSystem?: "metric" | "imperial" | undefined;
                            dateFormat?: string | undefined;
                        } | undefined;
                    }> | undefined;
                };
            } | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
            legend?: {
                show?: boolean | undefined;
                position?: "left" | "right" | "top" | "bottom" | undefined;
            } | undefined;
            tooltip?: {
                show?: boolean | undefined;
                indicator?: "line" | "dot" | "dashed" | undefined;
                showTotal?: boolean | undefined;
            } | undefined;
            axes?: {
                x?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
                y2?: {
                    label?: string | undefined;
                    labelHide?: boolean | undefined;
                    hide?: boolean | undefined;
                    scale?: "linear" | "log" | undefined;
                    domain?: [number | "auto", number | "auto"] | undefined;
                    tickFormat?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            colors?: {
                byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
                ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
            } | undefined;
            familyOptions?: Record<string, unknown> | undefined;
        };
        query: {
            measures?: string[] | undefined;
            dimensions?: string[] | undefined;
            timeDimensions?: {
                dimension: string;
                granularity?: {
                    var: string;
                } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
                dateRange?: string | {
                    var: string;
                } | [string, string] | undefined;
                compareDateRange?: (string | [string, string])[] | undefined;
            }[] | undefined;
            filters?: QueryFilter[] | undefined;
            segments?: string[] | undefined;
            order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
            limit?: number | {
                var: string;
            } | undefined;
            offset?: number | {
                var: string;
            } | undefined;
            total?: boolean | undefined;
            timezone?: string | undefined;
        };
        id: string;
        title?: string | undefined;
    } | {
        type: "text";
        id: string;
        doc: {
            type: string;
            content?: unknown[];
        };
        title?: string | undefined;
    } | {
        type: "input";
        control: {
            variable: string;
            control: {
                kind: "dateRange";
                presets?: string[] | undefined;
                allowFuture?: boolean | undefined;
            } | {
                kind: "granularity";
                options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
                rangeVariable?: string | undefined;
            } | {
                options: {
                    value: string | number | boolean | [string, string] | string[] | number[];
                    label: string;
                }[];
                kind: "select";
                multiple?: boolean | undefined;
            } | {
                kind: "memberSelect";
                from: "dimension" | "measure" | "dimensionOrMeasure";
                cube?: string | undefined;
            } | {
                kind: "text";
                placeholder?: string | undefined;
            } | {
                kind: "number";
                step?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
            } | {
                kind: "toggle";
            };
        };
        id: string;
        title?: string | undefined;
    })[];
    layout: {
        x: number;
        y: number;
        i: string;
        w: number;
        h: number;
        minW?: number | undefined;
        minH?: number | undefined;
        static?: boolean | undefined;
    }[];
    name?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    grid?: {
        cols?: number | undefined;
        rowHeight?: number | undefined;
        margin?: [number, number] | undefined;
        containerPadding?: [number, number] | undefined;
    } | undefined;
}>]>;

/**
 * The STABLE half of the dashboard API (everything except the live `vars` snapshot).
 * Its identity is constant for the life of a provider instance, so consuming it (e.g.
 * to call `resolveQuery`/`setVar`/`resolveValue`) does NOT re-render on every `setVar`.
 * The live `vars` snapshot is exposed separately via a per-consumer subscription
 * ({@link useDashboardVar} / the lazily-subscribed `vars` getter in {@link useDashboard}),
 * so a single variable write only re-renders the widgets that actually read it.
 */
declare interface StableDashboardApi {
    store: VariableStore;
    setVar: (name: string, value: VariableValue | undefined) => void;
    resolveQuery: (query: CubeQuery) => CubeQuery;
    resolveValue: (name: string) => VariableValue | undefined;
    decls: VariableDecl[];
}

/**
 * The empty / loading state slots. Empty fires when `NormalizedChartData.empty`
 * (noFilter dropped everything or zero rows). Stateless by contract — these are
 * pure presentational placeholders.
 */
export declare type StateComponent = React_2.ComponentType<Record<string, never>>;

export declare const tableChartFamily: ChartFamilyDescriptor;

export declare type TableColumnOpt = z.infer<typeof TableColumnOptSchema>;

export declare const TableColumnOptSchema: z.ZodObject<{
    member: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodObject<{
        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
        decimals: z.ZodOptional<z.ZodNumber>;
        abbreviate: z.ZodOptional<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodString>;
        suffix: z.ZodOptional<z.ZodString>;
        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
        dateFormat: z.ZodOptional<z.ZodString>;
        currency: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }, {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    }>>;
    align: z.ZodOptional<z.ZodEnum<["left", "right", "center"]>>;
    width: z.ZodOptional<z.ZodNumber>;
    hidden: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    member: string;
    label?: string | undefined;
    format?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
    hidden?: boolean | undefined;
    width?: number | undefined;
    align?: "left" | "right" | "center" | undefined;
}, {
    member: string;
    label?: string | undefined;
    format?: {
        currency?: string | undefined;
        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
        decimals?: number | undefined;
        abbreviate?: boolean | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        unitSystem?: "metric" | "imperial" | undefined;
        dateFormat?: string | undefined;
    } | undefined;
    hidden?: boolean | undefined;
    width?: number | undefined;
    align?: "left" | "right" | "center" | undefined;
}>;

/**
 * `table` — covers table + pivot (docs/02-chart-options.md §2.7). Renders a
 * shadcn <Table> from `raw.rows` + annotation; client-side sort + paging. NOT
 * Recharts. Columns default to every annotated member, overridable/orderable
 * via `familyOptions.columns`.
 */
export declare function TableFamily({ data, options, format }: ChartComponentProps): React_2.ReactElement;

export declare type TableFamilyOptions = z.infer<typeof TableFamilyOptionsSchema>;

export declare const TableFamilyOptionsSchema: z.ZodObject<{
    columns: z.ZodOptional<z.ZodArray<z.ZodObject<{
        member: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
        format: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
        align: z.ZodOptional<z.ZodEnum<["left", "right", "center"]>>;
        width: z.ZodOptional<z.ZodNumber>;
        hidden: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        member: string;
        label?: string | undefined;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        hidden?: boolean | undefined;
        width?: number | undefined;
        align?: "left" | "right" | "center" | undefined;
    }, {
        member: string;
        label?: string | undefined;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        hidden?: boolean | undefined;
        width?: number | undefined;
        align?: "left" | "right" | "center" | undefined;
    }>, "many">>;
    pageSize: z.ZodOptional<z.ZodNumber>;
    sortable: z.ZodOptional<z.ZodBoolean>;
    stickyHeader: z.ZodOptional<z.ZodBoolean>;
    rowHeight: z.ZodOptional<z.ZodEnum<["compact", "default"]>>;
    showRowNumbers: z.ZodOptional<z.ZodBoolean>;
    conditionalFormat: z.ZodOptional<z.ZodArray<z.ZodObject<{
        member: z.ZodString;
        when: z.ZodObject<{
            op: z.ZodEnum<["gt", "lt", "gte", "lte", "eq"]>;
            value: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            value: number;
            op: "gt" | "gte" | "lt" | "lte" | "eq";
        }, {
            value: number;
            op: "gt" | "gte" | "lt" | "lte" | "eq";
        }>;
        colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
    }, "strict", z.ZodTypeAny, {
        member: string;
        when: {
            value: number;
            op: "gt" | "gte" | "lt" | "lte" | "eq";
        };
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    }, {
        member: string;
        when: {
            value: number;
            op: "gt" | "gte" | "lt" | "lte" | "eq";
        };
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    rowHeight?: "default" | "compact" | undefined;
    columns?: {
        member: string;
        label?: string | undefined;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        hidden?: boolean | undefined;
        width?: number | undefined;
        align?: "left" | "right" | "center" | undefined;
    }[] | undefined;
    pageSize?: number | undefined;
    sortable?: boolean | undefined;
    stickyHeader?: boolean | undefined;
    showRowNumbers?: boolean | undefined;
    conditionalFormat?: {
        member: string;
        when: {
            value: number;
            op: "gt" | "gte" | "lt" | "lte" | "eq";
        };
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    }[] | undefined;
}, {
    rowHeight?: "default" | "compact" | undefined;
    columns?: {
        member: string;
        label?: string | undefined;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        hidden?: boolean | undefined;
        width?: number | undefined;
        align?: "left" | "right" | "center" | undefined;
    }[] | undefined;
    pageSize?: number | undefined;
    sortable?: boolean | undefined;
    stickyHeader?: boolean | undefined;
    showRowNumbers?: boolean | undefined;
    conditionalFormat?: {
        member: string;
        when: {
            value: number;
            op: "gt" | "gte" | "lt" | "lte" | "eq";
        };
        colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
    }[] | undefined;
}>;

export declare type TextWidget = z.infer<typeof TextWidgetSchema>;

export declare function TextWidgetEditor({ widget, onChange, }: TextWidgetEditorProps): React_2.ReactElement;

/**
 * EDITABLE TipTap editor for a {@link TextWidget} (docs/03 §A3.2 "Add" → text). The
 * runtime `TextWidget` view mounts the SAME StarterKit schema with `editable:false`,
 * so a doc authored here renders identically at runtime. On every transaction we
 * emit `editor.getJSON()` as the widget's `doc`.
 *
 * Self-contained toolbar (no extra deps): bold/italic/strike, H1/H2, lists, quote —
 * plain buttons that toggle StarterKit marks/nodes. WebView-safe (no portals).
 */
export declare interface TextWidgetEditorProps {
    widget: TextWidget;
    onChange: (widget: TextWidget) => void;
}

export declare const TextWidgetSchema: z.ZodObject<{
    type: z.ZodLiteral<"text">;
    doc: z.ZodType<{
        type: string;
        content?: unknown[];
    }, z.ZodTypeDef, {
        type: string;
        content?: unknown[];
    }>;
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "text";
    id: string;
    doc: {
        type: string;
        content?: unknown[];
    };
    title?: string | undefined;
}, {
    type: "text";
    id: string;
    doc: {
        type: string;
        content?: unknown[];
    };
    title?: string | undefined;
}>;

export declare function TextWidgetView({ doc }: TextWidgetViewProps): ReactElement;

/**
 * Render a {@link TipTapDoc} READ-ONLY (docs/01-spec-schema.md §3.5,
 * docs/03-override-theme-preview.md A3). A `TextWidget.doc` is ProseMirror JSON
 * straight from `editor.getJSON()`, so the *same* StarterKit schema renders it
 * with `editable: false` — guaranteeing the displayed doc matches the authored one.
 *
 * Unknown node types are guarded two ways: `enableContentCheck` makes TipTap
 * validate the doc against the StarterKit schema instead of throwing, and a guard
 * up front rejects a structurally-invalid doc with a muted fallback rather than
 * mounting an editor on garbage. The editor never re-creates on content identity
 * churn — it re-renders in place when `doc` changes.
 */
export declare interface TextWidgetViewProps {
    /** ProseMirror / TipTap document JSON (the `TextWidget.doc` payload). */
    doc: TipTapDoc;
}

export declare type ThemeMode = "light" | "dark";

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};

export declare interface ThemeState {
    mode: ThemeMode;
    tokens?: Record<string, string>;
}

export declare type TimeDimension = z.infer<typeof TimeDimensionSchema>;

export declare const TimeDimensionSchema: z.ZodObject<{
    dimension: z.ZodString;
    granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
        var: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        var: string;
    }, {
        var: string;
    }>]>>;
    dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
        var: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        var: string;
    }, {
        var: string;
    }>]>>;
    compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
}, "strict", z.ZodTypeAny, {
    dimension: string;
    granularity?: {
        var: string;
    } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
    dateRange?: string | {
        var: string;
    } | [string, string] | undefined;
    compareDateRange?: (string | [string, string])[] | undefined;
}, {
    dimension: string;
    granularity?: {
        var: string;
    } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
    dateRange?: string | {
        var: string;
    } | [string, string] | undefined;
    compareDateRange?: (string | [string, string])[] | undefined;
}>;

export declare type TipTapDoc = z.infer<typeof TipTapDocSchema>;

/** ProseMirror / TipTap document JSON (`editor.getJSON()`). Loosely typed on purpose. */
export declare const TipTapDocSchema: z.ZodType<{
    type: string;
    content?: unknown[];
}>;

/** Coerce an ISO string / epoch-millis number / Date into a Date (or null). */
export declare function toDate(value: string | number | Date): Date | null;

export declare type TooltipOptions = z.infer<typeof TooltipOptionsSchema>;

export declare const TooltipOptionsSchema: z.ZodObject<{
    show: z.ZodOptional<z.ZodBoolean>;
    indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
    showTotal: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    show?: boolean | undefined;
    indicator?: "line" | "dot" | "dashed" | undefined;
    showTotal?: boolean | undefined;
}, {
    show?: boolean | undefined;
    indicator?: "line" | "dot" | "dashed" | undefined;
    showTotal?: boolean | undefined;
}>;

/** Convert Cube's `QueryAnnotations` into our `ResultAnnotation` shape. */
export declare function toResultAnnotation(raw: {
    measures?: Record<string, {
        title?: string;
        shortTitle?: string;
        type?: string;
        meta?: unknown;
    }>;
    dimensions?: Record<string, {
        title?: string;
        shortTitle?: string;
        type?: string;
        meta?: unknown;
    }>;
    segments?: Record<string, {
        title?: string;
        shortTitle?: string;
        type?: string;
        meta?: unknown;
    }>;
    timeDimensions?: Record<string, {
        title?: string;
        shortTitle?: string;
        type?: string;
        meta?: unknown;
    }>;
}): ResultAnnotation;

export declare interface Transport {
    init(): Promise<TransportInit>;
    onSpec(cb: (spec: Spec) => void): () => void;
    onVariable(cb: (name: string, value: VariableValue) => void): () => void;
    onTheme(cb: (theme: ThemeState) => void): () => void;
    onMode(cb: (mode: "view" | "edit") => void): () => void;
    onConnection(cb: (c: CubeConnectionWire) => void): () => void;
    reportSpecChange(spec: Spec, reason: "edit" | "export"): void;
    reportSaveRequested(spec: Spec): void;
    reportVariableChange(name: string, value: VariableValue): void;
    reportHeight(height: number): void;
    reportError(err: BridgeError): void;
}

export declare interface TransportInit {
    spec: Spec;
    connection?: CubeConnectionWire;
    theme: ThemeState;
    mode: "view" | "edit";
    variables?: Record<string, VariableValue>;
}

/**
 * The cube-viz UNITS registry — a CORE, EXTENSIBLE feature.
 *
 * Values are stored metric; a {@link UnitDef} declares the imperial display unit
 * and a pure metric→imperial conversion. {@link DEFAULT_UNIT_CONVERSIONS} ships a
 * batteries-included default table keyed by STORAGE unit; the actual conversion
 * math is delegated to the vetted {@link https://www.npmjs.com/package/convert-units
 * convert-units} library (NOT hand-rolled factors), so every metric↔imperial pair
 * it supports is correct and maintained upstream. Hosts EXTEND/override the table
 * via the provider's `units` prop (the extension point).
 *
 * The other half of the feature is per-axis CONSISTENCY: {@link axisKey} maps a
 * member's meta to a compatibility key so the builder can enforce that every
 * variable on one value-axis describes the same KIND of quantity.
 */
/** A metric→imperial conversion rule. Storage is metric; this converts to imperial. */
export declare interface UnitDef {
    /** Unit shown when the viewer's unitSystem is "imperial" (e.g. "mi"). */
    imperialUnit: string;
    /** Pure storage(metric)→imperial conversion. */
    toImperial: (v: number) => number;
}

export declare interface UseChartEditorState {
    /** The current working spec (may be an invalid draft mid-edit). */
    draft: ChartSpec;
    /** Validation issues for `draft`; empty when valid. */
    issues: ChartEditorIssue[];
    /** True when `draft` passes `ChartSpecSchema`. */
    valid: boolean;
    /** The last spec emitted to the host (always valid). */
    committed: ChartSpec;
    /** Apply an edit: validate, hold as draft, and (if valid) debounce-emit it. */
    update: (next: ChartSpec) => void;
}

export declare function useChartEditorState({ spec, onChange, debounceMs, }: UseChartEditorStateOptions): UseChartEditorState;

export declare interface UseChartEditorStateOptions {
    spec: ChartSpec;
    onChange: (next: ChartSpec) => void;
    /** Debounce for `onChange` (ms). Default 250. */
    debounceMs?: number;
}

/**
 * Measure the **container** width of the attached element via `ResizeObserver`
 * (docs/01-spec-schema.md §4, docs/03-override-theme-preview.md A3.2). This is the
 * single primitive that makes cube-viz responsive *without breakpoints*: the
 * dashboard reflows to its container, not the viewport, so the same bytes lay out
 * correctly in a desktop panel, a resizable editor pane, and a mobile WebView.
 *
 * The returned width is debounced to the next animation frame so a burst of
 * `ResizeObserver` callbacks (e.g. during a drag/resize, or a panel opening)
 * collapses into a single React re-render per frame. The hook is SSR-safe: it
 * reports `0` until the element is attached and first measured, and consumers
 * (RGL `Responsive`) treat a `0` width as "don't render yet".
 *
 * @returns `[ref, width]` — attach `ref` to the element to measure; `width` is its
 *          current content-box width in CSS pixels.
 */
export declare function useContainerWidth<T extends HTMLElement = HTMLDivElement>(): [
React.RefCallback<T>,
number
];

export declare function useCubeMeta(): UseCubeMetaResult;

/**
 * Cube `/v1/meta` introspection (docs/03-override-theme-preview.md §A2.5). Powers
 * editors / field pickers, which read real member names verbatim (never guessed —
 * critical for `prefix:true` view members like `trip_performance.devices_name`).
 *
 * `/v1/meta` returns shape only; it never issues `/v1/load`. The result is fetched
 * once per Cube client and re-fetched if the client identity changes; stale
 * responses are ignored.
 */
export declare interface UseCubeMetaResult {
    meta?: CubeMeta;
    isLoading: boolean;
    error?: Error;
}

export declare function useCubeQuery(query: CubeQuery, opts?: UseCubeQueryOptions): UseCubeQueryResult;

export declare interface UseCubeQueryOptions {
    /** When true, no request is issued (e.g. an incomplete editor query). */
    skip?: boolean;
}

/**
 * The raw Cube fetch hook (docs/03-override-theme-preview.md §A2.5). Loads a
 * **resolved** query (variables already substituted) through the context's Cube
 * client, with `castNumerics: true` so number members arrive as numbers. The SDK
 * owns the `Continue wait` long-poll loop and the raw-JWT `Authorization` header —
 * we never re-implement either.
 *
 * Stale-response safety: each fetch is keyed by a stable serialization of the
 * query; a response is applied only if its key still matches the latest request,
 * so a fast edit never lets an older in-flight result clobber a newer one.
 */
export declare interface UseCubeQueryResult {
    resultSet?: ResultSet<Record<string, unknown>>;
    isLoading: boolean;
    error?: Error;
    /** Force a re-fetch (cache-bypass via a fresh request), e.g. a Refresh action. */
    refetch?: () => void;
}

/**
 * Read the cube-viz runtime context. Throws if no {@link CubeVizProvider} is an
 * ancestor — every chart/hook needs the Cube client + registry, so a missing
 * provider is a programming error worth failing loudly on.
 */
export declare function useCubeVizContext(): CubeVizContextValue;

/**
 * Read the dashboard variable API. Throws if no {@link DashboardProvider} is an
 * ancestor — variable-bound widgets require a store.
 *
 * This hook subscribes to the variable store: a component using it re-renders when ANY
 * variable changes (because it exposes the live `vars` snapshot + a reactive
 * `resolveValue`). Input/control widgets that read their bound value want exactly this.
 * Code that only needs the stable callbacks (e.g. `resolveQuery` in
 * {@link useNormalizedSeries}) should destructure them from {@link useOptionalDashboard}
 * so it does NOT subscribe and does NOT re-render on unrelated variable edits.
 */
export declare function useDashboard(): DashboardContextValue;

/**
 * Debounce a callback by `delay` ms, keeping the latest callback identity without
 * resetting the timer (a ref holds the current fn). Cleans the pending timer up on
 * unmount so a late `onChange` never fires after the editor is gone.
 *
 * Used to debounce the editor's `onChange` so keystroke-level edits don't flood the
 * host while still emitting JSON-out on every change (eventually-consistent).
 */
export declare function useDebouncedCallback<A extends unknown[]>(fn: (...args: A) => void, delay: number): (...args: A) => void;

/**
 * The immutable chart-family registry from context (builtins + the provider's host
 * `families`). Component call sites use this to dispatch / read wells / resolve options
 * for a family. Throws (via {@link useCubeVizContext}) outside a provider.
 */
export declare function useFamilyRegistry(): FamilyRegistry;

/**
 * The one DRY formatting path for hosts (docs/03-override-theme-preview.md §A2.5).
 *
 * Units are a CORE, on-by-default feature: when the host does NOT supply a
 * `locale.formatValue`, this returns the core {@link createUnitsFormatter}, built
 * from {@link mergeUnitConversions}(provider `locale.units`) so any host-registered
 * conversions are folded over the defaults. A host-supplied `formatValue` still
 * fully overrides (the pluggable seam stays). The result is memoized so the
 * formatter identity is stable across renders. The same formatter the families use,
 * exposed for a host that renders its own surface from `useNormalizedSeries`.
 *
 * @example
 *   const fmt = useFormatter();
 *   fmt({ value: 12345, member: "device_trips.total_distance", role: "value" });
 */
export declare function useFormatter(): ValueFormatter;

export declare function useNormalizedSeries(query: CubeQuery, options: ChartOptions, opts?: UseNormalizedSeriesOptions): UseNormalizedSeriesResult;

export declare interface UseNormalizedSeriesOptions {
    /** When true, no request is issued. */
    skip?: boolean;
    /** When true, the query is used VERBATIM (no dashboard variable resolution). Use for a
     *  query already built from a resolved one — e.g. the previous-period companion. */
    skipResolve?: boolean;
}

/**
 * Fetch + normalize in one step (docs/03-override-theme-preview.md §A2.5). Returns
 * the SAME {@link NormalizedChartData} the renderer consumes, applying — when the
 * hook is inside a `DashboardProvider` — variable resolution + the noFilter rule
 * automatically. A standalone chart (no dashboard) uses the query verbatim.
 *
 * This is the seam the registry chart components are built on, so a host gets
 * identical behaviour whether it renders `<CubeChart>` or wires the hook by hand.
 */
export declare interface UseNormalizedSeriesResult {
    data?: NormalizedChartData;
    isLoading: boolean;
    error?: Error;
    /** Force a re-fetch (Refresh action). */
    refetch?: () => void;
    /** The literal (variables-substituted, noFilter-applied) query that was fetched. Useful
     *  for deriving a SECOND query off the resolved values (e.g. previous-period compare). */
    resolvedQuery: CubeQuery;
}

/**
 * Optional variant: returns the STABLE dashboard API if inside a
 * {@link DashboardProvider}, else `null`. Does NOT subscribe to variable changes, so a
 * consumer re-renders only when it reads something that actually changed. Used by
 * {@link useNormalizedSeries} (depends on the stable `resolveQuery`) so a standalone
 * chart still works while a dashboard-embedded one picks up variable resolution without
 * re-normalizing board-wide on every unrelated `setVar`.
 */
export declare function useOptionalDashboard(): StableDashboardApi | null;

/** Validate an already-current-version Spec (no migration). */
export declare function validateSpec(raw: unknown): Spec;

/** A host-pluggable value formatter: pure `(FormatContext) → string`. */
export declare type ValueFormatter = (ctx: FormatContext) => string;

export declare type VariableDecl = z.infer<typeof VariableDeclSchema>;

export declare const VariableDeclSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["dateRange", "time", "granularity", "string", "number", "boolean", "dimension", "measure", "dimensionOrMeasure"]>;
    label: z.ZodOptional<z.ZodString>;
    array: z.ZodOptional<z.ZodBoolean>;
    default: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>>;
}, "strict", z.ZodTypeAny, {
    type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
    name: string;
    array?: boolean | undefined;
    label?: string | undefined;
    default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
}, {
    type: "string" | "number" | "boolean" | "dimension" | "granularity" | "dateRange" | "measure" | "dimensionOrMeasure" | "time";
    name: string;
    array?: boolean | undefined;
    label?: string | undefined;
    default?: string | number | boolean | [string, string] | string[] | number[] | undefined;
}>;

export declare function VariablesPanel({ variables, onChange, newName, }: VariablesPanelProps): React_2.ReactElement;

/**
 * Declare / edit / remove the dashboard's {@link VariableDecl}[] (docs/03 §A3.2
 * "Variables"). Each variable carries a name, type, optional label, `array` flag,
 * and a default. Date-range/time defaults PREFER relative strings ("This month")
 * over absolute pairs, so the dashboard opens with a sensible live range and never
 * bakes in stale absolute dates.
 *
 * Variable names are validated inline (non-empty, unique). The panel emits the full
 * `VariableDecl[]` on every edit; the editor owns merging it into the spec.
 */
export declare interface VariablesPanelProps {
    variables: VariableDecl[];
    onChange: (variables: VariableDecl[]) => void;
    /** Mint a unique fallback variable name when adding. */
    newName?: () => string;
}

/**
 * A tiny, framework-free reactive variable store — the runtime home of a
 * dashboard's variable values (the spec only declares names + defaults).
 * See docs/01-spec-schema.md §5.
 *
 * Deliberately dependency-free: a React adapter (useSyncExternalStore) can wrap
 * `subscribe`/`getAll` without this module importing React.
 */
export declare interface VariableStore {
    /** Current value of one variable (store value, else decl default, else undefined). */
    get(name: string): VariableValue | undefined;
    /** A snapshot of every variable's current value. Stable identity until the next `set`. */
    getAll(): Record<string, VariableValue>;
    /** Write a variable (leg 1). `undefined` clears it back toward its default/unset. */
    set(name: string, value: VariableValue | undefined): void;
    /** Subscribe to any change; returns an unsubscribe fn. */
    subscribe(cb: () => void): () => void;
}

export declare type VariableType = z.infer<typeof VariableTypeSchema>;

export declare const VariableTypeSchema: z.ZodEnum<["dateRange", "time", "granularity", "string", "number", "boolean", "dimension", "measure", "dimensionOrMeasure"]>;

export declare type VariableValue = z.infer<typeof VariableValueSchema>;

export declare const VariableValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>;

export declare type VarRef = z.infer<typeof VarRefSchema>;

/** Anywhere a literal value may appear, the spec may instead carry `{ var: "name" }`. */
export declare const VarRefSchema: z.ZodObject<{
    var: z.ZodString;
}, "strict", z.ZodTypeAny, {
    var: string;
}, {
    var: string;
}>;

/** A typed slot in the builder. `kinds` gates which fields may be dropped/clicked in. */
export declare interface WellDef {
    id: string;
    label: string;
    hint?: string;
    cardinality: "one" | "many";
    kinds: FieldKind[];
    /** Optional wells render a muted "(optional)" affordance. */
    optional?: boolean;
}

export declare function WidgetChrome(props: WidgetChromeProps): ReactElement;

/** A widget-chrome override component. */
export declare type WidgetChromeComponent = React_2.ComponentType<WidgetChromeProps>;

/**
 * The component-override surface (docs/03-override-theme-preview.md §A2). A host
 * injects a {@link ComponentRegistry} into {@link CubeVizProvider}; resolution is
 * always **registry slot → built-in fallback**, per slot and additive — nothing
 * is all-or-nothing. The same `NormalizedChartData` / value-editor boundaries the
 * built-ins sit on are exactly what an override receives, so behaviour is identical
 * whether a slot is overridden or not.
 */
/**
 * The frame around a widget: title bar, overflow/actions menu, drag affordance,
 * and the empty/error/loading body states. Overriding `chrome.widget` restyles
 * every widget at once; the layout engine stays library-owned (the custom header
 * still receives {@link WidgetChromeProps.dragHandleProps}).
 */
export declare interface WidgetChromeProps {
    /** The widget being framed (chart/text/input). */
    widget: WidgetSpec;
    /** Resolved title (widget.title ?? spec name ?? undefined). */
    title?: string;
    /** Built-in actions menu (export CSV/XLSX, edit-in-edit-mode). Render verbatim. */
    menu: React_2.ReactNode;
    /** Spread onto the custom header so it works as the react-grid-layout drag handle. */
    dragHandleProps: Record<string, unknown>;
    /** The widget body (chart / rich text / input control). */
    children: React_2.ReactNode;
    /** Coarse render state for chrome-level affordances. */
    state: {
        loading: boolean;
        error?: Error;
        empty: boolean;
    };
}

export declare function WidgetEditPanel({ widget, variables, onChange, onVariablesChange, fill, }: WidgetEditPanelProps): React_2.ReactElement;

/**
 * The per-widget edit panel hosted in the docked/inline {@link EditorShell} panel
 * (docs/03 §A3.2 "Select-to-edit"). Dispatches by widget type:
 *  - chart → the sibling {@link ChartEditor} (a ChartSpec-in/out editor; we adapt
 *    the `ChartWidget` ↔ `ChartSpec` at the seam so the chart editor stays unaware
 *    of the dashboard envelope)
 *  - text  → the editable TipTap {@link TextWidgetEditor}
 *  - input → the {@link InputWidgetEditor} (variable + kind + kind options)
 *
 * Plus a shared title field for every widget. The panel is pure: it emits the next
 * `WidgetSpec` upward; the editor merges it into the spec.
 */
export declare interface WidgetEditPanelProps {
    widget: WidgetSpec;
    /** Dashboard variables (for the input widget's variable binding). */
    variables: VariableDecl[];
    onChange: (widget: WidgetSpec) => void;
    /** Register a new dashboard variable (enables inline "New variable" in binding controls). */
    onVariablesChange?: (variables: VariableDecl[]) => void;
    /** Fill the parent's height (full-screen editing) — the chart editor's preview fills the screen. */
    fill?: boolean;
}

export declare type WidgetSpec = z.infer<typeof WidgetSpecSchema>;

export declare const WidgetSpecSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"chart">;
    query: z.ZodObject<{
        measures: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeDimensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            dimension: z.ZodString;
            granularity: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            dateRange: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, z.ZodObject<{
                var: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                var: string;
            }, {
                var: string;
            }>]>>;
            compareDateRange: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodString]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }, {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }>, "many">>;
        filters: z.ZodOptional<z.ZodArray<z.ZodType<QueryFilter, z.ZodTypeDef, QueryFilter>, "many">>;
        segments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        order: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodEnum<["asc", "desc"]>>, z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodEnum<["asc", "desc"]>], null>, "many">]>>;
        limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            var: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            var: string;
        }, {
            var: string;
        }>]>>;
        total: z.ZodOptional<z.ZodBoolean>;
        timezone: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }, {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    }>;
    chart: z.ZodObject<{
        family: z.ZodString;
        /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
         carry their own mapping inside familyOptions, so this is optional at the envelope. */
        mapping: z.ZodOptional<z.ZodObject<{
            category: z.ZodObject<{
                member: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                member: string;
            }, {
                member: string;
            }>;
            series: z.ZodUnion<[z.ZodObject<{
                mode: z.ZodLiteral<"measures">;
                members: z.ZodArray<z.ZodString, "many">;
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"pivot">;
                /** The primary split measure — drives the value-axis unit. Always set
                 *  (also the only value when a single measure is split by colour). */
                value: z.ZodString;
                /** When MORE THAN ONE measure is split by the colour dimension, the full
                 *  ordered measure list (series = measure × pivot value). `value` is
                 *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
                values: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                pivot: z.ZodString;
                /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
                 *  each measure's series sit on, so a multi-measure color split can be
                 *  dual-axis (each axis one unit). */
                meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    colorToken: z.ZodOptional<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>;
                    stackId: z.ZodOptional<z.ZodString>;
                    axis: z.ZodOptional<z.ZodEnum<["left", "right"]>>;
                    /** Per-series line shape (line/area) — overrides the family default. */
                    curve: z.ZodOptional<z.ZodEnum<["linear", "monotone", "step", "natural"]>>;
                    /** Per-series point markers (line/area) — overrides the family default. */
                    dots: z.ZodOptional<z.ZodBoolean>;
                    format: z.ZodOptional<z.ZodObject<{
                        kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                        decimals: z.ZodOptional<z.ZodNumber>;
                        abbreviate: z.ZodOptional<z.ZodBoolean>;
                        prefix: z.ZodOptional<z.ZodString>;
                        suffix: z.ZodOptional<z.ZodString>;
                        unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                        dateFormat: z.ZodOptional<z.ZodString>;
                        /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                        currency: z.ZodOptional<z.ZodString>;
                    }, "strict", z.ZodTypeAny, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }, {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    }>>;
                }, "strict", z.ZodTypeAny, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }>>>;
            }, "strict", z.ZodTypeAny, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }, {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            }>]>;
        }, "strict", z.ZodTypeAny, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }, {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        }>>;
        orientation: z.ZodOptional<z.ZodEnum<["vertical", "horizontal"]>>;
        stackMode: z.ZodOptional<z.ZodEnum<["none", "stacked", "grouped", "percent"]>>;
        legend: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            position: z.ZodOptional<z.ZodEnum<["top", "right", "bottom", "left"]>>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }, {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        }>>;
        tooltip: z.ZodOptional<z.ZodObject<{
            show: z.ZodOptional<z.ZodBoolean>;
            indicator: z.ZodOptional<z.ZodEnum<["dot", "line", "dashed"]>>;
            showTotal: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }, {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        }>>;
        axes: z.ZodOptional<z.ZodObject<{
            x: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
            y2: z.ZodOptional<z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
                labelHide: z.ZodOptional<z.ZodBoolean>;
                hide: z.ZodOptional<z.ZodBoolean>;
                scale: z.ZodOptional<z.ZodEnum<["linear", "log"]>>;
                domain: z.ZodOptional<z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>, z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"auto">]>], null>>;
                tickFormat: z.ZodOptional<z.ZodObject<{
                    kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
                    decimals: z.ZodOptional<z.ZodNumber>;
                    abbreviate: z.ZodOptional<z.ZodBoolean>;
                    prefix: z.ZodOptional<z.ZodString>;
                    suffix: z.ZodOptional<z.ZodString>;
                    unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
                    dateFormat: z.ZodOptional<z.ZodString>;
                    /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
                    currency: z.ZodOptional<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }, {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                }>>;
            }, "strict", z.ZodTypeAny, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }, {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        }>>;
        colors: z.ZodOptional<z.ZodObject<{
            byKey: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>>>;
            ramp: z.ZodOptional<z.ZodArray<z.ZodEnum<["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]>, "many">>;
        }, "strict", z.ZodTypeAny, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }, {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        }>>;
        format: z.ZodOptional<z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<["number", "percent", "currency", "duration", "date", "auto"]>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            abbreviate: z.ZodOptional<z.ZodBoolean>;
            prefix: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            unitSystem: z.ZodOptional<z.ZodEnum<["metric", "imperial"]>>;
            dateFormat: z.ZodOptional<z.ZodString>;
            /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
            currency: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }, {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        }>>;
        /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
        familyOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strict", z.ZodTypeAny, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }, {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    }>;
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    title?: string | undefined;
}, {
    type: "chart";
    chart: {
        family: string;
        format?: {
            currency?: string | undefined;
            kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
            decimals?: number | undefined;
            abbreviate?: boolean | undefined;
            prefix?: string | undefined;
            suffix?: string | undefined;
            unitSystem?: "metric" | "imperial" | undefined;
            dateFormat?: string | undefined;
        } | undefined;
        mapping?: {
            category: {
                member: string;
            };
            series: {
                mode: "measures";
                members: string[];
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            } | {
                value: string;
                mode: "pivot";
                pivot: string;
                values?: string[] | undefined;
                meta?: Record<string, {
                    label?: string | undefined;
                    colorToken?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | undefined;
                    stackId?: string | undefined;
                    axis?: "left" | "right" | undefined;
                    curve?: "linear" | "monotone" | "step" | "natural" | undefined;
                    dots?: boolean | undefined;
                    format?: {
                        currency?: string | undefined;
                        kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                        decimals?: number | undefined;
                        abbreviate?: boolean | undefined;
                        prefix?: string | undefined;
                        suffix?: string | undefined;
                        unitSystem?: "metric" | "imperial" | undefined;
                        dateFormat?: string | undefined;
                    } | undefined;
                }> | undefined;
            };
        } | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        stackMode?: "percent" | "none" | "stacked" | "grouped" | undefined;
        legend?: {
            show?: boolean | undefined;
            position?: "left" | "right" | "top" | "bottom" | undefined;
        } | undefined;
        tooltip?: {
            show?: boolean | undefined;
            indicator?: "line" | "dot" | "dashed" | undefined;
            showTotal?: boolean | undefined;
        } | undefined;
        axes?: {
            x?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
            y2?: {
                label?: string | undefined;
                labelHide?: boolean | undefined;
                hide?: boolean | undefined;
                scale?: "linear" | "log" | undefined;
                domain?: [number | "auto", number | "auto"] | undefined;
                tickFormat?: {
                    currency?: string | undefined;
                    kind?: "number" | "date" | "percent" | "currency" | "duration" | "auto" | undefined;
                    decimals?: number | undefined;
                    abbreviate?: boolean | undefined;
                    prefix?: string | undefined;
                    suffix?: string | undefined;
                    unitSystem?: "metric" | "imperial" | undefined;
                    dateFormat?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        colors?: {
            byKey?: Record<string, "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"> | undefined;
            ramp?: ("chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5")[] | undefined;
        } | undefined;
        familyOptions?: Record<string, unknown> | undefined;
    };
    query: {
        measures?: string[] | undefined;
        dimensions?: string[] | undefined;
        timeDimensions?: {
            dimension: string;
            granularity?: {
                var: string;
            } | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
            dateRange?: string | {
                var: string;
            } | [string, string] | undefined;
            compareDateRange?: (string | [string, string])[] | undefined;
        }[] | undefined;
        filters?: QueryFilter[] | undefined;
        segments?: string[] | undefined;
        order?: Record<string, "asc" | "desc"> | [string, "asc" | "desc"][] | undefined;
        limit?: number | {
            var: string;
        } | undefined;
        offset?: number | {
            var: string;
        } | undefined;
        total?: boolean | undefined;
        timezone?: string | undefined;
    };
    id: string;
    title?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"text">;
    doc: z.ZodType<{
        type: string;
        content?: unknown[];
    }, z.ZodTypeDef, {
        type: string;
        content?: unknown[];
    }>;
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "text";
    id: string;
    doc: {
        type: string;
        content?: unknown[];
    };
    title?: string | undefined;
}, {
    type: "text";
    id: string;
    doc: {
        type: string;
        content?: unknown[];
    };
    title?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"input">;
    control: z.ZodObject<{
        variable: z.ZodString;
        control: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
            kind: z.ZodLiteral<"dateRange">;
            presets: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            allowFuture: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        }, {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"granularity">;
            options: z.ZodOptional<z.ZodArray<z.ZodEnum<["second", "minute", "hour", "day", "week", "month", "quarter", "year"]>, "many">>;
            /** A dateRange variable whose span narrows the offered granularities. */
            rangeVariable: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        }, {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"select">;
            options: z.ZodArray<z.ZodObject<{
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>;
                label: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }, {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }>, "many">;
            multiple: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        }, {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"memberSelect">;
            from: z.ZodEnum<["dimension", "measure", "dimensionOrMeasure"]>;
            cube: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        }, {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"text">;
            placeholder: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            kind: "text";
            placeholder?: string | undefined;
        }, {
            kind: "text";
            placeholder?: string | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"number">;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            step: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        }, {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"toggle">;
        }, "strict", z.ZodTypeAny, {
            kind: "toggle";
        }, {
            kind: "toggle";
        }>]>;
    }, "strict", z.ZodTypeAny, {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    }, {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    }>;
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "input";
    control: {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    };
    id: string;
    title?: string | undefined;
}, {
    type: "input";
    control: {
        variable: string;
        control: {
            kind: "dateRange";
            presets?: string[] | undefined;
            allowFuture?: boolean | undefined;
        } | {
            kind: "granularity";
            options?: ("second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year")[] | undefined;
            rangeVariable?: string | undefined;
        } | {
            options: {
                value: string | number | boolean | [string, string] | string[] | number[];
                label: string;
            }[];
            kind: "select";
            multiple?: boolean | undefined;
        } | {
            kind: "memberSelect";
            from: "dimension" | "measure" | "dimensionOrMeasure";
            cube?: string | undefined;
        } | {
            kind: "text";
            placeholder?: string | undefined;
        } | {
            kind: "number";
            step?: number | undefined;
            min?: number | undefined;
            max?: number | undefined;
        } | {
            kind: "toggle";
        };
    };
    id: string;
    title?: string | undefined;
}>]>;

export { }
