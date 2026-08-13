import type { Granularity, VariableValue } from "@/spec";

/**
 * Which time buckets make sense for a given date range.
 *
 * This is a SAFETY rail, not a nicety. A bucket is only meaningful in relation to the
 * span it divides: "second" over four weeks is 2.4 million buckets — a query that
 * either times out, is refused, or comes back big enough to lock the page up. Every
 * granularity is legitimate for SOME range, so the answer is not to delete choices
 * from the vocabulary but to only offer, in each place, the ones that fit the range
 * that place is actually looking at.
 *
 * Three options, finest→coarsest, each landing in a readable number of buckets.
 */
export function granularitiesForSpan(days: number): Granularity[] {
  if (days <= 2) return ["minute", "hour", "day"];
  if (days <= 31) return ["hour", "day", "week"];
  if (days <= 186) return ["day", "week", "month"];
  if (days <= 731) return ["week", "month", "quarter"];
  return ["month", "quarter", "year"];
}

/**
 * Approximate the day-span of a date-range value — an absolute `[from, to]` pair or a
 * Cube relative preset ("last 30 days", "this month", …).
 *
 * `undefined` means "no idea", and callers must read it as "offer everything": an
 * unknown range is not a reason to narrow, only a known one is. A `{var}` binding is
 * one of those unknowns — its value is not decided until the dashboard resolves it.
 */
export function rangeSpanDays(range: VariableValue | undefined): number | undefined {
  if (Array.isArray(range) && range.length === 2 && typeof range[0] === "string") {
    const a = Date.parse(range[0]);
    const b = Date.parse(range[1] as string);
    if (!Number.isNaN(a) && !Number.isNaN(b)) return Math.max(1, Math.abs(b - a) / 86_400_000);
  }
  if (typeof range === "string") {
    const m = range.match(/(\d+)\s*(day|week|month|quarter|year)/i);
    if (m) {
      const mult: Record<string, number> = { day: 1, week: 7, month: 30, quarter: 91, year: 365 };
      return Number(m[1]) * (mult[m[2].toLowerCase()] ?? 1);
    }
    const lc = range.toLowerCase();
    if (lc.includes("today") || lc.includes("yesterday")) return 1;
    if (lc.includes("week")) return 7;
    if (lc.includes("month")) return 30;
    if (lc.includes("quarter")) return 91;
    if (lc.includes("year")) return 365;
  }
  return undefined;
}

/**
 * The granularities to offer for a date range, or `undefined` for "all of them" —
 * the shape {@link GranularityPickerProps.options} takes. Wraps the two above so the
 * "unknown range ⇒ do not narrow" rule is written once.
 */
export function granularityOptionsFor(range: unknown): Granularity[] | undefined {
  const span = rangeSpanDays(range as VariableValue | undefined);
  return span === undefined ? undefined : granularitiesForSpan(span);
}
