import { useState, useCallback } from "react";

const STORAGE_KEY = "hsr_blacklist";

function loadBlacklist(): Set<number> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return new Set();
        return new Set(JSON.parse(raw) as number[]);
    } catch {
        return new Set();
    }
}

function saveBlacklist(ids: Set<number>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export interface UseRosterReturn {
    /** IDs of characters the user has blacklisted. */
    blacklist: Set<number>;
    /** Whether a character is blacklisted. */
    isBlacklisted: (id: number) => boolean;
    /** Add a character to the blacklist. */
    blacklistCharacter: (id: number) => void;
    /** Remove a character from the blacklist. */
    unblacklistCharacter: (id: number) => void;
    /** Toggle a character's blacklist status. Returns the new state. */
    toggleBlacklist: (id: number) => boolean;
    /** Clear the entire blacklist. */
    clearBlacklist: () => void;
}

export function useRoster(): UseRosterReturn {
    const [blacklist, setBlacklist] = useState<Set<number>>(() => loadBlacklist());

    const update = useCallback((next: Set<number>) => {
        setBlacklist(next);
        saveBlacklist(next);
    }, []);

    const isBlacklisted = useCallback(
        (id: number) => blacklist.has(id),
        [blacklist]
    );

    const blacklistCharacter = useCallback(
        (id: number) => {
            if (blacklist.has(id)) return;
            update(new Set([...blacklist, id]));
        },
        [blacklist, update]
    );

    const unblacklistCharacter = useCallback(
        (id: number) => {
            if (!blacklist.has(id)) return;
            const next = new Set(blacklist);
            next.delete(id);
            update(next);
        },
        [blacklist, update]
    );

    const toggleBlacklist = useCallback(
        (id: number): boolean => {
            const next = new Set(blacklist);
            if (next.has(id)) {
                next.delete(id);
                update(next);
                return false;
            } else {
                next.add(id);
                update(next);
                return true;
            }
        },
        [blacklist, update]
    );

    const clearBlacklist = useCallback(() => {
        update(new Set());
    }, [update]);

    return {
        blacklist,
        isBlacklisted,
        blacklistCharacter,
        unblacklistCharacter,
        toggleBlacklist,
        clearBlacklist,
    };
}