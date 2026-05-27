import { cva } from "class-variance-authority";
import type { Team } from "../../types/character";
import { CharacterCard } from "../CharacterCard";

const section = cva("flex flex-col gap-3", {
    variants: {
        layout: {
            full: "",
            half: "rounded-xl border border-white/8 bg-white/[0.025] p-4",
            knight: "rounded-xl border border-white/8 bg-white/[0.025] p-4",
        },
    },
});

const grid = cva("grid", {
    variants: {
        layout: {
            full: "grid-cols-2 gap-6 sm:grid-cols-4",
            half: "grid-cols-2 gap-4 md:grid-cols-4 md:gap-5",
            knight: "grid-cols-4 gap-2 md:grid-cols-2 md:gap-4",
        },
    },
});

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

    return (
        <section className={section({ layout })}>
            {layout === "full" ? (
                <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
                    <span className="block h-px flex-1 bg-white/10" />
                    {label}
                    <span className="block h-px flex-1 bg-white/10" />
                </p>
            ) : (
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/70">{label}</p>
            )}
            <div className={grid({ layout })}>
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
