import { getPathIconLarge } from "../../lib/path";
import type { Character } from "../../types/character";

const imgStyles: Record<"contain" | "cover", string> = {
    contain:
        "absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 p-1",
    cover: "absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105",
};

const GRADIENT = "from-black/75 via-black/5 to-transparent";

export function CardPortrait({
    character,
    imageSrc,
    imageFit = "contain",
    short = false,
}: {
    character: Character;
    imageSrc?: string;
    imageFit?: "contain" | "cover";
    short?: boolean;
}) {
    const src = imageSrc ?? character.preview;
    const portraitClass = short
        ? "relative aspect-square w-full overflow-hidden bg-gray-200 dark:bg-gray-800"
        : "relative aspect-[3/4] w-full overflow-hidden bg-gray-200 dark:bg-gray-800";

    return (
        <div className={portraitClass}>
            <img
                src={getPathIconLarge(character.path)}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain invert opacity-[0.08] mix-blend-multiply dark:invert-0 dark:opacity-40 dark:mix-blend-screen"
            />
            <img src={src} alt={character.name} fetchPriority="high" decoding="async" className={imgStyles[imageFit]} />
            <div className={`absolute inset-0 bg-gradient-to-t ${GRADIENT}`} />
        </div>
    );
}
