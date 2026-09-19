import * as React from "react";

import { ChartSpecSchema, type ChartSpec } from "@/spec";

import { useDebouncedCallback } from "../dashboard/useDebouncedCallback";

/**
 * The ChartEditor's controlled-spec engine (docs/03 §A3.1). It keeps an in-memory
 * working `ChartSpec`, validates EVERY candidate with the zod {@link ChartSpecSchema},
 * surfaces a flat list of issues, and only emits VALID specs to the host (debounced
 * so keystroke edits don't flood `onChange`). An invalid candidate is held as the
 * working draft (so the form keeps the user's input) but never emitted.
 */

export interface ChartEditorIssue {
  /** Dotted path into the spec, e.g. "query.measures.0". */
  path: string;
  message: string;
}

export interface UseChartEditorState {
  /** The current working spec (may be an invalid draft mid-edit). */
  draft: ChartSpec;
  /** Validation issues for `draft`; empty when valid. */
  issues: ChartEditorIssue[];
  /** True when `draft` passes `ChartSpecSchema`. */
  valid: boolean;
  /** The last spec emitted to the host (always valid). */
  committed: ChartSpec;
  /** Apply an edit: validate, hold as draft, and (if valid) debounce-emit it. */
  update: (next: ChartSpec) => void;
}

export interface UseChartEditorStateOptions {
  spec: ChartSpec;
  onChange: (next: ChartSpec) => void;
  /** Debounce for `onChange` (ms). Default 250. */
  debounceMs?: number;
}

function validate(spec: ChartSpec): ChartEditorIssue[] {
  const result = ChartSpecSchema.safeParse(spec);
  if (result.success) return [];
  return result.error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}

/**
 * Content key of a spec — the identity the editor reasons about. Two specs with the
 * same key are the same edit state even when they are different objects (a parent
 * that rebuilds its `spec` prop every render, a host round-trip, a re-marshalled
 * DOM-component prop).
 */
export function specKey(spec: ChartSpec): string {
  return JSON.stringify(spec);
}

/**
 * Whether an incoming `spec` prop is an EXTERNAL change the editor must adopt (undo /
 * redo, an AI edit, a collaborator's merge) rather than the editor's own last emission
 * coming back around through the parent. Only an external change re-seeds: re-seeding
 * on the echo would throw away every keystroke typed since that emission left.
 */
export function isExternalSpec(incomingKey: string, lastEmittedKey: string): boolean {
  return incomingKey !== lastEmittedKey;
}

/** A draft paired with its (single) validation result, so we never re-parse it. */
interface DraftState {
  spec: ChartSpec;
  issues: ChartEditorIssue[];
}

export function useChartEditorState({
  spec,
  onChange,
  debounceMs = 250,
}: UseChartEditorStateOptions): UseChartEditorState {
  // `committed` tracks the last valid spec we accepted (seeded from the incoming prop).
  // `draftState` is the live, possibly-invalid working copy PAIRED with its single
  // validation result, so a keystroke validates the candidate exactly once (in
  // `update`) and the render reads that stored result instead of re-parsing.
  const [draftState, setDraftState] = React.useState<DraftState>(() => ({
    spec,
    issues: validate(spec),
  }));
  const [committed, setCommitted] = React.useState<ChartSpec>(spec);

  // The content key of the last spec this editor handed to the host (seeded with the
  // initial prop). The re-seed below compares against it BY CONTENT, not identity.
  const lastEmittedKeyRef = React.useRef<string>(specKey(spec));

  // Re-sync when the host changes the spec from OUTSIDE (controlled input): undo/redo,
  // an AI edit, a remote merge. The prop's identity alone means nothing — a parent that
  // rebuilds it every render (or a host whose DOM props re-marshal on every native
  // render) hands us a new object holding our own last emission, and re-seeding on that
  // would overwrite whatever has been typed since that emission left (the keystrokes
  // still inside the emit debounce). So: same content as we last emitted → ignore.
  const emit = useDebouncedCallback((next: ChartSpec) => {
    // Record what actually left (the trailing edge of the debounce), so the parent's
    // echo of exactly this spec is recognised when it comes back as the `spec` prop.
    lastEmittedKeyRef.current = specKey(next);
    onChange(next);
  }, debounceMs);

  React.useEffect(() => {
    const key = specKey(spec);
    if (!isExternalSpec(key, lastEmittedKeyRef.current)) return;
    // A hard re-seed supersedes any edit still inside the emit debounce: letting it fire
    // afterwards would hand the parent a pre-re-seed draft and undo the external change.
    emit.cancel();
    lastEmittedKeyRef.current = key;
    setDraftState({ spec, issues: validate(spec) });
    setCommitted(spec);
  }, [spec, emit]);

  const draft = draftState.spec;
  const issues = draftState.issues;
  const valid = issues.length === 0;

  const update = React.useCallback(
    (next: ChartSpec) => {
      // Validate the candidate ONCE; reuse the result for both the held draft's
      // `issues` and the emit gate (no second safeParse in a render-time memo).
      const nextIssues = validate(next);
      setDraftState({ spec: next, issues: nextIssues });
      if (nextIssues.length === 0) {
        setCommitted(next);
        emit(next);
      }
    },
    [emit],
  );

  return { draft, issues, valid, committed, update };
}
