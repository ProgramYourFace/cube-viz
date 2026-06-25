import * as React from "react";
import { ChevronLeft, Trash2 } from "lucide-react";

import {
  DashboardSpecSchema,
  type DashboardSpec,
  type LayoutItem,
  type VariableDecl,
  type WidgetSpec,
} from "@/spec";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

import { EditorToolbar } from "./dashboard/EditorToolbar";
import { EditorCanvas } from "./dashboard/EditorCanvas";
import { WidgetEditPanel } from "./dashboard/WidgetEditPanel";
import { VariablesPanel } from "./dashboard/VariablesPanel";
import { useDebouncedCallback } from "./dashboard/useDebouncedCallback";
import {
  appendWidget,
  duplicateWidget,
  mergeLayout,
  removeWidget,
  replaceWidget,
} from "./dashboard/layout";
import { createIdFactory, newWidget, type IdFactory } from "./dashboard/factories";

/**
 * DashboardEditor (docs/03 §A3.2) — the JSON-in / JSON-out dashboard editor.
 *
 * `spec` is a {@link DashboardSpec}; every edit produces a new `DashboardSpec` and
 * fires `onChange` (debounced). `onSave` receives the spec re-validated through
 * {@link DashboardSpecSchema}. The editor itself NEVER persists — the host owns I/O.
 *
 * Layout: an {@link EditorShell} in `canvas-panel` mode — WIDE docks an edit panel
 * to the right and the {@link EditorCanvas} reflows into the remaining width; NARROW
 * stacks a full-width inline panel above the canvas (NO native sheet), so the same
 * web build edits correctly inside a mobile WebView. Selecting a widget opens its
 * editor in the panel; with nothing selected the panel shows dashboard variables.
 *
 * The canvas captures RGL drag/resize and writes back the single canonical (widest)
 * `spec.layout`, preserving each item's `minW`/`minH`/`static`.
 */

export interface DashboardEditorProps {
  /** The dashboard spec to edit (JSON-in). */
  spec: DashboardSpec;
  /**
   * Called on every edit with the next spec (debounced by {@link debounceMs}). The
   * editor writes nothing itself — wire this to your store/preview.
   */
  onChange?: (spec: DashboardSpec) => void;
  /**
   * Called when the user clicks Save, with the spec re-validated through
   * {@link DashboardSpecSchema}. Omit to hide the Save button.
   */
  onSave?: (spec: DashboardSpec) => void;
  /**
   * Mint new widget ids. Defaults to a per-mount counter (`w-1`, `w-2`, …) — never
   * `Math.random`/`Date.now` at module scope, so SSR + tests stay deterministic.
   */
  newId?: IdFactory;
  /** `onChange` debounce in ms. Default 300. */
  debounceMs?: number;
  /**
   * Edit-history controls, surfaced in the toolbar. cube-viz is intentionally
   * history-less; the HOST owns the undo/redo stack (it re-seeds `spec` on
   * undo/redo) and passes the handlers + enablement here so the controls live in
   * the one unified toolbar. Buttons hidden when the handlers are omitted.
   */
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  /** Throw away unsaved changes (host clears its draft + re-seeds the published spec). */
  onDiscard?: () => void;
  className?: string;
}

export function DashboardEditor({
  spec,
  onChange,
  onSave,
  newId,
  debounceMs = 300,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onDiscard,
  className,
}: DashboardEditorProps): React.ReactElement {
  // Local working copy; the host's `spec` seeds it and re-seeds when its identity
  // changes (e.g. the host loads a different dashboard).
  const [draft, setDraft] = React.useState<DashboardSpec>(spec);
  React.useEffect(() => setDraft(spec), [spec]);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  // Which editor is open full-screen: a specific widget, the variables, or none.
  const [editing, setEditing] = React.useState<
    { kind: "widget"; id: string } | { kind: "variables" } | null
  >(null);

  // Default id factory: one counter per editor mount (stable identity).
  const idFactoryRef = React.useRef<IdFactory | null>(null);
  if (idFactoryRef.current === null) idFactoryRef.current = newId ?? createIdFactory();
  const mintId = newId ?? idFactoryRef.current;

  const debouncedChange = useDebouncedCallback(
    (next: DashboardSpec) => onChange?.(next),
    debounceMs,
  );

  // The single mutation seam: a FUNCTIONAL update so two commits in one tick compose
  // (e.g. inline "New variable" adds a variable AND binds the widget — both must land,
  // not clobber each other via a stale `draft` closure).
  const commit = React.useCallback(
    (update: (prev: DashboardSpec) => DashboardSpec) => {
      setDraft((prev) => {
        const next = update(prev);
        debouncedChange(next);
        return next;
      });
    },
    [debouncedChange],
  );

  /* ─────────────────────────────── widgets ──────────────────────────────── */

  const handleAdd = React.useCallback(
    (type: WidgetSpec["type"]) => {
      const widget = newWidget(type, mintId());
      commit((d) => appendWidget(d, widget));
      setSelectedId(widget.id);
      // Open the new widget straight into the full-screen editor.
      setEditing({ kind: "widget", id: widget.id });
    },
    [commit, mintId],
  );

  // Clicking a widget only selects it (the ring) — editing is via the edit button.
  const handleSelect = React.useCallback((id: string) => setSelectedId(id), []);

  const handleEdit = React.useCallback((id: string) => {
    setSelectedId(id);
    setEditing({ kind: "widget", id });
  }, []);

  const handleDelete = React.useCallback(
    (id: string) => {
      commit((d) => removeWidget(d, id));
      setSelectedId((cur) => (cur === id ? null : cur));
      setEditing((cur) => (cur?.kind === "widget" && cur.id === id ? null : cur));
    },
    [commit],
  );

  const handleDuplicate = React.useCallback(
    (id: string) => {
      const copyId = mintId();
      commit((d) => duplicateWidget(d, id, copyId));
      setSelectedId(copyId);
    },
    [commit, mintId],
  );

  const handleWidgetChange = React.useCallback(
    (widget: WidgetSpec) => commit((d) => replaceWidget(d, widget)),
    [commit],
  );

  const handleLayoutChange = React.useCallback(
    (layout: LayoutItem[]) => commit((d) => ({ ...d, layout: mergeLayout(d.layout, layout) })),
    [commit],
  );

  /* ────────────────────────── dashboard-level edits ─────────────────────── */

  const handleNameChange = React.useCallback(
    (name: string) => commit((d) => ({ ...d, name: name || undefined })),
    [commit],
  );

  const handleVariablesChange = React.useCallback(
    (variables: VariableDecl[]) => commit((d) => ({ ...d, variables })),
    [commit],
  );

  /* ──────────────────────────────── save ────────────────────────────────── */

  const validation = React.useMemo(
    () => DashboardSpecSchema.safeParse(draft),
    [draft],
  );

  const handleSave = React.useCallback(() => {
    if (validation.success) onSave?.(validation.data);
  }, [validation, onSave]);

  /* ──────────────────── full-screen editor (edit button) ────────────────── */

  // The widget being edited (full-screen), or null. Editing variables is its own kind.
  const editingWidget =
    editing?.kind === "widget" ? (draft.widgets.find((w) => w.id === editing.id) ?? null) : null;

  // Close the editor if its widget was removed out from under it.
  React.useEffect(() => {
    if (editing?.kind === "widget" && !draft.widgets.some((w) => w.id === editing.id)) {
      setEditing(null);
    }
  }, [editing, draft.widgets]);

  const closeEditor = React.useCallback(() => setEditing(null), []);

  const overlayTitle =
    editing?.kind === "variables"
      ? "Dashboard variables"
      : editingWidget
        ? (editingWidget.title ?? `${cap(editingWidget.type)} widget`)
        : "";

  return (
    <div data-slot="dashboard-editor" className={cn("cv:flex cv:h-full cv:flex-col cv:gap-2", className)}>
      <EditorToolbar
        name={draft.name ?? ""}
        onNameChange={handleNameChange}
        onAdd={handleAdd}
        onEditVariables={() => setEditing({ kind: "variables" })}
        onUndo={onUndo}
        onRedo={onRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onDiscard={onDiscard}
        onSave={onSave ? handleSave : undefined}
        saveDisabled={!validation.success}
        className="cv:shrink-0"
      />
      {!validation.success ? (
        <p className="cv:shrink-0 cv:text-xs cv:text-destructive">
          {validation.error.issues.length} validation issue
          {validation.error.issues.length === 1 ? "" : "s"} — fix before saving.
        </p>
      ) : null}

      {/* The canvas scrolls — widgets below the fold are reachable (was clipped to
          the viewport, so you couldn't scroll to edit lower charts). */}
      <div className="cv:min-h-0 cv:flex-1 cv:overflow-y-auto cv:pb-4">
        <EditorCanvas
          spec={draft}
          selectedId={selectedId}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onLayoutChange={handleLayoutChange}
        />
      </div>

      {/* Full-screen editor — click a widget's edit (pencil) button (or the
          toolbar's Variables) to open. It takes over the whole surface (the
          viewport / the host WebView) with a prominent preview + the property
          controls; the host RN shell owns how this surface is presented. */}
      {editing ? (
        <div
          data-slot="dashboard-editor-fullscreen"
          role="dialog"
          aria-modal="true"
          aria-label={overlayTitle}
          className="cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background"
        >
          <header className="cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5">
            <div className="cv:flex cv:min-w-0 cv:items-center cv:gap-2">
              <Button variant="ghost" size="sm" onClick={closeEditor}>
                <ChevronLeft /> Done
              </Button>
              <span className="cv:truncate cv:text-sm cv:font-medium">{overlayTitle}</span>
            </div>
            {editingWidget ? (
              <Button
                variant="ghost"
                size="sm"
                className="cv:text-destructive cv:hover:text-destructive"
                onClick={() => handleDelete(editingWidget.id)}
              >
                <Trash2 /> Delete
              </Button>
            ) : null}
          </header>

          <div className="cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4">
            {editing.kind === "variables" ? (
              <div className="cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto">
                <VariablesPanel variables={draft.variables} onChange={handleVariablesChange} />
              </div>
            ) : editingWidget?.type === "chart" ? (
              <WidgetEditPanel
                fill
                widget={editingWidget}
                variables={draft.variables}
                onChange={handleWidgetChange}
                onVariablesChange={handleVariablesChange}
              />
            ) : editingWidget ? (
              <div className="cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto">
                <WidgetEditPanel
                  widget={editingWidget}
                  variables={draft.variables}
                  onChange={handleWidgetChange}
                  onVariablesChange={handleVariablesChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Capitalize a widget type for the editor header. */
function cap(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}
