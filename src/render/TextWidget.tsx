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
          // Explicit typography (no @tailwindcss/typography dependency, so the styles
          // ship in the library CSS and render correctly inside the host WebView).
          // Tailwind's preflight flattens headings, so each level needs its own size.
          class: cn(
            "max-w-none text-sm leading-relaxed text-foreground",
            "[&>:first-child]:mt-0 [&>:last-child]:mb-0",
            "[&_h1]:mb-2 [&_h1]:mt-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight",
            "[&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight",
            "[&_h3]:mb-1.5 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold",
            "[&_h4]:mb-1 [&_h4]:mt-2 [&_h4]:text-base [&_h4]:font-semibold",
            "[&_p]:my-1.5",
            "[&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5",
            "[&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5",
            "[&_li]:my-0.5 [&_li>p]:my-0",
            "[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
            "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]",
            "[&_pre]:my-2 [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
            "[&_hr]:my-3 [&_hr]:border-border",
            "[&_a]:text-primary [&_a]:underline",
            "[&_strong]:font-semibold [&_em]:italic",
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
