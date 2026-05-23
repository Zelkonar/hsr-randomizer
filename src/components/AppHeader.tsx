import VERSION from "../data/version";

const styles = {
  header: "relative flex flex-col items-center justify-center border-b border-white/10 px-6 py-10 overflow-hidden",
  version: "absolute top-3 left-4 text-[10px] font-mono tracking-widest text-purple-300/40",
  glowWrap: "absolute inset-0 flex items-center justify-center pointer-events-none",
  glow: "h-32 w-96 rounded-full bg-sky-500/10 blur-3xl",
  eyebrow: "relative mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-sky-400/70 font-medium",
  eyebrowLine: "block h-px w-10 bg-sky-400/30",
  title: "relative text-4xl sm:text-5xl font-black uppercase tracking-[0.15em] text-white drop-shadow-lg",
  divider: "relative mt-4 flex items-center gap-2",
  dividerLine: "block h-px w-16 bg-white/10",
  dividerDot: "block h-1 w-1 rounded-full bg-sky-400/50",
};

export function AppHeader() {
  return (
    <header className={styles.header}>
      <span className={styles.version}>{VERSION}</span>

      <div className={styles.glowWrap}>
        <div className={styles.glow} />
      </div>

      <p className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        Honkai: Star Rail
        <span className={styles.eyebrowLine} />
      </p>

      <h1 className={styles.title}>
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

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerDot} />
        <span className={styles.dividerLine} />
      </div>
    </header>
  );
}
