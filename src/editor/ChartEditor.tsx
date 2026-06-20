import * as React from "react";
import { AlertCircle, Save } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { CubeChart } from "@/render";
import type { ChartSpec } from "@/spec";

import { ChartEditOverlay } from "./chart/onchart/ChartEditOverlay";
import { useChartEditorState } from "./chart/useChartEditorState";

/**
 * ChartEditor (docs/03 §A3.1, docs/05) — the JSON-in / JSON-out chart editor. It takes
 * a {@link ChartSpec} and turns the live `<CubeChart>` preview itself into the editing
 * surface: a {@link ChartEditOverlay} wraps the chart with on-chart field slots (a left
 * Y-axis strip, a bottom X-axis slot, a centre type widget, a ⋯ chrome menu) — no side
 * panel. Every edit emits a NEW validated `ChartSpec` via `onChange` (debounced).
 *
 * Contract / assumptions:
 *  - Performs NO I/O beyond reading `/v1/meta` (via the slot pickers) and the preview's
 *    own `<CubeChart>` fetch. The host decides where the emitted spec goes.
 *  - MUST be rendered inside a `<CubeVizProvider>` (the Cube client). A `<DashboardProvider>`
 *    ancestor, when present, resolves `{var}` tokens in the preview query.
 *  - Every candidate is validated with the zod `ChartSpecSchema`. An invalid draft is held
 *    (so input isn't lost) and surfaced inline, but NEVER emitted; the preview renders the
 *    last VALID spec so it never issues a malformed `/v1/load`.
 *  - `onSave` is an OPTIONAL explicit-commit hook; when set, a "Save" button appears.
 */

export interface ChartEditorProps {
  /** The chart spec to edit. Treated as a controlled input: swapping its identity re-seeds the editor. */
  spec: ChartSpec;
  /** Emits a new, schema-VALID `ChartSpec` on each edit (debounced). */
  onChange?: (spec: ChartSpec) => void;
  /** Optional explicit-save hook; when set, a "Save" button hands over the current valid spec. */
  onSave?: (spec: ChartSpec) => void;
  /** Debounce for both `onChange` and the live preview (ms). Default 250. */
  debounceMs?: number;
  /** Fill the parent's height (full-screen editing) so the preview fills the screen. */
  fill?: boolean;
  className?: string;
}

const NOOP = (): void => {};

export function ChartEditor({
  spec,
  onChange,
  onSave,
  debounceMs = 250,
  fill = false,
  className,
}: ChartEditorProps): React.ReactElement {
  const { draft, issues, valid, committed, update } = useChartEditorState({
    spec,
    onChange: onChange ?? NOOP,
    debounceMs,
  });

  // The preview renders the last VALID spec, so an invalid mid-edit draft never
  // triggers a malformed query. (When the draft is valid, committed === draft.)
  const previewSpec = committed;
  // A query is renderable when it groups by SOMETHING Cube will compute: a measure,
  // a dimension, or a time dimension WITH A GRANULARITY. A granularity-less time
  // dimension is only a date-range filter (the global date binding) and does not, by
  // itself, make a valid query — matching Cube's own "timeDimensions with
  // granularities" rule — so clearing the axes flips straight to the empty chooser.
  const hasFields = (q: ChartSpec["query"]): boolean =>
    (q.measures?.length ?? 0) > 0 ||
    (q.dimensions?.length ?? 0) > 0 ||
    (q.timeDimensions?.some((td) => typeof td.granularity === "string") ?? false);
  const hasMeasure = (q: ChartSpec["query"]): boolean => (q.measures?.length ?? 0) > 0;
  // Every chart family except `table` draws from a value (measure); a dimension-only
  // query renders an empty plot, so gate those families on a measure and tell the
  // user what's still missing rather than showing a blank chart with no guidance.
  const needsMeasure = draft.chart.family !== "table";
  // Show the chart only when BOTH the live draft and the committed spec have fields:
  // gating on the draft means clearing every field flips straight to the empty
  // chooser (a stale non-empty `committed` won't keep issuing a now-orphaned query).
  const previewReady =
    hasFields(draft.query) &&
    hasFields(previewSpec.query) &&
    (!needsMeasure || (hasMeasure(draft.query) && hasMeasure(previewSpec.query)));

  // Family-aware hint so the empty state names the missing required field.
  const emptyHint =
    needsMeasure && !hasMeasure(draft.query)
      ? `Add a value (measure) to build this ${draft.chart.family} chart.`
      : "Add fields from the axes to build this chart.";

  const preview = previewReady ? (
    <CubeChart query={previewSpec.query} chart={previewSpec.chart} editing />
  ) : (
    <div className="flex size-full items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
      <span className="max-w-[16rem]">{emptyHint}</span>
    </div>
  );

  const toolbar = onSave ? (
    <Button size="sm" disabled={!valid} onClick={() => onSave(committed)}>
      <Save className="size-4" />
      Save
    </Button>
  ) : null;

  return (
    <div
      data-slot="chart-editor"
      className={cn("flex w-full flex-col gap-2", fill ? "h-full" : "min-h-[28rem]", className)}
    >
      {!valid ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid chart spec</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4">
              {issues.slice(0, 3).map((issue, i) => (
                <li key={i}>
                  {issue.path ? <span className="font-mono text-xs">{issue.path}</span> : null}{" "}
                  {issue.message}
                </li>
              ))}
              {issues.length > 3 ? <li>…and {issues.length - 3} more</li> : null}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="min-h-0 flex-1">
        <ChartEditOverlay spec={draft} update={update} toolbar={toolbar}>
          {preview}
        </ChartEditOverlay>
      </div>
    </div>
  );
}
