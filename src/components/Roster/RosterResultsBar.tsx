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
            <p className="text-[10px] text-fg-subtle uppercase tracking-widest">
                {filteredCount} character{filteredCount !== 1 ? "s" : ""}
                {hasActiveFilters ? " matching" : " total"}
            </p>
            {filteredCount > 0 &&
                (allEnabled ? (
                    <button
                        onClick={onDisableAll}
                        className="text-[11px] font-medium text-rose-500/80 hover:text-rose-600 transition-colors dark:text-rose-400/70 dark:hover:text-rose-400"
                    >
                        Disable all
                    </button>
                ) : allDisabled ? (
                    <button
                        onClick={onEnableAll}
                        className="text-[11px] font-medium text-sky-600/80 hover:text-sky-600 transition-colors dark:text-sky-400/70 dark:hover:text-sky-400"
                    >
                        Enable all
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onEnableAll}
                            className="text-[11px] font-medium text-sky-600/80 hover:text-sky-600 transition-colors dark:text-sky-400/70 dark:hover:text-sky-400"
                        >
                            Enable all
                        </button>
                        <span className="text-gray-300 dark:text-white/20">·</span>
                        <button
                            onClick={onDisableAll}
                            className="text-[11px] font-medium text-rose-500/80 hover:text-rose-600 transition-colors dark:text-rose-400/70 dark:hover:text-rose-400"
                        >
                            Disable all
                        </button>
                    </div>
                ))}
        </div>
    );
}
