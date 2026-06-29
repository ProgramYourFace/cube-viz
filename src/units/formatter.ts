import { defaultFormatter, type FormatContext, type ValueFormatter } from "@/format";

import { DEFAULT_UNIT_CONVERSIONS, type UnitDef } from "./registry";

/**
 * The CORE units-aware {@link ValueFormatter}. It reads each Cube member's
 * `meta.{unit,quantity,convert}` + the active `unitSystem` (from the
 * {@link FormatContext}) to convert metric↔imperial, humanize durations
 * ("2d 19h"), and apply unit affixes. Dates / strings / category labels delegate
 * to the core minimal {@link defaultFormatter}.
 *
 * Units are now ON BY DEFAULT — {@link import("@/hooks").useFormatter} builds this
 * automatically when a host does not supply its own `locale.formatValue`. Pass a
 * conversion table to extend/override the metric→imperial defaults (the provider's
 * `units` prop merges over {@link DEFAULT_UNIT_CONVERSIONS} and threads them here).
 */

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

function wrap(body: string, prefix?: string, suffix?: string): string {
  return `${prefix ?? ""}${body}${suffix ? ` ${suffix}` : ""}`;
}

/**
 * Build the core unit-aware {@link ValueFormatter}. `conversions` (storage-unit →
 * {@link UnitDef}) drives metric→imperial; omit it to use the built-in defaults.
 */
export function createUnitsFormatter(
  conversions: Record<string, UnitDef> = DEFAULT_UNIT_CONVERSIONS,
): ValueFormatter {
  return (ctx) => {
    // Dates / strings / category axis → the core minimal default.
    if (ctx.role === "category" || typeof ctx.value === "string") return defaultFormatter(ctx);
    if (ctx.value === null || ctx.value === undefined) return "—";
    if (typeof ctx.value !== "number" || !Number.isFinite(ctx.value)) return "—";

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

    // NOTE: metric↔imperial CONVERSION happens at the adapter boundary (see
    // adapter/normalize `buildConversions`), NOT here — so the chart axis scales on the
    // display unit and Recharts picks round-number ticks. By this point `value` is already
    // in the display unit and `meta.unit` is the display unit; the formatter only formats
    // and suffixes. (`conversions` is still accepted for back-compat but unused.)
    void conversions;
    const unit = meta?.unit;
    const a = unit ? affix(quantity, unit) : {};
    const prefix = f?.prefix ?? a.prefix ?? "";
    const suffix = f?.suffix !== undefined ? ` ${f.suffix}` : (a.suffix ?? "");
    return `${prefix}${formatNumber(value, ctx)}${suffix}`;
  };
}
