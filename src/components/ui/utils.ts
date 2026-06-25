import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge configured for cube-viz's `cv` prefix.
 *
 * cube-viz ships its utilities `cv:`-prefixed (see src/styles/cube-viz.css) so
 * they can't collide with the aa-app host's unprefixed utilities in the shared
 * WebView. tailwind-merge must know the prefix or it can't tell that two padding
 * utilities (one prefixed `px-2`, another `px-4`) are the same conflicting group
 * — without this it would keep both and the last-wins dedup `cn()` relies on
 * would silently break. Requires tailwind-merge v3 (Tailwind v4 prefix support).
 */
const twMerge = extendTailwindMerge({ prefix: "cv" });

/** shadcn/ui class merge helper (cv-prefix aware). */
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
