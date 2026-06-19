import type { MemberMeta } from "@/format";

/**
 * The cube-viz UNITS registry — a CORE, EXTENSIBLE feature.
 *
 * Values are stored metric; a {@link UnitDef} declares the imperial display unit
 * and a pure metric→imperial conversion. {@link DEFAULT_UNIT_CONVERSIONS} ships a
 * batteries-included default table keyed by STORAGE unit; hosts EXTEND/override it
 * via the provider's `units` prop (the extension point) — core never hardcodes the
 * full universe of unit types, it just ships sensible defaults that can be merged
 * over.
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

/**
 * The default metric-storage-unit → imperial display rule table. EXTENSIBLE: hosts
 * add or override entries through the provider `units` prop. Keys match the Cube
 * `meta.unit` value (the storage unit).
 */
export const DEFAULT_UNIT_CONVERSIONS: Record<string, UnitDef> = {
  km: { imperialUnit: "mi", toImperial: (v) => v * 0.621371 },
  m: { imperialUnit: "ft", toImperial: (v) => v * 3.28084 },
  cm: { imperialUnit: "in", toImperial: (v) => v * 0.393701 },
  "km/h": { imperialUnit: "mph", toImperial: (v) => v * 0.621371 },
  "m/s": { imperialUnit: "mph", toImperial: (v) => v * 2.23694 },
  L: { imperialUnit: "gal", toImperial: (v) => v * 0.264172 },
  ml: { imperialUnit: "fl oz", toImperial: (v) => v * 0.033814 },
  kg: { imperialUnit: "lb", toImperial: (v) => v * 2.20462 },
  g: { imperialUnit: "oz", toImperial: (v) => v * 0.035274 },
  "°C": { imperialUnit: "°F", toImperial: (v) => (v * 9) / 5 + 32 },
  C: { imperialUnit: "°F", toImperial: (v) => (v * 9) / 5 + 32 },
  "km/L": { imperialUnit: "mpg", toImperial: (v) => v * 2.35215 },
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
