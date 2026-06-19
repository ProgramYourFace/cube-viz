import * as React from "react";

import { useCubeMeta } from "@/hooks";
import type {
  ChartColorToken,
  ChartSpec,
  CubeQuery,
  Granularity,
  SeriesMeta,
} from "@/spec";

import { findMember, type MemberOption } from "../../primitives/meta-helpers";
import { Section } from "../../primitives/Section";
import { FilterBuilder } from "../FilterBuilder";
import {
  buildSeries,
  categoryOf,
  inferCube,
  seriesMetaOf,
  timeDimensionOf,
} from "../helpers";
import {
  axisKeyOf,
  axisLabelOf,
  compatibleWithAxis,
  wellEnforcesAxis,
} from "./axis";
import { Chip, type ComboRender } from "./Chip";
import { CustomizeSection } from "./CustomizeSection";
import { FieldPalette } from "./FieldPalette";
import { TypePicker } from "./TypePicker";
import { useFieldDrag, type DragPayload } from "./useFieldDrag";
import { Well } from "./Well";
import {
  getWells,
  placeField,
  readWells,
  removeField,
  type FieldKind,
  type WellDef,
} from "./wells";

export interface ChartBuilderPanelProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
}

/** A combo series entry (`familyOptions.series[i]`). */
interface ComboSeriesEntry {
  member: string;
  render: ComboRender;
  label?: string;
  colorToken?: ChartColorToken;
}

/** A table column entry (`familyOptions.columns[i]`). */
interface TableColumnEntry {
  member: string;
  label?: string;
}

/** The unit-consistency constraint for one enforcing value well. */
interface AxisConstraint {
  /** The required {@link import("@/units").axisKey}; undefined = empty axis (accepts anything). */
  requiredKey: string | undefined;
  /** Human label of the axis's current quantity/unit (for the badge + messages). */
  label: string | undefined;
}

/**
 * Chart Builder v2 — the type-first, plain-language replacement for ChartConfigPanel
 * (docs/05). Orchestrates, top→bottom: a {@link TypePicker}, the family's typed
 * {@link Well}s filled by drag or click, the {@link FieldPalette}, collapsed Filters
 * (the existing {@link FilterBuilder}), and a collapsed {@link CustomizeSection}.
 * Every edit funnels through the unchanged `update(nextSpec)`; the `builder/wells.ts`
 * seam owns all well↔spec mapping.
 */
export function ChartBuilderPanel({ spec, update }: ChartBuilderPanelProps): React.ReactElement {
  const { meta } = useCubeMeta();
  const { chart, query } = spec;
  const family = chart.family;
  const cube = inferCube(spec);

  const drag = useFieldDrag();
  const wells = React.useMemo(() => getWells(family), [family]);
  const placed = React.useMemo(() => readWells(spec), [spec]);

  /* ── per-axis unit consistency ──────────────────────────────────────────────
   * Every variable on one value-axis must describe the same KIND of quantity. We
   * derive the constraint from the first field already in each enforcing well
   * (bar/line/area "Y"); combo Y is exempt by design (the dual-axis mix chart).
   * A `requiredKey` of undefined means the axis is empty → accepts anything. */
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

  /** Whether `option` may be added to well `wellId` under the axis constraint. */
  const axisCompatible = React.useCallback(
    (wellId: string, option: MemberOption | undefined): boolean =>
      compatibleWithAxis(option, axisConstraints[wellId]?.requiredKey),
    [axisConstraints],
  );

  /** A one-line reason an option is blocked from a well (undefined = allowed). */
  const blockReason = React.useCallback(
    (wellId: string, option: MemberOption | undefined): string | undefined => {
      const c = axisConstraints[wellId];
      if (!c || c.requiredKey === undefined || axisCompatible(wellId, option)) return undefined;
      return `Y axis shows ${c.label}; ${option?.label ?? "this field"} is ${axisLabelOf(option)}`;
    },
    [axisConstraints, axisCompatible],
  );

  /* ── cube switch: clears all member-bound state (members can't cross cubes) ── */
  const onCubeChange = (nextCube: string): void => {
    if (nextCube === cube) return;
    update({
      ...spec,
      query: {
        ...query,
        measures: [],
        dimensions: [],
        timeDimensions: undefined,
        filters: undefined,
      },
      chart: { ...chart, mapping: undefined, familyOptions: undefined },
    });
  };

  /* a transient note surfaced near the wells when an add is rejected (a11y). */
  const [note, setNote] = React.useState<string | null>(null);

  /* ── place / remove via the pure seam ───────────────────────────────────── */
  const place = (wellId: string, name: string, kind: FieldKind): void => {
    const reason = blockReason(wellId, findMember(meta, name));
    if (reason) {
      setNote(reason);
      return;
    }
    setNote(null);
    update(placeField(spec, family, wellId, name, kind));
  };

  const onDrop = (wellId: string) => (payload: DragPayload): void =>
    place(wellId, payload.name, payload.kind);

  /* ── legal wells for click-to-add (one-wells: legal only when empty; value
   *    wells additionally reject axis-incompatible fields) ─────────────────── */
  const legalWells = React.useCallback(
    (option: MemberOption, kind: FieldKind): WellDef[] =>
      wells.filter((w) => {
        if (!w.kinds.includes(kind)) return false;
        if (w.cardinality === "one" && (placed[w.id]?.length ?? 0) > 0) return false;
        if (!compatibleWithAxis(option, axisConstraints[w.id]?.requiredKey)) return false;
        return true;
      }),
    [wells, placed, axisConstraints],
  );

  /* ── filters (unchanged builder) ─────────────────────────────────────────── */
  const onFiltersChange = (filters: CubeQuery["filters"]): void =>
    update({ ...spec, query: { ...query, filters } });

  return (
    <div data-slot="chart-builder-panel" className="flex flex-col gap-3">
      <TypePicker spec={spec} update={update} />

      <div className="flex flex-col gap-2.5">
        {wells.map((def) => {
          const members = placed[def.id] ?? [];
          const constraint = axisConstraints[def.id];
          // The dragged field's axis compatibility for THIS well (gates highlight).
          const dragOption = drag.dragging ? findMember(meta, drag.dragging.name) : undefined;
          const dragAxisOk = !constraint || compatibleWithAxis(dragOption, constraint.requiredKey);
          return (
            <Well
              key={def.id}
              def={def}
              filled={members.length > 0}
              drag={drag}
              onDrop={onDrop(def.id)}
              badge={constraint?.label}
              acceptsDrag={dragAxisOk}
            >
              {members.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {members.map((member, i) => (
                    <BuilderChip
                      key={member}
                      spec={spec}
                      update={update}
                      well={def}
                      member={member}
                      index={i}
                      total={members.length}
                      option={findMember(meta, member)}
                    />
                  ))}
                </div>
              ) : null}
            </Well>
          );
        })}
      </div>

      {note ? (
        <p role="status" aria-live="polite" className="px-1 text-[11px] text-destructive">
          {note}
        </p>
      ) : null}

      <FieldPalette
        cube={cube}
        onCubeChange={onCubeChange}
        wells={wells}
        legalWells={legalWells}
        onAdd={place}
        blockReason={blockReason}
        drag={drag}
      />

      <Section title="Filters" defaultOpen={false} summary={summarizeFilters(query.filters)}>
        <FilterBuilder cube={cube} value={query.filters} onChange={onFiltersChange} />
      </Section>

      <Section title="Customize" defaultOpen={false}>
        <CustomizeSection spec={spec} update={update} />
      </Section>
    </div>
  );
}

/* ─────────────────────────── per-chip wiring ──────────────────────────────── */

interface BuilderChipProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  well: WellDef;
  member: string;
  index: number;
  total: number;
  option?: MemberOption;
}

/**
 * Binds a {@link Chip}'s patch callbacks (rename/recolor/granularity/render/reorder/
 * remove) to the right corner of the spec for its well + family, then routes
 * removal through the `wells.ts` seam.
 */
function BuilderChip({
  spec,
  update,
  well,
  member,
  index,
  total,
  option,
}: BuilderChipProps): React.ReactElement {
  const { chart, query } = spec;
  const family = chart.family;
  const kind: FieldKind = well.kinds.length === 1 ? well.kinds[0] : kindOf(option);

  /* labels + colors live in different places by family/well */
  const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
  const comboSeries = (Array.isArray(fo.series) ? fo.series : []) as ComboSeriesEntry[];
  const tableColumns = (Array.isArray(fo.columns) ? fo.columns : []) as TableColumnEntry[];
  const seriesMeta = seriesMetaOf(chart);
  const meta = seriesMeta[member];

  const isComboY = family === "combo" && well.id === "y";
  const isTableCol = family === "table" && well.id === "columns";
  const isCartesianY =
    (family === "bar" || family === "line" || family === "area") && well.id === "y";
  const isPieSize = family === "pie" && well.id === "size";

  const usesSeriesMeta = isCartesianY || isPieSize;

  /* current chip props */
  const label = isComboY
    ? comboSeries.find((s) => s.member === member)?.label
    : isTableCol
      ? tableColumns.find((c) => c.member === member)?.label
      : usesSeriesMeta
        ? meta?.label
        : undefined;

  const colorToken: ChartColorToken | undefined = isComboY
    ? comboSeries.find((s) => s.member === member)?.colorToken
    : usesSeriesMeta
      ? meta?.colorToken
      : undefined;

  /* date X chip → granularity */
  const timeDim = timeDimensionOf(query);
  const isDateX =
    well.kinds.includes("time") &&
    timeDim?.dimension === member &&
    typeof timeDim.granularity === "string";
  const granularity = isDateX ? (timeDim?.granularity as Granularity) : undefined;

  /* render selector (combo Y only) */
  const render = isComboY
    ? (comboSeries.find((s) => s.member === member)?.render ?? "line")
    : undefined;

  /* ── writers ──────────────────────────────────────────────────────────────*/
  const patchSeriesMeta = (next: SeriesMeta | undefined): void => {
    const measures = (chart.mapping?.series && chart.mapping.series.mode === "measures"
      ? chart.mapping.series.members
      : query.measures) ?? [];
    const nextMeta: Record<string, SeriesMeta> = { ...seriesMeta };
    if (next && Object.keys(next).length > 0) nextMeta[member] = next;
    else delete nextMeta[member];
    const category = categoryOf(chart);
    if (!category) return;
    update({
      ...spec,
      chart: { ...chart, mapping: { category: { member: category }, series: buildSeries(measures, nextMeta) } },
    });
  };

  const patchComboSeries = (patch: Partial<ComboSeriesEntry>): void => {
    const next = comboSeries.map((s) => (s.member === member ? { ...s, ...patch } : s));
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, series: next } } });
  };

  const patchTableColumn = (patch: Partial<TableColumnEntry>): void => {
    const next = tableColumns.map((c) => (c.member === member ? { ...c, ...patch } : c));
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, columns: next } } });
  };

  const onRename = (value: string | undefined): void => {
    if (isComboY) patchComboSeries({ label: value });
    else if (isTableCol) patchTableColumn({ label: value });
    else if (usesSeriesMeta) patchSeriesMeta({ ...meta, label: value });
  };

  const onRecolor = (token: ChartColorToken | null): void => {
    if (isComboY) patchComboSeries({ colorToken: token ?? undefined });
    else if (usesSeriesMeta) patchSeriesMeta({ ...meta, colorToken: token ?? undefined });
  };

  const onGranularity = (g: Granularity): void => {
    if (!timeDim) return;
    update({ ...spec, query: { ...query, timeDimensions: [{ ...timeDim, granularity: g }] } });
  };

  const onRender = (r: ComboRender): void => patchComboSeries({ render: r });

  const onRemove = (): void => update(removeField(spec, family, well.id, member));

  /* reorder (many-cardinality wells) */
  const reorder =
    well.cardinality === "many"
      ? {
          canUp: index > 0,
          canDown: index < total - 1,
          onUp: () => update(reorderWell(spec, well, index, index - 1)),
          onDown: () => update(reorderWell(spec, well, index, index + 1)),
        }
      : undefined;

  /* which controls this chip exposes */
  const canRename = isComboY || isTableCol || usesSeriesMeta;
  const canColor = usesSeriesMeta || isComboY;

  return (
    <Chip
      member={member}
      kind={kind}
      option={option}
      label={label}
      colorToken={colorToken}
      granularity={granularity}
      render={render}
      reorder={reorder}
      onRename={canRename ? onRename : undefined}
      onRecolor={canColor ? onRecolor : undefined}
      onGranularity={isDateX ? onGranularity : undefined}
      onRender={isComboY ? onRender : undefined}
      onRemove={onRemove}
    />
  );
}

/* ─────────────────────────────── helpers ─────────────────────────────────── */

function kindOf(option: MemberOption | undefined): FieldKind {
  if (!option) return "category";
  if (option.memberType === "measure") return "number";
  if (option.type === "time") return "time";
  return "category";
}

/** The axis-well badge: the quantity label plus the unit in parens ("Distance (km)"). */
function axisBadgeLabel(option: MemberOption | undefined): string {
  const base = axisLabelOf(option);
  return option?.unit && option.unit !== base ? `${base} (${option.unit})` : base;
}

/** Reorder a member within a many-cardinality well, rewriting the backing array. */
function reorderWell(
  spec: ChartSpec,
  well: WellDef,
  from: number,
  to: number,
): ChartSpec {
  const { chart, query } = spec;
  const family = chart.family;
  const move = <T,>(arr: T[]): T[] => {
    if (to < 0 || to >= arr.length || from === to) return arr;
    const next = arr.slice();
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    return next;
  };

  if (family === "combo" && well.id === "y") {
    const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
    const series = move((Array.isArray(fo.series) ? fo.series : []) as ComboSeriesEntry[]);
    const measures = move(query.measures ?? []);
    return {
      ...spec,
      query: { ...query, measures },
      chart: { ...chart, familyOptions: { ...fo, series } },
    };
  }

  if (family === "table" && well.id === "columns") {
    const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
    const columns = move((Array.isArray(fo.columns) ? fo.columns : []) as TableColumnEntry[]);
    return { ...spec, chart: { ...chart, familyOptions: { ...fo, columns } } };
  }

  // cartesian Y (measures) — reorder measures + mapping series members in lockstep.
  const measures = move(query.measures ?? []);
  const series = chart.mapping?.series;
  const mapping =
    series && series.mode === "measures"
      ? { ...chart.mapping!, series: { ...series, members: measures } }
      : chart.mapping;
  return { ...spec, query: { ...query, measures }, chart: { ...chart, mapping } };
}

function summarizeFilters(filters: CubeQuery["filters"]): string | undefined {
  if (!filters) return undefined;
  const n = filters.filter((f) => "member" in f).length;
  return n === 0 ? undefined : `${n} filter${n === 1 ? "" : "s"}`;
}
