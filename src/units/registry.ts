import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";

import type { MemberMeta } from "@/format";

/**
 * The cube-viz UNITS registry — a CORE, EXTENSIBLE feature.
 *
 * Values are stored metric; a {@link UnitDef} declares the imperial display unit
 * and a pure metric→imperial conversion. {@link DEFAULT_UNIT_CONVERSIONS} ships a
 * batteries-included default table keyed by STORAGE unit; the actual conversion
 * math is delegated to the vetted {@link https://www.npmjs.com/package/convert-units
 * convert-units} library (NOT hand-rolled factors), so every metric↔imperial pair
 * it supports is correct and maintained upstream. Hosts EXTEND/override the table
 * via the provider's `units` prop (the extension point).
 *
 * The other half of the feature is per-axis CONSISTENCY: {@link axisKey} maps a
 * member's meta to a compatibility key so the builder can enforce that every
 * variable on one value-axis describes the same KIND of quantity.
 */

/** A metric→imperial conversion rule. Storage is metric; this converts to imperial. */
export interface UnitDef {
  /** Unit shown when the viewer's unitSystem is "imperial" (e.g. "mi"). */
  imperialUnit: string;
  /** Pure storage(metric)→imperial conversion. */
  toImperial: (v: number) => number;
}

/** convert-units factory configured with every packaged measure. */
const convert = configureMeasurements(allMeasures);

/**
 * Map a Cube `meta.unit` storage string → the convert-units conversion to run.
 *  - `from`  : the convert-units abbreviation for the (metric) storage unit
 *  - `to`    : the convert-units abbreviation for the imperial target
 *  - `label` : how the imperial unit is shown (convert-units uses e.g. "fl-oz";
 *              we display "fl oz")
 * Several Cube spellings (L/l, °C/C, mL/ml) alias to the same conversion.
 */
interface ImperialRule {
  from: string;
  to: string;
  label: string;
}

const IMPERIAL_RULES: Record<string, ImperialRule> = {
  // length / distance
  km: { from: "km", to: "mi", label: "mi" },
  m: { from: "m", to: "ft", label: "ft" },
  cm: { from: "cm", to: "in", label: "in" },
  mm: { from: "mm", to: "in", label: "in" },
  // speed
  "km/h": { from: "km/h", to: "mph", label: "mph" },
  "km/hr": { from: "km/h", to: "mph", label: "mph" },
  kph: { from: "km/h", to: "mph", label: "mph" },
  "m/s": { from: "m/s", to: "mph", label: "mph" },
  // volume
  L: { from: "l", to: "gal", label: "gal" },
  l: { from: "l", to: "gal", label: "gal" },
  ml: { from: "ml", to: "fl-oz", label: "fl oz" },
  mL: { from: "ml", to: "fl-oz", label: "fl oz" },
  // mass / weight
  kg: { from: "kg", to: "lb", label: "lb" },
  g: { from: "g", to: "oz", label: "oz" },
  mg: { from: "mg", to: "oz", label: "oz" },
  // temperature
  "°C": { from: "C", to: "F", label: "°F" },
  C: { from: "C", to: "F", label: "°F" },
};

/** Build a {@link UnitDef} that runs its conversion through convert-units. */
function ruleToDef(rule: ImperialRule): UnitDef {
  return {
    imperialUnit: rule.label,
    toImperial: (v) => convert(v).from(rule.from).to(rule.to),
  };
}

/**
 * The default metric-storage-unit → imperial display rule table. EXTENSIBLE: hosts
 * add or override entries through the provider `units` prop. Keys match the Cube
 * `meta.unit` value (the storage unit). Conversions run through convert-units;
 * fuel economy (km/L↔mpg) is kept as an explicit factor because convert-units has
 * no fuel-economy measure.
 */
export const DEFAULT_UNIT_CONVERSIONS: Record<string, UnitDef> = {
  ...Object.fromEntries(
    Object.entries(IMPERIAL_RULES).map(([storage, rule]) => [storage, ruleToDef(rule)]),
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (v) => v * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (v) => v * 2.352145 },
};

/**
 * Merge host-supplied conversions over the defaults (the extension seam). Host
 * entries win on key collision; passing nothing returns the default table.
 */
export function mergeUnitConversions(
  extra?: Record<string, UnitDef>,
): Record<string, UnitDef> {
  return extra ? { ...DEFAULT_UNIT_CONVERSIONS, ...extra } : DEFAULT_UNIT_CONVERSIONS;
}

/**
 * The per-axis COMPATIBILITY key for a member. Two members may share a value-axis
 * IFF their `axisKey`s are equal, so an axis is always consistent in units.
 *
 * Priority: `meta.quantity` (the semantic kind — distance, time, fuelEfficiency…),
 * then `unit:<unit>` when only a raw unit is declared, else `"number"` (a bare
 * number — bare numbers are mutually compatible). So distance↔distance and
 * count↔count are allowed; distance↔duration and distance↔count are BLOCKED.
 */
export function axisKey(meta: MemberMeta | undefined): string {
  if (meta?.quantity) return meta.quantity;
  if (meta?.unit) return `unit:${meta.unit}`;
  return "number";
}

/** Title-case a camelCase / lowercase identifier ("fuelEfficiency" → "Fuel efficiency"). */
function humanize(s: string): string {
  const spaced = s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  if (spaced.length === 0) return s;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/**
 * A human label for an axis-consistency message. Prefers the quantity
 * ("fuelEfficiency" → "Fuel efficiency"), falls back to the unit, else "number".
 */
export function quantityLabel(meta: MemberMeta | undefined): string {
  if (meta?.quantity) return humanize(meta.quantity);
  if (meta?.unit) return meta.unit;
  return "number";
}
