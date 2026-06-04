import { useCallback } from "react";
import type { GameMode } from "../types/gameMode";
import { useLocalStorageState } from "./useLocalStorageState";

const OPTIONS_KEY = "hsr-randomizer:options";

interface Options {
    requireSustain: boolean;
    mode: GameMode;
}

// The two-team modes (moc/pf/as) collapsed into "twoteam", so a stored mode that
// is no longer a valid value falls back to "team" rather than being trusted.
function parseOptions(stored: unknown): Options {
    const { requireSustain = false, mode } = (stored ?? {}) as Partial<Options>;
    const validMode = mode === "team" || mode === "twoteam" || mode === "starward" || mode === "aa" ? mode : "team";
    return { requireSustain, mode: validMode };
}

export function useOptions() {
    const [options, setOptions] = useLocalStorageState<Options>(
        OPTIONS_KEY,
        { requireSustain: false, mode: "team" },
        parseOptions
    );

    const setRequireSustain = useCallback(
        (value: boolean) => setOptions((prev) => ({ ...prev, requireSustain: value })),
        [setOptions]
    );

    const setMode = useCallback((value: GameMode) => setOptions((prev) => ({ ...prev, mode: value })), [setOptions]);

    return { ...options, setRequireSustain, setMode };
}
