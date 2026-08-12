import type { MemberOption } from "../../primitives/meta-helpers";
import { axisKeyOf, axisLabelOf } from "../builder/axis";
import { placementBlockReason } from "../builder/channels";
import type { FieldKind, WellDef } from "../builder/wells";

/**
 * The field picker's AVAILABILITY model — the one place that answers "can this field
 * go in the slot I am filling, and if not, why?" — plus the persisted preference for
 * the picker's "Only compatible fields" switch.
 *
 * Availability is deliberately a SINGLE notion with several sources, because that is
 * how a user experiences it: the field either drops in or it does not. The reasons:
 *
 *  1. SLOT KIND / CARDINALITY — the well's own `kinds` ({@link placementBlockReason}:
 *     "Slices takes a date or category").
 *  2. AXIS UNIT / QUANTITY — a value axis stays one kind of quantity, so once a
 *     distance measure holds the axis, litres and km/h cannot join it
 *     ({@link axisUnitBlockReason}; enabled per family by the descriptor's
 *     `enforcesAxisUnit` flag, applied by ChartEditOverlay's `blockReason`).
 *  3. DATASET / JOIN SCOPE — a field outside the chart's join graph, or a second
 *     measure table (also produced by ChartEditOverlay's `blockReason`).
 *
 * The picker LISTS unavailable fields muted, with their reason, so the user can see
 * what exists and why it is blocked. The switch hides them for any of those reasons —
 * which is what makes "with Distance placed, show only distance measures" work.
 */

/** One member row in the picker, tagged with why (if at all) it cannot be added. */
export interface FieldCandidate {
  option: MemberOption;
  /** The role this row would be placed as (routes the query binding). */
  kind: FieldKind;
  /** Why it cannot be added right now; `undefined` ⇒ addable. */
  reason?: string;
}

/** A candidate the target slot will accept right now. */
export function isAvailable(candidate: { reason?: string }): boolean {
  return candidate.reason === undefined;
}

/**
 * The full reason a member cannot be added to `well` as `kind` — the union of the
 * slot's own rule and the chart-level context (dataset / measure-source / axis unit),
 * in the order the picker shows them: the slot's "wrong kind of field" wins because
 * it names the fix ("put a measure here instead"), where the context blocks describe
 * the model.
 */
export function candidateReason(
  well: WellDef,
  kind: FieldKind,
  inWell: readonly string[],
  option: MemberOption,
  contextReason?: (option: MemberOption) => string | undefined,
): string | undefined {
  return placementBlockReason(well, kind, [...inWell]) ?? contextReason?.(option);
}

/**
 * Why `option` may not join a value axis already showing `axisKey` — the unit/quantity
 * rule (a distance axis refuses litres). `axisKey` undefined ⇒ the axis is empty and
 * takes anything. `axisLabel` names the axis' current quantity in the message.
 */
export function axisUnitBlockReason(
  option: MemberOption,
  axisKey: string | undefined,
  axisLabel: string | undefined,
): string | undefined {
  if (axisKey === undefined) return undefined;
  if (axisKeyOf(option) === axisKey) return undefined;
  return `This axis shows ${axisLabel ?? axisKey}; ${option.label ?? "this field"} is ${axisLabelOf(option)}`;
}

/**
 * Split candidates into the ones that can be placed and the ones that cannot. The
 * picker renders `available` always, `unavailable` only while the switch is off — and
 * uses `unavailable.length` for the "n hidden" count, so hiding is never silent.
 */
export function partitionByAvailability<T extends { reason?: string }>(
  candidates: readonly T[],
): { available: T[]; unavailable: T[] } {
  const available: T[] = [];
  const unavailable: T[] = [];
  for (const c of candidates) (isAvailable(c) ? available : unavailable).push(c);
  return { available, unavailable };
}

/* ───────────────────── the persisted "only compatible" choice ───────────────────── */

/** Namespaced so the host page's storage stays legible; see {@link readOnlyCompatible}. */
export const ONLY_COMPATIBLE_KEY = "cube-viz:field-picker:only-compatible";

/** Every field picker mounted right now renders from this ONE value. */
export interface OnlyCompatibleStore {
  /** The current choice (React `useSyncExternalStore`'s `getSnapshot`). */
  get: () => boolean;
  /** The server's answer: nothing is hidden until the client knows the preference. */
  getServer: () => boolean;
  /** Set it for EVERY picker and persist it. */
  set: (on: boolean) => void;
  /** Re-render on change — including a change made in another tab. */
  subscribe: (onChange: () => void) => () => void;
}

/**
 * `localStorage`, or undefined when it cannot be used. Every access is guarded:
 * server rendering has no `localStorage` at all, and a WebView (or Safari private
 * mode, or a page with cookies blocked) can THROW on the property access itself —
 * not just on read/write — so a bare `typeof window` check is not enough.
 */
function storage(): Storage | undefined {
  try {
    return globalThis.localStorage ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * The persisted switch state. DEFAULT OFF: the picker's job is to show what exists
 * and why it is blocked, so hiding is opt-in and survives popover opens + reloads.
 */
export function readOnlyCompatible(): boolean {
  try {
    return storage()?.getItem(ONLY_COMPATIBLE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Persist the switch. Silently a no-op when storage is unavailable or full. */
export function writeOnlyCompatible(on: boolean): void {
  try {
    const s = storage();
    if (!s) return;
    if (on) s.setItem(ONLY_COMPATIBLE_KEY, "1");
    else s.removeItem(ONLY_COMPATIBLE_KEY);
  } catch {
    /* quota exceeded / storage disabled — the preference is a nicety, never a failure */
  }
}

/* ───────────────────────── the SHARED switch (one per app) ───────────────────────── */

/**
 * "Only compatible fields" is ONE choice about how the user wants to be shown fields,
 * not a per-popover setting — so it lives in ONE observable place and every picker
 * renders from it.
 *
 * It used to be `useState(readOnlyCompatible)` inside {@link FieldPickerPopover}, which
 * looks equivalent (the value is persisted, so a fresh mount picks it up) and is not:
 * the editor mounts EVERY well's picker up front, so all of them read storage before
 * the user has touched anything. Flipping the switch in one popover then wrote the
 * preference and re-rendered only THAT instance; every sibling kept its stale `false`
 * and went on listing rows it should have hidden — the Values slot happily offering
 * dates and dimensions under "Values takes a measure" while the user believed the
 * switch was on. A shared store makes the invariant structural: there is no second
 * copy of the answer to drift.
 *
 * The snapshot is read from storage ONCE at module load and thereafter kept in memory,
 * so the switch still works where `localStorage` cannot be written at all (a hardened
 * WebView, private mode, blocked cookies) — it just does not survive a reload there.
 */
let snapshot = readOnlyCompatible();
const listeners = new Set<() => void>();
/** Detach for the `storage` (other-tab) listener; attached only while anyone listens. */
let detachStorage: (() => void) | undefined;

function emit(): void {
  // Copy: a listener may unsubscribe (unmount) while we are notifying.
  for (const listener of [...listeners]) listener();
}

/** Adopt a value written elsewhere (another tab) — ignored when it changes nothing. */
function adopt(next: boolean): void {
  if (next === snapshot) return;
  snapshot = next;
  emit();
}

function attachStorageListener(): void {
  if (detachStorage) return;
  // Not every host has a DOM event target (SSR, a worker) — feature-detect, do not
  // assume `window`.
  const target: Partial<EventTarget> = globalThis;
  if (typeof target.addEventListener !== "function") return;
  const onStorage = (event: Event): void => {
    const { key } = event as StorageEvent;
    // `key === null` is a whole-storage clear() — re-read either way.
    if (key !== null && key !== ONLY_COMPATIBLE_KEY) return;
    adopt(readOnlyCompatible());
  };
  target.addEventListener("storage", onStorage);
  detachStorage = () => target.removeEventListener?.("storage", onStorage);
}

/**
 * The one "Only compatible fields" choice. Import this — never a local `useState` seeded
 * from {@link readOnlyCompatible} — so every open picker agrees on what it is hiding.
 */
export const onlyCompatibleStore: OnlyCompatibleStore = {
  get: () => snapshot,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => false,
  set: (on) => {
    writeOnlyCompatible(on);
    adopt(on);
  },
  subscribe: (onChange) => {
    listeners.add(onChange);
    attachStorageListener();
    return () => {
      listeners.delete(onChange);
      if (listeners.size === 0) {
        detachStorage?.();
        detachStorage = undefined;
      }
    };
  },
};
