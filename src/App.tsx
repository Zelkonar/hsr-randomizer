import { useState, useMemo, useCallback } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CHARACTERS } from "./data/characters";
import { AppHeader } from "./components/AppHeader";
import { OptionsRow } from "./components/OptionsRow";
import { RandomizeButton } from "./components/RandomizeButton";
import { TeamView } from "./components/TeamView";
import { useRoster } from "./hooks/useRoster";
import { useOptions } from "./hooks/useOptions";
import { rollAndBuildTeam, applyFilter, isSustain } from "./lib/randomize";
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
  const options = useOptions();

  const handleRandomize = useCallback(() => {
    const team = rollAndBuildTeam(CHARACTERS, 4, {
      includeIds: rosterIds,
      requireSustain: options.requireSustain,
    });
    setTeam(team);
  }, [rosterIds, options.requireSustain]);

  const availableCharacters = useMemo(
    () => applyFilter(CHARACTERS, { includeIds: rosterIds }),
    [rosterIds]
  );

  const availableCount = useMemo(
    () => new Set(availableCharacters.map((c) => c.name)).size,
    [availableCharacters]
  );

  const sustainAvailable = useMemo(
    () => !options.requireSustain || availableCharacters.some(isSustain),
    [options.requireSustain, availableCharacters]
  );

  const disabledReason = availableCount < 4
    ? "Not enough characters selected"
    : !sustainAvailable
      ? "No sustain available"
      : undefined;

  return (
    <div className={styles.page}>
      <SpeedInsights />
      <AppHeader />

      <main className={styles.main}>
        <div className={styles.hero}>
          <RandomizeButton onRandomize={handleRandomize} disabledReason={disabledReason} />

          <OptionsRow
            rosterIds={rosterIds}
            onToggleRoster={roster.toggleRoster}
            onEnableAll={roster.enableAll}
            onDisableAll={roster.disableAll}
            requireSustain={options.requireSustain}
            onRequireSustainChange={options.setRequireSustain}
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
