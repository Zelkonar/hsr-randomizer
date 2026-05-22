import type { Element } from "./element";
import type { Path } from "./path";
import type { Rarity } from "./rarity";

export type { Element } from "./element";
export type { Path } from "./path";
export type { Rarity } from "./rarity";

export interface Character {
  id: number;
  name: string;
  element: Element;
  path: Path;
  rarity: Rarity;
  icon: string;
  preview: string;
  portrait: string;
}

export interface Team {
  id: string;
  // Allow teams of 1–4 members.
  members:
    | [Character]
    | [Character, Character]
    | [Character, Character, Character]
    | [Character, Character, Character, Character];
  createdAt: number; // unix ms
  label?: string;
}

export interface CharacterFilter {
  elements?: Element[];
  paths?: Path[];
  rarities?: Rarity[];
  excludeIds?: string[];
}
