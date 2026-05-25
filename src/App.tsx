import { useState, useMemo, useCallback } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { CHARACTERS } from "./data/characters";
import { AppHeader } from "./components/AppHeader";
import { OptionsRow } from "./components/OptionsRow";
import { RandomizeButton } from "./components/RandomizeButton";
import { ModeSelector } from "./components/ModeSelector";
import { TeamView } from "./components/TeamView";
import { useRoster } from "./hooks/useRoster";
import { useOptions } from "./hooks/useOptions";
import { rollMultipleTeams, applyFilter, isSustain } from "./lib/randomize";
import { ASSETS_CDN } from "./config/assets";
import type { Team } from "./types/character";

const styles = {
  page: "min-h-screen bg-gray-950 text-white",
  main: "mx-auto max-w-screen-xl px-4 py-8 sm:px-6 space-y-8",
  hero: "flex flex-col items-center gap-4",
  modeHeader: "flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white/70",
  dividerLine: "block h-px flex-1 bg-white/10",
  modeIcon: "h-5 w-5 object-contain",
  teamsGrid: "flex flex-col gap-6",
};

type TwoTeamMode = "moc" | "pf" | "as";

const MODE_ICONS: Record<TwoTeamMode | "aa", { cdn: string; local: string }> = {
  moc: { cdn: `${ASSETS_CDN}/sign/AbyssIcon02.png`,        local: "/sign/AbyssIcon02.png" },
  pf:  { cdn: `${ASSETS_CDN}/sign/ChallengeStory.png`,     local: "/sign/ChallengeStory.png" },
  as:  { cdn: `${ASSETS_CDN}/sign/ChallengeBoss.png`,      local: "/sign/ChallengeBoss.png" },
  aa:  { cdn: `${ASSETS_CDN}/sign/AbyssThemeTabIcon.png`,  local: "/sign/AbyssThemeTabIcon.png" },
};

const TWO_TEAM_LABELS: Record<TwoTeamMode, string> = {
  moc: "Memory of Chaos",
  pf: "Pure Fiction",
  as: "Apocalyptic Shadow",
};

type Result =
  | { mode: "team"; team: Team }
  | { mode: TwoTeamMode; teams: [Team, Team] }
  | { mode: "aa"; knights: [Team, Team, Team]; king: Team };

function App() {
  const [result, setResult] = useState<Result | null>(null);
  const roster = useRoster();
  const rosterIds = roster.rosterIds;
  const options = useOptions();

  const handleModeChange = useCallback((m: typeof options.mode) => {
    options.setMode(m);
  }, [options]);

  const handleRandomize = useCallback(() => {
    const filter = { includeIds: rosterIds, requireSustain: options.requireSustain };
    if (options.mode === "aa") {
      const [k1, k2, k3] = rollMultipleTeams(CHARACTERS, 3, 4, filter);
      const [king] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
      setResult({ mode: "aa", knights: [k1, k2, k3], king });
    } else if (options.mode in TWO_TEAM_LABELS) {
      const [side1, side2] = rollMultipleTeams(CHARACTERS, 2, 4, filter);
      setResult({ mode: options.mode as TwoTeamMode, teams: [side1, side2] });
    } else {
      const [team] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
      setResult({ mode: "team", team });
    }
  }, [rosterIds, options.requireSustain, options.mode]);

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

  const neededCount = options.mode === "aa" ? 12 : options.mode in TWO_TEAM_LABELS ? 8 : 4;

  const disabledReason = availableCount < neededCount
    ? "Not enough characters selected"
    : !sustainAvailable
      ? "No sustain available"
      : undefined;

  return (
    <div className={styles.page}>
      <SpeedInsights />
      <Analytics />
      <AppHeader />

      <main className={styles.main}>
        <div className={styles.hero}>
          <ModeSelector mode={options.mode} onModeChange={handleModeChange} />
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

        {result?.mode === "team" && (
          <TeamView team={result.team} label="Your Team" isInRoster={roster.isInRoster} />
        )}

        {result && result.mode !== "team" && result.mode !== "aa" && (
          <div className="space-y-4">
            <p className={styles.modeHeader}>
              <span className={styles.dividerLine} />
              <img src={MODE_ICONS[result.mode].cdn} alt="" aria-hidden className={styles.modeIcon} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = MODE_ICONS[result.mode].local; }} />
              {TWO_TEAM_LABELS[result.mode]}
              <span className={styles.dividerLine} />
            </p>
            <div className={styles.teamsGrid}>
              <TeamView team={result.teams[0]} label="Side 1" isInRoster={roster.isInRoster} layout="half" />
              <TeamView team={result.teams[1]} label="Side 2" isInRoster={roster.isInRoster} layout="half" />
            </div>
          </div>
        )}

        {result?.mode === "aa" && (
          <div className="space-y-4">
            <p className={styles.modeHeader}>
              <span className={styles.dividerLine} />
              <img src={MODE_ICONS.aa.cdn} alt="" aria-hidden className={styles.modeIcon} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = MODE_ICONS.aa.local; }} />
              Anomaly Arbitration
              <span className={styles.dividerLine} />
            </p>
            <div className={styles.teamsGrid}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                <TeamView team={result.knights[0]} label="Knight 1" isInRoster={roster.isInRoster} layout="knight" />
                <TeamView team={result.knights[1]} label="Knight 2" isInRoster={roster.isInRoster} layout="knight" />
                <TeamView team={result.knights[2]} label="Knight 3" isInRoster={roster.isInRoster} layout="knight" />
              </div>
              <TeamView team={result.king} label="King" isInRoster={roster.isInRoster} layout="half" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
