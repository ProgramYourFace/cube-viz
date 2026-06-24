import * as React from "react";
import {
  ResponsiveGridLayout,
  type Layout,
  type LayoutItem as RglLayoutItem,
  type ResponsiveLayouts,
} from "react-grid-layout";
import { Copy, Pencil, Trash2 } from "lucide-react";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { DashboardSpec, GridConfig, LayoutItem } from "@/spec";
import { DashboardProvider } from "@/hooks";
import { RenderWidget, DRAG_HANDLE_CLASS } from "@/render";
import { useContainerWidth } from "@/render/useContainerWidth";
import { cn } from "@/components/ui/utils";

import { CANONICAL_BREAKPOINT, pickCanonicalLayout } from "./layout";

/**
 * The editor canvas — the dashboard rendered EDITABLE (docs/03 §A3.2 "Canvas").
 * It composes the same RGL + `useContainerWidth` + `RenderWidget` pieces the
 * runtime {@link Dashboard} uses (so widgets look identical and reflow by container
 * width, not viewport), and additionally:
 *  - captures RGL's `onLayoutChange(layout, allLayouts)`, lifts the **canonical
 *    (widest) layout**, and reports it via `onLayoutChange` so the editor writes it
 *    back to the single `spec.layout`;
 *  - overlays a click target + selected ring + delete affordance per widget for
 *    select-to-edit.
 *
 * We compose the pieces rather than `<Dashboard editable />` because the runtime
 * component intentionally exposes neither a layout-change nor a selection callback.
 */

const CANONICAL_COLS_DEFAULT = 12;

function responsiveCols(canonicalCols: number): {
  breakpoints: Record<string, number>;
  cols: Record<string, number>;
} {
  return {
    breakpoints: { lg: 996, md: 768, sm: 480, xs: 0 },
    cols: {
      lg: canonicalCols,
      md: Math.max(1, Math.round(canonicalCols * 0.66)),
      sm: Math.max(1, Math.round(canonicalCols * 0.5)),
      xs: 1,
    },
  };
}

function toRglLayout(items: LayoutItem[]): RglLayoutItem[] {
  return items.map((it) => {
    const out: RglLayoutItem = { i: it.i, x: it.x, y: it.y, w: it.w, h: it.h };
    if (it.minW !== undefined) out.minW = it.minW;
    if (it.minH !== undefined) out.minH = it.minH;
    if (it.static !== undefined) out.static = it.static;
    return out;
  });
}

export interface EditorCanvasProps {
  spec: DashboardSpec;
  /** Currently-selected widget id (rings + opens the edit panel). */
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** A widget's edit button was clicked (opens the full-screen editor). */
  onEdit: (id: string) => void;
  /** A widget's duplicate button was clicked. */
  onDuplicate: (id: string) => void;
  /** A widget's delete button was clicked. */
  onDelete: (id: string) => void;
  /** Canonical (widest) layout captured from a drag/resize. */
  onLayoutChange: (layout: LayoutItem[]) => void;
}

export function EditorCanvas({
  spec,
  selectedId,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
  onLayoutChange,
}: EditorCanvasProps): React.ReactElement {
  const [ref, width] = useContainerWidth<HTMLDivElement>();

  const grid: GridConfig = spec.grid ?? {};
  const canonicalCols = grid.cols ?? CANONICAL_COLS_DEFAULT;
  const rowHeight = grid.rowHeight ?? 40;
  const margin: readonly [number, number] = grid.margin ?? [12, 12];
  const containerPadding: readonly [number, number] = grid.containerPadding ?? [0, 0];

  const { breakpoints, cols } = React.useMemo(
    () => responsiveCols(canonicalCols),
    [canonicalCols],
  );

  const layouts = React.useMemo<ResponsiveLayouts>(
    () => ({ [CANONICAL_BREAKPOINT]: toRglLayout(spec.layout) as Layout }),
    [spec.layout],
  );

  const widgetsById = React.useMemo(
    () => new Map(spec.widgets.map((w) => [w.id, w])),
    [spec.widgets],
  );

  // Keep the captured-layout callback fresh without re-binding RGL each render.
  const reportRef = React.useRef(onLayoutChange);
  React.useEffect(() => {
    reportRef.current = onLayoutChange;
  }, [onLayoutChange]);

  // Pointer-down position, to tell a real click (select) from a drag (move).
  const downPos = React.useRef<{ x: number; y: number } | null>(null);

  const handleLayoutChange = React.useCallback(
    (layout: Layout, all: ResponsiveLayouts): void => {
      const canonical = pickCanonicalLayout(layout, all);
      reportRef.current(canonical.map((it) => ({ ...it })) as LayoutItem[]);
    },
    [],
  );

  return (
    <DashboardProvider spec={spec}>
      <div ref={ref} className="w-full [&_.react-resizable-handle]:z-[3]">
        {width > 0 ? (
          <ResponsiveGridLayout
            width={width}
            layouts={layouts}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={rowHeight}
            margin={margin}
            containerPadding={containerPadding}
            // Drag is gated to the handle class — which the chrome header AND the
            // full-body overlay (added below for chart/text widgets) both carry, so
            // you can drag anywhere on a chart even when it has no title bar.
            dragConfig={{ enabled: true, handle: `.${DRAG_HANDLE_CLASS}` }}
            // Resize from three corners; the top-right is reserved for the actions.
            resizeConfig={{ enabled: true, handles: ["se", "sw", "nw"] }}
            onLayoutChange={handleLayoutChange}
          >
            {spec.layout.map((item) => {
              const widget = widgetsById.get(item.i);
              if (!widget) return null;
              const selected = widget.id === selectedId;
              return (
                // Selecting = a click that bubbles up from anywhere in the widget;
                // RGL's drag (mousedown on the chrome header handle) wins for drags,
                // so we don't need a blocking overlay that would also block dragging.
                <div
                  key={item.i}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${widget.title ?? widget.type}`}
                  aria-pressed={selected}
                  onPointerDown={(e) => {
                    downPos.current = { x: e.clientX, y: e.clientY };
                  }}
                  onClick={(e) => {
                    // Select only on a genuine click — suppress the click that ends
                    // a drag, so the edit panel doesn't open on every mouse-up.
                    const d = downPos.current;
                    if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) return;
                    onSelect(widget.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(widget.id);
                    }
                  }}
                  className={cn(
                    "group relative h-full w-full cursor-move rounded-xl ring-offset-2 ring-offset-background transition-shadow focus-visible:outline-none",
                    // No idle/hover outline (it read as harsh); only the SELECTED
                    // widget gets a ring. Keyboard focus still shows a faint ring.
                    selected
                      ? "ring-2 ring-primary"
                      : "ring-0 focus-visible:ring-2 focus-visible:ring-border",
                  )}
                >
                  {/* Edit + delete actions — top-right corner, on hover/selection.
                      Idle = pointer-events-none so they never block dragging; the
                      top-right resize corner is dropped so they don't conflict. */}
                  <div
                    className={cn(
                      "absolute right-2 top-2 z-[4] flex items-center gap-1",
                      "pointer-events-none opacity-0 transition-opacity",
                      "focus-within:pointer-events-auto focus-within:opacity-100",
                      "group-hover:pointer-events-auto group-hover:opacity-100",
                      selected && "pointer-events-auto opacity-100",
                    )}
                  >
                    <button
                      type="button"
                      aria-label={`Edit ${widget.title ?? widget.type}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(widget.id);
                      }}
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-accent hover:text-foreground [&_svg]:size-4",
                      )}
                    >
                      <Pencil />
                    </button>
                    <button
                      type="button"
                      aria-label={`Duplicate ${widget.title ?? widget.type}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(widget.id);
                      }}
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-accent hover:text-foreground [&_svg]:size-4",
                      )}
                    >
                      <Copy />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${widget.title ?? widget.type}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(widget.id);
                      }}
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-destructive hover:text-destructive-foreground [&_svg]:size-4",
                      )}
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <RenderWidget widget={widget} editable />
                  {/* Drag-anywhere: the WHOLE widget is the drag handle (a plain div
                      RGL can grab; recharts' SVG and input controls otherwise swallow
                      the mousedown). Covers every widget type — in edit mode you only
                      position / resize / edit-via-buttons, never use a widget's own
                      controls, so covering them is correct. Sits below the z-[3] resize
                      handles + z-[4] action buttons; clicks bubble to the wrapper. */}
                  <div aria-hidden className={cn(DRAG_HANDLE_CLASS, "absolute inset-0 cursor-move rounded-xl")} />
                </div>
              );
            })}
          </ResponsiveGridLayout>
        ) : null}
      </div>
    </DashboardProvider>
  );
}
