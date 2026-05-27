import type { Character } from "../../types/character";
import { getElementStyles } from "../../lib/element";
import { getPathIconSmall } from "../../lib/path";

const styles = {
    buttonBase: "group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 w-full transition-all duration-150 cursor-pointer",
    buttonActive: "border-sky-500/40 bg-sky-500/8 shadow-[0_0_10px_rgba(14,165,233,0.1)] hover:border-sky-400/60",
    buttonExcluded: "border-white/5 bg-white/3 opacity-40 hover:opacity-60",
    rarityDot: "absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full",
    excludedBadge: "absolute top-1.5 left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[9px] text-white/60 font-bold",
    icon: "h-14 w-14 rounded-lg object-cover",
    name: "truncate text-[10px] font-semibold text-white/90 leading-tight",
    icons: "flex items-center justify-center gap-1 mt-0.5",
    info: "w-full text-center",
};

const rarityDotColor: Record<number, string> = {
    5: "bg-amber-400",
    4: "bg-purple-400",
};

interface RosterCardProps {
    character: Character;
    excluded: boolean;
    onToggle: () => void;
}

export function RosterCard({ character, excluded, onToggle }: RosterCardProps) {
    const buttonClass = [
        styles.buttonBase,
        excluded ? styles.buttonExcluded : styles.buttonActive,
    ].join(" ");

    return (
        <button
            onClick={onToggle}
            title={excluded ? `Add ${character.name} to roster` : `Remove ${character.name} from roster`}
            className={buttonClass}
        >
            <span className={[styles.rarityDot, rarityDotColor[character.rarity] ?? rarityDotColor[4]].join(" ")} />

            {excluded && (
                <span className={styles.excludedBadge}>✕</span>
            )}

            <img
                src={character.icon}
                alt={character.name}
                className={styles.icon}
                loading="lazy"
            />

            <div className={styles.info}>
                <p className={styles.name}>{character.name}</p>
                <div className={styles.icons}>
                    <img src={getElementStyles(character.element).icon} alt={character.element} className="w-3 h-3 opacity-70" />
                    <img src={getPathIconSmall(character.path)} alt={character.path} className="w-3 h-3 opacity-70" />
                </div>
            </div>
        </button>
    );
}
