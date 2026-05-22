import { useState, useMemo, useEffect, useCallback } from "react";
import { CHARACTERS } from "../data/characters";
import type { Character, Element, Path, Rarity } from "../types/character";

const ELEMENTS: Element[] = [
    "Fire", "Ice", "Lightning", "Wind", "Quantum", "Imaginary", "Physical",
];

const PATHS: Path[] = [
    "The Hunt", "Destruction", "Erudition", "Harmony",
    "Nihility", "Preservation", "Abundance", "Remembrance", "Elation",
];

const ELEMENT_COLORS: Record<Element, string> = {
    Fire: "bg-orange-500/20 text-orange-300 border-orange-500/30 data-[active=true]:bg-orange-500/40 data-[active=true]:border-orange-400",
    Ice: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30 data-[active=true]:bg-cyan-500/40 data-[active=true]:border-cyan-400",
    Lightning: "bg-violet-500/20 text-violet-300 border-violet-500/30 data-[active=true]:bg-violet-500/40 data-[active=true]:border-violet-400",
    Wind: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 data-[active=true]:bg-emerald-500/40 data-[active=true]:border-emerald-400",
    Quantum: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30 data-[active=true]:bg-indigo-500/40 data-[active=true]:border-indigo-400",
    Imaginary: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 data-[active=true]:bg-yellow-500/40 data-[active=true]:border-yellow-400",
    Physical: "bg-gray-500/20 text-gray-300 border-gray-500/30 data-[active=true]:bg-gray-500/40 data-[active=true]:border-gray-300",
};

interface Filters {
    search: string;
    elements: Set<Element>;
    paths: Set<Path>;
    rarities: Set<Rarity>;
}

interface RosterModalProps {
    open: boolean;
    blacklistIds: number[];
    onToggleBlacklist: (id: number) => void;
    onEnableAll: (ids: number[]) => void;
    onDisableAll: (ids: number[]) => void;
    onClose: () => void;
}

function FilterChip({
    label, active, className, onClick,
}: {
    label: string; active: boolean; className: string; onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            data-active={active}
            className={`rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-150 cursor-pointer select-none ${className}`}
        >
            {label}
        </button>
    );
}

function CharacterCard({
    character, blacklisted, onToggle,
}: {
    character: Character; blacklisted: boolean; onToggle: () => void;
}) {
    return (
        <button
            onClick={onToggle}
            title={blacklisted ? `Add ${character.name} to roster` : `Remove ${character.name} from roster`}
            className={`
        group relative flex flex-col items-center gap-1.5 rounded-xl border p-2
        transition-all duration-150 cursor-pointer text-left
        ${blacklisted
                    ? "border-white/5 bg-white/3 opacity-40 hover:opacity-60"
                    : "border-sky-500/40 bg-sky-500/8 shadow-[0_0_10px_rgba(14,165,233,0.1)] hover:border-sky-400/60"
                }
      `}
        >
            {/* Rarity pip */}
            <span className={`absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full ${character.rarity === 5 ? "bg-amber-400" : "bg-purple-400"}`} />

            {/* Excluded X badge */}
            {blacklisted && (
                <span className="absolute top-1.5 left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[9px] text-white/60 font-bold">
                    ✕
                </span>
            )}

            <img
                src={character.icon}
                alt={character.name}
                className="h-14 w-14 rounded-lg object-cover"
                loading="lazy"
            />

            <div className="w-full text-center">
                <p className="truncate text-[10px] font-semibold text-white/90 leading-tight">{character.name}</p>
                <p className="truncate text-[9px] text-white/40">{character.element} · {character.path}</p>
            </div>
        </button>
    );
}

export function RosterModal({ open, blacklistIds, onToggleBlacklist, onEnableAll, onDisableAll, onClose }: RosterModalProps) {
    const [filters, setFilters] = useState<Filters>({
        search: "", elements: new Set(), paths: new Set(), rarities: new Set(),
    });

    useEffect(() => {
        if (open) setFilters({ search: "", elements: new Set(), paths: new Set(), rarities: new Set() });
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    const toggleFilter = useCallback(<T,>(
        key: keyof Pick<Filters, "elements" | "paths" | "rarities">, value: T
    ) => {
        setFilters((prev) => {
            const next = new Set(prev[key] as Set<T>);
            next.has(value) ? next.delete(value) : next.add(value);
            return { ...prev, [key]: next };
        });
    }, []);

    const filtered = useMemo(() => CHARACTERS.filter((c) => {
        if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.elements.size && !filters.elements.has(c.element)) return false;
        if (filters.paths.size && !filters.paths.has(c.path)) return false;
        if (filters.rarities.size && !filters.rarities.has(c.rarity)) return false;
        return true;
    }), [filters]);

    const hasActiveFilters = filters.search || filters.elements.size || filters.paths.size || filters.rarities.size;
    const activeCount = CHARACTERS.length - blacklistIds.length;

    // For the bulk button: are ALL filtered characters currently enabled?
    const filteredIds = filtered.map((c) => c.id);
    const allFilteredEnabled = filteredIds.every((id) => !blacklistIds.includes(id));
    const allFilteredDisabled = filteredIds.every((id) => blacklistIds.includes(id));

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
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Filters */}
                <div className="px-5 py-3 border-b border-white/10 space-y-3 shrink-0">
                    <input
                        type="text"
                        placeholder="Search by name…"
                        value={filters.search}
                        onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-sky-500/60 transition-colors"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 w-12 shrink-0">Rarity</span>
                        {([5, 4] as Rarity[]).map((r) => (
                            <FilterChip key={r} label={`★${r}`} active={filters.rarities.has(r)}
                                onClick={() => toggleFilter("rarities", r)}
                                className={r === 5
                                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30 data-[active=true]:bg-amber-500/40 data-[active=true]:border-amber-400"
                                    : "bg-purple-500/20 text-purple-300 border-purple-500/30 data-[active=true]:bg-purple-500/40 data-[active=true]:border-purple-400"
                                }
                            />
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 w-12 shrink-0">Element</span>
                        {ELEMENTS.map((el) => (
                            <FilterChip key={el} label={el} active={filters.elements.has(el)}
                                onClick={() => toggleFilter("elements", el)}
                                className={ELEMENT_COLORS[el]}
                            />
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 w-12 shrink-0">Path</span>
                        {PATHS.map((p) => (
                            <FilterChip key={p} label={p} active={filters.paths.has(p)}
                                onClick={() => toggleFilter("paths", p)}
                                className="bg-white/5 text-white/60 border-white/10 data-[active=true]:bg-white/15 data-[active=true]:border-white/40 data-[active=true]:text-white"
                            />
                        ))}
                    </div>

                    {hasActiveFilters ? (
                        <button
                            onClick={() => setFilters({ search: "", elements: new Set(), paths: new Set(), rarities: new Set() })}
                            className="text-[11px] text-sky-400/70 hover:text-sky-400 transition-colors"
                        >
                            Clear all filters
                        </button>
                    ) : null}
                </div>

                <div className="px-5 py-2 shrink-0 flex items-center justify-between gap-3">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">
                        {filtered.length} character{filtered.length !== 1 ? "s" : ""}{hasActiveFilters ? " matching" : " total"}
                    </p>
                    {filtered.length > 0 && (
                        allFilteredEnabled ? (
                            <button
                                onClick={() => onDisableAll(filteredIds)}
                                className="text-[11px] font-medium text-rose-400/70 hover:text-rose-400 transition-colors"
                            >
                                Disable all
                            </button>
                        ) : allFilteredDisabled ? (
                            <button
                                onClick={() => onEnableAll(filteredIds)}
                                className="text-[11px] font-medium text-sky-400/70 hover:text-sky-400 transition-colors"
                            >
                                Enable all
                            </button>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onEnableAll(filteredIds)}
                                    className="text-[11px] font-medium text-sky-400/70 hover:text-sky-400 transition-colors"
                                >
                                    Enable all
                                </button>
                                <span className="text-white/20">·</span>
                                <button
                                    onClick={() => onDisableAll(filteredIds)}
                                    className="text-[11px] font-medium text-rose-400/70 hover:text-rose-400 transition-colors"
                                >
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
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2">
                            {filtered.map((c) => (
                                <CharacterCard
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