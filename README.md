# cube-viz

A focused library that turns JSON into rendered, editable dashboards — charts, text, and
inputs — plus standalone charts. Two jobs only: **render** specs (JSON) and **edit** them.
Charts pull data from Cube; the UI is built on shadcn/ui (Recharts) + Tailwind.
Storage, retrieval, and templating are the consuming app's concern.

Web-first. On mobile it embeds into a React Native / Expo host via a WebView — the entire
renderer and editor run inside the WebView.

## Status

Milestone 1 — **render core**: the spec contract (zod), the Cube → normalized-series
adapter, the variable resolver, the 8 chart families, and the dashboard render engine.
Editors, the preview server, and the WebView host package come in later milestones.

## Design docs

The full design record lives in [`docs/`](./docs):

1. [`01-spec-schema.md`](./docs/01-spec-schema.md) — the spec contract + variable binding
2. [`02-chart-options.md`](./docs/02-chart-options.md) — the 8-family chart-options surface
3. [`03-override-theme-preview.md`](./docs/03-override-theme-preview.md) — theme, overrides, preview server
4. [`04-webview-bridge.md`](./docs/04-webview-bridge.md) — the Expo/WebView embed bridge

## Develop

```bash
bun install
bun run dev          # Vite playground at http://localhost:5180
bun run typecheck    # tsc --noEmit
bun run build        # library build (ESM + types) via vite.config.lib.ts
```
