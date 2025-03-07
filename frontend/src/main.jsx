import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import {BrowserRouter, Routes} from "react-router-dom";

createRoot(document.querySelector(".root")).render(
    <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
    </BrowserRouter>
);