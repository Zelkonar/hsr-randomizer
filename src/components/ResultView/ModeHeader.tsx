import { ASSETS_CDN } from "../../config/assets";
import type { TwoTeamMode } from "../../types/gameMode";

const MODE_ICONS: Record<TwoTeamMode | "aa", { cdn: string; local: string }> = {
    moc: { cdn: `${ASSETS_CDN}/sign/AbyssIcon02.png`, local: "/sign/AbyssIcon02.png" },
    pf: { cdn: `${ASSETS_CDN}/sign/ChallengeStory.png`, local: "/sign/ChallengeStory.png" },
    as: { cdn: `${ASSETS_CDN}/sign/ChallengeBoss.png`, local: "/sign/ChallengeBoss.png" },
    aa: { cdn: `${ASSETS_CDN}/sign/AbyssThemeTabIcon.png`, local: "/sign/AbyssThemeTabIcon.png" },
};

function ModeIcon({ mode }: { mode: TwoTeamMode | "aa" }) {
    const icon = MODE_ICONS[mode];
    return (
        <img
            src={icon.cdn}
            alt=""
            aria-hidden
            className="h-5 w-5 object-contain"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = icon.local;
            }}
        />
    );
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
