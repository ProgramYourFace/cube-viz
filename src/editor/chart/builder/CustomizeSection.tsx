import * as React from "react";

import { DEFAULTS } from "@/charts";
import type {
  AxisOptions,
  ChartOptions,
  ChartSpec,
  DateRange,
  FormatKind,
  FormatOptions,
  Granularity,
  OrderSpec,
  TimeDimension,
  VarRef,
} from "@/spec";
import { useCubeMeta } from "@/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FieldRow } from "../../primitives/FieldRow";
import { GranularityPicker } from "../../primitives/GranularityPicker";
import { MemberPicker } from "../../primitives/MemberPicker";
import { SegmentedControl } from "../../primitives/SegmentedControl";
import { SwitchRow } from "../../primitives/SwitchRow";
import { findMember } from "../../primitives/meta-helpers";
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
                className="h-8"
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
        const display = (fo.display as "number" | "gauge" | undefined) ?? "number";
        const gauge = fo.gauge as { min?: number; max?: number } | undefined;

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

            <FieldRow label="Display">
              <SegmentedControl<"number" | "gauge">
                aria-label="Display"
                size="sm"
                options={[
                  { value: "number", label: "Number" },
                  { value: "gauge", label: "Gauge" },
                ]}
                value={display}
                onChange={(v) => setFamilyOptions({ display: v })}
              />
            </FieldRow>
            {display === "gauge" ? (
              <KField label="Gauge max">
                <Input
                  type="number"
                  className="h-8"
                  value={gauge?.max ?? ""}
                  placeholder="Auto"
                  onChange={(e) => {
                    const n = parseFloat(e.target.value);
                    setFamilyOptions({ gauge: Number.isFinite(n) ? { ...(gauge ?? {}), max: n } : undefined });
                  }}
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
              label="Compare"
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
              <>
                <FieldRow label="Compare to">
                  <SegmentedControl<"previousPeriod" | "value">
                    aria-label="Compare to"
                    size="sm"
                    options={[
                      { value: "previousPeriod", label: "Prev period" },
                      { value: "value", label: "Fixed value" },
                    ]}
                    value={(comparison?.mode as "previousPeriod" | "value") ?? "previousPeriod"}
                    onChange={(m) => setFamilyOptions({ comparison: { ...comparison, mode: m } })}
                  />
                </FieldRow>
                {comparison?.mode === "value" ? (
                  <KField label="Baseline value">
                    <Input
                      type="number"
                      className="h-8"
                      value={(comparison?.value as number | undefined) ?? ""}
                      onChange={(e) => {
                        const n = parseFloat(e.target.value);
                        setFamilyOptions({
                          comparison: { ...comparison, value: Number.isFinite(n) ? n : undefined },
                        });
                      }}
                    />
                  </KField>
                ) : null}
                <SwitchRow
                  label="Show as %"
                  checked={(comparison?.showAsPercent ?? true) !== false}
                  onChange={(on) => setFamilyOptions({ comparison: { ...comparison, showAsPercent: on } })}
                />
              </>
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
      <AxisControls spec={spec} update={update} />
      <FormatControls spec={spec} update={update} />
      <DataControls spec={spec} update={update} />
    </div>
  );
}

/** A vertical labeled field (caption above the control) for the option pickers. */
function KField({ label, children }: { label: string; children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex flex-col gap-1 py-1">
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

/* ───────────────────────── shared cross-family controls ──────────────────── */

const CARTESIAN = new Set<ChartOptions["family"]>(["bar", "line", "area", "combo"]);

/** The first sort key as `{member, dir}`, from either OrderSpec shape (record | tuples). */
function firstOrder(order: OrderSpec | undefined): { member: string; dir: "asc" | "desc" } | undefined {
  if (!order) return undefined;
  if (Array.isArray(order)) {
    const e = order[0];
    return e ? { member: e[0], dir: e[1] } : undefined;
  }
  const k = Object.keys(order)[0];
  return k ? { member: k, dir: order[k] } : undefined;
}

/** Sort (order) + row limit — query-level controls that shape WHICH rows are plotted. */
function DataControls({ spec, update }: CustomizeSectionProps): React.ReactElement | null {
  const { meta } = useCubeMeta();
  const { chart, query } = spec;
  if (chart.family === "kpi" || chart.family === "scatter") return null;

  const members = [
    ...(query.measures ?? []),
    ...(query.dimensions ?? []),
    ...(query.timeDimensions?.map((t) => t.dimension) ?? []),
  ];
  if (members.length === 0) return null;

  const sort = firstOrder(query.order);
  const setOrder = (member: string | undefined, dir: "asc" | "desc"): void =>
    update({ ...spec, query: { ...query, order: member ? [[member, dir]] : undefined } });
  const limit = typeof query.limit === "number" ? query.limit : undefined;
  const setLimit = (n: number | undefined): void =>
    update({ ...spec, query: { ...query, limit: n } });

  return (
    <>
      <KField label="Sort by">
        <div className="flex gap-1">
          <Select
            value={sort?.member ?? "__none"}
            onValueChange={(v) => setOrder(v === "__none" ? undefined : v, sort?.dir ?? "desc")}
          >
            <SelectTrigger className="h-8 flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none">Default order</SelectItem>
              {members.map((m) => (
                <SelectItem key={m} value={m}>
                  {findMember(meta, m)?.label ?? m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {sort?.member ? (
            <SegmentedControl<"asc" | "desc">
              aria-label="Sort direction"
              size="sm"
              options={[
                { value: "asc", label: "Asc" },
                { value: "desc", label: "Desc" },
              ]}
              value={sort.dir}
              onChange={(d) => setOrder(sort.member, d)}
            />
          ) : null}
        </div>
      </KField>
      <KField label="Row limit">
        <Input
          type="number"
          min={1}
          className="h-8"
          value={limit ?? ""}
          placeholder="Auto"
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            setLimit(Number.isFinite(n) && n > 0 ? n : undefined);
          }}
        />
      </KField>
    </>
  );
}

/** Value-axis controls (scale / hide / label) for the cartesian families. */
function AxisControls({ spec, update }: CustomizeSectionProps): React.ReactElement | null {
  const { chart } = spec;
  if (!CARTESIAN.has(chart.family)) return null;
  const y = chart.axes?.y ?? {};
  const setY = (patch: Partial<AxisOptions>): void =>
    update({ ...spec, chart: { ...chart, axes: { ...chart.axes, y: { ...y, ...patch } } } });

  return (
    <>
      <FieldRow label="Y scale">
        <SegmentedControl<"linear" | "log">
          aria-label="Y scale"
          size="sm"
          options={[
            { value: "linear", label: "Linear" },
            { value: "log", label: "Log" },
          ]}
          value={y.scale ?? "linear"}
          onChange={(v) => setY({ scale: v })}
        />
      </FieldRow>
      <SwitchRow label="Hide Y axis" checked={y.hide === true} onChange={(on) => setY({ hide: on })} />
      <KField label="Y axis label">
        <Input
          className="h-8"
          value={y.label ?? ""}
          placeholder="Auto"
          onChange={(e) => setY({ label: e.target.value || undefined })}
        />
      </KField>
    </>
  );
}

/** Number-format controls (kind / abbreviate / decimals) for value-bearing families. */
function FormatControls({ spec, update }: CustomizeSectionProps): React.ReactElement | null {
  const { chart } = spec;
  if (chart.family === "table" || chart.family === "scatter") return null;
  const f = chart.format ?? {};
  const setF = (patch: Partial<FormatOptions>): void =>
    update({ ...spec, chart: { ...chart, format: { ...f, ...patch } } });

  return (
    <>
      <FieldRow label="Number format">
        <SegmentedControl<FormatKind>
          aria-label="Number format"
          size="sm"
          options={[
            { value: "auto", label: "Auto" },
            { value: "number", label: "123" },
            { value: "currency", label: "$" },
            { value: "percent", label: "%" },
          ]}
          value={f.kind ?? "auto"}
          onChange={(v) => setF({ kind: v })}
        />
      </FieldRow>
      <SwitchRow
        label="Abbreviate (1.2k)"
        checked={f.abbreviate === true}
        onChange={(on) => setF({ abbreviate: on })}
      />
      <KField label="Decimals">
        <Input
          type="number"
          min={0}
          max={6}
          className="h-8"
          value={f.decimals ?? ""}
          placeholder="Auto"
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            setF({ decimals: Number.isFinite(n) && n >= 0 ? n : undefined });
          }}
        />
      </KField>
    </>
  );
}
