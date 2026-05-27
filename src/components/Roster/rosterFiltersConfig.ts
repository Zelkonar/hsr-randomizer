import type { Element, Path, Rarity } from "../../types/character";

export const ELEMENTS: Element[] = ["Fire", "Ice", "Lightning", "Wind", "Quantum", "Imaginary", "Physical"];

export const PATHS: Path[] = [
    "The Hunt",
    "Destruction",
    "Erudition",
    "Harmony",
    "Nihility",
    "Preservation",
    "Abundance",
    "Remembrance",
    "Elation",
];

export interface RosterFiltersState {
    search: string;
    elements: Set<Element>;
    paths: Set<Path>;
    rarities: Set<Rarity>;
}

export const EMPTY_FILTERS: RosterFiltersState = {
    search: "",
    elements: new Set(),
    paths: new Set(),
    rarities: new Set(),
};
