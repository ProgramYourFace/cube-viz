import * as React from "react";
import { ChevronLeft, Trash2 } from "lucide-react";

import {
  DashboardSpecSchema,
  type DashboardSpec,
  type LayoutItem,
  type VariableDecl,
  type WidgetSpec,
} from "@/spec";
import type { ChartFamilyDescriptor } from "@/charts";
import { FamilyRegistryOverride } from "@/provider";
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
  /** The dashboard spec to edit (JSON-in). Identity change = a host re-seed (undo/
   *  redo / discard / switching dashboards) — it fully replaces the working draft. */
  spec: DashboardSpec;
  /**
   * Live-collaboration channel: a merged spec from OTHER editors. The host passes it
   * ONLY for genuine remote revisions (never this client's own echoes). When it
   * changes, its widgets/layout are merged into the local draft once the user is
   * momentarily idle — preserving the widget under active edit so a collaborator's
   * change never yanks the widget out from under your cursor. In-place (no remount).
   * Distinct from `spec`, which is a hard re-seed.
   */
  remoteSpec?: DashboardSpec;
  /**
   * Called when a {@link remoteSpec} is merged into the local draft, with the merged
   * result. NOT a user edit (so it isn't echoed back out) — the host uses it to keep
   * its diff base in sync with what the editor now shows.
   */
  onRemoteAdopted?: (spec: DashboardSpec) => void;
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
  /**
   * Per-component chart-families override. When set, the editor's subtree resolves
   * families from `defaultChartFamilies` + these descriptors (augmenting the provider's
   * families just for this editor); the rest of the context is inherited unchanged.
   */
  families?: ChartFamilyDescriptor[];
  className?: string;
}

export function DashboardEditor({
  spec,
  remoteSpec,
  onRemoteAdopted,
  onChange,
  onSave,
  newId,
  debounceMs = 300,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onDiscard,
  families,
  className,
}: DashboardEditorProps): React.ReactElement {
  // Local working copy; the host's `spec` seeds it and re-seeds when its identity
  // changes (e.g. the host loads a different dashboard).
  const [draft, setDraft] = React.useState<DashboardSpec>(spec);
  React.useEffect(() => setDraft(spec), [spec]);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  // Wall-clock of the last LOCAL edit — the live-collab merge waits for a brief quiet
  // gap before adopting a remote spec, so it never fires mid-drag / mid-edit.
  const lastLocalEditRef = React.useRef(0);
  // Which editor is open full-screen: a specific widget, the variables, or none.
  const [editing, setEditing] = React.useState<
    { kind: "widget"; id: string } | { kind: "variables" } | null
  >(null);

  // Latest selection / edit target, read by the live-collab merge so it protects the
  // current widget without re-arming the effect on every select.
  const selectedIdRef = React.useRef(selectedId);
  const editingRef = React.useRef(editing);
  const draftRef = React.useRef(draft);
  React.useEffect(() => {
    selectedIdRef.current = selectedId;
    editingRef.current = editing;
    draftRef.current = draft;
  });

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
      lastLocalEditRef.current = Date.now();
      setDraft((prev) => {
        const next = update(prev);
        debouncedChange(next);
        return next;
      });
    },
    [debouncedChange],
  );

  /* ──────────────────── live collaboration (remote merge) ───────────────────
   * Adopt a collaborator's merged spec into the local draft, but only once the user
   * is momentarily idle (no local edit for QUIET_MS) so it never interrupts an active
   * drag / edit, and ALWAYS keeping the local copy of the widget under active edit
   * (the full-screen-edited widget + the selected one). Remote merges do NOT fire
   * `onChange` — they aren't the local user's edits, so they don't loop back out. */
  const adoptedRemoteRef = React.useRef<DashboardSpec | undefined>(remoteSpec);
  React.useEffect(() => {
    if (!remoteSpec || remoteSpec === adoptedRemoteRef.current) return;
    const QUIET_MS = 500;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tryAdopt = (): void => {
      const since = Date.now() - lastLocalEditRef.current;
      if (since < QUIET_MS) {
        timer = setTimeout(tryAdopt, QUIET_MS - since);
        return;
      }
      adoptedRemoteRef.current = remoteSpec;
      const protectedIds = new Set<string>();
      if (editingRef.current?.kind === "widget") protectedIds.add(editingRef.current.id);
      if (selectedIdRef.current) protectedIds.add(selectedIdRef.current);
      const merged = mergeRemote(remoteSpec, draftRef.current, protectedIds);
      setDraft(merged);
      onRemoteAdopted?.(merged); // keep the host's diff base in sync (no echo-out)
    };
    tryAdopt();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [remoteSpec]);

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
    (layout: LayoutItem[]) =>
      commit((d) => {
        const merged = mergeLayout(d.layout, layout);
        // Structural short-circuit: RGL fires onLayoutChange on mount and re-sync,
        // and mergeLayout always allocates a fresh array. If the geometry is
        // byte-identical, return the SAME spec reference so we don't setState — this
        // breaks the RGL onLayoutChange -> setState -> re-sync -> onLayoutChange loop.
        return layoutsEqual(d.layout, merged) ? d : { ...d, layout: merged };
      }),
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

  // The whole-dashboard zod parse only feeds the Save-enabled state + the issue
  // count — neither needs to be fresh on every keystroke. Drive it off a DEFERRED
  // copy of the draft so typing doesn't pay a recursive DashboardSpec safeParse per
  // character; React validates the settled draft after the urgent edit has painted.
  const deferredDraft = React.useDeferredValue(draft);
  const validation = React.useMemo(
    () => DashboardSpecSchema.safeParse(deferredDraft),
    [deferredDraft],
  );

  const handleSave = React.useCallback(() => {
    // Save must validate the LIVE draft (the deferred one can lag a keystroke).
    const result = DashboardSpecSchema.safeParse(draft);
    if (result.success) onSave?.(result.data);
  }, [draft, onSave]);

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
    <FamilyRegistryOverride families={families}>
    <div
      data-slot="dashboard-editor"
      // Inset the whole editor by the grid's gap so the toolbar AND the canvas
      // charts sit a consistent gap-width from the edge (the charts were getting
      // clipped by an outer host padding; the edge padding belongs here, matching
      // the inter-widget gap).
      style={{ paddingInline: draft.grid?.margin?.[0] ?? 12 }}
      className={cn("cv:flex cv:h-full cv:flex-col cv:gap-2", className)}
    >
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
        {/* While a full-screen editor is open the canvas is fully occluded, so we
            UNMOUNT it — otherwise every debounced chart-edit draft re-renders +
            reconciles dozens of background CubeCharts the user can't see. */}
        {!editing ? (
          <EditorCanvas
            spec={draft}
            selectedId={selectedId}
            onSelect={handleSelect}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onLayoutChange={handleLayoutChange}
          />
        ) : null}
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
    </FamilyRegistryOverride>
  );
}

/** Capitalize a widget type for the editor header. */
function cap(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

/**
 * Structural per-item equality of two canonical layouts (same order, same geometry +
 * constraints). Used to short-circuit a no-op RGL layout report so a byte-identical
 * layout never triggers a setState (and thus no re-render / RGL re-sync ping-pong).
 */
function layoutsEqual(a: LayoutItem[], b: LayoutItem[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    if (
      x.i !== y.i ||
      x.x !== y.x ||
      x.y !== y.y ||
      x.w !== y.w ||
      x.h !== y.h ||
      x.minW !== y.minW ||
      x.minH !== y.minH ||
      x.static !== y.static
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Merge a collaborator's `remote` spec into the `local` working draft, per widget /
 * layout item (last-write-wins), but always keeping the LOCAL copy of `protectedIds`
 * (the widget under active edit) so live updates never clobber what you're touching.
 * Remote deletes win for non-protected widgets; protected local-only widgets (e.g. a
 * just-added one not yet round-tripped) are preserved.
 */
function mergeRemote(
  remote: DashboardSpec,
  local: DashboardSpec,
  protectedIds: Set<string>,
): DashboardSpec {
  const localWidgetById = new Map(local.widgets.map((w) => [w.id, w]));
  const remoteWidgetIds = new Set(remote.widgets.map((w) => w.id));
  const widgets: WidgetSpec[] = remote.widgets.map((w) =>
    protectedIds.has(w.id) && localWidgetById.has(w.id) ? localWidgetById.get(w.id)! : w,
  );
  for (const w of local.widgets) {
    if (!remoteWidgetIds.has(w.id) && protectedIds.has(w.id)) widgets.push(w);
  }

  const localLayoutById = new Map(local.layout.map((l) => [l.i, l]));
  const remoteLayoutIds = new Set(remote.layout.map((l) => l.i));
  const layout: LayoutItem[] = remote.layout.map((l) =>
    protectedIds.has(l.i) && localLayoutById.has(l.i) ? localLayoutById.get(l.i)! : l,
  );
  for (const l of local.layout) {
    if (!remoteLayoutIds.has(l.i) && protectedIds.has(l.i)) layout.push(l);
  }

  return { ...remote, widgets, layout };
}
