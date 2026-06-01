import { useState, useMemo, useEffect, useRef } from "react";
import { CHARACTERS } from "../../data/characters";
import { RosterCharacterGrid } from "./RosterCharacterGrid";
import { RosterDataModal } from "./RosterDataModal";
import { RosterFilters } from "./RosterFilters";
import { EMPTY_FILTERS } from "./rosterFiltersConfig";
import { RosterModalHeader } from "./RosterModalHeader";
import { RosterSearchBar } from "./RosterSearchBar";
import { RosterResultsBar } from "./RosterResultsBar";
import { SavedRosters } from "./SavedRosters";
import { useSavedRosters } from "../../hooks/useSavedRosters";
import type { RosterFiltersState } from "./rosterFiltersConfig";

type DataModal = "import" | "export" | null;

interface RosterModalProps {
    open: boolean;
    rosterIds: number[];
    onToggleRoster: (id: number) => void;
    onEnableAll: (ids: number[]) => void;
    onDisableAll: (ids: number[]) => void;
    onImport: (ids: number[]) => void;
    onClose: () => void;
}

export function RosterModal({
    open,
    rosterIds,
    onToggleRoster,
    onEnableAll,
    onDisableAll,
    onImport,
    onClose,
}: RosterModalProps) {
    const [filters, setFilters] = useState<RosterFiltersState>(EMPTY_FILTERS);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [savedOpen, setSavedOpen] = useState(false);
    const [dataModal, setDataModal] = useState<DataModal>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const { savedRosters, saveRoster, deleteSavedRoster } = useSavedRosters();

    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 0);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !dataModal) onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose, dataModal]);

    const { filtered, filteredIds } = useMemo(() => {
        const f = CHARACTERS.filter((c) => {
            if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
            if (filters.elements.size && !filters.elements.has(c.element)) return false;
            if (filters.paths.size && !filters.paths.has(c.path)) return false;
            if (filters.rarities.size && !filters.rarities.has(c.rarity)) return false;
            return true;
        }).sort((a, b) => a.name.localeCompare(b.name));
        return { filtered: f, filteredIds: f.map((c) => c.id) };
    }, [filters]);

    const rosterSet = useMemo(() => new Set(rosterIds), [rosterIds]);

    const nonSearchFilterCount = filters.elements.size + filters.paths.size + filters.rarities.size;
    const hasActiveFilters = nonSearchFilterCount > 0 || !!filters.search;

    if (!open) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

                <div className="relative z-10 flex flex-col w-full max-w-5xl h-[92dvh] sm:h-[90dvh] rounded-t-2xl sm:rounded-2xl bg-surface border border-line shadow-2xl overflow-hidden">
                    <RosterModalHeader
                        rosterIds={rosterIds}
                        savedCount={Object.keys(savedRosters).length}
                        savedOpen={savedOpen}
                        onToggleSaved={() => setSavedOpen((p) => !p)}
                        onExport={() => setDataModal("export")}
                        onImport={() => setDataModal("import")}
                        onClose={onClose}
                    />

                    {savedOpen && (
                        <SavedRosters
                            savedRosters={savedRosters}
                            rosterIds={rosterIds}
                            onLoad={onImport}
                            onSave={saveRoster}
                            onDelete={deleteSavedRoster}
                        />
                    )}

                    <RosterSearchBar
                        searchRef={searchRef}
                        search={filters.search}
                        onSearchChange={(value) => setFilters((p) => ({ ...p, search: value }))}
                        filtersOpen={filtersOpen}
                        onToggleFilters={() => setFiltersOpen((p) => !p)}
                        nonSearchFilterCount={nonSearchFilterCount}
                    />

                    {filtersOpen && (
                        <div className="shrink-0 border-b border-line">
                            <RosterFilters filters={filters} onChange={setFilters} />
                        </div>
                    )}

                    <RosterResultsBar
                        filteredCount={filtered.length}
                        hasActiveFilters={hasActiveFilters}
                        allEnabled={filteredIds.every((id) => rosterSet.has(id))}
                        allDisabled={filteredIds.every((id) => !rosterSet.has(id))}
                        onEnableAll={() => onEnableAll(filteredIds)}
                        onDisableAll={() => onDisableAll(filteredIds)}
                    />

                    <div className="overflow-y-auto px-5 pb-5">
                        <RosterCharacterGrid characters={filtered} rosterIds={rosterIds} onToggle={onToggleRoster} />
                    </div>
                </div>
            </div>

            {dataModal && (
                <RosterDataModal
                    mode={dataModal}
                    rosterIds={rosterIds}
                    onImport={onImport}
                    onClose={() => setDataModal(null)}
                />
            )}
        </>
    );
}
