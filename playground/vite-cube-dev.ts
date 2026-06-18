import { createHmac } from "node:crypto";
import type { Plugin } from "vite";

/**
 * DEV-ONLY Vite plugin: mint a Cube JWT locally from .env and proxy the Cube REST
 * API same-origin, so the playground previews real data without CORS or shipping
 * the secret to the browser. This is the "host mints the token" model realized for
 * local dev — exactly what the consuming app (aa-app) does in production, except
 * here the host is the Vite dev server reading a local .env.
 *
 *   client → /__cube/cubejs-api/v1/*  →  (this plugin adds Authorization)  → Cube
 *
 * The browser never sees CUBE_API_SECRET; it only ever calls same-origin /__cube.
 */

const PREFIX = "/__cube";

function b64url(s: string | Buffer): string {
  return Buffer.from(s).toString("base64url");
}

function signJwt(payload: Record<string, unknown>, secret: string): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  // Cube here reads the whole JWT payload as the security context, so roles +
  // systemIds sit at the TOP LEVEL (verified empirically against the live model).
  const body = b64url(JSON.stringify({ iat: now, exp: now + 60 * 30, ...payload }));
  const data = `${header}.${body}`;
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function securityContext(): Record<string, unknown> {
  const rolesEnv = process.env.CUBE_DEV_ROLES?.trim();
  const sysEnv = process.env.CUBE_DEV_SYSTEM_IDS?.trim();
  const roles = rolesEnv ? rolesEnv.split(",").map((s) => s.trim()).filter(Boolean) : ["admin"];
  const systemIds = sysEnv ? sysEnv.split(",").map((s) => s.trim()).filter(Boolean) : [];
  return { roles, systemIds };
}

export function cubeDevProxy(): Plugin {
  return {
    name: "cube-viz-dev-proxy",
    apply: "serve",
    configureServer(server) {
      const url = process.env.CUBE_API_URL;
      const secret = process.env.CUBE_API_SECRET;
      if (!url || !secret) {
        server.config.logger.warn(
          "[cube-dev-proxy] CUBE_API_URL / CUBE_API_SECRET not set — live data disabled (mock only).",
        );
        return;
      }
      const origin = new URL(url).origin;
      const ctx = securityContext();
      server.config.logger.info(
        `[cube-dev-proxy] live Cube enabled → ${origin} (roles=${JSON.stringify(
          (ctx.roles as string[]),
        )}, systemIds=${(ctx.systemIds as string[]).length})`,
      );

      server.middlewares.use(PREFIX, async (req, res) => {
        try {
          // Expose the minted token / connection info for the "direct" path too.
          if (req.url === "/token" || req.url === "/token/") {
            const token = signJwt(securityContext(), secret);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ token, apiUrl: `${PREFIX}/cubejs-api/v1` }));
            return;
          }

          const target = origin + (req.url ?? "");
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const body = chunks.length ? Buffer.concat(chunks) : undefined;

          const upstream = await fetch(target, {
            method: req.method,
            headers: {
              Authorization: signJwt(securityContext(), secret),
              "Content-Type": "application/json",
            },
            body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
          });

          res.statusCode = upstream.status;
          res.setHeader("Content-Type", upstream.headers.get("content-type") ?? "application/json");
          res.end(Buffer.from(await upstream.arrayBuffer()));
        } catch (e) {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: `cube-dev-proxy: ${(e as Error).message}` }));
        }
      });
    },
  };
}
