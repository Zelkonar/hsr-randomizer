import type { TwoTeamMode } from "../../types/gameMode";

const MODE_ICONS: Record<TwoTeamMode | "aa", string> = {
    moc: "/sign/AbyssIcon02.png",
    pf: "/sign/ChallengeStory.png",
    as: "/sign/ChallengeBoss.png",
    aa: "/sign/AbyssThemeTabIcon.png",
};

function ModeIcon({ mode }: { mode: TwoTeamMode | "aa" }) {
    return <img src={MODE_ICONS[mode]} alt="" aria-hidden className="h-5 w-5 object-contain" />;
}

export function ModeHeader({ mode, label }: { mode: TwoTeamMode | "aa"; label: string }) {
    return (
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white/70">
            <span className="block h-px flex-1 bg-white/10" />
            <ModeIcon mode={mode} />
            {label}
            <span className="block h-px flex-1 bg-white/10" />
        </p>
    );
}
