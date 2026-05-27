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
                true: "border-sky-500/40 bg-sky-500/8 text-sky-400/80",
                false: "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/60",
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
