/**
 * The chart-families layer: eight pure `(NormalizedChartData, ChartOptions,
 * ChartConfig) → ReactElement` families, the options framework (defaults +
 * per-family zod schemas + default-merge), and the pure dispatcher.
 *
 * Recharts is confined to the family components; specs never carry a Recharts
 * prop. See docs/02-chart-options.md.
 */

// Dispatcher + builtin table.
export { ChartRenderer, builtinCharts } from "./ChartRenderer";
export type { ChartRendererProps } from "./ChartRenderer";

// The per-family descriptor registry (single source of truth for family DATA/dispatch).
export {
  builtinFamilyDescriptors,
  familyDescriptor,
  familyOrder,
} from "./familyDescriptors";
export type { ChartFamilyDescriptor } from "./familyDescriptors";

// Family components.
export { BarChartFamily } from "./bar";
export { LineChartFamily } from "./line";
export { AreaChartFamily } from "./area";
export { PieChartFamily } from "./pie";
export { ScatterChartFamily } from "./scatter";
export { KpiFamily } from "./kpi";
export { TableFamily } from "./table";
export { ComboChartFamily } from "./combo";
export { MapChartFamily } from "./map";

// Types.
export type { ChartComponent, ChartComponentProps, ChartConfig } from "./types";

// Options framework: defaults, default-merge, per-family zod schemas.
export {
  DEFAULTS,
  resolveOptions,
  deepMerge,
  familyOptionsSchema,
  ReferenceLineOptSchema,
  BarFamilyOptionsSchema,
  LineFamilyOptionsSchema,
  AreaFamilyOptionsSchema,
  PieFamilyOptionsSchema,
  ScatterFamilyOptionsSchema,
  KpiFamilyOptionsSchema,
  TableFamilyOptionsSchema,
  ComboFamilyOptionsSchema,
  TableColumnOptSchema,
  CondFormatRuleSchema,
  ComboSeriesOptSchema,
  MapFamilyOptionsSchema,
  MapModeSchema,
} from "./defaults";
export type {
  FamilyDefault,
  ReferenceLineOpt,
  BarFamilyOptions,
  LineFamilyOptions,
  AreaFamilyOptions,
  PieFamilyOptions,
  ScatterFamilyOptions,
  KpiFamilyOptions,
  TableFamilyOptions,
  TableColumnOpt,
  CondFormatRule,
  ComboFamilyOptions,
  ComboSeriesOpt,
  MapFamilyOptions,
  MapMode,
} from "./defaults";
