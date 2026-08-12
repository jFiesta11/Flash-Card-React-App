import close from "../../assets/images/close-sidebar.svg";
import flash_cards from "../../assets/images/flash-card.svg";
import Button from "./Button";

function SideHeader({ onCloseSidebar, isActive }) {
  const buttonClassName = isActive
    ? "sidebar-flash-cards-btn active"
    : "sidebar-flash-cards-btn";

  return (
    <header className="sideHeader">
      <div className="sideHeader-category-container">
        <Button
          img={flash_cards}
          imgAlt="flash-cards"
          className={buttonClassName}
        />
      </div>
      <Button
        img={close}
        imgAlt="closeButton"
        className="sidebar-close-btn"
        onClick={onCloseSidebar}
      />
    </header>
  );
}

export default SideHeader;
