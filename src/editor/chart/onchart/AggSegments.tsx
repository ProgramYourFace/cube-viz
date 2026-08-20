import * as React from "react";

import { cn } from "@/components/ui/utils";

import {
  grainAggLabel,
  grainNoun,
  memberAgg,
  memberFamilyHint,
  memberMeasureKind,
  type CubeOption,
  type MemberOption,
} from "../../primitives/meta-helpers";

/**
 * The aggregation segment control — every variant of an aggregate family rendered as
 * an independently selectable segment ("total | avg | max"), the active one filled,
 * a blocked one disabled with its reason as the tooltip (never hidden mid-row).
 * Shared by the field picker's family rows and the placed-field popover, so the two
 * places a user changes aggregation look and behave identically.
 *
 * A `divider` before a segment draws a thin separator — used ahead of the row-level
 * "each trip" variant, which is a GRAIN switch (one point per row), not another way
 * of summarizing, and must not read as a sibling of total/avg.
 */
export interface AggSegmentOption {
  label: string;
  selected: boolean;
  disabled?: boolean;
  title?: string;
  /** Draw a separator BEFORE this segment (marks the each-row grain switch). */
  divider?: boolean;
  onSelect: () => void;
}

export function AggSegments({
  options,
  className,
}: {
  options: AggSegmentOption[];
  className?: string;
}): React.ReactElement {
  return (
    <span className={cn("cv-picker-aggseg", className)} role="radiogroup" aria-label="Aggregation">
      {options.map((o) => (
        <React.Fragment key={o.label}>
          {o.divider ? <span className="cv-picker-aggseg-divider" aria-hidden /> : null}
          <button
            type="button"
            role="radio"
            aria-checked={o.selected}
            disabled={o.disabled}
            title={o.title ?? `Aggregation: ${o.label}`}
            onClick={o.onSelect}
            className={cn("cv-picker-aggseg-opt", o.selected && "cv-picker-aggseg-opt--on")}
          >
            {o.label}
          </button>
        </React.Fragment>
      ))}
    </span>
  );
}

/**
 * The segment label for a family variant: its agg ("total", "avg"), with two
 * derivations — a cumulative counter's `max` reads "latest" (that IS the current
 * odometer/engine-hours number), and the row-level variant is named by the cube's
 * grain ("each trip"). The model may still override per member via meta `aggLabel`.
 */
export function aggPillLabel(option: MemberOption, cube: CubeOption | undefined): string {
  const override = option.meta?.aggLabel;
  if (typeof override === "string" && override.length > 0) return override;
  const agg = memberAgg(option) ?? "";
  if (agg === "value") return grainAggLabel(cube?.grain);
  if (agg === "max" && memberMeasureKind(option) === "counter") return "latest";
  return agg;
}

/** Whether a variant is its family's row-level (grain-switch) member. */
export function isRowVariant(option: MemberOption): boolean {
  return memberAgg(option) === "value";
}

/** What picking the row-level variant DOES — the segment tooltip + selected hint. */
export function rowVariantHint(cube: CubeOption | undefined): string {
  return `Plots each ${grainNoun(cube?.grain)} as its own point instead of summarizing.`;
}

/**
 * One teaching sentence for the segment control, derived from the family's
 * measurement kind — the default-aggregation rule stated exactly where the choice
 * is made. The selected row-level variant explains its shape change instead, and
 * a partition family speaks with the model's own `familyHint`.
 */
export function aggHint(
  variants: MemberOption[],
  cube: CubeOption | undefined,
  selected: MemberOption,
): string | undefined {
  if (isRowVariant(selected)) return rowVariantHint(cube);
  const kind = memberMeasureKind(selected) ?? variants.map(memberMeasureKind).find(Boolean);
  switch (kind) {
    case "flow":
      return "Adds up over time — total is usually the number you want.";
    case "gauge":
      return "A point-in-time reading — the average is usually right.";
    case "counter":
      return "Only ever grows — “latest” is the number you want.";
    case "stat": {
      const noun = grainNoun(cube?.grain);
      return `Describes one ${noun} at a time — the average across ${noun}s is usually right.`;
    }
    case "part":
      return variants.map(memberFamilyHint).find(Boolean);
    default:
      return undefined;
  }
}
