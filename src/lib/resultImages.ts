import type { Result } from "../hooks/useRandomizer";
import type { Team } from "../types/character";

const previews = (team: Team): string[] => team.members.map((m) => m.preview);
const portraits = (team: Team): string[] => team.members.map((m) => m.portrait);

export function resultImageUrls(result: Result | null): string[] {
    if (!result) return [];

    switch (result.mode) {
        case "team":
            return portraits(result.team);
        case "twoteam":
            return result.teams.flatMap(portraits);
        case "starward":
            return [...previews(result.nodes[0]), ...previews(result.nodes[1]), ...portraits(result.nodes[2])];
        case "aa":
            return [...result.knights.flatMap(previews), ...portraits(result.king)];
    }
}
