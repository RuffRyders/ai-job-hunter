"use client";

import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function TextEditor({ content }: { content?: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content
        style={{
          "max-height": "calc(100vh - 200px)",
          "overflow-y": "auto",
          "overflow-x": "hidden",
        }}
      />
    </RichTextEditor>
  );
}
