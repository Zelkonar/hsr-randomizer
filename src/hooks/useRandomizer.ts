import { useState, useMemo, useCallback } from "react";
import { CHARACTERS } from "../data/characters";
import { rollMultipleTeams, applyFilter, isSustain } from "../utils/randomize";
import type { Team } from "../types/character";
import type { GameMode, TwoTeamMode } from "../types/gameMode";

export type Result =
    | { mode: "team"; team: Team }
    | { mode: TwoTeamMode; teams: [Team, Team] }
    | { mode: "aa"; knights: [Team, Team, Team]; king: Team };

const TWO_TEAM_MODES = new Set<GameMode>(["moc", "pf", "as"]);

// TODO: we have an issue where if we're doing multiple team type deal,
// if we have constraints like "must have sustain" and we roll a team with
// sustain, then the next team might not have sustain but it won't re-roll 
// because the first team already satisfies the requirement. We should probably
// re-roll all teams if any of them don't satisfy the requirement, but that
// might be a bit more complex to implement
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

    const sustainAvailable = useMemo(
        () => !requireSustain || availableCharacters.some(isSustain),
        [requireSustain, availableCharacters]
    );

    const neededCount = mode === "aa" ? 12 : TWO_TEAM_MODES.has(mode) ? 8 : 4;

    const disabledReason = availableCount < neededCount
        ? "Not enough characters selected"
        : !sustainAvailable
            ? "No sustain available"
            : undefined;

    const randomize = useCallback(() => {
        const filter = { includeIds: rosterIds, requireSustain };
        if (mode === "aa") {
            const [k1, k2, k3] = rollMultipleTeams(CHARACTERS, 3, 4, filter);
            const [king] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
            setResult({ mode: "aa", knights: [k1, k2, k3], king });
        } else if (TWO_TEAM_MODES.has(mode)) {
            const [side1, side2] = rollMultipleTeams(CHARACTERS, 2, 4, filter);
            setResult({ mode: mode as TwoTeamMode, teams: [side1, side2] });
        } else {
            const [team] = rollMultipleTeams(CHARACTERS, 1, 4, filter);
            setResult({ mode: "team", team });
        }
    }, [rosterIds, requireSustain, mode]);

    return { result, randomize, disabledReason };
}
