import * as React from "react";

import { DEFAULTS } from "@/charts";
import type { ChartOptions, ChartSpec, DateRange, Granularity, TimeDimension, VarRef } from "@/spec";

import { FieldRow } from "../../primitives/FieldRow";
import { GranularityPicker } from "../../primitives/GranularityPicker";
import { MemberPicker } from "../../primitives/MemberPicker";
import { SegmentedControl } from "../../primitives/SegmentedControl";
import { SwitchRow } from "../../primitives/SwitchRow";
import { inferCube } from "../helpers";
import { DateRangeValueEditor } from "../binding/DateRangeValueEditor";
import { ValueBinding } from "../binding/ValueBinding";

export interface CustomizeSectionProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
}

type StackChoice = "none" | "stacked" | "percent";
type CurveChoice = "monotone" | "linear" | "step" | "natural";

/**
 * The per-family option set (docs/05 §4) — the meaning-changing toggles for each chart
 * type, exposed so the UI covers what the renderers support (no spec hand-editing).
 * Lives under the chart-type picker since options are inherently per-type.
 */
export function CustomizeSection({ spec, update }: CustomizeSectionProps): React.ReactElement {
  const { chart } = spec;
  const family = chart.family;
  const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
  const cube = inferCube(spec);

  const setEnvelope = (patch: Partial<ChartOptions>): void =>
    update({ ...spec, chart: { ...chart, ...patch } });
  const setFamilyOptions = (patch: Record<string, unknown>): void =>
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, ...patch } } });

  // Reflect the EFFECTIVE stack mode (an unset value renders with the family default).
  // Area's default is shape-aware (a color-split pivot stacks; multiple measures overlap),
  // matching the area renderer; other families use their static envelope default.
  const areaDefault = chart.mapping?.series?.mode === "pivot" ? "stacked" : "none";
  const effectiveStack =
    chart.stackMode ??
    (family === "area" ? areaDefault : DEFAULTS[family].envelope.stackMode) ??
    "none";
  const stackValue: StackChoice =
    effectiveStack === "stacked" ? "stacked" : effectiveStack === "percent" ? "percent" : "none";

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

  // A full curve picker (not a binary toggle) so step/natural survive editing.
  const CurveControl = (
    <FieldRow label="Line shape">
      <SegmentedControl<CurveChoice>
        aria-label="Line shape"
        size="sm"
        options={[
          { value: "monotone", label: "Smooth" },
          { value: "linear", label: "Straight" },
          { value: "step", label: "Step" },
          { value: "natural", label: "Curved" },
        ]}
        value={(fo.curve as CurveChoice) ?? "monotone"}
        onChange={(v) => setFamilyOptions({ curve: v })}
      />
    </FieldRow>
  );

  const PointsControl = (
    <SwitchRow
      label="Show points"
      checked={fo.dots === true}
      onChange={(on) => setFamilyOptions({ dots: on })}
    />
  );
  const ValueLabelsControl = (
    <SwitchRow
      label="Show value labels"
      checked={fo.showValueLabels === true}
      onChange={(on) => setFamilyOptions({ showValueLabels: on })}
    />
  );
  const ConnectNullsControl = (
    <SwitchRow
      label="Connect gaps"
      checked={fo.connectNulls === true}
      onChange={(on) => setFamilyOptions({ connectNulls: on })}
    />
  );

  // Legend is shared by every family that draws one (not KPI / table).
  const hasLegend = family !== "kpi" && family !== "table";
  const LegendControl = hasLegend ? (
    <SwitchRow
      label="Legend"
      checked={chart.legend?.show !== false}
      onChange={(on) => setEnvelope({ legend: { ...chart.legend, show: on } })}
    />
  ) : null;

  // Remember the last comparison config so toggling KPI comparison off→on restores it.
  const lastComparison = React.useRef<Record<string, unknown> | undefined>(undefined);

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
            {ValueLabelsControl}
          </>
        );

      case "line":
        return (
          <>
            {CurveControl}
            {PointsControl}
            {ConnectNullsControl}
            {ValueLabelsControl}
          </>
        );

      case "area":
        return (
          <>
            {StackControl}
            {CurveControl}
            {PointsControl}
            {ConnectNullsControl}
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
        const comparison = fo.comparison as Record<string, unknown> | undefined;
        if (comparison) lastComparison.current = comparison;
        const comparing = comparison !== undefined;
        const sparkOn = fo.sparkline !== undefined;
        const td = spec.query.timeDimensions?.[0];
        // One direction drives BOTH the comparison delta and the sparkline color.
        const goodDirection =
          (fo.goodDirection as "up" | "down" | undefined) ??
          (comparison?.goodDirection as "up" | "down" | undefined) ??
          "up";
        const sparkGranularity = (fo.sparkline as { granularity?: Granularity | VarRef } | undefined)
          ?.granularity;

        // Edit the KPI's single time dimension. The MAIN query stays granularity-LESS so
        // the headline is an aggregate over the full range; the sparkline adds the bucket.
        const setTimeDim = (patch: Partial<TimeDimension>): void => {
          const base: TimeDimension | undefined =
            td ?? (patch.dimension ? { dimension: patch.dimension } : undefined);
          if (!base) return;
          const next: TimeDimension = { ...base };
          for (const k of Object.keys(patch) as (keyof TimeDimension)[]) {
            const v = patch[k];
            if (v === undefined) delete next[k];
            else (next as Record<string, unknown>)[k] = v;
          }
          delete (next as Record<string, unknown>).granularity;
          update({ ...spec, query: { ...spec.query, timeDimensions: [next] } });
        };

        return (
          <>
            <KField label="Time field">
              <MemberPicker
                cube={cube}
                kind="time"
                value={td?.dimension}
                onChange={(m) => setTimeDim({ dimension: m })}
                placeholder="All time"
                className="h-8"
              />
            </KField>
            {td?.dimension ? (
              <KField label="Date range">
                <ValueBinding
                  kind="dateRange"
                  value={td.dateRange}
                  onChange={(r) => setTimeDim({ dateRange: r as DateRange | VarRef | undefined })}
                  renderFixed={(r, set) => <DateRangeValueEditor value={r} onChange={set} />}
                />
              </KField>
            ) : null}

            <SwitchRow
              label="Sparkline"
              hint="An area trend under the number, colored by the direction."
              checked={sparkOn}
              onChange={(on) =>
                setFamilyOptions({
                  sparkline: on ? { granularity: sparkGranularity ?? "day" } : undefined,
                })
              }
            />
            {sparkOn ? (
              <KField label="Trend granularity">
                <ValueBinding
                  kind="granularity"
                  value={sparkGranularity}
                  onChange={(g) =>
                    setFamilyOptions({
                      sparkline: { ...(fo.sparkline as object), granularity: g as Granularity | VarRef },
                    })
                  }
                  renderFixed={(g, set) => (
                    <GranularityPicker value={g} onChange={set} className="h-8 w-full" />
                  )}
                />
              </KField>
            ) : null}

            <SwitchRow
              label="Compare to previous period"
              checked={comparing}
              onChange={(on) =>
                setFamilyOptions({
                  comparison: on
                    ? (lastComparison.current ?? { mode: "previousPeriod", showAsPercent: true })
                    : undefined,
                })
              }
            />
            {comparing ? (
              <SwitchRow
                label="Show as %"
                checked={(comparison?.showAsPercent ?? true) !== false}
                onChange={(on) => setFamilyOptions({ comparison: { ...comparison, showAsPercent: on } })}
              />
            ) : null}

            {comparing || sparkOn ? (
              <SwitchRow
                label="Higher is better"
                hint="Off = a decrease is good (inverts the up/down colors)."
                checked={goodDirection !== "down"}
                onChange={(on) => setFamilyOptions({ goodDirection: on ? "up" : "down" })}
              />
            ) : null}
          </>
        );
      }

      case "table":
        return (
          <>
            <SwitchRow
              label="Compact rows"
              checked={fo.rowHeight === "compact"}
              onChange={(on) => setFamilyOptions({ rowHeight: on ? "compact" : "default" })}
            />
            <SwitchRow
              label="Sortable columns"
              checked={fo.sortable !== false}
              onChange={(on) => setFamilyOptions({ sortable: on })}
            />
            <SwitchRow
              label="Sticky header"
              checked={fo.stickyHeader !== false}
              onChange={(on) => setFamilyOptions({ stickyHeader: on })}
            />
            <SwitchRow
              label="Row numbers"
              checked={fo.showRowNumbers === true}
              onChange={(on) => setFamilyOptions({ showRowNumbers: on })}
            />
          </>
        );

      case "combo":
        return (
          <>
            {CurveControl}
            {PointsControl}
            {ConnectNullsControl}
            <p className="py-1 text-xs text-muted-foreground">
              Set bar / line / area and the axis per series on each Values field above.
            </p>
          </>
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

/** A vertical labeled field (caption above the control) for the KPI option pickers. */
function KField({ label, children }: { label: string; children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex flex-col gap-1 py-1">
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
