// image
import sidebarIcon from "../../assets/images/open-sidebar.svg"
// data
import useCardNav from '../../hooks/useCardNav';
// components
import Button from "./Button";
import Statusbar from "./Statusbar";
import Card from "./Card";
// hook
import { useState, useEffect} from 'react';

function MainContent({card, onOpenSidebar}){
    const {shuffle, index, next, previous, flip, currentCard, flipCard, flashCards} = useCardNav(card)
return (
    <>  
        <Button className="open-sidebar" img={sidebarIcon} imgAlt="openSideBar"  onClick={onOpenSidebar} />

        <Statusbar item={index+1} totalItem={flashCards.length} />
        <Card click={flip} front={currentCard.question} back={currentCard.answer} showAnswer={flipCard}/>
        <div className='btn-container'>
            <Button className="card-btn" label={'Previous'} onClick={previous}/>
            <Button className="card-btn" label={'Flip'} onClick={flip} />
            <Button className="card-btn" label={'Next'} onClick={next}/>
            <Button className="card-btn" label={'Shuffle'} onClick={shuffle}/>
        </div>
    </>
)
    }

export default MainContent