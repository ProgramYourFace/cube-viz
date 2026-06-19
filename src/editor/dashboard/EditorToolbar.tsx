import * as React from "react";
import { BarChart3, Braces, Save, SlidersHorizontal, Type } from "lucide-react";

import type { WidgetSpec } from "@/spec";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";

/**
 * The dashboard editor toolbar (docs/03 §A3.2): the dashboard name field, the
 * add-widget buttons (chart / text / input), and Save. Add buttons wrap to a second
 * row on a narrow container rather than overflowing, so it stays usable in a mobile
 * WebView. Purely presentational — every action is a callback.
 */

export interface EditorToolbarProps {
  name: string;
  onNameChange: (name: string) => void;
  onAdd: (type: WidgetSpec["type"]) => void;
  /** Open the dashboard-variables editor (full-screen). */
  onEditVariables?: () => void;
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
  onSave,
  saveDisabled,
  className,
}: EditorToolbarProps): React.ReactElement {
  return (
    <div
      data-slot="editor-toolbar"
      className={cn(
        "mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2",
        className,
      )}
    >
      <Input
        value={name}
        placeholder="Untitled dashboard"
        aria-label="Dashboard name"
        onChange={(e) => onNameChange(e.target.value)}
        className="h-8 w-full min-w-0 flex-1 sm:w-auto"
      />
      <div className="flex flex-wrap items-center gap-1">
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
      {onSave ? (
        <Button size="sm" onClick={onSave} disabled={saveDisabled} className="ml-auto">
          <Save /> Save
        </Button>
      ) : null}
    </div>
  );
}
