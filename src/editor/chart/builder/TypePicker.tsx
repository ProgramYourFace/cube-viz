import * as React from "react";

import type { ChartFamily, ChartSpec } from "@/spec";

import { FAMILY_LABELS } from "../helpers";
import { SegmentedControl } from "../../primitives/SegmentedControl";

const FAMILY_ORDER: ChartFamily[] = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo",
];

export interface TypePickerProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
}

/**
 * The top-of-panel chart-family strip (docs/05 §1). Conditions which wells and
 * Customize options exist, so it leads the builder. Switching family resets the
 * family-specific `familyOptions` (each family has its own schema) but keeps the
 * query + generic mapping — matching the old panel's `onFamilyChange`.
 */
export function TypePicker({ spec, update }: TypePickerProps): React.ReactElement {
  const family = spec.chart.family;
  const onChange = (next: ChartFamily): void => {
    if (next === family) return;
    update({ ...spec, chart: { ...spec.chart, family: next, familyOptions: undefined } });
  };

  return (
    <div data-slot="type-picker">
      <SegmentedControl<ChartFamily>
        aria-label="Chart type"
        size="sm"
        fullWidth
        options={FAMILY_ORDER.map((f) => ({ value: f, label: FAMILY_LABELS[f] }))}
        value={family}
        onChange={onChange}
      />
    </div>
  );
}
