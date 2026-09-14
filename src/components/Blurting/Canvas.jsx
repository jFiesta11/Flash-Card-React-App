import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const fontSizes = ["small", "normal", "large", "huge"];
const formats = ["bold", "italic", "font", "size"];
const modules = { toolbar: false };

function Canvas({ clearSignal, isFormatBarOpen }) {
  const formRef = useRef(null);
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (clearSignal > 0) {
      setContent("");
    }
  }, [clearSignal]);

  const handleClear = (event) => {
    event.currentTarget.form.reset();
    setContent("");
  };

  const getEditor = () => editorRef.current?.getEditor();

  const applyFormat = (format, value = null) => {
    const editor = getEditor();
    if (!editor) return;

    editor.focus();
    if (value === null) {
      const currentFormat = editor.getFormat();
      editor.format(format, !currentFormat[format], "user");
      return;
    }

    editor.format(format, value, "user");
  };

  const handleEditorKeyDown = (event) => {
    if (event.key !== "Tab") return;

    event.preventDefault();
    const editor = getEditor();
    const range = editor?.getSelection(true);
    if (!editor || !range) return;

    editor.insertText(range.index, "\u00a0\u00a0\u00a0\u00a0", "user");
    editor.setSelection(range.index + 4, 0, "user");
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
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => applyFormat("bold")}
              aria-label="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => applyFormat("italic")}
              aria-label="Italic"
            >
              <em>I</em>
            </button>
            <select
              aria-label="Font family"
              defaultValue=""
              onMouseDown={(event) => event.stopPropagation()}
              onChange={(event) => applyFormat("font", event.target.value)}
            >
              <option value="" disabled>
                Font
              </option>
              <option value="Margarine">Margarine</option>
              <option value="IndieFlower">Indie Flower</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
            <select
              aria-label="Font size"
              defaultValue="normal"
              onMouseDown={(event) => event.stopPropagation()}
              onChange={(event) =>
                applyFormat(
                  "size",
                  event.target.value === "normal" ? false : event.target.value,
                )
              }
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
