import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";
import type { Character } from "../../types/character";
import { getElementStyles } from "../../lib/element";
import { getPathIconSmall } from "../../lib/path";

const rarityDotColor: Record<number, string> = {
    5: "bg-amber-400",
    4: "bg-purple-400",
};

const cardButton = cva(
    "group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 w-full transition-all duration-150 cursor-pointer",
    {
        variants: {
            excluded: {
                false: "border-accent-line bg-accent-soft shadow-[0_0_10px_rgba(14,165,233,0.1)] hover:border-sky-400/60",
                true: "border-line-subtle bg-muted opacity-50 hover:opacity-75 dark:opacity-40 dark:hover:opacity-60",
            },
        },
    }
);

interface RosterCardProps {
    character: Character;
    excluded: boolean;
    onToggle: () => void;
}

export function RosterCard({ character, excluded, onToggle }: RosterCardProps) {
    return (
        <button
            onClick={onToggle}
            title={excluded ? `Add ${character.name} to roster` : `Remove ${character.name} from roster`}
            className={cardButton({ excluded })}
        >
            <span
                className={cn(
                    "absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full",
                    rarityDotColor[character.rarity] ?? rarityDotColor[4]
                )}
            />

            {excluded && (
                <span className="absolute top-1.5 left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-[9px] text-gray-600 font-bold dark:bg-white/20 dark:text-white/60">
                    ✕
                </span>
            )}

            <img
                src={character.icon}
                alt={character.name}
                className="h-14 w-14 rounded-lg object-cover"
                loading="lazy"
            />

            <div className="w-full text-center">
                <p className="truncate text-[10px] font-semibold text-fg-muted leading-tight">{character.name}</p>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                    <img
                        src={getElementStyles(character.element).icon}
                        alt={character.element}
                        className="w-3 h-3 opacity-70"
                    />
                    <img
                        src={getPathIconSmall(character.path)}
                        alt={character.path}
                        className="w-3 h-3 opacity-70 invert dark:invert-0"
                    />
                </div>
            </div>
        </button>
    );
}
