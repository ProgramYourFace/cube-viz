I'll produce the design section directly. This is a writing task and I have everything I need from the brief, the prior design parts, and the authoritative user clarification.

# cube-viz — Part C: The Expo / WebView Embed Bridge

> Companion to **Part A (Theme + Override Surface)** and **Part B (Preview Server)**. cube-viz is **web-first**: one web bundle is the product and where all engineering goes. On mobile it is embedded into the existing Expo / React Native app (aa-app) via `react-native-webview`. There are **no native RN dashboard or editor components** — the *entire* renderer and the *entire* editor run inside the WebView. The mobile widget edit panel is a **web bottom sheet rendered inside the WebView**, not a native RN sheet. This document defines the contract by which the Expo host drives that web bundle: the host-side component, the postMessage protocol, the Transport seam that unifies all three runtimes, the WebView-specific plumbing, the security model, and the save round-trip.

---

## C0. Design axioms (this layer)

1. **The bundle renders; the host owns I/O and identity.** The WebView is a pure rendering/editing surface. It never persists, never mints tokens, never decides where bytes go. Persistence is Convex (host); the Cube connection + token are host-supplied.
2. **One web entry, three transports.** Standalone web, preview server, and WebView embed are the **same renderer/editor** behind a `Transport` interface. The WebView is just `WebViewTransport`.
3. **The connection is injected after load, never baked in.** The token never enters the bundle URL, query string, bundle source, `localStorage`, or any log. It arrives over a postMessage *after* the web side announces `READY`, lives only in WebView JS memory, and dies with the WebView.
4. **The bridge is symmetric across all three runtimes.** Same mental model everywhere: the core asks a `Transport` for its spec/connection/theme and reports changes back. Only the wire differs (function calls vs HTTP vs postMessage).
5. **Fail visible, fail closed.** Load failure, offline, missing connection, and protocol-version mismatch all render a deterministic fallback UI inside the WebView rather than a blank or a broken chart. An unset variable still obeys `noFilter` (Part A); RLS still lives only in the JWT.

---

## C1. Host-side helper — `<CubeVizWebView>`

A single React Native component wrapping `react-native-webview`. It is the host's entire integration surface: pass a spec in, get edits out. It is **declarative** — props drive the WebView via protocol messages; callbacks surface web-side events.

### C1.1 Props & callbacks

```tsx
import { CubeVizWebView } from "@aa/cube-viz-rn"; // thin host package; depends on react-native-webview

<CubeVizWebView
  // ── data in ──
  spec={chartOrDashboardSpec}            // ChartSpec | DashboardSpec (JSON object)
  cubeConnection={{                      // host-owned; injected post-READY, never baked in
    endpoint: "https://cube.allaware.app/cubejs-api/v1",
    token: cubeJwt,                      // short-lived JWT w/ securityContext.systemIds
  }}
  mode="view"                            // 'view' | 'edit'
  theme={{ mode: "dark", tokens: themeTokens }} // mirror app light/dark into the WebView
  variables={{ dateRange: "This month", granularity: "day" }} // seed values for dashboard vars

  // ── events out ──
  onSpecChange={(spec) => {/* edited JSON (debounced); stage/autosave */}}
  onSaveRequested={(spec) => {/* explicit save; persist to Convex, may echo back */}}
  onVariableChange={(name, value) => {/* a control wrote a dashboard variable */}}
  onHeightChange={(px) => setHeight(px)} // non-scrolling embed height sync
  onError={(err) => {/* {code, message, fatal} */}}
  onAnalytics={(evt) => {/* optional; posthog passthrough */}}
  onReady={() => {/* handshake complete; safe to assume INIT applied */}}

  // ── host layout knobs ──
  autoHeight                              // size RN view to CONTENT_HEIGHT (charts), default true
  style={{ width: "100%" }}
/>
```

```ts
interface CubeVizWebViewProps {
  spec: ChartSpec | DashboardSpec;
  cubeConnection: { endpoint: string; token: string | (() => Promise<string>); headers?: Record<string,string> };
  mode?: "view" | "edit";
  theme?: { mode: "light" | "dark"; tokens?: ThemeTokenOverrides };
  variables?: Record<string, VariableValue>;

  onReady?: () => void;
  onSpecChange?: (spec: Spec) => void;       // SPEC_CHANGED (debounced edits)
  onSaveRequested?: (spec: Spec) => void;    // SAVE_REQUESTED (explicit save)
  onVariableChange?: (name: string, value: VariableValue) => void;
  onHeightChange?: (heightPx: number) => void;
  onError?: (err: BridgeError) => void;
  onAnalytics?: (evt: AnalyticsEvent) => void;

  autoHeight?: boolean;                       // default true
  scrollEnabled?: boolean;                    // default false (host owns scroll; see C4.3)
  style?: ViewStyle;
}
```

### C1.2 Internal behavior (what the component does)

- Holds an imperative `ref` to the `WebView` and a `pendingInit` snapshot (spec+connection+theme+mode+variables) captured from the *latest* props.
- On `READY` from the web side → posts `INIT` with that snapshot. (Handshake, C2.4.)
- On every relevant prop change *after* READY → posts the corresponding targeted message: `spec` → `SET_SPEC`, `variables` (host-driven) → `SET_VARIABLE`, `theme` → `SET_THEME`, `mode` → `SET_MODE`. Shallow-equality guards prevent echo loops (don't re-`SET_SPEC` a spec we just received via `SPEC_CHANGED`; see C6.4).
- Routes inbound web→host messages to the matching callback prop.
- When `autoHeight` is on, applies `CONTENT_HEIGHT` to its own RN view height (C4.2).
- Token handling: if `cubeConnection.token` is a thunk, the host component resolves it just-in-time before each `INIT`/`SET_CONNECTION` and passes only the resolved string into the message — the thunk itself never crosses the bridge.

### C1.3 Where the WebView points: **bundled local asset (recommended)** vs remote URL

**Recommendation: ship the web bundle as a local Expo asset and load it from `file://` (Android: `baseUrl`-anchored local HTML; iOS: `WKWebView` with `allowingReadAccessToURL`).** A remote URL is supported as an opt-in for staging/dev only.

```tsx
// Bundled asset path (recommended)
import { Asset } from "expo-asset";
// at build time the web bundle is copied into assets; resolved to a file:// uri at runtime
const source = { uri: localBundleUri };       // file:///.../cube-viz/index.html
```

**Why local-asset wins for the production embed:**

| Concern | Local asset (`file://`) | Remote URL |
|---|---|---|
| **Offline** | Works with no network for the *shell*; only Cube calls need network | Blank/spinner with no network; the embed itself fails to load |
| **Version coupling** | Bundle is pinned to the app binary → renderer/editor always matches the host bridge protocol | Bundle can drift ahead/behind the installed app's bridge version |
| **Latency / cold start** | Instant local load; no CDN round-trip | Network-bound first paint |
| **Security surface** | `originWhitelist` can be locked to `file://` + the single Cube origin; no third-party origin in play | Must trust a live web origin; larger nav/XSS surface |
| **Token discipline** | Trivially satisfied — nothing is fetched that could carry/leak the token | Same in principle, but more moving parts |

**Bundle ↔ host version management.** The web bundle is versioned by a `bundleVersion` (semver) **and** a `protocolVersion` (integer `v`, the envelope version in C2). Both are compiled into the bundle and reported in `READY`. The host component carries the **range of `protocolVersion` it supports**:

- On `READY`, the host compares the bundle's `protocolVersion` against its supported range.
  - **In range** → proceed with `INIT`.
  - **Out of range** → the host does *not* send a connection; it surfaces `onError({ code: "PROTOCOL_MISMATCH", fatal: true })` and the WebView shows its protocol-mismatch fallback (C4.5). This is the safety valve when an OTA-updated host pairs with a stale embedded bundle (or vice-versa).
- Because the bundle is a **local asset compiled into the app binary**, protocol and bundle versions move together under normal release flow; mismatch is only possible via mixed OTA updates, which the handshake explicitly guards. For an **Expo OTA** update that ships a *new* bundle asset, the bridge protocol is treated as part of the OTA contract — bumping `protocolVersion` requires shipping a host update through the store, never OTA-only, so an OTA can never strand the native bridge.

> Net: **local asset, `file://`, version pinned to the binary, handshake-gated protocol check.** Remote URL stays as a dev-only switch (`source={{ uri: devServerUrl }}`) for hot-reloading the web bundle against a running app.

---

## C2. The postMessage protocol

A **typed, versioned envelope** in both directions. Every message is JSON, wraps a discriminated `type`, and carries the protocol version `v`. Requests that expect a reply carry a correlation `id`.

### C2.1 The envelope

```ts
/** Protocol version. Bumped only on a breaking envelope/type change.
    Independent of spec schemaVersion (Part A) and bundleVersion. */
type ProtocolVersion = 1;

interface Envelope<T extends string, P> {
  v: ProtocolVersion;        // REQUIRED on every message, both directions
  type: T;                   // discriminant
  id?: string;               // correlation id for request/response (e.g. REQUEST_EXPORT → SPEC_CHANGED)
  ts?: number;               // epoch ms, informational
  payload: P;
}
```

Both sides **must** check `v` on receipt. A message whose `v` is outside the receiver's supported range is dropped and reported as `PROTOCOL_MISMATCH` (host) / rendered as the mismatch fallback (web). Unknown `type` values are ignored (forward-compat: a newer sender may emit a type an older receiver doesn't know).

### C2.2 host → web messages

```ts
type HostToWeb =
  | Envelope<"INIT", {
      mode: "view" | "edit";
      spec: Spec;                               // ChartSpec | DashboardSpec
      connection: CubeConnectionWire;           // endpoint + token (injected here, never in URL)
      theme: { mode: "light" | "dark"; tokens?: ThemeTokenOverrides };
      variables?: Record<string, VariableValue>;
      capabilities?: { autoHeight: boolean; scrollEnabled: boolean };
    }>
  | Envelope<"SET_SPEC",     { spec: Spec }>     // host pushes a new/echoed spec
  | Envelope<"SET_VARIABLE", { name: string; value: VariableValue }> // host-driven var change
  | Envelope<"SET_THEME",    { mode: "light" | "dark"; tokens?: ThemeTokenOverrides }>
  | Envelope<"SET_MODE",     { mode: "view" | "edit" }>
  | Envelope<"SET_CONNECTION", { connection: CubeConnectionWire }>   // token refresh (C5.4)
  | Envelope<"REQUEST_EXPORT", { id: string }>;  // ask web for current spec → replies SPEC_CHANGED w/ same id

interface CubeConnectionWire {
  endpoint: string;                              // MUST include /cubejs-api/v1
  token: string;                                 // RESOLVED short-lived JWT (string only on the wire)
  headers?: Record<string, string>;
}
```

### C2.3 web → host messages

```ts
type WebToHost =
  | Envelope<"READY", {
      bundleVersion: string;                     // semver of the web bundle
      protocolVersion: ProtocolVersion;          // what the bundle speaks
      specKind?: "chart" | "dashboard";          // if known pre-INIT (usually not)
    }>
  | Envelope<"SPEC_CHANGED",  { spec: Spec; reason: "edit" | "export" }> // edited JSON out (debounced) / export reply
  | Envelope<"SAVE_REQUESTED",{ spec: Spec }>    // user hit Save / autosave fired
  | Envelope<"VARIABLE_CHANGED", { name: string; value: VariableValue }> // a control wrote a var
  | Envelope<"CONTENT_HEIGHT",{ height: number }> // px, for non-scrolling embeds
  | Envelope<"ERROR", BridgeError>
  | Envelope<"ANALYTICS", AnalyticsEvent>;       // optional passthrough to host telemetry

interface BridgeError {
  code: "LOAD_FAILED" | "NO_CONNECTION" | "CUBE_ERROR" | "VALIDATION_ERROR"
      | "PROTOCOL_MISMATCH" | "UNKNOWN";
  message: string;
  fatal: boolean;                                // true ⇒ host shows fallback / retry affordance
  detail?: unknown;                              // redacted; NEVER includes the token
}

interface AnalyticsEvent { name: string; props?: Record<string, unknown>; }
```

### C2.4 The INIT handshake

```
WebView mounts (bundle JS boots)
        │
        │  (bridge shim already installed pre-content-load — C4.1)
        ▼
 web ──► READY { bundleVersion, protocolVersion }       ── web announces it is alive
        │
 host: check protocolVersion ∈ supported range?
        │         ├─ no  ──► onError(PROTOCOL_MISMATCH, fatal) ; web shows mismatch fallback ; STOP
        │         └─ yes ▼
 host ──► INIT { mode, spec, connection{endpoint,token}, theme, variables }
        │
 web: validate spec (zod) ; build CubeVizProvider w/ connection ; mount renderer/editor
        │
 web ──► CONTENT_HEIGHT { height }   (and onReady-equivalent settles)
        │
 host: onReady() ; apply height ; begin streaming targeted updates (SET_*)
```

**Why the connection/token is injected via post-load message — never baked into the bundle, URL, or query string, and never logged/persisted:**

- **The bundle is a static, reusable, possibly-cached, OTA-distributable artifact.** Anything compiled into it or appended to its URL is durable and inspectable (URL history, WebView cache, crash logs, `adb`/Safari Web Inspector, OTA diffs). A short-lived JWT carrying `securityContext.systemIds` is a credential; it must never become durable.
- **`READY`-then-`INIT` guarantees the token is delivered into a live JS heap that the host controls the lifetime of.** It is set into the `Transport`'s in-memory field, handed to `@cubejs-client/core`'s `cube()` as the `Authorization` value, and referenced by closure only. It is never written to `window.location`, `localStorage`, `sessionStorage`, IndexedDB, cookies, or the DOM.
- **No query string / no URL.** The source URI is the bare `file://.../index.html` with no `?token=…`. This keeps the token out of any navigation event, `onShouldStartLoadWithRequest` log, or referrer.
- **Logging discipline is enforced at the envelope layer.** A single `redact(envelope)` used by every `console`/analytics path strips `connection.token` (and any `Authorization` header) before anything is logged on either side. `BridgeError.detail` is redacted identically.
- **Refresh, not rebuild.** When the JWT nears expiry, the host resolves a fresh one and sends `SET_CONNECTION` (C5.4) — the bundle is never reloaded and the URL never changes.

---

## C3. One web entry, three transports

There is exactly **one** web codebase. The renderer/editor core is **transport-agnostic**: it never knows whether it's a standalone web app, the Bun preview server, or a WebView embed. It talks only to a `Transport`.

### C3.1 The `Transport` interface

```ts
/** The single seam between the cube-viz core and its host environment.
    The core gets its spec, connection, theme, and mode from here, and
    reports changes back here. Three implementations; one core. */
interface Transport {
  /** One-time: resolve the initial runtime state. Resolves AFTER any handshake. */
  init(): Promise<TransportInit>;

  /** Live host→core pushes. The core subscribes; returns an unsubscribe. */
  onSpec(cb: (spec: Spec) => void): () => void;
  onVariable(cb: (name: string, value: VariableValue) => void): () => void;
  onTheme(cb: (theme: ThemeState) => void): () => void;
  onMode(cb: (mode: "view" | "edit") => void): () => void;
  onConnection(cb: (c: CubeConnectionWire) => void): () => void;

  /** core→host reports. */
  reportSpecChange(spec: Spec, reason: "edit" | "export"): void;
  reportSaveRequested(spec: Spec): void;
  reportVariableChange(name: string, value: VariableValue): void;
  reportHeight(height: number): void;
  reportError(err: BridgeError): void;
  reportAnalytics?(evt: AnalyticsEvent): void;

  /** Optional host→core request (export). Core fulfills by reportSpecChange(reason:"export"). */
  onExportRequest?(cb: (requestId: string) => void): () => void;
}

interface TransportInit {
  spec: Spec;
  connection: CubeConnectionWire;     // endpoint + token (memory-only henceforth)
  theme: ThemeState;
  mode: "view" | "edit";
  variables?: Record<string, VariableValue>;
}
type ThemeState = { mode: "light" | "dark"; tokens?: ThemeTokenOverrides };
```

The core's bootstrap is identical for all three:

```tsx
// cube-viz web entry — runs in EVERY transport, unchanged.
async function bootstrap(transport: Transport) {
  const initState = await transport.init();
  mountApp({
    transport,
    initial: initState,           // spec/connection/theme/mode/variables
    // CubeVizProvider built from initState.connection; renderer/editor mounted by spec.kind/mode
  });
}
```

The factory picks the transport from the runtime, then calls the *same* `bootstrap`:

```ts
function makeTransport(): Transport {
  if ((window as any).__CUBEVIZ_BRIDGE__) return new WebViewTransport();   // shim flag set pre-load (C4.1)
  if (import.meta.env.VITE_PREVIEW_SERVER) return new PreviewServerTransport();
  return new BrowserTransport();
}
bootstrap(makeTransport());
```

### C3.2 The three implementations (sketch)

- **`BrowserTransport` (standalone web).** `init()` reads spec from the URL/route or an in-app store; `connection` from the in-page connection dialog (memory-only) or `import.meta.env` prefill; `report*` updates in-app state (the app drives itself — a "no-op host" in the sense that there is no *separate* host process). `onExportRequest` wired to a download button.
- **`PreviewServerTransport` (Bun preview).** `init()` GETs the spec from the preview server's file API; `connection` from the in-UI dialog; `reportSaveRequested`/`reportSpecChange` PUT the spec back to the server, which does the **file I/O** (Part B). The core still never touches `fs`.
- **`WebViewTransport` (Expo embed).** Implements the interface entirely over postMessage (next section).

### C3.3 `WebViewTransport` over postMessage

```ts
class WebViewTransport implements Transport {
  private readonly v: ProtocolVersion = 1;
  private listeners = new Map<string, Set<Function>>();
  private send(msg: WebToHost) {
    // RN injects window.ReactNativeWebView; redact before any logging happens elsewhere.
    (window as any).ReactNativeWebView.postMessage(JSON.stringify(msg));
  }

  constructor() {
    // single inbound listener; RN delivers host→web via document/window 'message'
    const handler = (e: MessageEvent) => {
      let msg: HostToWeb;
      try { msg = JSON.parse(typeof e.data === "string" ? e.data : ""); } catch { return; }
      if (!msg || msg.v !== this.v) { this.fanout("__protocol_mismatch__", msg); return; }
      this.fanout(msg.type, msg);
    };
    window.addEventListener("message", handler);   // iOS
    document.addEventListener("message", handler as any); // Android quirk: message lands on document
  }

  async init(): Promise<TransportInit> {
    // announce READY, then await the INIT reply.
    const initMsg = await new Promise<HostToWeb & { type: "INIT" }>((resolve) => {
      const off = this.listen("INIT", (m) => { off(); resolve(m); });
      this.send({ v: this.v, type: "READY",
        payload: { bundleVersion: BUILD.bundleVersion, protocolVersion: this.v } });
    });
    const p = initMsg.payload;
    return { spec: p.spec, connection: p.connection, theme: p.theme,
             mode: p.mode, variables: p.variables };
  }

  onSpec(cb)       { return this.listen("SET_SPEC",       (m) => cb(m.payload.spec)); }
  onVariable(cb)   { return this.listen("SET_VARIABLE",   (m) => cb(m.payload.name, m.payload.value)); }
  onTheme(cb)      { return this.listen("SET_THEME",      (m) => cb(m.payload)); }
  onMode(cb)       { return this.listen("SET_MODE",       (m) => cb(m.payload.mode)); }
  onConnection(cb) { return this.listen("SET_CONNECTION", (m) => cb(m.payload.connection)); }
  onExportRequest(cb){return this.listen("REQUEST_EXPORT",(m) => cb(m.payload.id)); }

  reportSpecChange(spec, reason)   { this.send({ v: this.v, type: "SPEC_CHANGED",   payload: { spec, reason } }); }
  reportSaveRequested(spec)        { this.send({ v: this.v, type: "SAVE_REQUESTED", payload: { spec } }); }
  reportVariableChange(name, value){ this.send({ v: this.v, type: "VARIABLE_CHANGED", payload: { name, value } }); }
  reportHeight(height)             { this.send({ v: this.v, type: "CONTENT_HEIGHT", payload: { height } }); }
  reportError(err)                 { this.send({ v: this.v, type: "ERROR", payload: redact(err) }); }
  reportAnalytics(evt)             { this.send({ v: this.v, type: "ANALYTICS", payload: evt }); }

  // listen/fanout/listeners plumbing omitted for brevity
}
```

The connection that `init()` returns is fed straight into `CubeVizProvider` (Part A) as a `CubeConnection`; the token thereafter lives only in that provider's `cube()` client. `onConnection` swaps the client's token in place on `SET_CONNECTION` (refresh) without remounting.

---

## C4. WebView specifics

### C4.1 `injectedJavaScriptBeforeContentLoaded` — install the bridge + a window flag

The host injects a tiny shim **before** the bundle's content loads, so the bundle can detect the WebView transport synchronously at boot (before `makeTransport()` runs) and so a robust `message` listener exists from the first tick.

```ts
// host-side string injected via injectedJavaScriptBeforeContentLoaded
const BRIDGE_SHIM = `
(function () {
  // 1) transport-detection flag the web factory reads synchronously
  window.__CUBEVIZ_BRIDGE__ = { protocol: 1, platform: ${JSON.stringify(Platform.OS)} };

  // 2) Android delivers host→web messages on 'document'; iOS on 'window'.
  //    Normalize both into a single CustomEvent the bundle can rely on.
  function relay(e){ /* no-op placeholder; the bundle attaches its own listeners */ }
  document.addEventListener('message', relay);
  window.addEventListener('message', relay);

  // 3) guard: never let the page navigate itself away
  // (defense in depth; onShouldStartLoadWithRequest is the real gate)
  true; // injected JS must end truthy on iOS
})();
true;`;
```

```tsx
<WebView
  ref={ref}
  source={source}                                   // file:// local asset (C1.3)
  injectedJavaScriptBeforeContentLoaded={BRIDGE_SHIM}
  originWhitelist={["file://", "https://cube.allaware.app"]} // C5
  onShouldStartLoadWithRequest={gateNavigation}     // C5
  onMessage={onWebMessage}                            // routes WebToHost → callbacks
  javaScriptEnabled
  domStorageEnabled={false}                           // no localStorage persistence surface
  incognito                                           // no on-disk cache/cookies (iOS/Android)
  setSupportMultipleWindows={false}
  // scroll/gesture coordination → C4.3
  scrollEnabled={false}
  nestedScrollEnabled
  // load failure → C4.5
  onError={onLoadError}
  onHttpError={onLoadError}
  renderError={() => null /* RN-side fallback handled by host; web-side fallback in-bundle */}
/>
```

The `__CUBEVIZ_BRIDGE__` flag is what `makeTransport()` (C3.1) keys on. Setting it *before content load* removes any race where the bundle boots, doesn't see the flag, and wrongly selects `BrowserTransport`.

### C4.2 Content-height → RN height syncing (non-scrolling embeds)

For chart and single-widget embeds the host wants the RN view to size to content (no inner scroll). The bundle measures its root with a `ResizeObserver` and emits `CONTENT_HEIGHT`; the host applies it.

```ts
// web (inside the mounted app root)
const ro = new ResizeObserver((entries) => {
  const h = Math.ceil(entries[0].contentRect.height);
  if (h !== lastReported) { lastReported = h; transport.reportHeight(h); }
});
ro.observe(document.getElementById("cube-viz-root")!);
```

```tsx
// host
const [height, setHeight] = useState(0);
<CubeVizWebView autoHeight onHeightChange={setHeight} style={{ height: height || 240 /* skeleton */ }} />
```

- Debounced (rAF-coalesced) so layout thrash during a chart animation doesn't spam messages.
- A sane skeleton height (e.g. 240) is used until the first `CONTENT_HEIGHT` arrives, avoiding a 0-px flash.
- **Dashboards** are typically given a fixed/large height by the host with **inner scroll disabled at the WebView level and scroll owned by the web app** (the dashboard grid scrolls inside the WebView). `autoHeight` is for charts/widgets; for full-screen dashboards the host sizes the WebView to the available area and lets the web side scroll.

### C4.3 Scroll / gesture coordination so RGL drag/resize works inside a RN `ScrollView`

The hard case: a dashboard (with react-grid-layout drag/resize) inside the WebView, itself inside a RN `ScrollView` or screen. Touch gestures must go to **RGL when dragging a widget** and to the **outer scroll when panning the page**. cube-viz takes a **drag-handle-first** approach, with platform flags as backstops:

1. **Drag handle is the primary disambiguator.** In edit mode, RGL drag is bound to an explicit **drag handle** in each widget's chrome (`dragHandleProps`, Part A2.3), *not* the whole card. A touch that starts on the handle drags the widget; a touch anywhere else scrolls. This is the most reliable cross-platform behavior in a WebView and avoids fighting the gesture system.
2. **`nestedScrollEnabled` (Android)** on the `WebView` so inner scrollable regions (the dashboard's own scroll container) cooperate with the outer RN scroll.
3. **Disable the outer scroll during an active drag/resize.** When RGL fires drag/resize start, the web emits a lightweight `ANALYTICS`-style control hint — but more decisively, the host wraps the WebView so that **edit-mode dashboards are not nested in a RN `ScrollView` at all**: the dashboard scrolls *inside* the WebView (web owns scroll), and the WebView fills the screen. This sidesteps nested-scroll gesture conflicts entirely for the editor.
   - For **view-mode** embeds that *are* placed in a host `ScrollView` (e.g. a chart inside a feed), there is no RGL drag, so no conflict — the chart is `autoHeight`, non-scrolling, and the outer `ScrollView` scrolls normally.
4. **`onStartShouldSetResponderCapture` backstop (optional).** If a host screen must nest an edit-mode dashboard inside a RN scroll, the host can capture the responder while the web reports an active drag (a `DRAG_ACTIVE` control message could be added under the same envelope), freezing outer scroll until drag end. This is documented as an escape hatch, not the default — the default is "editor owns a full-screen WebView; web owns scroll."

**Decision:** *Editor runs in a full-screen (or full-pane) WebView where the web app owns scrolling, with RGL bound to a drag handle. View-mode charts embed as non-scrolling `autoHeight` islands inside host scroll.* This gives correct gestures with zero RN-side gesture arbitration in the common cases.

### C4.4 Safe-area + keyboard handling for editor text inputs

The editor includes TipTap text widgets and numerous text/number inputs (chart titles, filter values, variable defaults). Inside a WebView these are real DOM inputs, so keyboard behavior is mostly the platform's, but the host must cooperate:

- **Safe areas:** the host passes the device safe-area insets into the bundle via `INIT.theme` (extend `ThemeState` with `safeArea?: { top; right; bottom; left }`) so the web layout can pad the editor chrome (especially the bottom sheet) above the home indicator / notch. The web app applies them as CSS `env(safe-area-inset-*)` fallbacks plus the injected values.
- **Keyboard avoidance:** wrap `<CubeVizWebView>` in a `KeyboardAvoidingView` (iOS `behavior="padding"`) on the host so the WebView shrinks above the keyboard; the web side additionally uses `scrollIntoView({ block: "center" })` on focus and the `VisualViewport` API to keep the focused input visible within the WebView viewport. `automaticallyAdjustContentInsets`/`keyboardDisplayRequiresUserAction={false}` are set on the WebView so focusing an input doesn't require a second tap.
- **Bottom sheet over keyboard:** because the widget edit panel is a **web bottom sheet inside the WebView** (per the authoritative clarification — not a native sheet), the sheet is positioned with `VisualViewport`-aware bottom offset so it rides above the on-screen keyboard. No native RN sheet is involved.

### C4.5 Offline / load-failure / mismatch fallback UI

Three failure surfaces, each deterministic:

1. **Bundle fails to load (WebView `onError`/`onHttpError`).** Since the bundle is a local asset this is rare, but the host renders an **RN-side** fallback (retry button that reloads the WebView) — the web bundle isn't running, so the fallback must be native here.
2. **Bundle loads but has no usable connection / is offline for Cube** (`NO_CONNECTION` / `CUBE_ERROR`). The **web bundle** renders an in-WebView empty/offline state per family (Part A chrome `empty`/`error` slots): "Can't reach data — retry," with a retry that re-issues the Cube query. The editor remains usable (editing a spec needs no Cube; only the live preview pane shows the offline state).
3. **Protocol mismatch** (`PROTOCOL_MISMATCH`). The web bundle (if it loaded) shows a "Please update the app" panel and the host surfaces the same via `onError(fatal)`; the host should not send a connection. This is the OTA-skew guard from C1.3.

Offline editing still works: the spec is in memory, edits emit `SPEC_CHANGED`, and the host can queue the save in Convex's offline-capable client — only the *live data preview* degrades, not the editing.

---

## C5. Security

### C5.1 Token lifetime — memory only

- The token enters the WebView **only** via the `INIT`/`SET_CONNECTION` payload, lands in the `WebViewTransport`'s in-memory `connection`, is handed to `cube()` as the `Authorization` value (raw JWT, no `Bearer`), and is referenced by closure thereafter.
- **Never** written to: URL/query string, `localStorage`/`sessionStorage` (`domStorageEnabled={false}`), cookies/IndexedDB (`incognito`), the DOM, or any log/telemetry line (`redact()` strips it at the envelope boundary on both sides; `BridgeError.detail` is redacted).
- The token dies when the WebView unmounts. There is no persistence layer in the bundle to outlive it.

### C5.2 `originWhitelist` locking

`originWhitelist={["file://", "https://cube.allaware.app"]}` — the only origins the WebView may load are the local bundle and the single Cube origin. Everything else (ad/script/redirect URLs, arbitrary `https://`) is refused. No wildcard.

### C5.3 Blocking external navigation — `onShouldStartLoadWithRequest`

```ts
const ALLOWED = ["file://", "https://cube.allaware.app"];
function gateNavigation(req: ShouldStartLoadRequest): boolean {
  const ok = ALLOWED.some((o) => req.url.startsWith(o));
  // allow the initial document + same-origin XHR/fetch to Cube; block everything else.
  if (!ok) { /* optionally open in system browser if it's a deliberate external link */ return false; }
  return true;
}
```

- Any attempt to navigate the top frame away from the bundle is blocked. A link the user *intends* to open externally can be routed to the system browser via `Linking.openURL`, never inside the embed.
- Combined with `setSupportMultipleWindows={false}` and no `target=_blank` handling, the embed cannot be hijacked into loading third-party content.

### C5.4 How this satisfies "the library never mints or stores credentials"

- **The host obtains the token.** The Expo app (aa-app) already authenticates the user and is responsible for minting/fetching a **short-lived Cube JWT carrying `securityContext.systemIds` + `roles`** (server-side, the way Cube auth is designed — Part A / research). cube-viz (web *or* RN helper) never constructs claims, never holds a Cube secret, never calls a token endpoint with a secret.
- **The WebView only *uses* the token for the session.** It forwards it to Cube via the SDK and discards it on unmount. This is the same credential discipline as the standalone library (`CubeVizProvider` forwards a host-supplied token) and the preview server (in-UI, memory-only) — three transports, one rule.
- **RLS is untouchable from the embed.** Row scoping is entirely in the JWT's `securityContext`. No spec field, no variable, no editor action, and no bridge message can widen tenant scope — the bridge carries the token opaquely and the web side never inspects or rewrites its claims.
- **Token refresh** is host-driven: when the JWT nears expiry the host fetches a fresh one and posts `SET_CONNECTION`; the web swaps it in memory with no reload and no URL change.

---

## C6. Save round-trip

Two flows, one contract: **web emits JSON-out; host persists to Convex; host may echo back.**

### C6.1 (a) Editing a single chart

```
[WebView edit mode: ChartEditor]
  user changes a measure / color / granularity
        │  (editor mutates spec in memory, validates with zod, re-renders live preview)
        ▼
 web ──► SPEC_CHANGED { spec: <ChartSpec>, reason: "edit" }   (debounced ~400ms)
        │
 host: onSpecChange(spec) → stage in component state (autosave path)  OR  wait for Save
        │
 user taps "Save" (web Save button in editor chrome)
        ▼
 web ──► SAVE_REQUESTED { spec: <ChartSpec> }
        │
 host: persist to Convex (mutation: upsert chart spec by id)
        │  (optional) normalize/stamp updatedAt server-side
        ▼
 host ──► SET_SPEC { spec: <ChartSpec w/ server updatedAt> }   (echo, optional)
        │
 web: reconcile (replace in-memory spec) — guarded against echo loop (C6.4)
```

### C6.2 (b) Editing a dashboard layout

```
[WebView edit mode: DashboardEditor, RGL canvas]
  user drags/resizes a widget (drag handle), or edits a widget in the web bottom sheet
        │  (RGL onLayoutChange → editor writes the WIDEST canonical layout back into spec.layout;
        │   widget edits update spec.widgets[]; zod-validated)
        ▼
 web ──► SPEC_CHANGED { spec: <DashboardSpec>, reason: "edit" }   (debounced)
        │
 host: stage  (autosave)  OR  wait for explicit Save
        ▼
 web ──► SAVE_REQUESTED { spec: <DashboardSpec> }   (on Save / autosave fire)
        │
 host: Convex mutation upserts the dashboard spec (one canonical layout, minW/minH only)
        ▼
 host ──► SET_SPEC { spec }   (optional echo)
```

Both flows carry the **whole spec** (it is small JSON), so the host's Convex mutation is a simple idempotent upsert keyed by `spec.id` — no diff protocol needed.

### C6.3 Debounce / autosave vs explicit save — the decision

- **`SPEC_CHANGED` is debounced and advisory.** It fires continuously during editing (~300–500 ms trailing debounce) so the host can drive **autosave** and keep a live working copy. It is the *edit stream*.
- **`SAVE_REQUESTED` is explicit and authoritative.** It fires on the user's Save action (and, if the host opts into autosave, the host may simply treat debounced `SPEC_CHANGED` as save triggers).
- **Recommended default:** **explicit save for dashboards** (layout edits are deliberate; avoid churning Convex on every drag tick), **autosave-on-debounce for single charts** (lighter, more "live"). The host chooses by acting on `SAVE_REQUESTED` only vs. acting on debounced `SPEC_CHANGED` — the *bridge supports both with the same two messages*; it does not hardcode a policy.
- **REQUEST_EXPORT** lets the host pull the current spec on demand (e.g. "Save" button in native chrome, or a share action) without waiting for an edit: host sends `REQUEST_EXPORT {id}`; web replies `SPEC_CHANGED {spec, reason:"export"}` correlated by `id`.

### C6.4 Echo-loop guard

When the host echoes a saved spec via `SET_SPEC`, the web must not re-emit it as a fresh `SPEC_CHANGED`. The core tracks a `lastAppliedSpecHash`; an incoming `SET_SPEC` whose content matches the in-memory spec is applied silently (updates server-stamped fields like `updatedAt`) and does **not** retrigger the change stream. Symmetrically, the host component (C1.2) shallow-compares before re-posting `SET_SPEC` for a spec it just received. This keeps the round-trip convergent.

---

## C7. One mental model across all three runtimes

The bridge in this document is **the WebView specialization of the same `Transport` seam** that the standalone web app and the preview server already use. There is exactly one mental model:

> *The core asks a `Transport` for `{ spec, connection, theme, mode, variables }`, renders/edits, and reports `{ specChange, saveRequested, variableChange, height, error }` back. The token is host-supplied and memory-only. RLS is in the JWT. The core never does I/O.*

How each runtime fills that seam:

| Runtime | `Transport` | How it gets the spec | How it reports changes | How it gets the Cube connection |
|---|---|---|---|---|
| **Standalone web** | `BrowserTransport` | URL/route or in-app store | updates in-app React state (the app *is* the host — a "no-op host": it drives itself, no separate process) | in-page connection dialog (memory) or `import.meta.env` prefill |
| **Preview server** | `PreviewServerTransport` | GET from Bun file API | PUT back to the server, which does **all file I/O** (`Bun.write`) behind the JSON-in/out callbacks | in-UI dialog or optional `.env` prefill, optional same-origin proxy |
| **Expo / WebView embed** | `WebViewTransport` | `INIT` payload over postMessage | `SPEC_CHANGED`/`SAVE_REQUESTED` over postMessage → host persists to **Convex** | `INIT.connection` over postMessage (host-minted short-lived JWT), refreshed via `SET_CONNECTION` |

The standalone case is the degenerate "no-op host" — the web app supplies its own spec and persistence with no external driver. The preview case moves persistence to **file I/O behind `PreviewServerTransport`**. The embed case moves persistence to **Convex behind `WebViewTransport`/postMessage**. Same renderer, same editor, same security rule, same `Transport` contract — only the wire and the persistence backend change.

---

## C8. Summary of the embed contract

| Concern | Decision |
|---|---|
| Host component | `<CubeVizWebView>` — declarative props in (`spec`, `cubeConnection`, `mode`, `theme`, `variables`), callbacks out (`onSpecChange`, `onSaveRequested`, `onVariableChange`, `onHeightChange`, `onError`, `onReady`, `onAnalytics`) |
| Bundle location | **Local Expo asset over `file://`** (offline, version-pinned to binary, smallest security surface); remote URL is a dev-only switch |
| Versioning | `protocolVersion` (envelope) + `bundleVersion`; reported in `READY`, range-checked by host; protocol bumps ship via store update, never OTA-only |
| Protocol | Typed, versioned `Envelope<type,payload>` with `v`/`id`; host→web `INIT`/`SET_SPEC`/`SET_VARIABLE`/`SET_THEME`/`SET_MODE`/`SET_CONNECTION`/`REQUEST_EXPORT`; web→host `READY`/`SPEC_CHANGED`/`SAVE_REQUESTED`/`VARIABLE_CHANGED`/`CONTENT_HEIGHT`/`ERROR`/`ANALYTICS` |
| Handshake | web `READY` → host protocol-check → host `INIT` (carries connection+token) → web mounts → `CONTENT_HEIGHT`/ready |
| Token injection | Post-load via `INIT`/`SET_CONNECTION` only — never in bundle, URL, query, storage, or logs; redacted at the envelope boundary |
| Transport seam | One web entry; `Transport` interface; `BrowserTransport` \| `PreviewServerTransport` \| `WebViewTransport`; core is transport-agnostic |
| WebView plumbing | `injectedJavaScriptBeforeContentLoaded` shim + `__CUBEVIZ_BRIDGE__` flag; `ResizeObserver`→`CONTENT_HEIGHT` height sync; drag-handle + full-screen-editor scroll model; safe-area via `INIT`, `KeyboardAvoidingView` + `VisualViewport` for inputs; deterministic offline/load/mismatch fallbacks |
| Security | Token memory-only; `originWhitelist` locked to `file://` + Cube origin; `onShouldStartLoadWithRequest` blocks external nav; `domStorageEnabled=false`, `incognito`, no multi-window; host mints the short-lived JWT (`securityContext.systemIds`), WebView only uses it for the session |
| Save round-trip | web emits `SPEC_CHANGED` (debounced edit stream) + `SAVE_REQUESTED` (explicit) → host persists to Convex → optional `SET_SPEC` echo (echo-loop-guarded); autosave for charts, explicit save for dashboards, both supported by the same two messages |
| One mental model | The WebView is just the postMessage specialization of the same `Transport` seam standalone web and the preview server use — host-supplied memory-only token, RLS in the JWT, core never does I/O |