import type { Layout, LayoutItem as RglLayoutItem } from "react-grid-layout";

import type { DashboardSpec, LayoutItem, WidgetSpec } from "@/spec";

/**
 * Layout-plumbing helpers for the dashboard editor (docs/03 §A3.2).
 *
 * The spec carries ONE canonical (widest) layout under `spec.layout`; the runtime
 * `Dashboard` feeds it to RGL under the `lg` breakpoint and lets RGL auto-derive the
 * narrower ones. So when RGL fires `onLayoutChange(layout, allLayouts)`, the editor
 * must capture the **widest** layout (the canonical one) and write it back —
 * preserving each item's `minW`/`minH`/`static`, which RGL drops from the items it
 * emits in narrower breakpoints. Everything here is pure.
 */

/** The breakpoint key under which {@link Dashboard} stores the canonical layout. */
export const CANONICAL_BREAKPOINT = "lg" as const;

/** Mirror of {@link Dashboard}'s default grid column count (12). */
export const DEFAULT_COLS = 12;

/**
 * Pick the canonical (widest) layout out of RGL's `allLayouts`. Prefers the
 * `lg` entry the spec is keyed on; falls back to the entry with the most columns'
 * worth of items, then to the flat `layout` arg, so we never lose a change.
 */
export function pickCanonicalLayout(
  layout: Layout,
  allLayouts: Partial<Record<string, Layout>>,
): Layout {
  const canonical = allLayouts[CANONICAL_BREAKPOINT];
  if (canonical && canonical.length > 0) return canonical;
  // Fall back to the widest non-empty derived layout, else the flat callback arg.
  let widest: Layout | undefined;
  let widestSpan = -1;
  for (const candidate of Object.values(allLayouts)) {
    if (!candidate || candidate.length === 0) continue;
    const span = candidate.reduce((max, it) => Math.max(max, it.x + it.w), 0);
    if (span > widestSpan) {
      widest = candidate;
      widestSpan = span;
    }
  }
  return widest ?? layout;
}

/**
 * Merge a freshly-captured RGL layout back into the spec's `LayoutItem[]`, keeping
 * the spec's `minW`/`minH`/`static` (RGL strips these from derived breakpoints) and
 * preserving spec item order. New items present only in RGL are appended; items
 * absent from RGL (e.g. just removed) are dropped.
 */
export function mergeLayout(prev: LayoutItem[], next: Layout): LayoutItem[] {
  const prevById = new Map(prev.map((it) => [it.i, it]));
  const nextById = new Map(next.map((it) => [it.i, it]));

  const merged: LayoutItem[] = [];
  const emit = (rgl: RglLayoutItem, base: LayoutItem | undefined): void => {
    const item: LayoutItem = {
      i: rgl.i,
      x: rgl.x,
      y: rgl.y,
      w: rgl.w,
      h: rgl.h,
    };
    // Constraints + static are spec-owned; carry them forward from the prior item.
    if (base?.minW !== undefined) item.minW = base.minW;
    if (base?.minH !== undefined) item.minH = base.minH;
    if (base?.static !== undefined) item.static = base.static;
    merged.push(item);
  };

  // Spec order first (stable), then any RGL-only newcomers.
  for (const p of prev) {
    const rgl = nextById.get(p.i);
    if (rgl) emit(rgl, p);
  }
  for (const rgl of next) {
    if (!prevById.has(rgl.i)) emit(rgl, undefined);
  }
  return merged;
}

/** Default grid footprint per widget kind (canonical-cols units). */
const DEFAULT_FOOTPRINT: Record<WidgetSpec["type"], { w: number; h: number; minW: number; minH: number }> = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 },
};

/**
 * Compute a non-overlapping placement for a new widget: full-grid-width row below
 * everything that exists, snapped to the widget kind's default footprint. RGL's
 * compactor tidies it afterwards, but starting below the current max-y guarantees
 * no initial overlap regardless of compaction direction.
 */
export function placeNewItem(
  existing: LayoutItem[],
  id: string,
  type: WidgetSpec["type"],
  cols: number = DEFAULT_COLS,
): LayoutItem {
  const fp = DEFAULT_FOOTPRINT[type];
  const w = Math.min(fp.w, cols);
  const maxY = existing.reduce((max, it) => Math.max(max, it.y + it.h), 0);
  return {
    i: id,
    x: 0,
    y: maxY,
    w,
    h: fp.h,
    minW: Math.min(fp.minW, w),
    minH: fp.minH,
  };
}

/** A dashboard spec with a widget (+ its layout item) appended. Pure. */
export function appendWidget(
  spec: DashboardSpec,
  widget: WidgetSpec,
  cols: number = spec.grid?.cols ?? DEFAULT_COLS,
): DashboardSpec {
  const item = placeNewItem(spec.layout, widget.id, widget.type, cols);
  return {
    ...spec,
    widgets: [...spec.widgets, widget],
    layout: [...spec.layout, item],
  };
}

/** A dashboard spec with one widget (+ its layout item) removed. Pure. */
export function removeWidget(spec: DashboardSpec, id: string): DashboardSpec {
  return {
    ...spec,
    widgets: spec.widgets.filter((w) => w.id !== id),
    layout: spec.layout.filter((it) => it.i !== id),
  };
}

/** A dashboard spec with one widget replaced (matched by id). Pure. */
export function replaceWidget(spec: DashboardSpec, widget: WidgetSpec): DashboardSpec {
  return {
    ...spec,
    widgets: spec.widgets.map((w) => (w.id === widget.id ? widget : w)),
  };
}
