import { useState } from "react";
import SideHeader from "./sideHeader";
import DataContainer from "./DataContainer";
import CardForm from "./CardForm";
import Button from "./Button";
import useInputData from "../../hooks/useInputData";
import update_btn from "../../assets/images/update.svg";

function Sidebar({
  isOpen,
  onCloseSidebar,
  onAddCard,
  onRemoveCard,
  cards,
  onUpdateDeck,
  onClearAll,
}) {
  const { question, setQuestion, answer, setAnswer, addCard } = useInputData();
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleAddCard = () => {
    addCard((newCard) => {
      onAddCard?.(newCard);
    });
  };

  const handleRevealAll = () => {
    const nextShowAllAnswers = !showAllAnswers;
    setShowAllAnswers(nextShowAllAnswers);

    const nextState = {};
    cards.forEach((_, index) => {
      nextState[index] = nextShowAllAnswers;
    });
    setRevealedAnswers(nextState);
  };

  const handleToggleAnswer = (index) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleClearAll = () => {
    onClearAll?.();
    setRevealedAnswers({});
  };

  return (
    <div
      className="sidebar"
      data-sidebar="true"
      style={
        isOpen
          ? { transform: "translateX(0)" }
          : { transform: "translateX(-100%)" }
      }
    >
      <SideHeader onCloseSidebar={onCloseSidebar} isActive={true} />
      <div className="sidebar-content-container">
        <DataContainer
          cards={cards}
          onRemoveCard={onRemoveCard}
          onRevealAll={handleRevealAll}
          onClearAll={handleClearAll}
          revealedAnswers={revealedAnswers}
          onToggleAnswer={handleToggleAnswer}
        />
        <CardForm
          question={question}
          answer={answer}
          onQuestionChange={(e) => setQuestion(e.target.value)}
          onAnswerChange={(e) => setAnswer(e.target.value)}
          onSubmit={handleAddCard}
        />
        <div className="card-upd-button">
          <Button
            className="update-btn"
            label={"Update Cards"}
            img={update_btn}
            onClick={onUpdateDeck}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
