import * as React from "react";
import { ChevronDown, ChevronUp, Settings2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/components/ui/utils";

import { useContainerBreakpoint } from "./useContainerBreakpoint";

/**
 * EditorShell — the responsive frame both the chart editor and the dashboard
 * editor build inside. It is purely presentational: it owns layout (WIDE = two
 * panes / docked panel over a canvas; NARROW = stacked, no native sheet) and the
 * narrow-mode panel open/close toggle, nothing about the spec.
 *
 * Two modes (see docs/03 §A3.1/A3.2):
 *  - `"two-pane"` (chart editor): config on the left (~360px), live preview on the
 *    right. NARROW → preview on top, config stacked below.
 *  - `"canvas-panel"` (dashboard editor): a canvas fills the area; selecting a
 *    widget docks a panel on the right. NARROW → the panel slides in as a
 *    full-width inline panel toggled by a button (an inline panel, NOT a native
 *    bottom sheet — works identically in a mobile WebView).
 *
 * Driven entirely by CONTAINER width (`useContainerBreakpoint`), never the
 * viewport, so the same web build reflows correctly inside a mobile WebView.
 */

export type EditorShellMode = "two-pane" | "canvas-panel";

export interface EditorShellProps {
  mode?: EditorShellMode;
  /** The config form ("two-pane") or the docked widget panel ("canvas-panel"). */
  panel: React.ReactNode;
  /** The live preview ("two-pane") or the editable grid ("canvas-panel"). */
  canvas: React.ReactNode;
  /** Width of the config/panel column in wide layout (px). Default 360. */
  panelWidth?: number;
  /**
   * `canvas-panel` only: whether the docked panel is open. When `undefined` the
   * panel is always shown in wide mode and the narrow toggle controls visibility
   * internally. Provide this (with `onPanelOpenChange`) to lift control to the
   * parent (e.g. open the panel when a widget is selected, close on deselect).
   */
  panelOpen?: boolean;
  onPanelOpenChange?: (open: boolean) => void;
  /** Title shown on the narrow panel toggle / panel header. */
  panelTitle?: string;
  /** Label for the narrow "open panel" button (canvas-panel mode). Default "Edit". */
  panelToggleLabel?: string;
  /** Side the panel docks to in wide canvas-panel mode. Default "right". */
  panelSide?: "left" | "right";
  className?: string;
  /** Min height so the canvas/preview can measure on first paint. Default 360px. */
  minHeight?: number;
}

export function EditorShell({
  mode = "two-pane",
  panel,
  canvas,
  panelWidth = 360,
  panelOpen,
  onPanelOpenChange,
  panelTitle,
  panelToggleLabel = "Edit",
  panelSide = "right",
  className,
  minHeight = 360,
}: EditorShellProps): React.ReactElement {
  const { ref, narrow } = useContainerBreakpoint<HTMLDivElement>();

  // Narrow-mode panel visibility: controlled if `panelOpen` provided, else local.
  const isControlled = panelOpen !== undefined;
  const [localOpen, setLocalOpen] = React.useState(false);
  const open = isControlled ? panelOpen : localOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setLocalOpen(next);
      onPanelOpenChange?.(next);
    },
    [isControlled, onPanelOpenChange],
  );

  /* ───────────────────────────── two-pane mode ──────────────────────────── */
  if (mode === "two-pane") {
    if (narrow) {
      // Stacked: preview on top, config below. Both full width.
      return (
        <div
          ref={ref}
          data-slot="editor-shell"
          data-mode="two-pane"
          data-layout="stacked"
          className={cn("flex w-full flex-col", className)}
        >
          <div className="w-full" style={{ minHeight }}>
            {canvas}
          </div>
          <Separator className="my-3" />
          <div className="w-full">{panel}</div>
        </div>
      );
    }
    return (
      <div
        ref={ref}
        data-slot="editor-shell"
        data-mode="two-pane"
        data-layout="split"
        className={cn("flex w-full items-stretch", className)}
        style={{ minHeight }}
      >
        <div
          className="shrink-0 overflow-y-auto pr-3"
          style={{ width: panelWidth }}
        >
          {panel}
        </div>
        <Separator orientation="vertical" />
        <div className="min-w-0 flex-1 pl-3">{canvas}</div>
      </div>
    );
  }

  /* ─────────────────────────── canvas-panel mode ────────────────────────── */
  if (narrow) {
    // Canvas full width; an inline panel toggled by a button drops in below the
    // toolbar (NOT a native bottom sheet — same component web + WebView).
    return (
      <div
        ref={ref}
        data-slot="editor-shell"
        data-mode="canvas-panel"
        data-layout="stacked"
        className={cn("flex w-full flex-col", className)}
      >
        {!isControlled || onPanelOpenChange ? (
          <div className="mb-2 flex items-center justify-end">
            <Button
              variant={open ? "secondary" : "outline"}
              size="sm"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              {open ? <ChevronUp /> : <ChevronDown />}
              {open ? "Close" : (panelToggleLabel ?? "Edit")}
            </Button>
          </div>
        ) : null}
        {open ? (
          <div
            data-slot="editor-shell-panel"
            className="mb-3 w-full rounded-lg border border-border bg-card"
          >
            {panelTitle ? (
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <span className="text-sm font-medium">{panelTitle}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setOpen(false)}
                  aria-label="Close panel"
                >
                  <X />
                </Button>
              </div>
            ) : null}
            <div className="p-3">{panel}</div>
          </div>
        ) : null}
        <div className="w-full" style={{ minHeight }}>
          {canvas}
        </div>
      </div>
    );
  }

  // Wide canvas-panel: docked side panel; canvas takes the remaining width so it
  // reflows (container-width based) as the panel opens/closes.
  const showPanel = isControlled ? open : true;
  const panelNode = showPanel ? (
    <div
      data-slot="editor-shell-panel"
      className="shrink-0 overflow-y-auto"
      style={{ width: panelWidth }}
    >
      {panelTitle ? (
        <div className="flex items-center justify-between px-3 pb-2 pt-1">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Settings2 className="size-4 text-muted-foreground" />
            {panelTitle}
          </span>
          {onPanelOpenChange ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => setOpen(false)}
              aria-label="Close panel"
            >
              <X />
            </Button>
          ) : null}
        </div>
      ) : null}
      <div className={cn(panelSide === "right" ? "pl-3" : "pr-3")}>{panel}</div>
    </div>
  ) : null;

  return (
    <div
      ref={ref}
      data-slot="editor-shell"
      data-mode="canvas-panel"
      data-layout="docked"
      className={cn("flex w-full items-stretch", className)}
      style={{ minHeight }}
    >
      {panelSide === "left" && panelNode}
      {panelSide === "left" && showPanel && <Separator orientation="vertical" />}
      <div className={cn("min-w-0 flex-1", showPanel && panelSide === "right" && "pr-3", showPanel && panelSide === "left" && "pl-3")}>
        {canvas}
      </div>
      {panelSide === "right" && showPanel && <Separator orientation="vertical" />}
      {panelSide === "right" && panelNode}
    </div>
  );
}
