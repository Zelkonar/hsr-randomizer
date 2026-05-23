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
        <div className="px-5 py-2 shrink-0 flex items-center justify-between gap-3">
            <p className="text-[10px] text-white/30 uppercase tracking-widest">
                {filteredCount} character{filteredCount !== 1 ? "s" : ""}{hasActiveFilters ? " matching" : " total"}
            </p>
            {filteredCount > 0 && (
                allEnabled ? (
                    <button onClick={onDisableAll} className="text-[11px] font-medium text-rose-400/70 hover:text-rose-400 transition-colors">
                        Disable all
                    </button>
                ) : allDisabled ? (
                    <button onClick={onEnableAll} className="text-[11px] font-medium text-sky-400/70 hover:text-sky-400 transition-colors">
                        Enable all
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button onClick={onEnableAll} className="text-[11px] font-medium text-sky-400/70 hover:text-sky-400 transition-colors">
                            Enable all
                        </button>
                        <span className="text-white/20">·</span>
                        <button onClick={onDisableAll} className="text-[11px] font-medium text-rose-400/70 hover:text-rose-400 transition-colors">
                            Disable all
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
