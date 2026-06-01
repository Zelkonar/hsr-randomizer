import { cva } from "class-variance-authority";
import type { GameMode } from "../types/gameMode";

const MODES: { id: GameMode; label: string }[] = [
    { id: "team", label: "Random Team" },
    { id: "moc", label: "Memory of Chaos" },
    { id: "pf", label: "Pure Fiction" },
    { id: "as", label: "Apocalyptic Shadow" },
    { id: "aa", label: "Anomaly Arbitration" },
];

const modeButton = cva(
    "rounded-md border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-150 active:scale-95",
    {
        variants: {
            active: {
                true: "border-sky-500/50 bg-sky-500/10 text-sky-600 dark:border-sky-500/40 dark:bg-sky-500/8 dark:text-sky-400/80",
                false: "border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/40 dark:hover:border-white/20 dark:hover:text-white/60",
            },
        },
    }
);

export function ModeSelector({ mode, onModeChange }: { mode: GameMode; onModeChange: (m: GameMode) => void }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {MODES.map((m) => (
                <button key={m.id} className={modeButton({ active: mode === m.id })} onClick={() => onModeChange(m.id)}>
                    {m.label}
                </button>
            ))}
        </div>
    );
}
