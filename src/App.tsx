import { useState, useMemo, useCallback } from "react";
import { CHARACTERS } from "./data/characters";
import { AppHeader } from "./components/AppHeader";
import { OptionsRow } from "./components/OptionsRow";
import { RandomizeButton } from "./components/RandomizeButton";
import { TeamView } from "./components/TeamView";
import { useRoster } from "./hooks/useRoster";
import { rollAndBuildTeam, applyFilter } from "./lib/randomize";
import type { Team } from "./types/character";

function App() {
  const [team, setTeam] = useState<Team | null>(null);
  const roster = useRoster();
  const blacklistIds = roster.blacklistIds ?? [];

  const handleRandomize = useCallback(() => {
    const team = rollAndBuildTeam(CHARACTERS, 4, { excludeIds: blacklistIds });
    setTeam(team);
  }, [blacklistIds]);

  const remainingAfterBlacklist = useMemo(
    () => applyFilter(CHARACTERS, { excludeIds: blacklistIds }),
    [blacklistIds]
  );

  const availableCount = useMemo(
    () => new Set(remainingAfterBlacklist.map((c) => c.name)).size,
    [remainingAfterBlacklist]
  );

  const canRandomize = availableCount >= 4;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AppHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 space-y-5">
        <div className="flex flex-col items-center gap-4">
          <RandomizeButton onRandomize={handleRandomize} disabled={!canRandomize} />

          <OptionsRow
            blacklistIds={blacklistIds}
            onToggleBlacklist={roster.toggleBlacklist}
            onEnableAll={roster.enableAll}
            onDisableAll={roster.disableAll}
          />
        </div>

        {team && (
          <TeamView
            team={team}
            isBlacklisted={roster.isBlacklisted}
          />
        )}
      </main>
    </div>
  );
}

export default App;