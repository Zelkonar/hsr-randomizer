import type { Character } from "../../types/character";

interface RosterCardProps {
    character: Character;
    blacklisted: boolean;
    onToggle: () => void;
}

export function RosterCard({ character, blacklisted, onToggle }: RosterCardProps) {
    return (
        <button
            onClick={onToggle}
            title={blacklisted ? `Add ${character.name} to roster` : `Remove ${character.name} from roster`}
            className={`
        group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 w-full
        transition-all duration-150 cursor-pointer
        ${blacklisted
                    ? "border-white/5 bg-white/3 opacity-40 hover:opacity-60"
                    : "border-sky-500/40 bg-sky-500/8 shadow-[0_0_10px_rgba(14,165,233,0.1)] hover:border-sky-400/60"
                }
      `}
        >
            <span className={`
        absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full
        ${character.rarity === 5 ? "bg-amber-400" : "bg-purple-400"}
      `} />

            {blacklisted && (
                <span className="absolute top-1.5 left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[9px] text-white/60 font-bold">
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
                <p className="truncate text-[10px] font-semibold text-white/90 leading-tight">
                    {character.name}
                </p>
                <p className="truncate text-[9px] text-white/40">
                    {character.element} · {character.path}
                </p>
            </div>
        </button>
    );
}