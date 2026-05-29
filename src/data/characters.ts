// Character data is loaded at runtime from R2 (see loadCharacters.ts) and lives
// here as a module-level array. main.tsx calls setCharacters() before importing
// <App>, so every consumer that reads CHARACTERS at module scope sees the
// populated data.
import type { Character } from "../types/character";

export let CHARACTERS: Character[] = [];

export function setCharacters(characters: Character[]): void {
    CHARACTERS = characters;
}
