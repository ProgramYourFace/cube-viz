import { useState } from "react";

import type { ChartColorToken, ChartOptions, ChartSpec, CubeQuery, DashboardSpec } from "@/spec";
import { loadSpec } from "@/spec";
import { ChartRenderer } from "@/charts";
import { CubeVizProvider } from "@/provider";
import { CubeChart, Dashboard } from "@/render";

import { mockData } from "./mock";
import chartJson from "./specs/chart-trips-by-day.json";
import dashJson from "./specs/dashboard-fleet-utilization.json";

/* ───────────────────────── mock family gallery ──────────────────────────── */

const TIME = "device_trips.start_time";
const m = (member: string, label: string, colorToken: ChartColorToken) => ({ [member]: { label, colorToken } });

const FAMILIES: { title: string; options: ChartOptions }[] = [
  {
    title: "Bar — grouped, 2 series",
    options: {
      family: "bar",
      orientation: "vertical",
      stackMode: "grouped",
      mapping: {
        category: { member: TIME },
        series: {
          mode: "measures",
          members: ["device_trips.total_distance", "device_trips.count"],
          meta: { ...m("device_trips.total_distance", "Distance", "chart-1"), ...m("device_trips.count", "Trips", "chart-2") },
        },
      },
      legend: { show: true, position: "bottom" },
      tooltip: { show: true, indicator: "dot" },
    },
  },
  {
    title: "Line",
    options: {
      family: "line",
      mapping: {
        category: { member: TIME },
        series: { mode: "measures", members: ["device_trips.total_distance"], meta: m("device_trips.total_distance", "Distance", "chart-1") },
      },
      tooltip: { show: true, indicator: "line" },
    },
  },
  {
    title: "Area — stacked",
    options: {
      family: "area",
      stackMode: "stacked",
      mapping: {
        category: { member: TIME },
        series: {
          mode: "measures",
          members: ["device_trips.total_distance", "device_trips.total_idle_duration"],
          meta: { ...m("device_trips.total_distance", "Distance", "chart-1"), ...m("device_trips.total_idle_duration", "Idle", "chart-2") },
        },
      },
      legend: { show: true, position: "bottom" },
    },
  },
  {
    title: "Pie / donut",
    options: {
      family: "pie",
      mapping: { category: { member: "device_trips.device_id" }, series: { mode: "measures", members: ["device_trips.count"] } },
      familyOptions: { innerRadiusPct: 55, showLabels: "percent", maxSlices: 6 },
      legend: { show: true, position: "right" },
    },
  },
  {
    title: "Scatter / bubble",
    options: {
      family: "scatter",
      familyOptions: { x: "device_trips.avg_distance", y: "device_trips.avg_speed", size: "device_trips.count" },
      tooltip: { show: true },
    },
  },
  {
    title: "KPI — number",
    options: { family: "kpi", format: { kind: "auto" }, familyOptions: { display: "number", measure: "device_trips.count" } },
  },
  {
    title: "Table",
    options: { family: "table", familyOptions: { pageSize: 8 } },
  },
  {
    title: "Combo — bar + line, dual axis",
    options: {
      family: "combo",
      mapping: {
        category: { member: TIME },
        series: { mode: "measures", members: ["device_trips.total_distance", "device_trips.avg_speed"] },
      },
      familyOptions: {
        series: [
          { member: "device_trips.total_distance", render: "bar", colorToken: "chart-1", label: "Distance" },
          { member: "device_trips.avg_speed", render: "line", axis: "right", colorToken: "chart-2", label: "Avg speed" },
        ],
      },
      legend: { show: true, position: "bottom" },
    },
  },
];

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 text-sm font-medium text-card-foreground">{title}</div>
      <div className="min-h-[260px]">{children}</div>
    </div>
  );
}

function MockGallery() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">All 8 families (mock data)</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FAMILIES.map((f) => (
          <Panel key={f.title} title={f.title}>
            <ChartRenderer data={mockData(f.options)} options={f.options} config={{}} />
          </Panel>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── live Cube section ──────────────────────────── */

// The Vite dev proxy mints the JWT from .env and forwards same-origin; the token
// here is a placeholder the proxy ignores.
const LIVE_CONNECTION = { endpoint: "/__cube/cubejs-api/v1", token: "dev-proxy" };

const lastN: CubeQuery["timeDimensions"] = [{ dimension: TIME, dateRange: "last 30 days" }];

const liveBar: { query: CubeQuery; chart: ChartOptions } = {
  query: {
    measures: ["device_trips.count", "device_trips.total_distance"],
    timeDimensions: [{ dimension: TIME, granularity: "day", dateRange: "last 30 days" }],
    order: [[TIME, "asc"]],
  },
  chart: FAMILIES[0].options,
};

const liveKpi: { query: CubeQuery; chart: ChartOptions } = {
  query: { measures: ["device_trips.count"], timeDimensions: lastN },
  chart: { family: "kpi", format: { kind: "auto" }, familyOptions: { display: "number", measure: "device_trips.count" } },
};

const liveTable: { query: CubeQuery; chart: ChartOptions } = {
  query: {
    measures: ["device_trips.count", "device_trips.total_distance"],
    dimensions: ["device_trips.device_id"],
    timeDimensions: lastN,
    order: { "device_trips.count": "desc" },
    limit: 10,
  },
  chart: { family: "table", familyOptions: { pageSize: 10 } },
};

const chartSpec = loadSpec(chartJson) as ChartSpec;
const dashSpec = loadSpec(dashJson) as DashboardSpec;

function LiveSection() {
  return (
    <CubeVizProvider cube={LIVE_CONNECTION}>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Live Cube data (via /__cube proxy)</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Panel title="KPI — total trips (30d)">
            <CubeChart query={liveKpi.query} chart={liveKpi.chart} />
          </Panel>
          <div className="md:col-span-2">
            <Panel title="Bar — trips & distance by day (30d)">
              <CubeChart query={liveBar.query} chart={liveBar.chart} />
            </Panel>
          </div>
        </div>
        <Panel title="Table — top devices by trips (30d)">
          <CubeChart query={liveTable.query} chart={liveTable.chart} />
        </Panel>
        <Panel title={`Validated ChartSpec: "${chartSpec.name ?? chartSpec.id}"`}>
          <CubeChart query={chartSpec.query} chart={chartSpec.chart} />
        </Panel>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 text-sm font-medium">{`Validated DashboardSpec: "${dashSpec.name ?? dashSpec.id}"`}</div>
          <div className="h-[420px] w-full">
            <Dashboard spec={dashSpec} />
          </div>
        </div>
      </section>
    </CubeVizProvider>
  );
}

/* ─────────────────────────────────── app ────────────────────────────────── */

export function App() {
  const [dark, setDark] = useState(false);
  const [live, setLive] = useState(true);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">cube-viz</h1>
          <p className="text-sm text-muted-foreground">Milestone 1 — render core</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLive((v) => !v)}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent"
          >
            {live ? "Hide live" : "Show live"}
          </button>
          <button
            onClick={toggleDark}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent"
          >
            {dark ? "☀ Light" : "☾ Dark"}
          </button>
        </div>
      </header>

      {live && <LiveSection />}
      <MockGallery />
    </div>
  );
}
