import { useState } from "react";
import { RosterModal } from "./Roster/RosterModal";

const styles = {
    row: "flex items-center gap-2",
    button: "flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/40 transition-all duration-150 hover:border-sky-500/40 hover:bg-sky-500/8 hover:text-sky-400/80 active:scale-95",
};

interface OptionsRowProps {
    rosterIds: number[];
    onToggleRoster: (id: number) => void;
    onEnableAll: (ids: number[]) => void;
    onDisableAll: (ids: number[]) => void;
}

export function OptionsRow({
    rosterIds,
    onToggleRoster,
    onEnableAll,
    onDisableAll,
}: OptionsRowProps) {
    const [rosterOpen, setRosterOpen] = useState(false);

    return (
        <>
            <div className={styles.row}>
                <button onClick={() => setRosterOpen(true)} className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        <path d="M13.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
                    </svg>
                    Manage Roster
                </button>
            </div>

            <RosterModal
                open={rosterOpen}
                rosterIds={rosterIds}
                onToggleRoster={onToggleRoster}
                onEnableAll={onEnableAll}
                onDisableAll={onDisableAll}
                onClose={() => setRosterOpen(false)}
            />
        </>
    );
}
