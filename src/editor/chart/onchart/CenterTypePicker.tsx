import * as React from "react";
import {
  AreaChart,
  BarChart3,
  BarChart4,
  ChevronDown,
  Gauge,
  LineChart,
  PieChart,
  ScatterChart,
  Table,
  type LucideIcon,
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { ChartFamily, ChartSpec } from "@/spec";

import { FAMILY_LABELS, migrateToFamily } from "../helpers";
import { CustomizeSection, hasCustomizeOptions } from "../builder/CustomizeSection";

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

const FAMILY_ICON: Record<ChartFamily, LucideIcon> = {
  bar: BarChart3,
  line: LineChart,
  area: AreaChart,
  pie: PieChart,
  scatter: ScatterChart,
  kpi: Gauge,
  table: Table,
  combo: BarChart4,
};

export interface CenterTypePickerProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  /** No fields placed yet — show the prominent centered chooser + build hint. */
  empty: boolean;
}

/** Switch the chart family, carrying field bindings across (kpi/scatter/table/combo
 *  store fields in familyOptions, so a plain reset would empty the new chart). */
function useSetFamily(spec: ChartSpec, update: (next: ChartSpec) => void): (next: ChartFamily) => void {
  return (next: ChartFamily): void => {
    if (next === spec.chart.family) return;
    update(migrateToFamily(spec, next));
  };
}

/**
 * The EMPTY-state chart-type chooser — a prominent centered card overlaid on the
 * placeholder until the first field is placed. Built charts switch type via the
 * {@link ChartTypePill} in the editor toolbar instead (an on-chart pill was hard to
 * click — the live chart sat above it — so the control lives in real layout now).
 */
export function CenterTypePicker({ spec, update, empty }: CenterTypePickerProps): React.ReactElement | null {
  const family = spec.chart.family;
  const setFamily = useSetFamily(spec, update);

  if (!empty) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center p-4">
      <div className="pointer-events-auto w-full max-w-sm rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
        <p className="pb-0.5 text-center text-sm font-medium">Choose a chart type</p>
        <p className="pb-3 text-center text-xs text-muted-foreground">
          Then add fields to the slots around the chart.
        </p>
        <TypeGrid family={family} onPick={setFamily} />
      </div>
    </div>
  );
}

/**
 * The compact chart-type pill for the editor's top toolbar (built charts). Opens the
 * same tile grid + type-level Options popover the empty chooser uses. Rendered in normal
 * layout (not over the chart) so it's always clickable.
 */
export function ChartTypePill({ spec, update }: { spec: ChartSpec; update: (next: ChartSpec) => void }): React.ReactElement {
  const family = spec.chart.family;
  const setFamily = useSetFamily(spec, update);
  const Icon = FAMILY_ICON[family];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
          title="Change chart type"
        >
          <Icon className="size-3.5 text-muted-foreground" />
          {FAMILY_LABELS[family]}
          <ChevronDown className="size-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="flex max-h-[70vh] w-72 flex-col gap-2.5 overflow-y-auto p-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Chart type</p>
          <TypeGrid family={family} onPick={setFamily} />
        </div>
        {/* The few remaining type-level options (stacking, donut, KPI, table…). Most
            config is in-context: per-measure on the field pills, chrome on the chart.
            Families with nothing left (line / combo / scatter) show no Options at all. */}
        {hasCustomizeOptions(family) ? (
          <div className="flex flex-col gap-1.5 border-t border-border pt-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Options</p>
            <CustomizeSection spec={spec} update={update} />
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

interface TypeGridProps {
  family: ChartFamily;
  onPick: (family: ChartFamily) => void;
}

/** A 4-column tile grid of the chart families. */
function TypeGrid({ family, onPick }: TypeGridProps): React.ReactElement {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {FAMILY_ORDER.map((f) => {
        const Icon = FAMILY_ICON[f];
        const active = f === family;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onPick(f)}
            aria-pressed={active}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md border px-1 py-2 text-[10px] transition-colors",
              active
                ? "border-ring bg-accent text-foreground"
                : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {FAMILY_LABELS[f]}
          </button>
        );
      })}
    </div>
  );
}
