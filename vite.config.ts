import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { cubeDevProxy } from "./playground/vite-cube-dev";

// Dev/playground config: serves index.html → playground/main.tsx against the
// library source directly (no build step while developing). cubeDevProxy mints a
// Cube JWT from .env and proxies the Cube REST API same-origin for live preview.
export default defineConfig(({ mode }) => {
  // Load .env (all keys, no VITE_ prefix filter) into process.env so the dev
  // proxy can read CUBE_API_URL / CUBE_API_SECRET regardless of the runtime.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), tailwindcss(), cubeDevProxy()],
    resolve: {
      alias: { "@": resolve(__dirname, "src") },
    },
    server: { port: 5180, host: true },
    build: { outDir: "dist-playground" },
  };
});
