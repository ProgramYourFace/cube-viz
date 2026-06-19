import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// Library build config: emits an ESM bundle + types. React/Recharts/RGL/etc.
// stay external so the host app dedupes them. The host owns its own bundler.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.json", include: ["src"] }),
  ],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  build: {
    lib: {
      // Core (`cube-viz`) + the opt-in `cube-viz/presets` entry, emitted separately.
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        presets: resolve(__dirname, "src/presets/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^react-dom\//,
        "recharts",
        "react-grid-layout",
        "@cubejs-client/core",
        /^@tiptap\//,
        "zod",
        "date-fns",
        "lucide-react",
        /^@radix-ui\//,
        "react-day-picker",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        entryFileNames: "[name].js",
        // theme.css is emitted separately from the bundled component CSS.
        assetFileNames: (info) =>
          info.names?.some((n) => n.endsWith("theme.css")) ? "theme.css" : "[name][extname]",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
