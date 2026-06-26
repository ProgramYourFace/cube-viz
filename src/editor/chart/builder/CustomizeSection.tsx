import * as React from "react";

import { DEFAULTS, familyDescriptor } from "@/charts";
import type { ChartOptions, ChartSpec } from "@/spec";
import { Input } from "@/components/ui/input";

import { FieldRow } from "../../primitives/FieldRow";
import { SegmentedControl } from "../../primitives/SegmentedControl";
import { SwitchRow } from "../../primitives/SwitchRow";

export interface CustomizeSectionProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
}

type StackChoice = "none" | "stacked" | "percent";

/**
 * The per-family option set — ONLY the meaning-changing knobs for each chart type
 * (orientation, stacking, line shape, donut, KPI comparison…). Deliberately small:
 *
 *  - Number / unit / decimal formatting is AUTOMATIC (member meta + the host formatter),
 *    never a per-chart knob.
 *  - Axis labels, and legend / axis / label VISIBILITY, are edited IN CONTEXT on the
 *    chart (see ChartEditOverlay), not here.
 *
 * Fewest knobs for sensible defaults.
 */
export function CustomizeSection({ spec, update }: CustomizeSectionProps): React.ReactElement {
  const { chart } = spec;
  const family = chart.family;
  const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;

  const setEnvelope = (patch: Partial<ChartOptions>): void =>
    update({ ...spec, chart: { ...chart, ...patch } });
  const setFamilyOptions = (patch: Record<string, unknown>): void =>
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, ...patch } } });

  // Reflect the EFFECTIVE stack mode (an unset value renders with the family default).
  // Area's default is shape-aware (a color-split pivot stacks; multiple measures overlap).
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

      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;

      case "area":
        return (
          <>
            {StackControl}
            {chart.stackMode === undefined ? (
              <p className="cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80">
                {chart.mapping?.series?.mode === "pivot"
                  ? "Color-split areas stack into a whole by default — set this to change it."
                  : "Separate measures overlap by default; stacking adds them into one band."}
              </p>
            ) : null}
          </>
        );

      case "pie":
        return (
          <>
            <SwitchRow
              label="Donut"
              checked={typeof fo.innerRadiusPct === "number" && fo.innerRadiusPct > 0}
              onChange={(on) => setFamilyOptions({ innerRadiusPct: on ? 55 : 0 })}
            />
            <FieldRow label="Slice labels">
              <SegmentedControl<"none" | "value" | "percent" | "name">
                aria-label="Slice labels"
                size="sm"
                options={[
                  { value: "none", label: "None" },
                  { value: "percent", label: "%" },
                  { value: "value", label: "Value" },
                  { value: "name", label: "Name" },
                ]}
                value={(fo.showLabels as "none" | "value" | "percent" | "name") ?? "percent"}
                onChange={(v) => setFamilyOptions({ showLabels: v })}
              />
            </FieldRow>
            <KField label="Max slices">
              <Input
                type="number"
                min={1}
                className="cv:h-8"
                value={(fo.maxSlices as number | undefined) ?? ""}
                placeholder="8"
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  setFamilyOptions({ maxSlices: Number.isFinite(n) && n > 0 ? n : undefined });
                }}
              />
            </KField>
          </>
        );

      // KPI is configured by its three inline blocks in the config strip (Value /
      // Comparison / Sparkline — see ChartEditOverlay), so the chart-type popover shows
      // no Options for a KPI (no confusing split).
      case "kpi":
        return null;

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

      // Combo is configured entirely per-measure (render type, line shape, points,
      // axis, color) on each Values field — no type-level options.
      case "combo":
        return null;

      case "scatter":
        return null;

      case "map": {
        const mode = (fo.mode as "points" | "paths" | "heatmap") ?? "points";
        return (
          <>
            <FieldRow label="Mode">
              <SegmentedControl<"points" | "paths" | "heatmap">
                aria-label="Map mode"
                size="sm"
                options={[
                  { value: "points", label: "Points" },
                  { value: "paths", label: "Paths" },
                  { value: "heatmap", label: "Heatmap" },
                ]}
                value={mode}
                onChange={(v) => setFamilyOptions({ mode: v })}
              />
            </FieldRow>
            {mode === "heatmap" && (
              <KField label="Heatmap radius">
                <Input
                  type="number"
                  min={1}
                  className="cv:h-8"
                  value={(fo.heatmapRadius as number | undefined) ?? ""}
                  placeholder="20"
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    setFamilyOptions({ heatmapRadius: Number.isFinite(n) && n > 0 ? n : undefined });
                  }}
                />
              </KField>
            )}
          </>
        );
      }
    }
  })();

  return <div className="cv:flex cv:flex-col">{body}</div>;
}

/**
 * Whether the type picker should show an "Options" section for this family — a
 * descriptor flag. line / combo / scatter / kpi are fully edited in context
 * (per-measure pills + on-chart chrome / the KPI strip), so they have none.
 */
export function hasCustomizeOptions(family: ChartSpec["chart"]["family"]): boolean {
  return familyDescriptor(family).hasCustomizeOptions;
}

/** A vertical labeled field (caption above the control) for the option pickers. */
function KField({ label, children }: { label: string; children: React.ReactNode }): React.ReactElement {
  return (
    <div className="cv:flex cv:flex-col cv:gap-1 cv:py-1">
      <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
