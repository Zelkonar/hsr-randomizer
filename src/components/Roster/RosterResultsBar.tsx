const styles = {
    row: "px-5 py-2 shrink-0 flex items-center justify-between gap-3",
    count: "text-[10px] text-white/30 uppercase tracking-widest",
    enableButton: "text-[11px] font-medium text-sky-400/70 hover:text-sky-400 transition-colors",
    disableButton: "text-[11px] font-medium text-rose-400/70 hover:text-rose-400 transition-colors",
    separator: "text-white/20",
};

interface RosterResultsBarProps {
    filteredCount: number;
    hasActiveFilters: boolean;
    allEnabled: boolean;
    allDisabled: boolean;
    onEnableAll: () => void;
    onDisableAll: () => void;
}

export function RosterResultsBar({
    filteredCount,
    hasActiveFilters,
    allEnabled,
    allDisabled,
    onEnableAll,
    onDisableAll,
}: RosterResultsBarProps) {
    return (
        <div className={styles.row}>
            <p className={styles.count}>
                {filteredCount} character{filteredCount !== 1 ? "s" : ""}{hasActiveFilters ? " matching" : " total"}
            </p>
            {filteredCount > 0 && (
                allEnabled ? (
                    <button onClick={onDisableAll} className={styles.disableButton}>Disable all</button>
                ) : allDisabled ? (
                    <button onClick={onEnableAll} className={styles.enableButton}>Enable all</button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button onClick={onEnableAll} className={styles.enableButton}>Enable all</button>
                        <span className={styles.separator}>·</span>
                        <button onClick={onDisableAll} className={styles.disableButton}>Disable all</button>
                    </div>
                )
            )}
        </div>
    );
}
