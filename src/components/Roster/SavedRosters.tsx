import { useState, useRef } from "react";
import { cn } from "../../lib/cn";
import { CHARACTERS } from "../../data/characters";

const TOTAL = CHARACTERS.length;
const SKIP_CONFIRM_KEY = "hsr-randomizer:skip-delete-confirm";

function loadSkipConfirm(): boolean {
    return localStorage.getItem(SKIP_CONFIRM_KEY) === "true";
}

interface SavedRostersProps {
    savedRosters: Record<string, number[]>;
    rosterIds: number[];
    onLoad: (ids: number[]) => void;
    onSave: (name: string, ids: number[]) => void;
    onDelete: (name: string) => void;
}

export function SavedRosters({ savedRosters, rosterIds, onLoad, onSave, onDelete }: SavedRostersProps) {
    const [name, setName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [pendingDelete, setPendingDelete] = useState<string | null>(null);
    const [skipConfirm, setSkipConfirm] = useState(() => loadSkipConfirm());
    const [dontAskAgain, setDontAskAgain] = useState(false);

    const entries = Object.entries(savedRosters);
    const trimmed = name.trim();
    const isOverwrite = trimmed !== "" && trimmed in savedRosters;

    function handleDeleteClick(rosterName: string) {
        if (skipConfirm) {
            onDelete(rosterName);
        } else {
            setPendingDelete(rosterName);
            setDontAskAgain(false);
        }
    }

    function handleConfirmDelete() {
        if (!pendingDelete) return;
        if (dontAskAgain) {
            localStorage.setItem(SKIP_CONFIRM_KEY, "true");
            setSkipConfirm(true);
        }
        onDelete(pendingDelete);
        setPendingDelete(null);
    }

    function handleSave() {
        if (!trimmed) return;
        onSave(trimmed, rosterIds);
        setName("");
        inputRef.current?.focus();
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") handleSave();
    }

    return (
        <div className="border-b border-border bg-muted">
            <div className="px-5 py-3 flex flex-col gap-2">
                {entries.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground italic py-1">No saved rosters yet.</p>
                ) : (
                    <div className="flex flex-col gap-0.5 max-h-36 overflow-y-auto">
                        {entries.map(([rosterName, ids]) =>
                            pendingDelete === rosterName ? (
                                <div
                                    key={rosterName}
                                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 bg-red-50 border border-red-200 dark:bg-red-500/5 dark:border-red-500/20"
                                >
                                    <span className="flex-1 min-w-0 text-[12px] text-red-600 dark:text-red-400/80 truncate font-medium">
                                        Delete "{rosterName}"?
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground cursor-pointer select-none hover:text-foreground/80 transition-colors">
                                            <input
                                                type="checkbox"
                                                className="accent-red-400 cursor-pointer"
                                                checked={dontAskAgain}
                                                onChange={(e) => setDontAskAgain(e.target.checked)}
                                            />
                                            Don't ask again
                                        </label>
                                        <button
                                            className="h-6 px-2.5 rounded border border-border text-muted-foreground text-[10px] font-semibold uppercase tracking-widest hover:text-foreground hover:border-foreground/25 transition-colors"
                                            onClick={() => setPendingDelete(null)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="h-6 px-2.5 rounded border border-red-300 text-red-600 text-[10px] font-semibold uppercase tracking-widest hover:text-red-700 hover:border-red-400 transition-colors dark:border-red-500/30 dark:text-red-400/70 dark:hover:text-red-300 dark:hover:border-red-400/50"
                                            onClick={handleConfirmDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={rosterName}
                                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors"
                                >
                                    <span className="flex-1 min-w-0 text-[12px] text-foreground/80 truncate font-medium">
                                        {rosterName}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground/70 shrink-0 tabular-nums">
                                        {ids.length}/{TOTAL}
                                    </span>
                                    <button
                                        className="shrink-0 h-6 px-2.5 rounded border border-border text-muted-foreground text-[10px] font-semibold uppercase tracking-widest hover:text-foreground hover:border-foreground/25 transition-colors"
                                        onClick={() => onLoad(ids)}
                                    >
                                        Load
                                    </button>
                                    <button
                                        className="shrink-0 h-6 w-6 flex items-center justify-center rounded border border-border text-muted-foreground/70 text-[10px] hover:text-red-600 hover:border-red-400 transition-colors dark:hover:text-red-400 dark:hover:border-red-400/30"
                                        onClick={() => handleDeleteClick(rosterName)}
                                        aria-label={`Delete ${rosterName}`}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <input
                        ref={inputRef}
                        className="flex-1 h-7 rounded border border-border bg-muted text-foreground/80 text-xs px-2.5 focus:outline-none focus:border-foreground/25 placeholder:text-muted-foreground/70"
                        placeholder="Save current roster as…"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={40}
                    />
                    <button
                        className={cn(
                            "shrink-0 h-7 px-3 rounded border text-[10px] font-semibold uppercase tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                            isOverwrite
                                ? "border-amber-400 text-amber-600 hover:text-amber-700 hover:border-amber-500 dark:border-amber-500/30 dark:text-amber-400/70 dark:hover:text-amber-300 dark:hover:border-amber-400/50"
                                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/25"
                        )}
                        disabled={!trimmed}
                        onClick={handleSave}
                    >
                        {isOverwrite ? "Overwrite" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
