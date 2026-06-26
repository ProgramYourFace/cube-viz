import {
  differenceInCalendarDays,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format as formatDate,
  parseISO,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from "date-fns";

import type { ChartOptions, CubeQuery, DateRange } from "@/spec";
import { familyDescriptor } from "@/charts";

/**
 * Previous-period comparison for bar/line/area: the immediately-preceding,
 * equal-length window is fetched as a SEPARATE query and merged into the render data
 * as muted, dashed companion series (mirrors the KPI-sparkline secondary-fetch
 * pattern in {@link import("./kpiSparkline").kpiSparklineInput}). This keeps the
 * normalize/format path identical for both periods and avoids decomposing Cube's
 * `compareDateRange` ResultSet.
 *
 * Call this with a RESOLVED query (variables already substituted), so a date range set
 * via a `{var}` works identically to a literal one — by this point both are concrete.
 * The companion is skipped only when there's no offsettable range at all (all-time).
 */

const iso = (d: Date): string => formatDate(d, "yyyy-MM-dd");

/**
 * The equal-length window immediately preceding `range`, as an absolute `[from,to]`
 * ISO pair — or `undefined` when `range` can't be offset (a `{var}`/unknown form).
 * `now` is injectable for testing.
 */
export function previousDateRange(
  range: DateRange | undefined,
  now: Date = new Date(),
): [string, string] | undefined {
  if (!range) return undefined;

  // Absolute [from, to]: shift back by the window's own length. parseISO reads the
  // date-only strings as LOCAL midnight (new Date() would read UTC and shift a day).
  if (Array.isArray(range)) {
    const from = parseISO(range[0]);
    const to = parseISO(range[1]);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return undefined;
    const lenDays = differenceInCalendarDays(to, from) + 1;
    return [iso(subDays(from, lenDays)), iso(subDays(from, 1))];
  }

  // Anything that isn't a relative string (e.g. a stray VarRef) can't be offset.
  if (typeof range !== "string") return undefined;
  const r = range.trim().toLowerCase();

  if (r === "today") {
    const y = subDays(now, 1);
    return [iso(y), iso(y)];
  }
  if (r === "yesterday") {
    const y = subDays(now, 2);
    return [iso(y), iso(y)];
  }

  // "last N <unit>": the equal-length window before the current one.
  const m = r.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (m) {
    const n = Number(m[1]);
    const unit = m[2];
    if (unit.startsWith("day")) return [iso(subDays(now, 2 * n - 1)), iso(subDays(now, n))];
    if (unit.startsWith("week")) return [iso(subDays(now, 7 * 2 * n - 1)), iso(subDays(now, 7 * n))];
    if (unit.startsWith("month")) {
      return [iso(startOfMonth(subMonths(now, 2 * n))), iso(subDays(startOfMonth(subMonths(now, n)), 1))];
    }
    if (unit.startsWith("quarter")) {
      return [iso(startOfQuarter(subQuarters(now, 2 * n))), iso(subDays(startOfQuarter(subQuarters(now, n)), 1))];
    }
    if (unit.startsWith("year")) {
      return [iso(startOfYear(subYears(now, 2 * n))), iso(subDays(startOfYear(subYears(now, n)), 1))];
    }
  }

  // "this <unit>" → the whole previous unit.
  if (r === "this week") {
    const d = subWeeks(now, 1);
    return [iso(startOfWeek(d)), iso(endOfWeek(d))];
  }
  if (r === "this month") {
    const d = subMonths(now, 1);
    return [iso(startOfMonth(d)), iso(endOfMonth(d))];
  }
  if (r === "this quarter") {
    const d = subQuarters(now, 1);
    return [iso(startOfQuarter(d)), iso(endOfQuarter(d))];
  }
  if (r === "this year") {
    const d = subYears(now, 1);
    return [iso(startOfYear(d)), iso(endOfYear(d))];
  }

  return undefined;
}

/** How the previous-period result is merged into the chart's render data. */
export type ComparePreviousMode =
  /** bar/line/area: add one muted/dashed companion SERIES per current series. */
  | "series"
  /** kpi: append the prior aggregate as a second ROW (the delta reads `rows[1]`). */
  | "kpiRow";

export interface ComparePreviousInput {
  query: CubeQuery;
  mode: ComparePreviousMode;
}

/**
 * The secondary query (same shape, previous date window) that feeds previous-period
 * comparison — companion SERIES for bar/line/area (`familyOptions.comparePrevious`), or
 * the prior aggregate ROW for a KPI (`comparison.mode === "previousPeriod"`). Returns
 * `null` when comparison is off, the family doesn't support it, there's no time
 * dimension, or the range can't be offset. Pass a RESOLVED query (vars substituted).
 */
export function comparePreviousInput(
  query: CubeQuery,
  chart: ChartOptions,
): ComparePreviousInput | null {
  const fo = (chart.familyOptions ?? {}) as {
    comparePrevious?: boolean;
    comparison?: { mode?: string };
  };

  // WHICH merge a family supports is descriptor DATA; whether it's currently ENABLED
  // is the per-mode option shape (the comparePrevious flag / the KPI comparison mode).
  const mode: ComparePreviousMode | undefined = familyDescriptor(chart.family).comparePreviousMode;
  if (mode === "series") {
    if (!fo.comparePrevious) return null;
  } else if (mode === "kpiRow") {
    if (fo.comparison?.mode !== "previousPeriod") return null;
  } else {
    return null;
  }

  const td0 = query.timeDimensions?.[0];
  if (!td0) return null;
  // The query is expected RESOLVED, so the range is concrete; this guards the rare case
  // an unresolved {var} slips through (can't be offset).
  const range = td0.dateRange;
  if (range !== undefined && typeof range === "object" && !Array.isArray(range)) return null;
  const prev = previousDateRange(range as DateRange | undefined);
  if (!prev) return null;

  const prevQuery: CubeQuery = {
    ...query,
    timeDimensions: [{ ...td0, dateRange: prev, compareDateRange: undefined }],
  };
  return { query: prevQuery, mode };
}
