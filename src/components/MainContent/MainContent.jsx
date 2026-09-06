// data
import useCardNav from "../../hooks/useCardNav";
// components
import Button from "./Button";
import Statusbar from "./Statusbar";
import Card from "./Card";
import SideBar from "../MainContent/SideBar";
// assets
import editIcon from "../../assets/images/edit-btn.svg";
function MainContent({
  card,
  onToggleSidebar,
  onShowFlashcards,
  onShowNextFeature,
}) {
  const {
    shuffle,
    index,
    next,
    previous,
    flip,
    currentCard,
    flipCard,
    flashCards,
  } = useCardNav(card);
  return (
    <>
      <SideBar
        onShowFlashcards={onShowFlashcards}
        onShowNextFeature={onShowNextFeature}
      />
      <Button
        className="edit-btn"
        img={editIcon}
        onClick={onToggleSidebar}
        ariaLabel="Toggle flashcard editor"
        tooltip="Edit flashcards"
      />
      <Statusbar item={index + 1} totalItem={flashCards.length} />
      <Card
        click={flip}
        front={currentCard.question}
        back={currentCard.answer}
        showAnswer={flipCard}
      />
      <div className="btn-container">
        <Button className="card-btn" label={"Previous"} onClick={previous} />
        <Button className="card-btn" label={"Flip"} onClick={flip} />
        <Button className="card-btn" label={"Next"} onClick={next} />
        <Button className="card-btn" label={"Shuffle"} onClick={shuffle} />
      </div>
    </>
  );
}

export default MainContent;
