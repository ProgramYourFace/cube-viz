import * as React from "react";

import { cn } from "@/components/ui/utils";

import type { DragPayload, FieldDrag } from "./useFieldDrag";
import type { FieldKind, WellDef } from "./wells";

export interface WellProps {
  def: WellDef;
  /** Whether the well currently holds at least one chip (drives empty-state copy). */
  filled: boolean;
  drag: FieldDrag;
  /** Called when a legal field is dropped into this well. */
  onDrop: (payload: DragPayload) => void;
  /**
   * A small axis-unit badge (e.g. "Distance (km)") shown beside the label so the
   * per-axis consistency constraint is visible. Undefined = no constraint/empty.
   */
  badge?: string;
  /**
   * Whether the CURRENTLY-dragged field is unit-compatible with this well's axis.
   * Defaults to true (no constraint). When false, the well won't highlight/accept a
   * drop even if the kind matches — incompatible units are rejected.
   */
  acceptsDrag?: boolean;
  /** Placed chips for this well. */
  children?: React.ReactNode;
}

/** Whether a dragged field's kind is legal for this well. */
function accepts(def: WellDef, kind: FieldKind | undefined): boolean {
  return kind !== undefined && def.kinds.includes(kind);
}

/**
 * One typed slot (docs/05 §6): a label + hint, a kind-gated drop target that
 * highlights only when the dragged field is legal AND unit-compatible with the
 * axis, an optional axis-unit badge, empty-state microcopy, and the placed
 * {@link Chip}s. Cardinality is enforced by the caller (one-wells replace,
 * many-wells append) — the well just renders and accepts.
 */
export function Well({
  def,
  filled,
  drag,
  onDrop,
  badge,
  acceptsDrag = true,
  children,
}: WellProps): React.ReactElement {
  const [over, setOver] = React.useState(false);
  // Legal = right kind AND (when an axis constraint applies) unit-compatible.
  const legal = accepts(def, drag.dragging?.kind) && acceptsDrag;
  const dimmed = drag.dragging !== null && !legal;

  return (
    <div data-slot="well" className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1.5">
        <span className="text-xs font-medium text-foreground">{def.label}</span>
        {badge ? (
          <span
            className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            title={`This axis shows ${badge}; all fields here must match`}
          >
            {badge}
          </span>
        ) : null}
        {def.optional ? (
          <span className="text-[10px] text-muted-foreground">optional</span>
        ) : null}
        {def.hint ? <span className="text-[10px] text-muted-foreground">· {def.hint}</span> : null}
      </div>

      <div
        onDragOver={(e) => {
          if (!legal) return;
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          if (legal && drag.dragging) onDrop(drag.dragging);
          drag.end();
        }}
        className={cn(
          "flex min-h-9 flex-col gap-1 rounded-md border border-dashed border-input p-1 transition-colors",
          over && legal && "border-primary bg-primary/5",
          legal && drag.dragging !== null && !over && "border-primary/50",
          dimmed && "opacity-40",
        )}
      >
        {filled ? (
          children
        ) : (
          <div className="flex min-h-7 items-center px-1.5 text-xs text-muted-foreground">
            {legal && drag.dragging ? "Drop here" : "Drag or click a field to add"}
          </div>
        )}
      </div>
    </div>
  );
}
