import { getPathIcon } from "../../lib/path";
import { getElementStyles } from "../../lib/element";
import type { Character } from "../../types/character";

const rarityColors: Record<number, string> = {
    5: "text-amber-500 dark:text-amber-400",
    4: "text-purple-500 dark:text-purple-400",
};

export function CardInfoStrip({ character, short = false }: { character: Character; short?: boolean }) {
    const el = getElementStyles(character.element);
    const rarityColor = rarityColors[character.rarity] ?? rarityColors[4];

    if (short) {
        return (
            <div className="flex flex-col gap-0.5 px-1.5 py-1 md:gap-1 md:px-2 md:py-1.5">
                <div className="flex h-[2em] items-center md:h-[2.5em]">
                    <p className="line-clamp-2 text-[10px] font-medium text-fg leading-tight md:text-sm md:font-semibold">
                        {character.name}
                    </p>
                </div>
                <div className="flex items-center gap-0.5 md:gap-1">
                    <span className={`${rarityColor} text-[9px] md:text-xs`} aria-label={`${character.rarity} star`}>
                        ★
                    </span>
                    <img
                        src={el.icon}
                        alt={character.element}
                        title={character.element}
                        className="w-3 h-3 md:w-4 md:h-4"
                    />
                    <img
                        src={getPathIcon(character.path)}
                        alt={character.path}
                        title={character.path}
                        className="w-3 h-3 md:w-4 md:h-4 invert dark:invert-0"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between gap-2 px-3 py-2">
            <div className="flex h-[2.5em] flex-1 min-w-0 items-center">
                <p className="line-clamp-2 text-sm font-semibold text-fg leading-tight">
                    <span className={`${rarityColor} mr-1 text-xs`} aria-label={`${character.rarity} star`}>
                        ★
                    </span>
                    {character.name}
                </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <img src={el.icon} alt={character.element} title={character.element} className="w-4 h-4" />
                <img
                    src={getPathIcon(character.path)}
                    alt={character.path}
                    title={character.path}
                    className="w-4 h-4 invert dark:invert-0"
                />
            </div>
        </div>
    );
}
