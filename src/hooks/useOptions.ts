import { useState, useCallback } from "react";
import type { GameMode } from "../types/gameMode";

const OPTIONS_KEY = "hsr-randomizer:options";

interface Options {
    requireSustain: boolean;
    mode: GameMode;
}

function loadOptions(): Options {
    try {
        const raw = localStorage.getItem(OPTIONS_KEY);
        if (raw) return { requireSustain: false, mode: "team", ...JSON.parse(raw) };
    } catch {
        // fall through
    }
    return { requireSustain: false, mode: "team" };
}

function saveOptions(opts: Options) {
    localStorage.setItem(OPTIONS_KEY, JSON.stringify(opts));
}

export function useOptions() {
    const [options, setOptions] = useState<Options>(() => loadOptions());

    const setRequireSustain = useCallback((value: boolean) => {
        setOptions((prev) => {
            const next = { ...prev, requireSustain: value };
            saveOptions(next);
            return next;
        });
    }, []);

    const setMode = useCallback((value: GameMode) => {
        setOptions((prev) => {
            const next = { ...prev, mode: value };
            saveOptions(next);
            return next;
        });
    }, []);

    return { ...options, setRequireSustain, setMode };
}
