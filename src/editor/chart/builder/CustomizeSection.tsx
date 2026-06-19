import * as React from "react";

import type { ChartOptions, ChartSpec } from "@/spec";

import { FieldRow } from "../../primitives/FieldRow";
import { SegmentedControl } from "../../primitives/SegmentedControl";
import { SwitchRow } from "../../primitives/SwitchRow";

export interface CustomizeSectionProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
}

type StackChoice = "none" | "stacked" | "percent";

/**
 * The small per-family option set (docs/05 §4) — only the meaning-changing toggles.
 * Everything formatting/legend/axis/tooltip is automatic and lives nowhere in the
 * UI. Orientation is bar-only. Combo's render lives on the chips, so it has none.
 */
export function CustomizeSection({ spec, update }: CustomizeSectionProps): React.ReactElement {
  const { chart } = spec;
  const family = chart.family;
  const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;

  const setEnvelope = (patch: Partial<ChartOptions>): void =>
    update({ ...spec, chart: { ...chart, ...patch } });
  const setFamilyOptions = (patch: Record<string, unknown>): void =>
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, ...patch } } });

  const stackValue: StackChoice =
    chart.stackMode === "stacked"
      ? "stacked"
      : chart.stackMode === "percent"
        ? "percent"
        : "none";

  const StackControl = (
    <FieldRow label="Stacked">
      <SegmentedControl<StackChoice>
        aria-label="Stacking"
        size="sm"
        options={[
          { value: "none", label: "None" },
          { value: "stacked", label: "Stacked" },
          { value: "percent", label: "100%" },
        ]}
        value={stackValue}
        onChange={(v) => setEnvelope({ stackMode: v })}
      />
    </FieldRow>
  );

  // Legend is shared by every family that draws one (not KPI / table). Defaults to on;
  // a UI toggle matters most for color-split charts where colours map to categories.
  const hasLegend = family !== "kpi" && family !== "table";
  const LegendControl = hasLegend ? (
    <SwitchRow
      label="Legend"
      checked={chart.legend?.show !== false}
      onChange={(on) => setEnvelope({ legend: { ...chart.legend, show: on } })}
    />
  ) : null;

  const body = ((): React.ReactNode => {
    switch (family) {
      case "bar":
        return (
          <>
            <SwitchRow
              label="Horizontal"
              checked={chart.orientation === "horizontal"}
              onChange={(on) => setEnvelope({ orientation: on ? "horizontal" : "vertical" })}
            />
            {StackControl}
          </>
        );

      case "line":
        return (
          <>
            <SwitchRow
              label="Curved"
              checked={(fo.curve ?? "monotone") === "monotone"}
              onChange={(on) => setFamilyOptions({ curve: on ? "monotone" : "linear" })}
            />
            <SwitchRow
              label="Show points"
              checked={fo.dots === true}
              onChange={(on) => setFamilyOptions({ dots: on })}
            />
          </>
        );

      case "area":
        return (
          <>
            {StackControl}
            <SwitchRow
              label="Curved"
              checked={(fo.curve ?? "monotone") === "monotone"}
              onChange={(on) => setFamilyOptions({ curve: on ? "monotone" : "linear" })}
            />
          </>
        );

      case "pie":
        return (
          <SwitchRow
            label="Donut"
            checked={typeof fo.innerRadiusPct === "number" && fo.innerRadiusPct > 0}
            onChange={(on) => setFamilyOptions({ innerRadiusPct: on ? 55 : 0 })}
          />
        );

      case "kpi": {
        const comparison = fo.comparison as { mode: string; showAsPercent?: boolean } | undefined;
        const comparing = comparison !== undefined;
        return (
          <>
            <SwitchRow
              label="Compare to previous period"
              checked={comparing}
              onChange={(on) =>
                setFamilyOptions({
                  comparison: on ? { mode: "previousPeriod", showAsPercent: true } : undefined,
                })
              }
            />
            {comparing ? (
              <SwitchRow
                label="Show as %"
                checked={comparison?.showAsPercent !== false}
                onChange={(on) =>
                  setFamilyOptions({
                    comparison: { ...comparison, mode: "previousPeriod", showAsPercent: on },
                  })
                }
              />
            ) : null}
          </>
        );
      }

      case "table":
        return (
          <SwitchRow
            label="Compact rows"
            checked={fo.rowHeight === "compact"}
            onChange={(on) => setFamilyOptions({ rowHeight: on ? "compact" : "default" })}
          />
        );

      case "combo":
        return (
          <p className="py-1 text-xs text-muted-foreground">
            Set bar / line / area per series on each Y-axis field above.
          </p>
        );

      case "scatter":
        return null;
    }
  })();

  return (
    <div className="flex flex-col">
      {LegendControl}
      {body}
    </div>
  );
}
