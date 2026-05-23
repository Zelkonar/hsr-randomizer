import { useState, useMemo, useEffect } from "react";
import { CHARACTERS } from "../../data/characters";
import { RosterCard } from "./RosterCard";
import { RosterFilters, EMPTY_FILTERS } from "./RosterFilters";
import type { RosterFiltersState } from "./RosterFilters";

interface RosterModalProps {
    open: boolean;
    blacklistIds: number[];
    onToggleBlacklist: (id: number) => void;
    onEnableAll: (ids: number[]) => void;
    onDisableAll: (ids: number[]) => void;
    onClose: () => void;
}

export function RosterModal({
    open,
    blacklistIds,
    onToggleBlacklist,
    onEnableAll,
    onDisableAll,
    onClose,
}: RosterModalProps) {
    const [filters, setFilters] = useState<RosterFiltersState>(EMPTY_FILTERS);
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setFilters(EMPTY_FILTERS);
            setFiltersOpen(false);
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
    const allEnabled = filteredIds.every((id) => !blacklistIds.includes(id));
    const allDisabled = filteredIds.every((id) => blacklistIds.includes(id));
    const activeFilterCount = [
        filters.search ? 1 : 0,
        filters.elements.size,
        filters.paths.size,
        filters.rarities.size,
    ].reduce((a, b) => a + b, 0);
    const hasActiveFilters = activeFilterCount > 0;
    const activeCount = CHARACTERS.length - blacklistIds.length;

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="relative z-10 flex flex-col w-full max-w-3xl max-h-[92dvh] sm:max-h-[85dvh] rounded-t-2xl sm:rounded-2xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                    <div>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-white">Manage Roster</h2>
                        <p className="text-[11px] text-white/40 mt-0.5">
                            {activeCount} of {CHARACTERS.length} characters active
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Search + filter toggle row — always visible */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 shrink-0">
                    <input
                        type="text"
                        placeholder="Search by name…"
                        value={filters.search}
                        onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-sky-500/60 transition-colors"
                    />
                    <button
                        onClick={() => setFiltersOpen((p) => !p)}
                        className={`
                            flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-semibold
                            uppercase tracking-widest transition-all duration-150 shrink-0
                            ${filtersOpen || (hasActiveFilters && !filters.search)
                                ? "border-sky-500/50 bg-sky-500/10 text-sky-300"
                                : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                            }
                        `}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                            <path d="M14 2H2l4.5 5.25V12l3 2V7.25L14 2Z" />
                        </svg>
                        Filters
                        {activeFilterCount - (filters.search ? 1 : 0) > 0 && (
                            <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] text-white font-bold">
                                {activeFilterCount - (filters.search ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>

                {/* Collapsible filters */}
                {filtersOpen && (
                    <div className="shrink-0 border-b border-white/10">
                        <RosterFilters filters={filters} onChange={setFilters} />
                    </div>
                )}

                {/* Results bar */}
                <div className="px-5 py-2 shrink-0 flex items-center justify-between gap-3">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">
                        {filtered.length} character{filtered.length !== 1 ? "s" : ""}{hasActiveFilters ? " matching" : " total"}
                    </p>
                    {filtered.length > 0 && (
                        allEnabled ? (
                            <button onClick={() => onDisableAll(filteredIds)} className="text-[11px] font-medium text-rose-400/70 hover:text-rose-400 transition-colors">
                                Disable all
                            </button>
                        ) : allDisabled ? (
                            <button onClick={() => onEnableAll(filteredIds)} className="text-[11px] font-medium text-sky-400/70 hover:text-sky-400 transition-colors">
                                Enable all
                            </button>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button onClick={() => onEnableAll(filteredIds)} className="text-[11px] font-medium text-sky-400/70 hover:text-sky-400 transition-colors">
                                    Enable all
                                </button>
                                <span className="text-white/20">·</span>
                                <button onClick={() => onDisableAll(filteredIds)} className="text-[11px] font-medium text-rose-400/70 hover:text-rose-400 transition-colors">
                                    Disable all
                                </button>
                            </div>
                        )
                    )}
                </div>

                {/* Grid */}
                <div className="overflow-y-auto px-5 pb-5">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-white/30">
                            <span className="text-3xl mb-2">∅</span>
                            <p className="text-sm">No characters match your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2">
                            {filtered.map((c) => (
                                <RosterCard
                                    key={c.id}
                                    character={c}
                                    blacklisted={blacklistIds.includes(c.id)}
                                    onToggle={() => onToggleBlacklist(c.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}