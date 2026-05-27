import { CHARACTERS } from "../../data/characters";

const styles = {
    row: "flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0",
    title: "text-sm font-bold tracking-widest uppercase text-white",
    subtitle: "text-[11px] text-white/40 mt-0.5",
    actions: "flex items-center gap-2",
    actionButton: "flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/10 text-white/50 text-[11px] font-semibold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors whitespace-nowrap",
    closeButton: "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors",
};

interface RosterModalHeaderProps {
    rosterIds: number[];
    savedCount: number;
    savedOpen: boolean;
    onToggleSaved: () => void;
    onExport: () => void;
    onImport: () => void;
    onClose: () => void;
}

export function RosterModalHeader({ rosterIds, savedCount, savedOpen, onToggleSaved, onExport, onImport, onClose }: RosterModalHeaderProps) {
    return (
        <div className={styles.row}>
            <div>
                <h2 className={styles.title}>Manage Roster</h2>
                <p className={styles.subtitle}>
                    {rosterIds.length} of {CHARACTERS.length} characters active
                </p>
            </div>
            <div className={styles.actions}>
                <button
                    onClick={onToggleSaved}
                    className={savedOpen ? styles.actionButton + " border-white/30 text-white" : styles.actionButton}
                >
                    Saved{savedCount > 0 ? ` (${savedCount})` : ""}
                </button>
                <button onClick={onExport} className={styles.actionButton}>Export</button>
                <button onClick={onImport} className={styles.actionButton}>Import</button>
                <button onClick={onClose} className={styles.closeButton}>✕</button>
            </div>
        </div>
    );
}
