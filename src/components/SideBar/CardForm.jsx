import Input from "./Input";
import Button from "./Button";

function CardForm({ question, answer, onQuestionChange, onAnswerChange, onSubmit }) {
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="inputs-container">
            <Input placeholder={"QUESTION"} value={question} onChange={onQuestionChange} name="question" />
            <Input placeholder={"answer"} value={answer} onChange={onAnswerChange} name="answer" onKeyDown={handleKeyDown} />
            <Button label={"set"} onClick={onSubmit} />
        </div>
    );
}

export default CardForm;
