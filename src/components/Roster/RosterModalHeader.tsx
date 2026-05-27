import { CHARACTERS } from "../../data/characters";

const styles = {
    row: "flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0",
    title: "text-sm font-bold tracking-widest uppercase text-white",
    subtitle: "text-[11px] text-white/40 mt-0.5",
    actions: "flex items-center gap-2",
    actionButton: "flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/10 text-white/50 text-[11px] font-semibold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors",
    closeButton: "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors",
};

interface RosterModalHeaderProps {
    rosterIds: number[];
    onExport: () => void;
    onImport: () => void;
    onClose: () => void;
}

export function RosterModalHeader({ rosterIds, onExport, onImport, onClose }: RosterModalHeaderProps) {
    return (
        <div className={styles.row}>
            <div>
                <h2 className={styles.title}>Manage Roster</h2>
                <p className={styles.subtitle}>
                    {rosterIds.length} of {CHARACTERS.length} characters active
                </p>
            </div>
            <div className={styles.actions}>
                <button onClick={onExport} className={styles.actionButton}>Export</button>
                <button onClick={onImport} className={styles.actionButton}>Import</button>
                <button onClick={onClose} className={styles.closeButton}>✕</button>
            </div>
        </div>
    );
}
