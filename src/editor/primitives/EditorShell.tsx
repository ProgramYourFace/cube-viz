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
  /**
   * `two-pane` only: fill the parent's height (for full-screen editing) instead of
   * sizing to `minHeight`. WIDE → both panes `h-full` (preview fills the screen);
   * NARROW → preview takes a fixed top band, the config scrolls below it.
   */
  fill?: boolean;
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
  fill = false,
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
      // Stacked: preview on top, config below. Both full width. When `fill`, the
      // preview takes a fixed top band and the config scrolls below it.
      return (
        <div
          ref={ref}
          data-slot="editor-shell"
          data-mode="two-pane"
          data-layout="stacked"
          className={cn("cv:flex cv:w-full cv:flex-col", fill && "cv:h-full", className)}
        >
          <div className={cn("cv:w-full", fill && "cv:shrink-0")} style={fill ? { height: "42vh" } : { minHeight }}>
            {canvas}
          </div>
          <Separator className="cv:my-3" />
          <div className={cn("cv:w-full", fill && "cv:min-h-0 cv:flex-1 cv:overflow-y-auto")}>{panel}</div>
        </div>
      );
    }
    return (
      <div
        ref={ref}
        data-slot="editor-shell"
        data-mode="two-pane"
        data-layout="split"
        className={cn("cv:flex cv:w-full cv:items-stretch", fill && "cv:h-full", className)}
        style={fill ? undefined : { minHeight }}
      >
        <div
          className="cv:shrink-0 cv:overflow-y-auto cv:pr-3"
          style={{ width: panelWidth }}
        >
          {panel}
        </div>
        <Separator orientation="vertical" />
        <div className="cv:min-w-0 cv:flex-1 cv:pl-3">{canvas}</div>
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
        className={cn("cv:flex cv:w-full cv:flex-col", className)}
      >
        {!isControlled || onPanelOpenChange ? (
          <div className="cv:mb-2 cv:flex cv:items-center cv:justify-end">
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
            className="cv:mb-3 cv:w-full cv:rounded-lg cv:border cv:border-border cv:bg-card"
          >
            {panelTitle ? (
              <div className="cv:flex cv:items-center cv:justify-between cv:border-b cv:border-border cv:px-3 cv:py-2">
                <span className="cv:text-sm cv:font-medium">{panelTitle}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cv:size-7"
                  onClick={() => setOpen(false)}
                  aria-label="Close panel"
                >
                  <X />
                </Button>
              </div>
            ) : null}
            <div className="cv:p-3">{panel}</div>
          </div>
        ) : null}
        <div className="cv:w-full" style={{ minHeight }}>
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
      className="cv:shrink-0 cv:overflow-y-auto"
      style={{ width: panelWidth }}
    >
      {panelTitle ? (
        <div className="cv:flex cv:items-center cv:justify-between cv:px-3 cv:pb-2 cv:pt-1">
          <span className="cv:flex cv:items-center cv:gap-1.5 cv:text-sm cv:font-medium">
            <Settings2 className="cv:size-4 cv:text-muted-foreground" />
            {panelTitle}
          </span>
          {onPanelOpenChange ? (
            <Button
              variant="ghost"
              size="icon"
              className="cv:size-7"
              onClick={() => setOpen(false)}
              aria-label="Close panel"
            >
              <X />
            </Button>
          ) : null}
        </div>
      ) : null}
      <div className={cn(panelSide === "right" ? "cv:pl-3" : "cv:pr-3")}>{panel}</div>
    </div>
  ) : null;

  return (
    <div
      ref={ref}
      data-slot="editor-shell"
      data-mode="canvas-panel"
      data-layout="docked"
      className={cn("cv:flex cv:w-full cv:items-stretch", className)}
      style={{ minHeight }}
    >
      {panelSide === "left" && panelNode}
      {panelSide === "left" && showPanel && <Separator orientation="vertical" />}
      <div className={cn("cv:min-w-0 cv:flex-1", showPanel && panelSide === "right" && "cv:pr-3", showPanel && panelSide === "left" && "cv:pl-3")}>
        {canvas}
      </div>
      {panelSide === "right" && showPanel && <Separator orientation="vertical" />}
      {panelSide === "right" && panelNode}
    </div>
  );
}
