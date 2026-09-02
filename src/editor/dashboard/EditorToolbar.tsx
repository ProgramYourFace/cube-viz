import * as React from "react";
import { Braces, Check, RotateCcw, Redo2, Save, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";

/**
 * The dashboard editor toolbar (docs/03 §A3.2): the single, unified control bar for
 * the edit SESSION — the dashboard name, the Variables dock toggle, and Undo / Redo /
 * Discard / Save grouped on the right. Wraps to extra rows on a narrow container so it
 * stays usable in a mobile WebView.
 *
 * Adding widgets is deliberately NOT here any more: Chart/Text/Input buttons always
 * dropped the newcomer at the bottom of the board, nowhere near where the user was
 * working. Adding is now in-context, on the canvas' row insert lines (see
 * {@link InsertLines}).
 *
 * Purely presentational — every action is a callback; history (undo/redo) and
 * persistence (save/discard) are owned by the host and surfaced here as props.
 */

export interface EditorToolbarProps {
  name: string;
  onNameChange: (name: string) => void;
  /** Toggle the docked dashboard-variables panel. Omit to hide the button. */
  onToggleVariables?: () => void;
  /** Whether the variables dock is open (the button shows an active state). */
  variablesOpen?: boolean;
  /** Declared-variable count, shown as a badge on the Variables button. */
  variableCount?: number;
  /** Step back/forward through edit history. Buttons hidden if the handler is omitted. */
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  /**
   * What the next undo/redo would do, in the host's own words ("move widget",
   * `edit "Fuel by week"`) — rendered as "Undo move widget" on the button's tooltip +
   * accessible name. The host builds these from the {@link EditMeta} it receives on
   * every change; a plain "Undo" is the fallback.
   */
  undoLabel?: string;
  redoLabel?: string;
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
  onToggleVariables,
  variablesOpen,
  variableCount,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  undoLabel,
  redoLabel,
  onDiscard,
  discardDisabled,
  onSave,
  saveDisabled,
  className,
}: EditorToolbarProps): React.ReactElement {
  const hasHistory = onUndo || onRedo;

  // Brief "Saved ✓" confirmation so a Save click visibly DID something (the button also
  // disables right after, since there's then nothing left to save). An edit re-enables
  // Save (saveDisabled flips false) and immediately drops the stale "Saved" label.
  const [justSaved, setJustSaved] = React.useState(false);
  React.useEffect(() => {
    if (!justSaved) return;
    const t = setTimeout(() => setJustSaved(false), 1600);
    return () => clearTimeout(t);
  }, [justSaved]);
  React.useEffect(() => {
    if (!saveDisabled) setJustSaved(false);
  }, [saveDisabled]);
  const handleSaveClick = (): void => {
    onSave?.();
    setJustSaved(true);
  };

  const undoTitle = undoLabel ? `Undo ${undoLabel}` : "Undo";
  const redoTitle = redoLabel ? `Redo ${redoLabel}` : "Redo";

  return (
    <div data-slot="editor-toolbar" className={cn("cv-editor-toolbar", className)}>
      <Input
        value={name}
        placeholder="Untitled dashboard"
        aria-label="Dashboard name"
        onChange={(e) => onNameChange(e.target.value)}
        className="cv-editor-toolbar-name"
      />
      {onToggleVariables ? (
        <div className="cv-editor-toolbar-group">
          <Button
            variant={variablesOpen ? "secondary" : "outline"}
            size="sm"
            onClick={onToggleVariables}
            aria-pressed={variablesOpen}
            className={cn(variablesOpen && "cv-editor-toolbar-variables--on")}
          >
            <Braces /> Variables
            {variableCount ? (
              <span className="cv-editor-toolbar-badge">{variableCount}</span>
            ) : null}
          </Button>
        </div>
      ) : null}

      {/* Edit-session actions — Undo / Redo / Discard / Save, right-aligned. */}
      <div className="cv-editor-toolbar-actions">
        {hasHistory ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={onUndo}
              disabled={!canUndo}
              aria-label={undoTitle}
              title={undoTitle}
            >
              <Undo2 />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRedo}
              disabled={!canRedo}
              aria-label={redoTitle}
              title={redoTitle}
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
            className="cv-editor-toolbar-discard"
          >
            <RotateCcw /> Discard
          </Button>
        ) : null}
        {onSave ? (
          <Button
            size="sm"
            onClick={handleSaveClick}
            disabled={saveDisabled}
            aria-live="polite"
            className={cn(
              // Keep the confirmation vivid even though the button is (correctly) disabled
              // right after a save — there's nothing left to save.
              justSaved && "cv-editor-toolbar-save--saved",
            )}
          >
            {justSaved ? <Check /> : <Save />} {justSaved ? "Saved" : "Save"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
