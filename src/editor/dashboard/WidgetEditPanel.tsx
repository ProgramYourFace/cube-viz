import * as React from "react";

import {
  SCHEMA_VERSION,
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
import { chartSpecToWidget, widgetToChartSpec } from "./widgetSpecAdapter";

/**
 * The per-widget edit panel hosted in the dashboard editor's full-screen widget
 * editor (docs/03 §A3.2 "Select-to-edit"). Dispatches by widget type:
 *  - chart → the sibling {@link ChartEditor} (a ChartSpec-in/out editor; we adapt
 *    the `ChartWidget` ↔ `ChartSpec` at the seam so the chart editor stays unaware
 *    of the dashboard envelope — see widgetSpecAdapter.ts)
 *  - text  → the editable TipTap {@link TextWidgetEditor}
 *  - input → the {@link InputWidgetEditor} (variable + kind + kind options)
 *
 * Plus a shared title field for every widget. The panel is pure: it emits the next
 * `WidgetSpec` upward; the editor merges it into the spec.
 *
 * Memoised: the dashboard editor re-renders on every host re-render (a DOM-component
 * host re-marshals its props on each native render), and none of that should reach the
 * chart editor + its live preview unless the widget, variables or callbacks changed.
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

export const WidgetEditPanel = React.memo(function WidgetEditPanel({
  widget,
  variables,
  onChange,
  onVariablesChange,
  fill = false,
}: WidgetEditPanelProps): React.ReactElement {
  // The FieldRow caption is a real `<label htmlFor>` over this id, so the title field
  // has an accessible name (a caption rendered as a sibling label names nothing).
  const titleId = React.useId();
  // Inline variable creation from the chart editor's binding controls.
  const createVariable = onVariablesChange
    ? (decl: VariableDecl): void => onVariablesChange([...variables, decl])
    : undefined;
  // The chart editor's `spec` is a controlled input keyed by content, but keep its
  // identity stable across renders anyway: a fresh object per render is needless churn
  // through its re-seed check on every keystroke.
  const chartSpec = React.useMemo(
    () => (widget.type === "chart" ? widgetToChartSpec(widget) : null),
    [widget],
  );
  const preview = React.useMemo(() => previewDashboard(variables), [variables]);

  return (
    <div data-slot="widget-edit-panel" className={cn("cv-widget-panel", fill && "cv-widget-panel--fill")}>
      {/* A title for charts; the field label for inputs. Text carries its own headings. */}
      {widget.type !== "text" ? (
        <FieldRow
          label="Title"
          htmlFor={titleId}
          hint={widget.type === "input" ? "Used as the field label." : "Shown in the widget header."}
        >
          <Input
            id={titleId}
            value={widget.title ?? ""}
            placeholder="Untitled"
            onChange={(e) =>
              onChange({ ...widget, title: e.target.value || undefined } as WidgetSpec)
            }
          />
        </FieldRow>
      ) : null}

      {widget.type === "chart" && chartSpec ? (
        // The chart's query may carry {var} tokens bound to dashboard variables.
        // Provide a variable store (seeded from the dashboard's decls) so the live
        // preview RESOLVES them — otherwise an unresolved {var:granularity} reaches
        // Cube and 400s ("granularity must be a string").
        <DashboardProvider spec={preview}>
          <VariableAdminProvider createVariable={createVariable}>
            <div className={cn(fill && "cv-widget-panel-chart-fill")}>
              <ChartEditor
                fill={fill}
                spec={chartSpec}
                onChange={(spec) => onChange(chartSpecToWidget(widget, spec))}
              />
            </div>
          </VariableAdminProvider>
        </DashboardProvider>
      ) : widget.type === "text" ? (
        <TextWidgetEditor widget={widget} onChange={onChange} />
      ) : widget.type === "input" ? (
        <InputWidgetEditor widget={widget} variables={variables} onChange={onChange} />
      ) : null}
    </div>
  );
});
