import { useEffect, useRef } from "react";

function Canvas({ clearSignal }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (clearSignal > 0) formRef.current?.reset();
  }, [clearSignal]);

  const handleClear = (event) => {
    event.currentTarget.form.reset();
  };

  return (
    <section className="blurting-workspace">
      <form ref={formRef} className="canvas-form">
        <textarea
          id="blurting-notes"
          className="canvas-textarea"
          placeholder="Blurt it out.."
          autoFocus
        />
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
