import cube, { type CubeApi, type Cube, type Meta } from "@cubejs-client/core";

/**
 * The Cube transport layer. This is the only file in cube-viz that constructs a
 * `@cubejs-client/core` instance — everything downstream consumes a `CubeApi`.
 * See docs/01-spec-schema.md §6.
 *
 * The SDK owns the `Continue wait` long-poll loop and sets the raw JWT as the
 * `Authorization` header (no `Bearer ` prefix), which is exactly what Cube's
 * `/v1/load` expects. We never re-implement either.
 */

/** A constructed Cube API client. Aliased so downstream code never imports the SDK class directly. */
export type CubeClient = CubeApi;

/** Connection material, shape-compatible with `CubeConnectionWire` from `@/transport/types`. */
export interface CubeConnection {
  /** Full base URL, MUST include `/cubejs-api/v1`. */
  endpoint: string;
  /** Raw JWT, or a thunk that resolves one (refresh-friendly). */
  token: string | (() => Promise<string>);
  /** Extra headers (e.g. tracing) merged into every request. */
  headers?: Record<string, string>;
}

/**
 * Construct a Cube API client from connection material.
 *
 * `cube(tokenOrThunk, { apiUrl })` is the documented v1.6 entrypoint; the token
 * may be a string or a `() => Promise<string>` so the host can refresh JWTs
 * without rebuilding the client.
 */
export function createCubeClient(conn: CubeConnection): CubeClient {
  return cube(conn.token, {
    apiUrl: conn.endpoint,
    ...(conn.headers ? { headers: conn.headers } : {}),
  });
}

/**
 * The subset of Cube's `/meta` response cube-viz consumes: cubes/views with
 * their members. Returned by {@link fetchMeta}.
 */
export interface CubeMeta {
  cubes: Cube[];
  meta: Meta;
}

/**
 * Fetch `/v1/meta` and return the cubes/views list alongside the raw `Meta`
 * helper (for `resolveMember`, `membersGroupedByCube`, etc.). The member editor
 * reads real member names from here — they are never guessed.
 */
export async function fetchMeta(api: CubeClient): Promise<CubeMeta> {
  const meta = await api.meta();
  return { cubes: meta.cubes, meta };
}
