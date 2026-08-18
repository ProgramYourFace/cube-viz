import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { MemberOption } from "../../primitives/meta-helpers";
import type { WellDef } from "../builder/wells";
import {
  axisUnitBlockReason,
  candidateReason,
  isAvailable,
  ONLY_COMPATIBLE_KEY,
  onlyCompatibleStore,
  partitionByAvailability,
  readOnlyCompatible,
  writeOnlyCompatible,
} from "./picker-filter";

/**
 * The field picker's "Only compatible fields" switch: which rows it hides, and the
 * guarded preference behind it.
 *
 * What is asserted is the OWNER-FACING behavior: with a distance measure on the value
 * axis, litres and km/h measures are unavailable and get hidden, while a second
 * distance measure stays — and the hidden count is exactly what disappeared. The
 * unavailability sources (slot kind, axis unit, dataset scope) all funnel through
 * {@link candidateReason}, so the switch can never hide for one reason and keep for
 * another.
 */

/* ── the model: a value axis ("y") and a category axis ("x") ─────────────────── */

const Y_WELL: WellDef = {
  id: "y",
  label: "Values",
  cardinality: "many",
  kinds: ["number"],
  target: { kind: "measures" },
  channel: "y",
};

const X_WELL: WellDef = {
  id: "x",
  label: "Category",
  cardinality: "one",
  kinds: ["category", "time"],
  target: { kind: "category" },
  channel: "x",
};

function measure(name: string, label: string, meta: { unit?: string; quantity?: string } = {}): MemberOption {
  return {
    name,
    label,
    title: label,
    shortTitle: label,
    type: "number",
    memberType: "measure",
    cube: name.split(".")[0],
    ...meta,
  };
}

function dimension(name: string, label: string): MemberOption {
  return {
    name,
    label,
    title: label,
    shortTitle: label,
    type: "string",
    memberType: "dimension",
    cube: name.split(".")[0],
  };
}

const DISTANCE = measure("trips.total_distance", "Distance", { unit: "km", quantity: "distance" });
const DISTANCE_2 = measure("trips.max_trip_distance", "Longest trip", { unit: "km", quantity: "distance" });
const LITRES = measure("trips.fuel_used", "Fuel", { unit: "L", quantity: "volume" });
const SPEED = measure("trips.avg_speed", "Avg speed", { unit: "km/h", quantity: "speed" });
const PLAIN = measure("trips.count", "Trips");
const REGION = dimension("trips.region", "Region");

/** The overlay's axis-unit context: the axis currently shows `DISTANCE`. */
const distanceAxis = (o: MemberOption): string | undefined =>
  axisUnitBlockReason(o, "distance", "Distance (km)");

describe("axisUnitBlockReason", () => {
  it("takes anything while the axis is empty", () => {
    expect(axisUnitBlockReason(LITRES, undefined, undefined)).toBeUndefined();
  });

  it("keeps the same quantity and refuses every other one", () => {
    expect(distanceAxis(DISTANCE_2)).toBeUndefined();
    expect(distanceAxis(LITRES)).toContain("This axis shows Distance (km)");
    expect(distanceAxis(LITRES)).toContain("Fuel is Volume");
    expect(distanceAxis(SPEED)).toContain("Avg speed is Speed");
    // A unit-less measure is its own bucket ("number"), so it cannot join either.
    expect(distanceAxis(PLAIN)).toBeDefined();
  });
});

describe("candidateReason", () => {
  it("is undefined for a field the slot takes with no context block", () => {
    expect(candidateReason(Y_WELL, "number", [], DISTANCE)).toBeUndefined();
  });

  it("reports the SLOT rule for the wrong kind of field", () => {
    expect(candidateReason(Y_WELL, "category", [], REGION)).toBe(
      "Values needs a number (a total, average or count)",
    );
    expect(candidateReason(X_WELL, "number", [], DISTANCE)).toBe(
      "Category needs a date or category",
    );
  });

  it("names the FIELD's nature when that points at the fix better", () => {
    // A per-record number offered where an aggregate belongs: say what to pick instead.
    const perTrip: MemberOption = {
      ...DISTANCE,
      name: "trips.distance",
      label: "Distance (per trip)",
      memberType: "dimension",
    };
    expect(candidateReason(Y_WELL, "numberDimension", [], perTrip)).toBe(
      "One value per record — pick its total or average instead",
    );
    // A yes/no field is never a number to plot; name its real uses.
    const flag: MemberOption = { ...REGION, name: "trips.has_fuel_data", label: "Has fuel data", type: "boolean" };
    expect(candidateReason(Y_WELL, "category", [], flag)).toBe(
      "Yes/no field — use it as a filter or in Split by",
    );
    // The refinement is for numeric slots only — a category slot keeps the slot rule.
    expect(candidateReason(X_WELL, "number", [], DISTANCE)).toBe(
      "Category needs a date or category",
    );
  });

  it("lets the slot rule win over a context block (it names the fix)", () => {
    const reason = candidateReason(Y_WELL, "category", [], REGION, () => "Clear the current fields…");
    expect(reason).toBe("Values needs a number (a total, average or count)");
  });

  it("falls through to the context block (axis unit) for an accepted kind", () => {
    expect(candidateReason(Y_WELL, "number", ["trips.total_distance"], LITRES, distanceAxis)).toContain(
      "This axis shows Distance (km)",
    );
  });

  it("reports a dataset / measure-source block from the context", () => {
    const crossDataset = (o: MemberOption): string | undefined =>
      o.cube === "trips" ? undefined : "Clear the current fields to use a different dataset.";
    const other = measure("orders.revenue", "Revenue", { quantity: "currency" });
    expect(candidateReason(Y_WELL, "number", [], other, crossDataset)).toBe(
      "Clear the current fields to use a different dataset.",
    );
    expect(candidateReason(Y_WELL, "number", [], PLAIN, crossDataset)).toBeUndefined();
  });
});

describe("the hidden set (what the switch removes)", () => {
  /** Every candidate the picker would list for a slot, tagged with its reason. */
  const candidatesFor = (
    well: WellDef,
    inWell: string[],
    context?: (o: MemberOption) => string | undefined,
  ) =>
    (
      [
        [DISTANCE_2, "number"],
        [LITRES, "number"],
        [SPEED, "number"],
        [PLAIN, "number"],
        [REGION, "category"],
      ] as const
    ).map(([option, kind]) => ({
      option,
      kind,
      reason: candidateReason(well, kind, inWell, option, context),
    }));

  it("hides litres and km/h once a DISTANCE measure holds the value axis", () => {
    const items = candidatesFor(Y_WELL, ["trips.total_distance"], distanceAxis);
    const { available, unavailable } = partitionByAvailability(items);

    expect(available.map((c) => c.option.label)).toEqual(["Longest trip"]);
    expect(unavailable.map((c) => c.option.label)).toEqual(["Fuel", "Avg speed", "Trips", "Region"]);
    // The count the header must show next to the switch.
    expect(unavailable.length).toBe(4);
  });

  it("hides nothing on an EMPTY value axis except the wrong kinds", () => {
    const items = candidatesFor(Y_WELL, [], () => undefined);
    const { available, unavailable } = partitionByAvailability(items);

    expect(available.map((c) => c.option.label)).toEqual(["Longest trip", "Fuel", "Avg speed", "Trips"]);
    expect(unavailable.map((c) => c.option.label)).toEqual(["Region"]);
  });

  it("hides the measures on a category slot (kind mismatch)", () => {
    const items = candidatesFor(X_WELL, [], () => undefined);
    const { available, unavailable } = partitionByAvailability(items);

    expect(available.map((c) => c.option.label)).toEqual(["Region"]);
    expect(unavailable).toHaveLength(4);
    expect(unavailable.every((c) => c.reason === "Category needs a date or category")).toBe(true);
  });

  it("partitions purely on the presence of a reason", () => {
    expect(isAvailable({ reason: undefined })).toBe(true);
    expect(isAvailable({ reason: "nope" })).toBe(false);
    expect(partitionByAvailability([])).toEqual({ available: [], unavailable: [] });
  });
});

/* ── the persisted preference + its SSR / WebView guard ──────────────────────── */

interface FakeStorage {
  store: Map<string, string>;
  getItem: (k: string) => string | null;
  setItem: (k: string, v: string) => void;
  removeItem: (k: string) => void;
}

function fakeStorage(): FakeStorage {
  const store = new Map<string, string>();
  return {
    store,
    getItem: (k) => store.get(k) ?? null,
    setItem: (k, v) => void store.set(k, v),
    removeItem: (k) => void store.delete(k),
  };
}

/** Install a `localStorage` (or a throwing accessor) on globalThis for one test. */
function install(value: unknown, { throwOnAccess = false } = {}): void {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get() {
      if (throwOnAccess) throw new DOMException("access denied", "SecurityError");
      return value;
    },
  });
}

describe("the persisted 'only compatible' choice", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");

  afterEach(() => {
    if (original) Object.defineProperty(globalThis, "localStorage", original);
    else delete (globalThis as { localStorage?: unknown }).localStorage;
  });

  it("defaults to ON (lead with what fits — showing everything is the opt-out)", () => {
    install(fakeStorage());
    expect(readOnlyCompatible()).toBe(true);
  });

  it("round-trips through storage under a cube-viz-namespaced key", () => {
    const s = fakeStorage();
    install(s);
    writeOnlyCompatible(true);
    expect(s.store.get(ONLY_COMPATIBLE_KEY)).toBe("1");
    expect(ONLY_COMPATIBLE_KEY.startsWith("cube-viz:")).toBe(true);
    expect(readOnlyCompatible()).toBe(true);

    // OFF is stored explicitly ("0"), never as an absent key — an absent key is the
    // default, and a later default flip must not move users who made a choice.
    writeOnlyCompatible(false);
    expect(s.store.get(ONLY_COMPATIBLE_KEY)).toBe("0");
    expect(readOnlyCompatible()).toBe(false);
  });

  it("honours the legacy persisted '1' (users who opted in before the default flipped)", () => {
    const s = fakeStorage();
    s.store.set(ONLY_COMPATIBLE_KEY, "1");
    install(s);
    expect(readOnlyCompatible()).toBe(true);
  });

  describe("guards", () => {
    it("survives NO storage at all (SSR)", () => {
      delete (globalThis as { localStorage?: unknown }).localStorage;
      expect(readOnlyCompatible()).toBe(true); // the default, not an error state
      expect(() => writeOnlyCompatible(true)).not.toThrow();
    });

    it("survives a storage PROPERTY that throws (hardened WebView / blocked cookies)", () => {
      install(undefined, { throwOnAccess: true });
      expect(readOnlyCompatible()).toBe(true); // the default, not an error state
      expect(() => writeOnlyCompatible(true)).not.toThrow();
    });

    it("survives a throwing getItem/setItem (quota exceeded, private mode)", () => {
      install({
        getItem: () => {
          throw new DOMException("nope", "SecurityError");
        },
        setItem: () => {
          throw new DOMException("quota", "QuotaExceededError");
        },
        removeItem: () => {
          throw new DOMException("quota", "QuotaExceededError");
        },
      });
      expect(readOnlyCompatible()).toBe(true); // the default, not an error state
      expect(() => writeOnlyCompatible(true)).not.toThrow();
      expect(() => writeOnlyCompatible(false)).not.toThrow();
    });
  });
});

/* ── the SHARED switch: one choice, every open picker ────────────────────────── */

/**
 * The regression this exists for: the switch used to be `useState` inside each
 * `FieldPickerPopover`, seeded from storage at MOUNT. The editor mounts one picker per
 * well up front, so flipping the switch in one slot re-rendered only that slot — every
 * other picker kept its stale value and went on listing rows it had promised to hide
 * ("Values needs a number…" on the Values slot, with its own toggle reading OFF).
 *
 * A subscriber standing in for a second mounted picker is therefore the whole test: it
 * must see the same value, and it must be TOLD when the value changes.
 */
describe("the shared 'only compatible' store", () => {
  // The store's snapshot is read once at module load (now defaulting ON); these
  // tests assert the SHARING behaviour, so they start from an explicit OFF.
  beforeEach(() => {
    onlyCompatibleStore.set(false);
  });

  /** Two mounted pickers, each re-reading the store when notified. */
  function mountedPickers(n: number): { seen: () => boolean[]; stop: () => void } {
    const values = Array.from({ length: n }, () => onlyCompatibleStore.get());
    const stops = values.map((_, i) =>
      onlyCompatibleStore.subscribe(() => {
        values[i] = onlyCompatibleStore.get();
      }),
    );
    return { seen: () => [...values], stop: () => stops.forEach((s) => s()) };
  }

  afterEach(() => {
    onlyCompatibleStore.set(false);
  });

  it("hands every picker the SAME answer", () => {
    const pickers = mountedPickers(3);
    expect(pickers.seen()).toEqual([false, false, false]);

    onlyCompatibleStore.set(true);
    expect(onlyCompatibleStore.get()).toBe(true);
    // The slot the user flipped it in is not the only one that heard about it.
    expect(pickers.seen()).toEqual([true, true, true]);

    onlyCompatibleStore.set(false);
    expect(pickers.seen()).toEqual([false, false, false]);
    pickers.stop();
  });

  it("notifies once per real change (an idempotent set is silent)", () => {
    let notified = 0;
    const stop = onlyCompatibleStore.subscribe(() => {
      notified += 1;
    });
    onlyCompatibleStore.set(true);
    onlyCompatibleStore.set(true);
    expect(notified).toBe(1);
    stop();
  });

  it("stops notifying an unmounted picker", () => {
    let notified = 0;
    const stop = onlyCompatibleStore.subscribe(() => {
      notified += 1;
    });
    stop();
    onlyCompatibleStore.set(true);
    expect(notified).toBe(0);
  });

  it("keeps working when storage cannot persist (hardened WebView)", () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("access denied", "SecurityError");
      },
    });
    try {
      const pickers = mountedPickers(2);
      onlyCompatibleStore.set(true);
      // It cannot survive a reload here, but it must still be ONE live choice.
      expect(onlyCompatibleStore.get()).toBe(true);
      expect(pickers.seen()).toEqual([true, true]);
      pickers.stop();
    } finally {
      if (original) Object.defineProperty(globalThis, "localStorage", original);
      else delete (globalThis as { localStorage?: unknown }).localStorage;
    }
  });

  it("renders nothing hidden on the server (the client adopts the choice)", () => {
    onlyCompatibleStore.set(true);
    expect(onlyCompatibleStore.getServer()).toBe(false);
  });
});

/* The switch state must never change what CAN be placed — it is a view filter. */
describe("the switch is presentation only", () => {
  it("does not alter any candidate's reason", () => {
    const before = candidateReason(Y_WELL, "number", ["trips.total_distance"], LITRES, distanceAxis);
    writeOnlyCompatible(true);
    const after = candidateReason(Y_WELL, "number", ["trips.total_distance"], LITRES, distanceAxis);
    expect(after).toBe(before);
  });

  beforeEach(() => {
    delete (globalThis as { localStorage?: unknown }).localStorage;
  });
});
