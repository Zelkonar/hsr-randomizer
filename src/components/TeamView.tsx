import type { Team } from "../types/character";
import { CharacterCard } from "./CharacterCard";

export function TeamView({
    team,
    isBlacklisted,
}: {
    team: Team;
    isBlacklisted: (id: number) => boolean;
}) {
    return (
        <section>
            <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
                <span className="block h-px flex-1 bg-white/10" />
                Your Team
                <span className="block h-px flex-1 bg-white/10" />
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {team.members.map((member) => (
                    <CharacterCard
                        key={member.id}
                        character={member}
                        selected
                        blacklisted={isBlacklisted(member.id)}
                        imageSrc={member.portrait}
                        imageFit="cover"
                    />
                ))}
            </div>
            <div>

            </div>
        </section>
    );
}
