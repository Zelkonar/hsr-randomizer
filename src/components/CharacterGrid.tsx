import type { Character } from "../types/character";
import { CharacterCard } from "./CharacterCard";

interface Props {
  characters: Character[];
  selectedIds?: Set<number>;
  onCardClick?: (character: Character) => void;
}

export function CharacterGrid({ characters, selectedIds, onCardClick }: Props) {
  if (characters.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No characters found.
      </div>
    );
  }

  return (
    <div
      className={[
        "grid gap-3",
        "grid-cols-3",
        "sm:grid-cols-4",
        "md:grid-cols-5",
        "lg:grid-cols-6",
        "xl:grid-cols-8",
      ].join(" ")}
    >
      {characters.map((c) => (
        <CharacterCard
          key={c.id}
          character={c}
          selected={selectedIds?.has(c.id)}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
