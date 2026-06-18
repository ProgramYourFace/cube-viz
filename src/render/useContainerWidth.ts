import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Measure the **container** width of the attached element via `ResizeObserver`
 * (docs/01-spec-schema.md §4, docs/03-override-theme-preview.md A3.2). This is the
 * single primitive that makes cube-viz responsive *without breakpoints*: the
 * dashboard reflows to its container, not the viewport, so the same bytes lay out
 * correctly in a desktop panel, a resizable editor pane, and a mobile WebView.
 *
 * The returned width is debounced to the next animation frame so a burst of
 * `ResizeObserver` callbacks (e.g. during a drag/resize, or a panel opening)
 * collapses into a single React re-render per frame. The hook is SSR-safe: it
 * reports `0` until the element is attached and first measured, and consumers
 * (RGL `Responsive`) treat a `0` width as "don't render yet".
 *
 * @returns `[ref, width]` — attach `ref` to the element to measure; `width` is its
 *          current content-box width in CSS pixels.
 */
export function useContainerWidth<T extends HTMLElement = HTMLDivElement>(): [
  React.RefCallback<T>,
  number,
] {
  const [width, setWidth] = useState(0);

  // Hold the live element + observer + pending rAF across renders.
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const frameRef = useRef<number | null>(null);
  // Last width we committed to state — avoids redundant setState (and re-renders).
  const lastWidthRef = useRef(0);

  // Debounced commit: coalesce a burst of observer callbacks into one rAF.
  const commit = useCallback((next: number) => {
    if (frameRef.current !== null) return; // already scheduled this frame
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      if (next !== lastWidthRef.current) {
        lastWidthRef.current = next;
        setWidth(next);
      }
    });
  }, []);

  // Tear down any active observer + pending frame.
  const teardown = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  // Ref callback: (re)attach the observer whenever the measured node changes.
  const ref = useCallback<React.RefCallback<T>>(
    (node) => {
      teardown();
      elementRef.current = node;
      if (!node || typeof ResizeObserver === "undefined") return;

      // Seed synchronously so the first paint has a width when possible.
      const initial = node.getBoundingClientRect().width;
      if (initial > 0 && initial !== lastWidthRef.current) {
        lastWidthRef.current = initial;
        setWidth(initial);
      }

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Prefer the precise content-box; fall back to the bounding rect.
          const boxWidth =
            entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
          commit(boxWidth);
        }
      });
      observer.observe(node);
      observerRef.current = observer;
    },
    [commit, teardown],
  );

  // Final cleanup on unmount (the ref callback handles re-attach churn).
  useEffect(() => teardown, [teardown]);

  return [ref, width];
}
