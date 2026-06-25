import * as React from "react";
import { ArrowDown, ArrowUp, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { ChartColorToken, ChartSpec } from "@/spec";

import { ColorTokenPicker } from "../../primitives/ColorTokenPicker";
import { GranularityPicker } from "../../primitives/GranularityPicker";
import { Switch } from "../../primitives/SwitchRow";
import { memberTypeIcon } from "../../primitives/MemberPicker";
import type { MemberOption } from "../../primitives/meta-helpers";
import type { WellDef } from "../builder/wells";
import { chipBindings, type ComboRender, type LineCurve } from "./chip-bindings";
import { DateRangeValueEditor } from "../binding/DateRangeValueEditor";
import { ValueBinding } from "../binding/ValueBinding";

export interface PillReorder {
  canUp: boolean;
  canDown: boolean;
  onUp: () => void;
  onDown: () => void;
}

export interface FieldPillProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  well: WellDef;
  member: string;
  option?: MemberOption;
  /**
   * The RESOLVED display color (ramp-or-explicit) when one rendered series ↔ this
   * field; drives the swatch so it always matches the chart. Undefined → show the
   * member-type icon instead (pivot / pie / scatter where colour is per-datum).
   */
  resolvedColor?: ChartColorToken;
  /** Reorder affordance for many-cardinality wells. */
  reorder?: PillReorder;
  /** Compact (bottom-bar) vs. full (left strip). */
  className?: string;
}

const RENDER_LABELS: Record<ComboRender, string> = { bar: "Bar", line: "Line", area: "Area" };
const LINE_SHAPES: ReadonlyArray<readonly [LineCurve, string]> = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"],
];

/**
 * A placed-field token (on-chart). The body opens a context popover with every
 * relevant control for the field (rename, colour, granularity, combo render, move,
 * remove); a quick × removes it. The colour swatch is the resolved series colour —
 * the single source of truth shared with the renderer — so it never lies.
 */
export function FieldPill({
  spec,
  update,
  well,
  member,
  option,
  resolvedColor,
  reorder,
  className,
}: FieldPillProps): React.ReactElement {
  const b = chipBindings(spec, update, well, member, option);
  const defaultLabel = option?.label ?? member;
  const display = b.label || defaultLabel;
  const showSwatch = b.canColor && resolvedColor !== undefined;
  // Whether the field has anything to configure; if not, the pill is just a label + ×.
  const hasConfig =
    b.canRename ||
    showSwatch ||
    b.isTimeField ||
    b.isCategoryField ||
    (b.isComboY && !!b.render) ||
    b.canAxis ||
    b.canLineStyle ||
    !!reorder;

  const commitRename = (value: string): void => {
    const trimmed = value.trim();
    b.onRename(trimmed.length > 0 ? trimmed : undefined);
  };

  const inner = (
    <>
      {showSwatch ? (
        <span
          className="cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10"
          style={{ backgroundColor: `var(--${resolvedColor})` }}
          aria-hidden
        />
      ) : option ? (
        memberTypeIcon(option.type)
      ) : null}
      <span className="cv:min-w-0 cv:flex-1 cv:truncate">{display}</span>
    </>
  );

  return (
    <div
      data-slot="field-pill"
      className={cn(
        "cv:flex cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:py-1 cv:pl-2 cv:pr-1 cv:text-sm cv:shadow-sm",
        className,
      )}
    >
      {!hasConfig ? (
        <span className="cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5" title={display}>
          {inner}
        </span>
      ) : (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm"
            title={`Edit ${display}`}
          >
            {inner}
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="cv:w-60 cv:p-3">
          <div className="cv:flex cv:flex-col cv:gap-3">
            {b.canRename ? (
              <label className="cv:flex cv:flex-col cv:gap-1">
                <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Label</span>
                <Input
                  defaultValue={b.label ?? ""}
                  placeholder={defaultLabel}
                  className="cv:h-8"
                  onBlur={(e) => commitRename(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      commitRename((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                />
              </label>
            ) : null}

            {showSwatch ? (
              <div className="cv:flex cv:flex-col cv:gap-1.5">
                <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Color</span>
                <ColorTokenPicker value={b.colorToken} onChange={b.onRecolor} />
              </div>
            ) : null}

            {b.isTimeField ? (
              <>
                <div className="cv:flex cv:flex-col cv:gap-1.5">
                  <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Date range</span>
                  <ValueBinding
                    kind="dateRange"
                    value={b.dateRange}
                    onChange={b.onDateRange}
                    renderFixed={(r, set) => <DateRangeValueEditor value={r} onChange={set} />}
                  />
                </div>
                <div className="cv:flex cv:flex-col cv:gap-1.5">
                  <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Group dates by</span>
                  <ValueBinding
                    kind="granularity"
                    value={b.granularity}
                    onChange={b.onGranularity}
                    renderFixed={(g, set) => (
                      <GranularityPicker value={g} onChange={set} className="cv:h-8 cv:w-full" />
                    )}
                  />
                </div>
                {b.canComparePrevious ? (
                  <div className="cv:flex cv:flex-col cv:gap-1">
                    <label className="cv:flex cv:items-center cv:justify-between cv:gap-2">
                      <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">
                        Compare to previous period
                      </span>
                      <Switch
                        checked={b.comparePrevious}
                        onChange={b.onComparePrevious}
                        aria-label="Compare to previous period"
                      />
                    </label>
                    {b.comparePrevious && !b.comparePreviousReady ? (
                      <p className="cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80">
                        Set a date range above to show the previous period.
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : null}

            {b.isCategoryField ? (
              <>
                <label className="cv:flex cv:flex-col cv:gap-1.5">
                  <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Sort</span>
                  <select
                    value={b.sortValue}
                    onChange={(e) => b.onSort(e.target.value as typeof b.sortValue)}
                    className="cv:h-8 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-sm cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
                  >
                    {b.sortOptions.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="cv:flex cv:flex-col cv:gap-1.5">
                  <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">
                    Show top (leave blank for all)
                  </span>
                  <Input
                    type="number"
                    min={1}
                    defaultValue={b.limit ?? ""}
                    placeholder="All"
                    className="cv:h-8"
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      b.onLimit(v === "" ? undefined : Number(v));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const v = (e.target as HTMLInputElement).value.trim();
                        b.onLimit(v === "" ? undefined : Number(v));
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                  />
                </label>
              </>
            ) : null}

            {b.isComboY && b.render ? (
              <div className="cv:flex cv:flex-col cv:gap-1.5">
                <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Draw as</span>
                <div className="cv:flex cv:gap-1">
                  {(Object.keys(RENDER_LABELS) as ComboRender[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => b.onRender(r)}
                      className={cn(
                        "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                        b.render === r
                          ? "cv:border-ring cv:bg-accent"
                          : "cv:border-input cv:hover:bg-accent/50",
                      )}
                    >
                      {RENDER_LABELS[r]}
                      {b.render === r ? <Check className="cv:size-3" /> : null}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {b.canAxis ? (
              <div className="cv:flex cv:flex-col cv:gap-1.5">
                <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Side</span>
                <div className="cv:flex cv:gap-1">
                  {(["left", "right"] as const).map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => b.onAxis(side)}
                      className={cn(
                        "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize",
                        b.axis === side ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50",
                      )}
                    >
                      {side}
                      {b.axis === side ? <Check className="cv:size-3" /> : null}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {b.canLineStyle ? (
              <>
                <div className="cv:flex cv:flex-col cv:gap-1.5">
                  <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Line shape</span>
                  <div className="cv:grid cv:grid-cols-2 cv:gap-1">
                    {LINE_SHAPES.map(([v, lbl]) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => b.onCurve(v)}
                        className={cn(
                          "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                          (b.curve ?? "cv:monotone") === v ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50",
                        )}
                      >
                        {lbl}
                        {(b.curve ?? "monotone") === v ? <Check className="cv:size-3" /> : null}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="cv:flex cv:items-center cv:justify-between cv:gap-2">
                  <span className="cv:text-[11px] cv:font-medium cv:text-muted-foreground">Show points</span>
                  <Switch checked={b.dots === true} onChange={b.onDots} aria-label="Show points" />
                </label>
              </>
            ) : null}

            {reorder ? (
              <div className="cv:flex cv:items-center cv:gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="cv:h-8 cv:flex-1"
                  disabled={!reorder.canUp}
                  onClick={reorder.onUp}
                >
                  <ArrowUp className="cv:size-3.5" />
                  Up
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cv:h-8 cv:flex-1"
                  disabled={!reorder.canDown}
                  onClick={reorder.onDown}
                >
                  <ArrowDown className="cv:size-3.5" />
                  Down
                </Button>
              </div>
            ) : null}

            <Button
              variant="ghost"
              size="sm"
              className="cv:h-8 cv:justify-start cv:text-destructive cv:hover:text-destructive"
              onClick={b.onRemove}
            >
              <X className="cv:size-3.5" />
              Remove
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive"
        onClick={b.onRemove}
        aria-label={`Remove ${display}`}
      >
        <X className="cv:size-3.5" />
      </Button>
    </div>
  );
}
