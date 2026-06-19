import * as React from "react";

import { resolveSeriesColors } from "@/adapter";
import { useCubeMeta } from "@/hooks";
import type { ChartColorToken, ChartFamily, ChartSpec } from "@/spec";

import { findMember, type MemberOption } from "../../primitives/meta-helpers";
import { inferCube } from "../helpers";
import { axisKeyOf, axisLabelOf, compatibleWithAxis, wellEnforcesAxis } from "../builder/axis";
import { getWells, placeField, readWells, type FieldKind, type WellDef } from "../builder/wells";
import { ChartChromePopover } from "./ChartChromePopover";
import { CenterTypePicker } from "./CenterTypePicker";
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

interface AxisConstraint {
  requiredKey: string | undefined;
  label: string | undefined;
}

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
  const { chart } = spec;
  const family = chart.family;
  const cube = inferCube(spec);

  const wells = React.useMemo(() => getWells(family), [family]);
  const placed = React.useMemo(() => readWells(spec), [spec]);
  const wellById = React.useMemo(() => new Map(wells.map((w) => [w.id, w])), [wells]);

  // Cross-table scope: which tables/views are joinable, and the single measure source.
  const scope = React.useMemo(() => computeJoinScope(meta, spec), [meta, spec]);
  const allPlaced = React.useMemo(() => Object.values(placed).flat(), [placed]);
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

  /* ── per-axis unit consistency (bar/line/area Y; combo exempt) ───────────── */
  const axisConstraints = React.useMemo<Record<string, AxisConstraint>>(() => {
    const out: Record<string, AxisConstraint> = {};
    for (const w of wells) {
      if (!wellEnforcesAxis(family, w.id)) continue;
      const first = placed[w.id]?.[0];
      const option = first ? findMember(meta, first) : undefined;
      out[w.id] = first
        ? { requiredKey: axisKeyOf(option), label: axisBadgeLabel(option) }
        : { requiredKey: undefined, label: undefined };
    }
    return out;
  }, [wells, family, placed, meta]);

  const blockReason = React.useCallback(
    (wellId: string, option: MemberOption | undefined): string | undefined => {
      if (!option) return undefined;
      // 1) Cross-dataset: only fields in the chart's current join graph can be added
      //    (mixing two datasets / a view with raw tables can't be joined).
      if (scope.scopeComponent !== undefined && option.connectedComponent !== scope.scopeComponent) {
        return "Clear the current fields to use a different dataset.";
      }
      // 2) Single measure source: measures must all come from one table, else Cube
      //    can't join two fact tables (the fan-out trap). Dimensions may cross freely.
      if (option.memberType === "measure" && scope.measureSource && option.cube !== scope.measureSource) {
        const src = scope.sourceCube?.title ?? scope.measureSource;
        return `Measures come from one table (${src}). Remove them to switch.`;
      }
      // 3) Per-axis unit consistency (bar/line/area Y).
      const c = axisConstraints[wellId];
      if (c && c.requiredKey !== undefined && !compatibleWithAxis(option, c.requiredKey)) {
        return `Axis shows ${c.label}; ${option.label ?? "this field"} is ${axisLabelOf(option)}`;
      }
      return undefined;
    },
    [axisConstraints, scope],
  );

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
      if (blockReason(wellId, findMember(meta, name))) return; // picker already disables these
      update(placeField(spec, family, wellId, name, kind));
    },
    [blockReason, meta, update, spec, family],
  );

  const zones = ZONES[family];
  const leftWells = zones.left.map((id) => wellById.get(id)).filter(Boolean) as WellDef[];
  const bottomWells = zones.bottom.map((id) => wellById.get(id)).filter(Boolean) as WellDef[];
  // A color split puts the cartesian chart in pivot mode: the Y axis is then a SINGLE
  // measure split into a series per category value (multiple measures + a split can't
  // share one axis), so the Y well is locked to one field while the split is active.
  const pivotMode = chart.mapping?.series?.mode === "pivot";

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
      badge={axisConstraints[well.id]?.label}
      orientation={orientation}
      lockedSingle={pivotMode && well.id === "y"}
    />
  );

  return (
    <div data-slot="chart-edit-overlay" className="flex h-full w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">{toolbar}</div>
        <ChartChromePopover spec={spec} update={update} cube={cube} scopeCubes={scopeCubes} />
      </div>

      <div className="flex min-h-0 flex-1 gap-2">
        {leftWells.length > 0 ? (
          <div className="flex w-40 shrink-0 flex-col gap-3 overflow-y-auto pr-1">
            {leftWells.map((w) => renderGroup(w, "vertical"))}
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="relative min-h-0 flex-1">
            {children}
            <CenterTypePicker spec={spec} update={update} empty={isEmpty} />
          </div>

          {bottomWells.length > 0 ? (
            <div className="flex flex-wrap items-start gap-x-5 gap-y-2 pl-1">
              {bottomWells.map((w) => renderGroup(w, "horizontal"))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** The axis-well badge: quantity label plus unit in parens ("Distance (km)"). */
function axisBadgeLabel(option: MemberOption | undefined): string {
  const base = axisLabelOf(option);
  return option?.unit && option.unit !== base ? `${base} (${option.unit})` : base;
}
