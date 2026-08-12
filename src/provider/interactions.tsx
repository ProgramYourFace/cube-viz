import * as React from "react";

import type { Granularity } from "@/spec";

/**
 * The SEMANTIC interaction seam (drill / cross-filter). cube-viz never hands a
 * host pixels, scene coordinates, or renderer points: a chart reports what the
 * reader pointed AT in Cube terms — a member plus either an ISO time range or a
 * dimension value — and the host decides what that means (drill into a window,
 * cross-filter the other widgets, navigate…).
 *
 * Two levels supply the handlers, innermost wins:
 *  - dashboard/app-wide: `<CubeVizProvider interactions={…}>` or
 *    `<Dashboard onRangeSelect onPointSelect>` — one pair for every widget;
 *    `widgetId` on the emitted selection names the source widget.
 *  - per chart: `<CubeChart onRangeSelect onPointSelect>` / `<ChartView …>` —
 *    overrides the ambient handler for that chart only.
 *
 * Handlers are OPTIONAL end to end. With none supplied `rangeEnabled` /
 * `pointEnabled` stay false: no brush is mounted and no `onSelect` is attached,
 * so an existing embed renders and behaves exactly as before.
 *
 * **Identity discipline.** A chart definition is memoized and its identity is the
 * update boundary, so this context value must NOT change when a host passes a
 * fresh inline arrow every render. The handlers are therefore held in a ref and
 * reached through the two STABLE emitters below; the context value's identity
 * only changes when a capability flag, the widget id, or the semantic target
 * changes.
 */

/** A committed time-range brush, in the mapped time dimension's own terms. */
export interface RangeSelection {
  /** The widget the selection came from (dashboard-wide handlers disambiguate with it). */
  widgetId?: string;
  /** The Cube time-dimension member the range applies to (e.g. `trips.start_time`). */
  member: string;
  /** The bucket granularity of that member, when the annotation carries one. */
  granularity?: Granularity;
  /** Inclusive ISO start — the first selected bucket, exactly as Cube emitted it. */
  from: string;
  /** Inclusive ISO end — the last selected bucket, exactly as Cube emitted it. */
  to: string;
}

/** A clicked datum, reported as the dimension member + value it stands for. */
export interface PointSelection {
  /** The widget the selection came from. */
  widgetId?: string;
  /** The Cube dimension member the value belongs to (category or colour split). */
  member: string;
  /** The RAW member value — what a host puts in a Cube `equals` filter. */
  value: string | number;
  /** The rendered display label for that value (already formatted). */
  label: string;
}

export type RangeSelectHandler = (selection: RangeSelection | null) => void;
export type PointSelectHandler = (selection: PointSelection | null) => void;

/** The optional handler pair a host supplies at any level. */
export interface ChartInteractionHandlers {
  /**
   * A time range was brushed on a chart with a TEMPORAL category axis. Called
   * with `null` when the brush is cleared (a click on empty plot).
   */
  onRangeSelect?: RangeSelectHandler;
  /**
   * A bar / point / slice / cell was clicked. Called with `null` when the reader
   * clicks the blank surface (clear the cross-filter).
   */
  onPointSelect?: PointSelectHandler;
}

/**
 * The per-chart semantic context the emitters need to name what was clicked.
 * Supplied by {@link import("@/render").CubeChart} (it is the layer that holds
 * both the resolved `mapping` and the bound formatter); charts only READ it.
 */
export interface ChartInteractionTarget {
  /** `mapping.category.member` — the dimension on the category axis. */
  categoryMember?: string;
  /** `mapping.series.pivot` — the colour-split dimension, when the series ARE a split. */
  pivotMember?: string;
  /** The chart's bound category formatter, for a selection's display label. */
  formatCategory?: (value: string | number) => string;
}

/** What a chart reads: capability flags, the semantic target, and stable emitters. */
export interface ChartInteractions {
  /** The innermost widget id, stamped onto every emitted selection. */
  widgetId?: string;
  target: ChartInteractionTarget;
  /** A range handler exists somewhere up the tree ⇒ mount the brush. */
  rangeEnabled: boolean;
  /** A point handler exists somewhere up the tree ⇒ attach `onSelect`. */
  pointEnabled: boolean;
  /** Stable for the provider's lifetime — safe inside a definition `useMemo`. */
  emitRange: RangeSelectHandler;
  /** Stable for the provider's lifetime — safe inside a definition `useMemo`. */
  emitPoint: PointSelectHandler;
}

const NO_TARGET: ChartInteractionTarget = {};
const noop = (): void => {};

/** The default outside any provider: nothing enabled, emitters inert, identity fixed. */
const NO_INTERACTIONS: ChartInteractions = {
  target: NO_TARGET,
  rangeEnabled: false,
  pointEnabled: false,
  emitRange: noop,
  emitPoint: noop,
};

const ChartInteractionContext = React.createContext<ChartInteractions | null>(null);
ChartInteractionContext.displayName = "ChartInteractionContext";

/**
 * Read the ambient interaction seam. Outside any provider this returns a FROZEN
 * module-level value, so a standalone family (or a preview harness) mounts with
 * no brush, no select handler, and no re-render churn.
 */
export function useChartInteractions(): ChartInteractions {
  return React.useContext(ChartInteractionContext) ?? NO_INTERACTIONS;
}

export interface ChartInteractionProviderProps extends ChartInteractionHandlers {
  /** Names the source widget on every selection emitted below this provider. */
  widgetId?: string;
  /** Per-chart semantic context (category/pivot member + label formatter). */
  target?: ChartInteractionTarget;
  children: React.ReactNode;
}

/**
 * Publish (or override) the interaction handlers for a subtree. Nesting is
 * innermost-wins PER CHANNEL: a chart that supplies only `onPointSelect` still
 * inherits the dashboard's `onRangeSelect`. `widgetId` and `target` are merged
 * the same way, so the widget level names the source without the dashboard level
 * having to know about it.
 */
export function ChartInteractionProvider({
  widgetId,
  onRangeSelect,
  onPointSelect,
  target,
  children,
}: ChartInteractionProviderProps): React.ReactElement {
  const parent = React.useContext(ChartInteractionContext);

  // Latest-ref: the emitters below close over THIS box, never over the props, so
  // a host's inline `onPointSelect={(s) => …}` never changes the context value
  // (and therefore never rebuilds a memoized chart definition).
  const latest = React.useRef({ parent, widgetId, onRangeSelect, onPointSelect });
  React.useLayoutEffect(() => {
    latest.current = { parent, widgetId, onRangeSelect, onPointSelect };
  });

  const emitRange = React.useCallback<RangeSelectHandler>((selection) => {
    const { parent: up, widgetId: id, onRangeSelect: own } = latest.current;
    const stamped =
      selection && selection.widgetId === undefined && id !== undefined
        ? { ...selection, widgetId: id }
        : selection;
    if (own) own(stamped);
    else up?.emitRange(stamped);
  }, []);

  const emitPoint = React.useCallback<PointSelectHandler>((selection) => {
    const { parent: up, widgetId: id, onPointSelect: own } = latest.current;
    const stamped =
      selection && selection.widgetId === undefined && id !== undefined
        ? { ...selection, widgetId: id }
        : selection;
    if (own) own(stamped);
    else up?.emitPoint(stamped);
  }, []);

  const rangeEnabled = Boolean(onRangeSelect) || (parent?.rangeEnabled ?? false);
  const pointEnabled = Boolean(onPointSelect) || (parent?.pointEnabled ?? false);

  const parentTarget = parent?.target;
  const resolvedTarget = React.useMemo<ChartInteractionTarget>(
    () => (parentTarget || target ? { ...parentTarget, ...target } : NO_TARGET),
    [parentTarget, target],
  );

  const value = React.useMemo<ChartInteractions>(
    () => ({
      widgetId: widgetId ?? parent?.widgetId,
      target: resolvedTarget,
      rangeEnabled,
      pointEnabled,
      emitRange,
      emitPoint,
    }),
    [widgetId, parent?.widgetId, resolvedTarget, rangeEnabled, pointEnabled, emitRange, emitPoint],
  );

  return (
    <ChartInteractionContext.Provider value={value}>{children}</ChartInteractionContext.Provider>
  );
}
