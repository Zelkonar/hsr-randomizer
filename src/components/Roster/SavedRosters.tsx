import { useState, useRef } from "react";
import { CHARACTERS } from "../../data/characters";

const TOTAL = CHARACTERS.length;
const SKIP_CONFIRM_KEY = "hsr-randomizer:skip-delete-confirm";

function loadSkipConfirm(): boolean {
    return localStorage.getItem(SKIP_CONFIRM_KEY) === "true";
}

const styles = {
    panel: "border-b border-white/10 bg-white/[0.02]",
    inner: "px-5 py-3 flex flex-col gap-2",
    emptyText: "text-[11px] text-white/30 italic py-1",
    list: "flex flex-col gap-0.5 max-h-36 overflow-y-auto",
    row: "flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors",
    name: "flex-1 min-w-0 text-[12px] text-white/70 truncate font-medium",
    count: "text-[11px] text-white/30 shrink-0 tabular-nums",
    loadButton: "shrink-0 h-6 px-2.5 rounded border border-white/10 text-white/40 text-[10px] font-semibold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors",
    deleteButton: "shrink-0 h-6 w-6 flex items-center justify-center rounded border border-white/10 text-white/30 text-[10px] hover:text-red-400 hover:border-red-400/30 transition-colors",
    // confirmation row
    confirmRow: "flex items-center gap-2 rounded-lg px-2 py-1.5 bg-red-500/5 border border-red-500/20",
    confirmName: "flex-1 min-w-0 text-[12px] text-red-400/80 truncate font-medium",
    confirmActions: "flex items-center gap-2 shrink-0",
    dontAskLabel: "flex items-center gap-1.5 text-[10px] text-white/30 cursor-pointer select-none hover:text-white/50 transition-colors",
    dontAskCheckbox: "accent-red-400 cursor-pointer",
    cancelButton: "h-6 px-2.5 rounded border border-white/10 text-white/40 text-[10px] font-semibold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors",
    confirmDeleteButton: "h-6 px-2.5 rounded border border-red-500/30 text-red-400/70 text-[10px] font-semibold uppercase tracking-widest hover:text-red-300 hover:border-red-400/50 transition-colors",
    // save form
    saveRow: "flex items-center gap-2 pt-2 border-t border-white/10",
    input: "flex-1 h-7 rounded border border-white/10 bg-white/5 text-white/70 text-xs px-2.5 focus:outline-none focus:border-white/30 placeholder:text-white/20",
    saveButton: "shrink-0 h-7 px-3 rounded border border-white/10 text-white/50 text-[10px] font-semibold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
    overwriteButton: "shrink-0 h-7 px-3 rounded border border-amber-500/30 text-amber-400/70 text-[10px] font-semibold uppercase tracking-widest hover:text-amber-300 hover:border-amber-400/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
};

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
        <div className={styles.panel}>
            <div className={styles.inner}>
                {entries.length === 0 ? (
                    <p className={styles.emptyText}>No saved rosters yet.</p>
                ) : (
                    <div className={styles.list}>
                        {entries.map(([rosterName, ids]) =>
                            pendingDelete === rosterName ? (
                                <div key={rosterName} className={styles.confirmRow}>
                                    <span className={styles.confirmName}>Delete "{rosterName}"?</span>
                                    <div className={styles.confirmActions}>
                                        <label className={styles.dontAskLabel}>
                                            <input
                                                type="checkbox"
                                                className={styles.dontAskCheckbox}
                                                checked={dontAskAgain}
                                                onChange={(e) => setDontAskAgain(e.target.checked)}
                                            />
                                            Don't ask again
                                        </label>
                                        <button className={styles.cancelButton} onClick={() => setPendingDelete(null)}>Cancel</button>
                                        <button className={styles.confirmDeleteButton} onClick={handleConfirmDelete}>Delete</button>
                                    </div>
                                </div>
                            ) : (
                                <div key={rosterName} className={styles.row}>
                                    <span className={styles.name}>{rosterName}</span>
                                    <span className={styles.count}>{ids.length}/{TOTAL}</span>
                                    <button className={styles.loadButton} onClick={() => onLoad(ids)}>Load</button>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteClick(rosterName)} aria-label={`Delete ${rosterName}`}>✕</button>
                                </div>
                            )
                        )}
                    </div>
                )}
                <div className={styles.saveRow}>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        placeholder="Save current roster as…"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={40}
                    />
                    <button
                        className={isOverwrite ? styles.overwriteButton : styles.saveButton}
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
