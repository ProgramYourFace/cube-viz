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
  React.useEffect(
    () => () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    },
    [],
  );

  return React.useCallback(
    (...args: A) => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        fnRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
