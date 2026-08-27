export function AppHeader() {
    return (
        <header className="relative flex flex-col items-center justify-center border-b border-border px-6 py-10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-32 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <p className="relative mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-sky-600/80 dark:text-sky-400/70 font-medium">
                <span className="block h-px w-10 bg-sky-500/40 dark:bg-sky-400/30" />
                Honkai: Star Rail
                <span className="block h-px w-10 bg-sky-500/40 dark:bg-sky-400/30" />
            </p>

            <h1 className="relative text-4xl sm:text-5xl font-black uppercase tracking-[0.15em] text-white drop-shadow-lg">
                {/* Visually the title reads "Randomizer" under the eyebrow. The hidden prefix
                    gives crawlers and screen readers a complete heading. */}
                <span className="sr-only">Honkai: Star Rail </span>
                <span
                    style={{
                        background: "linear-gradient(90deg, #7dd3fc, #a78bfa, #7dd3fc)",
                        backgroundSize: "200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Randomizer
                </span>
            </h1>

            <div className="relative mt-4 flex items-center gap-2">
                <span className="block h-px w-16 bg-border" />
                <span className="block h-1 w-1 rounded-full bg-sky-500/60 dark:bg-sky-400/50" />
                <span className="block h-px w-16 bg-border" />
            </div>
        </header>
    );
}
