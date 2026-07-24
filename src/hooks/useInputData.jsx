import { useState } from "react";

function useInputData() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [cards, setCards] = useState([]);

    const addCard = (callback) => {
        const trimmedQuestion = question.trim();
        const trimmedAnswer = answer.trim();

        if (!trimmedQuestion || !trimmedAnswer) return null;

        const newCard = {
            question: trimmedQuestion,
            answer: trimmedAnswer,
        };

        setCards((prevCards) => [...prevCards, newCard]);
        setQuestion("");
        setAnswer("");

        if (typeof callback === "function") {
            callback(newCard);
        }

        return newCard;
    };

    const removeCard = (indexToRemove) => {
        setCards((prevCards) => prevCards.filter((_, index) => index !== indexToRemove));
    };

    return {
        question,
        setQuestion,
        answer,
        setAnswer,
        cards,
        addCard,
        removeCard,
    };
}

export default useInputData;