import SideBar from "../Flashcard/SideBar";
import Canvas from "./Canvas";
import { Link, useNavigate } from "react-router-dom";

function Blurting() {
  const navigate = useNavigate();
  return (
    <>
      <SideBar
        onShowFlashcards={() => navigate("/")}
        onShowNextFeature={() => navigate("/blurting")}
        activePage="blurting"
      />
      <main className="blurting-page">
        <Canvas />
      </main>
    </>
  );
}

export default Blurting;
