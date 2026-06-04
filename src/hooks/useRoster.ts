import { useCallback } from "react";
import { CHARACTERS } from "../data/characters";
import { useLocalStorageState } from "./useLocalStorageState";

const ROSTER_KEY = "hsr-randomizer:roster";

export function useRoster() {
    // Fresh install: every current character is included. Read at first render
    // so the populated CHARACTERS array is in scope (see data/characters.ts).
    const [rosterIds, setRosterIds] = useLocalStorageState<number[]>(ROSTER_KEY, () => CHARACTERS.map((c) => c.id));

    const isInRoster = useCallback((id: number) => rosterIds.includes(id), [rosterIds]);

    const toggleRoster = useCallback(
        (id: number) => setRosterIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
        [setRosterIds]
    );

    const enableAll = useCallback(
        (ids: number[]) => setRosterIds((prev) => Array.from(new Set([...prev, ...ids]))),
        [setRosterIds]
    );

    const disableAll = useCallback(
        (ids: number[]) => setRosterIds((prev) => prev.filter((id) => !ids.includes(id))),
        [setRosterIds]
    );

    const importRoster = useCallback((ids: number[]) => setRosterIds(ids), [setRosterIds]);

    return { rosterIds, isInRoster, toggleRoster, enableAll, disableAll, importRoster };
}
