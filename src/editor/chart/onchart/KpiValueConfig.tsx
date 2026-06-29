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
          className="cv:flex cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2.5 cv:py-1.5 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent"
          title={label}
        >
          <span className="cv:truncate">{label}</span>
          <span className="cv:flex cv:shrink-0 cv:items-center cv:gap-1 cv:text-muted-foreground">
            {summary ? <span className="cv:text-[11px]">{summary}</span> : null}
            <ChevronDown className="cv:size-3.5" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3">
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
    <div className="cv:flex cv:flex-col cv:gap-2">
      <Field label="Time field">
        <MemberPicker
          cube={cube}
          kind="time"
          value={td?.dimension}
          onChange={(m) => setTimeDim({ dimension: m })}
          placeholder="All time"
          className="cv:h-8"
        />
      </Field>
      {td?.dimension ? (
        <Field label="Date range">
          <ValueBinding
            kind="dateRange"
            value={td.dateRange}
            onChange={(r) => setTimeDim({ dateRange: r as DateRange | VarRef | undefined })}
            renderFixed={(r, set) => <DateRangeValueEditor value={r} onChange={set} />}
          />
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
      {display === "gauge" ? (
        <Field label="Gauge max">
          <Input
            type="number"
            className="cv:h-8"
            value={gauge?.max ?? ""}
            placeholder="Auto"
            onChange={(e) => {
              const n = parseFloat(e.target.value);
              setFO({ gauge: Number.isFinite(n) ? { ...(gauge ?? {}), max: n } : undefined });
            }}
          />
        </Field>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────── comparison ────────────────────────────── */

/** The Comparison component: a header switch to enable, then its own config. */
export function KpiComparison({ spec, update }: Props): React.ReactElement {
  const { fo, setFO } = useKpi(spec, update);
  const comparison = fo.comparison as Record<string, unknown> | undefined;
  const comparing = comparison !== undefined;
  const last = React.useRef<Record<string, unknown> | undefined>(undefined);
  if (comparison) last.current = comparison;
  const td = spec.query.timeDimensions?.[0];
  const goodDirection =
    (fo.goodDirection as "up" | "down" | undefined) ??
    (comparison?.goodDirection as "up" | "down" | undefined) ??
    "up";

  return (
    <div className="cv:flex cv:flex-col cv:gap-1.5">
      <SwitchRow
        label="Show comparison"
        checked={comparing}
        onChange={(on) =>
          setFO({
            comparison: on ? (last.current ?? { mode: "previousPeriod", showAsPercent: true }) : undefined,
          })
        }
      />
      {comparing ? (
        <>
          <FieldRow label="Against">
            <SegmentedControl<"previousPeriod" | "value">
              aria-label="Compare against"
              size="sm"
              options={[
                { value: "previousPeriod", label: "Prev period" },
                { value: "value", label: "Fixed value" },
              ]}
              value={(comparison?.mode as "previousPeriod" | "value") ?? "previousPeriod"}
              onChange={(m) => setFO({ comparison: { ...comparison, mode: m } })}
            />
          </FieldRow>
          {comparison?.mode === "value" ? (
            <Field label="Baseline value">
              <Input
                type="number"
                className="cv:h-8"
                value={(comparison?.value as number | undefined) ?? ""}
                onChange={(e) => {
                  const n = parseFloat(e.target.value);
                  setFO({ comparison: { ...comparison, value: Number.isFinite(n) ? n : undefined } });
                }}
              />
            </Field>
          ) : null}
          {comparison?.mode === "previousPeriod" && !td?.dateRange ? (
            <div className="cv:flex cv:items-start cv:gap-1.5 cv:rounded-md cv:border cv:border-amber-500/30 cv:bg-amber-500/10 cv:px-2 cv:py-1.5 cv:text-[11px] cv:leading-snug cv:text-amber-700">
              <CalendarRange className="cv:mt-px cv:size-3.5 cv:shrink-0" />
              <span>
                <strong className="cv:font-semibold">A date range is required.</strong> Set one under
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
          <SwitchRow
            label="Higher is better"
            hint="Off = a decrease is good (inverts the up/down colors)."
            checked={goodDirection !== "down"}
            onChange={(on) => setFO({ goodDirection: on ? "up" : "down" })}
          />
        </>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────── sparkline ─────────────────────────────── */

/** The Sparkline component: a header switch to enable, then its own config. */
export function KpiSparklineConfig({ spec, update }: Props): React.ReactElement {
  const { fo, setFO } = useKpi(spec, update);
  const sparkline = fo.sparkline as { granularity?: Granularity | VarRef } | undefined;
  const sparkOn = sparkline !== undefined;
  // "Higher is better" is shared with Comparison; show it here only when comparison is off
  // (so the single underlying setting never appears as two toggles at once).
  const comparing = fo.comparison !== undefined;
  const goodDirection = (fo.goodDirection as "up" | "down" | undefined) ?? "up";
  const granularity = sparkline?.granularity;

  return (
    <div className="cv:flex cv:flex-col cv:gap-1.5">
      <SwitchRow
        label="Show sparkline"
        checked={sparkOn}
        onChange={(on) => setFO({ sparkline: on ? { granularity: granularity ?? "day" } : undefined })}
      />
      {sparkOn ? (
        <>
          <Field label="Trend granularity">
            <ValueBinding
              kind="granularity"
              value={granularity}
              onChange={(g) => setFO({ sparkline: { ...sparkline, granularity: g as Granularity | VarRef } })}
              renderFixed={(g, set) => <GranularityPicker value={g} onChange={set} className="cv:h-8 cv:w-full" />}
            />
          </Field>
          {!comparing ? (
            <SwitchRow
              label="Higher is better"
              hint="Off = a decrease is good (inverts the trend color)."
              checked={goodDirection !== "down"}
              onChange={(on) => setFO({ goodDirection: on ? "up" : "down" })}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

/* ───────────────────────────────── helpers ──────────────────────────────── */

/** A vertical labeled field (caption above the control). */
function Field({ label, children }: { label: string; children: React.ReactNode }): React.ReactElement {
  return (
    <div className="cv:flex cv:flex-col cv:gap-1">
      <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
