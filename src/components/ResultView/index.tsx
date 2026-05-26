import { TeamView } from "./TeamView";
import { TwoTeamResult } from "./TwoTeamResult";
import { AnomalyArbitrationResult } from "./AnomalyArbitrationResult";
import type { Result } from "../../hooks/useRandomizer";

export function ResultView({
    result,
    isInRoster,
}: {
    result: Result;
    isInRoster: (id: number) => boolean;
}) {
    if (result.mode === "team") {
        return <TeamView team={result.team} label="Your Team" isInRoster={isInRoster} />;
    }

    if (result.mode === "aa") {
        return <AnomalyArbitrationResult knights={result.knights} king={result.king} isInRoster={isInRoster} />;
    }

    return <TwoTeamResult mode={result.mode} teams={result.teams} isInRoster={isInRoster} />;
}
