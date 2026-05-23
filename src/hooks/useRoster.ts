import { useState, useCallback } from "react";
import { CHARACTERS } from "../data/characters";

const ROSTER_KEY = "hsr-randomizer:roster";

const ALL_IDS = CHARACTERS.map((c) => c.id);

function loadRoster(): number[] {
    try {
        const raw = localStorage.getItem(ROSTER_KEY);
        if (raw !== null) return JSON.parse(raw) as number[];
    } catch {
        // fall through
    }
    // Fresh install: all current characters included
    localStorage.setItem(ROSTER_KEY, JSON.stringify(ALL_IDS));
    return [...ALL_IDS];
}

function saveIds(ids: number[]) {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(ids));
}

export function useRoster() {
    const [rosterIds, setRosterIds] = useState<number[]>(() => loadRoster());

    const isInRoster = useCallback(
        (id: number) => rosterIds.includes(id),
        [rosterIds]
    );

    const toggleRoster = useCallback((id: number) => {
        setRosterIds((prev) => {
            const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
            saveIds(next);
            return next;
        });
    }, []);

    const enableAll = useCallback((ids: number[]) => {
        setRosterIds((prev) => {
            const next = Array.from(new Set([...prev, ...ids]));
            saveIds(next);
            return next;
        });
    }, []);

    const disableAll = useCallback((ids: number[]) => {
        setRosterIds((prev) => {
            const next = prev.filter((id) => !ids.includes(id));
            saveIds(next);
            return next;
        });
    }, []);

    return { rosterIds, isInRoster, toggleRoster, enableAll, disableAll };
}
