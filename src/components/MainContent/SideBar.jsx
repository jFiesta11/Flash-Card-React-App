import Button from "./Button";
import flashcardIcon from "../../assets/images/flash-card.svg";
function SideBar({ OpenSideBar }) {
  return (
    <>
      <div className="sidebar">
        <Button
          className="open-sidebar"
          img={flashcardIcon}
          imgAlt="openSideBar"
          onClick={OpenSideBar}
        />
      </div>
    </>
  );
}
export default SideBar;
