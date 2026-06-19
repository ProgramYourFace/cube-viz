import * as React from "react";

import type { FieldKind } from "./wells";

/** The lightweight payload a dragged palette field carries. */
export interface DragPayload {
  name: string;
  kind: FieldKind;
}

export interface FieldDrag {
  /** The field currently being dragged, or null. */
  dragging: DragPayload | null;
  start: (payload: DragPayload) => void;
  end: () => void;
}

/**
 * Shared drag state for Palette ↔ Well (docs/05 §6). Drag is the nice path;
 * click-to-add (handled in the palette/well directly) is the always-available
 * fallback for touch / WebView / a11y. We track the payload in React state so
 * wells can highlight only when the dragged kind is legal — `dataTransfer` alone
 * is unreadable during `dragover`.
 */
export function useFieldDrag(): FieldDrag {
  const [dragging, setDragging] = React.useState<DragPayload | null>(null);
  const start = React.useCallback((payload: DragPayload) => setDragging(payload), []);
  const end = React.useCallback(() => setDragging(null), []);
  return { dragging, start, end };
}
