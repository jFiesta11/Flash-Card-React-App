import closeIcon from "../../assets/images/close-sidebar.svg";

function BlurtingSidebarContent({ isOpen, onCloseSidebar, onClearPage }) {
  return (
    <aside
      className="blurting-sidebar-content"
      data-blurting-sidebar="true"
      role="dialog"
      aria-label="Edit blurting workspace"
      aria-hidden={!isOpen}
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(-110%)",
      }}
    >
      <header className="blurting-sidebar-header">
        <h2>Edit blurting</h2>
        <button
          type="button"
          className="blurting-sidebar-close"
          onClick={onCloseSidebar}
          aria-label="Close blurting editor"
        >
          <img src={closeIcon} alt="" />
        </button>
      </header>
      <div className="blurting-sidebar-panel-body">
        <p>Manage your active recall workspace.</p>
        <button
          type="button"
          className="blurting-clear-button"
          onClick={onClearPage}
        >
          Clear page
        </button>
      </div>
    </aside>
  );
}

export default BlurtingSidebarContent;
