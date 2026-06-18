import type { Spec, VariableValue } from "@/spec";

/**
 * The single seam between the cube-viz core and its host environment. The core
 * gets its spec/connection/theme/mode from a Transport and reports changes back.
 * Three implementations (browser, preview server, WebView) — one core.
 *
 * Defined here for the render core; the WebView/preview implementations land in
 * later milestones. See docs/04-webview-bridge.md §C3.
 */

export interface CubeConnectionWire {
  endpoint: string; // MUST include /cubejs-api/v1
  token: string | (() => Promise<string>);
  headers?: Record<string, string>;
}

export type ThemeMode = "light" | "dark";
export interface ThemeState {
  mode: ThemeMode;
  tokens?: Record<string, string>;
}

export interface TransportInit {
  spec: Spec;
  connection?: CubeConnectionWire;
  theme: ThemeState;
  mode: "view" | "edit";
  variables?: Record<string, VariableValue>;
}

export interface BridgeError {
  code:
    | "LOAD_FAILED"
    | "NO_CONNECTION"
    | "CUBE_ERROR"
    | "VALIDATION_ERROR"
    | "PROTOCOL_MISMATCH"
    | "UNKNOWN";
  message: string;
  fatal: boolean;
  detail?: unknown;
}

export interface Transport {
  init(): Promise<TransportInit>;
  onSpec(cb: (spec: Spec) => void): () => void;
  onVariable(cb: (name: string, value: VariableValue) => void): () => void;
  onTheme(cb: (theme: ThemeState) => void): () => void;
  onMode(cb: (mode: "view" | "edit") => void): () => void;
  onConnection(cb: (c: CubeConnectionWire) => void): () => void;
  reportSpecChange(spec: Spec, reason: "edit" | "export"): void;
  reportSaveRequested(spec: Spec): void;
  reportVariableChange(name: string, value: VariableValue): void;
  reportHeight(height: number): void;
  reportError(err: BridgeError): void;
}
