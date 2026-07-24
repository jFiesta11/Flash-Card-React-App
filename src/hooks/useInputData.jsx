import { useState } from "react";

function useInputData() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [cards, setCards] = useState([]);

    const addCard = () => {
        const trimmedQuestion = question.trim();
        const trimmedAnswer = answer.trim();

        if (!trimmedQuestion || !trimmedAnswer) return;

        setCards((prevCards) => [
            ...prevCards,
            {
                questions: trimmedQuestion,
                answers: trimmedAnswer,
            },
        ]);

        setQuestion("");
        setAnswer("");
    };

    return {
        question,
        setQuestion,
        answer,
        setAnswer,
        cards,
        addCard,
    };
}

export default useInputData;