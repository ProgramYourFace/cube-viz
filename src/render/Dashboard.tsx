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
import type { ChartFamilyDescriptor } from "@/charts";
import { DashboardProvider } from "@/hooks";
import { FamilyRegistryOverride } from "@/provider";

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

// Below this container width, PREVIEW mode stacks every widget into one full-width
// column (in reading order) instead of reflowing the canonical grid — simpler and far
// more legible on phones than squeezing the columns. (EDIT mode scales the canonical
// grid down to fit instead; see EditorCanvas.) Above it, the canonical layout renders
// at the container width with the canonical column count.
const STACK_THRESHOLD = 640;

/** Reading order for the stacked (small-screen) preview: top-to-bottom, then left-to-right. */
function stackOrder(items: LayoutItem[]): LayoutItem[] {
  return [...items].sort((a, b) => a.y - b.y || a.x - b.x);
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
  /**
   * Per-component chart-families override. When set, this dashboard's subtree resolves
   * families from a registry built from `defaultChartFamilies` + these descriptors —
   * augmenting the provider's families just for this dashboard (the rest of the context
   * is inherited unchanged). Omit to inherit the provider's families.
   */
  families?: ChartFamilyDescriptor[];
}

export function Dashboard({ spec, editable = false, families }: DashboardProps): ReactElement {
  const [ref, width] = useContainerWidth<HTMLDivElement>();

  const grid: GridConfig = spec.grid ?? {};
  const canonicalCols = grid.cols ?? 12;
  const rowHeight = grid.rowHeight ?? 40;
  const margin: readonly [number, number] = grid.margin ?? [12, 12];
  // Edge padding defaults to the inter-widget gap, so widgets don't sit flush to
  // the container edge (and don't get clipped). Override via grid.containerPadding.
  const containerPadding: readonly [number, number] = grid.containerPadding ?? margin;

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

  // Preview-only: stack into a single full-width column below the threshold.
  const stacked = !editable && width > 0 && width < STACK_THRESHOLD;

  return (
    <FamilyRegistryOverride families={families}>
      <DashboardProvider spec={spec}>
      <div ref={ref} className="cv:w-full">
        {width <= 0 ? null : stacked ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: margin[1],
              padding: `${containerPadding[1]}px ${containerPadding[0]}px`,
            }}
          >
            {stackOrder(spec.layout).map((item) => {
              const widget = widgetsById.get(item.i);
              if (!widget) return null;
              // Preserve each widget's canonical pixel height so charts stay readable.
              const h = item.h * rowHeight + (item.h - 1) * margin[1];
              return (
                <div key={item.i} style={{ height: h }}>
                  <RenderWidget widget={widget} editable={false} />
                </div>
              );
            })}
          </div>
        ) : (
          <ResponsiveGridLayout
            width={width}
            layouts={layouts}
            breakpoints={{ lg: 0 }}
            cols={{ lg: canonicalCols }}
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
        )}
      </div>
      </DashboardProvider>
    </FamilyRegistryOverride>
  );
}

export interface ChartViewProps {
  /** A standalone chart spec to render (no dashboard / variables). */
  spec: ChartSpec;
  /**
   * Per-component chart-families override (see {@link DashboardProps.families}). When
   * set, this chart resolves families from `defaultChartFamilies` + these descriptors.
   */
  families?: ChartFamilyDescriptor[];
}

/**
 * Render a standalone {@link ChartSpec} inside the default {@link WidgetChrome}, so a
 * lone chart file looks consistent with a dashboard cell. No `DashboardProvider` —
 * a top-level chart resolves variables against an empty store (fail-safe noFilter).
 */
export function ChartView({ spec, families }: ChartViewProps): ReactElement {
  return (
    <FamilyRegistryOverride families={families}>
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
    </FamilyRegistryOverride>
  );
}
