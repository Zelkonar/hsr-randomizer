export function RandomizeButton({
    onRandomize,
    disabled,
}: {
    onRandomize: () => void;
    disabled: boolean;
}) {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onRandomize}
                disabled={disabled}
                className={[
                    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-10 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white/5 border border-white/20",
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-sky-300 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95",
                ].join(" ")}
            >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span>✦</span>
                <span>Randomize</span>
                <span>✦</span>
            </button>

            {disabled && (
                <p className="mt-2 text-center text-sm text-rose-400">
                    Too many characters are blacklisted · add more characters to randomize.
                </p>
            )}
        </div>
    );
}
