import type { Character } from "../types/character";
import { getElementStyles } from "../utils/element";

interface Props {
  character: Character;
  /** Highlight this card (e.g. it's part of the current random team) */
  selected?: boolean;
  onClick?: (character: Character) => void;
  /** Whether the user has blacklisted this character */
  blacklisted?: boolean;
  /** Toggle blacklist state for this character by id */
  onToggleBlacklist?: (id: number) => void;
}

const GRADIENT: string = "from-black/70 via-black/30 to-transparent";

const RARITY_BADGE: Record<number, string> = {
  5: "text-amber-400",
  4: "text-purple-400",
};

/** Trailblazer entries come in as "{NICKNAME}" from the data source. */
function displayName(name: string): string {
  return name === "{NICKNAME}" ? "Trailblazer" : name;
}

export function CharacterCard({
  character,
  selected = false,
  onClick,
  blacklisted = false,
  onToggleBlacklist,
}: Props) {
  const el = getElementStyles(character.element);
  const rarityBadge = RARITY_BADGE[character.rarity] ?? RARITY_BADGE[4];
  const stars = "★".repeat(character.rarity);

  return (
    <article
      onClick={() => {
        if (onToggleBlacklist) {
          onToggleBlacklist(character.id);
        } else {
          onClick?.(character);
        }
      }}
      className={[
        "group relative flex flex-col overflow-hidden rounded-xl cursor-pointer",
        "border transition-all duration-300",
        "bg-gray-900",
        selected
          ? `${el.border} shadow-lg ${el.glow}`
          : "border-white/10 hover:border-white/25",
        selected ? "scale-[1.03]" : "hover:scale-[1.02]",
        onClick ? "cursor-pointer" : "cursor-default",
        blacklisted ? "opacity-60 grayscale" : "",
      ].join(" ")}
      style={
        selected
          ? { boxShadow: `0 0 24px 2px ${el.hex}55, 0 4px 24px rgba(0,0,0,0.5)` }
          : undefined
      }
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-800">
        <img
          src={character.portrait}
          alt={displayName(character.name)}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom gradient overlay for text legibility */}
        <div className={`absolute inset-0 bg-gradient-to-t ${GRADIENT}`} />

        {/* Rarity stars — bottom left over the image */}
        <span
          className={`absolute bottom-2 left-2 text-xs font-bold tracking-widest ${rarityBadge} drop-shadow`}
          aria-label={`${character.rarity} star`}
        >
          {stars}
        </span>

        {/* Blacklist toggle — top-right (icon-only, unobtrusive) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBlacklist?.(character.id);
          }}
          className="absolute top-2 right-2 z-10 p-1 text-sm text-white/70 hover:text-white"
          aria-pressed={blacklisted}
          title={blacklisted ? "Unblacklist" : "Blacklist"}
        >
          {blacklisted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Selected indicator */}
        {selected && (
          <div
            className="absolute inset-0 rounded-xl ring-2 ring-inset pointer-events-none"
            style={{ borderColor: el.hex }}
          />
        )}
      </div>

      {/* Info strip */}
      <div className="flex flex-col gap-1 px-3 py-2">
        {/* Name */}
        <p className="truncate text-sm font-semibold text-white leading-tight">
          {displayName(character.name)}
        </p>

        {/* Element + Path */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${el.bg} ${el.text}`}
          >
            {character.element}
          </span>
          <span className="text-[10px] text-gray-500">{character.path}</span>
        </div>
      </div>
    </article>
  );
}
