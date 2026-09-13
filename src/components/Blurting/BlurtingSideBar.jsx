import blurtingIcon from "../../assets/images/blurting.svg";
import flashcardIcon from "../../assets/images/flash-card.svg";
import defaultUserProfile from "../../assets/images/user-default.svg";

function BlurtingSideBar({ onShowFlashcards }) {
  return (
    <aside className="sidebar" aria-label="Blurting navigation">
      <div className="user-buttons">
        <button type="button" className="sidebar-user-profile">
          <img src={defaultUserProfile} alt="User profile" />
        </button>
      </div>
      <div className="reviewer-buttons">
        <button
          type="button"
          className="sidebar-toggle"
          aria-label="Open flashcards"
          title="Open flashcards"
          onClick={onShowFlashcards}
        >
          <img src={flashcardIcon} alt="" />
        </button>
        <button
          type="button"
          className="sidebar-toggle active"
          aria-label="Blurting workspace"
          title="Blurting workspace"
        >
          <img src={blurtingIcon} alt="" />
        </button>
      </div>
    </aside>
  );
}

export default BlurtingSideBar;
