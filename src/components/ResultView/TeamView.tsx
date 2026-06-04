import { cva } from "class-variance-authority";
import type { Team } from "../../types/character";
import { CharacterCard } from "../CharacterCard";

const section = "flex flex-col gap-3 rounded-xl border border-border bg-card p-4";

const grid = cva("grid", {
    variants: {
        layout: {
            solo: "grid-cols-2 gap-6 sm:grid-cols-4",
            panel: "grid-cols-2 gap-4 md:grid-cols-4 md:gap-5",
            compact: "grid-cols-4 gap-2 md:grid-cols-2 md:gap-4",
        },
    },
});

export function TeamView({
    team,
    isInRoster,
    label,
    layout = "solo",
}: {
    team: Team;
    isInRoster: (id: number) => boolean;
    label: string;
    layout?: "solo" | "panel" | "compact";
}) {
    // Compact is the only short card, and the only one showing the wide splash art.
    const isShort = layout === "compact";

    return (
        <section className={section}>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-foreground/80">{label}</p>
            <div className={grid({ layout })}>
                {team.members.map((member) => (
                    <CharacterCard
                        key={member.id}
                        character={member}
                        selected
                        excluded={!isInRoster(member.id)}
                        imageSrc={isShort ? member.preview : member.portrait}
                        imageFit="cover"
                        short={isShort}
                    />
                ))}
            </div>
        </section>
    );
}
