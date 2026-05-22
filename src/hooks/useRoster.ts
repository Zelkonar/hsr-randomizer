import { useState, useCallback } from "react";

const BLACKLIST_KEY = "hsr-randomizer:blacklist";

function loadIds(key: string): number[] {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
        return [];
    }
}

function saveIds(key: string, ids: number[]) {
    localStorage.setItem(key, JSON.stringify(ids));
}

export function useRoster() {
    const [blacklistIds, setBlacklistIds] = useState<number[]>(() => loadIds(BLACKLIST_KEY));

    const isBlacklisted = useCallback(
        (id: number) => blacklistIds.includes(id),
        [blacklistIds]
    );

    const toggleBlacklist = useCallback((id: number) => {
        setBlacklistIds((prev) => {
            const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
            saveIds(BLACKLIST_KEY, next);
            return next;
        });
    }, []);

    // Add all given ids to the blacklist (disable them)
    const disableAll = useCallback((ids: number[]) => {
        setBlacklistIds((prev) => {
            const next = Array.from(new Set([...prev, ...ids]));
            saveIds(BLACKLIST_KEY, next);
            return next;
        });
    }, []);

    // Remove all given ids from the blacklist (enable them)
    const enableAll = useCallback((ids: number[]) => {
        setBlacklistIds((prev) => {
            const next = prev.filter((id) => !ids.includes(id));
            saveIds(BLACKLIST_KEY, next);
            return next;
        });
    }, []);

    return { blacklistIds, isBlacklisted, toggleBlacklist, enableAll, disableAll };
}