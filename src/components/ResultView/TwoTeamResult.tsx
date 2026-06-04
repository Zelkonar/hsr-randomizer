import { TeamView } from "./TeamView";
import { ModeHeader } from "./ModeHeader";
import type { Team } from "../../types/character";

export function TwoTeamResult({ teams, isInRoster }: { teams: [Team, Team]; isInRoster: (id: number) => boolean }) {
    return (
        <div className="space-y-4">
            <ModeHeader label="MoC / PF / AS" />
            <div className="flex flex-col gap-6">
                <TeamView team={teams[0]} label="Side 1" isInRoster={isInRoster} layout="half" />
                <TeamView team={teams[1]} label="Side 2" isInRoster={isInRoster} layout="half" />
            </div>
        </div>
    );
}
