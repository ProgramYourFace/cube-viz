import * as React from "react";
import { ChevronDown } from "lucide-react";

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
          className="flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
          title={label}
        >
          <span className="truncate">{label}</span>
          <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
            {summary ? <span className="text-[11px]">{summary}</span> : null}
            <ChevronDown className="size-3.5" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-h-[72vh] w-64 overflow-y-auto p-3">
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
    <div className="flex flex-col gap-2">
      <Field label="Time field">
        <MemberPicker
          cube={cube}
          kind="time"
          value={td?.dimension}
          onChange={(m) => setTimeDim({ dimension: m })}
          placeholder="All time"
          className="h-8"
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
            className="h-8"
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
    <div className="flex flex-col gap-1.5">
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
                className="h-8"
                value={(comparison?.value as number | undefined) ?? ""}
                onChange={(e) => {
                  const n = parseFloat(e.target.value);
                  setFO({ comparison: { ...comparison, value: Number.isFinite(n) ? n : undefined } });
                }}
              />
            </Field>
          ) : null}
          {comparison?.mode === "previousPeriod" && !td?.dateRange ? (
            <p className="text-[10px] leading-tight text-muted-foreground/80">
              Set a date range on the value to compute the prior period.
            </p>
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
    <div className="flex flex-col gap-1.5">
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
              renderFixed={(g, set) => <GranularityPicker value={g} onChange={set} className="h-8 w-full" />}
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
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
