import { CHARACTERS } from "../data/characters";
import { CharacterGrid } from "./CharacterGrid";
import { HintTooltip } from "./HintTooltip";

interface RosterSectionProps {
  selectedIds: number[];
  blacklistIds: number[];
  onToggleBlacklist: (id: number) => void;
}

export function RosterSection({
  selectedIds,
  blacklistIds,
  onToggleBlacklist,
}: RosterSectionProps) {
  return (
    <section>
      <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
        <span className="block h-px flex-1 bg-white/10" />
        All Characters
        <span className="block h-px flex-1 bg-white/10" />
      </p>
      <div className="mb-4 flex justify-center">
        <HintTooltip label="Click a card to blacklist" />
      </div>
      <CharacterGrid
        characters={CHARACTERS}
        selectedIds={selectedIds}
        blacklistIds={blacklistIds}
        onToggleBlacklist={onToggleBlacklist}
      />
    </section>
  );
}
