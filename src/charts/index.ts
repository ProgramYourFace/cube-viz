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

// The per-family descriptor TYPE + the builtin descriptor table (DATA leaf).
export { builtinFamilyDescriptors } from "./familyDescriptors";
export type { ChartFamilyDescriptor } from "./familyDescriptors";

// The MODULE family registry — the runtime single source of truth + host extension
// point. `familyDescriptor`/`resolveOptions`/`familyOptionsSchema` are registry-routed
// (they support host-registered families).
export {
  registerChartFamily,
  getFamilyDescriptor,
  familyDescriptor,
  listFamilyDescriptors,
  chartFamilies,
  familyDefaults,
  familyOptionsSchema,
  resolveOptions,
} from "./familyRegistry";

// Family components.
export { BarChartFamily } from "./bar";
export { LineChartFamily } from "./line";
export { AreaChartFamily } from "./area";
export { PieChartFamily } from "./pie";
export { ScatterChartFamily } from "./scatter";
export { KpiFamily } from "./kpi";
export { TableFamily } from "./table";
export { ComboChartFamily } from "./combo";

// Types.
export type { ChartComponent, ChartComponentProps, ChartConfig } from "./types";

// Options framework: builtin defaults, default-merge, per-family zod schemas.
export {
  BUILTIN_DEFAULTS,
  BUILTIN_FAMILY_OPTION_SCHEMAS,
  EMPTY_FAMILY_DEFAULT,
  resolveOptionsWith,
  deepMerge,
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
} from "./defaults";
