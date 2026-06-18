import { format as formatDate, isValid, parseISO } from "date-fns";

import type { FormatOptions, Granularity } from "@/spec";

/**
 * Date helpers for the formatting layer (kept here so {@link import("./default")}
 * and the back-compat `makeDateFormatter`/`formatCategory` share one implementation).
 * Pure + framework-free; date-fns is the vetted date library (no hand-rolled math).
 */

/** Default date-fns patterns per granularity bucket. */
export const GRANULARITY_PATTERN: Record<Granularity, string> = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy",
};

/** The pattern used when no granularity/dateFormat narrows it. */
export const DEFAULT_DATE_PATTERN = "MMM d, yyyy";

/** Coerce an ISO string / epoch-millis number / Date into a Date (or null). */
export function toDate(value: string | number | Date): Date | null {
  if (value instanceof Date) return isValid(value) ? value : null;
  if (typeof value === "number") {
    const d = new Date(value);
    return isValid(d) ? d : null;
  }
  // Strings: prefer strict ISO parsing, fall back to the Date constructor.
  const iso = parseISO(value);
  if (isValid(iso)) return iso;
  const loose = new Date(value);
  return isValid(loose) ? loose : null;
}

/** Cheap ISO-date sniff (avoids treating arbitrary numeric strings as dates). */
export function looksLikeIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}/.test(value)) return false;
  return isValid(parseISO(value));
}

/**
 * Resolve the date pattern: an explicit `format.dateFormat` wins, otherwise the
 * per-granularity default, otherwise {@link DEFAULT_DATE_PATTERN}.
 */
export function datePattern(format?: FormatOptions, granularity?: Granularity): string {
  if (format?.dateFormat) return format.dateFormat;
  if (granularity) return GRANULARITY_PATTERN[granularity];
  return DEFAULT_DATE_PATTERN;
}

/**
 * Format a date value with the resolved pattern. Accepts an ISO string, an
 * epoch-millis number, or a Date; returns `String(value)` when it does not parse.
 */
export function formatDateValue(
  value: string | number | Date,
  format?: FormatOptions,
  granularity?: Granularity,
): string {
  const d = toDate(value);
  return d ? formatDate(d, datePattern(format, granularity)) : String(value);
}

/* ─────────────────────── back-compat date helpers (internal) ─────────────── */

/**
 * Build a date formatter for time-dimension category buckets / axis ticks. Pattern
 * is `format.dateFormat` when set, else the default for `granularity`.
 * @internal kept for the families until they migrate to {@link ChartFormat}.
 */
export function makeDateFormatter(
  format: FormatOptions | undefined,
  granularity?: Granularity,
): (value: string | number | Date | null | undefined) => string {
  return (value) => {
    if (value === null || value === undefined) return "";
    return formatDateValue(value, format, granularity);
  };
}

/** Options for formatting a single category-axis label. @internal */
export interface FormatCategoryOptions {
  /** Resolved chart/axis format override (its `dateFormat` wins for dates). */
  format?: FormatOptions;
  /** Granularity of the category time-dimension, when it is one. */
  granularity?: Granularity;
}

/**
 * Format a category-axis label: ISO date / Date / (number with granularity) →
 * date; everything else → plain string. @internal kept for the families until they
 * migrate to {@link ChartFormat}.
 */
export function formatCategory(
  value: string | number | Date | null | undefined,
  opts: FormatCategoryOptions = {},
): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return formatDateValue(value, opts.format, opts.granularity);
  if (typeof value === "number") {
    if (opts.granularity || opts.format?.dateFormat) {
      return formatDateValue(value, opts.format, opts.granularity);
    }
    return String(value);
  }
  if (looksLikeIsoDate(value)) return formatDateValue(value, opts.format, opts.granularity);
  return value;
}
