import type { Character } from "../types/character";
import { memo } from "react";
import { getElementStyles } from "../utils/element";

interface Props {
  character: Character;
  selected?: boolean;
  blacklisted?: boolean;
  imageSrc?: string;
  imageFit?: "contain" | "cover";
}

const styles = {
  card: "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 bg-gray-900",
  cardDefaultBorder: "border-white/10 hover:border-white/25",
  cardSelectedScale: "scale-[1.03]",
  cardDefaultScale: "hover:scale-[1.02]",
  cardBlacklisted: "opacity-60 grayscale",
  portrait: "relative aspect-[3/4] w-full overflow-hidden bg-gray-800",
  portraitGradient: "absolute inset-0 bg-gradient-to-t",
  rarityStars: "absolute bottom-2 left-2 text-xs font-bold tracking-widest drop-shadow",
  infoStrip: "flex flex-col gap-1 px-3 py-2",
  name: "truncate text-sm font-semibold text-white leading-tight",
  tagsRow: "flex items-center gap-1.5 flex-wrap",
  pathTag: "text-[10px] text-gray-500",
};

const imgStyles: Record<"contain" | "cover", string> = {
  contain: "h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105 p-1",
  cover: "h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105",
};

const rarityColors: Record<number, string> = {
  5: "text-amber-400",
  4: "text-purple-400",
};

const GRADIENT = "from-black/75 via-black/5 to-transparent";

function CharacterCardImpl({
  character,
  selected = false,
  blacklisted = false,
  imageSrc,
  imageFit = "contain",
}: Props) {
  const el = getElementStyles(character.element);
  const rarityColor = rarityColors[character.rarity] ?? rarityColors[4];
  const src = imageSrc ?? character.preview;

  const cardClass = [
    styles.card,
    selected ? `${el.border} shadow-lg ${el.glow}` : styles.cardDefaultBorder,
    selected ? styles.cardSelectedScale : styles.cardDefaultScale,
    blacklisted ? styles.cardBlacklisted : "",
  ].join(" ");

  const elementBadgeClass = `inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${el.bg} ${el.text}`;

  return (
    <article
      className={cardClass}
      style={
        selected
          ? { boxShadow: `0 0 30px 5px ${el.hex}55, 0 4px 24px rgba(0,0,0,0.5)` }
          : undefined
      }
    >
      <div className={styles.portrait}>
        <img src={src} alt={character.name} loading="lazy" className={imgStyles[imageFit]} />

        <div className={`${styles.portraitGradient} ${GRADIENT}`} />

        <span className={`${styles.rarityStars} ${rarityColor}`} aria-label={`${character.rarity} star`}>
          {"★".repeat(character.rarity)}
        </span>

      </div>

      <div className={styles.infoStrip}>
        <p className={styles.name}>{character.name}</p>
        <div className={styles.tagsRow}>
          <span className={elementBadgeClass}>{character.element}</span>
          <span className={styles.pathTag}>{character.path}</span>
        </div>
      </div>
    </article>
  );
}

export const CharacterCard = memo(CharacterCardImpl);
