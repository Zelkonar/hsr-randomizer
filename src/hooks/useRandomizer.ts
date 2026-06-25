import { useState, useMemo, useCallback } from "react";
import { CHARACTERS } from "../data/characters";
import { rollMultipleTeams, applyFilter, isSustain } from "../lib/randomize";
import type { Team } from "../types/character";
import type { GameMode } from "../types/gameMode";

export type Result =
    | { mode: "team"; team: Team }
    | { mode: "twoteam"; teams: [Team, Team] }
    | { mode: "starward"; nodes: [Team, Team, Team] }
    | { mode: "aa"; knights: [Team, Team, Team]; king: Team };

const TEAM_COUNT: Record<GameMode, number> = {
    team: 1,
    twoteam: 2,
    starward: 3,
    aa: 3, // really 4, but actually 3 as far as validations are concerened
};

export function useRandomizer(rosterIds: number[], mode: GameMode, requireSustain: boolean) {
    // One cached result per mode, so switching modes never discards another
    // mode's last roll. In-memory only; not persisted across page loads.
    const [resultsByMode, setResultsByMode] = useState<Partial<Record<GameMode, Result>>>({});
    const result = resultsByMode[mode] ?? null;

    const availableCharacters = useMemo(() => applyFilter(CHARACTERS, { includeIds: rosterIds }), [rosterIds]);

    const availableCount = useMemo(() => new Set(availableCharacters.map((c) => c.name)).size, [availableCharacters]);

    const sustainCount = useMemo(() => availableCharacters.filter(isSustain).length, [availableCharacters]);

    const teamCount = TEAM_COUNT[mode];
    const neededCount = teamCount * 4;
    const sustainAvailable = !requireSustain || sustainCount >= teamCount;

    const disabledReason =
        availableCount < neededCount
            ? "Not enough characters selected"
            : !sustainAvailable
              ? `Need ${teamCount} sustains, ${sustainCount} available`
              : undefined;

    const randomize = useCallback(() => {
        const filter = { includeIds: rosterIds, requireSustain };
        let next: Result;
        if (mode === "aa") {
            const [k1, k2, k3] = rollMultipleTeams(CHARACTERS, 3, 4, filter);
            const [king] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
            next = { mode, knights: [k1, k2, k3], king };
        } else if (mode === "starward") {
            const [n1, n2, n3] = rollMultipleTeams(CHARACTERS, 3, 4, filter);
            next = { mode, nodes: [n1, n2, n3] };
        } else if (mode === "twoteam") {
            const [side1, side2] = rollMultipleTeams(CHARACTERS, 2, 4, filter);
            next = { mode, teams: [side1, side2] };
        } else {
            const [team] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
            next = { mode, team };
        }
        setResultsByMode((prev) => ({ ...prev, [mode]: next }));
    }, [rosterIds, requireSustain, mode]);

    return { result, randomize, disabledReason };
}
