import { memo } from "react";
import { getElementStyles } from "../../lib/element";
import { CardPortrait } from "./CardPortrait";
import { CardInfoStrip } from "./CardInfoStrip";
import type { Character } from "../../types/character";

interface Props {
    character: Character;
    selected?: boolean;
    excluded?: boolean;
    imageSrc?: string;
    imageFit?: "contain" | "cover";
    short?: boolean;
}

function CharacterCardImpl({
    character,
    selected = false,
    excluded = false,
    imageSrc,
    imageFit = "contain",
    short = false,
}: Props) {
    const el = getElementStyles(character.element);

    const cardClass = [
        "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 bg-white shadow-sm dark:bg-gray-900 dark:shadow-none",
        selected
            ? `${el.border} shadow-lg ${el.glow}`
            : "border-gray-200 hover:border-gray-300 dark:border-white/10 dark:hover:border-white/25",
        selected ? "scale-[1.03]" : "hover:scale-[1.02]",
        excluded ? "opacity-60 grayscale" : "",
    ].join(" ");

    return (
        <article
            className={cardClass}
            style={selected ? { boxShadow: `0 0 30px 5px ${el.hex}55, 0 4px 24px rgba(0,0,0,0.5)` } : undefined}
        >
            <CardPortrait character={character} imageSrc={imageSrc} imageFit={imageFit} short={short} />
            <CardInfoStrip character={character} short={short} />
        </article>
    );
}

export const CharacterCard = memo(CharacterCardImpl);
