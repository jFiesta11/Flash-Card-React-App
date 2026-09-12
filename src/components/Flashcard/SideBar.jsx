import Button from "./Button";
import flashcardIcon from "../../assets/images/flash-card.svg";
import blurtingIcon from "../../assets/images/blurting.svg";
import defaultUserProfile from "../../assets/images/user-default.svg";

function SideBar({ onShowFlashcards, onShowBlurting }) {
  return (
    <>
      <div className="sidebar">
        <div className="user-buttons">
          <Button
            className={"sidebar-user-profile"}
            img={defaultUserProfile}
            imgAlt={"defaultUserProfile"}
          />
        </div>
        <div className="reviewer-buttons">
          <Button
            className="sidebar-toggle active"
            img={flashcardIcon}
            imgAlt="Flashcard editor"
            ariaLabel="Flashcards"
            onClick={onShowFlashcards}
          />
          <button
            type="button"
            className="sidebar-toggle"
            aria-label="Open blurting"
            title="Open blurting"
            onClick={onShowBlurting}
          >
            <img src={blurtingIcon} alt="Blurting workspace" />
          </button>
        </div>
      </div>
    </>
  );
}
export default SideBar;
