import * as React from "react";

import {
  isVarRef,
  type DashboardSpec,
  type QueryFilter,
  type VariableValue,
  type WidgetSpec,
} from "@/spec";
import { useOptionalDashboard } from "@/hooks";
import {
  ChartInteractionProvider,
  type ChartInteractionHandlers,
  type PointSelection,
  type RangeSelection,
} from "@/provider/interactions";

/**
 * Drill + cross-filter, resolved INSIDE the dashboard.
 *
 * A brush or a click is a semantic selection ({@link RangeSelection} /
 * {@link PointSelection}); the obvious thing to do with one is to write it to the
 * dashboard variable the affected widgets already read. Doing that here rather
 * than in the host matters for the WebView embed: host callbacks cross an
 * async marshalled boundary, so a round-trip to re-filter would land a frame or
 * more late. Resolving against the local store keeps brushing immediate, and the
 * host handler still fires afterwards for persistence/telemetry.
 *
 * The bindings are read from the spec, so nothing is inferred:
 *  - brushing a widget whose `dateRange` is `{var: "x"}` writes `[from, to]` to `x`;
 *  - clicking a mark whose member is compared against `{var: "y"}` in some
 *    widget's filters writes `[value]` to `y`.
 * A selection with no binding is passed through untouched — the dashboard simply
 * has nothing to narrow, which is the correct no-op.
 */

/** Only chart widgets carry a query; text/input/heading widgets never bind one. */
type ChartWidget = Extract<WidgetSpec, { type: "chart" }>;
const chartWidgets = (widgets: readonly WidgetSpec[]): ChartWidget[] =>
  widgets.filter((w): w is ChartWidget => w.type === "chart");

/** widgetId → the variable name bound to that widget's time window. @internal exported for tests */
export function dateRangeVarByWidget(widgets: readonly WidgetSpec[]): Map<string, string> {
  const out = new Map<string, string>();
  for (const w of chartWidgets(widgets)) {
    const td = w.query?.timeDimensions?.[0];
    if (td && isVarRef(td.dateRange)) out.set(w.id, td.dateRange.var);
  }
  return out;
}

/**
 * member → the variable name that member is filtered by, anywhere on the board.
 * A dimension is usually filtered on ONE variable across a dashboard (that is the
 * point of a shared control), so the first binding found wins.
 */
export function filterVarByMember(widgets: readonly WidgetSpec[]): Map<string, string> {
  const out = new Map<string, string>();
  // `filters` is a recursive and/or tree, so a binding can sit at any depth.
  const walk = (filters: readonly QueryFilter[]): void => {
    for (const f of filters) {
      if ("and" in f) walk(f.and);
      else if ("or" in f) walk(f.or);
      else if (!out.has(f.member)) {
        const bound = (f.values ?? []).find(isVarRef);
        if (bound) out.set(f.member, bound.var);
      }
    }
  };
  for (const w of chartWidgets(widgets)) walk(w.query?.filters ?? []);
  return out;
}

export interface DashboardDrillProps extends ChartInteractionHandlers {
  spec: DashboardSpec;
  /**
   * Opt in to brushing/clicking a chart to narrow the board. OFF by default and
   * deliberately so: mounting a brush hands plot pointer events to the D3
   * overlay, which trades that chart's hover inspection for drag-to-select.
   * Reading a value off a tooltip is the more common act, so a board only makes
   * that trade when it asks to. A host handler is honored regardless — supplying
   * one is itself a request for the selection.
   */
  drill?: boolean;
  children: React.ReactNode;
}

export function DashboardDrill({
  spec,
  drill = false,
  onRangeSelect,
  onPointSelect,
  children,
}: DashboardDrillProps): React.ReactElement {
  // `useOptionalDashboard` is the STABLE half of the API — depending on it does
  // not re-render this subtree when a variable changes.
  const api = useOptionalDashboard();
  const setVar = api?.setVar;

  const rangeVars = React.useMemo(() => dateRangeVarByWidget(spec.widgets), [spec.widgets]);
  const filterVars = React.useMemo(() => filterVarByMember(spec.widgets), [spec.widgets]);

  // Host handlers ride a ref so an inline arrow from the host never rebuilds the
  // composed handlers (and, below them, every chart definition on the board).
  const hostRef = React.useRef<ChartInteractionHandlers>({ onRangeSelect, onPointSelect });
  hostRef.current = { onRangeSelect, onPointSelect };

  const handleRange = React.useCallback(
    (sel: RangeSelection | null) => {
      if (setVar) {
        // A cleared brush restores the variable's default rather than emptying it,
        // so the board returns to the range its controls advertise.
        const name = sel?.widgetId ? rangeVars.get(sel.widgetId) : undefined;
        if (name) setVar(name, sel ? ([sel.from, sel.to] as VariableValue) : undefined);
        else if (!sel) for (const v of new Set(rangeVars.values())) setVar(v, undefined);
      }
      hostRef.current.onRangeSelect?.(sel);
    },
    [setVar, rangeVars],
  );

  const handlePoint = React.useCallback(
    (sel: PointSelection | null) => {
      if (setVar) {
        if (sel) {
          const name = filterVars.get(sel.member);
          if (name) setVar(name, [String(sel.value)]);
        } else {
          for (const v of new Set(filterVars.values())) setVar(v, undefined);
        }
      }
      hostRef.current.onPointSelect?.(sel);
    },
    [setVar, filterVars],
  );

  // Only advertise a handler when it can actually do something: an unbound board
  // with no host handler must not mount a brush that silently does nothing, and
  // local resolution only runs when the board opted in.
  const rangeEnabled = Boolean(onRangeSelect || (drill && setVar && rangeVars.size));
  const pointEnabled = Boolean(onPointSelect || (drill && setVar && filterVars.size));

  return (
    <ChartInteractionProvider
      onRangeSelect={rangeEnabled ? handleRange : undefined}
      onPointSelect={pointEnabled ? handlePoint : undefined}
    >
      {children}
    </ChartInteractionProvider>
  );
}
