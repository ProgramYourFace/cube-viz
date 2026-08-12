import type * as React from "react";

/**
 * Chart config: the series-key → { label, color } map handed to every chart
 * family (ChartComponentProps.config). It survives the Recharts→TanStack
 * migration as the family-facing color/label contract — host-extension
 * families (e.g. aa-app's map) read it — but the Recharts wrapper components
 * that used to live here (ChartContainer/Tooltip/Legend + the ChartStyle
 * `--color-<key>` injector) are gone: the TanStack seam (src/charts/tanstack.tsx)
 * passes palette tokens straight to mark paints and the built-in legend/tooltip.
 */
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  );
};
