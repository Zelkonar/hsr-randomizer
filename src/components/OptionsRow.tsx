import { useState } from "react";
import { RosterModal } from "./Roster/RosterModal";
import { Tooltip } from "./Tooltip";

const styles = {
    optionsSection: "flex flex-col items-center gap-2 mt-1",
    optionRow: "flex items-center gap-2",
    button: "flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/40 transition-all duration-150 hover:border-sky-500/40 hover:bg-sky-500/8 hover:text-sky-400/80 active:scale-95",
    checkboxLabel: "flex items-center gap-2 cursor-pointer select-none group",
    checkboxText: "text-[11px] font-semibold uppercase tracking-widest text-white/40 transition-colors group-hover:text-white/60",
    checkboxBox: (checked: boolean) =>
        `flex h-3.5 w-3.5 items-center justify-center rounded border transition-all duration-150 ${
            checked
                ? "border-sky-500/60 bg-sky-500/20 text-sky-300"
                : "border-white/20 bg-white/5 group-hover:border-white/35"
        }`,
};

const SUSTAIN_TOOLTIP = "Guarantees at least one sustain in the team: any Preservation or Abundance character, or Hyacine.";

interface OptionsRowProps {
    rosterIds: number[];
    onToggleRoster: (id: number) => void;
    onEnableAll: (ids: number[]) => void;
    onDisableAll: (ids: number[]) => void;
    onImport: (ids: number[]) => void;
    requireSustain: boolean;
    onRequireSustainChange: (value: boolean) => void;
}

export function OptionsRow({
    rosterIds,
    onToggleRoster,
    onEnableAll,
    onDisableAll,
    onImport,
    requireSustain,
    onRequireSustainChange,
}: OptionsRowProps) {
    const [rosterOpen, setRosterOpen] = useState(false);

    return (
        <>
            <div className={styles.optionsSection}>
                <div>
                    <button onClick={() => setRosterOpen(true)} className={styles.button}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            <path d="M13.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
                        </svg>
                        Manage Roster
                    </button>
                </div>

                <div className={styles.optionRow}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={requireSustain}
                            onChange={(e) => onRequireSustainChange(e.target.checked)}
                        />
                        <span className={styles.checkboxBox(requireSustain)}>
                            {requireSustain && (
                                <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="1.5,5 4,7.5 8.5,2.5" />
                                </svg>
                            )}
                        </span>
                        <span className={styles.checkboxText}>Include sustain</span>
                    </label>
                    <Tooltip text={SUSTAIN_TOOLTIP} />
                </div>
            </div>

            <RosterModal
                open={rosterOpen}
                rosterIds={rosterIds}
                onToggleRoster={onToggleRoster}
                onEnableAll={onEnableAll}
                onDisableAll={onDisableAll}
                onImport={onImport}
                onClose={() => setRosterOpen(false)}
            />
        </>
    );
}
