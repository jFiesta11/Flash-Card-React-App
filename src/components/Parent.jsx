import MainContent from "./MainContent/MainContent";
import SidebarContent from "./SideBar/SidebarContent";
import initialCards from "../data/questions.json";
import { useEffect, useState } from "react";

function Parent() {
  const [openSideBar, setOpenSidebar] = useState(false);
  const [flashCards, setFlashCards] = useState(initialCards.questions);
  const [pendingCards, setPendingCards] = useState(initialCards.questions);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (!openSideBar) return;

    const handleClickOutside = (event) => {
      const clickedInsideSidebar = event.target.closest("[data-sidebar]");
      const clickedOpenButton = event.target.closest(".open-sidebar");
      const clickedInsideUpload = event.target.closest(".upload-overlay");

      if (!clickedInsideSidebar && !clickedOpenButton && !clickedInsideUpload) {
        setOpenSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSideBar]);

  const handleAddCard = (newCard) => {
    setPendingCards((prevCards) => [...prevCards, newCard]);
  };

  const handleRemoveCard = (indexToRemove) => {
    setPendingCards((prevCards) =>
      prevCards.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleUpdateDeck = () => {
    setFlashCards([...pendingCards]);
  };

  const handleClearAll = () => {
    setPendingCards([]);
    setFlashCards([]);
  };
  const handleUploadFile = async (file) => {
    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate flashcards");
      }

      const data = await response.json();
      const generatedCards = data.flashcards?.questions;

      if (!Array.isArray(generatedCards)) {
        throw new Error("The server returned an invalid flashcard list");
      }

      // append to the current deck instead of replacing every previous card.
      setPendingCards((prevCards) => [...prevCards, ...generatedCards]);
      return true;
    } catch (error) {
      setUploadError(error.message || "Failed to generate flashcards");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <MainContent
        card={{ questions: flashCards }}
        onOpenSidebar={() => setOpenSidebar((open) => !open)}
      />

      <SidebarContent
        isOpen={openSideBar}
        onCloseSidebar={() => setOpenSidebar(false)}
        onAddCard={handleAddCard}
        onRemoveCard={handleRemoveCard}
        cards={pendingCards}
        onUpdateDeck={handleUpdateDeck}
        onClearAll={handleClearAll}
        onUploadFile={handleUploadFile}
        isUploading={isUploading}
        uploadError={uploadError}
      />
    </>
  );
}

export default Parent;
