import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui class merge helper. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Build a CSS-safe custom-property name for a series color. Series keys are Cube
 * member names like `device_trips.count` (dots) or category labels like `Item 10`
 * (spaces) — both invalid in a CSS custom-property identifier, which silently
 * breaks `var(--color-<key>)` (fill→black, stroke→none). Sanitizing identically
 * on both the emit side (ChartStyle) and the reference side (family fill/stroke)
 * keeps them valid AND matched.
 */
export function colorVarName(key: string): string {
  return `--color-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
