import { useState, useCallback } from "react";

const OPTIONS_KEY = "hsr-randomizer:options";

interface Options {
    requireSustain: boolean;
}

function loadOptions(): Options {
    try {
        const raw = localStorage.getItem(OPTIONS_KEY);
        if (raw) return { requireSustain: false, ...JSON.parse(raw) };
    } catch {
        // fall through
    }
    return { requireSustain: false };
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

    return { ...options, setRequireSustain };
}
