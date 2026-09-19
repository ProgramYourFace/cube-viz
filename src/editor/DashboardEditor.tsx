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
import { VariablesDock } from "./dashboard/VariablesDock";
import { useDebouncedCallback } from "./dashboard/useDebouncedCallback";
import {
  duplicateWidget,
  insertWidgetAtColumn,
  insertWidgetAtRow,
  mergeLayout,
  removeWidget,
  replaceWidget,
} from "./dashboard/layout";
import { createIdFactory, newWidget, type IdFactory } from "./dashboard/factories";
import { EditorErrorBoundary } from "./primitives/EditorErrorBoundary";

/**
 * DashboardEditor (docs/03 §A3.2) — the JSON-in / JSON-out dashboard editor.
 *
 * `spec` is a {@link DashboardSpec}; every edit produces a new `DashboardSpec` and
 * fires `onChange` (debounced) WITH an {@link EditMeta} describing what changed.
 * `onSave` receives the spec re-validated through {@link DashboardSpecSchema}. The
 * editor itself NEVER persists — the host owns I/O.
 *
 * Layout: a toolbar over a body that is a flex row — the {@link EditorCanvas} grows,
 * and the {@link VariablesDock} docks to its right when the toolbar's Variables toggle
 * is on (the canvas stays MOUNTED and live, so you can see the input widgets you're
 * declaring variables for). Adding widgets is in-context: the canvas' row insert lines
 * put the newcomer where the user is pointing. A widget's pencil still opens a
 * full-screen editor over everything, and that one DOES unmount the canvas — it fully
 * occludes it, and background CubeCharts would re-render on every keystroke.
 *
 * The canvas captures RGL drag/resize and writes back the single canonical (widest)
 * `spec.layout`, preserving each item's `minW`/`minH`/`static`.
 */

/**
 * What a single edit DID — passed to `onChange` beside the next spec so the host can
 * build an undo stack that reads like the user's actions rather than "change #47".
 *
 * `label` is a short imperative noun phrase for a tooltip ("Undo move widget"), and
 * `coalesceKey` marks commits the host should FOLD INTO ONE undo step: every keystroke
 * in the name field, a whole chart-editing session. A key is scoped to its editing
 * session — closing a widget's editor starts a new one, so re-opening the same chart
 * later is its own undo step rather than joining the previous edit.
 */
export type EditMeta = {
  kind: "layout" | "name" | "variables" | "widget" | "text" | "add" | "remove" | "duplicate";
  widgetId?: string;
  label: string;
  coalesceKey?: string;
};

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
   * Called on every edit with the next spec (debounced by {@link debounceMs}) and an
   * {@link EditMeta} describing the edit. The editor writes nothing itself — wire this
   * to your store/preview. Ignoring the second argument is fine (and is what callers
   * written before edit metadata existed do).
   */
  onChange?: (spec: DashboardSpec, meta: EditMeta) => void;
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
  /**
   * What the next undo/redo would do, in the host's words — it holds the stack, so it
   * holds the labels (built from the {@link EditMeta} of each change). Rendered as
   * "Undo move widget" on the button's tooltip + accessible name.
   */
  undoLabel?: string;
  redoLabel?: string;
  /** Throw away unsaved changes (host clears its draft + re-seeds the published spec). */
  onDiscard?: () => void;
  /**
   * Per-component chart-families override. When set, the editor's subtree resolves
   * families from `defaultChartFamilies` + these descriptors (augmenting the provider's
   * families just for this editor); the rest of the context is inherited unchanged.
   */
  families?: ChartFamilyDescriptor[];
  /**
   * Intercept "add a chart". When provided, choosing Chart on an insert line (or an
   * empty-board tile) calls THIS instead of inserting a blank chart widget — the host
   * runs its own creation flow (e.g. an AI wizard), inserts the widget through `spec`,
   * and points {@link DashboardEditorProps.openWidgetId} at it to land in the chart
   * editor. Text/Input keep their default in-place insert.
   */
  onCreateChart?: () => void;
  /**
   * Open this widget in the full-screen editor as soon as it exists in the draft —
   * the host's half of a custom creation flow (see {@link onCreateChart}). One-shot
   * per id: the user closing the editor is respected (it does not force re-open)
   * until the host passes a different id.
   */
  openWidgetId?: string;
  /**
   * A host panel rendered BESIDE the full-screen chart editor (e.g. an AI editing
   * chat). `update` is the editor's own widget-change path (same undo coalescing as a
   * manual edit), `close` is the header's Done. Rendered only for chart widgets; the
   * host owns the panel's width and its collapsed state.
   */
  renderWidgetAside?: (ctx: { widget: WidgetSpec; update: (next: WidgetSpec) => void; close: () => void }) => React.ReactNode;
  /** Host controls in the full-screen editor's header (right side, before Delete) — e.g. the button that re-opens a collapsed aside. */
  renderWidgetHeaderExtra?: (ctx: { widget: WidgetSpec; update: (next: WidgetSpec) => void; close: () => void }) => React.ReactNode;
  /** The full-screen widget editor opened (its id) or closed (null) — the host hides overlays that would sit on top of it. */
  onEditingChange?: (widgetId: string | null) => void;
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
  undoLabel,
  redoLabel,
  onDiscard,
  families,
  onCreateChart,
  openWidgetId,
  renderWidgetAside,
  renderWidgetHeaderExtra,
  onEditingChange,
  className,
}: DashboardEditorProps): React.ReactElement {
  // Local working copy; the host's `spec` seeds it and re-seeds when its identity
  // changes (e.g. the host loads a different dashboard / undo-redo).
  const [draft, setDraft] = React.useState<DashboardSpec>(spec);
  // Baseline for the "unsaved changes" signal: the last spec that was externally seeded
  // (host load / undo-redo) or saved. Every edit goes through `commit`, which mints a NEW
  // draft object, so `draft !== savedSpec` is a cheap, reliable "there's something to save".
  const [savedSpec, setSavedSpec] = React.useState<DashboardSpec>(spec);
  React.useEffect(() => {
    setDraft(spec);
    setSavedSpec(spec);
  }, [spec]);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  // Wall-clock of the last LOCAL edit — the live-collab merge waits for a brief quiet
  // gap before adopting a remote spec, so it never fires mid-drag / mid-edit.
  const lastLocalEditRef = React.useRef(0);
  // Which widget's editor is open full-screen (null = the canvas).
  const [editing, setEditing] = React.useState<{ kind: "widget"; id: string } | null>(null);
  // Whether the variables dock is open beside the canvas.
  const [variablesOpen, setVariablesOpen] = React.useState(false);

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

  // Debounced JSON-out. The meta travels WITH the spec, so a debounce window delivers
  // the meta of the last commit in it — which is the one describing the settled state.
  const debouncedChange = useDebouncedCallback(
    (next: DashboardSpec, meta: EditMeta) => onChange?.(next, meta),
    debounceMs,
  );

  // The single mutation seam: a FUNCTIONAL update so two commits in one tick compose
  // (e.g. inline "New variable" adds a variable AND binds the widget — both must land,
  // not clobber each other via a stale `draft` closure). Every call names what it did
  // ({@link EditMeta}) so the host's undo stack can label + coalesce its entries.
  const commit = React.useCallback(
    (update: (prev: DashboardSpec) => DashboardSpec, meta: EditMeta) => {
      lastLocalEditRef.current = Date.now();
      setDraft((prev) => {
        const next = update(prev);
        debouncedChange(next, meta);
        return next;
      });
    },
    [debouncedChange],
  );

  /* ────────────────────────── edit-session coalescing ───────────────────────
   * One chart-editing session = ONE undo step, so every commit for a widget shares a
   * coalesceKey. Closing the editor bumps that widget's session counter, so re-opening
   * the same widget later starts a fresh key (and thus a fresh undo step) rather than
   * folding into the edit the user finished ten minutes ago. */
  const sessionsRef = React.useRef<Map<string, number>>(new Map());
  const sessionKey = React.useCallback((prefix: string, id: string): string => {
    return `${prefix}:${id}:${sessionsRef.current.get(id) ?? 0}`;
  }, []);

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

  // In-context add: the `+` on a canvas insert line (or an empty-board tile, which
  // passes row 0). A ROW line drops the widget at that row and pushes the board down;
  // a COLUMN line puts it beside the row's widgets and makes room within the row.
  const handleInsert = React.useCallback(
    (type: WidgetSpec["type"], rowY: number, colX?: number) => {
      // The host may own chart creation (wizard flow) — see onCreateChart/openWidgetId.
      // It inserts through `spec`, so it decides the placement itself.
      if (type === "chart" && onCreateChart) {
        onCreateChart();
        return;
      }
      const widget = newWidget(type, mintId());
      commit(
        (d) =>
          colX === undefined
            ? insertWidgetAtRow(d, widget, rowY)
            : insertWidgetAtColumn(d, widget, rowY, colX),
        {
          kind: "add",
          widgetId: widget.id,
          label: `add ${type}`,
        },
      );
      setSelectedId(widget.id);
      // A blank chart is useless until it's configured, so it opens straight into its
      // editor; a text/input widget is editable in place from the canvas.
      if (type === "chart") setEditing({ kind: "widget", id: widget.id });
    },
    [commit, mintId, onCreateChart],
  );

  // Host-driven "open this widget once it exists" (the landing half of a custom
  // creation flow). One-shot per id: closing the editor is never fought.
  const openedWidgetRef = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    if (!openWidgetId || openedWidgetRef.current === openWidgetId) return;
    if (!draft.widgets.some((w) => w.id === openWidgetId)) return; // not seeded yet
    openedWidgetRef.current = openWidgetId;
    setSelectedId(openWidgetId);
    setEditing({ kind: "widget", id: openWidgetId });
  }, [openWidgetId, draft.widgets]);

  // Clicking a widget only selects it (the ring) — editing is via the edit button.
  const handleSelect = React.useCallback((id: string) => setSelectedId(id), []);

  const handleEdit = React.useCallback((id: string) => {
    setSelectedId(id);
    setEditing({ kind: "widget", id });
  }, []);

  const handleDelete = React.useCallback(
    (id: string) => {
      commit((d) => removeWidget(d, id), {
        kind: "remove",
        widgetId: id,
        label: `delete "${titleOf(draftRef.current.widgets.find((w) => w.id === id))}"`,
      });
      setSelectedId((cur) => (cur === id ? null : cur));
      setEditing((cur) => (cur?.id === id ? null : cur));
    },
    [commit],
  );

  const handleDuplicate = React.useCallback(
    (id: string) => {
      const copyId = mintId();
      commit((d) => duplicateWidget(d, id, copyId), {
        kind: "duplicate",
        widgetId: copyId,
        label: `duplicate "${titleOf(draftRef.current.widgets.find((w) => w.id === id))}"`,
      });
      setSelectedId(copyId);
    },
    [commit, mintId],
  );

  const handleWidgetChange = React.useCallback(
    (widget: WidgetSpec) => {
      const kind = widget.type === "text" ? "text" : "widget";
      commit((d) => replaceWidget(d, widget), {
        kind,
        widgetId: widget.id,
        label: `edit "${titleOf(widget)}"`,
        coalesceKey: sessionKey(kind, widget.id),
      });
    },
    [commit, sessionKey],
  );

  const handleLayoutChange = React.useCallback(
    (layout: LayoutItem[]) =>
      commit(
        (d) => {
          const merged = mergeLayout(d.layout, layout);
          // Structural short-circuit: RGL fires onLayoutChange on mount and re-sync,
          // and mergeLayout always allocates a fresh array. If the geometry is
          // byte-identical, return the SAME spec reference so we don't setState — this
          // breaks the RGL onLayoutChange -> setState -> re-sync -> onLayoutChange loop.
          return layoutsEqual(d.layout, merged) ? d : { ...d, layout: merged };
        },
        { kind: "layout", label: "layout change" },
      ),
    [commit],
  );

  /* ────────────────────────── dashboard-level edits ─────────────────────── */

  const handleNameChange = React.useCallback(
    (name: string) =>
      commit((d) => ({ ...d, name: name || undefined }), {
        kind: "name",
        label: "rename dashboard",
        // Every keystroke is one commit; the host folds them into one undo step.
        coalesceKey: "name",
      }),
    [commit],
  );

  // The chart editor's inline "New variable" hands back the whole declaration list.
  const handleVariablesChange = React.useCallback(
    (variables: VariableDecl[]) =>
      commit((d) => ({ ...d, variables }), {
        kind: "variables",
        label: "edit variables",
        coalesceKey: "variables",
      }),
    [commit],
  );

  // The dock emits pure spec TRANSFORMS (a rename rewrites widgets too, not just decls).
  const handleVariablesTransform = React.useCallback(
    (update: (prev: DashboardSpec) => DashboardSpec) =>
      commit(update, { kind: "variables", label: "edit variables", coalesceKey: "variables" }),
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
    if (result.success) {
      onSave?.(result.data);
      // Mark this draft as the saved baseline so Save disables until the next edit.
      setSavedSpec(draft);
    }
  }, [draft, onSave]);

  // Nothing-to-save: the working draft matches the last seeded/saved baseline by identity
  // (any edit replaces the draft object via `commit`). Drives the Save/Discard disabled state.
  const dirty = draft !== savedSpec;

  /* ──────────────────── full-screen editor (edit button) ────────────────── */

  // The widget being edited (full-screen), or null.
  const editingWidget = editing ? (draft.widgets.find((w) => w.id === editing.id) ?? null) : null;

  // Close the editor if its widget was removed out from under it.
  React.useEffect(() => {
    if (editing && !draft.widgets.some((w) => w.id === editing.id)) {
      setEditing(null);
    }
  }, [editing, draft.widgets]);

  // "Done" ENDS the editing session: the next edit of this widget gets a fresh
  // coalesceKey, so one open-edit-close round is one undo step.
  const closeEditor = React.useCallback(() => {
    setEditing((cur) => {
      if (cur) sessionsRef.current.set(cur.id, (sessionsRef.current.get(cur.id) ?? 0) + 1);
      return null;
    });
  }, []);

  const overlayTitle = editingWidget ? titleOf(editingWidget) : "";
  const asideCtx = editingWidget?.type === "chart" ? { widget: editingWidget, update: handleWidgetChange, close: closeEditor } : null;
  const aside = asideCtx && renderWidgetAside ? renderWidgetAside(asideCtx) : null;
  const headerExtra = asideCtx && renderWidgetHeaderExtra ? renderWidgetHeaderExtra(asideCtx) : null;
  const editingId = editing?.id ?? null;
  React.useEffect(() => {
    onEditingChange?.(editingId);
  }, [editingId, onEditingChange]);

  return (
    <FamilyRegistryOverride families={families}>
    <div
      data-slot="dashboard-editor"
      // Inset the whole editor by the grid's gap so the toolbar AND the canvas
      // charts sit a consistent gap-width from the edge (the charts were getting
      // clipped by an outer host padding; the edge padding belongs here, matching
      // the inter-widget gap).
      style={{ paddingInline: draft.grid?.margin?.[0] ?? 12 }}
      className={cn("cv-dashboard-editor", className)}
    >
      <EditorToolbar
        name={draft.name ?? ""}
        onNameChange={handleNameChange}
        onToggleVariables={() => setVariablesOpen((o) => !o)}
        variablesOpen={variablesOpen}
        variableCount={draft.variables.length}
        onUndo={onUndo}
        onRedo={onRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        undoLabel={undoLabel}
        redoLabel={redoLabel}
        onDiscard={onDiscard}
        discardDisabled={!dirty}
        onSave={onSave ? handleSave : undefined}
        saveDisabled={!validation.success || !dirty}
        className="cv-dashboard-editor-toolbar"
      />
      {!validation.success ? (
        <p className="cv-dashboard-editor-validation">
          {validation.error.issues.length} validation issue
          {validation.error.issues.length === 1 ? "" : "s"} — fix before saving.
        </p>
      ) : null}

      {/* Body: canvas (grows) + the variables dock (fixed width) beside it. */}
      <div className="cv-dashboard-editor-body">
        {/* The canvas scrolls — widgets below the fold are reachable (was clipped to
            the viewport, so you couldn't scroll to edit lower charts). */}
        <div className="cv-dashboard-editor-scroll">
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
              onInsert={handleInsert}
            />
          ) : null}
        </div>

        {/* The dock stays out of the way while a widget editor is open (that surface
            takes the whole screen and carries its own variable controls). */}
        {variablesOpen && !editing ? (
          <VariablesDock
            spec={draft}
            onChange={handleVariablesTransform}
            onClose={() => setVariablesOpen(false)}
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
          className="cv-dashboard-editor-fullscreen"
        >
          <header className="cv-dashboard-editor-fullscreen-header">
            <div className="cv-dashboard-editor-fullscreen-heading">
              <Button variant="ghost" size="sm" onClick={closeEditor}>
                <ChevronLeft /> Done
              </Button>
              <span className="cv-dashboard-editor-fullscreen-title">{overlayTitle}</span>
            </div>
            <div className="cv-dashboard-editor-fullscreen-actions">
              {headerExtra}
              {editingWidget ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="cv-ed-danger"
                  onClick={() => handleDelete(editingWidget.id)}
                >
                  <Trash2 /> Delete
                </Button>
              ) : null}
            </div>
          </header>

          {/* The header above stays OUTSIDE this boundary on purpose: whatever goes
              wrong in here, "Done" is still there to get back to the canvas. Without
              it, a control that throws on the value it was handed unmounts the whole
              dashboard editor and the board reads as unopenable. */}
          <EditorErrorBoundary label={overlayTitle} resetKey={draft}>
          <div className="cv-dashboard-editor-fullscreen-body">
            {editingWidget?.type === "chart" ? (
              <div className="cv-dashboard-editor-fullscreen-row">
                <div className="cv-dashboard-editor-fullscreen-main">
                  <WidgetEditPanel
                    fill
                    widget={editingWidget}
                    variables={draft.variables}
                    onChange={handleWidgetChange}
                    onVariablesChange={handleVariablesChange}
                  />
                </div>
                {aside ? (
                  <aside data-slot="dashboard-editor-aside" className="cv-dashboard-editor-fullscreen-aside">
                    {aside}
                  </aside>
                ) : null}
              </div>
            ) : editingWidget ? (
              <div className="cv-dashboard-editor-fullscreen-column">
                <WidgetEditPanel
                  widget={editingWidget}
                  variables={draft.variables}
                  onChange={handleWidgetChange}
                  onVariablesChange={handleVariablesChange}
                />
              </div>
            ) : null}
          </div>
          </EditorErrorBoundary>
        </div>
      ) : null}
    </div>
    </FamilyRegistryOverride>
  );
}

/**
 * How a widget is NAMED in headers and undo labels: its own title, else its kind
 * ("Chart widget"). Always a string — an undo label is never allowed to read
 * "delete "undefined"".
 */
function titleOf(widget: WidgetSpec | undefined): string {
  if (!widget) return "widget";
  if (widget.title) return widget.title;
  const type = widget.type;
  return `${type[0].toUpperCase()}${type.slice(1)} widget`;
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
