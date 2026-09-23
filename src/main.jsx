import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebFont from "webfontloader";
import "./styles/index.css";
import App from "./App.jsx";

WebFont.load({
  google: {
    families: ["Margarine:400", "Indie Flower:400"],
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
