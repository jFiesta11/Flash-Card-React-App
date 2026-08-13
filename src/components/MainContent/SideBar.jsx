import Button from "./Button";
import flashcardIcon from "../../assets/images/flash-card.svg";
import defaultUserProfile from "../../assets/images/user-default.svg";
function SideBar({ OpenSideBar }) {
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
            className="open-sidebar"
            img={flashcardIcon}
            imgAlt="openSideBar"
            onClick={OpenSideBar}
          />
        </div>
      </div>
    </>
  );
}
export default SideBar;
