/*
 * CHART EDITOR harness (`editor.html`) — mounts the REAL `<ChartEditor>` against the
 * OFFLINE Cube mock (`playground/vite-cube-mock.ts`), so CI can photograph the editing
 * surface with no Cube server and no secrets.
 *
 * Nothing here is a stand-in: the provider builds a real `@cubejs-client/core` client
 * pointed at the mock's `/cubejs-api/v1`, `/meta` populates the field pickers and axis
 * labels, and the live preview issues a real `/load` that flows through
 * `normalize()` into the TanStack renderer.
 *
 * `?theme=dark` renders dark mode. The editor sits in a FIXED-SIZE container so
 * screenshots are pixel-stable run to run.
 */
import * as React from "react";
import { createRoot } from "react-dom/client";

import "@/styles/cube-viz.css";
import "@/theme/tokens.css";

import { CubeVizProvider } from "@/provider";
import { ChartEditor } from "@/editor";
import { SCHEMA_VERSION, type ChartSpec } from "@/spec";

/**
 * The seeded spec: total distance per DAY, split by region — i.e. already-placed
 * fields, so the wells strip, the on-chart chips, the legend and the live preview
 * are all populated the moment the page mounts (an empty spec would only show the
 * "choose a chart type" placeholder).
 *
 * The shape mirrors exactly what the editor's own writer (`chart/builder/channels.ts`
 * → `assembleMapping`) produces for category + 1 measure + pivot: mapping in
 * PIVOT mode, one series per region value.
 */
const SEED_SPEC: ChartSpec = {
  // Read from the schema rather than hardcoded: a bump would otherwise seed an
  // INVALID spec and the editor would show its "Invalid chart spec" alert instead.
  schemaVersion: SCHEMA_VERSION,
  kind: "chart",
  id: "chart_fleet_distance",
  name: "Distance over time by region",
  query: {
    measures: ["trips.total_distance"],
    dimensions: ["trips.region"],
    timeDimensions: [
      {
        dimension: "trips.start_time",
        granularity: "day",
        // A literal range (not "last 28 days") keeps the buckets fixed forever.
        dateRange: ["2026-07-15", "2026-08-11"],
      },
    ],
    order: [["trips.start_time", "asc"]],
    limit: 5000,
  },
  chart: {
    family: "line",
    mapping: {
      category: { member: "trips.start_time" },
      series: { mode: "pivot", value: "trips.total_distance", pivot: "trips.region" },
    },
    legend: { show: true, position: "bottom" },
    tooltip: { show: true, indicator: "line" },
  },
} as ChartSpec;

/**
 * A SECOND seed, selected with `?seed=measures`: two independent measures over time and
 * NO breakdown dimension. This is the field shape whose previews take the other branch
 * of every mapping-driven family — measure-mode series instead of a pivot — which for
 * `area` means OVERLAP mode (one gradient-filled mark per measure) instead of the
 * stacked single mark. The type picker's tiles are the only place several such charts
 * share one document, so this is the shape a per-tile rendering bug shows up in
 * (see `scripts/verify-type-picker.mjs`).
 */
const SEED_MEASURES: ChartSpec = {
  ...SEED_SPEC,
  id: "chart_fleet_measures",
  name: "Distance and fuel over time",
  query: {
    measures: ["trips.total_distance", "trips.fuel"],
    timeDimensions: [
      {
        dimension: "trips.start_time",
        granularity: "day",
        dateRange: ["2026-07-15", "2026-08-11"],
      },
    ],
    order: [["trips.start_time", "asc"]],
    limit: 5000,
  },
  chart: {
    family: "line",
    mapping: {
      category: { member: "trips.start_time" },
      series: { mode: "measures", members: ["trips.total_distance", "trips.fuel"] },
    },
    legend: { show: true, position: "bottom" },
    tooltip: { show: true, indicator: "line" },
  },
} as ChartSpec;

const SEEDS: Record<string, ChartSpec> = { default: SEED_SPEC, measures: SEED_MEASURES };

function App(): React.ReactElement {
  // Stable identity: CubeVizProvider rebuilds the Cube client whenever `cube` changes.
  const cube = React.useMemo(() => ({ endpoint: "/cubejs-api/v1", token: "mock" }), []);
  const [spec, setSpec] = React.useState<ChartSpec>(
    () => SEEDS[new URLSearchParams(location.search).get("seed") ?? "default"] ?? SEED_SPEC,
  );

  return (
    <CubeVizProvider cube={cube} locale={{ locale: "en-US", timezone: "UTC" }}>
      <div className="ed-page">
        <div className="ed-header">
          <h1>Chart editor</h1>
          <span>cube-viz · on-chart editing surface (offline Cube mock)</span>
        </div>
        {/* Fixed width AND height: the editor is container-responsive, so pinning the
            box is what makes the screenshot deterministic. */}
        <div className="ed-frame" data-testid="editor-frame">
          <ChartEditor spec={spec} onChange={setSpec} onSave={() => undefined} fill />
        </div>
      </div>
    </CubeVizProvider>
  );
}

const dark = new URLSearchParams(location.search).get("theme") === "dark";
if (dark) document.documentElement.classList.add("dark");
document.body.style.background = "var(--background)";

const style = document.createElement("style");
style.textContent = `
  .ed-page { min-height: 100vh; background: var(--background); color: var(--foreground); padding: 20px 24px; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  .ed-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; }
  .ed-header h1 { margin: 0; font-size: 1.25rem; letter-spacing: -0.02em; }
  .ed-header span { color: var(--muted-foreground); font-size: 0.8rem; }
  .ed-frame { width: 1340px; height: 820px; box-sizing: border-box; padding: 16px; border: 1px solid var(--border); border-radius: 12px; background: var(--card); }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
