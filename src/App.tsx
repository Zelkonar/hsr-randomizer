import { useState, useMemo, useCallback } from "react";
import { CHARACTERS } from "./data/characters";
import { CharacterGrid } from "./components/CharacterGrid";
import { RandomizeButton } from "./components/RandomizeButton";
import { TeamView } from "./components/TeamView";
import { useRoster } from "./hooks/useRoster";
import { rollAndBuildTeam, applyFilter, familyKey } from "./lib/randomize";
import type { Team } from "./types/character";

function App() {
  const [team, setTeam] = useState<Team | null>(null);
  const roster = useRoster();
  const handleRandomize = useCallback(() => {
    const team = rollAndBuildTeam(CHARACTERS, 4, {
      excludeIds: roster.blacklistIds ?? [],
    });
    setTeam(team);
  }, [roster.blacklistIds]);

  // Determine whether there are enough available character *families* to randomize a full team.
  const blacklistIds = roster.blacklistIds ?? [];

  const remainingAfterBlacklist = useMemo(
    () => applyFilter(CHARACTERS, { excludeIds: blacklistIds }),
    [blacklistIds]
  );

  const availableCount = useMemo(
    () => new Set(remainingAfterBlacklist.map((c) => familyKey(c))).size,
    [remainingAfterBlacklist]
  );

  const canRandomize = availableCount >= 4;

  const selectedIds = useMemo(
    () => (team ? team.members.map((m) => m.id) : [] as number[]),
    [team]
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="relative flex flex-col items-center justify-center border-b border-white/10 px-6 py-10 overflow-hidden">
        <span className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-purple-300/40 select-none">
          v0.0.2-alpha
        </span>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-32 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <p className="relative mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-sky-400/70 font-medium">
          <span className="block h-px w-10 bg-sky-400/30" />
          Honkai: Star Rail
          <span className="block h-px w-10 bg-sky-400/30" />
        </p>

        <h1 className="relative text-4xl sm:text-5xl font-black uppercase tracking-[0.15em] text-white drop-shadow-lg">
          <span
            style={{
              background: "linear-gradient(90deg, #7dd3fc, #a78bfa, #7dd3fc)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Randomizer
          </span>
        </h1>

        <div className="relative mt-4 flex items-center gap-2">
          <span className="block h-px w-16 bg-white/10" />
          <span className="block h-1 w-1 rounded-full bg-sky-400/50" />
          <span className="block h-px w-16 bg-white/10" />
        </div>
      </header>

      <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 space-y-10">

        {/* Randomize button */}
        <div className="flex justify-center">
          <RandomizeButton onRandomize={handleRandomize} disabled={!canRandomize} />
        </div>

        {/* Team display */}
        {team && (
          <TeamView
            team={team}
            isBlacklisted={roster.isBlacklisted}
            toggleBlacklist={roster.toggleBlacklist}
          />
        )}

        {/* Full roster */}
        <section>
          <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
            <span className="block h-px flex-1 bg-white/10" />
            All Characters
            <span className="block h-px flex-1 bg-white/10" />
          </p>
          <div className="mb-4 flex justify-center">
            <div className="relative inline-block group">
              <button
                type="button"
                aria-describedby="allchars-hint"
                className="w-8 h-8 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-sm font-bold text-white/90 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
              >
                ?
              </button>

              <div
                id="allchars-hint"
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 w-max max-w-xs opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150"
              >
                <div className="px-3 py-2 rounded bg-gray-900/95">
                  <span className="text-sm italic text-gray-300">Click a card to blacklist</span>
                </div>
              </div>
            </div>
          </div>
          <CharacterGrid
            characters={CHARACTERS}
            selectedIds={selectedIds}
            blacklistIds={blacklistIds}
            onToggleBlacklist={roster.toggleBlacklist}
          />
        </section>

      </main>
    </div>
  );
}

export default App;
