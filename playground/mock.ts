import type { ChartOptions, Member } from "@/spec";
import type { NormalizedChartData, NormalizedSeries } from "@/adapter/types";

/**
 * Family-aware mock NormalizedChartData so the playground can exercise every chart
 * family WITHOUT a live Cube endpoint. The render core consumes NormalizedChartData
 * directly, so this is a faithful stand-in for the adapter output.
 */

const RAMP = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] as const;

function shortName(member: Member): string {
  const last = member.split(".").pop() ?? member;
  return last.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function isTimeMember(member: Member): boolean {
  return /(_time|timestamp|_at|date)$/i.test(member);
}

// Cheap seeded pseudo-random so reloads look stable per key+index.
function seeded(key: string, i: number): number {
  let h = 2166136261;
  const s = `${key}:${i}`;
  for (let k = 0; k < s.length; k++) {
    h ^= s.charCodeAt(k);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}
const val = (key: string, i: number, min = 100, span = 900) => Math.round(seeded(key, i) * span) + min;

function categoryLabels(member: Member, points: number): (string | number)[] {
  if (isTimeMember(member)) {
    const today = new Date("2026-06-18T00:00:00Z").getTime();
    return Array.from({ length: points }, (_, i) =>
      new Date(today - (points - 1 - i) * 86400000).toISOString().slice(0, 10),
    );
  }
  return Array.from({ length: points }, (_, i) => `Item ${i + 1}`);
}

function measuresMock(options: ChartOptions, points: number): NormalizedChartData {
  const mapping = options.mapping;
  const categories = categoryLabels(mapping?.category.member ?? "category", points);
  let series: NormalizedSeries[] = [];

  if (mapping && mapping.series.mode === "measures") {
    const { members, meta } = mapping.series;
    series = members.map((mem, idx) => ({
      key: mem,
      label: meta?.[mem]?.label ?? shortName(mem),
      data: categories.map((_, i) => val(mem, i)),
      colorToken: meta?.[mem]?.colorToken ?? RAMP[idx % RAMP.length],
      meta: meta?.[mem]?.format ? { format: meta[mem]!.format } : undefined,
    }));
  } else if (mapping && mapping.series.mode === "pivot") {
    series = ["Device A", "Device B", "Device C"].map((label, idx) => ({
      key: label,
      label,
      data: categories.map((_, i) => val(label, i)),
      colorToken: RAMP[idx % RAMP.length],
    }));
  } else {
    series = [{ key: "value", label: "Value", data: categories.map((_, i) => val("value", i)), colorToken: "chart-1" }];
  }

  const rows = categories.map((cat, i) => {
    const row: Record<string, unknown> = { __cat: cat };
    for (const s of series) row[s.key] = s.data[i];
    return row;
  });
  return { categories, series, raw: { rows, query: {} }, empty: false };
}

function scatterMock(options: ChartOptions, points: number): NormalizedChartData {
  const fo = (options.familyOptions ?? {}) as { x?: string; y?: string; size?: string };
  const x = fo.x ?? "x";
  const y = fo.y ?? "y";
  const rows = Array.from({ length: points }, (_, i) => {
    const row: Record<string, unknown> = { [x]: val(x, i, 5, 120), [y]: val(y, i, 10, 80) };
    if (fo.size) row[fo.size] = val(fo.size, i, 1, 40);
    return row;
  });
  return { categories: [], series: [], raw: { rows, query: {} }, empty: false };
}

function kpiMock(options: ChartOptions): NormalizedChartData {
  const fo = (options.familyOptions ?? {}) as { measure?: string };
  const measure = fo.measure ?? "value";
  const value = val(measure, 0, 1200, 4000);
  return {
    categories: [],
    series: [{ key: measure, label: shortName(measure), data: [value], colorToken: "chart-1" }],
    raw: { rows: [{ [measure]: value }], query: {} },
    empty: false,
  };
}

function tableMock(points: number): NormalizedChartData {
  const rows = Array.from({ length: points }, (_, i) => ({
    "device_trips.device_id": `Truck ${i + 1}`,
    "device_trips.count": val("count", i, 5, 60),
    "device_trips.total_distance": Number((seeded("dist", i) * 800 + 50).toFixed(1)),
  }));
  return { categories: [], series: [], raw: { rows, query: {} }, empty: false };
}

export function mockData(options: ChartOptions, points = 12): NormalizedChartData {
  switch (options.family) {
    case "scatter":
      return scatterMock(options, 40);
    case "kpi":
      return kpiMock(options);
    case "table":
      return tableMock(8);
    default:
      return measuresMock(options, points);
  }
}
