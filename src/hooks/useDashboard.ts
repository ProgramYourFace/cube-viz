import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";

import type {
  CubeQuery,
  DashboardSpec,
  VariableDecl,
  VariableValue,
} from "@/spec";
import {
  createVariableStore,
  resolveQuery as resolveQueryPure,
  resolveValue as resolveValuePure,
  type VariableStore,
} from "@/variables";

/**
 * The dashboard variable layer (docs/03-override-theme-preview.md §A2.5): a React
 * adapter over the framework-free {@link createVariableStore}, wiring the three-
 * legged binding model. `DashboardProvider` owns one store seeded from the spec's
 * `VariableDecl[]` defaults; `useDashboard` reads it reactively and exposes:
 *
 *  - `vars`         — current store snapshot (re-renders on every `set`)
 *  - `setVar`       — Leg 1 write
 *  - `resolveQuery` — Leg 2: substitute `{var}` tokens + apply the noFilter rule
 *  - `resolveValue` — Leg 3: read one variable back (store → decl default)
 *
 * The same context is consumed optionally by {@link useNormalizedSeries}, so a
 * widget inside a `DashboardProvider` automatically picks up variable resolution.
 */

/** The reactive dashboard API surfaced by {@link useDashboard}. */
export interface DashboardContextValue {
  /**
   * Current store snapshot. NOTE: reading this on the context value is a point-in-time
   * read — it is NOT reactive by itself. Components that must re-render when a variable
   * changes should call {@link useDashboardVar} (a per-name subscription) or
   * {@link resolveValue} inside a component that subscribes; depending on this object's
   * `vars` no longer forces a board-wide re-render on every `setVar`.
   */
  vars: Record<string, VariableValue>;
  /** Leg 1: write a variable (`undefined` clears it back toward its default). */
  setVar: (name: string, value: VariableValue | undefined) => void;
  /** Leg 2: resolve a query (substitute `{var}` + drop emptied predicates). */
  resolveQuery: (query: CubeQuery) => CubeQuery;
  /** Leg 3: read one variable back (store value → decl default → undefined). */
  resolveValue: (name: string) => VariableValue | undefined;
  /** The declarations backing the store (for control UIs / validation). */
  decls: VariableDecl[];
}

/**
 * The STABLE half of the dashboard API (everything except the live `vars` snapshot).
 * Its identity is constant for the life of a provider instance, so consuming it (e.g.
 * to call `resolveQuery`/`setVar`/`resolveValue`) does NOT re-render on every `setVar`.
 * The live `vars` snapshot is exposed separately via a per-consumer subscription
 * ({@link useDashboardVar} / the lazily-subscribed `vars` getter in {@link useDashboard}),
 * so a single variable write only re-renders the widgets that actually read it.
 */
interface StableDashboardApi {
  store: VariableStore;
  setVar: (name: string, value: VariableValue | undefined) => void;
  resolveQuery: (query: CubeQuery) => CubeQuery;
  resolveValue: (name: string) => VariableValue | undefined;
  decls: VariableDecl[];
}

const DashboardContext = createContext<StableDashboardApi | null>(null);
DashboardContext.displayName = "DashboardContext";

export interface DashboardProviderProps {
  /** The dashboard whose `variables` seed the store (uses `spec.variables`). */
  spec: DashboardSpec;
  /** Optional initial overrides layered over the decl defaults. */
  initialValues?: Record<string, VariableValue>;
  children: ReactNode;
}

/**
 * Provide a reactive variable store seeded from a dashboard's declarations. The
 * store is created once per provider instance (keyed by decl identity) and
 * survives re-renders; `setVar` mutations re-render consumers via
 * `useSyncExternalStore`.
 */
export function DashboardProvider({
  spec,
  initialValues,
  children,
}: DashboardProviderProps): ReactElement {
  const decls = spec.variables;

  // Create the store once per (decls, initialValues) identity. A ref keeps it
  // stable across re-renders without re-seeding on every render.
  const storeRef = useRef<{ store: VariableStore; key: VariableDecl[] } | null>(null);
  if (storeRef.current === null || storeRef.current.key !== decls) {
    storeRef.current = { store: createVariableStore(decls, initialValues), key: decls };
  }
  const store = storeRef.current.store;

  const value = useStableApi(store, decls);

  return createElement(DashboardContext.Provider, { value }, children);
}

/**
 * Build the STABLE {@link StableDashboardApi} for a given store + decls. Holds no live
 * `vars` snapshot, so its identity only changes when the `store`/`decls` identity does
 * (i.e. on a provider re-seed) — NOT on every `setVar`. Shared by the provider and any
 * host that wires its own store.
 */
function useStableApi(
  store: VariableStore,
  decls: VariableDecl[],
): StableDashboardApi {
  const setVar = useCallback(
    (name: string, value: VariableValue | undefined) => store.set(name, value),
    [store],
  );

  const resolveQuery = useCallback(
    (query: CubeQuery): CubeQuery => resolveQueryPure(query, store.getAll(), decls),
    [store, decls],
  );

  const resolveValue = useCallback(
    (name: string): VariableValue | undefined => resolveValuePure(name, store.getAll(), decls),
    [store, decls],
  );

  return useMemo(
    () => ({ store, setVar, resolveQuery, resolveValue, decls }),
    [store, setVar, resolveQuery, resolveValue, decls],
  );
}

/**
 * Adapt the stable API into the public {@link DashboardContextValue}. The `vars` field
 * is filled from a LIVE subscription (`useSyncExternalStore`) so a component that reads
 * it (or that calls `resolveValue` for a value that just changed) re-renders — but a
 * component that only consumes the stable callbacks (resolveQuery/setVar) and never
 * touches `vars` pays no churn. The returned object is rebuilt only when `vars` or the
 * stable api identity changes.
 */
function useDashboardValue(api: StableDashboardApi): DashboardContextValue {
  const vars = useSyncExternalStore(api.store.subscribe, api.store.getAll, api.store.getAll);
  return useMemo(
    () => ({
      vars,
      setVar: api.setVar,
      resolveQuery: api.resolveQuery,
      resolveValue: api.resolveValue,
      decls: api.decls,
    }),
    [vars, api],
  );
}

/**
 * Read the dashboard variable API. Throws if no {@link DashboardProvider} is an
 * ancestor — variable-bound widgets require a store.
 *
 * This hook subscribes to the variable store: a component using it re-renders when ANY
 * variable changes (because it exposes the live `vars` snapshot + a reactive
 * `resolveValue`). Input/control widgets that read their bound value want exactly this.
 * Code that only needs the stable callbacks (e.g. `resolveQuery` in
 * {@link useNormalizedSeries}) should destructure them from {@link useOptionalDashboard}
 * so it does NOT subscribe and does NOT re-render on unrelated variable edits.
 */
export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (ctx === null) {
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>.",
    );
  }
  return useDashboardValue(ctx);
}

/**
 * Optional variant: returns the STABLE dashboard API if inside a
 * {@link DashboardProvider}, else `null`. Does NOT subscribe to variable changes, so a
 * consumer re-renders only when it reads something that actually changed. Used by
 * {@link useNormalizedSeries} (depends on the stable `resolveQuery`) so a standalone
 * chart still works while a dashboard-embedded one picks up variable resolution without
 * re-normalizing board-wide on every unrelated `setVar`.
 */
export function useOptionalDashboard(): StableDashboardApi | null {
  return useContext(DashboardContext);
}
