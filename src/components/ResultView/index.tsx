import { TeamView } from "./TeamView";
import { TwoTeamResult } from "./TwoTeamResult";
import { AnomalyArbitrationResult } from "./AnomalyArbitrationResult";
import { StarwardResult } from "./StarwardResult";
import { useReadyResult } from "../../hooks/useReadyResult";
import type { Result } from "../../hooks/useRandomizer";
import type { GameMode } from "../../types/gameMode";

function ResultBody({
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

export function ResultView({
    mode,
    result,
    isInRoster,
}: {
    mode: GameMode;
    result: Result | null;
    isInRoster: (id: number) => boolean;
}) {
    const { displayed, loading } = useReadyResult(result);

    return (
        <div className="relative" aria-busy={loading}>
            <div className={loading ? "opacity-40 transition-opacity duration-200" : "transition-opacity duration-200"}>
                <ResultBody mode={mode} result={displayed} isInRoster={isInRoster} />
            </div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center" role="status">
                    <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-border border-t-primary" />
                    <span className="sr-only">Loading team artwork</span>
                </div>
            )}
        </div>
    );
}
