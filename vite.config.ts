import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { cubeDevProxy } from "./playground/vite-cube-dev";
import { cubeMock } from "./playground/vite-cube-mock";

// Dev/playground config: serves index.html → playground/main.tsx against the
// library source directly (no build step while developing). cubeDevProxy mints a
// Cube JWT from .env and proxies the Cube REST API same-origin for live preview.
export default defineConfig(({ mode }) => {
  // Load .env (all keys, no VITE_ prefix filter) into process.env so the dev
  // proxy can read CUBE_API_URL / CUBE_API_SECRET regardless of the runtime.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    // cubeDevProxy serves `/__cube/*` against a REAL Cube (needs CUBE_API_URL +
    // CUBE_API_SECRET). cubeMock serves `/cubejs-api/v1/*` entirely offline and
    // self-disables when those env vars are present (unless CUBE_MOCK=1 forces it),
    // so the live-data dev path is untouched while CI — which has neither the
    // server nor the secrets — still renders real charts.
    plugins: [react(), cubeDevProxy(), cubeMock()],
    resolve: {
      alias: { "@": resolve(__dirname, "src") },
    },
    // react-draggable (via react-grid-layout) reads process.env.* at runtime; the
    // browser has no `process`, so define the few it touches to avoid a thrown
    // "process is not defined" that silently breaks drag/resize.
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode === "production" ? "production" : "development"),
      "process.env.DRAGGABLE_DEBUG": "false",
    },
    server: { port: 5180, host: true },
    build: { outDir: "dist-playground" },
  };
});
