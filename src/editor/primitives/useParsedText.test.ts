import { describe, expect, it } from "vitest";

import { joinValues, splitValues } from "../chart/FilterBuilder";
import { shouldResyncText } from "./useParsedText";

// The hook's one decision: does upstream's canonical text supersede what is typed?
// `normalize` is format∘parse — what the current text MEANS, rendered canonically.
const listNormalize = (t: string): string => joinValues(splitValues(t));

describe("shouldResyncText — comma-separated lists", () => {
  it("keeps the trailing comma while a second value is being typed", () => {
    // Typed "a," → emitted ["a"] → upstream text "a". The text already says "a".
    expect(shouldResyncText("a,", "a", listNormalize)).toBe(false);
    expect(shouldResyncText("a, ", "a", listNormalize)).toBe(false);
  });

  it("keeps un-normalised spacing the user typed", () => {
    expect(shouldResyncText("a,b", "a, b", listNormalize)).toBe(false);
    expect(shouldResyncText("a ,  b", "a, b", listNormalize)).toBe(false);
  });

  it("keeps an emptied field empty (upstream [] ⇒ '')", () => {
    expect(shouldResyncText("", "", listNormalize)).toBe(false);
    expect(shouldResyncText(" ", "", listNormalize)).toBe(false);
  });

  it("adopts a genuine upstream change (undo / remote merge / re-seed)", () => {
    expect(shouldResyncText("a, b", "x", listNormalize)).toBe(true);
    expect(shouldResyncText("a,", "a, b, c", listNormalize)).toBe(true);
    expect(shouldResyncText("", "a", listNormalize)).toBe(true);
  });
});

describe("shouldResyncText — clamped numbers", () => {
  // The rolling-window field: parse clamps to [2, 90], blank → default 7.
  const parse = (t: string): number => {
    const n = parseInt(t, 10);
    return Number.isFinite(n) ? Math.min(90, Math.max(2, n)) : 7;
  };
  const numNormalize = (t: string): string => String(parse(t));

  it("lets '1' stand on the way to '15' although the emitted value clamped to 2", () => {
    expect(shouldResyncText("1", "2", numNormalize)).toBe(false);
  });

  it("lets the field be cleared although the emitted value fell back to the default", () => {
    expect(shouldResyncText("", "7", numNormalize)).toBe(false);
  });

  it("adopts an external value", () => {
    expect(shouldResyncText("15", "30", numNormalize)).toBe(true);
  });
});

describe("splitValues / joinValues", () => {
  it("round-trips a canonical list and tolerates every intermediate string", () => {
    expect(splitValues("a, b")).toEqual(["a", "b"]);
    expect(joinValues(["a", "b"])).toBe("a, b");
    expect(splitValues("a,")).toEqual(["a"]);
    expect(splitValues(",")).toEqual([]);
    expect(splitValues("")).toEqual([]);
  });
});
