import * as React from "react";
import { AlertCircle, Save } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { CubeChart } from "@/render";
import type { ChartSpec } from "@/spec";

import { ChartBuilderPanel } from "./chart/builder/ChartBuilderPanel";
import { useChartEditorState } from "./chart/useChartEditorState";
import { EditorShell } from "./primitives/EditorShell";

/**
 * ChartEditor (docs/03 §A3.1) — the JSON-in / JSON-out chart editor. It takes a
 * {@link ChartSpec}, renders a responsive two-pane {@link EditorShell} (LEFT = config
 * pickers driven entirely by `useCubeMeta()`; RIGHT = a live `<CubeChart>` preview),
 * and emits a NEW validated `ChartSpec` via `onChange` on every edit (debounced).
 *
 * Contract / assumptions:
 *  - Performs NO I/O. It only reads `/v1/meta` (via the pickers) and re-fetches the
 *    preview through `<CubeChart>`. The host decides where the emitted spec goes.
 *  - MUST be rendered inside a `<CubeVizProvider>` — `<CubeChart>` + the meta-driven
 *    pickers both require the Cube client from context. If a `<DashboardProvider>` is
 *    also an ancestor, the Time section offers "bind to variable" using its declared
 *    variables; otherwise binding is hidden.
 *  - Every candidate is validated with the zod `ChartSpecSchema`. An invalid draft is
 *    held in the form (so input isn't lost) and surfaced inline, but NEVER emitted —
 *    `onChange`/`onSave` only ever receive a valid spec. The preview renders the last
 *    VALID spec so it never issues a malformed `/v1/load`.
 *  - `onChange` fires (debounced) on every valid edit — the live JSON-out contract.
 *    `onSave` is an OPTIONAL explicit-commit hook: when provided, a "Save" button
 *    appears that hands the current valid spec to the host on demand (for hosts that
 *    prefer an explicit save over live emission).
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
  /** Width of the config column in wide (two-pane) layout (px). Default 360. */
  panelWidth?: number;
  /** Min height so the preview can measure on first paint (px). Default 360. */
  minHeight?: number;
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
  panelWidth = 360,
  minHeight = 360,
  fill = false,
  className,
}: ChartEditorProps): React.ReactElement {
  const { draft, issues, valid, committed, update } = useChartEditorState({
    spec,
    // `onChange` is optional; fall back to a no-op so the engine still tracks `committed`.
    onChange: onChange ?? NOOP,
    debounceMs,
  });

  // The preview always renders the last VALID spec, so an invalid mid-edit draft
  // never triggers a malformed query. (When the draft is valid, committed === draft.)
  const previewSpec = committed;

  // Cube rejects a `/load` with nothing to compute; skip the preview fetch until the
  // query has at least one measure, dimension, or time dimension.
  const previewReady =
    (previewSpec.query.measures?.length ?? 0) > 0 ||
    (previewSpec.query.dimensions?.length ?? 0) > 0 ||
    (previewSpec.query.timeDimensions?.length ?? 0) > 0;

  const panel = (
    <div data-slot="chart-editor-config" className="flex flex-col gap-1">
      {onSave ? (
        <div className="flex items-center justify-end pb-1">
          <Button size="sm" disabled={!valid} onClick={() => onSave(committed)}>
            <Save className="size-4" />
            Save
          </Button>
        </div>
      ) : null}
      {!valid ? (
        <Alert variant="destructive" className="mb-1">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid chart spec</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4">
              {issues.slice(0, 5).map((issue, i) => (
                <li key={i}>
                  {issue.path ? <span className="font-mono text-xs">{issue.path}</span> : null}{" "}
                  {issue.message}
                </li>
              ))}
              {issues.length > 5 ? <li>…and {issues.length - 5} more</li> : null}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}
      <ChartBuilderPanel spec={draft} update={update} />
    </div>
  );

  const canvas = (
    <div data-slot="chart-editor-preview" className="flex size-full min-w-0 flex-col">
      {previewReady ? (
        <CubeChart query={previewSpec.query} chart={previewSpec.chart} />
      ) : (
        <div className="flex min-h-[inherit] flex-1 items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Add a measure, dimension, or time dimension to preview this chart.
        </div>
      )}
    </div>
  );

  return (
    <div data-slot="chart-editor" className={cn("w-full", fill && "h-full", className)}>
      <EditorShell
        mode="two-pane"
        panel={panel}
        canvas={canvas}
        panelWidth={panelWidth}
        minHeight={minHeight}
        fill={fill}
      />
    </div>
  );
}
