import { useCallback } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const SAVED_ROSTERS_KEY = "hsr-randomizer:saved-rosters";

export function useSavedRosters() {
    const [savedRosters, setSavedRosters] = useLocalStorageState<Record<string, number[]>>(SAVED_ROSTERS_KEY, {});

    const saveRoster = useCallback(
        (name: string, ids: number[]) => setSavedRosters((prev) => ({ ...prev, [name]: ids })),
        [setSavedRosters]
    );

    const deleteSavedRoster = useCallback(
        (name: string) =>
            setSavedRosters((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            }),
        [setSavedRosters]
    );

    return { savedRosters, saveRoster, deleteSavedRoster };
}
