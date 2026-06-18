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
  /** Current store snapshot — stable identity until the next `setVar`. */
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

const DashboardContext = createContext<DashboardContextValue | null>(null);
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

  const value = useStoreContext(store, decls);

  return createElement(DashboardContext.Provider, { value }, children);
}

/**
 * Build the reactive {@link DashboardContextValue} for a given store + decls.
 * Shared by the provider and any host that wires its own store.
 */
function useStoreContext(
  store: VariableStore,
  decls: VariableDecl[],
): DashboardContextValue {
  const vars = useSyncExternalStore(
    store.subscribe,
    store.getAll,
    store.getAll,
  );

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
    () => ({ vars, setVar, resolveQuery, resolveValue, decls }),
    [vars, setVar, resolveQuery, resolveValue, decls],
  );
}

/**
 * Read the dashboard variable API. Throws if no {@link DashboardProvider} is an
 * ancestor — variable-bound widgets require a store.
 */
export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (ctx === null) {
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>.",
    );
  }
  return ctx;
}

/**
 * Optional variant: returns the dashboard API if inside a {@link DashboardProvider},
 * else `null`. Used by {@link useNormalizedSeries} so a standalone chart (no
 * dashboard) still works while a dashboard-embedded one picks up variable resolution.
 */
export function useOptionalDashboard(): DashboardContextValue | null {
  return useContext(DashboardContext);
}
