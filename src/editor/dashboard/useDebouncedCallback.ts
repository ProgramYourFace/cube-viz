import * as React from "react";

/**
 * Debounce a callback by `delay` ms, keeping the latest callback identity without
 * resetting the timer (a ref holds the current fn). Cleans the pending timer up on
 * unmount so a late `onChange` never fires after the editor is gone.
 *
 * Used to debounce the editor's `onChange` so keystroke-level edits don't flood the
 * host while still emitting JSON-out on every change (eventually-consistent).
 */
export function useDebouncedCallback<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  const fnRef = React.useRef(fn);
  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  // Hold the latest pending args so the unmount cleanup can FLUSH them. Without this,
  // an edit made within `delay` ms of the editor closing (tapping "Done") is silently
  // discarded — the pending timer is cleared and its final onChange never fires.
  const pendingArgsRef = React.useRef<A | null>(null);
  React.useEffect(
    () => () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        if (pendingArgsRef.current !== null) {
          fnRef.current(...pendingArgsRef.current);
          pendingArgsRef.current = null;
        }
      }
    },
    [],
  );

  return React.useCallback(
    (...args: A) => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      pendingArgsRef.current = args;
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        pendingArgsRef.current = null;
        fnRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
