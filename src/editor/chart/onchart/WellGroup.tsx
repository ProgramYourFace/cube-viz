import * as React from "react";
import { Plus } from "lucide-react";

import { cn } from "@/components/ui/utils";
import type { ChartColorToken, ChartSpec } from "@/spec";

import type { MemberOption } from "../../primitives/meta-helpers";
import type { FieldKind, WellDef } from "../builder/wells";
import { reorderWell } from "./chip-bindings";
import { FieldPickerPopover } from "./FieldPickerPopover";
import { FieldPill } from "./FieldPill";
import type { JoinScope } from "./join-scope";

export interface WellGroupProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  well: WellDef;
  /** Members currently in this well, in order. */
  placed: string[];
  /** Every member placed anywhere in the chart — hidden from the picker. */
  allPlaced: string[];
  /** Resolve a member's option (label/icon/unit). */
  optionFor: (member: string) => MemberOption | undefined;
  /** Resolve a member's display series colour, when meaningful. */
  colorFor: (member: string) => ChartColorToken | undefined;
  /** Cross-table scope (source/related tables + views) for the field picker. */
  scope: JoinScope;
  /** Block reason for this well (cross-dataset / measure-source / axis-unit). */
  blockReason: (option: MemberOption) => string | undefined;
  /** Place a field into this well. */
  onAdd: (name: string, kind: FieldKind) => void;
  /** The axis unit badge (e.g. "Distance (km)") for enforcing value wells. */
  badge?: string;
  orientation: "vertical" | "horizontal";
  /** Force single-field behaviour on a many-well (e.g. a Y axis under a color split). */
  lockedSingle?: boolean;
  /** Disable reorder (e.g. an axis sub-group renders a filtered subset of one well). */
  disableReorder?: boolean;
  /** Label override (e.g. "Left axis" / "Right axis" for a split value well). */
  label?: string;
  /** Popover anchoring for this well's add-slot. */
  pickerSide?: "top" | "bottom" | "left" | "right";
  pickerAlign?: "start" | "center" | "end";
  /**
   * An in-context control rendered directly beneath this well's fields — e.g. the
   * axis-label text box for a value/category well, or the legend toggle for a split
   * well. Keeps each chrome control next to the fields it describes.
   */
  footer?: React.ReactNode;
}

/**
 * A single well rendered as on-chart SLOTS: a label, each placed field as a
 * {@link FieldPill} (reorderable for many-cardinality wells), and a trailing
 * "add field" slot that opens the {@link FieldPickerPopover}. The vertical
 * orientation is the left Y-axis strip; the horizontal one is the bottom X bar.
 */
export function WellGroup({
  spec,
  update,
  well,
  placed,
  allPlaced,
  optionFor,
  colorFor,
  scope,
  blockReason,
  onAdd,
  badge,
  orientation,
  lockedSingle,
  disableReorder,
  label,
  pickerSide,
  pickerAlign,
  footer,
}: WellGroupProps): React.ReactElement {
  // A color split makes the Y axis single-measure; treat the well as one-cardinality.
  const many = well.cardinality === "many" && !lockedSingle;
  // One-wells stop offering an add-slot once filled; many-wells always invite more.
  const showAdd = many || placed.length === 0;
  const total = placed.length;
  const vertical = orientation === "vertical";
  const groupLabel = label ?? well.label;

  const addSlot = (
    <FieldPickerPopover
      well={well}
      placed={allPlaced}
      scope={scope}
      blockReason={blockReason}
      onSelect={onAdd}
      side={pickerSide ?? (vertical ? "right" : "top")}
      align={pickerAlign ?? "start"}
    >
      <button
        type="button"
        className={cn(
          "flex items-center justify-center gap-1 rounded-md border border-dashed border-input bg-background/60 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-foreground",
          vertical && "w-full",
        )}
      >
        <Plus className="size-3.5" />
        {placed.length === 0 ? groupLabel : "Add"}
      </button>
    </FieldPickerPopover>
  );

  return (
    <div
      data-slot="well-group"
      className={cn("flex flex-col gap-1", !vertical && "min-w-0")}
    >
      <div className="flex items-center gap-1.5 px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        <span className="truncate">{groupLabel}</span>
        {badge ? (
          <span className="truncate rounded-sm bg-muted px-1 py-px text-[9px] normal-case text-muted-foreground">
            {badge}
          </span>
        ) : null}
        {well.optional && placed.length === 0 ? (
          <span className="normal-case text-muted-foreground/70">(optional)</span>
        ) : null}
      </div>

      <div className={cn("flex gap-1", vertical ? "flex-col" : "flex-row flex-wrap items-center")}>
        {placed.map((member, i) => (
          <FieldPill
            key={member}
            spec={spec}
            update={update}
            well={well}
            member={member}
            option={optionFor(member)}
            resolvedColor={colorFor(member)}
            className={vertical ? "w-full" : undefined}
            reorder={
              many && total > 1 && !disableReorder
                ? {
                    canUp: i > 0,
                    canDown: i < total - 1,
                    onUp: () => update(reorderWell(spec, well, i, i - 1)),
                    onDown: () => update(reorderWell(spec, well, i, i + 1)),
                  }
                : undefined
            }
          />
        ))}
        {showAdd ? addSlot : null}
      </div>

      {footer ? <div className="pt-0.5">{footer}</div> : null}
    </div>
  );
}
