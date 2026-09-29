import { useState } from "react";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="study-about-button"
        aria-label="About blurting"
        onClick={() => setIsOpen(true)}
      >
        ?
      </button>

      {isOpen && (
        <div
          className="study-about-overlay"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            className="study-about-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blurting-about-title"
          >
            <button
              type="button"
              className="study-about-close"
              aria-label="Close about dialog"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h2 id="blurting-about-title">About Blurting</h2>
            <section>
              <h3>Recall first, check second</h3>
              <p>
                Choose a topic, put away your notes, and write or explain
                everything you can remember in your own words. Keep going even
                when your first ideas are incomplete; the effort to retrieve
                information is the point.
              </p>
            </section>
            <section>
              <h3>Review what you missed</h3>
              <p>
                Compare your blurt with reliable notes or a textbook. Correct
                mistakes, add missing details in a different color, and make a
                short list of gaps to revisit. This helps you see what you know
                and where to focus next.
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
