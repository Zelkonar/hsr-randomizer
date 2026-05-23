import { RosterCard } from "./RosterCard";
import type { Character } from "../../types/character";

const styles = {
    empty: "flex flex-col items-center justify-center py-16 text-white/30",
    grid: "grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2",
};

interface RosterCharacterGridProps {
    characters: Character[];
    blacklistIds: number[];
    onToggle: (id: number) => void;
}

export function RosterCharacterGrid({ characters, blacklistIds, onToggle }: RosterCharacterGridProps) {
    if (characters.length === 0) {
        return (
            <div className={styles.empty}>
                <span className="text-3xl mb-2">∅</span>
                <p className="text-sm">No characters match your filters</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {characters.map((c) => (
                <RosterCard
                    key={c.id}
                    character={c}
                    blacklisted={blacklistIds.includes(c.id)}
                    onToggle={() => onToggle(c.id)}
                />
            ))}
        </div>
    );
}
