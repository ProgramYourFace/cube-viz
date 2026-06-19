import { useCallback, useEffect, useMemo, useState } from "react";
import type { Query, ResultSet } from "@cubejs-client/core";

import type { CubeQuery } from "@/spec";
import { useCubeVizContext } from "@/provider";

/**
 * The raw Cube fetch hook (docs/03-override-theme-preview.md §A2.5). Loads a
 * **resolved** query (variables already substituted) through the context's Cube
 * client, with `castNumerics: true` so number members arrive as numbers. The SDK
 * owns the `Continue wait` long-poll loop and the raw-JWT `Authorization` header —
 * we never re-implement either.
 *
 * Stale-response safety: each fetch is keyed by a stable serialization of the
 * query; a response is applied only if its key still matches the latest request,
 * so a fast edit never lets an older in-flight result clobber a newer one.
 */

export interface UseCubeQueryResult {
  resultSet?: ResultSet<Record<string, unknown>>;
  isLoading: boolean;
  error?: Error;
  /** Force a re-fetch (cache-bypass via a fresh request), e.g. a Refresh action. */
  refetch?: () => void;
}

export interface UseCubeQueryOptions {
  /** When true, no request is issued (e.g. an incomplete editor query). */
  skip?: boolean;
}

/** Safety cap applied when a query omits `limit`, so a high-cardinality dimension can't
 *  flood the browser/WebView with an unbounded result. An explicit `limit` always wins. */
export const DEFAULT_ROW_CAP = 5000;

export function useCubeQuery(
  query: CubeQuery,
  opts?: UseCubeQueryOptions,
): UseCubeQueryResult {
  const { cubeClient } = useCubeVizContext();
  const skip = opts?.skip ?? false;

  // Apply the default row cap when the query sets no explicit limit (a runaway guard for
  // high-cardinality dimensions). Charts should top-N well below this; it's a safety net.
  const effectiveQuery = useMemo<CubeQuery>(
    () => (query.limit === undefined ? { ...query, limit: DEFAULT_ROW_CAP } : query),
    [query],
  );

  // Stable dependency key: a deterministic serialization of the query. This is
  // the cancel/ignore boundary — a changed key supersedes any in-flight fetch.
  const queryKey = useMemo(() => JSON.stringify(effectiveQuery), [effectiveQuery]);

  const [state, setState] = useState<UseCubeQueryResult>({ isLoading: !skip });
  // A monotonic nonce: bumping it re-runs the fetch effect (Refresh / cache-bypass).
  const [nonce, setNonce] = useState(0);
  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (skip) {
      setState({ isLoading: false });
      return;
    }

    let active = true;
    setState((prev) => ({ resultSet: prev.resultSet, isLoading: true }));

    cubeClient
      // Cast at the Cube seam: our CubeQuery is structurally compatible with the
      // SDK's loose `Query`, which the SDK's own types keep `any`-heavy.
      .load(effectiveQuery as unknown as Query, { castNumerics: true })
      .then((resultSet) => {
        if (!active) return;
        setState({
          resultSet: resultSet as ResultSet<Record<string, unknown>>,
          isLoading: false,
        });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          isLoading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => {
      active = false;
    };
    // `query` is captured via `queryKey`; re-fetch whenever the client, key, skip flag,
    // or refetch nonce changes. (queryKey is the serialized query; query is read inside.)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cubeClient, queryKey, skip, nonce]);

  return { ...state, refetch };
}
