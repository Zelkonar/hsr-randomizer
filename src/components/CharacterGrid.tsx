import type { Character } from "../types/character";
import { memo } from "react";
import { CharacterCard } from "./CharacterCard";

interface Props {
  characters: Character[];
  selectedIds?: number[];
  onCardClick?: (character: Character) => void;
  /** IDs of blacklisted characters */
  blacklistIds?: number[];
  /** Toggle blacklist state for a character id */
  onToggleBlacklist?: (id: number) => void;
}

function CharacterGridImpl({
  characters,
  selectedIds,
  onCardClick,
  blacklistIds,
  onToggleBlacklist,
}: Props) {
  if (characters.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No characters found.
      </div>
    );
  }

  const blacklistSet = blacklistIds ? new Set(blacklistIds) : new Set<number>();
  const selectedSet = selectedIds ? new Set(selectedIds) : new Set<number>();

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
          selected={selectedSet.has(c.id)}
          onClick={onCardClick}
          blacklisted={blacklistSet.has(c.id)}
          onToggleBlacklist={onToggleBlacklist}
        />
      ))}
    </div>
  );
}

export const CharacterGrid = memo(CharacterGridImpl);
