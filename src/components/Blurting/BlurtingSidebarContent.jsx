import closeIcon from "../../assets/images/close-sidebar.svg";

function BlurtingSidebarContent({ isOpen, onCloseSidebar, onClearPage }) {
  return (
    <aside
      className="sidebar-content blurting-sidebar-content"
      data-sidebar="true"
      role="dialog"
      aria-label="Edit blurting workspace"
      aria-hidden={!isOpen}
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(-110%)",
      }}
    >
      <header className="sideHeader blurting-sidebar-header">
        <h2>Edit blurting</h2>
        <button
          type="button"
          className="sidebar-close-btn blurting-sidebar-close"
          onClick={onCloseSidebar}
          aria-label="Close blurting editor"
        >
          <img src={closeIcon} alt="" />
        </button>
      </header>
      <div className="sidebar-content-container blurting-sidebar-panel-body">
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
