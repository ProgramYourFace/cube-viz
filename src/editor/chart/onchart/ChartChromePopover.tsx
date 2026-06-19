import * as React from "react";
import { SlidersHorizontal } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { ChartSpec, CubeQuery } from "@/spec";

import { CustomizeSection } from "../builder/CustomizeSection";
import { FilterBuilder } from "../FilterBuilder";

export interface ChartChromePopoverProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  cube?: string;
  /** Joinable tables for cross-table filtering (filter by any field in the join graph). */
  scopeCubes?: string[];
}

/**
 * The chart's "chrome" menu (top-right ⋯): the reused {@link CustomizeSection}
 * (stack / orientation / donut / curve …) and {@link FilterBuilder}, both unchanged.
 * Everything that isn't a field-on-an-axis lives here, off the chart surface.
 */
export function ChartChromePopover({
  spec,
  update,
  cube,
  scopeCubes,
}: ChartChromePopoverProps): React.ReactElement {
  const { query } = spec;
  const onFiltersChange = (filters: CubeQuery["filters"]): void =>
    update({ ...spec, query: { ...query, filters } });

  return (
    <Popover>
      <PopoverTrigger
        className="flex size-8 items-center justify-center rounded-md border border-border bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent hover:text-foreground"
        title="Chart options"
        aria-label="Chart options"
      >
        <SlidersHorizontal className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex max-h-[70vh] w-72 flex-col gap-3 overflow-y-auto p-3">
        <section className="flex flex-col gap-1.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Options
          </p>
          <CustomizeSection spec={spec} update={update} />
        </section>
        <section className="flex flex-col gap-1.5 border-t border-border pt-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Filters
          </p>
          <FilterBuilder cube={cube} cubes={scopeCubes} value={query.filters} onChange={onFiltersChange} />
        </section>
      </PopoverContent>
    </Popover>
  );
}
