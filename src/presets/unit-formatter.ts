import { defaultFormatter, type FormatContext, type ValueFormatter } from "@/format";

/**
 * OPT-IN unit-formatter preset — NOT part of cube-viz's core/default behavior.
 *
 * The core library deliberately ships only a minimal `defaultFormatter` and a
 * pluggable `ValueFormatter` seam (host supplies the logic). This preset is the
 * "batteries-included" host implementation a consumer can opt into:
 *
 *   import { createUnitFormatter } from "cube-viz/presets";
 *   <CubeVizProvider locale={{ unitSystem, formatValue: createUnitFormatter() }} />
 *
 * It reads each Cube member's `meta.{unit,quantity,convert}` + the active
 * `unitSystem` (from the FormatContext) to convert metric↔imperial, humanize
 * durations ("2d 19h"), and apply unit affixes — mirroring aa-app-embeddable's
 * `withUnits`/`UNIT_RULES`. Dates/strings/category labels delegate to the core
 * `defaultFormatter`. Fully configurable (override the rule table / duration base).
 */

export interface UnitConversionRule {
  /** Unit shown when the viewer's unitSystem is "imperial". */
  imperialUnit: string;
  /** Pure storage(metric)→imperial conversion. */
  toImperial: (v: number) => number;
}

/** Metric storage unit → imperial display rule. Keys match aa-cube `meta.unit`. */
export const METRIC_IMPERIAL_RULES: Record<string, UnitConversionRule> = {
  km: { imperialUnit: "mi", toImperial: (v) => v * 0.621371 },
  m: { imperialUnit: "ft", toImperial: (v) => v * 3.28084 },
  cm: { imperialUnit: "in", toImperial: (v) => v * 0.393701 },
  "km/h": { imperialUnit: "mph", toImperial: (v) => v * 0.621371 },
  "m/s": { imperialUnit: "mph", toImperial: (v) => v * 2.23694 },
  L: { imperialUnit: "gal", toImperial: (v) => v * 0.264172 },
  ml: { imperialUnit: "fl oz", toImperial: (v) => v * 0.033814 },
  kg: { imperialUnit: "lb", toImperial: (v) => v * 2.20462 },
  g: { imperialUnit: "oz", toImperial: (v) => v * 0.035274 },
  "°C": { imperialUnit: "°F", toImperial: (v) => (v * 9) / 5 + 32 },
  C: { imperialUnit: "°F", toImperial: (v) => (v * 9) / 5 + 32 },
  "km/L": { imperialUnit: "mpg", toImperial: (v) => v * 2.35215 },
};

/** Time storage units → milliseconds (so any time member humanizes uniformly). */
const TIME_MS: Record<string, number> = {
  ms: 1,
  s: 1000,
  sec: 1000,
  min: 60_000,
  m: 60_000,
  h: 3_600_000,
  hr: 3_600_000,
  d: 86_400_000,
};

export interface UnitFormatterOptions {
  /** Override/extend the metric→imperial rule table (merged over the defaults). */
  rules?: Record<string, UnitConversionRule>;
}

function trim(s: string): string {
  return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}

/** Precise 2-unit duration: "2d 19h", "45m 12s", "3s". */
function humanizeDuration(value: number, unit: string | undefined): string {
  const ms = value * (TIME_MS[unit ?? "ms"] ?? 1);
  const sign = ms < 0 ? "-" : "";
  let rem = Math.abs(ms);
  const units: Array<[number, string]> = [
    [86_400_000, "d"],
    [3_600_000, "h"],
    [60_000, "m"],
    [1000, "s"],
  ];
  const parts: Array<[number, string]> = units.map(([size, u], i) => {
    const v = i < units.length - 1 ? Math.floor(rem / size) : Math.round(rem / size);
    rem -= v * size;
    return [v, u];
  });
  const first = parts.findIndex((p) => p[0] > 0);
  if (first === -1) return "0s";
  return sign + parts.slice(first, first + 2).filter((p) => p[0] > 0).map(([v, u]) => `${v}${u}`).join(" ");
}

function formatNumber(v: number, ctx: FormatContext): string {
  const f = ctx.format;
  if (f?.abbreviate) {
    const abs = Math.abs(v);
    for (const [limit, suf] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]] as const) {
      if (abs >= limit) return trim((v / limit).toFixed(f.decimals ?? 1)) + suf;
    }
  }
  const opts: Intl.NumberFormatOptions =
    f?.decimals !== undefined
      ? { minimumFractionDigits: f.decimals, maximumFractionDigits: f.decimals }
      : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(ctx.locale, opts).format(v);
}

function affix(quantity: string | undefined, unit: string): { prefix?: string; suffix?: string } {
  if (quantity === "count") return {};
  if (quantity === "currency") return { prefix: unit };
  if (quantity === "percentage" || unit === "%") return { suffix: unit };
  if (quantity === "temperature") return { suffix: unit };
  return { suffix: ` ${unit}` };
}

/** Build the opt-in unit-aware {@link ValueFormatter}. */
export function createUnitFormatter(options: UnitFormatterOptions = {}): ValueFormatter {
  const rules = { ...METRIC_IMPERIAL_RULES, ...options.rules };

  return (ctx) => {
    // Dates / strings / category axis → the core minimal default.
    if (ctx.role === "category" || typeof ctx.value === "string") return defaultFormatter(ctx);
    if (ctx.value === null || ctx.value === undefined) return "—";
    if (typeof ctx.value !== "number" || Number.isNaN(ctx.value)) return "—";

    const value = ctx.value;
    const meta = ctx.meta;
    const quantity = meta?.quantity;
    const f = ctx.format;

    // Explicit per-spec kind wins.
    if (f?.kind && f.kind !== "auto") {
      if (f.kind === "duration") return humanizeDuration(value, meta?.unit);
      if (f.kind === "percent")
        return new Intl.NumberFormat(ctx.locale, { style: "percent", maximumFractionDigits: f.decimals ?? 0 }).format(value);
      if (f.kind === "currency")
        return new Intl.NumberFormat(ctx.locale, { style: "currency", currency: "USD", maximumFractionDigits: f.decimals ?? 0 }).format(value);
      if (f.kind === "number") return wrap(formatNumber(value, ctx), f.prefix, f.suffix);
    }

    // Auto — driven by the member meta declared on the Cube model.
    if (quantity === "time") return humanizeDuration(value, meta?.unit);
    if (quantity === "count" || meta?.convert === false) return wrap(formatNumber(value, ctx), f?.prefix, f?.suffix);

    let v = value;
    let unit = meta?.unit;
    if (unit && ctx.unitSystem === "imperial" && rules[unit]) {
      v = rules[unit].toImperial(value);
      unit = rules[unit].imperialUnit;
    }
    const a = unit ? affix(quantity, unit) : {};
    const prefix = f?.prefix ?? a.prefix ?? "";
    const suffix = f?.suffix !== undefined ? ` ${f.suffix}` : (a.suffix ?? "");
    return `${prefix}${formatNumber(v, ctx)}${suffix}`;
  };
}

function wrap(body: string, prefix?: string, suffix?: string): string {
  return `${prefix ?? ""}${body}${suffix ? ` ${suffix}` : ""}`;
}

/** A ready-to-use instance with the default metric/imperial rules. */
export const unitFormatter: ValueFormatter = createUnitFormatter();
