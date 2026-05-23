import type { Element, Path, Rarity } from "../../types/character";

export const ELEMENTS: Element[] = [
    "Fire", "Ice", "Lightning", "Wind", "Quantum", "Imaginary", "Physical",
];

export const PATHS: Path[] = [
    "The Hunt", "Destruction", "Erudition", "Harmony",
    "Nihility", "Preservation", "Abundance", "Remembrance", "Elation",
];

const styles = {
    container: "px-5 py-3 space-y-3",
    filterRow: "flex flex-wrap items-center gap-2",
    filterLabel: "text-[10px] uppercase tracking-widest text-white/30 w-12 shrink-0",
    chip: "rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-150 cursor-pointer select-none",
    pathChip: "bg-white/5 text-white/60 border-white/10 data-[active=true]:bg-white/15 data-[active=true]:border-white/40 data-[active=true]:text-white",
    rarity5Chip: "bg-amber-500/20 text-amber-300 border-amber-500/30 data-[active=true]:bg-amber-500/40 data-[active=true]:border-amber-400",
    rarity4Chip: "bg-purple-500/20 text-purple-300 border-purple-500/30 data-[active=true]:bg-purple-500/40 data-[active=true]:border-purple-400",
    clearButton: "text-[11px] text-sky-400/70 hover:text-sky-400 transition-colors",
};

const ELEMENT_COLORS: Record<Element, string> = {
    Fire: "bg-orange-500/20 text-orange-300 border-orange-500/30 data-[active=true]:bg-orange-500/40 data-[active=true]:border-orange-400",
    Ice: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30 data-[active=true]:bg-cyan-500/40 data-[active=true]:border-cyan-400",
    Lightning: "bg-violet-500/20 text-violet-300 border-violet-500/30 data-[active=true]:bg-violet-500/40 data-[active=true]:border-violet-400",
    Wind: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 data-[active=true]:bg-emerald-500/40 data-[active=true]:border-emerald-400",
    Quantum: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30 data-[active=true]:bg-indigo-500/40 data-[active=true]:border-indigo-400",
    Imaginary: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 data-[active=true]:bg-yellow-500/40 data-[active=true]:border-yellow-400",
    Physical: "bg-gray-500/20 text-gray-300 border-gray-500/30 data-[active=true]:bg-gray-500/40 data-[active=true]:border-gray-300",
};

export interface RosterFiltersState {
    search: string;
    elements: Set<Element>;
    paths: Set<Path>;
    rarities: Set<Rarity>;
}

export const EMPTY_FILTERS: RosterFiltersState = {
    search: "",
    elements: new Set(),
    paths: new Set(),
    rarities: new Set(),
};

interface FilterChipProps {
    label: string;
    active: boolean;
    className: string;
    onClick: () => void;
}

function FilterChip({ label, active, className, onClick }: FilterChipProps) {
    return (
        <button
            onClick={onClick}
            data-active={active}
            className={`${styles.chip} ${className}`}
        >
            {label}
        </button>
    );
}

interface RosterFiltersProps {
    filters: RosterFiltersState;
    onChange: (filters: RosterFiltersState) => void;
}

export function RosterFilters({ filters, onChange }: RosterFiltersProps) {
    function toggleSet<T>(key: keyof Pick<RosterFiltersState, "elements" | "paths" | "rarities">, value: T) {
        const next = new Set(filters[key] as Set<T>);
        next.has(value) ? next.delete(value) : next.add(value);
        onChange({ ...filters, [key]: next });
    }

    const hasActive = filters.search || filters.elements.size || filters.paths.size || filters.rarities.size;

    return (
        <div className={styles.container}>
            <div className={styles.filterRow}>
                <span className={styles.filterLabel}>Rarity</span>
                {([5, 4] as Rarity[]).map((r) => (
                    <FilterChip
                        key={r}
                        label={`★${r}`}
                        active={filters.rarities.has(r)}
                        onClick={() => toggleSet("rarities", r)}
                        className={r === 5 ? styles.rarity5Chip : styles.rarity4Chip}
                    />
                ))}
            </div>

            <div className={styles.filterRow}>
                <span className={styles.filterLabel}>Element</span>
                {ELEMENTS.map((el) => (
                    <FilterChip
                        key={el}
                        label={el}
                        active={filters.elements.has(el)}
                        onClick={() => toggleSet("elements", el)}
                        className={ELEMENT_COLORS[el]}
                    />
                ))}
            </div>

            <div className={styles.filterRow}>
                <span className={styles.filterLabel}>Path</span>
                {PATHS.map((p) => (
                    <FilterChip
                        key={p}
                        label={p}
                        active={filters.paths.has(p)}
                        onClick={() => toggleSet("paths", p)}
                        className={styles.pathChip}
                    />
                ))}
            </div>

            {hasActive && (
                <button onClick={() => onChange(EMPTY_FILTERS)} className={styles.clearButton}>
                    Clear all filters
                </button>
            )}
        </div>
    );
}
