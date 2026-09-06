import Button from "./Button";
import flashcardIcon from "../../assets/images/flash-card.svg";
import defaultUserProfile from "../../assets/images/user-default.svg";
function SideBar({
  onShowFlashcards,
  onShowNextFeature,
  activePage = "flashcards",
}) {
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
            className="sidebar-toggle"
            img={flashcardIcon}
            imgAlt="Flashcard editor"
            ariaLabel="Flashcards"
            onClick={onShowFlashcards}
            className={`sidebar-toggle${activePage === "flashcards" ? " active" : ""}`}
          />
          <button
            type="button"
            className={`feature-entry${activePage === "blurting" ? " active" : ""}`}
            aria-label="Open blurting"
            onClick={onShowNextFeature}
          />
        </div>
      </div>
    </>
  );
}
export default SideBar;
