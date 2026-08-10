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
  /** A small explanatory note rendered under the fields (e.g. the split series-count). */
  note?: string;
  /** Popover anchoring for this well's add-slot. */
  pickerSide?: "top" | "bottom" | "left" | "right";
  pickerAlign?: "start" | "center" | "end";
  /**
   * An in-context control rendered directly ABOVE this well's fields (under the group
   * label) — e.g. the axis-title text box for a value/category well. Keeps each chrome
   * control next to the fields it describes.
   */
  control?: React.ReactNode;
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
  note,
  pickerSide,
  pickerAlign,
  control,
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
          "cv-well-add",
          vertical && "cv-well-add--full",
        )}
      >
        <Plus className="cv-ec-icon" />
        {placed.length === 0 ? groupLabel : "Add"}
      </button>
    </FieldPickerPopover>
  );

  return (
    <div
      data-slot="well-group"
      className={cn("cv-well-group", !vertical && "cv-well-group--h")}
    >
      <div className="cv-well-header">
        <span className="cv-ec-truncate">{groupLabel}</span>
        {badge ? (
          <span className="cv-well-badge">
            {badge}
          </span>
        ) : null}
        {well.optional && placed.length === 0 ? (
          <span className="cv-well-optional">(optional)</span>
        ) : null}
      </div>

      {control ? <div className="cv-well-control">{control}</div> : null}

      <div className={cn("cv-well-fields", vertical ? "cv-well-fields--v" : "cv-well-fields--h")}>
        {placed.map((member, i) => (
          <FieldPill
            key={member}
            spec={spec}
            update={update}
            well={well}
            member={member}
            option={optionFor(member)}
            resolvedColor={colorFor(member)}
            className={vertical ? "cv-field-pill--full" : undefined}
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

      {note ? (
        <p className="cv-ec-hint cv-well-note">{note}</p>
      ) : null}
    </div>
  );
}
