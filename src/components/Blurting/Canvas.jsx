function Canvas() {
  const handleClear = (event) => {
    event.currentTarget.form.reset();
  };

  return (
    <section className="blurting-workspace">
      <header className="blurting-header">
        <div>
          <p className="blurting-kicker">Active recall</p>
          <h1>Blur it out</h1>
          <p className="blurting-description">
            Write everything you remember before checking your notes.
          </p>
        </div>
        <span className="blurting-status">Free write</span>
      </header>
      <form className="canvas-form">
        <label className="canvas-label" htmlFor="blurting-notes">
          What do you remember?
        </label>
        <textarea
          id="blurting-notes"
          className="canvas-textarea"
          placeholder="Start with the big idea, then add details..."
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
