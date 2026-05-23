const styles = {
    wrapper: "flex flex-col items-center",
    buttonBase: "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-10 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white/5 border border-white/20",
    buttonActive: "hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-sky-300 hover:shadow-lg hover:shadow-sky-500/20 active:border-sky-400/60 active:bg-sky-500/10 active:text-sky-300 active:shadow-lg active:shadow-sky-500/20 active:scale-95",
    buttonDisabled: "opacity-50 cursor-not-allowed",
    shimmer: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full",
    errorText: "mt-2 text-center text-sm text-rose-400",
};

export function RandomizeButton({
    onRandomize,
    disabled,
}: {
    onRandomize: () => void;
    disabled: boolean;
}) {
    const buttonClass = [
        styles.buttonBase,
        disabled ? styles.buttonDisabled : styles.buttonActive,
    ].join(" ");

    return (
        <div className={styles.wrapper}>
            <button onClick={onRandomize} disabled={disabled} className={buttonClass}>
                <span className={styles.shimmer} />
                <span>✦</span>
                <span>Randomize</span>
                <span>✦</span>
            </button>

            {disabled && (
                <p className={styles.errorText}>
                    Too many characters are blacklisted · add more characters to randomize.
                </p>
            )}
        </div>
    );
}
