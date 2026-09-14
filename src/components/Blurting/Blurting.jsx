import BlurtingSideBar from "./BlurtingSideBar";
import BlurtingSidebarContent from "./BlurtingSidebarContent";
import Canvas from "./Canvas";
import Button from "../Flashcard/Button";
import editIcon from "../../assets/images/edit-btn.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Blurting() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormatBarOpen, setIsFormatBarOpen] = useState(false);
  const [clearSignal, setClearSignal] = useState(0);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (event) => {
      const clickedInsideSidebar = event.target.closest("[data-sidebar]");
      const clickedEditButton = event.target.closest(".blurting-edit-btn");
      const clickedFormatButton = event.target.closest(".blurting-format-btn");
      const clickedFormatBar = event.target.closest(".blurting-format-bar");

      if (
        !clickedInsideSidebar &&
        !clickedEditButton &&
        !clickedFormatButton &&
        !clickedFormatBar
      ) {
        setIsSidebarOpen(false);
        setIsFormatBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      <BlurtingSideBar onShowFlashcards={() => navigate("/")} />
      <Button
        className="blurting-edit-btn"
        img={editIcon}
        onClick={() => setIsSidebarOpen((open) => !open)}
        ariaLabel="Toggle blurting editor"
        tooltip="Edit blurting"
      />
      <button
        type="button"
        className="blurting-format-btn"
        onClick={() => setIsFormatBarOpen((open) => !open)}
        aria-label="Toggle text formatting toolbar"
        data-tooltip="Format text"
        aria-expanded={isFormatBarOpen}
      >
        Aa
      </button>
      <main className="blurting-page">
        <Canvas clearSignal={clearSignal} isFormatBarOpen={isFormatBarOpen} />
      </main>
      <BlurtingSidebarContent
        isOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        onClearPage={() => setClearSignal((signal) => signal + 1)}
      />
    </>
  );
}

export default Blurting;
