import { useCallback } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { AppHeader } from "./components/AppHeader";
import { OptionsRow } from "./components/OptionsRow";
import { RandomizeButton } from "./components/RandomizeButton";
import { ModeSelector } from "./components/ModeSelector";
import { ResultView } from "./components/ResultView";
import { ThemeSelector } from "./components/ThemeSelector";
import VERSION, { BUILD_DATE } from "./data/version";
import { useRoster } from "./hooks/useRoster";
import { useOptions } from "./hooks/useOptions";
import { useRandomizer } from "./hooks/useRandomizer";

function App() {
    const roster = useRoster();
    const options = useOptions();
    const { result, randomize, disabledReason } = useRandomizer(roster.rosterIds, options.mode, options.requireSustain);

    const handleModeChange = useCallback(
        (m: typeof options.mode) => {
            options.setMode(m);
        },
        [options]
    );

    return (
        <div className="flex min-h-screen flex-col bg-canvas text-fg">
            <SpeedInsights />
            <Analytics />
            <AppHeader />

            <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-8 sm:px-6 space-y-8">
                <div className="flex flex-col items-center gap-4">
                    <ModeSelector mode={options.mode} onModeChange={handleModeChange} />
                    <RandomizeButton onRandomize={randomize} disabledReason={disabledReason} />

                    <OptionsRow
                        rosterIds={roster.rosterIds}
                        onToggleRoster={roster.toggleRoster}
                        onEnableAll={roster.enableAll}
                        onDisableAll={roster.disableAll}
                        onImport={roster.importRoster}
                        requireSustain={options.requireSustain}
                        onRequireSustainChange={options.setRequireSustain}
                    />
                </div>

                {result && <ResultView result={result} isInRoster={roster.isInRoster} />}
            </main>

            {/* In-flow footer. Version sits bottom-right, clear of the bottom-left pinned selector. */}
            <footer className="border-t border-line px-4 pt-3 pb-4 sm:px-6">
                <div className="flex flex-col items-end text-right text-[10px] font-mono tracking-widest text-purple-500/50 dark:text-purple-300/40">
                    <span className="select-all">{VERSION}</span>
                    {BUILD_DATE && <span className="select-all">{BUILD_DATE}</span>}
                </div>
            </footer>

            {/* Pinned to the viewport bottom-left, always visible/clickable (above modals). */}
            <div className="fixed bottom-4 left-4 z-[70]">
                <ThemeSelector />
            </div>
        </div>
    );
}

export default App;
