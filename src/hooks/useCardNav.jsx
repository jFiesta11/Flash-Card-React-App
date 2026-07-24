import { useState, useEffect } from "react"

function useCardNav(card){
    const flashcards = Array.isArray(card?.questions) ? card.questions : []

    function shuffleArray(array) {
        const arr = [...array]; 
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            
            [arr[i], arr[j]] = [arr[j], arr[i]];
        
        }
        return arr;
    }

    const [index, setIndex] = useState(0);
    const [flipCard, setFlipCard] = useState(true)
    const [flashCards, setflashCards] = useState(() => shuffleArray([...flashcards]))

    useEffect(() => {
        setflashCards(shuffleArray([...flashcards]))
        setIndex(0)
        setFlipCard(true)
    }, [flashcards])

    const currentCard = flashCards[index] || { question: "", answer: "" }
    const totalCards = flashCards.length
    
    const flip = ()=>{ 
        setFlipCard(front => !front)
    }

    const previous = ()=>{  
        setFlipCard(true)
        setIndex(i => {
            if (totalCards === 0) return 0
            return Math.max(i - 1, 0)
        })
    }

    const next = ()=>{
        setFlipCard(true)
        setIndex(i => {
            if (totalCards === 0) return 0
            return Math.min(i + 1, Math.max(totalCards - 1, 0))
        })
    }

    const shuffle = ()=>{
        setFlipCard(true)
        setflashCards(shuffleArray([...flashcards]))
        setIndex(0)
    }
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            const target = e.target;
            const isTypingInInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;

            if (isTypingInInput) return;

            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") previous();
            if (e.key === " "){  
                e.preventDefault() 
                flip()
            }
            if(e.key === 's') shuffle()
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [flashcards]);


    return {shuffle, index, next, previous, flip, currentCard, flipCard, flashCards}
}

export default useCardNav