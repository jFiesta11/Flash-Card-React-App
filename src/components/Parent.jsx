import MainContent from "./MainContent/MainContent";
import SidebarContent from "./SideBar/SidebarContent";
import initialCards from "../data/questions.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Parent() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [flashCards, setFlashCards] = useState(initialCards.questions);
  const [pendingCards, setPendingCards] = useState(initialCards.questions);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (event) => {
      const clickedInsideSidebar = event.target.closest("[data-sidebar]");
      const clickedSidebarToggle = event.target.closest(
        ".sidebar-toggle, .edit-btn",
      );
      const clickedInsideUpload = event.target.closest(".upload-overlay");

      if (
        !clickedInsideSidebar &&
        !clickedSidebarToggle &&
        !clickedInsideUpload
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

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
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
        onShowFlashcards={() => navigate("/")}
        onShowNextFeature={() => {
          setIsSidebarOpen(false);
          navigate("/blurting");
        }}
      />
      <SidebarContent
        isOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
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
