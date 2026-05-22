import { useState, useMemo, useCallback } from "react";
import { CHARACTERS } from "./data/characters";
import { AppHeader } from "./components/AppHeader";
import { RosterSection } from "./components/RosterSection";
import { RandomizeButton } from "./components/RandomizeButton";
import { TeamView } from "./components/TeamView";
import { useRoster } from "./hooks/useRoster";
import { rollAndBuildTeam, applyFilter, familyKey } from "./lib/randomize";
import type { Team } from "./types/character";

function App() {
  const [team, setTeam] = useState<Team | null>(null);
  const roster = useRoster();
  const blacklistIds = roster.blacklistIds ?? [];

  const handleRandomize = useCallback(() => {
    const team = rollAndBuildTeam(CHARACTERS, 4, {
      excludeIds: blacklistIds,
    });
    setTeam(team);
  }, [blacklistIds]);

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
      <AppHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 space-y-10">
        <div className="flex justify-center">
          <RandomizeButton onRandomize={handleRandomize} disabled={!canRandomize} />
        </div>

        {team && (
          <TeamView
            team={team}
            isBlacklisted={roster.isBlacklisted}
            toggleBlacklist={roster.toggleBlacklist}
          />
        )}

        <RosterSection
          selectedIds={selectedIds}
          blacklistIds={blacklistIds}
          onToggleBlacklist={roster.toggleBlacklist}
        />
      </main>
    </div>
  );
}

export default App;
