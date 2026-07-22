// data
import card from '../data/questions.json'
// components
import Button from "./Button";
import Statusbar from "./Statusbar";
import Card from "./Card";
// hook
import { useState, useEffect} from 'react';

function shuffleArray(array) {
    const arr = [...array]; 
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        [arr[i], arr[j]] = [arr[j], arr[i]];
    
    }
  return arr;
}
const flashcards = card.questions

function Parent(){

    const [index, setIndex] = useState(0);
    
    const [flipCard, setFlipCard] = useState(true)

    const [flashCards, setflashCards] = useState(() => shuffleArray(card.questions))
    
    let currentCard = flashCards[index]
    const flip = ()=>{ 
                    setFlipCard(front => !front)
                }
    const previous = ()=>{  
                        (setFlipCard(true))
                        setIndex(i => Math.max(i - 1, 0));  
                    }
    const next = ()=>{
                        (setFlipCard(true))
                        setIndex(i => Math.min(i + 1, flashcards.length - 1));    
                    }            
    const shuffle = ()=>{
                        setflashCards(shuffleArray(card.questions))
                        setIndex(0)
    }           
    
    useEffect(() => {
        const handleKeyDown = (e) => {
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
    }, []);


return (
    <>
        <Statusbar item={index+1} totalItem={flashCards.length} />
        <Card click={flip} front={currentCard.question} back={currentCard.answer} showAnswer={flipCard}/>
        <div className='btn-container'>
            <Button label={'Previous'} onClick={previous}/>
            <Button label={'Flip'} onClick={flip} />
            <Button label={'Next'} onClick={next}/>
            <Button label={'Shuffle'} onClick={shuffle}/>
        </div>
    </>
)
    }

export default Parent;