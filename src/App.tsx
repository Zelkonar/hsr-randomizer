import { useState, useMemo, useCallback } from "react";
import { CHARACTERS } from "./data/characters";
import { AppHeader } from "./components/AppHeader";
import { OptionsRow } from "./components/OptionsRow";
import { RandomizeButton } from "./components/RandomizeButton";
import { TeamView } from "./components/TeamView";
import { useRoster } from "./hooks/useRoster";
import { rollAndBuildTeam, applyFilter } from "./lib/randomize";
import type { Team } from "./types/character";

const styles = {
  page: "min-h-screen bg-gray-950 text-white",
  main: "mx-auto max-w-screen-xl px-4 py-8 sm:px-6 space-y-5",
  hero: "flex flex-col items-center gap-4",
};

function App() {
  const [team, setTeam] = useState<Team | null>(null);
  const roster = useRoster();
  const rosterIds = roster.rosterIds;

  const handleRandomize = useCallback(() => {
    const team = rollAndBuildTeam(CHARACTERS, 4, { includeIds: rosterIds });
    setTeam(team);
  }, [rosterIds]);

  const availableCharacters = useMemo(
    () => applyFilter(CHARACTERS, { includeIds: rosterIds }),
    [rosterIds]
  );

  const availableCount = useMemo(
    () => new Set(availableCharacters.map((c) => c.name)).size,
    [availableCharacters]
  );

  const canRandomize = availableCount >= 4;

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <div className={styles.hero}>
          <RandomizeButton onRandomize={handleRandomize} disabled={!canRandomize} />

          <OptionsRow
            rosterIds={rosterIds}
            onToggleRoster={roster.toggleRoster}
            onEnableAll={roster.enableAll}
            onDisableAll={roster.disableAll}
          />
        </div>

        {team && (
          <TeamView
            team={team}
            isInRoster={roster.isInRoster}
          />
        )}
      </main>
    </div>
  );
}

export default App;
