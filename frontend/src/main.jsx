import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.querySelector(".root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
