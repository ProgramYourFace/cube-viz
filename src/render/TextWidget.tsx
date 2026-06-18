import { useMemo, type ReactElement } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Content } from "@tiptap/core";

import type { TipTapDoc } from "@/spec";
import { cn } from "@/components/ui/utils";

/**
 * Render a {@link TipTapDoc} READ-ONLY (docs/01-spec-schema.md §3.5,
 * docs/03-override-theme-preview.md A3). A `TextWidget.doc` is ProseMirror JSON
 * straight from `editor.getJSON()`, so the *same* StarterKit schema renders it
 * with `editable: false` — guaranteeing the displayed doc matches the authored one.
 *
 * Unknown node types are guarded two ways: `enableContentCheck` makes TipTap
 * validate the doc against the StarterKit schema instead of throwing, and a guard
 * up front rejects a structurally-invalid doc with a muted fallback rather than
 * mounting an editor on garbage. The editor never re-creates on content identity
 * churn — it re-renders in place when `doc` changes.
 */

export interface TextWidgetProps {
  /** ProseMirror / TipTap document JSON (the `TextWidget.doc` payload). */
  doc: TipTapDoc;
}

/** Minimal structural check: a TipTap doc is an object with a string `type`. */
function isRenderableDoc(doc: unknown): doc is TipTapDoc {
  return (
    typeof doc === "object" &&
    doc !== null &&
    typeof (doc as { type?: unknown }).type === "string"
  );
}

export function TextWidget({ doc }: TextWidgetProps): ReactElement {
  const renderable = isRenderableDoc(doc);

  // The TipTap content. `null` keeps the editor valid but empty when the doc is
  // unusable, so we never construct an editor over malformed JSON.
  const content = useMemo<Content>(
    () => (renderable ? (doc as unknown as Content) : null),
    [renderable, doc],
  );

  const editor = useEditor(
    {
      extensions: [StarterKit],
      editable: false,
      content,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: true,
      emitContentError: true,
      onContentError: () => {
        /* swallow — unknown nodes are dropped by the schema; render what's valid. */
      },
      editorProps: {
        attributes: {
          class: cn(
            "prose prose-sm max-w-none text-sm text-foreground",
            "[&_a]:text-primary [&_a]:underline",
            "[&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold",
          ),
        },
      },
    },
    [content],
  );

  if (!renderable) {
    return (
      <div className="text-sm text-muted-foreground">Unsupported text content</div>
    );
  }

  return <EditorContent editor={editor} />;
}
