import * as React from "react";

import {
  SCHEMA_VERSION,
  type ChartSpec,
  type ChartWidget,
  type DashboardSpec,
  type VariableDecl,
  type WidgetSpec,
} from "@/spec";
import { DashboardProvider } from "@/hooks";

import { ChartEditor } from "../ChartEditor";
import { FieldRow } from "../primitives/FieldRow";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";
import { VariableAdminProvider } from "../chart/binding/variable-admin";
import { TextWidgetEditor } from "./TextWidgetEditor";
import { InputWidgetEditor } from "./InputWidgetEditor";

/**
 * The per-widget edit panel hosted in the docked/inline {@link EditorShell} panel
 * (docs/03 §A3.2 "Select-to-edit"). Dispatches by widget type:
 *  - chart → the sibling {@link ChartEditor} (a ChartSpec-in/out editor; we adapt
 *    the `ChartWidget` ↔ `ChartSpec` at the seam so the chart editor stays unaware
 *    of the dashboard envelope)
 *  - text  → the editable TipTap {@link TextWidgetEditor}
 *  - input → the {@link InputWidgetEditor} (variable + kind + kind options)
 *
 * Plus a shared title field for every widget. The panel is pure: it emits the next
 * `WidgetSpec` upward; the editor merges it into the spec.
 */

export interface WidgetEditPanelProps {
  widget: WidgetSpec;
  /** Dashboard variables (for the input widget's variable binding). */
  variables: VariableDecl[];
  onChange: (widget: WidgetSpec) => void;
  /** Register a new dashboard variable (enables inline "New variable" in binding controls). */
  onVariablesChange?: (variables: VariableDecl[]) => void;
  /** Fill the parent's height (full-screen editing) — the chart editor's preview fills the screen. */
  fill?: boolean;
}

/** A variables-only dashboard so the chart preview can resolve `{var}` tokens. */
function previewDashboard(variables: VariableDecl[]): DashboardSpec {
  return { schemaVersion: SCHEMA_VERSION, id: "editor-preview", kind: "dashboard", variables, widgets: [], layout: [] };
}

/** Adapt a ChartWidget into the ChartSpec the ChartEditor edits. */
function widgetToChartSpec(w: ChartWidget): ChartSpec {
  const spec: ChartSpec = {
    schemaVersion: SCHEMA_VERSION,
    id: w.id,
    kind: "chart",
    query: w.query,
    chart: w.chart,
  };
  if (w.title !== undefined) spec.name = w.title;
  return spec;
}

/** Pull the query/chart (and edited name) back out of a ChartSpec into the widget. */
function chartSpecToWidget(prev: ChartWidget, spec: ChartSpec): ChartWidget {
  const next: ChartWidget = {
    ...prev,
    query: spec.query,
    chart: spec.chart,
  };
  if (spec.name !== undefined) next.title = spec.name;
  return next;
}

export function WidgetEditPanel({
  widget,
  variables,
  onChange,
  onVariablesChange,
  fill = false,
}: WidgetEditPanelProps): React.ReactElement {
  // Inline variable creation from the chart editor's binding controls.
  const createVariable = onVariablesChange
    ? (decl: VariableDecl): void => onVariablesChange([...variables, decl])
    : undefined;

  return (
    <div data-slot="widget-edit-panel" className={cn("cv:flex cv:flex-col cv:gap-2", fill && "cv:h-full")}>
      {/* A title for charts; the field label for inputs. Text carries its own headings. */}
      {widget.type !== "text" ? (
        <FieldRow
          label="Title"
          hint={widget.type === "input" ? "Used as the field label." : "Shown in the widget header."}
        >
          <Input
            value={widget.title ?? ""}
            placeholder="Untitled"
            onChange={(e) =>
              onChange({ ...widget, title: e.target.value || undefined } as WidgetSpec)
            }
          />
        </FieldRow>
      ) : null}

      {widget.type === "chart" ? (
        // The chart's query may carry {var} tokens bound to dashboard variables.
        // Provide a variable store (seeded from the dashboard's decls) so the live
        // preview RESOLVES them — otherwise an unresolved {var:granularity} reaches
        // Cube and 400s ("granularity must be a string").
        <DashboardProvider spec={previewDashboard(variables)}>
          <VariableAdminProvider createVariable={createVariable}>
            <div className={cn(fill && "cv:min-h-0 cv:flex-1")}>
              <ChartEditor
                fill={fill}
                spec={widgetToChartSpec(widget)}
                onChange={(spec) => onChange(chartSpecToWidget(widget, spec))}
              />
            </div>
          </VariableAdminProvider>
        </DashboardProvider>
      ) : widget.type === "text" ? (
        <TextWidgetEditor widget={widget} onChange={onChange} />
      ) : (
        <InputWidgetEditor widget={widget} variables={variables} onChange={onChange} />
      )}
    </div>
  );
}
