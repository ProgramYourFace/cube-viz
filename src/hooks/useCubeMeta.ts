import { useEffect, useState } from "react";

import { fetchMeta } from "@/adapter";
import type { CubeMeta } from "@/adapter";
import { useCubeVizContext } from "@/provider";

/**
 * Cube `/v1/meta` introspection (docs/03-override-theme-preview.md §A2.5). Powers
 * editors / field pickers, which read real member names verbatim (never guessed —
 * critical for `prefix:true` view members like `trip_performance.devices_name`).
 *
 * `/v1/meta` returns shape only; it never issues `/v1/load`. The result is fetched
 * once per Cube client and re-fetched if the client identity changes; stale
 * responses are ignored.
 */

export interface UseCubeMetaResult {
  meta?: CubeMeta;
  isLoading: boolean;
  error?: Error;
}

export function useCubeMeta(): UseCubeMetaResult {
  const { cubeClient } = useCubeVizContext();
  const [state, setState] = useState<UseCubeMetaResult>({ isLoading: true });

  useEffect(() => {
    let active = true;
    setState({ isLoading: true });

    fetchMeta(cubeClient)
      .then((meta) => {
        if (active) setState({ meta, isLoading: false });
      })
      .catch((err: unknown) => {
        if (active) {
          setState({
            isLoading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          });
        }
      });

    return () => {
      active = false;
    };
  }, [cubeClient]);

  return state;
}
