import { useState, useRef, useEffect } from "react";

interface TooltipProps {
    text: string;
}

export function Tooltip({ text }: TooltipProps) {
    const [hovering, setHovering] = useState(false);
    const [pinned, setPinned] = useState(false);
    const open = hovering || pinned;
    const ref = useRef<HTMLDivElement>(null);

    // Dismiss pinned state when tapping outside on mobile
    useEffect(() => {
        if (!pinned) return;
        const handler = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setPinned(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [pinned]);

    return (
        <div
            className="relative flex items-center"
            ref={ref}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <button
                type="button"
                onClick={() => setPinned((v) => !v)}
                className="flex h-4 w-4 items-center justify-center rounded-full border border-border text-[9px] font-bold text-muted-foreground hover:border-foreground/25 hover:text-foreground/80 transition-colors leading-none"
                aria-label="More info"
            >
                ?
            </button>

            {open && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg border border-gray-200 bg-gray-700 px-3 py-2 text-[11px] text-white/90 shadow-xl z-50 dark:border-white/10 dark:bg-gray-800 dark:text-white/70">
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-700 dark:border-t-gray-800" />
                    {text}
                </div>
            )}
        </div>
    );
}
