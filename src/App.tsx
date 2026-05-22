import { useState } from "react";
import { CHARACTERS } from "./data/characters";
import { CharacterGrid } from "./components/CharacterGrid";
import { CharacterCard } from "./components/CharacterCard";
import { useRoster } from "./hooks/useRoster";
import { rollAndBuildTeam, applyFilter, familyKey } from "./lib/randomize";
import type { Team } from "./types/character";

function App() {
  const [team, setTeam] = useState<Team | null>(null);
  const roster = useRoster();

  function handleRandomize() {
    const team = rollAndBuildTeam(CHARACTERS, 4, {
      excludeIds: [...roster.blacklist],
    });
    setTeam(team);
  }

  // Determine whether there are enough available character *families* to randomize a full team.
  const remainingAfterBlacklist = applyFilter(CHARACTERS, {
    excludeIds: [...roster.blacklist],
  });
  const families = new Set(remainingAfterBlacklist.map((c) => familyKey(c)));
  const availableCount = families.size;
  const canRandomize = availableCount >= 4;

  const selectedIds = team
    ? new Set(team.members.map((m) => m.id))
    : new Set<number>();

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
          <div className="flex flex-col items-center">
            <button
              onClick={handleRandomize}
              disabled={!canRandomize}
              className={[
                "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-10 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white/5 border border-white/20",
                canRandomize
                  ? "hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-sky-300 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95"
                  : "opacity-50 cursor-not-allowed",
              ].join(" ")}
            >
              {/* Subtle animated shimmer */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span>✦</span>
              <span>Randomize</span>
              <span>✦</span>
            </button>

            {!canRandomize && (
              <p className="mt-2 text-center text-sm text-rose-400">
                Too many characters are blacklisted — add more characters to randomize.
              </p>
            )}
          </div>
        </div>

        {/* Team display */}
        {team && (
          <section>
            <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
              <span className="block h-px flex-1 bg-white/10" />
              Your Team
              <span className="block h-px flex-1 bg-white/10" />
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {team.members.map((member) => (
                <CharacterCard
                  key={member.id}
                  character={member}
                  selected
                  blacklisted={roster.isBlacklisted(member.id)}
                  onToggleBlacklist={roster.toggleBlacklist}
                />
              ))}
            </div>
          </section>
        )}

        {/* Full roster */}
        <section>
          <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
            <span className="block h-px flex-1 bg-white/10" />
            All Characters
            <span className="block h-px flex-1 bg-white/10" />
          </p>
          <CharacterGrid
            characters={CHARACTERS}
            selectedIds={selectedIds}
            blacklist={roster.blacklist}
            onToggleBlacklist={roster.toggleBlacklist}
          />
        </section>

      </main>
    </div>
  );
}

export default App;
