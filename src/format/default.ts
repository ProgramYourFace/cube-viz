import type { FormatOptions } from "@/spec";
import type { ResultAnnotation } from "@/adapter/types";

import type { FormatContext, ValueFormatter } from "./types";
import { formatDateValue, looksLikeIsoDate } from "./dates";

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

export const EM_DASH = "—";

/* ───────────────────────────── numeric helpers ───────────────────────────── */

const ABBREV: { limit: number; suffix: string }[] = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" },
];

/** Drop trailing zeros from a fixed-decimal string ("12.30" → "12.3", "5.00" → "5"). */
function trimZeros(s: string): string {
  return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}

/** "12.3k" / "1.2M" — compact abbreviation honoring `decimals` (default 1). */
function abbreviateNumber(value: number, decimals: number): string {
  const abs = Math.abs(value);
  for (const { limit, suffix } of ABBREV) {
    if (abs >= limit) return trimZeros((value / limit).toFixed(decimals)) + suffix;
  }
  return trimZeros(value.toFixed(decimals));
}

/** Plain Intl number honoring `decimals` (else up to 2 fraction digits). */
function intlNumber(value: number, format: FormatOptions | undefined, locale?: string): string {
  const opts: Intl.NumberFormatOptions = {};
  if (format?.decimals !== undefined) {
    opts.minimumFractionDigits = format.decimals;
    opts.maximumFractionDigits = format.decimals;
  } else {
    opts.maximumFractionDigits = 2;
  }
  return new Intl.NumberFormat(locale, opts).format(value);
}

function formatNumber(value: number, ctx: FormatContext): string {
  const { format, meta, locale } = ctx;
  const body = format?.abbreviate
    ? abbreviateNumber(value, format.decimals ?? 1)
    : intlNumber(value, format, locale);

  // Suffix precedence: explicit spec.suffix → member meta.unit (plain, no conversion).
  const suffix = format?.suffix ?? (meta?.unit || undefined);
  const prefix = format?.prefix ?? "";
  return `${prefix}${body}${suffix ? ` ${suffix}` : ""}`;
}

/* ───────────────────────────── date detection ────────────────────────────── */

/**
 * Runtime Date guard. `FormatContext.value` is typed `number | string | null |
 * undefined`, but a host may still pass a `Date` at runtime (e.g. a custom
 * adapter), so we detect it without narrowing the static union.
 */
function isDate(v: unknown): v is Date {
  return Object.prototype.toString.call(v) === "[object Date]";
}

/** A value should render as a date when the role/format/value all point at one. */
function isDateLike(ctx: FormatContext): boolean {
  if (ctx.format?.kind === "date") return true;
  if (isDate(ctx.value)) return true;
  if (typeof ctx.value === "string") return looksLikeIsoDate(ctx.value);
  if (typeof ctx.value === "number") {
    // A bare number is a date only when a granularity (time bucket) or an explicit
    // dateFormat says so — otherwise it is a measure value.
    return ctx.role === "category" && (ctx.granularity !== undefined || !!ctx.format?.dateFormat);
  }
  return false;
}

/* ──────────────────────────── the default formatter ──────────────────────── */

export const defaultFormatter: ValueFormatter = (ctx) => {
  const { value, format, granularity } = ctx;

  if (value === null || value === undefined) return EM_DASH;
  if (typeof value === "number" && !Number.isFinite(value)) return EM_DASH;

  // Dates (explicit kind, Date/ISO value, or a time-bucket category number).
  if ((isDate(value) || typeof value === "string" || typeof value === "number") && isDateLike(ctx)) {
    return formatDateValue(value, format, granularity);
  }

  if (typeof value === "number") return formatNumber(value, ctx);

  // Strings / booleans (booleans may arrive when a host's value union is widened).
  return String(value);
};

/* ───────────────────── back-compat shim (internal, families) ─────────────── */

/** Pull the annotated member from any of the annotation buckets. */
function lookupMember(member: string, ann?: ResultAnnotation) {
  if (!ann) return undefined;
  return (
    ann.measures[member] ??
    ann.dimensions[member] ??
    ann.timeDimensions[member] ??
    ann.segments[member]
  );
}

/**
 * Back-compat factory matching the OLD `makeFormatter` signature, now built on the
 * minimal {@link defaultFormatter} (NO convert-units, NO duration). Kept so the
 * family components keep compiling until they migrate to {@link ChartFormat}.
 * @internal
 */
export function makeFormatter(
  format: FormatOptions | undefined,
  ann?: ResultAnnotation,
): (value: number | null | undefined, member?: string) => string {
  return (value, member) => {
    const annotated = member ? lookupMember(member, ann) : undefined;
    return defaultFormatter({
      value,
      member,
      meta: annotated?.meta,
      title: annotated?.shortTitle ?? annotated?.title,
      role: "value",
      format,
    });
  };
}
