import Parent from "./components/Parent.jsx";
import Blurting from "./components/Blurting/Blurting.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./styles/App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <section className="content-container">
              <Parent />
            </section>
          }
        />
        <Route path="/blurting" element={<Blurting />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
