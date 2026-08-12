import { useState, useEffect, useMemo, useCallback } from "react";

function useCardNav(card) {
  const flashcards = Array.isArray(card?.questions) ? card.questions : [];
  const flashcardsKey = useMemo(() => JSON.stringify(flashcards), [flashcards]);

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const [index, setIndex] = useState(0);
  const [flipCard, setFlipCard] = useState(true);
  const [flashCards, setFlashCards] = useState(() => shuffleArray(flashcards));

  useEffect(() => {
    setFlashCards(shuffleArray(flashcards));
    setIndex(0);
    setFlipCard(true);
  }, [flashcardsKey]);

  useEffect(() => {
    setIndex((currentIndex) => {
      if (flashCards.length === 0) return 0;
      return Math.min(currentIndex, flashCards.length - 1);
    });
  }, [flashCards.length]);

  const currentCard = flashCards[index] || { question: "", answer: "" };

  const flip = useCallback(() => {
    setFlipCard((front) => !front);
  }, []);

  const previous = useCallback(() => {
    setFlipCard(true);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const next = useCallback(() => {
    setFlipCard(true);
    setIndex((i) => {
      if (flashCards.length === 0) return 0;
      return Math.min(i + 1, flashCards.length - 1);
    });
  }, [flashCards.length]);

  const shuffle = useCallback(() => {
    setFlipCard(true);
    setFlashCards(shuffleArray(flashcards));
    setIndex(0);
  }, [flashcards]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isTypingInInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      if (isTypingInInput) return;

      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") previous();
      if (e.key === " ") {
        e.preventDefault();
        flip();
      }
      if (e.key === "s") shuffle();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, previous, flip, shuffle]);

  return {
    shuffle,
    index,
    next,
    previous,
    flip,
    currentCard,
    flipCard,
    flashCards,
  };
}

export default useCardNav;
