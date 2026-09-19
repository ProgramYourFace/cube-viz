import * as React from "react";

/**
 * A text field whose VALUE lives upstream in parsed form (a list, a number) but whose
 * raw text has intermediate states the parsed form cannot represent — `"a,"` on the
 * way to `"a, b"`, `"1"` on the way to `"15"` in a field clamped to ≥ 2, an emptied
 * field about to be retyped. Deriving the input's `value` from the parsed upstream
 * (`value={list.join(", ")}`) re-formats every keystroke and silently eats those
 * states: the comma vanishes, the digit snaps to the clamp, the field refuses to clear.
 *
 * So the raw text is held here. Every keystroke still emits `parse(text)` upstream
 * (the chart previews live), but the text only re-syncs FROM upstream when upstream has
 * moved to something the current text does not already express — an undo, a remote
 * merge, a re-seed — never because of the field's own round trip. Blur normalises the
 * display to `format(parse(text))` ("a,b" → "a, b").
 */
export interface UseParsedTextOptions<T> {
  /** The upstream (parsed) value. */
  value: T;
  /** Raw text → value. Must accept every intermediate string a user can type. */
  parse: (text: string) => T;
  /** Value → canonical text. */
  format: (value: T) => string;
  onChange: (value: T) => void;
}

export interface ParsedText {
  /** The raw text to render as the input's `value`. */
  text: string;
  /** Wire to the input's onChange (with `e.target.value`). */
  onText: (text: string) => void;
  /** Wire to the input's onBlur: normalises the display. */
  onBlur: () => void;
}

/**
 * Whether the field's text must be replaced by upstream's canonical text: yes iff
 * upstream says something the current text does not already say once normalised
 * (`format(parse(text))`). Pure — the hook's one decision, exposed for tests.
 */
export function shouldResyncText(
  text: string,
  upstreamText: string,
  normalize: (text: string) => string,
): boolean {
  return normalize(text) !== upstreamText;
}

export function useParsedText<T>({ value, parse, format, onChange }: UseParsedTextOptions<T>): ParsedText {
  const upstreamText = format(value);
  const [text, setText] = React.useState(upstreamText);
  // Derived-state-during-render (the React-sanctioned pattern): when upstream's text
  // changes, decide ONCE whether it supersedes what is typed — no effect, no flash.
  const [seenUpstream, setSeenUpstream] = React.useState(upstreamText);
  if (upstreamText !== seenUpstream) {
    setSeenUpstream(upstreamText);
    if (shouldResyncText(text, upstreamText, (t) => format(parse(t)))) setText(upstreamText);
  }

  const onText = React.useCallback(
    (next: string) => {
      setText(next);
      onChange(parse(next));
    },
    [onChange, parse],
  );
  const onBlur = React.useCallback(() => {
    setText((t) => format(parse(t)));
  }, [format, parse]);

  return { text, onText, onBlur };
}
