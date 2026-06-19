// Static analysis of bar chart spec/renderer mismatch

const issues = [];

// Issue 1: line.tsx dots handling
issues.push({
  title: "Line chart 'Show points' UI sets boolean but default is 'active' enum",
  severity: "p1",
  where: "src/editor/chart/builder/CustomizeSection.tsx:89-90 vs src/charts/defaults.ts:249 vs src/charts/line.tsx:64",
  symptom: "Default line chart never shows dots because defaults.ts sets dots: 'active', but the renderer line.tsx:64 checks fo.dots === true (strict equality), not fo.dots === 'active' or truthy. The UI toggle only sets true/false.",
  fix: "Either: (a) Change line.tsx line 64 to check fo.dots !== false (making 'active' truthy), OR (b) change defaults.ts line 249 to dots: true, OR (c) change CustomizeSection to handle the 'active' enum value.",
  repro: "Create a line chart with default options. No dots appear initially despite dots: 'active' in defaults. Toggle 'Show points' ON and OFF; dots only appear when explicitly true.",
});

// Issue 2: area.tsx has dots but no UI toggle
issues.push({
  title: "Area chart has dots familyOption but no CustomizeSection UI toggle",
  severity: "p2",
  where: "src/charts/defaults.ts (no dots in area), src/charts/area.tsx:115, src/editor/chart/builder/CustomizeSection.tsx:95-105",
  symptom: "Area chart renderer supports fo.dots (line 115 of area.tsx: dot={fo.dots ?? false}), but CustomizeSection has no 'Show points' toggle for area. Users cannot control dots without manual spec editing.",
  fix: "Add a 'Show points' toggle to CustomizeSection's area case (similar to line chart case).",
  repro: "Create an area chart. Try to enable dots via the UI—no toggle exists. Manually edit spec to set familyOptions.dots: true to confirm it works.",
});

// Issue 3: bar chart showValueLabels not exposed in UI
issues.push({
  title: "Bar chart showValueLabels option not editable in CustomizeSection",
  severity: "p2",
  where: "src/charts/defaults.ts:237, src/charts/bar.tsx:135, src/editor/chart/builder/CustomizeSection.tsx:68-77",
  symptom: "Bar chart defaults to showValueLabels: false and the renderer respects it (line 135), but CustomizeSection has no toggle to turn it on. Users must manually edit the spec.",
  fix: "Add a 'Show value labels' toggle to CustomizeSection's bar case.",
  repro: "Create a bar chart. Try to enable value labels via the UI—no toggle exists. Manually set spec familyOptions.showValueLabels: true to confirm it renders.",
});

// Issue 4: line chart has showValueLabels support but no UI
issues.push({
  title: "Line chart showValueLabels option not editable in CustomizeSection",
  severity: "p2",
  where: "src/charts/line.tsx:136, src/editor/chart/builder/CustomizeSection.tsx:79-93",
  symptom: "Line chart renderer checks fo.showValueLabels (line 136) but CustomizeSection has no toggle for it. Users cannot enable value labels via UI.",
  fix: "Add a 'Show value labels' toggle to CustomizeSection's line case.",
  repro: "Create a line chart. Try to enable value labels via the UI—no toggle exists.",
});

// Issue 5: FieldPill JSX structure issue
issues.push({
  title: "FieldPill.tsx has malformed ternary JSX (missing closing paren alignment)",
  severity: "polish",
  where: "src/editor/chart/onchart/FieldPill.tsx:97-102",
  symptom: "Line 101 has `): (` with the opening paren on a new line indented strangely. While valid JS, it's poor formatting and makes the conditional flow harder to read.",
  fix: "Align the paren structure for clarity: `): (<` or move to same line as ternary for readability.",
  repro: "Visual inspection of the ternary structure in FieldPill at lines 97-102.",
});

// Issue 6: bar chart uses corner radius wrong in vertical mode
const barCornerLogic = "const r = radius ?? 0; return horizontal ? [0, r, r, 0] : [r, r, 0, 0];";
issues.push({
  title: "Bar chart cornerRadius may be inverted for horizontal layout",
  severity: "p2",
  where: "src/charts/_shared.ts:60-68 (cornerRadius function) and src/charts/bar.tsx:132",
  symptom: "The cornerRadius helper at line 66 says 'vertical: round top corners; horizontal (layout=vertical): round right corners'. But in bar.tsx line 73, layout is set based on orientation OPPOSITE: layout={horizontal ? 'vertical' : 'horizontal'}. This means when bar.tsx passes horizontal=true, Recharts layout='vertical' and the radii [0, r, r, 0] round right, which is correct. However, the mapping is counterintuitive.",
  fix: "Add a comment clarifying that cornerRadius receives a 'horizontal' boolean matching bar orientation, not Recharts layout direction. Or restructure to pass layout direction directly to avoid confusion.",
  repro: "Create a horizontal bar chart and a vertical bar chart. Inspect corner rounding visually; it should be correct but the logic is confusing.",
});

console.log("=== BAR CHART EDIT AUDIT ===\n");
issues.forEach((issue, i) => {
  console.log(`${i + 1}. [${issue.severity.toUpperCase()}] ${issue.title}`);
  console.log(`   Where: ${issue.where}`);
  console.log(`   Symptom: ${issue.symptom}`);
  console.log(`   Fix: ${issue.fix}`);
  console.log(`   Repro: ${issue.repro}`);
  console.log();
});

console.log(`Total findings: ${issues.length}`);
