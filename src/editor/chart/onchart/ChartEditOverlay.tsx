import * as React from "react";

import { resolveSeriesColors } from "@/adapter";
import { useCubeMeta, useDisplayUnit } from "@/hooks";
import { useFamilyRegistry } from "@/provider";
import { cn } from "@/components/ui/utils";
import type { ChartColorToken, ChartSpec } from "@/spec";

import { granularitySummary } from "../../primitives/GranularityPicker";
import {
  canonicalTimeOf,
  familyVariantsOf,
  findCube,
  findMember,
  memberSoloHint,
  type MemberOption,
} from "../../primitives/meta-helpers";
import { inferCube } from "../helpers";
import { axisKeyOf, axisLabelOf } from "../builder/axis";
import {
  getWells,
  placeField,
  readWells,
  removeField,
  type FieldKind,
  type WellDef,
} from "../builder/wells";
import { Database } from "lucide-react";

import { aggHint, aggPillLabel, isRowVariant, rowVariantHint } from "./AggSegments";
import { ChartFiltersPopover } from "./ChartFiltersPopover";
import { AxisChrome, LegendChrome } from "./ChartChrome";
import { CenterTypePicker, ChartTypePill } from "./CenterTypePicker";
import { reorderWell } from "./chip-bindings";
import type { PillSwapControls } from "./FieldPill";
import { computeJoinScope, cubeInJoinScope, reconcileQueryJoin } from "./join-scope";
import { axisUnitBlockReason, candidateReason } from "./picker-filter";
import { WellGroup } from "./WellGroup";
import {
  KpiComparison,
  KpiSectionPopover,
  KpiSparklineConfig,
  KpiValueFields,
} from "./KpiValueConfig";

export interface ChartEditOverlayProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  /** Optional controls (e.g. a Save button) shown at the left of the top bar. */
  toolbar?: React.ReactNode;
  /** The live chart preview (or empty placeholder) the slots are arranged around. */
  children: React.ReactNode;
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
  update: emitRaw,
  toolbar,
  children,
}: ChartEditOverlayProps): React.ReactElement {
  const { meta } = useCubeMeta();
  const families = useFamilyRegistry();
  // Every edit leaves through this: repair the query parts no well shows (the
  // dateRange-only time FILTER above all) so the editor can never emit a spec whose
  // cubes have no join path — Cube rejects those at render ("Can't find join path…").
  const update = React.useCallback(
    (next: ChartSpec) => emitRaw(reconcileQueryJoin(next, meta, families)),
    [emitRaw, meta, families],
  );
  const { chart } = spec;
  const family = chart.family;
  const descriptor = families.require(family);
  // QUERY-LESS families (e.g. the host `ai` summary tile) have NO wells, so `isEmpty`
  // (no field placed) is ALWAYS true for them. Without this flag the type pill — which
  // is the ONLY way to reach the family's Customize panel (prompt/schedule) — would be
  // hidden and the empty type-chooser would overlay the configured tile forever.
  const queryless = descriptor.queryless ?? false;
  // Whether this family's single value axis must stay one KIND of quantity (bar/line/
  // area) — the source of the picker's axis-unit "unavailable" reason.
  const enforcesAxisUnit = descriptor.enforcesAxisUnit;
  const cube = inferCube(spec);

  // The unit shown in the value-axis badge follows the viewer's unit system, so the
  // badge matches the converted axis on the chart (km storage → "mi" when imperial).
  const displayUnit = useDisplayUnit();

  const wells = React.useMemo(() => getWells(family, families), [family, families]);
  const placed = React.useMemo(() => readWells(spec, families), [spec, families]);
  const wellById = React.useMemo(() => new Map(wells.map((w) => [w.id, w])), [wells]);

  // Cross-table scope: which tables/views are joinable, and the single measure source.
  // There is no separate source picker any more — the FIRST field placed anchors the
  // chart (the table is implicit), and the field picker's atlas sections carry the
  // navigation the old picker provided. Clearing every field un-anchors it again.
  const scope = React.useMemo(
    () => computeJoinScope(meta, spec, undefined, families),
    [meta, spec, families],
  );
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

  /* ── value-axis unit consistency ─────────────────────────────────────────
   * The value well ("y") must keep the single value axis to ONE kind of quantity:
   * every measure plotted on it must share the first measure's unit key. */
  const valueAxesFor = React.useCallback(
    (placedMap: Record<string, string[]>) => {
      const leftM = (placedMap.y ?? [])[0];
      const opt = leftM ? findMember(meta, leftM) : undefined;
      return {
        leftKey: leftM ? axisKeyOf(opt) : undefined,
        leftLabel: leftM ? axisBadgeLabel(opt, displayUnit(opt?.unit)) : undefined,
      };
    },
    [meta, displayUnit],
  );
  const valueAxes = React.useMemo(() => valueAxesFor(placed), [valueAxesFor, placed]);

  // The three chart-context rules, parameterized by scope + axes so a SWAP can ask
  // "would this be allowed with the outgoing field removed?" using the same code.
  const blockReasonWith = React.useCallback(
    (scopeIn: typeof scope, axes: ReturnType<typeof valueAxesFor>) =>
      (wellId: string, option: MemberOption | undefined): string | undefined => {
        if (!option) return undefined;
        // 1) Cross-dataset: only fields in the chart's current join graph can be added.
        if (!cubeInJoinScope(scopeIn, option.cube)) {
          return "Clear the current fields to use a different dataset.";
        }
        // 2) Single measure source (no two-fact fan-out). Dimensions may cross freely.
        if (option.memberType === "measure" && scopeIn.measureSource && option.cube !== scopeIn.measureSource) {
          const src = scopeIn.sourceCube?.title ?? scopeIn.measureSource;
          return `This chart's numbers come from ${src}. Remove them to use another table.`;
        }
        // 3) Value-axis unit consistency on the "y" well — the families that declare
        //    `enforcesAxisUnit` keep their single value axis to ONE quantity, so a
        //    litres measure cannot join an axis already showing distance. The picker's
        //    "Only compatible fields" switch hides exactly these rows.
        if (enforcesAxisUnit && wellId === "y" && option.memberType === "measure") {
          return axisUnitBlockReason(option, axes.leftKey, axes.leftLabel);
        }
        return undefined;
      },
    [enforcesAxisUnit],
  );
  const blockReason = React.useMemo(
    () => blockReasonWith(scope, valueAxes),
    [blockReasonWith, scope, valueAxes],
  );

  // The value-well badge: the axis' unit label.
  const valueBadge = valueAxes.leftLabel;

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
    }
    return out;
  }, [family, chart.mapping, chart.colors]);

  /* ── place / cube switch via the pure seam ──────────────────────────────── */
  const place = React.useCallback(
    (wellId: string, name: string, kind: FieldKind): void => {
      const option = findMember(meta, name);
      if (blockReason(wellId, option)) return; // picker already disables these
      let next =
        kind === "geoPoint" && option?.latMember && option.lngMember
          ? placeField(
              placeField(spec, family, "lat", option.latMember, "numberDimension", families),
              family,
              "lng",
              option.lngMember,
              "numberDimension",
              families,
            )
          : placeField(spec, family, wellId, name, kind, families);
      // Auto-fill the family's time well (descriptor.canonicalTimeWell) with the cube's
      // canonical time axis (member meta `canonicalTime: true`) when it's still empty —
      // a line/area comes up as a proper time series (and a map path comes up
      // chronological) from the FIRST field drop. Plain placement; one tap removes it.
      const timeWell = descriptor.canonicalTimeWell;
      if (timeWell && wellId !== timeWell && (placed[timeWell] ?? []).length === 0) {
        const canonical = canonicalTimeOf(meta, option?.cube);
        if (canonical && canonical.name !== name && !blockReason(timeWell, canonical)) {
          next = placeField(next, family, timeWell, canonical.name, "time", families);
        }
      }
      update(next);
    },
    [blockReason, meta, update, spec, family, families, descriptor, placed],
  );

  /* ── swap-in-place ───────────────────────────────────────────────────────
   * A placed pill offers "swap" (re-open the picker, replace this field, keep its
   * position) and — for aggregate-family members — the same segment control the
   * picker shows, so changing total→avg never means delete + find + re-add. All
   * validity questions are answered against the spec WITH THE OUTGOING FIELD
   * REMOVED: swapping the only measure may cross tables, swapping the axis owner
   * may change quantity — exactly what remove-then-add would have allowed. */
  const swapFor = React.useCallback(
    (wellId: string, member: string): PillSwapControls | undefined => {
      if (queryless) return undefined;
      const wellDef = wellById.get(wellId);
      const option = findMember(meta, member);
      if (!wellDef || !option) return undefined;
      const index = (placed[wellId] ?? []).indexOf(member);
      const without = removeField(spec, family, wellId, member, families);
      const placedW = readWells(without, families);
      const scopeW = computeJoinScope(meta, without, undefined, families);
      const reasonW = blockReasonWith(scopeW, valueAxesFor(placedW));
      const inWellW = placedW[wellId] ?? [];
      const allPlacedW = Object.values(placedW).flat();
      const onSelect = (name: string, kind: FieldKind): void => {
        if (name === member) return;
        let next = placeField(without, family, wellId, name, kind, families);
        // Keep the slot: a many-well appends, so walk the newcomer back to where
        // the outgoing field sat (series/stack/legend order is meaning).
        const list = readWells(next, families)[wellId] ?? [];
        const from = list.indexOf(name);
        if (index >= 0 && from > index) next = reorderWell(next, wellDef, from, index);
        update(next);
      };
      const variants = familyVariantsOf(meta, option);
      const cubeOpt = findCube(meta, option.cube);
      const agg =
        variants.length > 1
          ? {
              options: variants.map((v, vi) => {
                const kind: FieldKind = v.memberType === "measure" ? "number" : "numberDimension";
                const reason =
                  v.name === member
                    ? undefined
                    : candidateReason(wellDef, kind, inWellW, v, (o) => reasonW(wellId, o));
                const row = isRowVariant(v);
                return {
                  label: aggPillLabel(v, findCube(meta, v.cube)),
                  selected: v.name === member,
                  disabled: reason !== undefined,
                  title: reason ?? (row ? rowVariantHint(cubeOpt) : undefined),
                  // The row-level variant is a grain switch, not another summary —
                  // the divider keeps it from reading as a sibling of total/avg.
                  divider: row && vi > 0,
                  onSelect: () => onSelect(v.name, kind),
                };
              }),
            }
          : undefined;
      // The model's context nudge (meta `soloHint`) applies only while this is the
      // sole placed member of its cube — the chart isn't otherwise about those rows.
      const soloCube = allPlaced.filter((n) => findMember(meta, n)?.cube === option.cube);
      const notice = soloCube.length === 1 ? memberSoloHint(option) : undefined;
      return {
        picker: {
          well: wellDef,
          placed: allPlacedW,
          inWell: inWellW,
          scope: scopeW,
          blockReason: (o) => reasonW(wellId, o),
          onSelect,
        },
        agg,
        hint: agg ? aggHint(variants, cubeOpt, option) : undefined,
        notice,
      };
    },
    [queryless, wellById, meta, placed, allPlaced, spec, family, families, blockReasonWith, valueAxesFor, update],
  );

  // Zones adapt to STATE: a horizontal bar swaps its value + category axes (value on the
  // bottom/horizontal axis, category on the left/vertical) so editing matches the chart.
  const zones =
    family === "bar" && chart.orientation === "horizontal"
      ? { left: ["x"], bottom: ["y", "color"] }
      : descriptor.zones;
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
      ? `${splitMeasureCount} values × ${findMember(meta, colorMember)?.label ?? "this split"} — one series per value per group.`
      : undefined;

  // In-context chrome (axis-title boxes + legend visibility). Axis titles auto-fill from
  // the mapped members; the user can type an override or hide an element on the chart. The
  // value/category title boxes are attached to their wells as controls above the fields
  // (axisTitleControl / renderAxisGroup); the legend toggle sits in line with the bottom
  // category / split wells.
  const hasLegend = descriptor.hasLegend;
  const leftYMember = (placed.y ?? [])[0];
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
  // has a field.
  const axisTitleControl = (wellId: string): React.ReactNode => {
    const box = (axisKey: "x" | "y", member: string | undefined): React.ReactNode =>
      member ? <AxisChrome spec={spec} update={update} axis={axisKey} title="Title" auto={autoLabel(member)} /> : null;
    switch (wellId) {
      case "y":
        return box("y", leftYMember); // the single value axis
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
      swapFor={(member) => swapFor(well.id, member)}
      badge={well.id === "y" ? valueBadge : undefined}
      orientation={orientation}
      note={well.id === "color" ? splitNote : undefined}
      control={axisTitleControl(well.id)}
    />
  );

  // The KPI config strip: three compact components, each opening its own options popover —
  // Value (the measure pill + a "time, range & display" popover), then the optional
  // Comparison and Sparkline. The popover entries appear once a measure is placed.
  const renderKpiConfig = (): React.ReactNode => {
    const valueWell = wellById.get("value");
    const hasValue = (placed.value ?? []).length > 0;
    const kfo = (chart.familyOptions ?? {}) as Record<string, unknown>;
    return (
      <>
        <div className="cv-edit-kpi-value">
          {valueWell ? renderGroup(valueWell, "vertical") : null}
          {hasValue ? (
            <KpiSectionPopover
              label="Time, range & display"
              summary={kfo.display === "gauge" ? "Gauge" : "Number"}
            >
              <KpiValueFields spec={spec} update={update} />
            </KpiSectionPopover>
          ) : null}
        </div>
        {hasValue ? (
          <>
            <KpiSectionPopover
              label="Comparison"
              summary={
                kfo.comparison === undefined
                  ? "None"
                  : (kfo.comparison as { mode?: string }).mode === "value"
                    ? "Fixed value"
                    : "Prev period"
              }
            >
              <KpiComparison spec={spec} update={update} />
            </KpiSectionPopover>
            <KpiSectionPopover
              label="Trend"
              summary={granularitySummary(
                (kfo.sparkline as { granularity?: unknown } | undefined)?.granularity,
              )}
            >
              <KpiSparklineConfig spec={spec} update={update} />
            </KpiSectionPopover>
          </>
        ) : null}
      </>
    );
  };

  return (
    <div data-slot="chart-edit-overlay" className="cv-edit-overlay">
      <div className="cv-edit-overlay-topbar">
        <div className="cv-edit-overlay-toolbar">{toolbar}</div>
        {/* Chart-type picker lives here (top centre) rather than over the chart — an
            on-chart pill was unclickable behind the live preview. Built charts only;
            an empty chart shows the centred chooser overlay instead. */}
        {!isEmpty || queryless ? <ChartTypePill spec={spec} update={update} /> : null}
        <div className="cv-edit-overlay-actions">
          {/* The anchor chip: which table this chart reads (set implicitly by the
              first field placed), at what grain. Read-only — the way to change it is
              to clear the fields, which is what the old source picker did anyway. */}
          {allPlaced.length > 0 && scope.sourceCube ? (
            <span
              className="cv-edit-anchor"
              title={scope.sourceCube.grain ?? scope.sourceCube.title}
            >
              <Database className="cv-ec-icon--sm cv-ec-icon--muted" />
              <span className="cv-ec-truncate">{scope.sourceCube.title}</span>
              {scope.sourceCube.grain ? (
                <span className="cv-edit-anchor-grain">{scope.sourceCube.grain}</span>
              ) : null}
            </span>
          ) : null}
          <ChartFiltersPopover spec={spec} update={update} cube={cube} scopeCubes={scopeCubes} scope={scope} />
        </div>
      </div>

      <div className="cv-edit-overlay-body">
        {leftWells.length > 0 ? (
          <div className={cn("cv-edit-sidebar", descriptor.sidebarWidthClass)}>
            {/* A KPI is three inline components — Value (measure + time/range/display),
                Comparison, and Sparkline — each its own bordered block with its own config. */}
            {family === "kpi"
              ? renderKpiConfig()
              : /* Each value well carries its axis-title box as a control above its fields (see
                   axisTitleControl), so the title sits with the measures it names. */
                leftWells.map((w) => renderGroup(w, "vertical"))}
          </div>
        ) : null}

        <div className="cv-edit-overlay-main">
          <div className="cv-edit-overlay-canvas">
            {children}
            {/* A query-less family is never "empty" for chooser purposes — it configures
                via its Customize panel (reached from the type pill), not by placing fields. */}
            <CenterTypePicker spec={spec} update={update} empty={isEmpty && !queryless} />
          </div>

          {/* The category / split wells (each carrying its own axis-title box above its field),
              with the legend show/hide sitting in line with them. */}
          {bottomWells.length > 0 ? (
            <div className="cv-edit-overlay-bottom">
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
 *  `unitOverride` is the viewer-converted unit; falls back to the member's storage unit.
 *  Durations get NO unit parens: they render humanized ("2d 19h"), so "Time (h)" would
 *  advertise a storage detail the chart never shows. */
function axisBadgeLabel(option: MemberOption | undefined, unitOverride?: string): string {
  const base = axisLabelOf(option);
  if (option?.quantity === "time") return base;
  const unit = unitOverride ?? option?.unit;
  return unit && unit !== base ? `${base} (${unit})` : base;
}
