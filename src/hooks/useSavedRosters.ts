import { useState, useCallback } from "react";

const SAVED_ROSTERS_KEY = "hsr-randomizer:saved-rosters";

function loadSavedRosters(): Record<string, number[]> {
    try {
        const raw = localStorage.getItem(SAVED_ROSTERS_KEY);
        if (raw !== null) return JSON.parse(raw) as Record<string, number[]>;
    } catch {
        // fall through
    }
    return {};
}

function persistSavedRosters(rosters: Record<string, number[]>) {
    localStorage.setItem(SAVED_ROSTERS_KEY, JSON.stringify(rosters));
}

export function useSavedRosters() {
    const [savedRosters, setSavedRosters] = useState<Record<string, number[]>>(() => loadSavedRosters());

    const saveRoster = useCallback((name: string, ids: number[]) => {
        setSavedRosters((prev) => {
            const next = { ...prev, [name]: ids };
            persistSavedRosters(next);
            return next;
        });
    }, []);

    const deleteSavedRoster = useCallback((name: string) => {
        setSavedRosters((prev) => {
            const next = { ...prev };
            delete next[name];
            persistSavedRosters(next);
            return next;
        });
    }, []);

    return { savedRosters, saveRoster, deleteSavedRoster };
}
