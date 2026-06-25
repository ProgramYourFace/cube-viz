import * as React from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Content } from "@tiptap/core";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
} from "lucide-react";

import type { TextWidget, TipTapDoc } from "@/spec";
import { cn } from "@/components/ui/utils";
import { RICH_TEXT_CLASS } from "@/render/richTextStyles";

import { FieldRow } from "../primitives/FieldRow";

/**
 * EDITABLE TipTap editor for a {@link TextWidget} (docs/03 §A3.2 "Add" → text). The
 * runtime `TextWidget` view mounts the SAME StarterKit schema with `editable:false`,
 * so a doc authored here renders identically at runtime. On every transaction we
 * emit `editor.getJSON()` as the widget's `doc`.
 *
 * Self-contained toolbar (no extra deps): bold/italic/strike, H1/H2, lists, quote —
 * plain buttons that toggle StarterKit marks/nodes. WebView-safe (no portals).
 */

export interface TextWidgetEditorProps {
  widget: TextWidget;
  onChange: (widget: TextWidget) => void;
}

/** Coerce a possibly-malformed doc to renderable TipTap content (else empty). */
function toContent(doc: TipTapDoc | undefined): Content {
  if (doc && typeof doc === "object" && typeof (doc as { type?: unknown }).type === "string") {
    return doc as unknown as Content;
  }
  return { type: "doc", content: [{ type: "paragraph" }] };
}

export function TextWidgetEditor({
  widget,
  onChange,
}: TextWidgetEditorProps): React.ReactElement {
  // Keep the latest onChange in a ref so the editor's `onUpdate` closure stays fresh
  // without re-creating the editor (which would lose selection/focus).
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const widgetRef = React.useRef(widget);
  React.useEffect(() => {
    widgetRef.current = widget;
  }, [widget]);

  const editor = useEditor({
    extensions: [StarterKit],
    editable: true,
    content: toContent(widget.doc),
    onUpdate: ({ editor: ed }) => {
      const doc = ed.getJSON() as TipTapDoc;
      onChangeRef.current({ ...widgetRef.current, doc });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: cn(
          RICH_TEXT_CLASS,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        ),
      },
    },
  });

  if (!editor) {
    return <div className="cv:text-sm cv:text-muted-foreground">Loading editor…</div>;
  }

  return (
    <FieldRow label="Content" hint="Rich text — renders read-only at runtime.">
      <div className="cv:flex cv:flex-col cv:gap-2">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </FieldRow>
  );
}

/* ───────────────────────────────── toolbar ──────────────────────────────── */

interface ToolButtonProps {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

function ToolButton({ active, onClick, title, children }: ToolButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      // Prevent the editor from losing its selection on mousedown.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md cv:text-muted-foreground cv:transition-colors",
        "cv:hover:bg-muted cv:hover:text-foreground cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        "cv:[&_svg]:size-4",
        active && "cv:bg-muted cv:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }): React.ReactElement {
  // Re-render the toolbar's active states on every selection/transaction.
  const [, force] = React.useReducer((n: number) => n + 1, 0);
  React.useEffect(() => {
    const update = (): void => force();
    editor.on("transaction", update);
    editor.on("selectionUpdate", update);
    return () => {
      editor.off("transaction", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  return (
    <div
      data-slot="text-toolbar"
      className="cv:flex cv:flex-wrap cv:items-center cv:gap-0.5 cv:rounded-md cv:border cv:border-border cv:bg-card cv:p-1"
    >
      <ToolButton
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </ToolButton>
      <ToolButton
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </ToolButton>
      <ToolButton
        title="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </ToolButton>
      <span className="cv:mx-1 cv:h-5 cv:w-px cv:bg-border" aria-hidden />
      <ToolButton
        title="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 />
      </ToolButton>
      <ToolButton
        title="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 />
      </ToolButton>
      <span className="cv:mx-1 cv:h-5 cv:w-px cv:bg-border" aria-hidden />
      <ToolButton
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </ToolButton>
      <ToolButton
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </ToolButton>
      <ToolButton
        title="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote />
      </ToolButton>
    </div>
  );
}
