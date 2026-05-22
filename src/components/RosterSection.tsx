import { useState } from "react";
import { CHARACTERS } from "../data/characters";
import { CharacterGrid } from "./CharacterGrid";
import { RosterModal } from "./RosterModal";

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
  const [modalOpen, setModalOpen] = useState(false);

  // Roster = everyone who isn't blacklisted
  const rosterCharacters = CHARACTERS.filter((c) => !blacklistIds.includes(c.id));

  return (
    <>
      <section>
        <div className="mb-4 flex items-center gap-3">
          <span className="block h-px flex-1 bg-white/10" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">My Roster</p>
          <span className="block h-px flex-1 bg-white/10" />
        </div>

        <div className="mb-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="
              flex items-center gap-2 rounded-lg border border-white/15
              bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase
              tracking-widest text-white/60 transition-all duration-150
              hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-300
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              <path d="M13.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
            </svg>
            Manage Roster
          </button>
        </div>

        <CharacterGrid
          characters={rosterCharacters}
          selectedIds={selectedIds}
          blacklistIds={blacklistIds}
        />
      </section>

      <RosterModal
        open={modalOpen}
        blacklistIds={blacklistIds}
        onToggleBlacklist={onToggleBlacklist}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}