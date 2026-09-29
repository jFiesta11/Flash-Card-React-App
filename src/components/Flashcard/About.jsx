import { useState } from "react";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="study-about-button"
        aria-label="About flashcards"
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
            aria-labelledby="flashcard-about-title"
          >
            <button
              type="button"
              className="study-about-close"
              aria-label="Close about dialog"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h2 id="flashcard-about-title">About Flashcards</h2>
            <section>
              <h3>Try to answer before flipping</h3>
              <p>
                Read the prompt and retrieve the answer from memory before you
                reveal it. Check your response honestly, then spend extra time
                on cards that were difficult. This active-recall practice is
                useful for learning terms, facts, and concise explanations.
              </p>
            </section>
            <section>
              <h3>Build a useful deck</h3>
              <p>
                Keep each card focused on one question or idea. For a deeper
                topic, use blurting first: write down everything you remember,
                compare it with your notes, and turn the gaps into cards.
              </p>
            </section>
            <p className="study-about-tip">
              Return to challenging cards over multiple study sessions instead
              of trying to memorize the whole deck at once.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
