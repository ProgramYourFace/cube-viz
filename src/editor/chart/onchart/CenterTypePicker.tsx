import * as React from "react";
import { ChevronDown } from "lucide-react";

import type { FamilyRegistry } from "@/charts";
import { useFamilyRegistry } from "@/provider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { ChartFamily, ChartSpec } from "@/spec";

import { migrateToFamily } from "../helpers";
import { CustomizeSection, hasCustomizeOptions } from "../builder/CustomizeSection";

export interface CenterTypePickerProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  /** No fields placed yet — show the prominent centered chooser + build hint. */
  empty: boolean;
}

/** Switch the chart family, carrying field bindings across (kpi/scatter/table
 *  store fields in familyOptions, so a plain reset would empty the new chart). */
function useSetFamily(
  spec: ChartSpec,
  update: (next: ChartSpec) => void,
  families: FamilyRegistry,
): (next: ChartFamily) => void {
  return (next: ChartFamily): void => {
    if (next === spec.chart.family) return;
    update(migrateToFamily(spec, next, families));
  };
}

/**
 * The EMPTY-state chart-type chooser — a prominent centered card overlaid on the
 * placeholder until the first field is placed. Built charts switch type via the
 * {@link ChartTypePill} in the editor toolbar instead (an on-chart pill was hard to
 * click — the live chart sat above it — so the control lives in real layout now).
 */
export function CenterTypePicker({ spec, update, empty }: CenterTypePickerProps): React.ReactElement | null {
  const families = useFamilyRegistry();
  const family = spec.chart.family;
  const setFamily = useSetFamily(spec, update, families);

  if (!empty) return null;
  return (
    <div className="cv-type-chooser">
      <div className="cv-type-chooser-card">
        <p className="cv-type-chooser-title">Choose a chart type</p>
        <p className="cv-type-chooser-sub">
          Then add fields to the slots around the chart.
        </p>
        <TypeGrid family={family} onPick={setFamily} families={families} />
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
  const families = useFamilyRegistry();
  const family = spec.chart.family;
  const setFamily = useSetFamily(spec, update, families);
  const descriptor = families.require(family);
  const Icon = descriptor.icon;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="cv-type-pill"
          title="Change chart type"
        >
          <Icon className="cv-ec-icon cv-ec-icon--muted" />
          {descriptor.label}
          <ChevronDown className="cv-ec-icon--sm cv-ec-icon--muted" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="cv-type-popover">
        <div className="cv-type-popover-section">
          <p className="cv-type-popover-heading">Chart type</p>
          <TypeGrid family={family} onPick={setFamily} families={families} />
        </div>
        {/* The few remaining type-level options (stacking, donut, KPI, table…). Most
            config is in-context: per-measure on the field pills, chrome on the chart.
            Families with nothing left (line / scatter) show no Options at all. */}
        {hasCustomizeOptions(family, families) ? (
          <div className="cv-type-popover-section cv-type-popover-section--divided">
            <p className="cv-type-popover-heading">Options</p>
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
  families: FamilyRegistry;
}

/** A 4-column tile grid of the chart families. */
function TypeGrid({ family, onPick, families }: TypeGridProps): React.ReactElement {
  return (
    <div className="cv-type-grid">
      {families.families().map((f) => {
        const Icon = families.require(f).icon;
        const active = f === family;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onPick(f)}
            aria-pressed={active}
            className={cn(
"cv-type-tile", active && "cv-type-tile--active",
            )}
          >
            <Icon className="cv-ec-icon--lg" />
            {families.require(f).label}
          </button>
        );
      })}
    </div>
  );
}
