/**
 * The cube-viz UNITS module — a CORE, EXTENSIBLE feature (docs/02 §5).
 *
 * - The {@link DEFAULT_UNIT_CONVERSIONS} registry (storage-unit → metric/imperial
 *   {@link UnitDef}) + {@link mergeUnitConversions} extension seam.
 * - {@link createUnitsFormatter}: the units-aware {@link import("@/format").ValueFormatter}
 *   that is now ON BY DEFAULT (see `useFormatter`).
 * - {@link axisKey} / {@link quantityLabel}: per-axis unit-consistency primitives.
 *
 * Hosts extend the table via `<CubeVizProvider units={…}>`; a host-supplied
 * `locale.formatValue` still fully overrides the core formatter.
 */

export { createUnitsFormatter } from "./formatter";
export {
  DEFAULT_UNIT_CONVERSIONS,
  mergeUnitConversions,
  axisKey,
  quantityLabel,
} from "./registry";
export type { UnitDef } from "./registry";
