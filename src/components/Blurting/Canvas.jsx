import { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";

const fontSizes = ["small", "normal", "large", "huge"];
const fontSizeStyles = {
  small: "0.85rem",
  normal: "1rem",
  large: "1.5rem",
  huge: "2rem",
};
const fontOptions = [
  { value: "", label: "Font" },
  { value: "Margarine", label: "Margarine" },
  { value: "Indie Flower", label: "Indie Flower" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
];

function Canvas({ clearSignal, isFormatBarOpen }) {
  const formRef = useRef(null);
  const [content, setContent] = useState("");
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
  });
  const [fontChoice, setFontChoice] = useState("");
  const [sizeChoice, setSizeChoice] = useState("normal");

  const editor = useEditor({
    extensions: [StarterKit, TextStyle],
    content: "",
    editorProps: {
      attributes: {
        class: "canvas-textarea",
        id: "blurting-notes",
        placeholder: "Blurt it out..",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      syncFormatButtons(editor);
    },
  });

  const syncFormatButtons = useCallback(
    (editorInstance = editor) => {
      if (!editorInstance) return;

      const textStyle = editorInstance.getAttributes("textStyle") ?? {};

      setActiveFormats({
        bold: editorInstance.isActive("bold"),
        italic: editorInstance.isActive("italic"),
      });
      setFontChoice(textStyle.fontFamily || "");
      setSizeChoice(normalizeFontSize(textStyle.fontSize));
    },
    [editor],
  );

  useEffect(() => {
    if (!editor) return;
    syncFormatButtons(editor);
  }, [editor, syncFormatButtons]);

  useEffect(() => {
    if (clearSignal === 0 || !editor) return;

    editor.chain().clearContent().focus().run();
    setContent("");
    setActiveFormats({ bold: false, italic: false });
    setFontChoice("");
    setSizeChoice("normal");
  }, [clearSignal, editor]);

  const handleClear = (event) => {
    event.currentTarget.form?.reset();

    if (!editor) return;
    editor.chain().clearContent().focus().run();
    setContent("");
    setActiveFormats({ bold: false, italic: false });
    setFontChoice("");
    setSizeChoice("normal");
  };

  const applyFormat = useCallback(
    (format) => {
      if (!editor) return;

      editor.chain().focus();

      if (format === "bold") {
        editor.chain().toggleBold().run();
      }

      if (format === "italic") {
        editor.chain().toggleItalic().run();
      }

      syncFormatButtons(editor);
    },
    [editor, syncFormatButtons],
  );

  const handleFontChange = (value) => {
    if (!editor) return;

    editor.chain().focus();

    if (!value) {
      editor.chain().unsetMark("textStyle").run();
      setFontChoice("");
    } else {
      editor.chain().setMark("textStyle", { fontFamily: value }).run();
      setFontChoice(value);
    }

    syncFormatButtons(editor);
  };

  const handleSizeChange = (value) => {
    if (!editor) return;

    editor.chain().focus();

    if (value === "normal") {
      editor.chain().unsetMark("textStyle").run();
      setSizeChoice("normal");
    } else {
      editor
        .chain()
        .setMark("textStyle", { fontSize: fontSizeStyles[value] })
        .run();
      setSizeChoice(value);
    }

    syncFormatButtons(editor);
  };

  const handleEditorKeyDown = (event) => {
    if (!editor) return;

    if (event.key === "Tab") {
      event.preventDefault();
      editor.chain().focus().insertContent("    ").run();
    }
  };

  return (
    <section className="blurting-workspace">
      <form ref={formRef} className="canvas-form">
        <EditorContent
          editor={editor}
          className="canvas-editor"
          onKeyDown={handleEditorKeyDown}
        />
        {isFormatBarOpen && (
          <div
            className="blurting-format-bar"
            role="toolbar"
            aria-label="Text formatting"
          >
            <button
              type="button"
              className={activeFormats.bold ? "is-active" : ""}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => applyFormat("bold")}
              aria-label="Bold"
              aria-pressed={activeFormats.bold}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className={activeFormats.italic ? "is-active" : ""}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => applyFormat("italic")}
              aria-label="Italic"
              aria-pressed={activeFormats.italic}
            >
              <em>I</em>
            </button>
            <select
              aria-label="Font family"
              value={fontChoice}
              onMouseDown={(event) => event.stopPropagation()}
              onChange={(event) => handleFontChange(event.target.value)}
            >
              {fontOptions.map((option) => (
                <option key={option.value || "default"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Font size"
              value={sizeChoice}
              onMouseDown={(event) => event.stopPropagation()}
              onChange={(event) => handleSizeChange(event.target.value)}
            >
              {fontSizes.map((size) => (
                <option key={size || "normal"} value={size}>
                  {size || "Size"}
                </option>
              ))}
            </select>
          </div>
        )}
        <footer className="canvas-footer">
          <span>Keep going until the page is full.</span>
          <button type="button" className="canvas-clear" onClick={handleClear}>
            Clear page
          </button>
        </footer>
      </form>
    </section>
  );
}

function normalizeFontSize(value) {
  if (!value) {
    return "normal";
  }

  const normalized = value.toLowerCase().replace(/\s+/g, "");

  if (normalized === fontSizeStyles.small) return "small";
  if (normalized === fontSizeStyles.large) return "large";
  if (normalized === fontSizeStyles.huge) return "huge";

  return "normal";
}

export default Canvas;
