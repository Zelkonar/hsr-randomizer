import { TeamView } from "../TeamView";
import { ModeHeader } from "./ModeHeader";
import type { TwoTeamMode } from "../../types/gameMode";
import type { Team } from "../../types/character";

const TWO_TEAM_LABELS: Record<TwoTeamMode, string> = {
    moc: "Memory of Chaos",
    pf: "Pure Fiction",
    as: "Apocalyptic Shadow",
};

export function TwoTeamResult({
    mode,
    teams,
    isInRoster,
}: {
    mode: TwoTeamMode;
    teams: [Team, Team];
    isInRoster: (id: number) => boolean;
}) {
    return (
        <div className="space-y-4">
            <ModeHeader mode={mode} label={TWO_TEAM_LABELS[mode]} />
            <div className="flex flex-col gap-6">
                <TeamView team={teams[0]} label="Side 1" isInRoster={isInRoster} layout="half" />
                <TeamView team={teams[1]} label="Side 2" isInRoster={isInRoster} layout="half" />
            </div>
        </div>
    );
}
