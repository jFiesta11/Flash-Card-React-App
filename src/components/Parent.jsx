import MainContent from "./MainContent/MainContent";
import Sidebar from "./SideBar/Sidebar"
import initialCards from "../data/questions.json"
import { useEffect, useState } from "react";

function Parent(){
    const [openSideBar, setOpenSidebar] = useState(false)
    const [flashCards, setFlashCards] = useState(initialCards.questions)
    const [pendingCards, setPendingCards] = useState(initialCards.questions)

    useEffect(() => {
        if (!openSideBar) return

        const handleClickOutside = (event) => {
            const clickedInsideSidebar = event.target.closest("[data-sidebar]")
            const clickedOpenButton = event.target.closest(".open-sidebar")

            if (!clickedInsideSidebar && !clickedOpenButton) {
                setOpenSidebar(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [openSideBar])

    const handleAddCard = (newCard) => {
        setPendingCards((prevCards) => [...prevCards, newCard])
    }

    const handleRemoveCard = (indexToRemove) => {
        setPendingCards((prevCards) => prevCards.filter((_, index) => index !== indexToRemove))
    }

    const handleUpdateDeck = () => {
        setFlashCards([...pendingCards])
    }

    const handleClearAll = () => {
        setPendingCards([])
        setFlashCards([])
    }

    return (
        <>
            <MainContent card={{ questions: flashCards }} onOpenSidebar={() => setOpenSidebar((open) => !open)} />
           
            <Sidebar
                isOpen={openSideBar}
                onCloseSidebar={() => setOpenSidebar(false)}
                onAddCard={handleAddCard}
                onRemoveCard={handleRemoveCard}
                cards={pendingCards}
                onUpdateDeck={handleUpdateDeck}
                onClearAll={handleClearAll}
            />
        </>
    )
}

export default Parent;