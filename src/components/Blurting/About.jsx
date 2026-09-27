import { useState } from "react";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="canvas-about-button"
        aria-label="About"
        onClick={() => setIsOpen(true)}
      >
        ?
      </button>

      {isOpen && (
        <div
          className="canvas-about-overlay"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            className="canvas-about-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="About information"
          >
            <button
              type="button"
              className="canvas-about-close"
              aria-label="Close about dialog"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
