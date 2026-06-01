import type { RefObject } from "react";
import { cn } from "../../lib/cn";

interface RosterSearchBarProps {
    searchRef: RefObject<HTMLInputElement | null>;
    search: string;
    onSearchChange: (value: string) => void;
    filtersOpen: boolean;
    onToggleFilters: () => void;
    nonSearchFilterCount: number;
}

export function RosterSearchBar({
    searchRef,
    search,
    onSearchChange,
    filtersOpen,
    onToggleFilters,
    nonSearchFilterCount,
}: RosterSearchBarProps) {
    const filtersActive = filtersOpen || nonSearchFilterCount > 0;

    return (
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border shrink-0">
            <input
                ref={searchRef}
                type="text"
                placeholder="Search by name…"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder-muted-foreground/70 outline-none focus:border-primary/50 transition-colors"
            />
            <button
                onClick={onToggleFilters}
                className={cn(
                    "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-150 shrink-0",
                    filtersActive
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground hover:border-foreground/25 hover:text-foreground/80"
                )}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                    <path d="M14 2H2l4.5 5.25V12l3 2V7.25L14 2Z" />
                </svg>
                Filters
                {nonSearchFilterCount > 0 && (
                    <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] text-white font-bold">
                        {nonSearchFilterCount}
                    </span>
                )}
            </button>
        </div>
    );
}
