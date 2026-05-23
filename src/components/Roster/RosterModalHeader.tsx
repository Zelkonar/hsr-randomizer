import { CHARACTERS } from "../../data/characters";

interface RosterModalHeaderProps {
    blacklistIds: number[];
    onClose: () => void;
}

export function RosterModalHeader({ blacklistIds, onClose }: RosterModalHeaderProps) {
    const activeCount = CHARACTERS.length - blacklistIds.length;

    return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
            <div>
                <h2 className="text-sm font-bold tracking-widest uppercase text-white">Manage Roster</h2>
                <p className="text-[11px] text-white/40 mt-0.5">
                    {activeCount} of {CHARACTERS.length} characters active
                </p>
            </div>
            <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
            >
                ✕
            </button>
        </div>
    );
}
