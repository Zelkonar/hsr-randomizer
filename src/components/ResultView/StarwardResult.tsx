import { TeamView } from "./TeamView";
import { ModeHeader } from "./ModeHeader";
import type { Team } from "../../types/character";

export function StarwardResult({
    nodes,
    isInRoster,
}: {
    nodes: [Team, Team, Team];
    isInRoster: (id: number) => boolean;
}) {
    return (
        <div className="space-y-4">
            <ModeHeader label="Starward" />
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                    <TeamView team={nodes[0]} label="Node 1" isInRoster={isInRoster} layout="compact" />
                    <TeamView team={nodes[1]} label="Node 2" isInRoster={isInRoster} layout="compact" />
                </div>
                <TeamView team={nodes[2]} label="Node 3" isInRoster={isInRoster} layout="panel" />
            </div>
        </div>
    );
}
