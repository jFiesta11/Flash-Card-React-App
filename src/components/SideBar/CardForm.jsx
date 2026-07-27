import Input from "./Input";
import Button from "./Button";
import set from "../../assets/images/set.svg"

function CardForm({ question, answer, onQuestionChange, onAnswerChange, onSubmit }) {
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="inputs-container">
            <div className="question-input">
                <Input value={question} onChange={onQuestionChange} />
            </div>
            <div className="answer-input">
                <Input value={answer} onChange={onAnswerChange} onKeyDown={handleKeyDown} />
            </div>
            <Button onClick={onSubmit} className={"setButton"} img={set} imgAlt={"update"}/>
        </div>
    );
}

export default CardForm;
