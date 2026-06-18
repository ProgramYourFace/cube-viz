import { useContainerWidth } from "@/render/useContainerWidth";

/**
 * The narrow/wide threshold (CSS px of the *container*, not the viewport). At or
 * below this, editor primitives switch to a stacked, full-width layout (no native
 * sheet); above it, they use side-by-side panes. Chosen so a two-pane editor
 * (≈360px config + a usable preview) only engages once there's room for both.
 */
export const NARROW_BREAKPOINT = 720;

export interface ContainerBreakpoint<T extends HTMLElement = HTMLDivElement> {
  /** Attach to the element whose width drives the layout. */
  ref: React.RefCallback<T>;
  /** Current content-box width in CSS px (0 until first measured). */
  width: number;
  /** `true` when `width > 0 && width < NARROW_BREAKPOINT` — i.e. use stacked layout. */
  narrow: boolean;
}

/**
 * Container-width breakpoint hook — the single source of "narrow vs wide" for the
 * editor UI. Wraps {@link useContainerWidth} (ResizeObserver, rAF-debounced) so
 * the same web bytes lay out correctly in a desktop pane AND a mobile WebView,
 * driven by the element's own width rather than the viewport.
 *
 * `narrow` stays `false` while `width === 0` (not yet measured) so the wide
 * layout — which holds a live preview — is the SSR/first-paint default and we
 * don't flash the stacked layout before measurement.
 *
 * @param breakpoint override the {@link NARROW_BREAKPOINT} threshold.
 */
export function useContainerBreakpoint<T extends HTMLElement = HTMLDivElement>(
  breakpoint: number = NARROW_BREAKPOINT,
): ContainerBreakpoint<T> {
  const [ref, width] = useContainerWidth<T>();
  const narrow = width > 0 && width < breakpoint;
  return { ref, width, narrow };
}
