import * as React from "react";

import { cn } from "@/components/ui/utils";

import {
  grainAggLabel,
  memberAgg,
  type CubeOption,
  type MemberOption,
} from "../../primitives/meta-helpers";

/**
 * The aggregation segment control — every variant of an aggregate family rendered as
 * an independently selectable segment ("total | avg | max"), the active one filled,
 * a blocked one disabled with its reason as the tooltip (never hidden mid-row).
 * Shared by the field picker's family rows and the placed-field popover, so the two
 * places a user changes aggregation look and behave identically.
 */
export interface AggSegmentOption {
  label: string;
  selected: boolean;
  disabled?: boolean;
  title?: string;
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
        <button
          key={o.label}
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
      ))}
    </span>
  );
}

/**
 * The segment label for a family variant: its agg ("total", "avg"; the model may
 * override per member via meta `aggLabel` — e.g. a cumulative counter's max reads
 * "latest"), with the row-level variant named by the cube's grain ("per trip").
 */
export function aggPillLabel(option: MemberOption, cube: CubeOption | undefined): string {
  const override = option.meta?.aggLabel;
  if (typeof override === "string" && override.length > 0) return override;
  const agg = memberAgg(option) ?? "";
  return agg === "value" ? grainAggLabel(cube?.grain) : agg;
}
