import { useState, useMemo, useCallback } from "react";
import { CHARACTERS } from "../data/characters";
import { rollMultipleTeams, applyFilter, isSustain } from "../lib/randomize";
import type { Team } from "../types/character";
import type { GameMode, TwoTeamMode } from "../types/gameMode";

export type Result =
    | { mode: "team"; team: Team }
    | { mode: TwoTeamMode; teams: [Team, Team] }
    | { mode: "aa"; knights: [Team, Team, Team]; king: Team };

const TEAM_COUNT: Record<GameMode, number> = {
    team: 1,
    moc: 2, pf: 2, as: 2,
    aa: 3, // really 4, but actually 3 as far as validations are concerened
};

export function useRandomizer(
    rosterIds: number[],
    mode: GameMode,
    requireSustain: boolean,
) {
    const [result, setResult] = useState<Result | null>(null);

    const availableCharacters = useMemo(
        () => applyFilter(CHARACTERS, { includeIds: rosterIds }),
        [rosterIds]
    );

    const availableCount = useMemo(
        () => new Set(availableCharacters.map((c) => c.name)).size,
        [availableCharacters]
    );

    const sustainCount = useMemo(
        () => availableCharacters.filter(isSustain).length,
        [availableCharacters]
    );

    const teamCount = TEAM_COUNT[mode];
    const neededCount = teamCount * 4;
    const sustainAvailable = !requireSustain || sustainCount >= teamCount;

    const disabledReason = availableCount < neededCount
        ? "Not enough characters selected"
        : !sustainAvailable
            ? `Need ${teamCount} sustains, ${sustainCount} available`
            : undefined;

    const randomize = useCallback(() => {
        const filter = { includeIds: rosterIds, requireSustain };
        if (mode === "aa") {
            const [k1, k2, k3] = rollMultipleTeams(CHARACTERS, 3, 4, filter);
            const [king] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
            setResult({ mode: "aa", knights: [k1, k2, k3], king });
        } else if (TEAM_COUNT[mode] === 2) {
            const [side1, side2] = rollMultipleTeams(CHARACTERS, 2, 4, filter);
            setResult({ mode: mode as TwoTeamMode, teams: [side1, side2] });
        } else {
            const [team] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
            setResult({ mode: "team", team });
        }
    }, [rosterIds, requireSustain, mode]);

    return { result, randomize, disabledReason };
}
