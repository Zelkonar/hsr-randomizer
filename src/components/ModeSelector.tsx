import { cva } from "class-variance-authority";
import type { GameMode } from "../types/gameMode";

const MODES: { id: GameMode; label: string }[] = [
    { id: "team", label: "Single Team" },
    { id: "twoteam", label: "MoC / PF / AS" },
    { id: "starward", label: "Starward" },
    { id: "aa", label: "Anomaly Arbitration" },
];

const modeButton = cva(
    "rounded-md border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-150 active:scale-95",
    {
        variants: {
            active: {
                true: "border-primary/50 bg-primary/10 text-primary",
                false: "border-border bg-card text-muted-foreground hover:border-foreground/25 hover:text-foreground/80",
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
