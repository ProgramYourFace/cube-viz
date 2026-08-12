/*
 * Static preview dashboard: mounts the chart FAMILY components directly with
 * canned NormalizedChartData (no Cube server, no fetch). Used for visual
 * verification + screenshots of the TanStack renderer. `?theme=dark` renders
 * dark mode.
 */
import { createRoot } from "react-dom/client";

import "@/styles/cube-viz.css";
import "@/theme/tokens.css";

import { DEFAULT_MARK_THEME } from "@/charts/theme";
import { BarChartFamily } from "@/charts/bar";
import { LineChartFamily } from "@/charts/line";
import { AreaChartFamily } from "@/charts/area";
import { PieChartFamily } from "@/charts/pie";
import { ScatterChartFamily } from "@/charts/scatter";
import { KpiFamily } from "@/charts/kpi";
import { HeatmapChartFamily } from "@/charts/heatmap";
import { resolveOptions } from "@/charts/familyRegistry";
import { makeChartFormat } from "@/format/chart-format";
import { defaultFormatter } from "@/format/default";
import type { NormalizedChartData } from "@/adapter/types";
import type { ChartOptions } from "@/spec";
import type { ChartConfig } from "@/components/ui/chart";

const DAYS = Array.from({ length: 14 }, (_, i) => `2026-07-${String(15 + i).padStart(2, "0")}`);
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const VEHICLES = ["Truck 1", "Truck 2", "Van A", "Van B", "Pickup"];

const annotation = {
  measures: {
    "trips.total_distance": { title: "Total distance", shortTitle: "Distance", type: "number" },
    "trips.count": { title: "Trips", shortTitle: "Trips", type: "number" },
    "trips.fuel": { title: "Fuel used", shortTitle: "Fuel (L)", type: "number" },
    "trips.idle_fuel": { title: "Idle fuel", shortTitle: "Idle (L)", type: "number" },
    "events.harsh": { title: "Harsh driving", shortTitle: "Harsh driving", type: "number" },
    "events.speeding": { title: "Speeding", shortTitle: "Speeding", type: "number" },
    "events.collision": { title: "Collision alerts", shortTitle: "Collisions", type: "number" },
    "trips.duration": { title: "Duration (min)", shortTitle: "Duration", type: "number" },
    "trips.utilization": { title: "Utilization", shortTitle: "Utilization %", type: "number" },
  },
  dimensions: {
    "trips.vehicle": { title: "Vehicle", shortTitle: "Vehicle", type: "string" },
    "trips.day": { title: "Day", shortTitle: "Day", type: "string" },
  },
  timeDimensions: {
    "trips.start_time.day": { title: "Start time", shortTitle: "Date", type: "time" },
  },
} as never;

const fmt = (options: ChartOptions) => makeChartFormat(annotation, options, defaultFormatter);

function wave(n: number, base: number, amp: number, phase = 0, jitter = 0.35): number[] {
  return Array.from({ length: n }, (_, i) =>
    Math.round(base + amp * Math.sin(i / 2.1 + phase) + amp * jitter * Math.sin(i * 1.7 + phase * 3)),
  );
}

function data(partial: Partial<NormalizedChartData>): NormalizedChartData {
  return {
    categories: [],
    series: [],
    raw: { rows: [], annotation, query: {} as never },
    empty: false,
    ...partial,
  } as NormalizedChartData;
}

const config: ChartConfig = {};

function Tile({ title, children, tall }: { title: string; children: React.ReactNode; tall?: boolean }) {
  return (
    <div className="cv-widget-chrome pv-tile" style={{ gridRow: tall ? "span 2" : undefined }}>
      <div className="cv-widget-header">
        <div className="cv-widget-title">{title}</div>
      </div>
      <div className="cv-widget-body pv-body">{children}</div>
    </div>
  );
}

function App() {
  // line: distance per day, two vehicles
  const lineOpts = resolveOptions({
    family: "line",
    mapping: { category: { member: "trips.start_time.day" } },
    legend: { show: true, position: "bottom" },
  } as unknown as ChartOptions);
  const lineData = data({
    categories: DAYS,
    series: [
      { key: "trips.total_distance.t1", label: "Truck 1", data: wave(14, 320, 90, 0), colorToken: "chart-1", meta: { measure: "trips.total_distance" } },
      { key: "trips.total_distance.t2", label: "Van A", data: wave(14, 210, 70, 2), colorToken: "chart-2", meta: { measure: "trips.total_distance" } },
    ],
  });

  // stacked bar: events by type per weekday
  const barOpts = resolveOptions({
    family: "bar",
    stackMode: "stacked",
    mapping: { category: { member: "trips.day" } },
  } as unknown as ChartOptions);
  const barData = data({
    categories: WEEKDAYS,
    series: [
      { key: "events.speeding", label: "Speeding", data: wave(7, 14, 6, 1), colorToken: "chart-2", meta: { measure: "events.speeding" } },
      { key: "events.harsh", label: "Harsh driving", data: wave(7, 9, 4, 3), colorToken: "chart-4", meta: { measure: "events.harsh" } },
      { key: "events.collision", label: "Collisions", data: wave(7, 2, 2, 5).map((v) => Math.max(0, v)), colorToken: "chart-5", meta: { measure: "events.collision" } },
    ],
  });

  // area: fuel stacked
  const areaOpts = resolveOptions({
    family: "area",
    stackMode: "none",
    mapping: { category: { member: "trips.start_time.day" } },
  } as unknown as ChartOptions);
  const areaData = data({
    categories: DAYS,
    series: [
      { key: "trips.fuel", label: "Fuel (L)", data: wave(14, 140, 35, 1), colorToken: "chart-1", meta: { measure: "trips.fuel" } },
      { key: "trips.idle_fuel", label: "Idle (L)", data: wave(14, 45, 15, 4), colorToken: "chart-3", meta: { measure: "trips.idle_fuel" } },
    ],
  });

  // pie: trips by vehicle
  const pieOpts = resolveOptions({
    family: "pie",
    mapping: { category: { member: "trips.vehicle" } },
    familyOptions: { innerRadiusPct: 55, showLabels: "percent" },
  } as unknown as ChartOptions);
  const pieData = data({
    categories: VEHICLES,
    series: [
      { key: "trips.count", label: "Trips", data: [148, 121, 96, 74, 41], colorToken: "chart-1", meta: { measure: "trips.count" } },
    ],
  });

  // KPI number + sparkline (+ prev-period delta from rows[0..1])
  const kpiOpts = resolveOptions({
    family: "kpi",
    familyOptions: {
      measure: "trips.total_distance",
      comparison: { mode: "previousPeriod", goodDirection: "up" },
      sparkline: { member: "trips.total_distance" },
    },
  } as unknown as ChartOptions);
  const kpiData = data({
    categories: DAYS,
    series: [
      { key: "trips.total_distance", label: "Distance", data: wave(14, 530, 120, 1), colorToken: "chart-1", meta: { measure: "trips.total_distance" } },
    ],
    raw: {
      rows: [{ "trips.total_distance": 7413 }, { "trips.total_distance": 6688 }],
      annotation,
      query: { measures: ["trips.total_distance"], timeDimensions: [{ dimension: "trips.start_time", dateRange: "last 14 days" }] } as never,
    },
  });

  // KPI gauge
  const gaugeOpts = resolveOptions({
    family: "kpi",
    familyOptions: {
      measure: "trips.utilization",
      display: "gauge",
      gauge: { min: 0, max: 100, thresholds: [{ from: 70, colorToken: "chart-1" }] },
    },
  } as unknown as ChartOptions);
  const gaugeData = data({
    raw: { rows: [{ "trips.utilization": 78 }], annotation, query: {} as never },
  });

  // heatmap: vehicle x day distance
  const heatOpts = resolveOptions({
    family: "heatmap",
    mapping: {
      category: { member: "trips.day" },
      series: { mode: "pivot", value: "trips.total_distance", pivot: "trips.vehicle" },
    },
  } as unknown as ChartOptions);
  const heatRows = WEEKDAYS.flatMap((d, di) =>
    VEHICLES.map((v, vi) => ({
      "trips.day": d,
      "trips.vehicle": v,
      "trips.total_distance": Math.max(8, Math.round(60 + 55 * Math.sin(di / 1.4 + vi) + 30 * Math.sin(di * 1.3 - vi * 2))),
    })),
  );
  const heatData = data({ raw: { rows: heatRows, annotation, query: {} as never } });

  // scatter: duration vs distance bubbles by vehicle
  const scatterOpts = resolveOptions({
    family: "scatter",
    familyOptions: { x: "trips.duration", y: "trips.total_distance", size: "trips.fuel", groupBy: "trips.vehicle" },
  } as unknown as ChartOptions);
  const scatterRows = VEHICLES.flatMap((v, vi) =>
    Array.from({ length: 9 }, (_, i) => ({
      "trips.vehicle": v,
      "trips.duration": Math.round(25 + i * 9 + vi * 6 + 10 * Math.sin(i * 2 + vi)),
      "trips.total_distance": Math.round(18 + i * 11 + vi * 9 + 14 * Math.sin(i + vi * 2)),
      "trips.fuel": Math.round(6 + i + vi * 2 + 4 * Math.abs(Math.sin(i * 3 + vi))),
    })),
  );
  const scatterData = data({ raw: { rows: scatterRows, annotation, query: {} as never } });

  return (
    <div className="pv-page">
      <div className="pv-header">
        <h1>Fleet overview</h1>
        <span>cube-viz · TanStack Charts renderer preview</span>
      </div>
      <div className="pv-grid">
        <Tile title="Total distance (14 days)">
          <KpiFamily data={kpiData} options={kpiOpts} config={config} format={fmt(kpiOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
        <Tile title="Fleet utilization">
          <KpiFamily data={gaugeData} options={gaugeOpts} config={config} format={fmt(gaugeOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
        <Tile title="Trips by vehicle">
          <PieChartFamily data={pieData} options={pieOpts} config={config} format={fmt(pieOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
        <Tile title="Distance over time" tall>
          <LineChartFamily data={lineData} options={lineOpts} config={config} format={fmt(lineOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
        <Tile title="Driver events by weekday" tall>
          <BarChartFamily data={barData} options={barOpts} config={config} format={fmt(barOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
        <Tile title="Fuel consumption">
          <AreaChartFamily data={areaData} options={areaOpts} config={config} format={fmt(areaOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
        <Tile title="Distance intensity (vehicle × day)">
          <HeatmapChartFamily data={heatData} options={heatOpts} config={config} format={fmt(heatOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
        <Tile title="Trip duration vs distance">
          <ScatterChartFamily data={scatterData} options={scatterOpts} config={config} format={fmt(scatterOpts)} theme={DEFAULT_MARK_THEME} />
        </Tile>
      </div>
    </div>
  );
}

const dark = new URLSearchParams(location.search).get("theme") === "dark";
if (dark) document.documentElement.classList.add("dark");
document.body.style.background = "var(--background)";

const style = document.createElement("style");
style.textContent = `
  .pv-page { min-height: 100vh; background: var(--background); color: var(--foreground); padding: 20px 24px; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  .pv-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; }
  .pv-header h1 { margin: 0; font-size: 1.25rem; letter-spacing: -0.02em; }
  .pv-header span { color: var(--muted-foreground); font-size: 0.8rem; }
  .pv-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 250px; gap: 14px; }
  .pv-tile { display: flex; flex-direction: column; min-width: 0; }
  .pv-body { flex: 1; min-height: 0; }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
