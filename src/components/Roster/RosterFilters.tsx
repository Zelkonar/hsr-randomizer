import type { Element, Path, Rarity } from "../../types/character";
import { getElementStyles } from "../../utils/element";
import { getPathIcon, getPathIconLocal } from "../../utils/path";

export const ELEMENTS: Element[] = [
    "Fire", "Ice", "Lightning", "Wind", "Quantum", "Imaginary", "Physical",
];

export const PATHS: Path[] = [
    "The Hunt", "Destruction", "Erudition", "Harmony",
    "Nihility", "Preservation", "Abundance", "Remembrance", "Elation",
];

const ELEMENT_ACTIVE_BG: Record<Element, string> = {
    Fire:      "data-[active=true]:bg-red-500/25",
    Ice:       "data-[active=true]:bg-sky-400/25",
    Lightning: "data-[active=true]:bg-violet-500/25",
    Wind:      "data-[active=true]:bg-emerald-500/25",
    Quantum:   "data-[active=true]:bg-indigo-500/25",
    Imaginary: "data-[active=true]:bg-yellow-400/25",
    Physical:  "data-[active=true]:bg-stone-400/25",
};

const styles = {
    container: "flex flex-wrap items-center gap-3 px-5 py-3",
    label: "text-[10px] uppercase tracking-widest text-white/30 shrink-0",
    pillGroup: "flex rounded-lg border border-white/10 overflow-hidden divide-x divide-white/10",
    iconBtn: "p-1.5 bg-transparent hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer",
    rarityBtn: "px-3 py-1 text-[11px] font-medium tracking-wide bg-transparent hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer select-none",
    rarity5Text: "text-amber-300 data-[active=true]:bg-amber-500/30",
    rarity4Text: "text-purple-300 data-[active=true]:bg-purple-500/30",
    pathActive: "data-[active=true]:bg-white/15",
    clearRow: "w-full",
    clearButton: "rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-widest text-white/40 hover:border-white/20 hover:text-white/60 transition-all duration-150 cursor-pointer",
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

    const hasActive = !!(filters.search || filters.elements.size || filters.paths.size || filters.rarities.size);

    return (
        <div className={styles.container}>
            <div className="flex items-center gap-2">
                <span className={styles.label}>Rarity</span>
                <div className={styles.pillGroup}>
                    {([5, 4] as Rarity[]).map((r) => (
                        <button
                            key={r}
                            onClick={() => toggleSet("rarities", r)}
                            data-active={filters.rarities.has(r)}
                            className={`${styles.rarityBtn} ${r === 5 ? styles.rarity5Text : styles.rarity4Text}`}
                        >
                            ★{r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className={styles.label}>Element</span>
                <div className={styles.pillGroup}>
                    {ELEMENTS.map((el) => (
                        <button
                            key={el}
                            onClick={() => toggleSet("elements", el)}
                            data-active={filters.elements.has(el)}
                            title={el}
                            className={`${styles.iconBtn} ${ELEMENT_ACTIVE_BG[el]}`}
                        >
                            <img src={getElementStyles(el).icon} alt={el} className="w-5 h-5" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getElementStyles(el).iconLocal; }} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className={styles.label}>Path</span>
                <div className={styles.pillGroup}>
                    {PATHS.map((p) => (
                        <button
                            key={p}
                            onClick={() => toggleSet("paths", p)}
                            data-active={filters.paths.has(p)}
                            title={p}
                            className={`${styles.iconBtn} ${styles.pathActive}`}
                        >
                            <img src={getPathIcon(p)} alt={p} className="w-5 h-5" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getPathIconLocal(p); }} />
                        </button>
                    ))}
                </div>
            </div>

            {hasActive && (
                <div className={styles.clearRow}>
                    <button onClick={() => onChange(EMPTY_FILTERS)} className={styles.clearButton}>
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
