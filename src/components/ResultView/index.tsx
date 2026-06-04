import { TeamView } from "./TeamView";
import { TwoTeamResult } from "./TwoTeamResult";
import { AnomalyArbitrationResult } from "./AnomalyArbitrationResult";
import { StarwardResult } from "./StarwardResult";
import type { Result } from "../../hooks/useRandomizer";

export function ResultView({ result, isInRoster }: { result: Result; isInRoster: (id: number) => boolean }) {
    if (result.mode === "team") {
        return <TeamView team={result.team} label="Your Team" isInRoster={isInRoster} />;
    }

    if (result.mode === "aa") {
        return <AnomalyArbitrationResult knights={result.knights} king={result.king} isInRoster={isInRoster} />;
    }

    if (result.mode === "starward") {
        return <StarwardResult nodes={result.nodes} isInRoster={isInRoster} />;
    }

    return <TwoTeamResult teams={result.teams} isInRoster={isInRoster} />;
}
