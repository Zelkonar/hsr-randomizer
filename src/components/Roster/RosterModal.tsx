import { useState, useMemo, useEffect, useRef } from "react";
import { CHARACTERS } from "../../data/characters";
import { RosterCharacterGrid } from "./RosterCharacterGrid";
import { RosterFilters, EMPTY_FILTERS } from "./RosterFilters";
import { RosterModalHeader } from "./RosterModalHeader";
import { RosterSearchBar } from "./RosterSearchBar";
import { RosterResultsBar } from "./RosterResultsBar";
import type { RosterFiltersState } from "./RosterFilters";

const styles = {
    backdrop: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
    overlay: "absolute inset-0 bg-black/70 backdrop-blur-sm",
    panel: "relative z-10 flex flex-col w-full max-w-5xl h-[92dvh] sm:h-[90dvh] rounded-t-2xl sm:rounded-2xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden",
    filtersSection: "shrink-0 border-b border-white/10",
    gridContainer: "overflow-y-auto px-5 pb-5",
};

interface RosterModalProps {
    open: boolean;
    rosterIds: number[];
    onToggleRoster: (id: number) => void;
    onEnableAll: (ids: number[]) => void;
    onDisableAll: (ids: number[]) => void;
    onClose: () => void;
}

export function RosterModal({
    open,
    rosterIds,
    onToggleRoster,
    onEnableAll,
    onDisableAll,
    onClose,
}: RosterModalProps) {
    const [filters, setFilters] = useState<RosterFiltersState>(EMPTY_FILTERS);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setFilters(EMPTY_FILTERS);
            setFiltersOpen(false);
            setTimeout(() => searchRef.current?.focus(), 0);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    const filtered = useMemo(() => CHARACTERS.filter((c) => {
        if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.elements.size && !filters.elements.has(c.element)) return false;
        if (filters.paths.size && !filters.paths.has(c.path)) return false;
        if (filters.rarities.size && !filters.rarities.has(c.rarity)) return false;
        return true;
    }), [filters]);

    const filteredIds = filtered.map((c) => c.id);
    const nonSearchFilterCount = filters.elements.size + filters.paths.size + filters.rarities.size;
    const hasActiveFilters = nonSearchFilterCount > 0 || !!filters.search;

    if (!open) return null;

    return (
        <div className={styles.backdrop}>
            <div className={styles.overlay} onClick={onClose} />

            <div className={styles.panel}>
                <RosterModalHeader rosterIds={rosterIds} onClose={onClose} />

                <RosterSearchBar
                    searchRef={searchRef}
                    search={filters.search}
                    onSearchChange={(value) => setFilters((p) => ({ ...p, search: value }))}
                    filtersOpen={filtersOpen}
                    onToggleFilters={() => setFiltersOpen((p) => !p)}
                    nonSearchFilterCount={nonSearchFilterCount}
                />

                {filtersOpen && (
                    <div className={styles.filtersSection}>
                        <RosterFilters filters={filters} onChange={setFilters} />
                    </div>
                )}

                <RosterResultsBar
                    filteredCount={filtered.length}
                    hasActiveFilters={hasActiveFilters}
                    allEnabled={filteredIds.every((id) => rosterIds.includes(id))}
                    allDisabled={filteredIds.every((id) => !rosterIds.includes(id))}
                    onEnableAll={() => onEnableAll(filteredIds)}
                    onDisableAll={() => onDisableAll(filteredIds)}
                />

                <div className={styles.gridContainer}>
                    <RosterCharacterGrid
                        characters={filtered}
                        rosterIds={rosterIds}
                        onToggle={onToggleRoster}
                    />
                </div>
            </div>
        </div>
    );
}
