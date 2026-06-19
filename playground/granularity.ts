import type { Granularity, VariableValue } from "@/spec";

/** Granularities coarse→fine order, for nearest-match clamping. */
export const GRANULARITY_ORDER: Granularity[] = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year",
];

/** Approximate span (in days) of a dateRange variable value (relative or absolute). */
export function rangeSpanDays(dr: VariableValue | undefined): number {
  if (!dr) return 30;
  if (Array.isArray(dr) && dr.length === 2 && typeof dr[0] === "string" && typeof dr[1] === "string") {
    const a = new Date(dr[0]).getTime();
    const b = new Date(dr[1]).getTime();
    if (Number.isFinite(a) && Number.isFinite(b)) return Math.max(1 / 24, Math.abs(b - a) / 86_400_000);
  }
  if (typeof dr === "string") {
    const s = dr.toLowerCase().trim();
    const m = s.match(/(\d+)\s*(hour|day|week|month|quarter|year)/);
    if (m) {
      const mult: Record<string, number> = { hour: 1 / 24, day: 1, week: 7, month: 30, quarter: 91, year: 365 };
      return Number(m[1]) * (mult[m[2]] ?? 1);
    }
    if (s.includes("today") || s.includes("yesterday")) return 1;
    if (s.includes("week")) return 7;
    if (s.includes("month")) return 30;
    if (s.includes("quarter")) return 91;
    if (s.includes("year")) return 365;
  }
  return 30;
}

/** The granularities that make sense for a given span — adaptive, down to second. */
export function granularitiesForRange(days: number): Granularity[] {
  if (days <= 1 / 12) return ["second", "minute"]; // ≤ ~2 hours
  if (days <= 2) return ["minute", "hour"];
  if (days <= 14) return ["hour", "day"];
  if (days <= 92) return ["day", "week"];
  if (days <= 731) return ["week", "month"];
  return ["month", "quarter", "year"];
}

/** Pick the option closest (in coarse→fine order) to the current granularity. */
export function nearestGranularity(current: Granularity | undefined, opts: Granularity[]): Granularity {
  if (current && opts.includes(current)) return current;
  const ci = current ? GRANULARITY_ORDER.indexOf(current) : GRANULARITY_ORDER.indexOf("day");
  return opts.reduce((best, o) =>
    Math.abs(GRANULARITY_ORDER.indexOf(o) - ci) < Math.abs(GRANULARITY_ORDER.indexOf(best) - ci) ? o : best,
  opts[0]);
}
