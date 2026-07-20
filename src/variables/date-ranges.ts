import {
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
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

const iso = (date: Date): string => format(date, "yyyy-MM-dd");

/** Resolve a Cube-style relative date preset to concrete local-calendar endpoints. */
export function resolveRelativeDateRange(
  value: string,
  now: Date = new Date(),
): [string, string] | undefined {
  const range = value.trim().toLowerCase();
  if (range === "today") return [iso(now), iso(now)];
  if (range === "yesterday") {
    const day = subDays(now, 1);
    return [iso(day), iso(day)];
  }

  if (range === "this week") return [iso(startOfWeek(now)), iso(endOfWeek(now))];
  if (range === "this month") return [iso(startOfMonth(now)), iso(endOfMonth(now))];
  if (range === "this quarter") return [iso(startOfQuarter(now)), iso(endOfQuarter(now))];
  if (range === "this year") return [iso(startOfYear(now)), iso(endOfYear(now))];

  if (range === "last week") {
    const period = subWeeks(now, 1);
    return [iso(startOfWeek(period)), iso(endOfWeek(period))];
  }
  if (range === "last month") {
    const period = subMonths(now, 1);
    return [iso(startOfMonth(period)), iso(endOfMonth(period))];
  }
  if (range === "last quarter") {
    const period = subQuarters(now, 1);
    return [iso(startOfQuarter(period)), iso(endOfQuarter(period))];
  }
  if (range === "last year") {
    const period = subYears(now, 1);
    return [iso(startOfYear(period)), iso(endOfYear(period))];
  }

  const match = range.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/,
  );
  if (!match) return undefined;
  const count = Number(match[1]);
  if (!Number.isFinite(count) || count < 1) return undefined;
  const unit = match[2];
  if (unit.startsWith("day")) return [iso(subDays(now, count - 1)), iso(now)];
  if (unit.startsWith("week")) return [iso(subDays(now, count * 7 - 1)), iso(now)];
  if (unit.startsWith("month")) {
    return [iso(startOfMonth(subMonths(now, count))), iso(endOfMonth(subMonths(now, 1)))];
  }
  if (unit.startsWith("quarter")) {
    return [iso(startOfQuarter(subQuarters(now, count))), iso(endOfQuarter(subQuarters(now, 1)))];
  }
  return [iso(startOfYear(subYears(now, count))), iso(endOfYear(subYears(now, 1)))];
}
