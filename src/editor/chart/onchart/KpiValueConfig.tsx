import * as React from "react";
import { CalendarRange, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { ChartSpec, DateRange, Granularity, TimeDimension, VarRef } from "@/spec";

import { FieldRow } from "../../primitives/FieldRow";
import { GranularityPicker } from "../../primitives/GranularityPicker";
import { MemberPicker } from "../../primitives/MemberPicker";
import { SegmentedControl } from "../../primitives/SegmentedControl";
import { SwitchRow } from "../../primitives/SwitchRow";
import { inferCube } from "../helpers";
import { DateRangeValueEditor } from "../binding/DateRangeValueEditor";
import { ValueBinding } from "../binding/ValueBinding";

/**
 * The KPI editor, modeled as THREE components — Value, Comparison, Sparkline — each a
 * compact entry in the config strip that opens a POPOVER with its own options (so the
 * strip stays tidy). A KPI is just one number plus two optional embellishments, so this
 * mirrors that shape. {@link KpiSectionPopover} is the shared trigger; the bodies below
 * are the popover contents.
 */

/** A compact config-strip entry (label + state summary) that opens its options popover. */
export function KpiSectionPopover({
  label,
  summary,
  children,
}: {
  label: string;
  summary?: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="cv-kpi-section-trigger"
          title={label}
        >
          <span className="cv-ec-truncate">{label}</span>
          <span className="cv-kpi-section-state">
            {summary ? <span className="cv-kpi-section-summary">{summary}</span> : null}
            <ChevronDown className="cv-ec-icon" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="cv-kpi-section-popover">
        {children}
      </PopoverContent>
    </Popover>
  );
}

type Props = { spec: ChartSpec; update: (next: ChartSpec) => void };

function useKpi(spec: ChartSpec, update: (n: ChartSpec) => void) {
  const { chart } = spec;
  const fo = (chart.familyOptions ?? {}) as Record<string, unknown>;
  const setFO = (patch: Record<string, unknown>): void =>
    update({ ...spec, chart: { ...chart, familyOptions: { ...fo, ...patch } } });
  return { chart, fo, setFO };
}

/* ────────────────────────────────── value ───────────────────────────────── */

/** What the number IS: the time field + range that scope it, and how it's drawn. The
 *  measure itself is the field pill above this; these are its framing controls. */
export function KpiValueFields({ spec, update }: Props): React.ReactElement {
  const { fo, setFO } = useKpi(spec, update);
  const cube = inferCube(spec);
  const td = spec.query.timeDimensions?.[0];
  const display = (fo.display as "number" | "gauge" | undefined) ?? "number";
  const gauge = fo.gauge as { min?: number; max?: number } | undefined;
  // Which direction is GOOD is a property of the measure, not of the comparison or the
  // sparkline — both color by it. It used to be rendered in each of those blocks, with
  // a `!comparing` guard so the one setting never showed up as two switches at once.
  // Owning it here deletes the guard and the possibility of the bug it was avoiding.
  const goodDirection = (fo.goodDirection as "up" | "down" | undefined) ?? "up";

  // The KPI MAIN query stays granularity-LESS (the headline is an aggregate; the
  // sparkline adds its own bucket). A var-bound range rides through untouched.
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
    <div className="cv-kpi-fields">
      <Field label="Time field">
        {({ id }) => (
          <MemberPicker
            id={id}
            cube={cube}
            kind="time"
            value={td?.dimension}
            onChange={(m) => setTimeDim({ dimension: m })}
            placeholder="All time"
            className="cv-ec-h8"
          />
        )}
      </Field>
      {td?.dimension ? (
        <Field label="Date range">
          {({ labelId }) => (
            <ValueBinding
              labelId={labelId}
              kind="dateRange"
              value={td.dateRange}
              onChange={(r) => setTimeDim({ dateRange: r as DateRange | VarRef | undefined })}
              renderFixed={(r, set) => <DateRangeValueEditor value={r} onChange={set} />}
            />
          )}
        </Field>
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
          onChange={(v) => setFO({ display: v })}
        />
      </FieldRow>
      <SwitchRow
        label="Higher is better"
        hint="Off = a decrease is good — inverts the comparison and trend colors."
        checked={goodDirection !== "down"}
        onChange={(on) => setFO({ goodDirection: on ? "up" : "down" })}
      />
      {display === "gauge" ? (
        <Field label="Gauge max">
          {({ id }) => (
            <Input
              id={id}
              type="number"
              className="cv-ec-h8"
              value={gauge?.max ?? ""}
              placeholder="Auto"
              onChange={(e) => {
                const n = parseFloat(e.target.value);
                setFO({ gauge: Number.isFinite(n) ? { ...(gauge ?? {}), max: n } : undefined });
              }}
            />
          )}
        </Field>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────── comparison ────────────────────────────── */

/** What the number is measured AGAINST. One picker: nothing / prior period / a fixed number. */
export function KpiComparison({ spec, update }: Props): React.ReactElement {
  const { fo, setFO } = useKpi(spec, update);
  const comparison = fo.comparison as Record<string, unknown> | undefined;
  const comparing = comparison !== undefined;
  const last = React.useRef<Record<string, unknown> | undefined>(undefined);
  if (comparison) last.current = comparison;
  const td = spec.query.timeDimensions?.[0];

  // ONE control, three states. It was a "Show comparison" switch that revealed an
  // "Against" picker — but "off" is just a third thing to compare against (nothing),
  // and splitting it made the user operate two controls to express one choice.
  const against: "none" | "previousPeriod" | "value" = !comparing
    ? "none"
    : ((comparison?.mode as "previousPeriod" | "value" | undefined) ?? "previousPeriod");

  return (
    <div className="cv-kpi-options">
      <FieldRow label="Compare to">
        <SegmentedControl<"none" | "previousPeriod" | "value">
          aria-label="Compare to"
          size="sm"
          options={[
            { value: "none", label: "Nothing" },
            { value: "previousPeriod", label: "Prev period" },
            { value: "value", label: "Fixed value" },
          ]}
          value={against}
          onChange={(v) =>
            setFO({
              comparison:
                v === "none"
                  ? undefined
                  : // Re-entering restores the config the user last had, so toggling
                    // through "Nothing" is not destructive.
                    { ...(last.current ?? { showAsPercent: true }), mode: v },
            })
          }
        />
      </FieldRow>
      {comparing ? (
        <>
          {comparison?.mode === "value" ? (
            <Field label="Baseline value">
              {({ id }) => (
                <Input
                  id={id}
                  type="number"
                  className="cv-ec-h8"
                  value={(comparison?.value as number | undefined) ?? ""}
                  onChange={(e) => {
                    const n = parseFloat(e.target.value);
                    setFO({ comparison: { ...comparison, value: Number.isFinite(n) ? n : undefined } });
                  }}
                />
              )}
            </Field>
          ) : null}
          {comparison?.mode === "previousPeriod" && !td?.dateRange ? (
            <div className="cv-kpi-warn">
              <CalendarRange className="cv-kpi-warn-icon" />
              <span>
                <strong>A date range is required.</strong> Set one under
                “Time, range &amp; display” on the value so the prior period can be computed — without
                it the comparison shows “set a date range”.
              </span>
            </div>
          ) : null}
          <SwitchRow
            label="Show as %"
            checked={(comparison?.showAsPercent ?? true) !== false}
            onChange={(on) => setFO({ comparison: { ...comparison, showAsPercent: on } })}
          />
          {/* "Higher is better" is NOT here — it belongs to the measure, and the
              sparkline colors by it too. It lives once, on the value block. */}
        </>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────── sparkline ─────────────────────────────── */

/** The inline trend under the headline. Its BUCKET is the whole control — "No trend" is off. */
export function KpiSparklineConfig({ spec, update }: Props): React.ReactElement {
  const { fo, setFO } = useKpi(spec, update);
  const sparkline = fo.sparkline as { granularity?: Granularity | VarRef } | undefined;
  const sparkOn = sparkline !== undefined;
  const granularity = sparkline?.granularity;

  /**
   * The bucket picker IS the on/off switch: no bucket, no trend. A separate "Show
   * sparkline" toggle above a "Trend granularity" select made two controls out of one
   * question, and left a nonsense state available (on, but bucketed by nothing).
   */
  return (
    <div className="cv-kpi-options">
      <Field label="Trend">
        {({ id, labelId }) => (
          <ValueBinding
            labelId={labelId}
            kind="granularity"
            value={granularity}
            onChange={(g) =>
              setFO({
                sparkline:
                  g === undefined ? undefined : { ...sparkline, granularity: g as Granularity | VarRef },
              })
            }
            renderFixed={(g, set) => (
              <GranularityPicker
                id={id}
                value={g}
                onChange={set}
                allowNone
                noneLabel="No trend"
                className="cv-ec-h8 cv-ec-full"
              />
            )}
          />
        )}
      </Field>
      {sparkOn ? (
        <p className="cv-ec-hint">
          Colored by the direction set on the value.
        </p>
      ) : null}
    </div>
  );
}

/* ───────────────────────────────── helpers ──────────────────────────────── */

/**
 * A vertical labeled field (caption above the control). The caption is a real
 * `<label>` and hands its generated ids to the control, so whatever sits below is
 * NAMED: `id` for a native field (`<label htmlFor>`), `labelId` for a cluster of
 * buttons (a Select trigger / the Value|Variable group) that a `for` cannot target.
 */
function Field({
  label,
  children,
}: {
  label: string;
  children: (ids: { id: string; labelId: string }) => React.ReactNode;
}): React.ReactElement {
  const id = React.useId();
  const labelId = React.useId();
  return (
    <div className="cv-ec-field">
      <label id={labelId} htmlFor={id} className="cv-ec-label">
        {label}
      </label>
      {children({ id, labelId })}
    </div>
  );
}
