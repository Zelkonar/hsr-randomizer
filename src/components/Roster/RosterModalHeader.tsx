import { CHARACTERS } from "../../data/characters";

const styles = {
    row: "flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0",
    title: "text-sm font-bold tracking-widest uppercase text-white",
    subtitle: "text-[11px] text-white/40 mt-0.5",
    closeButton: "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors",
};

interface RosterModalHeaderProps {
    rosterIds: number[];
    onClose: () => void;
}

export function RosterModalHeader({ rosterIds, onClose }: RosterModalHeaderProps) {
    return (
        <div className={styles.row}>
            <div>
                <h2 className={styles.title}>Manage Roster</h2>
                <p className={styles.subtitle}>
                    {rosterIds.length} of {CHARACTERS.length} characters active
                </p>
            </div>
            <button onClick={onClose} className={styles.closeButton}>✕</button>
        </div>
    );
}
