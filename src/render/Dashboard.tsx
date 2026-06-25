import { useMemo, type ReactElement } from "react";
import {
  ResponsiveGridLayout,
  type Layout,
  type LayoutItem as RglLayoutItem,
  type ResponsiveLayouts,
} from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { ChartSpec, DashboardSpec, GridConfig, LayoutItem } from "@/spec";
import { DashboardProvider } from "@/hooks";

import { useContainerWidth } from "./useContainerWidth";
import { RenderWidget } from "./RenderWidget";
import { CubeChartSpec } from "./CubeChart";
import { WidgetChrome, DRAG_HANDLE_CLASS } from "./WidgetChrome";

/**
 * The dashboard render surface (docs/01-spec-schema.md §4,
 * docs/03-override-theme-preview.md A3). It renders react-grid-layout's
 * `ResponsiveGridLayout` — explicitly NOT wrapped in a width provider — fed `width`
 * from {@link useContainerWidth}, so the dashboard reflows to its **container**, not
 * the viewport. The spec carries ONE canonical (widest) layout under the `lg`
 * breakpoint; RGL auto-derives the narrower layouts, which is why the breakpoints +
 * column counts are keyed off the container width (not the screen).
 *
 * In edit mode (`editable`) widgets are draggable/resizable, with the chrome header
 * as the drag handle (`dragConfig.handle`); `minW`/`minH`/`static` from each
 * `LayoutItem` are honored. The library writes nothing — it only renders the spec.
 */

const CANONICAL_BREAKPOINT = "lg";

/** Container-width thresholds (px) → derived column counts, scaled off the canonical cols. */
function responsiveCols(canonicalCols: number): {
  breakpoints: Record<string, number>;
  cols: Record<string, number>;
} {
  // `lg` is the canonical (widest) layout; narrower breakpoints get progressively
  // fewer columns so RGL clamps + compacts the canonical layout into them.
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

/** Map the spec's `LayoutItem[]` to RGL `LayoutItem[]` (drops absent optional fields cleanly). */
function toRglLayout(items: LayoutItem[]): RglLayoutItem[] {
  return items.map((it) => {
    const out: RglLayoutItem = { i: it.i, x: it.x, y: it.y, w: it.w, h: it.h };
    if (it.minW !== undefined) out.minW = it.minW;
    if (it.minH !== undefined) out.minH = it.minH;
    if (it.static !== undefined) out.static = it.static;
    return out;
  });
}

export interface DashboardProps {
  /** The dashboard spec (variables + widgets + canonical layout + grid). */
  spec: DashboardSpec;
  /** Edit mode: enables drag/resize (handle = chrome header). Default `false`. */
  editable?: boolean;
}

export function Dashboard({ spec, editable = false }: DashboardProps): ReactElement {
  const [ref, width] = useContainerWidth<HTMLDivElement>();

  const grid: GridConfig = spec.grid ?? {};
  const canonicalCols = grid.cols ?? 12;
  const rowHeight = grid.rowHeight ?? 40;
  const margin: readonly [number, number] = grid.margin ?? [12, 12];
  const containerPadding: readonly [number, number] = grid.containerPadding ?? [0, 0];

  const { breakpoints, cols } = useMemo(
    () => responsiveCols(canonicalCols),
    [canonicalCols],
  );

  // ONE canonical layout under `lg`; RGL derives narrower breakpoints from it.
  const layouts = useMemo<ResponsiveLayouts>(
    () => ({ [CANONICAL_BREAKPOINT]: toRglLayout(spec.layout) as Layout }),
    [spec.layout],
  );

  // Index widgets by id so each grid child resolves its WidgetSpec by layout `i`.
  const widgetsById = useMemo(
    () => new Map(spec.widgets.map((w) => [w.id, w])),
    [spec.widgets],
  );

  return (
    <DashboardProvider spec={spec}>
      <div ref={ref} className="cv:w-full">
        {width > 0 ? (
          <ResponsiveGridLayout
            width={width}
            layouts={layouts}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={rowHeight}
            margin={margin}
            containerPadding={containerPadding}
            dragConfig={{ enabled: editable, handle: `.${DRAG_HANDLE_CLASS}` }}
            resizeConfig={{ enabled: editable }}
          >
            {spec.layout.map((item) => {
              const widget = widgetsById.get(item.i);
              if (!widget) return null;
              return (
                <div key={item.i} className="cv:h-full cv:w-full">
                  <RenderWidget widget={widget} editable={editable} />
                </div>
              );
            })}
          </ResponsiveGridLayout>
        ) : null}
      </div>
    </DashboardProvider>
  );
}

export interface ChartViewProps {
  /** A standalone chart spec to render (no dashboard / variables). */
  spec: ChartSpec;
}

/**
 * Render a standalone {@link ChartSpec} inside the default {@link WidgetChrome}, so a
 * lone chart file looks consistent with a dashboard cell. No `DashboardProvider` —
 * a top-level chart resolves variables against an empty store (fail-safe noFilter).
 */
export function ChartView({ spec }: ChartViewProps): ReactElement {
  return (
    <div className="cv:h-full cv:w-full">
      <WidgetChrome
        widget={{
          id: spec.id,
          type: "chart",
          title: spec.name,
          query: spec.query,
          chart: spec.chart,
        }}
        title={spec.name}
        menu={null}
        dragHandleProps={{}}
        state={{ loading: false, empty: false }}
      >
        <CubeChartSpec spec={spec} />
      </WidgetChrome>
    </div>
  );
}
