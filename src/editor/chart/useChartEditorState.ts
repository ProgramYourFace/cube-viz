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

export function useChartEditorState({
  spec,
  onChange,
  debounceMs = 250,
}: UseChartEditorStateOptions): UseChartEditorState {
  // `committed` tracks the last valid spec we accepted (seeded from the incoming prop).
  // `draft` is the live, possibly-invalid working copy.
  const [draft, setDraft] = React.useState<ChartSpec>(spec);
  const [committed, setCommitted] = React.useState<ChartSpec>(spec);

  // Re-sync when the host swaps the spec identity from outside (controlled input).
  React.useEffect(() => {
    setDraft(spec);
    setCommitted(spec);
  }, [spec]);

  const emit = useDebouncedCallback((next: ChartSpec) => onChange(next), debounceMs);

  const issues = React.useMemo(() => validate(draft), [draft]);
  const valid = issues.length === 0;

  const update = React.useCallback(
    (next: ChartSpec) => {
      setDraft(next);
      if (validate(next).length === 0) {
        setCommitted(next);
        emit(next);
      }
    },
    [emit],
  );

  return { draft, issues, valid, committed, update };
}
