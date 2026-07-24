import SideHeader from "./sideHeader"
import DataContainer from "./DataContainer"
import CardForm from "./CardForm"
import Button from "./Button"
import useInputData from "../../hooks/useInputData"

function Sidebar({isOpen, onCloseSidebar, onAddCard, onRemoveCard, cards, onUpdateDeck}){
    const { question, setQuestion, answer, setAnswer, addCard } = useInputData()

    const handleAddCard = () => {
        addCard((newCard) => {
            onAddCard?.(newCard)
        })
    }

    return (
        <div
            className="sidebar"
            data-sidebar="true"
            style={isOpen ? { transform: "translateX(0)" } : { transform: "translateX(-100%)" }}
        >
            <SideHeader onCloseSidebar={onCloseSidebar} isActive={true} />
            <div className="sidebar-content-container">
                <DataContainer cards={cards} onRemoveCard={onRemoveCard} />
                <CardForm
                    question={question}
                    answer={answer}
                    onQuestionChange={(e) => setQuestion(e.target.value)}
                    onAnswerChange={(e) => setAnswer(e.target.value)}
                    onSubmit={handleAddCard}
                />
                <Button label={"update cards"} onClick={onUpdateDeck} />
            </div>
        </div>
    )
}

export default Sidebar