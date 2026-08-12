import { clsx, type ClassValue } from "clsx";

/**
 * Class combiner. cube-viz no longer ships Tailwind utilities, so the old
 * cv-prefix-aware tailwind-merge dedup is gone — classes are semantic
 * (`cv-*`) and there is nothing to conflict-merge. Kept as the shared helper
 * so call sites and host-extension families don't churn.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Build a CSS-safe custom-property name for a series color. Series keys are Cube
 * member names like `device_trips.count` (dots) or category labels like `Item 10`
 * (spaces) — both invalid in a CSS custom-property identifier. Retained for
 * host-extension families that still emit per-series custom properties.
 */
export function colorVarName(key: string): string {
  return `--color-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
