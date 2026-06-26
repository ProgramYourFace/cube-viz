import * as React from "react";
import { ChevronDown } from "lucide-react";

import { familyDescriptor, familyOrder } from "@/charts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { ChartFamily, ChartSpec } from "@/spec";

import { FAMILY_LABELS, migrateToFamily } from "../helpers";
import { CustomizeSection, hasCustomizeOptions } from "../builder/CustomizeSection";

/** The picker's family order — straight from the descriptor registry. */
const FAMILY_ORDER: ChartFamily[] = familyOrder;

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
    <div className="cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4">
      <div className="cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur">
        <p className="cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium">Choose a chart type</p>
        <p className="cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground">
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
  const Icon = familyDescriptor(family).icon;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent"
          title="Change chart type"
        >
          <Icon className="cv:size-3.5 cv:text-muted-foreground" />
          {FAMILY_LABELS[family]}
          <ChevronDown className="cv:size-3 cv:text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3">
        <div className="cv:flex cv:flex-col cv:gap-1.5">
          <p className="cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground">Chart type</p>
          <TypeGrid family={family} onPick={setFamily} />
        </div>
        {/* The few remaining type-level options (stacking, donut, KPI, table…). Most
            config is in-context: per-measure on the field pills, chrome on the chart.
            Families with nothing left (line / combo / scatter) show no Options at all. */}
        {hasCustomizeOptions(family) ? (
          <div className="cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5">
            <p className="cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground">Options</p>
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
    <div className="cv:grid cv:grid-cols-4 cv:gap-1.5">
      {FAMILY_ORDER.map((f) => {
        const Icon = familyDescriptor(f).icon;
        const active = f === family;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onPick(f)}
            aria-pressed={active}
            className={cn(
              "cv:flex cv:flex-col cv:items-center cv:gap-1 cv:rounded-md cv:border cv:px-1 cv:py-2 cv:text-[10px] cv:transition-colors",
              active
                ? "cv:border-ring cv:bg-accent cv:text-foreground"
                : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground",
            )}
          >
            <Icon className="cv:size-4" />
            {FAMILY_LABELS[f]}
          </button>
        );
      })}
    </div>
  );
}
