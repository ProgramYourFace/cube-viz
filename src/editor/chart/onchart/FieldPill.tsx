import * as React from "react";
import { GripVertical, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import { useFamilyRegistry } from "@/provider";
import type { ChartColorToken, ChartSpec } from "@/spec";
import { granularityOptionsFor } from "@/variables";

import { ColorTokenPicker } from "../../primitives/ColorTokenPicker";
import { GranularityPicker } from "../../primitives/GranularityPicker";
import { Switch } from "../../primitives/SwitchRow";
import { memberTypeIcon } from "../../primitives/MemberPicker";
import type { MemberOption } from "../../primitives/meta-helpers";
import type { WellDef } from "../builder/wells";
import { chipBindings } from "./chip-bindings";
import { DateRangeValueEditor } from "../binding/DateRangeValueEditor";
import { ValueBinding } from "../binding/ValueBinding";

/**
 * Reordering for a many-cardinality well. Order is meaningful — it is the series
 * order (draw order, legend order, stack order) — so the pills ARE the control:
 * you drag one to where it belongs, the same HTML5 pattern
 * {@link MemberMultiPicker} already uses for its ordered list.
 *
 * The drag session is owned by the WELL, not the pill, because a drag is a
 * conversation between two pills: the one being carried and the one it is over.
 * Alt+↑/↓ does the same move from the keyboard, since a drag alone would put
 * ordering out of reach for anyone not using a pointer.
 */
export interface PillReorder {
  /** This pill's position in the well. */
  index: number;
  /** How many pills the well holds (the last one cannot move down). */
  total: number;
  /** True while THIS pill is the one being dragged. */
  dragging: boolean;
  onDragStart: () => void;
  /** The pointer is over this pill mid-drag — the well moves the carried pill here. */
  onDragOver: () => void;
  onDragEnd: () => void;
  /** Keyboard equivalent: move one slot up (-1) or down (+1). */
  onMove: (delta: -1 | 1) => void;
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

/**
 * A placed-field token (on-chart). The body opens a context popover with every
 * relevant control for the field (rename, colour, granularity, move, remove); a
 * quick × removes it. The colour swatch is the resolved series colour — the
 * single source of truth shared with the renderer — so it never lies.
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
  const families = useFamilyRegistry();
  const b = chipBindings(spec, update, well, member, option, families);
  // Ids for the config popover's controls: each visible caption is a real
  // `<label htmlFor>` pointing at its field, so every control has an accessible name
  // (a wrapping label alone left the fields anonymous to autofill + Chrome's audit).
  const renameId = React.useId();
  const sortId = React.useId();
  const sortLabelId = React.useId();
  const limitId = React.useId();
  const compareId = React.useId();
  const dotsId = React.useId();
  const defaultLabel = option?.label ?? member;
  const display = b.label || defaultLabel;
  const showSwatch = b.canColor && resolvedColor !== undefined;
  // Whether the field has anything to configure; if not, the pill is just a label + ×.
  // Reordering is NOT config — it is the pill's own drag behaviour — so it does not
  // count towards opening a popover.
  const hasConfig =
    b.canRename || showSwatch || b.isTimeField || b.isCategoryField || b.canPoints;

  const commitRename = (value: string): void => {
    const trimmed = value.trim();
    b.onRename(trimmed.length > 0 ? trimmed : undefined);
  };

  // Alt+↑/↓ from the focused pill — the keyboard equivalent of dragging it.
  const onReorderKey = (e: React.KeyboardEvent): void => {
    if (!reorder || !e.altKey) return;
    if (e.key === "ArrowUp" && reorder.index > 0) {
      e.preventDefault();
      reorder.onMove(-1);
    } else if (e.key === "ArrowDown" && reorder.index < reorder.total - 1) {
      e.preventDefault();
      reorder.onMove(1);
    }
  };

  const inner = (
    <>
      {reorder ? <GripVertical className="cv-field-pill-grip" aria-hidden /> : null}
      {showSwatch ? (
        <span
          className="cv-field-pill-swatch"
          style={{ backgroundColor: `var(--${resolvedColor})` }}
          aria-hidden
        />
      ) : option ? (
        memberTypeIcon(option.type)
      ) : null}
      <span className="cv-field-pill-name">{display}</span>
    </>
  );

  const reorderHint = reorder ? " · drag to reorder (Alt+↑/↓)" : "";

  return (
    <div
      data-slot="field-pill"
      className={cn("cv-field-pill", reorder?.dragging && "cv-field-pill--dragging", className)}
      // `draggable` on the WRAPPER makes the whole pill the drag source (the body is a
      // button, and the nearest draggable ancestor is what the browser picks up), so
      // there is no thin grip strip to hit — the grip icon is the affordance, not the
      // target.
      draggable={!!reorder}
      onDragStart={reorder?.onDragStart}
      onDragOver={
        reorder
          ? (e) => {
              // Without preventDefault the element is not a valid drop target and the
              // browser shows the "no drop" cursor over it.
              e.preventDefault();
              reorder.onDragOver();
            }
          : undefined
      }
      onDragEnd={reorder?.onDragEnd}
      onKeyDown={reorder ? onReorderKey : undefined}
    >
      {!hasConfig ? (
        // Nothing to configure, but a reorderable pill still has to be REACHABLE for
        // the keyboard move to exist at all — so it takes focus even without a popover.
        <span
          className="cv-field-pill-body"
          title={`${display}${reorderHint}`}
          {...(reorder
            ? {
                tabIndex: 0,
                "aria-label": `${display}, position ${reorder.index + 1} of ${reorder.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown",
              }
            : {})}
        >
          {inner}
        </span>
      ) : (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="cv-field-pill-body cv-field-pill-trigger"
            title={`Edit ${display}${reorderHint}`}
            {...(reorder
              ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" }
              : {})}
          >
            {inner}
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="cv-field-pill-popover">
          <div className="cv-field-pill-config">
            {b.canRename ? (
              <label className="cv-ec-field" htmlFor={renameId}>
                <span className="cv-ec-label">Label</span>
                <Input
                  id={renameId}
                  defaultValue={b.label ?? ""}
                  placeholder={defaultLabel}
                  className="cv-ec-h8"
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
              <div className="cv-ec-field cv-ec-field--loose">
                <span className="cv-ec-label">Color</span>
                <ColorTokenPicker value={b.colorToken} onChange={b.onRecolor} />
              </div>
            ) : null}

            {b.isTimeField ? (
              <>
                <div className="cv-ec-field cv-ec-field--loose">
                  <span className="cv-ec-label">Date range</span>
                  <ValueBinding
                    kind="dateRange"
                    value={b.dateRange}
                    onChange={b.onDateRange}
                    renderFixed={(r, set) => <DateRangeValueEditor value={r} onChange={set} />}
                  />
                </div>
                <div className="cv-ec-field cv-ec-field--loose">
                  <span className="cv-ec-label">Group dates by</span>
                  <ValueBinding
                    kind="granularity"
                    value={b.granularity}
                    onChange={b.onGranularity}
                    renderFixed={(g, set) => (
                      <GranularityPicker
                        value={g}
                        onChange={set}
                        // Same rail as the KPI trend: only buckets that divide the date
                        // range set right above into a readable number of points.
                        options={granularityOptionsFor(b.dateRange)}
                        className="cv-ec-h8 cv-ec-full"
                      />
                    )}
                  />
                </div>
                {b.canComparePrevious ? (
                  <div className="cv-ec-field">
                    <label className="cv-ec-row" htmlFor={compareId}>
                      <span className="cv-ec-label">
                        Compare to previous period
                      </span>
                      <Switch
                        id={compareId}
                        checked={b.comparePrevious}
                        onChange={b.onComparePrevious}
                        aria-label="Compare to previous period"
                      />
                    </label>
                    {b.comparePrevious && !b.comparePreviousReady ? (
                      <p className="cv-ec-hint">
                        Set a date range above to show the previous period.
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : null}

            {b.isCategoryField ? (
              <>
                <label className="cv-ec-field cv-ec-field--loose" htmlFor={sortId}>
                  <span id={sortLabelId} className="cv-ec-label">Sort</span>
                  <select
                    id={sortId}
                    // The caption sits INSIDE the label, so a bare `for` association
                    // would fold every <option> into the accessible name; point at the
                    // caption instead to keep the name exactly "Sort".
                    aria-labelledby={sortLabelId}
                    value={b.sortValue}
                    onChange={(e) => b.onSort(e.target.value as typeof b.sortValue)}
                    className="cv-field-pill-select"
                  >
                    {b.sortOptions.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="cv-ec-field cv-ec-field--loose" htmlFor={limitId}>
                  <span className="cv-ec-label">
                    Show top (leave blank for all)
                  </span>
                  <Input
                    id={limitId}
                    type="number"
                    min={1}
                    defaultValue={b.limit ?? ""}
                    placeholder="All"
                    className="cv-ec-h8"
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

            {b.canPoints ? (
              <label className="cv-ec-row" htmlFor={dotsId}>
                <span className="cv-ec-label">Show points</span>
                <Switch id={dotsId} checked={b.dots === true} onChange={b.onDots} aria-label="Show points" />
              </label>
            ) : null}

            <Button
              variant="ghost"
              size="sm"
              className="cv-field-pill-remove"
              onClick={b.onRemove}
            >
              <X className="cv-ec-icon" />
              Remove
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="cv-ec-remove cv-ec-remove--6"
        onClick={b.onRemove}
        aria-label={`Remove ${display}`}
      >
        <X className="cv-ec-icon" />
      </Button>
    </div>
  );
}
