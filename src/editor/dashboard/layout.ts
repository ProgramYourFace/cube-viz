import type { Layout, LayoutItem as RglLayoutItem } from "react-grid-layout";

import type { DashboardSpec, GridConfig, LayoutItem, WidgetSpec } from "@/spec";

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
export const DEFAULT_FOOTPRINT: Record<WidgetSpec["type"], { w: number; h: number; minW: number; minH: number }> = {
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

/**
 * A dashboard spec with a widget inserted AT a row boundary: everything at or below
 * `rowY` slides down by the new item's height and the newcomer takes the freed row at
 * `x: 0`. This is the in-context "insert here" seam (the `+` on a canvas row line) —
 * appending would have dropped the widget at the bottom, miles from where the user
 * pointed. `rowY` past the last row degenerates to an append (nothing to shift). Pure.
 */
export function insertWidgetAtRow(
  spec: DashboardSpec,
  widget: WidgetSpec,
  rowY: number,
  cols: number = spec.grid?.cols ?? DEFAULT_COLS,
): DashboardSpec {
  const fp = DEFAULT_FOOTPRINT[widget.type];
  const w = Math.min(fp.w, cols);
  const item: LayoutItem = {
    i: widget.id,
    x: 0,
    y: rowY,
    w,
    h: fp.h,
    minW: Math.min(fp.minW, w),
    minH: fp.minH,
  };
  const shifted = spec.layout.map((it) => (it.y >= rowY ? { ...it, y: it.y + fp.h } : it));
  return {
    ...spec,
    widgets: [...spec.widgets, widget],
    layout: [...shifted, item],
  };
}

/**
 * The distinct row boundaries of a layout, ascending: the top (0), the bottom edge of
 * every item (`y + h`), and hence the bottom of the board.
 *
 * Boundaries that a TALLER neighbour straddles are dropped. Two reasons: the insert
 * line drawn there would slice through the middle of that widget (it reads as a line
 * across a chart, not as a gap), and an insert at such a row overlaps the straddler,
 * so RGL's compactor would push the newcomer somewhere other than where the line
 * promised. What's left is exactly the rows where "insert here" is honest.
 */
export function rowBoundaries(layout: readonly LayoutItem[]): number[] {
  const set = new Set<number>([0]);
  for (const it of layout) set.add(it.y + it.h);
  return [...set]
    .filter((y) => !layout.some((it) => it.y < y && it.y + it.h > y))
    .sort((a, b) => a - b);
}

/**
 * A vertical insert target: the gap between two horizontally adjacent widgets inside
 * one row band (or a row's free right edge). `rowY`/`rowBottom` are the band it lives
 * in — a column line is only ever as tall as its own row.
 */
export interface ColumnBoundary {
  /** Top of the row band (the row an insert here lands on). */
  rowY: number;
  /** Bottom of the row band (exclusive) — the line's height. */
  rowBottom: number;
  /** Column the newcomer would take. */
  x: number;
  /** Nothing sits to the right in this band: free columns, so no one has to move. */
  free: boolean;
}

/**
 * The column boundaries of every row band, i.e. the places a widget can be inserted
 * BESIDE another rather than between rows.
 *
 * A band is the space between two consecutive {@link rowBoundaries}; because those are
 * never straddled, every item belongs to exactly one band. Within a band we offer each
 * item's right edge, minus the canvas edges (`0` and `cols` — no room there) and minus
 * any edge a wider item in the same band straddles (inserting inside a widget is not a
 * thing). The rightmost edge of a band that doesn't reach `cols` is kept: that's the
 * free-right-edge case, where the newcomer just fills the empty columns.
 */
export function columnBoundaries(
  layout: readonly LayoutItem[],
  cols: number = DEFAULT_COLS,
): ColumnBoundary[] {
  const rows = rowBoundaries(layout);
  const out: ColumnBoundary[] = [];
  for (let i = 0; i < rows.length - 1; i++) {
    const top = rows[i];
    const bottom = rows[i + 1];
    const band = layout.filter((it) => it.y >= top && it.y + it.h <= bottom);
    if (band.length === 0) continue;
    const edges = [...new Set(band.map((it) => it.x + it.w))].sort((a, b) => a - b);
    for (const x of edges) {
      if (x <= 0 || x >= cols) continue;
      if (band.some((it) => it.x < x && it.x + it.w > x)) continue;
      out.push({ rowY: top, rowBottom: bottom, x, free: !band.some((it) => it.x >= x) });
    }
  }
  return out;
}

/**
 * A dashboard spec with a widget inserted BESIDE the ones already in a row band: the
 * newcomer takes column `colX` of the band starting at `rowY`, and its row-mates to
 * the right make room. Three outcomes, in order of preference:
 *
 *  1. **Shift** — everyone to the right slides over by the newcomer's width, if that
 *     still fits inside `cols`.
 *  2. **Shrink** — otherwise the row-mates are squeezed proportionally into whatever
 *     columns are left (never below their `minW`), keeping their order.
 *  3. **Push down** — if even the squeezed row can't fit, the row-mates drop below the
 *     newcomer and RGL's compactor settles the result. Better a reflowed row than a
 *     row of unreadable 1-column slivers.
 *
 * A boundary with nothing to its right (`free`) is just a placement: the widget fills
 * the empty columns, capped at what's actually left. Pure.
 */
/**
 * How narrow a squeezed row-mate may get when it declares no `minW` of its own — the
 * narrowest footprint the factories ever produce. Without a floor the proportional
 * squeeze happily leaves 1-column slivers, which "fit" and are unreadable; hitting
 * this floor is what makes the row infeasible and sends the mates DOWN instead.
 */
const SQUEEZE_FLOOR_COLS = 2;

export function insertWidgetAtColumn(
  spec: DashboardSpec,
  widget: WidgetSpec,
  rowY: number,
  colX: number,
  cols: number = spec.grid?.cols ?? DEFAULT_COLS,
): DashboardSpec {
  const fp = DEFAULT_FOOTPRINT[widget.type];

  // The band `rowY` opens: [rowY, next clean boundary). Only its members move.
  const rows = rowBoundaries(spec.layout);
  const bottom = rows.find((b) => b > rowY) ?? Number.POSITIVE_INFINITY;
  const inBand = (it: LayoutItem): boolean => it.y >= rowY && it.y + it.h <= bottom;
  const mates = spec.layout.filter((it) => inBand(it) && it.x >= colX);

  const place = (w: number, moved: Map<string, LayoutItem>): DashboardSpec => {
    const item: LayoutItem = {
      i: widget.id,
      x: colX,
      y: rowY,
      w,
      h: fp.h,
      minW: Math.min(fp.minW, w),
      minH: fp.minH,
    };
    return {
      ...spec,
      widgets: [...spec.widgets, widget],
      layout: [...spec.layout.map((it) => moved.get(it.i) ?? it), item],
    };
  };

  // Free right edge: nothing to move, just take the columns that are left.
  if (mates.length === 0) {
    return place(Math.max(1, Math.min(fp.w, cols - colX)), new Map());
  }

  const w = Math.min(fp.w, cols);

  // 1. Shift everyone right.
  const shifted = mates.map((it) => ({ ...it, x: it.x + w }));
  if (shifted.every((it) => it.x + it.w <= cols)) {
    return place(w, new Map(shifted.map((it) => [it.i, it])));
  }

  // 2. Squeeze them into the remaining columns, proportionally, honouring minW.
  const available = cols - colX - w;
  const spanStart = Math.min(...mates.map((it) => it.x));
  const span = Math.max(...mates.map((it) => it.x + it.w)) - spanStart;
  if (available >= 1 && span > 0) {
    const ratio = available / span;
    const squeezed = mates.map((it) => ({
      ...it,
      x: colX + w + Math.round((it.x - spanStart) * ratio),
      w: Math.max(it.minW ?? SQUEEZE_FLOOR_COLS, Math.round(it.w * ratio)),
    }));
    if (squeezed.every((it) => it.x >= colX + w && it.x + it.w <= cols)) {
      return place(w, new Map(squeezed.map((it) => [it.i, it])));
    }
  }

  // 3. Give up on the row: drop the mates below the newcomer.
  const pushed = mates.map((it) => ({ ...it, y: it.y + fp.h }));
  return place(w, new Map(pushed.map((it) => [it.i, it])));
}

/**
 * The cell metrics the EDIT canvas renders at. The editor keeps the CANONICAL column
 * count at every width and scales the cell SIZE to fit (rather than reflowing to
 * responsive breakpoints), so you always see and edit the true canonical layout.
 *
 * The scale is quantized to the nearest 0.05 so sub-pixel ResizeObserver width jitter
 * doesn't churn the metrics into a full RGL pixel-relayout every frame. Shared with the
 * insert-line overlay, which must land on exactly the pixels RGL used.
 */
export interface EditorGridMetrics {
  cols: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
  scale: number;
}

/** Design width the edit canvas' cell metrics are authored against. */
const EDIT_DESIGN_WIDTH = 900;
/** Never shrink cells below this fraction (below it the board is unreadable). */
const EDIT_MIN_SCALE = 0.4;

export function editorGridMetrics(
  grid: GridConfig | undefined,
  width: number,
): EditorGridMetrics {
  const cols = grid?.cols ?? DEFAULT_COLS;
  const rowHeight = grid?.rowHeight ?? 40;
  const margin = grid?.margin ?? [12, 12];
  const containerPadding = grid?.containerPadding ?? [0, 0];

  const rawScale = Math.max(EDIT_MIN_SCALE, Math.min(1, width / EDIT_DESIGN_WIDTH));
  const scale = Math.round(rawScale / 0.05) * 0.05;
  return {
    cols,
    rowHeight: Math.max(8, Math.round(rowHeight * scale)),
    margin: [Math.round(margin[0] * scale), Math.round(margin[1] * scale)],
    containerPadding: [
      Math.round(containerPadding[0] * scale),
      Math.round(containerPadding[1] * scale),
    ],
    scale,
  };
}

/**
 * Pixel offset (from the grid container's top) of a row boundary — RGL's own row
 * arithmetic: `top(y) = paddingTop + y * (rowHeight + marginY)`. A boundary line is
 * drawn in the MIDDLE of the gap above the row, so it reads as "between" two rows.
 */
export function rowBoundaryTop(rowY: number, m: EditorGridMetrics): number {
  const top = m.containerPadding[1] + rowY * (m.rowHeight + m.margin[1]) - m.margin[1] / 2;
  return Math.max(0, top);
}

/** Pixel height of `rows` grid rows (RGL: rows and the gaps between them). */
export function rowSpanHeight(rows: number, m: EditorGridMetrics): number {
  return Math.max(0, rows * (m.rowHeight + m.margin[1]) - m.margin[1]);
}

/**
 * Width of ONE grid column in pixels — RGL divides what's left after the container
 * padding and the inter-column gaps. Needed to place the vertical insert lines on the
 * same pixels the grid put its columns on.
 */
export function columnWidth(m: EditorGridMetrics, containerWidth: number): number {
  const usable =
    containerWidth - m.containerPadding[0] * 2 - m.margin[0] * Math.max(0, m.cols - 1);
  return Math.max(0, usable / m.cols);
}

/**
 * Pixel offset (from the grid container's left) of a column boundary — the mirror of
 * {@link rowBoundaryTop}: `left(x) = paddingLeft + x * (colWidth + marginX)`, drawn in
 * the MIDDLE of the gap to the left of that column.
 */
export function columnBoundaryLeft(
  colX: number,
  m: EditorGridMetrics,
  containerWidth: number,
): number {
  const left =
    m.containerPadding[0] + colX * (columnWidth(m, containerWidth) + m.margin[0]) - m.margin[0] / 2;
  return Math.max(0, left);
}

/**
 * A dashboard spec with a COPY of one widget appended under `newId` (placed below
 * everything, like a fresh add). Deep-clones via JSON so the copy shares no nested
 * references with the original. Pure; returns the spec unchanged if `id` is unknown.
 */
export function duplicateWidget(spec: DashboardSpec, id: string, newId: string): DashboardSpec {
  const src = spec.widgets.find((w) => w.id === id);
  if (!src) return spec;
  const copy = JSON.parse(JSON.stringify(src)) as WidgetSpec;
  copy.id = newId;
  // A QUERY-LESS family (e.g. host `ai`) keys its persisted result on
  // `familyOptions.chartId`, NOT the widget id. A verbatim clone would share that key,
  // so the two tiles collide on one result row + one cron key — reruns clobber each
  // other and only one prompt ever generates. Remint it from the fresh widget id
  // (chartId is an opaque per-(system,chartId) key, so any unique string is valid).
  if (copy.type === "chart") {
    const fo = copy.chart.familyOptions as Record<string, unknown> | undefined;
    if (fo && typeof fo.chartId === "string") {
      copy.chart = { ...copy.chart, familyOptions: { ...fo, chartId: `ai_${newId}` } };
    }
  }
  return appendWidget(spec, copy);
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
