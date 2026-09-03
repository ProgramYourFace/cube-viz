import * as React from "react";
import { BarChart3, Plus, SlidersHorizontal, Type } from "lucide-react";

import type { WidgetSpec } from "@/spec";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";

import {
  columnBoundaryLeft,
  rowBoundaryTop,
  rowSpanHeight,
  type ColumnBoundary,
  type EditorGridMetrics,
} from "./layout";

/**
 * Insert lines — the in-context "add a widget HERE" affordance that replaced the
 * toolbar's Chart/Text/Input buttons (which always dropped the newcomer at the bottom,
 * nowhere near where the user was looking).
 *
 * Two sets, one mental model:
 *  - HORIZONTAL lines at every row boundary — insert BETWEEN rows (everything below
 *    slides down);
 *  - VERTICAL lines in the column gaps inside a row band, plus a row's free right edge
 *    — insert BESIDE (the row-mates shift, squeeze, or drop below).
 *
 * Bring the pointer within {@link HIT_BAND} px of a line and it fades in as a hairline
 * with a round `+`; the `+` opens a three-item menu (Chart · Text · Input) that inserts
 * at THAT position. Exactly ONE line is ever active: the nearest boundary across both
 * sets wins, so a row line and a column line never light up together and fight for the
 * same click.
 *
 * Hit-testing is done by MEASURING the pointer against the boundary offsets rather
 * than by laying transparent hit bands over the canvas: a band tall (or wide) enough to
 * be catchable would overlap the widgets either side of it and swallow their drags and
 * corner resizes. So the whole layer is `pointer-events: none` and only the ACTIVE
 * line's button takes clicks. The layer is also hidden outright while RGL has a
 * drag/resize in flight (`disabled`), so a line can never flicker under a moving widget.
 */

/** How close (px) the pointer must come to a boundary for its line to appear. */
const HIT_BAND = 10;

export interface InsertLinesProps {
  /** Row boundaries (grid units) an insert can target — see `rowBoundaries()`. */
  rows: readonly number[];
  /** Column boundaries per row band — see `columnBoundaries()`. */
  columns: readonly ColumnBoundary[];
  /** The canvas' effective cell metrics; converts a row/column to a pixel offset. */
  metrics: EditorGridMetrics;
  /** Measured canvas width — the column pixel maths needs it. */
  width: number;
  /** The element the pointer is tracked against (the canvas the layer covers). */
  containerRef: React.RefObject<HTMLElement | null>;
  /**
   * Insert a fresh widget of `kind` at row `rowY` — beside the row's widgets when
   * `colX` is given (a vertical line), between rows when it is not.
   */
  onInsert: (kind: WidgetSpec["type"], rowY: number, colX?: number) => void;
  /** Hide everything (a drag/resize is in flight). */
  disabled?: boolean;
}

const KINDS: { kind: WidgetSpec["type"]; label: string; Icon: typeof BarChart3 }[] = [
  { kind: "chart", label: "Chart", Icon: BarChart3 },
  { kind: "text", label: "Text", Icon: Type },
  { kind: "input", label: "Input", Icon: SlidersHorizontal },
];

/** One line, resolved to pixels: where it sits and what inserting there means. */
type Target = {
  key: string;
  axis: "row" | "col";
  rowY: number;
  colX?: number;
  /** Pixel geometry within the canvas. */
  top: number;
  left?: number;
  height?: number;
};

export function InsertLines({
  rows,
  columns,
  metrics,
  width,
  containerRef,
  onInsert,
  disabled,
}: InsertLinesProps): React.ReactElement | null {
  // The line under the pointer, and the one whose menu is open. An open menu PINS its
  // line visible — the pointer has left the band to reach the menu by then.
  const [hoverKey, setHoverKey] = React.useState<string | null>(null);
  const [menuKey, setMenuKey] = React.useState<string | null>(null);

  const targets = React.useMemo<Target[]>(() => {
    const out: Target[] = rows.map((rowY) => ({
      key: `row:${rowY}`,
      axis: "row",
      rowY,
      top: rowBoundaryTop(rowY, metrics),
    }));
    for (const c of columns) {
      out.push({
        key: `col:${c.rowY}:${c.x}`,
        axis: "col",
        rowY: c.rowY,
        colX: c.x,
        // The line spans its own row band only — a column gap means nothing outside it.
        top: rowBoundaryTop(c.rowY, metrics) + metrics.margin[1] / 2,
        left: columnBoundaryLeft(c.x, metrics, width),
        height: rowSpanHeight(c.rowBottom - c.rowY, metrics),
      });
    }
    return out;
  }, [rows, columns, metrics, width]);

  // Read by the pointer listener so it never re-binds as the layout changes.
  const targetsRef = React.useRef(targets);
  targetsRef.current = targets;

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const onMove = (e: PointerEvent): void => {
      const box = el.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      // ONE winner across both sets: the single nearest boundary, so a row line and a
      // column line can never both light up around a corner.
      let best: string | null = null;
      let bestDist = HIT_BAND;
      for (const t of targetsRef.current) {
        let dist: number;
        if (t.axis === "row") {
          dist = Math.abs(y - t.top);
        } else {
          // A column line only answers to the pointer inside its own row band.
          if (y < t.top || y > t.top + (t.height ?? 0)) continue;
          dist = Math.abs(x - (t.left ?? 0));
        }
        if (dist <= bestDist) {
          best = t.key;
          bestDist = dist;
        }
      }
      setHoverKey(best);
    };
    const onLeave = (): void => setHoverKey(null);
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
      setHoverKey(null);
      setMenuKey(null);
    }
  }, [disabled]);

  if (disabled) return null;

  return (
    <div data-slot="insert-lines" className="cv-insert-lines">
      {targets.map((t) => {
        const active = menuKey === t.key || hoverKey === t.key;
        const column = t.axis === "col";
        return (
          <div
            key={t.key}
            style={column ? { top: t.top, left: t.left, height: t.height } : { top: t.top }}
            className={cn(
              "cv-insert-line",
              column && "cv-insert-line--col",
              active && "cv-insert-line--active",
            )}
          >
            <span className="cv-insert-line-rule" />
            <Popover
              open={menuKey === t.key}
              onOpenChange={(open) => setMenuKey(open ? t.key : null)}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label={
                    column
                      ? `Insert a widget beside row ${t.rowY}, at column ${t.colX}`
                      : `Insert a widget at row ${t.rowY}`
                  }
                  // Only the visible line takes clicks; the rest of the layer stays
                  // transparent to the pointer so drags and resizes pass through.
                  tabIndex={active ? 0 : -1}
                  className="cv-insert-line-button"
                >
                  <Plus />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                side={column ? "right" : "bottom"}
                className="cv-insert-menu"
              >
                {KINDS.map(({ kind, label, Icon }) => (
                  <button
                    key={kind}
                    type="button"
                    className="cv-insert-menu-item"
                    onClick={() => {
                      setMenuKey(null);
                      setHoverKey(null);
                      onInsert(kind, t.rowY, t.colX);
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
