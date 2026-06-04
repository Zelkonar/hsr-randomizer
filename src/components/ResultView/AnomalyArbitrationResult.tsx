import { TeamView } from "./TeamView";
import { ModeHeader } from "./ModeHeader";
import type { Team } from "../../types/character";

export function AnomalyArbitrationResult({
    knights,
    king,
    isInRoster,
}: {
    knights: [Team, Team, Team];
    king: Team;
    isInRoster: (id: number) => boolean;
}) {
    return (
        <div className="space-y-4">
            <ModeHeader label="Anomaly Arbitration" />
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                    <TeamView team={knights[0]} label="Knight 1" isInRoster={isInRoster} layout="compact" />
                    <TeamView team={knights[1]} label="Knight 2" isInRoster={isInRoster} layout="compact" />
                    <TeamView team={knights[2]} label="Knight 3" isInRoster={isInRoster} layout="compact" />
                </div>
                <TeamView team={king} label="King" isInRoster={isInRoster} layout="panel" />
            </div>
        </div>
    );
}
