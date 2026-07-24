import SideHeader from "./sideHeader"
import Input from "./Input"
import Button from "./Button"
import DataContainer from "./DataContainer"
import useInputData from "../../hooks/useInputData"

function Sidebar({isOpen, onCloseSidebar}){
    const { question, setQuestion, answer, setAnswer, cards, addCard } = useInputData()

    return (
        <div
            className="sidebar"
            data-sidebar="true"
            style={isOpen ? { transform: "translateX(0)" } : { transform: "translateX(-100%)" }}
        >
            <SideHeader onCloseSidebar={onCloseSidebar} />
            <div className="sidebar-content-container">
                <DataContainer cards={cards} />
                <div className="inputs-container">
                    <Input placeholder={"QUESTION"} value={question} onChange={(e) => setQuestion(e.target.value)} name="question"/>
                    <Input placeholder={"answer"} value={answer} onChange={(e) => setAnswer(e.target.value)} name="answer"/>
                    <Button label={"set"} onClick={addCard}/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar