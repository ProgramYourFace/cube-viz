import { useEffect, useMemo, useState } from "react";

import type { ChartOptions, CubeQuery, DashboardSpec, Granularity } from "@/spec";
import { loadSpec } from "@/spec";
import { CubeVizProvider } from "@/provider";
import { CubeChart, InputWidgetView } from "@/render";
import { DashboardProvider, useDashboard } from "@/hooks";
import { DashboardEditor } from "@/editor";

import { granularitiesForRange, nearestGranularity, rangeSpanDays } from "./granularity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import dashJson from "./specs/dashboard-fleet-utilization.json";

// Units are a CORE, on-by-default feature now: no host `formatValue` needed — the
// provider's `locale.unitSystem` toggle re-localizes every axis/tooltip via the
// core units formatter. (A host could still pass `units={…}` to extend conversions.)

/** Granularity control whose options ADAPT to the selected date range (down to second). */
function AdaptiveGranularityControl() {
  const { resolveValue, setVar } = useDashboard();
  const dr = resolveValue("dateRange");
  const gran = resolveValue("granularity") as Granularity | undefined;
  const options = useMemo(() => granularitiesForRange(rangeSpanDays(dr)), [dr]);

  // Clamp the current granularity to a valid option when the range changes.
  useEffect(() => {
    const next = nearestGranularity(gran, options);
    if (next !== gran) setVar("granularity", next);
  }, [options, gran, setVar]);

  return <InputWidgetView control={{ variable: "granularity", control: { kind: "granularity", options } }} />;
}

/* ───────────────────────────── live chart specs ─────────────────────────── */

const TIME = "device_trips.start_time";
const DEVICE = "devices.name";
const dateVar = { var: "dateRange" } as const;
const granVar = { var: "granularity" } as const;
const tsTime: CubeQuery["timeDimensions"] = [
  { dimension: TIME, granularity: granVar, dateRange: dateVar },
];
const onlyRange: CubeQuery["timeDimensions"] = [{ dimension: TIME, dateRange: dateVar }];

interface Example {
  title: string;
  note: string;
  query: CubeQuery;
  chart: ChartOptions;
  wide?: boolean;
}

const EXAMPLES: Example[] = [
  {
    title: "KPI — total distance",
    note: "km ↔ mi",
    query: { measures: ["device_trips.total_distance"], timeDimensions: onlyRange },
    chart: { family: "kpi", format: { kind: "auto" }, familyOptions: { display: "number", measure: "device_trips.total_distance" } },
  },
  {
    title: "Bar — distance by day",
    note: "grouped · km",
    wide: true,
    query: {
      measures: ["device_trips.total_distance", "device_trips.avg_distance"],
      timeDimensions: tsTime,
      order: [[TIME, "asc"]],
    },
    chart: {
      family: "bar",
      stackMode: "grouped",
      mapping: {
        category: { member: TIME },
        series: {
          mode: "measures",
          members: ["device_trips.total_distance", "device_trips.avg_distance"],
          meta: {
            "device_trips.total_distance": { label: "Total", colorToken: "chart-1" },
            "device_trips.avg_distance": { label: "Avg", colorToken: "chart-2" },
          },
        },
      },
      legend: { show: true },
      tooltip: { show: true },
    },
  },
  {
    title: "Line — fuel efficiency over time",
    note: "km/L ↔ mpg",
    query: { measures: ["device_trips.avg_trip_fuel_efficiency"], timeDimensions: tsTime, order: [[TIME, "asc"]] },
    chart: {
      family: "line",
      mapping: {
        category: { member: TIME },
        series: {
          mode: "measures",
          members: ["device_trips.avg_trip_fuel_efficiency"],
          meta: { "device_trips.avg_trip_fuel_efficiency": { label: "Efficiency", colorToken: "chart-3" } },
        },
      },
      tooltip: { show: true, indicator: "line" },
    },
  },
  {
    title: "Area — fuel use over time",
    note: "stacked · L ↔ gal",
    query: { measures: ["device_trips.total_fuel", "device_trips.idle_fuel"], timeDimensions: tsTime, order: [[TIME, "asc"]] },
    chart: {
      family: "area",
      stackMode: "stacked",
      mapping: {
        category: { member: TIME },
        series: {
          mode: "measures",
          members: ["device_trips.total_fuel", "device_trips.idle_fuel"],
          meta: {
            "device_trips.total_fuel": { label: "Total fuel", colorToken: "chart-4" },
            "device_trips.idle_fuel": { label: "Idle fuel", colorToken: "chart-5" },
          },
        },
      },
      legend: { show: true },
    },
  },
  {
    title: "Pie — trips by device",
    note: "device name · count",
    query: { measures: ["device_trips.count"], dimensions: [DEVICE], timeDimensions: onlyRange, order: { "device_trips.count": "desc" }, limit: 8 },
    chart: {
      family: "pie",
      mapping: { category: { member: DEVICE }, series: { mode: "measures", members: ["device_trips.count"] } },
      familyOptions: { innerRadiusPct: 55, showLabels: "percent", maxSlices: 6 },
      legend: { show: true },
    },
  },
  {
    title: "Scatter — distance vs efficiency",
    note: "per device · bubble = trips",
    query: { measures: ["device_trips.avg_distance", "device_trips.avg_trip_fuel_efficiency", "device_trips.count"], dimensions: [DEVICE], timeDimensions: onlyRange, limit: 100 },
    chart: {
      family: "scatter",
      mapping: { category: { member: DEVICE }, series: { mode: "measures", members: ["device_trips.avg_distance"] } },
      familyOptions: { x: "device_trips.avg_distance", y: "device_trips.avg_trip_fuel_efficiency", size: "device_trips.count" },
      tooltip: { show: true },
    },
  },
  {
    title: "Combo — distance + efficiency",
    note: "dual axis · km / km·L",
    wide: true,
    query: { measures: ["device_trips.total_distance", "device_trips.avg_trip_fuel_efficiency"], timeDimensions: tsTime, order: [[TIME, "asc"]] },
    chart: {
      family: "combo",
      mapping: { category: { member: TIME }, series: { mode: "measures", members: ["device_trips.total_distance", "device_trips.avg_trip_fuel_efficiency"] } },
      familyOptions: {
        series: [
          { member: "device_trips.total_distance", render: "bar", colorToken: "chart-1", label: "Distance" },
          { member: "device_trips.avg_trip_fuel_efficiency", render: "line", axis: "right", colorToken: "chart-3", label: "Efficiency" },
        ],
      },
      legend: { show: true },
    },
  },
  {
    title: "Table — fleet by device",
    note: "mixed units per column",
    wide: true,
    query: {
      measures: ["device_trips.count", "device_trips.total_distance", "device_trips.avg_distance", "device_trips.total_duration"],
      dimensions: [DEVICE],
      timeDimensions: onlyRange,
      order: { "device_trips.count": "desc" },
      limit: 12,
    },
    chart: { family: "table", familyOptions: { pageSize: 6 } },
  },
];

/* ───────────────────────────── control variables ────────────────────────── */

const CONTROLS_SPEC: DashboardSpec = {
  schemaVersion: 1,
  kind: "dashboard",
  id: "preview-controls",
  variables: [
    { name: "dateRange", type: "dateRange", label: "Date range", default: "last 7 days" },
    { name: "granularity", type: "granularity", label: "Granularity", default: "day" },
  ],
  widgets: [],
  layout: [],
};

const editableDash = loadSpec(dashJson) as DashboardSpec;

/* ─────────────────────────────── settings ───────────────────────────────── */

interface Settings {
  endpoint: string;
  secret: string;
  systemIds: string;
  roles: string;
  unitSystem: "metric" | "imperial";
  theme: "light" | "dark";
  locale: string;
}

const INITIAL: Settings = {
  endpoint: "",
  secret: "",
  systemIds: "",
  roles: "admin",
  unitSystem: "metric",
  theme: "light",
  locale: "en-US",
};

function Panel({ title, note, wide, children }: { title: string; note?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-4 shadow-sm ${wide ? "md:col-span-2" : ""}`}>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-medium text-card-foreground">{title}</span>
        {note && <span className="text-xs text-muted-foreground">{note}</span>}
      </div>
      <div className="h-[300px]">{children}</div>
    </div>
  );
}

function SettingsPanel({ value, onChange }: { value: Settings; onChange: (s: Settings) => void }) {
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-4 shadow-sm md:grid-cols-3">
      <div className="space-y-1.5 md:col-span-2">
        <Label>Cube endpoint</Label>
        <Input value={value.endpoint} placeholder="https://…cubecloudapp.dev" onChange={(e) => set("endpoint", e.target.value)} />
        <p className="text-xs text-muted-foreground">From the server .env; override to point elsewhere.</p>
      </div>
      <div className="space-y-1.5">
        <Label>API secret (optional override)</Label>
        <Input type="password" value={value.secret} placeholder="using server .env" onChange={(e) => set("secret", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Security context — systemIds (CSV)</Label>
        <Input value={value.systemIds} placeholder="(empty = all, admin only)" onChange={(e) => set("systemIds", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Roles</Label>
        <Select value={value.roles} onValueChange={(v) => set("roles", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">admin (all tenants)</SelectItem>
            <SelectItem value="tenant">tenant (scoped to systemIds)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Unit system</Label>
        <Select value={value.unitSystem} onValueChange={(v) => set("unitSystem", v as Settings["unitSystem"]) }>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="metric">Metric (km, L, °C)</SelectItem>
            <SelectItem value="imperial">Imperial (mi, gal, °F)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Theme</Label>
        <Select value={value.theme} onValueChange={(v) => set("theme", v as Settings["theme"]) }>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Locale</Label>
        <Input value={value.locale} onChange={(e) => set("locale", e.target.value)} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────── app ────────────────────────────────── */

export function App() {
  const [settings, setSettings] = useState<Settings>(INITIAL);
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState<"gallery" | "edit">("gallery");
  const [editSpec, setEditSpec] = useState<DashboardSpec>(editableDash);

  // Prefill connection defaults from the dev server's .env.
  useEffect(() => {
    fetch("/__cube/config")
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => {
        if (!c) return;
        setSettings((s) => ({
          ...s,
          endpoint: c.endpoint ?? s.endpoint,
          systemIds: (c.defaultSystemIds ?? []).join(","),
          roles: (c.defaultRoles ?? []).join(",") || s.roles,
        }));
      })
      .catch(() => {});
  }, []);

  // Mirror the theme onto <html> so the CSS tokens switch.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
  }, [settings.theme]);

  const connection = useMemo(
    () => ({
      endpoint: "/__cube/cubejs-api/v1",
      token: "dev",
      headers: {
        "x-cube-systemids": settings.systemIds,
        "x-cube-roles": settings.roles,
        ...(settings.endpoint ? { "x-cube-endpoint": settings.endpoint } : {}),
        ...(settings.secret ? { "x-cube-secret": settings.secret } : {}),
      },
    }),
    [settings.systemIds, settings.roles, settings.endpoint, settings.secret],
  );

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(editSpec, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${editSpec.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <CubeVizProvider
      cube={connection}
      locale={{ unitSystem: settings.unitSystem, locale: settings.locale }}
      theme={{ mode: settings.theme }}
      // The host injects its Google Maps key here (e.g. GOOGLE_API_KEY). The
      // playground has none, so the `map` family renders its graceful placeholder.
      maps={{ apiKey: undefined }}
    >
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">cube-viz</h1>
            <p className="text-sm text-muted-foreground">Live preview · {settings.unitSystem}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-border p-0.5">
              <Button size="sm" variant={mode === "gallery" ? "secondary" : "ghost"} onClick={() => setMode("gallery")}>Gallery</Button>
              <Button size="sm" variant={mode === "edit" ? "secondary" : "ghost"} onClick={() => setMode("edit")}>Edit dashboard</Button>
            </div>
            {mode === "edit" && (
              <Button size="sm" variant="outline" onClick={exportJson}>Export JSON</Button>
            )}
            <Button size="sm" variant="outline" onClick={() => setShowSettings((v) => !v)}>
              {showSettings ? "Hide settings" : "Settings"}
            </Button>
          </div>
        </header>

        {showSettings && <SettingsPanel value={settings} onChange={setSettings} />}

        {mode === "gallery" ? (
          <DashboardProvider spec={CONTROLS_SPEC}>
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 md:max-w-2xl">
              <InputWidgetView control={{ variable: "dateRange", control: { kind: "dateRange", allowFuture: false, presets: ["last 24 hours", "last 7 days", "last 30 days", "last 90 days", "this year"] } }} />
              <AdaptiveGranularityControl />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {EXAMPLES.map((ex) => (
                <Panel key={ex.title} title={ex.title} note={ex.note} wide={ex.wide}>
                  <CubeChart query={ex.query} chart={ex.chart} />
                </Panel>
              ))}
            </div>
          </DashboardProvider>
        ) : (
          <div className="rounded-xl border border-border bg-card p-2 shadow-sm">
            <DashboardEditor spec={editSpec} onChange={setEditSpec} />
          </div>
        )}
      </div>
    </CubeVizProvider>
  );
}
