import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { loadCharacters } from "./data/loadCharacters";
import { setCharacters } from "./data/characters";

// Load character data before rendering so that consumers reading CHARACTERS at
// module scope (e.g. useRoster's ALL_IDS) see populated data. <App> is imported
// dynamically only after setCharacters() to guarantee that ordering.
const characters = await loadCharacters();
setCharacters(characters);

const { default: App } = await import("./App.tsx");

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
