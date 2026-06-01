import { useState } from "react";
import { cn } from "../lib/cn";
import { RosterModal } from "./Roster/RosterModal";
import { Tooltip } from "./Tooltip";

const SUSTAIN_TOOLTIP =
    "Guarantees at least one sustain in the team: any Preservation or Abundance character, or Hyacine.";

interface OptionsRowProps {
    rosterIds: number[];
    onToggleRoster: (id: number) => void;
    onEnableAll: (ids: number[]) => void;
    onDisableAll: (ids: number[]) => void;
    onImport: (ids: number[]) => void;
    requireSustain: boolean;
    onRequireSustainChange: (value: boolean) => void;
}

export function OptionsRow({
    rosterIds,
    onToggleRoster,
    onEnableAll,
    onDisableAll,
    onImport,
    requireSustain,
    onRequireSustainChange,
}: OptionsRowProps) {
    const [rosterOpen, setRosterOpen] = useState(false);
    const [rosterKey, setRosterKey] = useState(0);

    return (
        <>
            <div className="flex flex-col items-center gap-2 mt-1">
                <div>
                    <button
                        onClick={() => {
                            setRosterKey((k) => k + 1);
                            setRosterOpen(true);
                        }}
                        className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground transition-all duration-150 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-3 w-3"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            <path d="M13.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
                        </svg>
                        Manage Roster
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={requireSustain}
                            onChange={(e) => onRequireSustainChange(e.target.checked)}
                        />
                        <span
                            className={cn(
                                "flex h-3.5 w-3.5 items-center justify-center rounded border transition-all duration-150",
                                requireSustain
                                    ? "border-primary/50 bg-primary/10 text-primary"
                                    : "border-border bg-card group-hover:border-foreground/25"
                            )}
                        >
                            {requireSustain && (
                                <svg
                                    viewBox="0 0 10 10"
                                    className="h-2 w-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="1.5,5 4,7.5 8.5,2.5" />
                                </svg>
                            )}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground/80">
                            Include sustain
                        </span>
                    </label>
                    <Tooltip text={SUSTAIN_TOOLTIP} />
                </div>
            </div>

            <RosterModal
                key={rosterKey}
                open={rosterOpen}
                rosterIds={rosterIds}
                onToggleRoster={onToggleRoster}
                onEnableAll={onEnableAll}
                onDisableAll={onDisableAll}
                onImport={onImport}
                onClose={() => setRosterOpen(false)}
            />
        </>
    );
}
