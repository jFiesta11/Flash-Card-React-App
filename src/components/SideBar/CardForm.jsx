import Input from "./Input";
import Button from "./Button";
import set from "../../assets/images/set.svg";
import more from "../../assets/images/more.svg";
function CardForm({
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
  onSubmit,
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="inputs-container">
      <Button className="more-options" img={more} />
      <div className="question-input">
        <Input
          value={question}
          onChange={onQuestionChange}
          placeholder={"Type Question..."}
        />
      </div>
      <div className="answer-input">
        <Input
          value={answer}
          onChange={onAnswerChange}
          onKeyDown={handleKeyDown}
          placeholder={"Type Answer..."}
        />
      </div>
      <div className="form-button-container">
        <Button
          onClick={onSubmit}
          className={"setButton"}
          img={set}
          imgAlt={"update"}
        />
      </div>
    </div>
  );
}

export default CardForm;
