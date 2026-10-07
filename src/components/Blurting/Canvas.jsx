import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FontFamily, FontSize, TextStyle } from "@tiptap/extension-text-style";
import About from "./About";

const defaultFont = "'Calibri', 'Segoe UI', sans-serif";
const fontSizes = ["small", "normal", "large", "huge"];
const fontSizeStyles = {
  small: "0.85rem",
  normal: "1rem",
  large: "1.5rem",
  huge: "2rem",
};
const fontOptions = [
  { value: defaultFont, label: "Calibri Body" },
  { value: "Aptos, 'Segoe UI', sans-serif", label: "Aptos" },
  { value: "Arial, Helvetica, sans-serif", label: "Arial" },
  { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
  { value: "Verdana, Geneva, sans-serif", label: "Verdana" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "Lato, sans-serif", label: "Lato" },
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: "Cambria, serif", label: "Cambria" },
  { value: "Baskerville, serif", label: "Baskerville" },
  { value: "'Lora', serif", label: "Lora" },
  { value: "'Merriweather', serif", label: "Merriweather" },
  { value: "'Century Schoolbook', serif", label: "Century Schoolbook" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "Consolas, monospace", label: "Consolas" },
  { value: "'Courier Prime', monospace", label: "Courier Prime" },
  { value: "'Fira Code', monospace", label: "Fira Code" },
  { value: "Margarine", label: "Margarine" },
  { value: "'Indie Flower', cursive", label: "Indie Flower" },
];

function Canvas({ clearSignal, isFormatBarOpen }) {
  const formRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
  });
  const [fontChoice, setFontChoice] = useState(defaultFont);
  const [sizeChoice, setSizeChoice] = useState("normal");
  const fontStyle = useMemo(() => ({ fontFamily: fontChoice }), [fontChoice]);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, FontFamily, FontSize],
    content: "",
    editorProps: {
      attributes: {
        class: "canvas-textarea",
        id: "blurting-notes",
        placeholder: "Blurt it out..",
      },
    },
  });

  const syncFormatButtons = useCallback(
    (editorInstance = editor) => {
      if (!editorInstance) return;

      const textStyle = editorInstance.getAttributes("textStyle") ?? {};
      const nextFont = textStyle.fontFamily || defaultFont;
      const nextSize = normalizeFontSize(textStyle.fontSize);
      const nextFormats = {
        bold: editorInstance.isActive("bold"),
        italic: editorInstance.isActive("italic"),
      };

      setActiveFormats((current) =>
        current.bold === nextFormats.bold &&
        current.italic === nextFormats.italic
          ? current
          : nextFormats,
      );
      setFontChoice((current) => (current === nextFont ? current : nextFont));
      setSizeChoice((current) => (current === nextSize ? current : nextSize));
    },
    [editor],
  );

  useEffect(() => {
    if (!editor) return;

    const updateFormatButtons = () => syncFormatButtons(editor);
    editor.on("transaction", updateFormatButtons);

    return () => editor.off("transaction", updateFormatButtons);
  }, [editor, syncFormatButtons]);

  useEffect(() => {
    if (!editor) return;
    syncFormatButtons(editor);
  }, [editor, syncFormatButtons]);

  useEffect(() => {
    if (clearSignal === 0 || !editor) return;

    editor.chain().clearContent().focus().run();
    setActiveFormats({ bold: false, italic: false });
    setFontChoice(defaultFont);
    setSizeChoice("normal");
  }, [clearSignal, editor]);

  const handleClear = (event) => {
    event.currentTarget.form?.reset();

    if (!editor) return;
    editor.chain().clearContent().focus().run();
    setActiveFormats({ bold: false, italic: false });
    setFontChoice(defaultFont);
    setSizeChoice("normal");
  };

  const applyFormat = useCallback(
    (format) => {
      if (!editor) return;

      const chain = editor.chain().focus();

      if (format === "bold") {
        chain.toggleBold().run();
      }

      if (format === "italic") {
        chain.toggleItalic().run();
      }

      syncFormatButtons(editor);
    },
    [editor, syncFormatButtons],
  );

  const handleFontChange = (value) => {
    if (!editor) return;

    editor.chain().focus().setFontFamily(value).run();
    setFontChoice(value);
    syncFormatButtons(editor);
  };

  const handleSizeChange = (value) => {
    if (!editor) return;

    if (value === "normal") {
      editor.chain().focus().unsetFontSize().run();
      setSizeChoice("normal");
    } else {
      editor.chain().focus().setFontSize(fontSizeStyles[value]).run();
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
              style={fontStyle}
              onMouseDown={(event) => event.stopPropagation()}
              onChange={(event) => handleFontChange(event.target.value)}
            >
              {fontOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ fontFamily: option.value }}
                >
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
      <div className="study-about-button-wrapper">
        <About />
      </div>
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
