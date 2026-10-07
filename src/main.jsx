import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebFont from "webfontloader";
import "./styles/index.css";
import App from "./App.jsx";

WebFont.load({
  google: {
    families: [
      "Open Sans:400,500,600,700",
      "Roboto:400,500,700",
      "Lato:400,700",
      "Inter:400,500,600,700",
      "Lora:400,500,600,700",
      "Merriweather:400,700",
      "Courier Prime:400,700",
      "Fira Code:400,500,700",
      "Margarine:400",
      "Indie Flower:400",
    ],
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
