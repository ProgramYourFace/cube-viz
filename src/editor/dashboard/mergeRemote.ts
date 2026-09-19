import type { DashboardSpec, LayoutItem, WidgetSpec } from "@/spec";

/**
 * Live-collaboration merge (DashboardEditor `remoteSpec`). A collaborator's merged spec
 * is adopted into the local working draft per widget / layout item (last-write-wins),
 * EXCEPT for what the local user is touching:
 *
 *  - `protectedIds` — widgets (and their layout items, which share the id) whose LOCAL
 *    copy is kept: the widget under active edit, the selected one, and any widget the
 *    local user changed recently. A recent local change is either already on the server
 *    (so the remote carries it too and keeping local is the same thing) or still in
 *    flight through the host's debounce + round trip — and adopting a remote that
 *    predates it would visibly revert the edit here while the server still receives
 *    it, leaving the editor and the shared draft disagreeing.
 *  - `protectedFields` — top-level keys (`name`, `variables`, `grid`, …) kept from local
 *    for the same reason (the dashboard name being typed, a variables pass).
 *
 * Remote deletes win for unprotected widgets; protected local-only widgets (e.g. a
 * just-added one not yet round-tripped) are preserved.
 */
export function mergeRemote(
  remote: DashboardSpec,
  local: DashboardSpec,
  protectedIds: ReadonlySet<string>,
  protectedFields: ReadonlySet<string> = EMPTY,
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

  const merged: Record<string, unknown> = { ...remote, widgets, layout };
  const localRecord = local as unknown as Record<string, unknown>;
  for (const field of protectedFields) {
    if (field === "widgets" || field === "layout") continue; // per-item above
    if (field in localRecord) merged[field] = localRecord[field];
    else delete merged[field];
  }
  return merged as unknown as DashboardSpec;
}

const EMPTY: ReadonlySet<string> = new Set();
