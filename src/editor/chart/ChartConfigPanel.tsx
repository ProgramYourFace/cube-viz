import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOptionalDashboard } from "@/hooks";
import {
  isVarRef,
  type ChartFamily,
  type ChartOptions,
  type ChartSpec,
  type CubeQuery,
  type DateRange,
  type Granularity,
  type SeriesMeta,
  type TimeDimension,
} from "@/spec";

import { CubePicker } from "../primitives/CubePicker";
import { FieldRow } from "../primitives/FieldRow";
import { GranularityPicker } from "../primitives/GranularityPicker";
import { MemberMultiPicker } from "../primitives/MemberMultiPicker";
import { MemberPicker } from "../primitives/MemberPicker";
import { Section } from "../primitives/Section";
import { SegmentedControl } from "../primitives/SegmentedControl";
import { SwitchRow } from "../primitives/SwitchRow";
import { FilterBuilder } from "./FilterBuilder";
import { FormatOptionsEditor } from "./FormatOptionsEditor";
import { SeriesMetaEditor } from "./SeriesMetaEditor";
import {
  buildMapping,
  buildSeries,
  categoryOf,
  DEFAULT_GRANULARITY,
  FAMILY_LABELS,
  familyHasCartesianAxes,
  familyUsesMapping,
  inferCube,
  measuresOf,
  seriesMetaOf,
  timeDimensionOf,
} from "./helpers";

/**
 * The ChartEditor's LEFT config pane (docs/03 §A3.1 steps 1–7). Pure JSON-in /
 * JSON-out: it reads the working {@link ChartSpec} and calls `update` with a new
 * spec on every edit. All member lists come from `useCubeMeta()` (verbatim names);
 * this component never fetches data or guesses members.
 */

export interface ChartConfigPanelProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
}

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

export function ChartConfigPanel({ spec, update }: ChartConfigPanelProps): React.ReactElement {
  const dashboard = useOptionalDashboard();
  const variables = dashboard?.decls ?? [];

  const { query, chart } = spec;
  const family = chart.family;
  const cube = inferCube(spec);

  /* ── shared setters ─────────────────────────────────────────────────────── */

  const setQuery = (next: CubeQuery): void => update({ ...spec, query: next });
  const setChart = (next: ChartOptions): void => update({ ...spec, chart: next });

  const setBoth = (q: CubeQuery, c: ChartOptions): void =>
    update({ ...spec, query: q, chart: c });

  /* ── 1. Data source ─────────────────────────────────────────────────────── */

  const onCubeChange = (nextCube: string): void => {
    if (nextCube === cube) return;
    // Switching the data source clears member-bound state (members can't cross cubes).
    setBoth(
      { ...query, measures: [], dimensions: [], timeDimensions: undefined, filters: undefined },
      {
        ...chart,
        mapping: undefined,
        familyOptions: undefined,
      },
    );
  };

  /* ── 2. Measures ────────────────────────────────────────────────────────── */

  const measures = measuresOf(chart);
  const metaMap = seriesMetaOf(chart);
  const category = categoryOf(chart);
  const usesMapping = familyUsesMapping(family);

  const onMeasuresChange = (members: string[]): void => {
    const series = buildSeries(members, metaMap);
    setBoth(
      { ...query, measures: members },
      { ...chart, mapping: buildMapping(category, series) },
    );
  };

  const onSeriesMeta = (member: string, next: SeriesMeta | undefined): void => {
    if (!usesMapping) return;
    const nextMeta: Record<string, SeriesMeta> = { ...metaMap };
    if (next) nextMeta[member] = next;
    else delete nextMeta[member];
    setChart({
      ...chart,
      mapping: buildMapping(category, { mode: "measures", members: measures, meta: nextMeta }),
    });
  };

  /* ── 3. Dimension / category ────────────────────────────────────────────── */

  const onCategoryChange = (member: string): void => {
    const dims = member ? [member] : [];
    setBoth(
      { ...query, dimensions: dims },
      { ...chart, mapping: buildMapping(member, buildSeries(measures, metaMap)) },
    );
  };

  /* ── 4. Time + granularity ──────────────────────────────────────────────── */

  const timeDim = timeDimensionOf(query);

  const setTimeDimension = (next: TimeDimension | undefined): void => {
    setQuery({ ...query, timeDimensions: next ? [next] : undefined });
  };

  const onTimeMemberChange = (member: string): void => {
    if (!member) {
      setTimeDimension(undefined);
      return;
    }
    setTimeDimension({
      dimension: member,
      granularity: timeDim?.granularity ?? DEFAULT_GRANULARITY,
      dateRange: timeDim?.dateRange,
    });
  };

  const granularityBound = isVarRef(timeDim?.granularity);
  const dateRangeBound = isVarRef(timeDim?.dateRange);

  const onGranularityChange = (g: Granularity): void => {
    if (!timeDim) return;
    setTimeDimension({ ...timeDim, granularity: g });
  };

  const bindGranularity = (varName: string | null): void => {
    if (!timeDim) return;
    setTimeDimension({
      ...timeDim,
      granularity: varName ? { var: varName } : DEFAULT_GRANULARITY,
    });
  };

  const onDateRangeChange = (range: DateRange | undefined): void => {
    if (!timeDim) return;
    setTimeDimension({ ...timeDim, dateRange: range });
  };

  const bindDateRange = (varName: string | null): void => {
    if (!timeDim) return;
    setTimeDimension({
      ...timeDim,
      dateRange: varName ? { var: varName } : undefined,
    });
  };

  /* ── 5. Filters ─────────────────────────────────────────────────────────── */

  const onFiltersChange = (filters: CubeQuery["filters"]): void => {
    setQuery({ ...query, filters });
  };

  /* ── 6. Chart type + display ────────────────────────────────────────────── */

  const onFamilyChange = (nextFamily: ChartFamily): void => {
    if (nextFamily === family) return;
    // Reset familyOptions (each family has its own schema) but keep query + mapping.
    setChart({ ...chart, family: nextFamily, familyOptions: undefined });
  };

  const setEnvelope = (patch: Partial<ChartOptions>): void => setChart({ ...chart, ...patch });

  /* ── 7. Format ──────────────────────────────────────────────────────────── */

  const onFormatChange = (format: ChartOptions["format"]): void => setEnvelope({ format });

  return (
    <div data-slot="chart-config-panel" className="flex flex-col">
      {/* 1. Data source */}
      <Section title="Data source" summary={cube} collapsible={false}>
        <FieldRow label="Cube or view">
          <CubePicker value={cube} onChange={onCubeChange} />
        </FieldRow>
      </Section>

      {/* 2. Measures */}
      <Section title="Measures" summary={summarize(measures.length, "measure")}>
        <MemberMultiPicker
          cube={cube}
          kind="measure"
          value={measures}
          onChange={onMeasuresChange}
          addLabel="Add measure"
        />
        {usesMapping && measures.length > 0 ? (
          <div className="mt-2 flex flex-col gap-1.5">
            {measures.map((m) => (
              <SeriesMetaEditor
                key={m}
                member={m}
                defaultLabel={m}
                value={metaMap[m]}
                onChange={(next) => onSeriesMeta(m, next)}
              />
            ))}
          </div>
        ) : null}
      </Section>

      {/* 3. Dimension / category */}
      <Section title="Dimension" summary={category}>
        <FieldRow label="Category dimension" hint="Groups rows along the category axis.">
          <MemberPicker
            cube={cube}
            kind="dimension"
            value={category}
            onChange={onCategoryChange}
            placeholder="No dimension"
          />
        </FieldRow>
      </Section>

      {/* 4. Time + granularity */}
      <Section title="Time" summary={timeDim?.dimension}>
        <FieldRow label="Time dimension">
          <MemberPicker
            cube={cube}
            kind="time"
            value={timeDim?.dimension}
            onChange={onTimeMemberChange}
            placeholder="No time dimension"
          />
        </FieldRow>
        {timeDim ? (
          <>
            <FieldRow
              label="Granularity"
              action={
                <BindToggle
                  variables={variables.filter((v) => v.type === "granularity").map((v) => v.name)}
                  bound={granularityBound}
                  varName={isVarRef(timeDim.granularity) ? timeDim.granularity.var : undefined}
                  onBind={bindGranularity}
                />
              }
            >
              {granularityBound ? (
                <BoundField label={`{${(timeDim.granularity as { var: string }).var}}`} />
              ) : (
                <GranularityPicker
                  value={
                    typeof timeDim.granularity === "string" ? timeDim.granularity : undefined
                  }
                  onChange={onGranularityChange}
                />
              )}
            </FieldRow>
            <FieldRow
              label="Date range"
              hint={dateRangeBound ? undefined : 'e.g. "last 30 days"'}
              action={
                <BindToggle
                  variables={variables.filter((v) => v.type === "dateRange").map((v) => v.name)}
                  bound={dateRangeBound}
                  varName={isVarRef(timeDim.dateRange) ? timeDim.dateRange.var : undefined}
                  onBind={bindDateRange}
                />
              }
            >
              {dateRangeBound ? (
                <BoundField label={`{${(timeDim.dateRange as { var: string }).var}}`} />
              ) : (
                <Input
                  value={typeof timeDim.dateRange === "string" ? timeDim.dateRange : ""}
                  onChange={(e) =>
                    onDateRangeChange(e.target.value ? e.target.value : undefined)
                  }
                  placeholder="last 30 days"
                />
              )}
            </FieldRow>
          </>
        ) : null}
      </Section>

      {/* 5. Filters */}
      <Section title="Filters" summary={summarize(countLeaves(query.filters), "filter")}>
        <FilterBuilder cube={cube} value={query.filters} onChange={onFiltersChange} />
      </Section>

      {/* 6. Chart type + display */}
      <Section title="Chart type" summary={FAMILY_LABELS[family]}>
        <FieldRow label="Family">
          <SegmentedControl<ChartFamily>
            aria-label="Chart family"
            size="sm"
            fullWidth={false}
            options={FAMILY_ORDER.map((f) => ({ value: f, label: FAMILY_LABELS[f] }))}
            value={family}
            onChange={onFamilyChange}
          />
        </FieldRow>

        {familyHasCartesianAxes(family) ? (
          <>
            <FieldRow label="Orientation">
              <SegmentedControl<"vertical" | "horizontal">
                aria-label="Orientation"
                size="sm"
                options={[
                  { value: "vertical", label: "Vertical" },
                  { value: "horizontal", label: "Horizontal" },
                ]}
                value={chart.orientation ?? "vertical"}
                onChange={(orientation) => setEnvelope({ orientation })}
              />
            </FieldRow>
            <FieldRow label="Stacking">
              <SegmentedControl<"none" | "stacked" | "grouped" | "percent">
                aria-label="Stack mode"
                size="sm"
                options={[
                  { value: "none", label: "None" },
                  { value: "grouped", label: "Grouped" },
                  { value: "stacked", label: "Stacked" },
                  { value: "percent", label: "100%" },
                ]}
                value={chart.stackMode ?? "none"}
                onChange={(stackMode) => setEnvelope({ stackMode })}
              />
            </FieldRow>
          </>
        ) : null}

        <SwitchRow
          label="Show legend"
          checked={chart.legend?.show ?? true}
          onChange={(show) => setEnvelope({ legend: { ...chart.legend, show } })}
        />
        {chart.legend?.show !== false ? (
          <FieldRow label="Legend position">
            <SegmentedControl<"top" | "right" | "bottom" | "left">
              aria-label="Legend position"
              size="sm"
              options={[
                { value: "top", label: "Top" },
                { value: "right", label: "Right" },
                { value: "bottom", label: "Bottom" },
                { value: "left", label: "Left" },
              ]}
              value={chart.legend?.position ?? "bottom"}
              onChange={(position) =>
                setEnvelope({ legend: { ...chart.legend, show: true, position } })
              }
            />
          </FieldRow>
        ) : null}

        <SwitchRow
          label="Show tooltip"
          checked={chart.tooltip?.show ?? true}
          onChange={(show) => setEnvelope({ tooltip: { ...chart.tooltip, show } })}
        />

        {familyHasCartesianAxes(family) ? (
          <>
            <FieldRow label="X-axis label">
              <Input
                value={chart.axes?.x?.label ?? ""}
                onChange={(e) =>
                  setEnvelope({
                    axes: { ...chart.axes, x: { ...chart.axes?.x, label: e.target.value || undefined } },
                  })
                }
                placeholder="auto"
              />
            </FieldRow>
            <FieldRow label="Y-axis label">
              <Input
                value={chart.axes?.y?.label ?? ""}
                onChange={(e) =>
                  setEnvelope({
                    axes: { ...chart.axes, y: { ...chart.axes?.y, label: e.target.value || undefined } },
                  })
                }
                placeholder="auto"
              />
            </FieldRow>
            <FieldRow label="Y-axis scale">
              <Select
                value={chart.axes?.y?.scale ?? "linear"}
                onValueChange={(v) =>
                  setEnvelope({
                    axes: {
                      ...chart.axes,
                      y: { ...chart.axes?.y, scale: v as "linear" | "log" },
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="log">Logarithmic</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
          </>
        ) : null}

        {!usesMapping ? (
          <p className="pt-1 text-xs text-muted-foreground">
            {FAMILY_LABELS[family]} charts carry their own mapping in advanced options; use the
            measures + dimension above to populate the query.
          </p>
        ) : null}
      </Section>

      {/* 7. Format */}
      <Section title="Format" defaultOpen={false} summary={chart.format?.kind}>
        <FormatOptionsEditor
          value={chart.format}
          onChange={onFormatChange}
          idPrefix="chart-fmt"
        />
      </Section>
    </div>
  );
}

/* ─────────────────────────────── sub-components ──────────────────────────── */

/** A read-only field showing a `{var}` binding (the editor doesn't edit the literal then). */
function BoundField({ label }: { label: string }): React.ReactElement {
  return (
    <div className="flex h-9 items-center rounded-md border border-dashed border-input bg-muted/40 px-3 text-sm text-muted-foreground">
      <span className="font-mono">{label}</span>
    </div>
  );
}

/**
 * "Bind to variable" toggle for a value position (granularity / date range). Lets the
 * author swap a literal for a `{var}` token, choosing among declared variables of the
 * right type. With no matching variables it shows a disabled hint.
 */
function BindToggle({
  variables,
  bound,
  varName,
  onBind,
}: {
  variables: string[];
  bound: boolean;
  varName?: string;
  onBind: (varName: string | null) => void;
}): React.ReactElement {
  if (!bound && variables.length === 0) {
    return <span className="text-[10px] text-muted-foreground">no variables</span>;
  }
  if (!bound) {
    return (
      <Select value="" onValueChange={(v) => onBind(v)}>
        <SelectTrigger className="h-6 w-auto gap-1 border-none px-1.5 text-[11px] shadow-none">
          <SelectValue placeholder="Bind {var}" />
        </SelectTrigger>
        <SelectContent>
          {variables.map((name) => (
            <SelectItem key={name} value={name}>
              {`{${name}}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onBind(null)}
      className="text-[11px] text-primary underline-offset-2 hover:underline"
    >
      unbind {varName ? `{${varName}}` : ""}
    </button>
  );
}

/* ─────────────────────────────── pure utils ─────────────────────────────── */

function summarize(n: number, noun: string): string | undefined {
  if (n === 0) return undefined;
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

/** Count flat leaf filters (groups are summarized separately in the builder). */
function countLeaves(filters: CubeQuery["filters"]): number {
  if (!filters) return 0;
  return filters.filter((f) => "member" in f).length;
}
