import * as React from "react";

import { resolveSeriesColors } from "@/adapter";
import { useCubeMeta } from "@/hooks";
import { useCubeVizContext } from "@/provider";
import { mergeUnitConversions } from "@/units";
import type { ChartColorToken, ChartFamily, ChartSpec } from "@/spec";

import { findMember, type MemberOption } from "../../primitives/meta-helpers";
import { inferCube } from "../helpers";
import { axisKeyOf, axisLabelOf } from "../builder/axis";
import { getWells, placeField, readWells, type FieldKind, type WellDef } from "../builder/wells";
import { ChartFiltersPopover } from "./ChartFiltersPopover";
import { ChartSourcePopover } from "./ChartSourcePopover";
import { AxisChrome, LegendChrome } from "./ChartChrome";
import { CenterTypePicker } from "./CenterTypePicker";
import { withSeriesAxis } from "./chip-bindings";
import { computeJoinScope } from "./join-scope";
import { WellGroup } from "./WellGroup";

export interface ChartEditOverlayProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  /** Optional controls (e.g. a Save button) shown at the left of the top bar. */
  toolbar?: React.ReactNode;
  /** The live chart preview (or empty placeholder) the slots are arranged around. */
  children: React.ReactNode;
}

/** Which wells anchor to the LEFT (value axis) vs the BOTTOM (category + splits). */
const ZONES: Record<ChartFamily, { left: string[]; bottom: string[] }> = {
  bar: { left: ["y"], bottom: ["x", "color"] },
  line: { left: ["y"], bottom: ["x", "color"] },
  area: { left: ["y"], bottom: ["x", "color"] },
  combo: { left: ["y"], bottom: ["x"] },
  pie: { left: ["size"], bottom: ["slices"] },
  scatter: { left: ["sy"], bottom: ["sx", "size", "color"] },
  kpi: { left: ["value"], bottom: [] },
  table: { left: ["columns"], bottom: [] },
};

/** Value-axis families with TWO renderer-supported value axes (left + right). */
const DUAL_AXIS = new Set<ChartFamily>(["line", "combo"]);

/**
 * The panel-less, on-chart chart editor (replaces ChartBuilderPanel). The preview IS
 * the editing surface: a left Y-axis strip of selectable field slots, a bottom X-axis
 * (single) slot + any splits, a centre chart-type widget, and a top-right ⋯ chrome
 * menu — every edit funnelling through the unchanged `wells.ts` seam + `update`. The
 * left strip's per-field colour swatches use the SAME {@link resolveSeriesColors}
 * resolver as the renderer, so the editor never disagrees with the chart.
 */
export function ChartEditOverlay({
  spec,
  update,
  toolbar,
  children,
}: ChartEditOverlayProps): React.ReactElement {
  const { meta } = useCubeMeta();
  const { locale } = useCubeVizContext();
  const { chart } = spec;
  const family = chart.family;
  const cube = inferCube(spec);

  // The unit shown in the value-axis badge follows the viewer's unit system, so the
  // badge matches the converted axis on the chart (km storage → "mi" when imperial).
  const conversions = React.useMemo(() => mergeUnitConversions(locale?.units), [locale?.units]);
  const displayUnit = React.useCallback(
    (unit?: string): string | undefined =>
      unit && locale?.unitSystem === "imperial" && conversions[unit]
        ? conversions[unit].imperialUnit
        : unit,
    [locale?.unitSystem, conversions],
  );

  const wells = React.useMemo(() => getWells(family), [family]);
  const placed = React.useMemo(() => readWells(spec), [spec]);
  const wellById = React.useMemo(() => new Map(wells.map((w) => [w.id, w])), [wells]);

  // The source the user picked via the Source chip — scopes an empty chart until a
  // field is placed (once fields exist, the spec's own source wins).
  const [sourceOverride, setSourceOverride] = React.useState<string | undefined>(undefined);
  // Cross-table scope: which tables/views are joinable, and the single measure source.
  const scope = React.useMemo(() => computeJoinScope(meta, spec, sourceOverride), [meta, spec, sourceOverride]);
  const allPlaced = React.useMemo(() => Object.values(placed).flat(), [placed]);

  // Re-point the whole chart to a new table/view (clears the now-incompatible fields).
  const onSelectSource = React.useCallback(
    (name: string): void => {
      setSourceOverride(name);
      update({ ...spec, query: {}, chart: { ...spec.chart, mapping: undefined, familyOptions: undefined } });
    },
    [spec, update],
  );
  // The joinable tables a filter may target (the same graph the field picker offers).
  const scopeCubes = React.useMemo<string[]>(
    () =>
      scope.viewLocked
        ? [scope.viewLocked]
        : ([scope.sourceCube?.name, ...scope.relatedCubes.map((c) => c.name)].filter(
            Boolean,
          ) as string[]),
    [scope],
  );

  const isEmpty = React.useMemo(
    () => Object.values(placed).every((arr) => arr.length === 0),
    [placed],
  );

  /* ── value-axis unit consistency ─────────────────────────────────────────
   * The value well ("y") must keep each axis to ONE kind of quantity. bar/area have a
   * single value axis (one unit). line/combo have TWO (left/right), each its own unit —
   * so a measure with a new unit auto-lands on the free axis, and only a THIRD unit is
   * rejected. The member's axis lives in SeriesMeta.axis (cartesian) / series.axis (combo). */
  const dualAxis = DUAL_AXIS.has(family);

  const axisOfMember = React.useCallback(
    (m: string): "left" | "right" => {
      if (family === "combo") {
        const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
        const s = (Array.isArray(fo.series) ? fo.series : []).find(
          (x) => (x as { member?: string }).member === m,
        ) as { axis?: string } | undefined;
        return s?.axis === "right" ? "right" : "left";
      }
      const s = chart.mapping?.series;
      // Per-member axis lives in the mapping meta for BOTH measures and pivot (color) mode.
      const ax = s && (s.mode === "measures" || s.mode === "pivot") ? s.meta?.[m]?.axis : undefined;
      return ax === "right" ? "right" : "left";
    },
    [family, chart.familyOptions, chart.mapping],
  );

  const valueAxes = React.useMemo(() => {
    const yMembers = placed.y ?? [];
    const first = (side: "left" | "right") => yMembers.find((m) => axisOfMember(m) === side);
    const leftM = first("left");
    const rightM = dualAxis ? first("right") : undefined;
    const opt = (m?: string) => (m ? findMember(meta, m) : undefined);
    return {
      leftKey: leftM ? axisKeyOf(opt(leftM)) : undefined,
      rightKey: rightM ? axisKeyOf(opt(rightM)) : undefined,
      leftLabel: leftM ? axisBadgeLabel(opt(leftM), displayUnit(opt(leftM)?.unit)) : undefined,
      rightLabel: rightM ? axisBadgeLabel(opt(rightM), displayUnit(opt(rightM)?.unit)) : undefined,
    };
  }, [placed, dualAxis, axisOfMember, meta, displayUnit]);

  /** The value axis a freshly-added measure should land on (by its unit). */
  const targetAxis = React.useCallback(
    (option: MemberOption | undefined): "left" | "right" => {
      const k = axisKeyOf(option);
      const { leftKey, rightKey } = valueAxes;
      if (leftKey === undefined || k === leftKey) return "left";
      if (rightKey === undefined || k === rightKey) return "right";
      return "left";
    },
    [valueAxes],
  );

  const blockReason = React.useCallback(
    (wellId: string, option: MemberOption | undefined): string | undefined => {
      if (!option) return undefined;
      // 1) Cross-dataset: only fields in the chart's current join graph can be added.
      if (scope.scopeComponent !== undefined && option.connectedComponent !== scope.scopeComponent) {
        return "Clear the current fields to use a different dataset.";
      }
      // 2) Single measure source (no two-fact fan-out). Dimensions may cross freely.
      if (option.memberType === "measure" && scope.measureSource && option.cube !== scope.measureSource) {
        const src = scope.sourceCube?.title ?? scope.measureSource;
        return `Measures come from one table (${src}). Remove them to switch.`;
      }
      // 3) Value-axis unit consistency on the "y" well.
      if (wellId === "y" && option.memberType === "measure") {
        const { leftKey, rightKey, leftLabel, rightLabel } = valueAxes;
        const k = axisKeyOf(option);
        if (!dualAxis) {
          if (leftKey !== undefined && k !== leftKey) {
            return `This axis shows ${leftLabel}; ${option.label ?? "this field"} is ${axisLabelOf(option)}`;
          }
        } else if (leftKey !== undefined && rightKey !== undefined && k !== leftKey && k !== rightKey) {
          return `Both axes show ${leftLabel} & ${rightLabel} — remove one to add a third unit.`;
        }
      }
      return undefined;
    },
    [scope, valueAxes, dualAxis],
  );

  // The value-well badge: one unit (single axis) or "Left · Right" (dual axis).
  const valueBadge = dualAxis
    ? [valueAxes.leftLabel, valueAxes.rightLabel].filter(Boolean).join(" · ") || undefined
    : valueAxes.leftLabel;

  /* ── resolved series colours (single source of truth, shared with renderer) ─ */
  const seriesColors = React.useMemo<Record<string, ChartColorToken>>(() => {
    const out: Record<string, ChartColorToken> = {};
    if (family === "bar" || family === "line" || family === "area") {
      const s = chart.mapping?.series;
      if (s && s.mode === "measures") {
        const list = s.members.map((m) => ({ key: m, colorToken: s.meta?.[m]?.colorToken }));
        const resolved = resolveSeriesColors(list, chart.colors);
        s.members.forEach((m, i) => {
          out[m] = resolved[i];
        });
      }
    } else if (family === "combo") {
      const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
      const series = (Array.isArray(fo.series) ? fo.series : []) as {
        member: string;
        colorToken?: ChartColorToken;
      }[];
      const list = series.map((s) => ({ key: s.member, colorToken: s.colorToken }));
      const resolved = resolveSeriesColors(list, chart.colors);
      series.forEach((s, i) => {
        out[s.member] = resolved[i];
      });
    }
    return out;
  }, [family, chart.mapping, chart.colors, chart.familyOptions]);

  /* ── place / cube switch via the pure seam ──────────────────────────────── */
  const place = React.useCallback(
    (wellId: string, name: string, kind: FieldKind): void => {
      const option = findMember(meta, name);
      if (blockReason(wellId, option)) return; // picker already disables these
      let next = placeField(spec, family, wellId, name, kind);
      // On a dual-axis family, auto-assign the new measure to the axis matching its unit.
      if (dualAxis && wellId === "y") next = withSeriesAxis(next, family, name, targetAxis(option));
      update(next);
    },
    [blockReason, meta, update, spec, family, dualAxis, targetAxis],
  );

  /* ── dual-axis: explicit Left/Right value wells, each its own unit ───────── */
  const blockReasonForAxis = React.useCallback(
    (side: "left" | "right", option: MemberOption | undefined): string | undefined => {
      if (!option) return undefined;
      if (scope.scopeComponent !== undefined && option.connectedComponent !== scope.scopeComponent) {
        return "Clear the current fields to use a different dataset.";
      }
      if (option.memberType === "measure" && scope.measureSource && option.cube !== scope.measureSource) {
        return `Measures come from one table (${scope.sourceCube?.title ?? scope.measureSource}). Remove them to switch.`;
      }
      const key = side === "left" ? valueAxes.leftKey : valueAxes.rightKey;
      const label = side === "left" ? valueAxes.leftLabel : valueAxes.rightLabel;
      if (key !== undefined && axisKeyOf(option) !== key) {
        return `This axis shows ${label}; ${option.label ?? "this field"} is ${axisLabelOf(option)}`;
      }
      return undefined;
    },
    [scope, valueAxes],
  );

  // Place a measure on a SPECIFIC value axis (the explicit Left/Right well's add slot).
  const placeOnAxis = React.useCallback(
    (side: "left" | "right", name: string, kind: FieldKind): void => {
      const option = findMember(meta, name);
      if (blockReasonForAxis(side, option)) return;
      update(withSeriesAxis(placeField(spec, family, "y", name, kind), family, name, side));
    },
    [blockReasonForAxis, meta, update, spec, family],
  );

  // Zones adapt to STATE: a horizontal bar swaps its value + category axes (value on the
  // bottom/horizontal axis, category on the left/vertical) so editing matches the chart.
  const zones =
    family === "bar" && chart.orientation === "horizontal"
      ? { left: ["x"], bottom: ["y", "color"] }
      : ZONES[family];
  const leftWells = zones.left.map((id) => wellById.get(id)).filter(Boolean) as WellDef[];
  const bottomWells = zones.bottom.map((id) => wellById.get(id)).filter(Boolean) as WellDef[];
  // A color split puts the cartesian chart in pivot mode. MULTIPLE measures may now
  // coexist with a split: each measure is split into one series per category value
  // (series = measure × value). The Y well stays multi; the color well shows a
  // series-count note so the resulting fan-out is never a surprise.
  const colorMember = placed.color?.[0];
  const splitMeasureCount = placed.y?.length ?? 0;
  const splitNote =
    colorMember && splitMeasureCount > 1
      ? `${splitMeasureCount} measures × ${findMember(meta, colorMember)?.label ?? "this split"} — one series per measure per value.`
      : undefined;

  // In-context chrome (axis-title boxes + legend visibility). Axis titles auto-fill from
  // the mapped members; the user can type an override or hide an element on the chart. The
  // value/category title boxes are attached to their wells as controls above the fields
  // (axisTitleControl / renderAxisGroup); the legend toggle sits in line with the bottom
  // category / split wells.
  const hasLegend = family !== "kpi" && family !== "table";
  const yMembers = placed.y ?? [];
  const leftYMember = yMembers.find((m) => axisOfMember(m) !== "right");
  const rightYMember = dualAxis ? yMembers.find((m) => axisOfMember(m) === "right") : undefined;
  const autoLabel = (m: string | undefined): string | undefined => {
    if (!m) return undefined;
    // Prefer the series' display label (the chart's rendered auto-label) so the editor
    // placeholder matches what shows on the axis; fall back to the member's meta label.
    const s = chart.mapping?.series;
    const seriesLabel = s && s.mode === "measures" ? s.meta?.[m]?.label : undefined;
    return seriesLabel ?? findMember(meta, m)?.label;
  };

  // The in-context axis-title control that sits directly ABOVE a well's fields. It is
  // attached by WELL ID so it follows the well across zones (a horizontal bar swaps the
  // value + category axes): the value well carries the value-axis title (axes.y), the
  // category / X well carries the category title (axes.x). It appears only once the axis
  // has a field. Dual value axes (line / combo) are handled per side in renderAxisGroup.
  const axisTitleControl = (wellId: string): React.ReactNode => {
    const box = (axisKey: "x" | "y", member: string | undefined): React.ReactNode =>
      member ? <AxisChrome spec={spec} update={update} axis={axisKey} title="Title" auto={autoLabel(member)} /> : null;
    switch (wellId) {
      case "y":
        return box("y", leftYMember); // single value axis (bar / area)
      case "x":
        return box("x", chart.mapping?.category?.member);
      case "sy":
        return box("y", placed.sy?.[0]); // scatter Y axis
      case "sx":
        return box("x", placed.sx?.[0]); // scatter X axis
      default:
        return null;
    }
  };

  const renderGroup = (well: WellDef, orientation: "vertical" | "horizontal"): React.ReactElement => (
    <WellGroup
      key={well.id}
      spec={spec}
      update={update}
      well={well}
      placed={placed[well.id] ?? []}
      allPlaced={allPlaced}
      optionFor={(m) => findMember(meta, m)}
      colorFor={(m) => seriesColors[m]}
      scope={scope}
      blockReason={(opt) => blockReason(well.id, opt)}
      onAdd={(name, kind) => place(well.id, name, kind)}
      badge={well.id === "y" ? valueBadge : undefined}
      orientation={orientation}
      note={well.id === "color" ? splitNote : undefined}
      control={axisTitleControl(well.id)}
    />
  );

  // Dual-axis families show the value well as two explicit axis sections (Left / Right),
  // each a filtered subset that forces its axis on add and enforces its own unit.
  const yWell = wellById.get("y");
  const renderAxisGroup = (side: "left" | "right"): React.ReactElement | null => {
    if (!yWell) return null;
    const member = side === "left" ? leftYMember : rightYMember;
    return (
      <WellGroup
        key={`y-${side}`}
        spec={spec}
        update={update}
        well={yWell}
        label={side === "left" ? "Left axis" : "Right axis"}
        placed={(placed.y ?? []).filter((m) => axisOfMember(m) === side)}
        allPlaced={allPlaced}
        optionFor={(m) => findMember(meta, m)}
        colorFor={(m) => seriesColors[m]}
        scope={scope}
        blockReason={(opt) => blockReasonForAxis(side, opt)}
        onAdd={(name, kind) => placeOnAxis(side, name, kind)}
        badge={side === "left" ? valueAxes.leftLabel : valueAxes.rightLabel}
        orientation="vertical"
        disableReorder
        control={
          member ? (
            <AxisChrome
              spec={spec}
              update={update}
              axis={side === "left" ? "y" : "y2"}
              title="Title"
              auto={autoLabel(member)}
            />
          ) : null
        }
      />
    );
  };

  return (
    <div data-slot="chart-edit-overlay" className="flex h-full w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">{toolbar}</div>
        <div className="flex items-center gap-1.5">
          <ChartSourcePopover
            currentName={scope.viewLocked ?? scope.sourceCube?.name}
            hasFields={allPlaced.length > 0}
            onSelect={onSelectSource}
          />
          <ChartFiltersPopover spec={spec} update={update} cube={cube} scopeCubes={scopeCubes} scope={scope} />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-2">
        {leftWells.length > 0 ? (
          <div className="flex w-40 shrink-0 flex-col gap-3 overflow-y-auto pr-1">
            {/* Each value well carries its axis-title box as a control above its fields (see
                axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */}
            {leftWells.flatMap((w) =>
              dualAxis && w.id === "y"
                ? [renderAxisGroup("left"), renderAxisGroup("right")]
                : [renderGroup(w, "vertical")],
            )}
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="relative min-h-0 flex-1">
            {children}
            <CenterTypePicker spec={spec} update={update} empty={isEmpty} />
          </div>

          {/* The category / split wells (each carrying its own axis-title box above its field),
              with the legend show/hide sitting in line with them. */}
          {bottomWells.length > 0 ? (
            <div className="flex flex-wrap items-start gap-x-5 gap-y-2 pl-1">
              {bottomWells.map((w) => renderGroup(w, "horizontal"))}
              {hasLegend && !isEmpty ? <LegendChrome spec={spec} update={update} /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** The axis-well badge: quantity label plus the DISPLAY unit in parens ("Distance (mi)").
 *  `unitOverride` is the viewer-converted unit; falls back to the member's storage unit. */
function axisBadgeLabel(option: MemberOption | undefined, unitOverride?: string): string {
  const base = axisLabelOf(option);
  const unit = unitOverride ?? option?.unit;
  return unit && unit !== base ? `${base} (${unit})` : base;
}
