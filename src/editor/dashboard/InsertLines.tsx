import * as React from "react";
import { BarChart3, Plus, SlidersHorizontal, Type } from "lucide-react";

import type { WidgetSpec } from "@/spec";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";

import { rowBoundaryTop, type EditorGridMetrics } from "./layout";

/**
 * Insert lines — the in-context "add a widget HERE" affordance that replaced the
 * toolbar's Chart/Text/Input buttons (which always dropped the newcomer at the bottom,
 * nowhere near where the user was looking).
 *
 * One invisible line sits at every ROW BOUNDARY of the current layout (the top, every
 * item's bottom edge, and so the bottom of the board). Bring the pointer within
 * {@link HIT_BAND} px of one and it fades in as a hairline with a round `+`; the `+`
 * opens a three-item menu (Chart · Text · Input) that inserts at THAT row.
 *
 * Hit-testing is done by MEASURING the pointer against the boundary offsets rather
 * than by laying transparent hit bands over the canvas: a band tall enough to be
 * catchable would overlap the widgets above and below it and swallow their drags and
 * corner resizes. So the whole layer is `pointer-events: none` and only the ACTIVE
 * line's button takes clicks. The layer is also hidden outright while RGL has a
 * drag/resize in flight (`disabled`), so a line can never flicker under a moving widget.
 */

/** How close (px) the pointer must come to a boundary for its line to appear. */
const HIT_BAND = 10;

export interface InsertLinesProps {
  /** Row boundaries (grid units) an insert can target — see `rowBoundaries()`. */
  rows: readonly number[];
  /** The canvas' effective cell metrics; converts a row to a pixel offset. */
  metrics: EditorGridMetrics;
  /** The element the pointer is tracked against (the canvas the layer covers). */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Insert a fresh widget of `kind` at row `rowY`. */
  onInsert: (kind: WidgetSpec["type"], rowY: number) => void;
  /** Hide everything (a drag/resize is in flight). */
  disabled?: boolean;
}

const KINDS: { kind: WidgetSpec["type"]; label: string; Icon: typeof BarChart3 }[] = [
  { kind: "chart", label: "Chart", Icon: BarChart3 },
  { kind: "text", label: "Text", Icon: Type },
  { kind: "input", label: "Input", Icon: SlidersHorizontal },
];

export function InsertLines({
  rows,
  metrics,
  containerRef,
  onInsert,
  disabled,
}: InsertLinesProps): React.ReactElement | null {
  // The line under the pointer, and the one whose menu is open. An open menu PINS its
  // line visible — the pointer has left the band to reach the menu by then.
  const [hoverRow, setHoverRow] = React.useState<number | null>(null);
  const [menuRow, setMenuRow] = React.useState<number | null>(null);

  const tops = React.useMemo(
    () => rows.map((row) => ({ row, top: rowBoundaryTop(row, metrics) })),
    [rows, metrics],
  );
  // Read by the pointer listener so it never re-binds as the layout changes.
  const topsRef = React.useRef(tops);
  topsRef.current = tops;

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const onMove = (e: PointerEvent): void => {
      const box = el.getBoundingClientRect();
      const y = e.clientY - box.top;
      let best: number | null = null;
      let bestDist = HIT_BAND;
      for (const { row, top } of topsRef.current) {
        const dist = Math.abs(y - top);
        if (dist <= bestDist) {
          best = row;
          bestDist = dist;
        }
      }
      setHoverRow(best);
    };
    const onLeave = (): void => setHoverRow(null);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, disabled]);

  // A drag starting mid-hover would otherwise leave a line stranded on screen.
  React.useEffect(() => {
    if (disabled) {
      setHoverRow(null);
      setMenuRow(null);
    }
  }, [disabled]);

  if (disabled) return null;

  return (
    <div aria-hidden={false} data-slot="insert-lines" className="cv-insert-lines">
      {tops.map(({ row, top }) => {
        const active = menuRow === row || hoverRow === row;
        return (
          <div
            key={row}
            style={{ top }}
            className={cn("cv-insert-line", active && "cv-insert-line--active")}
          >
            <span className="cv-insert-line-rule" />
            <Popover
              open={menuRow === row}
              onOpenChange={(open) => setMenuRow(open ? row : null)}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label={`Insert a widget at row ${row}`}
                  // Only the visible line takes clicks; the rest of the layer stays
                  // transparent to the pointer so drags and resizes pass through.
                  tabIndex={active ? 0 : -1}
                  className="cv-insert-line-button"
                >
                  <Plus />
                </button>
              </PopoverTrigger>
              <PopoverContent align="center" side="bottom" className="cv-insert-menu">
                {KINDS.map(({ kind, label, Icon }) => (
                  <button
                    key={kind}
                    type="button"
                    className="cv-insert-menu-item"
                    onClick={() => {
                      setMenuRow(null);
                      setHoverRow(null);
                      onInsert(kind, row);
                    }}
                  >
                    <Icon />
                    {label}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The empty board: no widgets, so there is nothing to hover a line against. Three
 * large tiles add the first one (the same three kinds the insert menu offers).
 */
export function EmptyCanvas({
  onInsert,
}: {
  onInsert: (kind: WidgetSpec["type"]) => void;
}): React.ReactElement {
  return (
    <div data-slot="editor-empty" className="cv-editor-empty">
      <p className="cv-editor-empty-title">This dashboard is empty</p>
      <p className="cv-editor-empty-hint">
        Add a widget to start — later ones drop in wherever you point on the canvas.
      </p>
      <div className="cv-editor-empty-tiles">
        {KINDS.map(({ kind, label, Icon }) => (
          <button
            key={kind}
            type="button"
            className="cv-editor-empty-tile"
            onClick={() => onInsert(kind)}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
