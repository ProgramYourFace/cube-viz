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

import type { DashboardSpec, LayoutItem, WidgetSpec } from "@/spec";
import { DashboardProvider } from "@/hooks";
import { RenderWidget, DRAG_HANDLE_CLASS } from "@/render";
import { useContainerWidth } from "@/render/useContainerWidth";
import { cn } from "@/components/ui/utils";

import {
  CANONICAL_BREAKPOINT,
  columnBoundaries,
  editorGridMetrics,
  pickCanonicalLayout,
  rowBoundaries,
} from "./layout";
import { EmptyCanvas, InsertLines } from "./InsertLines";

/**
 * The editor canvas — the dashboard rendered EDITABLE (docs/03 §A3.2 "Canvas").
 * It composes the same RGL + `useContainerWidth` + `RenderWidget` pieces the
 * runtime {@link Dashboard} uses (so widgets look identical and reflow by container
 * width, not viewport), and additionally:
 *  - captures RGL's `onLayoutChange(layout, allLayouts)`, lifts the **canonical
 *    (widest) layout**, and reports it via `onLayoutChange` so the editor writes it
 *    back to the single `spec.layout`;
 *  - overlays a click target + selected ring + hover-revealed actions per widget for
 *    select-to-edit;
 *  - overlays {@link InsertLines} — the row-boundary `+` that adds a widget WHERE the
 *    user is pointing (and the empty-board tiles when there is nothing yet).
 *
 * We compose the pieces rather than `<Dashboard editable />` because the runtime
 * component intentionally exposes neither a layout-change nor a selection callback.
 *
 * Cell metrics come from `editorGridMetrics()` — the canvas keeps the CANONICAL column
 * count at every width and scales the cell SIZE to fit, so you always see and edit the
 * true canonical layout. The insert overlay reads the same metrics, so its lines land
 * on exactly the pixels RGL laid the rows out at.
 */

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
  /**
   * Insert a fresh widget of `kind` at a row boundary (the `+` on an insert line, or
   * an empty-board tile — those pass row 0). Omit to hide the insert affordances.
   */
  onInsert?: (kind: WidgetSpec["type"], rowY: number) => void;
}

function EditorCanvasImpl({
  spec,
  selectedId,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
  onLayoutChange,
  onInsert,
}: EditorCanvasProps): React.ReactElement {
  const [measureRef, width] = useContainerWidth<HTMLDivElement>();
  // The measured element is ALSO the surface the insert overlay hit-tests the pointer
  // against, so keep our own handle on it alongside the measuring ref callback.
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const setCanvasRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      canvasRef.current = node;
      measureRef(node);
    },
    [measureRef],
  );

  const metrics = React.useMemo(() => editorGridMetrics(spec.grid, width), [spec.grid, width]);
  const { cols: canonicalCols, rowHeight: rowHeightEff } = metrics;
  const marginEff = metrics.margin;
  const paddingEff = metrics.containerPadding;

  // An in-flight drag/resize hides the insert lines — a line under a moving widget is
  // both wrong (the boundaries are mid-flight) and a distraction.
  const [interacting, setInteracting] = React.useState(false);
  const rows = React.useMemo(() => rowBoundaries(spec.layout), [spec.layout]);
  const columns = React.useMemo(
    () => columnBoundaries(spec.layout, canonicalCols),
    [spec.layout, canonicalCols],
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

  // The layout currently reflected in the spec, read by handleLayoutChange to drop
  // RGL's no-op (mount / re-sync) reports without re-binding the callback.
  const specLayoutRef = React.useRef(spec.layout);
  React.useEffect(() => {
    specLayoutRef.current = spec.layout;
  }, [spec.layout]);

  // Pointer-down position, to tell a real click (select) from a drag (move).
  const downPos = React.useRef<{ x: number; y: number } | null>(null);

  const handleLayoutChange = React.useCallback(
    (layout: Layout, all: ResponsiveLayouts): void => {
      const canonical = pickCanonicalLayout(layout, all);
      const next = canonical.map((it) => ({ ...it })) as LayoutItem[];
      // RGL fires onLayoutChange on mount and on every prop re-sync. Drop the report
      // when the geometry is byte-identical to what the spec already holds, so a no-op
      // fire never starts the onLayoutChange -> setState -> re-sync ping-pong.
      if (rglLayoutEqual(specLayoutRef.current, next)) return;
      reportRef.current(next);
    },
    [],
  );

  return (
    <DashboardProvider spec={spec}>
      <div ref={setCanvasRef} className="cv-editor-canvas">
        {width > 0 && onInsert && spec.widgets.length === 0 ? (
          <EmptyCanvas onInsert={(kind) => onInsert(kind, 0)} />
        ) : null}
        {width > 0 ? (
          <ResponsiveGridLayout
            width={width}
            layouts={layouts}
            breakpoints={{ lg: 0 }}
            cols={{ lg: canonicalCols }}
            rowHeight={rowHeightEff}
            margin={marginEff}
            containerPadding={paddingEff}
            // Drag is gated to the handle class — which the chrome header AND the
            // full-body overlay (added below for chart/text widgets) both carry, so
            // you can drag anywhere on a chart even when it has no title bar.
            dragConfig={{ enabled: true, handle: `.${DRAG_HANDLE_CLASS}` }}
            // Resize from three corners; the top-right is reserved for the actions.
            resizeConfig={{ enabled: true, handles: ["se", "sw", "nw"] }}
            onLayoutChange={handleLayoutChange}
            onDragStart={() => setInteracting(true)}
            onDragStop={() => setInteracting(false)}
            onResizeStart={() => setInteracting(true)}
            onResizeStop={() => setInteracting(false)}
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
                    "cv-editor-widget",
                    // Idle = no chrome at all; hover paints a faint 1px ring so the
                    // hover target (and its action cluster) is obvious, and the
                    // SELECTED widget keeps the strong ring.
                    selected && "cv-editor-widget--selected",
                  )}
                >
                  <RenderWidget widget={widget} editable />
                  {/* Drag-anywhere layer: the WHOLE widget is the drag handle (a plain
                      div RGL can grab; recharts' SVG + input controls otherwise swallow
                      the mousedown). z-[10] keeps it above the chart but BELOW the
                      resize handles and the action buttons. Rendered before the actions
                      so it never wins their hit-test. */}
                  <div aria-hidden className={cn(DRAG_HANDLE_CLASS, "cv-editor-widget-drag-layer")} />
                  {/* Edit / duplicate / delete — top-right, revealed on hover / focus /
                      selection (see .cv-editor-widget-actions), rendered LAST at z-20 so
                      they sit above the drag layer. They keep `pointer-events: auto` at
                      ALL times, fading only their opacity: an earlier hover version
                      toggled pointer-events too, and the drag layer stole every click
                      that landed during the fade. stopPropagation so a click doesn't
                      also select. */}
                  <div className="cv-editor-widget-actions">
                    <button
                      type="button"
                      aria-label={`Edit ${widget.title ?? widget.type}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(widget.id);
                      }}
                      className="cv-editor-widget-action"
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
                      className="cv-editor-widget-action"
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
                      className={cn("cv-editor-widget-action", "cv-editor-widget-action--danger")}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </ResponsiveGridLayout>
        ) : null}
        {/* Insert lines LAST so they paint above the grid; the layer itself is
            pointer-transparent (see InsertLines) so drag/resize are untouched. */}
        {width > 0 && onInsert && spec.widgets.length > 0 ? (
          <InsertLines
            rows={rows}
            columns={columns}
            metrics={metrics}
            width={width}
            containerRef={canvasRef}
            onInsert={onInsert}
            disabled={interacting}
          />
        ) : null}
      </div>
    </DashboardProvider>
  );
}

/**
 * Geometry equality of the spec's layout vs. a freshly-captured RGL layout. RGL only
 * reports `i/x/y/w/h` (it strips minW/minH/static from derived items), so we compare
 * just those — matched by id rather than order, since RGL may reorder its emitted list.
 */
function rglLayoutEqual(spec: readonly LayoutItem[], rgl: readonly LayoutItem[]): boolean {
  if (spec.length !== rgl.length) return false;
  const byId = new Map(spec.map((it) => [it.i, it]));
  for (const r of rgl) {
    const s = byId.get(r.i);
    if (!s || s.x !== r.x || s.y !== r.y || s.w !== r.w || s.h !== r.h) return false;
  }
  return true;
}

/**
 * The canvas renders a live CubeChart per widget, so it is the single most expensive
 * subtree in the editor. Memoize it so unrelated DashboardEditor re-renders (e.g. the
 * deferred whole-dashboard validation settling, or a selection change handled by
 * stable callbacks) don't reconcile the whole grid — it re-renders only when its own
 * props (the draft spec / selection / handlers) actually change identity.
 */
export const EditorCanvas = React.memo(EditorCanvasImpl);
