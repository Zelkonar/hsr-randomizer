import { useCallback } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { AppHeader } from "./components/AppHeader";
import { OptionsRow } from "./components/OptionsRow";
import { RandomizeButton } from "./components/RandomizeButton";
import { ModeSelector } from "./components/ModeSelector";
import { ResultView } from "./components/ResultView";
import { useRoster } from "./hooks/useRoster";
import { useOptions } from "./hooks/useOptions";
import { useRandomizer } from "./hooks/useRandomizer";

const styles = {
  page: "min-h-screen bg-gray-950 text-white",
  main: "mx-auto max-w-screen-xl px-4 py-8 sm:px-6 space-y-8",
  hero: "flex flex-col items-center gap-4",
};

function App() {
  const roster = useRoster();
  const options = useOptions();
  const { result, randomize, disabledReason } = useRandomizer(
    roster.rosterIds,
    options.mode,
    options.requireSustain,
  );

  const handleModeChange = useCallback((m: typeof options.mode) => {
    options.setMode(m);
  }, [options]);

  return (
    <div className={styles.page}>
      <SpeedInsights />
      <Analytics />
      <AppHeader />

      <main className={styles.main}>
        <div className={styles.hero}>
          <ModeSelector mode={options.mode} onModeChange={handleModeChange} />
          <RandomizeButton onRandomize={randomize} disabledReason={disabledReason} />

          <OptionsRow
            rosterIds={roster.rosterIds}
            onToggleRoster={roster.toggleRoster}
            onEnableAll={roster.enableAll}
            onDisableAll={roster.disableAll}
            requireSustain={options.requireSustain}
            onRequireSustainChange={options.setRequireSustain}
          />
        </div>

        {result && <ResultView result={result} isInRoster={roster.isInRoster} />}
      </main>
    </div>
  );
}

export default App;
