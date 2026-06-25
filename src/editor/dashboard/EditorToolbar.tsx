import * as React from "react";
import { BarChart3, Braces, RotateCcw, Redo2, Save, SlidersHorizontal, Type, Undo2 } from "lucide-react";

import type { WidgetSpec } from "@/spec";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";

/**
 * The dashboard editor toolbar (docs/03 §A3.2): the single, unified control bar for
 * editing — the dashboard name, the add-widget buttons (chart / text / input /
 * variables), and the edit-session actions (Undo / Redo / Discard / Save) grouped on
 * the right. Wraps to extra rows on a narrow container so it stays usable in a mobile
 * WebView. Purely presentational — every action is a callback; history (undo/redo) and
 * persistence (save/discard) are owned by the host and surfaced here as props.
 */

export interface EditorToolbarProps {
  name: string;
  onNameChange: (name: string) => void;
  onAdd: (type: WidgetSpec["type"]) => void;
  /** Open the dashboard-variables editor (full-screen). */
  onEditVariables?: () => void;
  /** Step back/forward through edit history. Buttons hidden if the handler is omitted. */
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  /** Throw away unsaved changes (revert to the last saved/published spec). */
  onDiscard?: () => void;
  /** Disable Discard when there's nothing to revert. */
  discardDisabled?: boolean;
  /** Omit to hide the Save button (host saves elsewhere). */
  onSave?: () => void;
  /** Disables Save (e.g. while the spec fails validation). */
  saveDisabled?: boolean;
  className?: string;
}

export function EditorToolbar({
  name,
  onNameChange,
  onAdd,
  onEditVariables,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onDiscard,
  discardDisabled,
  onSave,
  saveDisabled,
  className,
}: EditorToolbarProps): React.ReactElement {
  const hasHistory = onUndo || onRedo;
  return (
    <div
      data-slot="editor-toolbar"
      className={cn(
        "cv:flex cv:flex-wrap cv:items-center cv:gap-2 cv:rounded-lg cv:border cv:border-border cv:bg-card cv:p-2",
        className,
      )}
    >
      <Input
        value={name}
        placeholder="Untitled dashboard"
        aria-label="Dashboard name"
        onChange={(e) => onNameChange(e.target.value)}
        className="cv:h-8 cv:w-full cv:min-w-0 cv:flex-1 cv:sm:w-auto"
      />
      <div className="cv:flex cv:flex-wrap cv:items-center cv:gap-1">
        <Button variant="outline" size="sm" onClick={() => onAdd("chart")}>
          <BarChart3 /> Chart
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd("text")}>
          <Type /> Text
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd("input")}>
          <SlidersHorizontal /> Input
        </Button>
        {onEditVariables ? (
          <Button variant="outline" size="sm" onClick={onEditVariables}>
            <Braces /> Variables
          </Button>
        ) : null}
      </div>

      {/* Edit-session actions — Undo / Redo / Discard / Save, right-aligned. */}
      <div className="cv:ml-auto cv:flex cv:items-center cv:gap-1">
        {hasHistory ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={onUndo}
              disabled={!canUndo}
              aria-label="Undo"
              title="Undo"
            >
              <Undo2 />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRedo}
              disabled={!canRedo}
              aria-label="Redo"
              title="Redo"
            >
              <Redo2 />
            </Button>
          </>
        ) : null}
        {onDiscard ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDiscard}
            disabled={discardDisabled}
            className="cv:text-muted-foreground cv:hover:text-destructive"
          >
            <RotateCcw /> Discard
          </Button>
        ) : null}
        {onSave ? (
          <Button size="sm" onClick={onSave} disabled={saveDisabled}>
            <Save /> Save
          </Button>
        ) : null}
      </div>
    </div>
  );
}
