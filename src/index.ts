/**
 * cube-viz public API.
 *
 * Render and edit JSON dashboard/chart specs backed by Cube. The spec contract
 * (`@/spec`) is the stable, library-agnostic boundary; charts consume a normalized
 * adapter shape (`@/adapter`), never Cube/Recharts directly.
 */

// The spec contract (zod schemas + inferred types + load/migrate/validate).
export * from "./spec";

// Cube transport + resultSet → NormalizedChartData adapter (the abstraction seam).
export * from "./adapter";

// Variable binding: resolver (noFilter) + reactive store.
export * from "./variables";

// Value/date formatting (member-meta-driven).
export * from "./format";

// Units: the core, extensible metric/imperial registry + units-aware formatter +
// per-axis consistency primitives (axisKey/quantityLabel).
export * from "./units";

// Chart families + options framework + pure dispatcher.
export * from "./charts";

// Runtime provider, context, and component-override registry.
export * from "./provider";

// Headless hooks (the data pipeline below the rendering layer).
export * from "./hooks";

// Render engine: Dashboard, CubeChart, widgets, chrome, container-width reflow.
export * from "./render";

// Editors: chart editor + dashboard editor (JSON-in/out, container-responsive).
export * from "./editor";

// Transport seam (browser / preview / WebView) — interface types for later milestones.
export type * from "./transport/types";
