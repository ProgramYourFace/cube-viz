import * as React from "react";

import type { FamilyRegistry } from "@/charts";
import { familySupportsTransform } from "@/charts/transforms";
import { useFamilyRegistry } from "@/provider";
import { DEFAULT_TRANSFORM_WINDOW, type ChartOptions, type ChartSpec, type TransformKind } from "@/spec";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FieldRow } from "../../primitives/FieldRow";
import { SegmentedControl } from "../../primitives/SegmentedControl";
import { SwitchRow } from "../../primitives/SwitchRow";

export interface CustomizeSectionProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
}

type StackChoice = "none" | "stacked" | "percent";

/** The "Compare" select's options — the three presentation transforms, plus off. */
type TransformChoice = "none" | TransformKind;

const TRANSFORM_LABELS: Record<TransformChoice, string> = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total",
};

const TRANSFORM_CHOICES: TransformChoice[] = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal",
];

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
  const families = useFamilyRegistry();
  const { chart } = spec;
  const family = chart.family;
  const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;

  // Host-registered families supply their own Customize panel on the descriptor.
  const descriptor = families.require(family);
  if (descriptor.Customize) {
    const HostCustomize = descriptor.Customize;
    return <HostCustomize spec={spec} update={update} />;
  }

  const setEnvelope = (patch: Partial<ChartOptions>): void =>
    update({ ...spec, chart: { ...chart, ...patch } });
  const setFamilyOptions = (patch: Record<string, unknown>): void =>
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, ...patch } } });

  // Reflect the EFFECTIVE stack mode (an unset value renders with the family default).
  // Area's default is shape-aware (a color-split pivot stacks; multiple measures overlap).
  const areaDefault = chart.mapping?.series?.mode === "pivot" ? "stacked" : "none";
  const effectiveStack =
    chart.stackMode ??
    (family === "area" ? areaDefault : families.defaults(family).envelope.stackMode) ??
    "none";
  const stackValue: StackChoice =
    effectiveStack === "stacked" ? "stacked" : effectiveStack === "percent" ? "percent" : "none";

  /**
   * The single PRESENTATION-transform control (spec: `chart.transform`). One select
   * covers rolling average / running total / % of total — the three questions that
   * would otherwise each need a new Cube measure. The window input is revealed ONLY
   * for a rolling average (it is meaningless for the other two), keeping the default
   * surface at exactly one knob. Shown only where the transform actually applies
   * (cartesian, mapping-driven families — see `familySupportsTransform`).
   */
  const transformKind: TransformChoice = chart.transform?.kind ?? "none";
  const TransformControl = familySupportsTransform(descriptor) ? (
    <>
      <FieldRow
        label="Compare"
        hint={
          transformKind === "percentOfTotal"
            ? "Each value as a share of its category total."
            : undefined
        }
      >
        <Select
          value={transformKind}
          onValueChange={(v) =>
            setEnvelope({
              transform:
                v === "none"
                  ? undefined
                  : v === "rollingAvg"
                    ? { kind: "rollingAvg", window: chart.transform?.window ?? DEFAULT_TRANSFORM_WINDOW }
                    : { kind: v as Exclude<TransformKind, "rollingAvg"> },
            })
          }
        >
          <SelectTrigger aria-label="Compare" className="cv-ec-h8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRANSFORM_CHOICES.map((c) => (
              <SelectItem key={c} value={c}>
                {TRANSFORM_LABELS[c]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>
      {transformKind === "rollingAvg" ? (
        <KField label="Window (points)">
          <Input
            type="number"
            min={2}
            max={90}
            className="cv-ec-h8 cv-transform-window"
            value={chart.transform?.window ?? DEFAULT_TRANSFORM_WINDOW}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              const window = Number.isFinite(n) ? Math.min(90, Math.max(2, n)) : DEFAULT_TRANSFORM_WINDOW;
              setEnvelope({ transform: { kind: "rollingAvg", window } });
            }}
          />
        </KField>
      ) : null}
    </>
  ) : null;

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
              <p className="cv-ec-hint cv-customize-hint">
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
                className="cv-ec-h8"
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

      case "heatmap":
        return (
          <SwitchRow
            label="Show values"
            checked={fo.showValues === true}
            onChange={(on) => setFamilyOptions({ showValues: on || undefined })}
          />
        );

      case "scatter":
        return null;

      default:
        return null;
    }
  })();

  // The transform is an ENVELOPE option, not a family knob, so it renders once after
  // the per-family body (and is `null` for families it doesn't apply to).
  return (
    <div className="cv-customize">
      {body}
      {TransformControl}
    </div>
  );
}

/**
 * Whether the type picker should show an "Options" section for this family. For a
 * builtin it's the descriptor flag (line / scatter / kpi are fully edited in
 * context — per-measure pills + on-chart chrome / the KPI strip — so they have none).
 * A HOST family that supplies its own `descriptor.Customize` panel ALWAYS shows it,
 * regardless of the builtin-options flag — the two are independent, and a self-contained
 * host that sets `hasCustomizeOptions: false` would otherwise have its panel suppressed
 * (CenterTypePicker short-circuits before CustomizeSection's host dispatch runs).
 *
 * A family that supports the envelope-level PRESENTATION transform also shows the
 * section even when it has no family knobs of its own (that's `line`: fully edited in
 * context otherwise, but the "Compare" select still needs somewhere to live).
 */
export function hasCustomizeOptions(
  family: ChartSpec["chart"]["family"],
  families: FamilyRegistry,
): boolean {
  const descriptor = families.require(family);
  return (
    descriptor.hasCustomizeOptions ||
    descriptor.Customize !== undefined ||
    familySupportsTransform(descriptor)
  );
}

/** A vertical labeled field (caption above the control) for the option pickers. */
function KField({ label, children }: { label: string; children: React.ReactNode }): React.ReactElement {
  return (
    <div className="cv-customize-field">
      <span className="cv-ec-label">{label}</span>
      {children}
    </div>
  );
}
