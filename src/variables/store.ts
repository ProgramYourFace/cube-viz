import type { VariableDecl, VariableValue } from "@/spec";

/**
 * A tiny, framework-free reactive variable store — the runtime home of a
 * dashboard's variable values (the spec only declares names + defaults).
 * See docs/01-spec-schema.md §5.
 *
 * Deliberately dependency-free: a React adapter (useSyncExternalStore) can wrap
 * `subscribe`/`getAll` without this module importing React.
 */

export interface VariableStore {
  /** Current value of one variable (store value, else decl default, else undefined). */
  get(name: string): VariableValue | undefined;
  /** A snapshot of every variable's current value. Stable identity until the next `set`. */
  getAll(): Record<string, VariableValue>;
  /** Write a variable (leg 1). `undefined` clears it back toward its default/unset. */
  set(name: string, value: VariableValue | undefined): void;
  /** Subscribe to any change; returns an unsubscribe fn. */
  subscribe(cb: () => void): () => void;
}

/**
 * Create a reactive store seeded from each decl's `default`, then overlaid with
 * any `seed` overrides. Only declared variables are tracked; a `set` to an unknown
 * name is still stored (so an Input bound to a not-yet-declared var degrades
 * gracefully), but only declared defaults seed the initial snapshot.
 */
export function createVariableStore(
  decls: VariableDecl[],
  seed?: Record<string, VariableValue>,
): VariableStore {
  let values: Record<string, VariableValue> = {};

  // 1. seed from decl defaults
  for (const d of decls) {
    if (d.default !== undefined) values[d.name] = d.default;
  }
  // 2. overlay explicit seeds (skipping undefined, which means "leave default")
  if (seed) {
    for (const key of Object.keys(seed)) {
      const v = seed[key];
      if (v !== undefined) values[key] = v;
    }
  }

  const subscribers = new Set<() => void>();

  const emit = (): void => {
    for (const cb of subscribers) cb();
  };

  return {
    get(name) {
      return values[name];
    },

    getAll() {
      return values;
    },

    set(name, value) {
      if (value === undefined) {
        if (!Object.prototype.hasOwnProperty.call(values, name)) return; // no-op
        const next = { ...values };
        delete next[name];
        values = next;
      } else {
        if (values[name] === value) return; // referential no-op; skip churn
        values = { ...values, [name]: value };
      }
      emit();
    },

    subscribe(cb) {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
  };
}
