import { createHmac } from "node:crypto";
import type { Connect, Plugin } from "vite";

/**
 * DEV-ONLY Vite plugin: mint a Cube JWT locally and proxy the Cube REST API
 * same-origin, so the playground previews real data without CORS or shipping the
 * secret to the browser. This is the "host mints the token" model for local dev —
 * exactly what the consuming app (aa-app) does in production, except here the host
 * is the Vite dev server.
 *
 *   client → /__cube/cubejs-api/v1/*  →  (this plugin mints + adds Authorization)  → Cube
 *
 * The browser never needs CUBE_API_SECRET. Defaults come from `.env`
 * (CUBE_API_URL / CUBE_API_SECRET / optional CUBE_DEV_ROLES / CUBE_DEV_SYSTEM_IDS),
 * but the preview's Settings panel can OVERRIDE the security context (and even the
 * endpoint/secret) PER REQUEST via headers — so a user can edit the connection +
 * securityContext in the UI and see rendering change live:
 *
 *   x-cube-systemids : CSV of systemIds            (securityContext.systemIds)
 *   x-cube-roles     : CSV of roles                (securityContext.roles)
 *   x-cube-endpoint  : full Cube URL               (override the .env endpoint)
 *   x-cube-secret    : signing secret              (override the .env secret)
 *
 * GET /__cube/config returns the .env DEFAULTS (never the secret) so the UI can
 * prefill its fields.
 */

const PREFIX = "/__cube";

function b64url(s: string | Buffer): string {
  return Buffer.from(s).toString("base64url");
}

function signJwt(payload: Record<string, unknown>, secret: string): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  // Cube reads the whole JWT payload as the security context, so roles + systemIds
  // sit at the TOP LEVEL (verified empirically against the live aa-cube model).
  const body = b64url(JSON.stringify({ iat: now, exp: now + 60 * 30, ...payload }));
  const data = `${header}.${body}`;
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function header(req: Connect.IncomingMessage, name: string): string | undefined {
  const v = req.headers[name];
  const s = Array.isArray(v) ? v[0] : v;
  return s && s.trim() ? s.trim() : undefined;
}

function csv(s: string | undefined): string[] {
  return s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [];
}

/** Resolve the security context from request headers, falling back to .env defaults. */
function securityContext(req?: Connect.IncomingMessage): Record<string, unknown> {
  const rolesHeader = req && header(req, "x-cube-roles");
  const sysHeader = req && header(req, "x-cube-systemids");
  const roles = rolesHeader !== undefined ? csv(rolesHeader) : csv(process.env.CUBE_DEV_ROLES) ;
  const systemIds = sysHeader !== undefined ? csv(sysHeader) : csv(process.env.CUBE_DEV_SYSTEM_IDS);
  return { roles: roles.length ? roles : ["admin"], systemIds };
}

export function cubeDevProxy(): Plugin {
  return {
    name: "cube-viz-dev-proxy",
    apply: "serve",
    configureServer(server) {
      const envUrl = process.env.CUBE_API_URL;
      const envSecret = process.env.CUBE_API_SECRET;
      if (!envUrl || !envSecret) {
        server.config.logger.warn(
          "[cube-dev-proxy] CUBE_API_URL / CUBE_API_SECRET not set — live data disabled.",
        );
      } else {
        server.config.logger.info(`[cube-dev-proxy] live Cube enabled → ${new URL(envUrl).origin}`);
      }

      server.middlewares.use(PREFIX, async (req, res) => {
        const json = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(body));
        };
        try {
          // Per-request overrides (Settings panel) → fall back to .env.
          const endpoint = header(req, "x-cube-endpoint") ?? envUrl;
          const secret = header(req, "x-cube-secret") ?? envSecret;

          // Config prefill: report defaults (NEVER the secret).
          if (req.url === "/config" || req.url === "/config/") {
            return json(200, {
              endpoint: envUrl ?? "",
              hasServerSecret: Boolean(envSecret),
              defaultRoles: csv(process.env.CUBE_DEV_ROLES),
              defaultSystemIds: csv(process.env.CUBE_DEV_SYSTEM_IDS),
            });
          }

          if (!endpoint || !secret) {
            return json(503, { error: "No Cube endpoint/secret configured (set .env or send overrides)." });
          }
          const origin = new URL(endpoint).origin;
          const ctx = securityContext(req);

          if (req.url === "/token" || req.url === "/token/") {
            return json(200, { token: signJwt(ctx, secret), apiUrl: `${PREFIX}/cubejs-api/v1` });
          }

          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const body = chunks.length ? Buffer.concat(chunks) : undefined;

          const upstream = await fetch(origin + (req.url ?? ""), {
            method: req.method,
            headers: { Authorization: signJwt(ctx, secret), "Content-Type": "application/json" },
            body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
          });

          res.statusCode = upstream.status;
          res.setHeader("Content-Type", upstream.headers.get("content-type") ?? "application/json");
          res.end(Buffer.from(await upstream.arrayBuffer()));
        } catch (e) {
          json(502, { error: `cube-dev-proxy: ${(e as Error).message}` });
        }
      });
    },
  };
}
