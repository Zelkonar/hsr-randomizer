import type { Character } from "../types/character";
import { memo } from "react";
import { getElementStyles } from "../utils/element";
import { getPathIcon, getPathIconLarge, getPathIconLocal, getPathIconLargeLocal } from "../utils/path";

interface Props {
  character: Character;
  selected?: boolean;
  excluded?: boolean;
  imageSrc?: string;
  imageFit?: "contain" | "cover";
  short?: boolean;
}

const styles = {
  card: "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 bg-gray-900",
  cardDefaultBorder: "border-white/10 hover:border-white/25",
  cardSelectedScale: "scale-[1.03]",
  cardDefaultScale: "hover:scale-[1.02]",
  cardBlacklisted: "opacity-60 grayscale",
  portrait: "relative aspect-[3/4] w-full overflow-hidden bg-gray-800",
  portraitShort: "relative aspect-square w-full overflow-hidden bg-gray-800",
  portraitGradient: "absolute inset-0 bg-gradient-to-t",
  infoStrip: "flex items-center justify-between gap-2 px-3 py-2",
  name: "truncate text-sm font-semibold text-white leading-tight",
};

const imgStyles: Record<"contain" | "cover", string> = {
  contain: "absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 p-1",
  cover: "absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105",
};

const rarityColors: Record<number, string> = {
  5: "text-amber-400",
  4: "text-purple-400",
};

const GRADIENT = "from-black/75 via-black/5 to-transparent";

function CharacterCardImpl({
  character,
  selected = false,
  excluded = false,
  imageSrc,
  imageFit = "contain",
  short = false,
}: Props) {
  const el = getElementStyles(character.element);
  const rarityColor = rarityColors[character.rarity] ?? rarityColors[4];
  const src = imageSrc ?? character.preview;

  const cardClass = [
    styles.card,
    selected ? `${el.border} shadow-lg ${el.glow}` : styles.cardDefaultBorder,
    selected ? styles.cardSelectedScale : styles.cardDefaultScale,
    excluded ? styles.cardBlacklisted : "",
  ].join(" ");

  return (
    <article
      className={cardClass}
      style={
        selected
          ? { boxShadow: `0 0 30px 5px ${el.hex}55, 0 4px 24px rgba(0,0,0,0.5)` }
          : undefined
      }
    >
      <div className={short ? styles.portraitShort : styles.portrait}>
        <img src={getPathIconLarge(character.path)} alt="" aria-hidden className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-40" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getPathIconLargeLocal(character.path); }} />
        <img src={src} alt={character.name} loading="lazy" className={imgStyles[imageFit]} />

        <div className={`${styles.portraitGradient} ${GRADIENT}`} />

      </div>

      <div className={styles.infoStrip}>
        <p className={styles.name}>
          <span className={`${rarityColor} mr-1 text-xs`} aria-label={`${character.rarity} star`}>★</span>
          {character.name}
        </p>
        <div className="flex items-center gap-1 shrink-0">
          <img src={el.icon} alt={character.element} className="w-4 h-4" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = el.iconLocal; }} />
          <img src={getPathIcon(character.path)} alt={character.path} className="w-4 h-4" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getPathIconLocal(character.path); }} />
        </div>
      </div>
    </article>
  );
}

export const CharacterCard = memo(CharacterCardImpl);
