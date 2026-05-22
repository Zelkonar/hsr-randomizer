import { useEffect, useId, useRef, useState, type ReactNode } from "react";

interface Props {
  label: string;
  children?: ReactNode;
}

export function HintTooltip({ label, children = "?" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block group">
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={id}
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-sm font-bold text-white/90 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
      >
        {children}
      </button>

      <div
        id={id}
        role="tooltip"
        className={[
          "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 w-max max-w-xs transition-opacity duration-150",
          open ? "opacity-100" : "opacity-0",
          "group-focus-within:opacity-100",
          "[@media(hover:hover)]:group-hover:opacity-100",
        ].join(" ")}
      >
        <div className="px-3 py-2 rounded bg-gray-900/95">
          <span className="text-sm italic text-gray-300">{label}</span>
        </div>
      </div>
    </div>
  );
}
