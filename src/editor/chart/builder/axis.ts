import type { ChartFamily } from "@/spec";
import { familyDescriptor } from "@/charts";
import { axisKey, quantityLabel } from "@/units";
import type { MemberOption } from "../../primitives/meta-helpers";

/**
 * Pure helpers for per-axis UNIT CONSISTENCY in the Chart Builder.
 *
 * An axis should always be consistent in units: every variable plotted on one
 * value-axis must describe the same KIND of quantity (two lines must show the same
 * kind of data). We enforce this on the multi-number value wells of bar/line/area
 * ("Y axis"). Combo is deliberately EXEMPT — it is the dual-axis "mix" chart, so it
 * may mix quantities. Single-field axes (scatter X/Y, pie Size, KPI) need no
 * multi-field enforcement.
 */

/** The compatibility key for a member OPTION (mirrors {@link axisKey} on meta). */
export function axisKeyOf(option: MemberOption | undefined): string {
  return axisKey(option ? { unit: option.unit, quantity: option.quantity } : undefined);
}

/** A human label for an option's quantity/unit (for constraint messages). */
export function axisLabelOf(option: MemberOption | undefined): string {
  return quantityLabel(option ? { unit: option.unit, quantity: option.quantity } : undefined);
}

/**
 * Whether a value well ENFORCES axis-unit consistency for `family` + `wellId`.
 * Only the multi-number Y axis of bar/line/area; combo Y is exempt by design.
 */
export function wellEnforcesAxis(family: ChartFamily, wellId: string): boolean {
  return familyDescriptor(family).enforcesAxisUnit && wellId === "y";
}

/** Whether `option` may join an axis whose required key is `requiredKey`. */
export function compatibleWithAxis(
  option: MemberOption | undefined,
  requiredKey: string | undefined,
): boolean {
  if (requiredKey === undefined) return true; // empty axis accepts anything
  return axisKeyOf(option) === requiredKey;
}
