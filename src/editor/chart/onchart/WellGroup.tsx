import * as React from "react";
import { Plus } from "lucide-react";

import { cn } from "@/components/ui/utils";
import type { ChartColorToken, ChartSpec } from "@/spec";

import { EditorErrorBoundary } from "../../primitives/EditorErrorBoundary";
import type { MemberOption } from "../../primitives/meta-helpers";
import { placementBlockReason, wellAccepts } from "../builder/channels";
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
  /** Swap controls for a placed member (picker-in-place + aggregation segments). */
  swapFor?: (member: string) => import("./FieldPill").PillSwapControls | undefined;
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
  swapFor,
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
  // Order is meaningful only where a well holds several fields at once.
  const reorderable = many && total > 1 && !disableReorder;
  // The in-flight drag lives on the WELL: it is the only thing that sees both the
  // pill being carried and the pill it is over.
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);

  // What this slot takes, in the SAME words the picker uses to refuse a field
  // ("Horizontal axis needs a date or category"), so the add button and the greyed-out rows
  // inside it never disagree. A well that takes everything (a table column) has
  // nothing to refuse, so it falls back to its own hint.
  const takesHint =
    (["number", "category", "time"] as FieldKind[])
      .filter((k) => !wellAccepts(well, k))
      .map((k) => placementBlockReason(well, k, placed))
      .find((r): r is string => r !== undefined) ?? well.hint;

  // Nothing on the chart yet: name the ONE move that gets the user started, in the
  // strip they are looking at. Anchored to the required value slot (the measure is
  // what every family needs first), so it appears exactly once.
  const startHint =
    allPlaced.length === 0 && !well.optional && wellAccepts(well, "number")
      ? "Pick a number to get started"
      : undefined;

  const addSlot = (
    <FieldPickerPopover
      well={well}
      placed={allPlaced}
      inWell={placed}
      scope={scope}
      blockReason={blockReason}
      onSelect={onAdd}
      side={pickerSide ?? (vertical ? "right" : "top")}
      align={pickerAlign ?? "start"}
    >
      <button
        type="button"
        title={takesHint}
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

      {/* One well is a self-contained thought, so it is also the unit of failure:
          a pill that cannot render its field's options says so here, and the other
          wells (and the chart) keep working. */}
      <EditorErrorBoundary label={groupLabel} resetKey={spec}>
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
              getSwap={swapFor ? () => swapFor(member) : undefined}
              className={vertical ? "cv-field-pill--full" : undefined}
              reorder={
                reorderable
                  ? {
                      index: i,
                      total,
                      dragging: dragIndex === i,
                      onDragStart: () => setDragIndex(i),
                      // Live reorder: the list rearranges UNDER the pointer as it
                      // passes each neighbour, so the drop is just letting go of
                      // what you already see. `dragIndex` follows the carried pill
                      // to its new slot, which is what makes the next crossing
                      // compare against the right position.
                      onDragOver: () => {
                        if (dragIndex === null || dragIndex === i) return;
                        update(reorderWell(spec, well, dragIndex, i));
                        setDragIndex(i);
                      },
                      onDragEnd: () => setDragIndex(null),
                      onMove: (delta) => update(reorderWell(spec, well, i, i + delta)),
                    }
                  : undefined
              }
            />
          ))}
          {showAdd ? addSlot : null}
        </div>
      </EditorErrorBoundary>

      {startHint ? <p className="cv-ec-hint cv-well-start-hint">{startHint}</p> : null}

      {note ? (
        <p className="cv-ec-hint cv-well-note">{note}</p>
      ) : null}
    </div>
  );
}
