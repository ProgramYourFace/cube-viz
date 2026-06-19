import type * as React from "react";

import type {
  ChartFamily,
  InputControl,
  InputControlKind,
  VariableDecl,
  VariableValue,
  WidgetSpec,
} from "@/spec";
import type { ChartComponent } from "@/charts";
import { builtinCharts } from "@/charts";

/**
 * The component-override surface (docs/03-override-theme-preview.md §A2). A host
 * injects a {@link ComponentRegistry} into {@link CubeVizProvider}; resolution is
 * always **registry slot → built-in fallback**, per slot and additive — nothing
 * is all-or-nothing. The same `NormalizedChartData` / value-editor boundaries the
 * built-ins sit on are exactly what an override receives, so behaviour is identical
 * whether a slot is overridden or not.
 */

/* ──────────────────────────── widget chrome ─────────────────────────────── */

/**
 * The frame around a widget: title bar, overflow/actions menu, drag affordance,
 * and the empty/error/loading body states. Overriding `chrome.widget` restyles
 * every widget at once; the layout engine stays library-owned (the custom header
 * still receives {@link WidgetChromeProps.dragHandleProps}).
 */
export interface WidgetChromeProps {
  /** The widget being framed (chart/text/input). */
  widget: WidgetSpec;
  /** Resolved title (widget.title ?? spec name ?? undefined). */
  title?: string;
  /** Built-in actions menu (export CSV/XLSX, edit-in-edit-mode). Render verbatim. */
  menu: React.ReactNode;
  /** Spread onto the custom header so it works as the react-grid-layout drag handle. */
  dragHandleProps: Record<string, unknown>;
  /** The widget body (chart / rich text / input control). */
  children: React.ReactNode;
  /** Coarse render state for chrome-level affordances. */
  state: { loading: boolean; error?: Error; empty: boolean };
}

/** A widget-chrome override component. */
export type WidgetChromeComponent = React.ComponentType<WidgetChromeProps>;

/* ──────────────────────────── state slots ──────────────────────────────── */

/**
 * The empty / loading state slots. Empty fires when `NormalizedChartData.empty`
 * (noFilter dropped everything or zero rows). Stateless by contract — these are
 * pure presentational placeholders.
 */
export type StateComponent = React.ComponentType<Record<string, never>>;

/** Props the error state receives — the surfaced (message-only) error. */
export interface ErrorStateProps {
  error: Error;
}

/** The error state slot. Never receives tenant data — message only. */
export type ErrorStateComponent = React.ComponentType<ErrorStateProps>;

/* ──────────────────────────── input controls ───────────────────────────── */

/**
 * An input control is a pure value editor bound to one dashboard variable
 * (Leg 1 write / Leg 3 read-back of the binding model). It never sees the Cube
 * client or the token, and it can only write its own declared variable — so a
 * custom control can never widen tenant scope.
 */
export interface InputControlProps<V extends VariableValue = VariableValue> {
  /** Current store value (Leg 3 read-back). */
  value: V | undefined;
  /** Writes `store[control.variable]` (Leg 1). */
  onChange: (next: V | undefined) => void;
  /** The variable declaration: type/array/label/default for validation + UI. */
  decl: VariableDecl;
  /** Kind-specific config (presets, options, min/max, …). */
  control: InputControl["control"];
  /** Id for the focusable element, so the field's `<label htmlFor>` associates (a11y). */
  controlId?: string;
}

/** An input-control override component. */
export type InputControlComponent = React.ComponentType<InputControlProps>;

/* ──────────────────────────── the registry ─────────────────────────────── */

/**
 * Every overridable slot in cube-viz, keyed by stable slot name. Each field is
 * optional; a missing slot falls back to the built-in. See {@link resolveChart}.
 */
export interface ComponentRegistry {
  /** (a) Whole chart-family components — one slot per family. */
  charts?: Partial<Record<ChartFamily, ChartComponent>>;

  /** (b) Widget chrome — the frame + empty/error/loading body states. */
  chrome?: {
    /** Wraps every widget. */
    widget?: WidgetChromeComponent;
    /** Rendered when `NormalizedChartData.empty === true`. */
    empty?: StateComponent;
    /** Rendered on fetch error (message only). */
    error?: ErrorStateComponent;
    /** Rendered while a widget is loading. */
    loading?: StateComponent;
  };

  /** (c) Input controls — one slot per {@link InputControlKind}. */
  controls?: Partial<Record<InputControlKind, InputControlComponent>>;
}

/**
 * Resolve the chart component for `family`: the registry override if present,
 * else the built-in. This is the per-slot resolution every renderer uses.
 */
export function resolveChart(
  registry: ComponentRegistry | undefined,
  family: ChartFamily,
): ChartComponent {
  return registry?.charts?.[family] ?? builtinCharts[family];
}
