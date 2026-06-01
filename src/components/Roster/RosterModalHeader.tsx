import { cn } from "../../lib/cn";
import { CHARACTERS } from "../../data/characters";

const actionButton =
    "flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-300 text-gray-500 text-[11px] font-semibold uppercase tracking-widest hover:text-gray-900 hover:border-gray-400 transition-colors whitespace-nowrap dark:border-white/10 dark:text-white/50 dark:hover:text-white dark:hover:border-white/30";

interface RosterModalHeaderProps {
    rosterIds: number[];
    savedCount: number;
    savedOpen: boolean;
    onToggleSaved: () => void;
    onExport: () => void;
    onImport: () => void;
    onClose: () => void;
}

export function RosterModalHeader({
    rosterIds,
    savedCount,
    savedOpen,
    onToggleSaved,
    onExport,
    onImport,
    onClose,
}: RosterModalHeaderProps) {
    return (
        <div className="flex items-center justify-between px-3 sm:px-5 py-4 border-b border-gray-200 dark:border-white/10 shrink-0">
            <div className="min-w-0">
                <h2 className="text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white truncate">
                    Manage Roster
                </h2>
                <p className="text-[11px] text-gray-500 dark:text-white/40 mt-0.5 truncate">
                    {rosterIds.length} of {CHARACTERS.length} characters active
                </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={onToggleSaved}
                    className={cn(
                        actionButton,
                        savedOpen && "border-gray-400 text-gray-900 dark:border-white/30 dark:text-white"
                    )}
                >
                    Saved{savedCount > 0 ? ` (${savedCount})` : ""}
                </button>
                <button onClick={onExport} className={actionButton}>
                    Export
                </button>
                <button onClick={onImport} className={actionButton}>
                    Import
                </button>
                <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors dark:border-white/10 dark:text-white/50 dark:hover:text-white dark:hover:border-white/30"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
