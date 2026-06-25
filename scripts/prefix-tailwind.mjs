#!/usr/bin/env node
/**
 * Deterministic codemod: prefix cube-viz's Tailwind utility classes with `cv:`.
 *
 * WHY: cube-viz ships a self-contained, `cv`-prefixed Tailwind sheet
 * (src/styles/cube-viz.css, `@import "tailwindcss" prefix(cv)`) so its utilities
 * never collide with the aa-app host's unprefixed utilities in the shared
 * WebView. For that sheet to actually contain the classes the components use,
 * every authored utility token must carry the `cv:` prefix. This script rewrites
 * the source to do that.
 *
 * SCOPE: only string literals in CLASS contexts are touched —
 *   - JSX  className="..."  and  className={"..."}
 *   - cn(...) / cx(...) / clsx(...) / twMerge(...) call arguments
 *   - cva("base", { variants: { k: { v: "..." } } }) base + variant strings
 *   - conditional class strings  cond ? "a b" : "c d"  (both arms, when the
 *     surrounding context is already a class context)
 * String literals everywhere else are left alone.
 *
 * TOKEN RULES (per whitespace-separated token inside a class string):
 *   - prefix-first, ONCE, in front of the whole variant chain:
 *       hover:bg-accent            -> cv:hover:bg-accent
 *       data-[state=open]:bg-x     -> cv:data-[state=open]:bg-x
 *       [&_svg]:size-4             -> cv:[&_svg]:size-4
 *       has-[[data-slot=x]]:grid-cols-[1fr_auto] -> cv:has-[[data-slot=x]]:grid-cols-[1fr_auto]
 *   - idempotent: a token already starting `cv:` is left as-is (no `cv:cv:`).
 *   - DENYLIST (never prefixed): react-grid-*, react-resizable-*, recharts-*,
 *     cube-viz-* (prose/light/root/drag-handle + any other semantic cube-viz
 *     class), the bare `dark`/`group`/`peer` marker classes, `contents` is a
 *     real utility so it IS prefixed — but `dark` (theme selector marker, added
 *     by the provider and targeted by tokens.css `.dark`) is NOT.
 *   - empty tokens / `{...}` interpolation fragments are passed through.
 *
 * Run:  node scripts/prefix-tailwind.mjs <glob-or-path> [...more]
 *       node scripts/prefix-tailwind.mjs --dry <path>   (print, don't write)
 * Defaults to all of src/ when no path is given.
 */

import { readFileSync, writeFileSync, statSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";

const PREFIX = "cv:";

/* ── denylist ──────────────────────────────────────────────────────────────
 * Tokens (or token *prefixes*) that are NOT Tailwind utilities and must never
 * be `cv:`-prefixed. These are component/library/semantic class names. */
const DENY_EXACT = new Set([
  // theme + behaviour marker classes (selectors, not utilities)
  "dark",
  "group",
  "peer",
  // semantic cube-viz classes (targeted by tokens.css / richtext.css / JS)
  "cube-viz-prose",
  "cube-viz-light",
  "cube-viz-root",
  "cube-viz-drag-handle",
]);
const DENY_PREFIXES = [
  "react-grid-",
  "react-resizable-",
  "recharts-",
  "cube-viz-", // any other semantic cube-viz-* class
  "group/", // named group markers: group/foo
  "peer/",
];

function isDenied(token) {
  if (DENY_EXACT.has(token)) return true;
  for (const p of DENY_PREFIXES) if (token.startsWith(p)) return true;
  return false;
}

/* A token already carrying the prefix (idempotency). Because the prefix is
 * variant-leading, an already-prefixed token literally starts with `cv:`. */
function isAlreadyPrefixed(token) {
  return token.startsWith(PREFIX);
}

/* ── per-token prefixer ──────────────────────────────────────────────────── */
function prefixToken(token) {
  if (token.length === 0) return token;
  // Preserve template-literal interpolation fragments untouched.
  if (token.includes("${") || token.startsWith("{") || token.startsWith("$")) return token;
  if (isAlreadyPrefixed(token)) return token;
  if (isDenied(token)) return token;
  // Important/negative leading markers stay BEFORE the prefix in Tailwind v4?
  // No — Tailwind v4 prefix is variant-leading: `cv:-mt-2`, `cv:!font-bold`.
  // Negative utilities and `!important` both keep their position after `cv:`.
  return PREFIX + token;
}

/* Split a class string on runs of whitespace, prefix each token, rejoin
 * preserving the original single-space separation. Leading/trailing space and
 * internal newlines (multi-line className strings) are normalized to single
 * spaces — acceptable for class lists. */
function prefixClassString(value) {
  return value
    .split(/\s+/)
    .map((tok) => (tok === "" ? tok : prefixToken(tok)))
    .join(" ")
    .trim();
}

/* ── string-literal locator ──────────────────────────────────────────────────
 * We find class CONTEXTS, then within each context rewrite every quoted string
 * literal (double, single, and the static parts of templates) via
 * prefixClassString. Contexts:
 *   className= ... up to the matching end of the attribute value
 *   cn( / cx( / clsx( / twMerge( / cva(  ... up to the matching close paren
 * Ternary arms inside a context are handled automatically because we rewrite
 * EVERY string literal inside the context span (both `?` and `:` arms are
 * string literals there). */

const CONTEXT_OPENERS = [
  // call form: name(
  { re: /\b(cn|cx|clsx|twMerge|cva)\s*\(/g, kind: "call" },
];

/** Given source and the index just after an opening `(`, return the index of the
 *  matching `)` (paren-balanced, string-aware). */
function matchParen(src, openIdx) {
  let depth = 1;
  let i = openIdx;
  let quote = null;
  while (i < src.length) {
    const c = src[i];
    if (quote) {
      if (c === "\\") { i += 2; continue; }
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'" || c === "`") {
      quote = c;
    } else if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

/** Rewrite every string literal (",',`) inside [start,end) of src. For template
 *  literals, only the static text segments are rewritten; `${...}` expressions
 *  are left intact (they may themselves contain cn(...) which a later pass over
 *  the whole file already covered, since we process contexts globally). */
function rewriteStringsInSpan(src, start, end) {
  let out = "";
  let i = start;
  while (i < end) {
    const c = src[i];
    if (c === '"' || c === "'") {
      let j = i + 1;
      let val = "";
      while (j < end) {
        if (src[j] === "\\") { val += src[j] + src[j + 1]; j += 2; continue; }
        if (src[j] === c) break;
        val += src[j];
        j++;
      }
      out += c + prefixClassString(val) + c;
      i = j + 1;
    } else if (c === "`") {
      // template literal: rewrite static chunks, preserve ${...}
      let j = i + 1;
      out += "`";
      while (j < end && src[j] !== "`") {
        if (src[j] === "\\") { out += src[j] + src[j + 1]; j += 2; continue; }
        if (src[j] === "$" && src[j + 1] === "{") {
          // copy the ${...} expression verbatim (paren/brace-balanced enough for
          // class templates — they hold simple member access / ternaries)
          let depth = 0;
          out += "${";
          j += 2;
          while (j < end) {
            const cc = src[j];
            if (cc === "{") depth++;
            else if (cc === "}") {
              if (depth === 0) { out += "}"; j++; break; }
              depth--;
            }
            out += cc;
            j++;
          }
          continue;
        }
        // accumulate a static run up to next ` or ${ or \
        let run = "";
        while (j < end && src[j] !== "`" && src[j] !== "\\" && !(src[j] === "$" && src[j + 1] === "{")) {
          run += src[j];
          j++;
        }
        out += prefixClassString(run);
      }
      out += "`";
      i = j + 1;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

/** Find the value span of a `className=` JSX attribute and return [start,end)
 *  covering the value (either a "..." / '...' literal or a {...} expression). */
function classNameSpans(src) {
  const spans = [];
  const re = /\bclassName\s*=\s*/g;
  let m;
  while ((m = re.exec(src))) {
    let i = re.lastIndex;
    const c = src[i];
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== c) { if (src[j] === "\\") j++; j++; }
      spans.push([i, j + 1]);
      re.lastIndex = j + 1;
    } else if (c === "{") {
      // brace-balanced, string-aware
      let depth = 1;
      let j = i + 1;
      let quote = null;
      while (j < src.length) {
        const cc = src[j];
        if (quote) {
          if (cc === "\\") { j += 2; continue; }
          if (cc === quote) quote = null;
        } else if (cc === '"' || cc === "'" || cc === "`") quote = cc;
        else if (cc === "{") depth++;
        else if (cc === "}") { depth--; if (depth === 0) { j++; break; } }
        j++;
      }
      spans.push([i, j]);
      re.lastIndex = j;
    }
  }
  return spans;
}

/** Find cn()/cva()/etc. call spans (the inside of the parens). */
function callSpans(src) {
  const spans = [];
  for (const { re } of CONTEXT_OPENERS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src))) {
      const open = re.lastIndex - 1; // index of '('
      const close = matchParen(src, open + 1);
      if (close > open) spans.push([open + 1, close]);
    }
  }
  return spans;
}

/** Merge overlapping spans (a cn(...) inside className={...} would be processed
 *  twice otherwise). Keep the OUTERMOST span; rewriting it covers inner strings,
 *  including inner cn(...) literals, in one pass. */
function mergeSpans(spans) {
  const sorted = [...spans].sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const merged = [];
  for (const s of sorted) {
    const last = merged[merged.length - 1];
    if (last && s[0] < last[1]) {
      last[1] = Math.max(last[1], s[1]);
    } else {
      merged.push([...s]);
    }
  }
  return merged;
}

function transform(src) {
  const spans = mergeSpans([...classNameSpans(src), ...callSpans(src)]);
  if (spans.length === 0) return src;
  let out = "";
  let cursor = 0;
  for (const [start, end] of spans) {
    out += src.slice(cursor, start);
    out += rewriteStringsInSpan(src, start, end);
    cursor = end;
  }
  out += src.slice(cursor);
  return out;
}

/* ── file walking ──────────────────────────────────────────────────────────*/
function walk(path, acc) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const e of readdirSync(path)) walk(join(path, e), acc);
  } else if (/\.(ts|tsx)$/.test(path)) {
    acc.push(path);
  }
  return acc;
}

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const targets = args.filter((a) => a !== "--dry");
  const roots = targets.length ? targets : ["src"];

  const files = [];
  for (const r of roots) {
    const st = statSync(r);
    if (st.isDirectory()) walk(r, files);
    else files.push(r);
  }

  let changed = 0;
  for (const f of files) {
    const before = readFileSync(f, "utf8");
    const after = transform(before);
    if (after !== before) {
      changed++;
      if (dry) {
        console.log(`would change: ${f}`);
      } else {
        writeFileSync(f, after);
        console.log(`prefixed: ${f}`);
      }
    }
  }
  console.log(`\n${changed} file(s) ${dry ? "would be " : ""}changed (${files.length} scanned).`);
}

main();
