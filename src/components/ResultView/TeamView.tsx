import type { Team } from "../../types/character";
import { CharacterCard } from "../CharacterCard";

const styles = {
  section: "flex flex-col gap-3",
  sectionPanel: "flex flex-col gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-4",
  labelFull: "flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30",
  labelPanel: "text-center text-xs font-semibold uppercase tracking-widest text-white/70",
  dividerLine: "block h-px flex-1 bg-white/10",
  gridFull: "grid grid-cols-2 gap-6 sm:grid-cols-4",
  gridHalf: "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5",
  gridKnight: "grid grid-cols-4 gap-2 md:grid-cols-2 md:gap-4",
};

export function TeamView({
    team,
    isInRoster,
    label,
    layout = "full",
}: {
    team: Team;
    isInRoster: (id: number) => boolean;
    label: string;
    layout?: "full" | "half" | "knight";
}) {
    const isKnight = layout === "knight";
    const grid = layout === "full" ? styles.gridFull : isKnight ? styles.gridKnight : styles.gridHalf;
    const sectionClass = layout !== "full" ? styles.sectionPanel : styles.section;

    return (
        <section className={sectionClass}>
            {layout === "full" ? (
                <p className={styles.labelFull}>
                    <span className={styles.dividerLine} />
                    {label}
                    <span className={styles.dividerLine} />
                </p>
            ) : (
                <p className={styles.labelPanel}>{label}</p>
            )}
            <div className={grid}>
                {team.members.map((member) => (
                    <CharacterCard
                        key={member.id}
                        character={member}
                        selected
                        excluded={!isInRoster(member.id)}
                        imageSrc={isKnight ? member.preview : member.portrait}
                        imageFit="cover"
                        short={isKnight}
                    />
                ))}
            </div>
        </section>
    );
}
