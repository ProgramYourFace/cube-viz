import { describe, expect, it } from "vitest";

import { SCHEMA_VERSION, type DashboardSpec, type WidgetSpec } from "@/spec";

import { mergeRemote } from "./mergeRemote";

const chart = (id: string, title: string): WidgetSpec =>
  ({ id, type: "chart", title, query: { measures: ["m.count"] }, chart: { family: "bar" } }) as WidgetSpec;

const board = (name: string, widgets: WidgetSpec[]): DashboardSpec => ({
  schemaVersion: SCHEMA_VERSION,
  id: "d",
  kind: "dashboard",
  name,
  variables: [],
  widgets,
  layout: widgets.map((w, i) => ({ i: w.id, x: 0, y: i * 2, w: 4, h: 2 })),
});

describe("mergeRemote", () => {
  it("adopts the remote copy of unprotected widgets (last write wins)", () => {
    const local = board("Fleet", [chart("a", "A local"), chart("b", "B local")]);
    const remote = board("Fleet", [chart("a", "A remote"), chart("b", "B remote")]);
    const merged = mergeRemote(remote, local, new Set());
    expect(merged.widgets.map((w) => w.title)).toEqual(["A remote", "B remote"]);
  });

  it("keeps the LOCAL copy (widget + layout item) of a protected widget", () => {
    const local = board("Fleet", [chart("a", "A local"), chart("b", "B local")]);
    local.layout[0] = { ...local.layout[0], w: 8 };
    const remote = board("Fleet", [chart("a", "A remote"), chart("b", "B remote")]);
    const merged = mergeRemote(remote, local, new Set(["a"]));
    expect(merged.widgets.map((w) => w.title)).toEqual(["A local", "B remote"]);
    expect(merged.layout.find((l) => l.i === "a")?.w).toBe(8);
    // Identity preserved, so a memoised editor on that widget does not re-render.
    expect(merged.widgets[0]).toBe(local.widgets[0]);
  });

  it("preserves a protected local-only widget and lets remote deletes win otherwise", () => {
    const local = board("Fleet", [chart("a", "A"), chart("new", "just added"), chart("gone", "deleted remotely")]);
    const remote = board("Fleet", [chart("a", "A")]);
    const merged = mergeRemote(remote, local, new Set(["new"]));
    expect(merged.widgets.map((w) => w.id)).toEqual(["a", "new"]);
    expect(merged.layout.map((l) => l.i)).toEqual(["a", "new"]);
  });

  it("keeps protected top-level fields from local (the dashboard name being typed)", () => {
    const local = board("Fleet overview", [chart("a", "A")]);
    const remote = board("Fleet", [chart("a", "A")]);
    expect(mergeRemote(remote, local, new Set()).name).toBe("Fleet");
    expect(mergeRemote(remote, local, new Set(), new Set(["name"])).name).toBe("Fleet overview");
  });

  it("a protected field the local spec lacks is removed from the merge", () => {
    const local = board("x", [chart("a", "A")]);
    delete local.name;
    const remote = board("Fleet", [chart("a", "A")]);
    expect(mergeRemote(remote, local, new Set(), new Set(["name"])).name).toBeUndefined();
  });

  it("ignores widgets/layout in protectedFields (those are per item)", () => {
    const local = board("Fleet", [chart("a", "A local")]);
    const remote = board("Fleet", [chart("a", "A remote")]);
    const merged = mergeRemote(remote, local, new Set(), new Set(["widgets", "layout"]));
    expect(merged.widgets[0].title).toBe("A remote");
  });
});
