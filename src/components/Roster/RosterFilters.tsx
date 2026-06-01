import { cn } from "../../lib/cn";
import { getElementStyles } from "../../lib/element";
import { getPathIcon } from "../../lib/path";
import { ELEMENTS, PATHS, EMPTY_FILTERS } from "./rosterFiltersConfig";
import type { RosterFiltersState } from "./rosterFiltersConfig";

const ELEMENT_ACTIVE_BG: Record<string, string> = {
    Fire: "data-[active=true]:bg-red-500/25",
    Ice: "data-[active=true]:bg-sky-400/25",
    Lightning: "data-[active=true]:bg-violet-500/25",
    Wind: "data-[active=true]:bg-emerald-500/25",
    Quantum: "data-[active=true]:bg-indigo-500/25",
    Imaginary: "data-[active=true]:bg-yellow-400/25",
    Physical: "data-[active=true]:bg-stone-400/25",
};

interface RosterFiltersProps {
    filters: RosterFiltersState;
    onChange: (filters: RosterFiltersState) => void;
}

export function RosterFilters({ filters, onChange }: RosterFiltersProps) {
    function toggleSet<T>(key: keyof Pick<RosterFiltersState, "elements" | "paths" | "rarities">, value: T) {
        const next = new Set(filters[key] as Set<T>);
        if (next.has(value)) {
            next.delete(value);
        } else {
            next.add(value);
        }
        onChange({ ...filters, [key]: next });
    }

    const hasActive = !!(filters.search || filters.elements.size || filters.paths.size || filters.rarities.size);

    return (
        <div className="flex flex-wrap items-center gap-3 px-5 py-3">
            <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Rarity</span>
                <div className="flex rounded-lg border border-border overflow-hidden divide-x divide-border">
                    {([5, 4] as (4 | 5)[]).map((r) => (
                        <button
                            key={r}
                            onClick={() => toggleSet("rarities", r)}
                            data-active={filters.rarities.has(r)}
                            className={cn(
                                "px-3 py-1 text-[11px] font-medium tracking-wide bg-transparent hover:bg-muted transition-colors duration-150 cursor-pointer select-none",
                                r === 5
                                    ? "text-amber-600 data-[active=true]:bg-amber-500/30 dark:text-amber-300"
                                    : "text-purple-600 data-[active=true]:bg-purple-500/30 dark:text-purple-300"
                            )}
                        >
                            ★{r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Element</span>
                <div className="flex rounded-lg border border-border overflow-hidden divide-x divide-border">
                    {ELEMENTS.map((el) => (
                        <button
                            key={el}
                            onClick={() => toggleSet("elements", el)}
                            data-active={filters.elements.has(el)}
                            title={el}
                            className={cn(
                                "p-1.5 bg-transparent hover:bg-muted transition-colors duration-150 cursor-pointer",
                                ELEMENT_ACTIVE_BG[el]
                            )}
                        >
                            <img src={getElementStyles(el).icon} alt={el} className="w-5 h-5" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Path</span>
                <div className="flex rounded-lg border border-border overflow-hidden divide-x divide-border">
                    {PATHS.map((p) => (
                        <button
                            key={p}
                            onClick={() => toggleSet("paths", p)}
                            data-active={filters.paths.has(p)}
                            title={p}
                            className="p-1.5 bg-transparent hover:bg-muted transition-colors duration-150 cursor-pointer data-[active=true]:bg-gray-300 dark:data-[active=true]:bg-white/15"
                        >
                            <img src={getPathIcon(p)} alt={p} className="w-5 h-5 invert dark:invert-0" />
                        </button>
                    ))}
                </div>
            </div>

            {hasActive && (
                <div className="w-full">
                    <button
                        onClick={() => onChange(EMPTY_FILTERS)}
                        className="rounded-md border border-border bg-card px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:border-foreground/25 hover:text-foreground/80 transition-all duration-150 cursor-pointer"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
