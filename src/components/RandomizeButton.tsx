import { cva } from "class-variance-authority";

const randomizeButton = cva(
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-10 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white/5 border border-white/20",
    {
        variants: {
            active: {
                true: "border-sky-500/50 shadow-[0_0_28px_rgba(14,165,233,0.22)] hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-sky-300 hover:shadow-lg hover:shadow-sky-500/20 active:border-sky-400/60 active:bg-sky-500/10 active:text-sky-300 active:shadow-lg active:shadow-sky-500/20 active:scale-95",
                false: "opacity-50 cursor-not-allowed",
            },
        },
    }
);

export function RandomizeButton({
    onRandomize,
    disabledReason,
}: {
    onRandomize: () => void;
    disabledReason?: string;
}) {
    const disabled = !!disabledReason;

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onRandomize}
                disabled={disabled}
                className={randomizeButton({ active: !disabled })}
            >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span>✦</span>
                <span>Randomize</span>
                <span>✦</span>
            </button>

            {disabledReason && (
                <p className="mt-2 text-center text-sm text-rose-400">{disabledReason}</p>
            )}
        </div>
    );
}
