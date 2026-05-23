import type { Team } from "../types/character";
import { CharacterCard } from "./CharacterCard";

const styles = {
  label: "mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30",
  dividerLine: "block h-px flex-1 bg-white/10",
  grid: "grid grid-cols-2 gap-6 sm:grid-cols-4",
};

export function TeamView({
    team,
    isInRoster,
}: {
    team: Team;
    isInRoster: (id: number) => boolean;
}) {
    return (
        <section>
            <p className={styles.label}>
                <span className={styles.dividerLine} />
                Your Team
                <span className={styles.dividerLine} />
            </p>
            <div className={styles.grid}>
                {team.members.map((member) => (
                    <CharacterCard
                        key={member.id}
                        character={member}
                        selected
                        excluded={!isInRoster(member.id)}
                        imageSrc={member.portrait}
                        imageFit="cover"
                    />
                ))}
            </div>
        </section>
    );
}
