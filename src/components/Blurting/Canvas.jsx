import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const fontSizes = ["small", "normal", "large", "huge"];
const fontOptions = [
  { value: "", label: "Font" },
  { value: "Margarine", label: "Margarine" },
  { value: "IndieFlower", label: "Indie Flower" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
];
const formats = ["bold", "italic", "font", "size"];
const modules = { toolbar: false };

function Canvas({ clearSignal, isFormatBarOpen }) {
  const formRef = useRef(null);
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
  });
  const [fontChoice, setFontChoice] = useState("");
  const [sizeChoice, setSizeChoice] = useState("normal");

  useEffect(() => {
    const Font = Quill.import("attributors/style/font");
    if (Font && !Font.whitelist.includes("Margarine")) {
      Font.whitelist = ["Margarine", "IndieFlower", "Georgia", "Verdana"];
      Quill.register(Font, true);
    }
  }, []);

  const getEditor = useCallback(() => editorRef.current?.getEditor(), []);

  useEffect(() => {
    if (clearSignal === 0) return;

    const editor = getEditor();
    if (!editor) return;

    editor.setText("");
    editor.setSelection(0, 0, "user");
    setContent("");
    setActiveFormats({ bold: false, italic: false });
    setFontChoice("");
    setSizeChoice("normal");
  }, [clearSignal, getEditor]);

  const handleClear = (event) => {
    event.currentTarget.form?.reset();

    const editor = getEditor();
    if (editor) {
      editor.setText("");
      editor.setSelection(0, 0, "user");
    }

    setContent("");
    setActiveFormats({ bold: false, italic: false });
    setFontChoice("");
    setSizeChoice("normal");
  };

  const applyFormat = useCallback(
    (format, value = null) => {
      const editor = getEditor();
      if (!editor) return;

      const range = editor.getSelection(true);
      editor.focus();

      const nextValue =
        value === null ? !activeFormats[format] : Boolean(value);
      editor.format(format, nextValue, "user");

      if (range) {
        editor.setSelection(range.index, range.length, "user");
      }

      if (format === "bold") {
        setActiveFormats((previous) => ({ ...previous, bold: nextValue }));
      }

      if (format === "italic") {
        setActiveFormats((previous) => ({ ...previous, italic: nextValue }));
      }
    },
    [activeFormats, getEditor],
  );

  const handleFontChange = (value) => {
    setFontChoice(value);

    const editor = getEditor();
    if (!editor) return;

    editor.focus();
    const range = editor.getSelection(true);

    if (!value) {
      editor.format("font", false, "user");
      if (range) {
        editor.setSelection(range.index, range.length, "user");
      }
      return;
    }

    editor.format("font", value, "user");
    if (range) {
      editor.setSelection(range.index, range.length, "user");
    }
  };

  const handleSizeChange = (value) => {
    setSizeChoice(value);
    const normalizedValue = value === "normal" ? false : value;

    const editor = getEditor();
    if (!editor) return;

    editor.focus();
    const range = editor.getSelection(true);
    editor.format("size", normalizedValue, "user");
    if (range) {
      editor.setSelection(range.index, range.length, "user");
    }
  };

  const handleEditorKeyDown = (event) => {
    const editor = getEditor();
    if (!editor) return;

    if (event.key === "Tab") {
      event.preventDefault();
      const range = editor.getSelection(true);
      if (!range) return;

      editor.insertText(range.index, "\u00a0\u00a0\u00a0\u00a0", "user");
      editor.setSelection(range.index + 4, 0, "user");
      return;
    }

    // Let Quill handle Enter as a single line break. Manual insertion here adds
    // an extra blank line because Quill already creates a new paragraph for Enter.
  };

  return (
    <section className="blurting-workspace">
      <form ref={formRef} className="canvas-form">
        <ReactQuill
          id="blurting-notes"
          className="canvas-textarea"
          ref={editorRef}
          theme="snow"
          value={content}
          onChange={setContent}
          onKeyDown={handleEditorKeyDown}
          placeholder="Blurt it out.."
          modules={modules}
          formats={formats}
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

export default Canvas;
