import * as React from "react";

/** The debounced function, plus `cancel()` to drop whatever is pending. */
export type DebouncedCallback<A extends unknown[]> = ((...args: A) => void) & {
  /** Drop the pending invocation (nothing fires). For a hard re-seed that supersedes it. */
  cancel: () => void;
};

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
): DebouncedCallback<A> {
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

  const debounced = React.useCallback(
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

  const cancel = React.useCallback(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;
    pendingArgsRef.current = null;
  }, []);

  return React.useMemo(() => Object.assign(debounced, { cancel }), [debounced, cancel]);
}
