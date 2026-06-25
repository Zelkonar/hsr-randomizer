import { TeamView } from "./TeamView";
import { TwoTeamResult } from "./TwoTeamResult";
import { AnomalyArbitrationResult } from "./AnomalyArbitrationResult";
import { StarwardResult } from "./StarwardResult";
import type { Result } from "../../hooks/useRandomizer";
import type { GameMode } from "../../types/gameMode";

export function ResultView({
    mode,
    result,
    isInRoster,
}: {
    mode: GameMode;
    result: Result | null;
    isInRoster: (id: number) => boolean;
}) {
    if (mode === "team") {
        const team = result && result.mode === "team" ? result.team : undefined;
        return <TeamView team={team} label="Your Team" isInRoster={isInRoster} />;
    }

    if (mode === "aa") {
        const aa = result && result.mode === "aa" ? result : undefined;
        return <AnomalyArbitrationResult knights={aa?.knights} king={aa?.king} isInRoster={isInRoster} />;
    }

    if (mode === "starward") {
        const starward = result && result.mode === "starward" ? result : undefined;
        return <StarwardResult nodes={starward?.nodes} isInRoster={isInRoster} />;
    }

    const twoteam = result && result.mode === "twoteam" ? result : undefined;
    return <TwoTeamResult teams={twoteam?.teams} isInRoster={isInRoster} />;
}
