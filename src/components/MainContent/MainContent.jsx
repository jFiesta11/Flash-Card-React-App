// data
import useCardNav from '../../hooks/useCardNav';
// components
import Button from "./Button";
import Statusbar from "./Statusbar";
import Card from "./Card";
// hook
import { useState, useEffect} from 'react';

function MainContent({card}){

 const {shuffle, index, next, previous, flip, currentCard, flipCard, flashCards} = useCardNav(card)

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

export default MainContent