import { Link, useNavigate } from "react-router-dom";
import SideBar from "./MainContent/SideBar";

function Blurting() {
  const navigate = useNavigate();

  return (
    <main>
      <SideBar
        onShowFlashcards={() => navigate("/")}
        onShowNextFeature={() => navigate("/blurting")}
        activePage="blurting"
      />
      <h1>Blurting</h1>
      <p>This route is ready for the blurting feature.</p>
      <Link to="/">Back to flashcards</Link>
    </main>
  );
}

export default Blurting;
