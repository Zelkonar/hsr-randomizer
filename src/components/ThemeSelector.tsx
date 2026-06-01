import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { useTheme } from "../hooks/useTheme";
import type { ThemePreference } from "../lib/theme";

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <circle cx="12" cy="12" r="4" />
            <path
                strokeLinecap="round"
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
        </svg>
    );
}

function MonitorIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <rect x="2" y="4" width="20" height="13" rx="2" />
            <path strokeLinecap="round" d="M8 21h8M12 17v4" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
    );
}

const OPTIONS: { value: ThemePreference; label: string; Icon: () => React.ReactNode }[] = [
    { value: "light", label: "Light theme", Icon: SunIcon },
    { value: "system", label: "System theme", Icon: MonitorIcon },
    { value: "dark", label: "Dark theme", Icon: MoonIcon },
];

function optionClass(active: boolean) {
    return cn(
        "flex h-8 w-8 items-center justify-center transition-colors",
        active ? "bg-accent-soft text-accent" : "text-fg-subtle hover:bg-muted hover:text-fg"
    );
}

export function ThemeSelector() {
    const { preference, setPreference } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Dismiss the mobile popover when tapping outside it.
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [open]);

    const Current = (OPTIONS.find((o) => o.value === preference) ?? OPTIONS[1]).Icon;

    return (
        <>
            {/* Desktop: inline segmented control */}
            <div
                role="group"
                aria-label="Theme"
                className="hidden sm:flex items-center overflow-hidden rounded-lg border border-line bg-surface shadow-sm divide-x divide-line"
            >
                {OPTIONS.map(({ value, label, Icon }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setPreference(value)}
                        aria-pressed={preference === value}
                        aria-label={label}
                        title={label}
                        className={optionClass(preference === value)}
                    >
                        <Icon />
                    </button>
                ))}
            </div>

            {/* Mobile: single button that expands to a popover */}
            <div className="relative sm:hidden" ref={ref}>
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-haspopup="true"
                    aria-expanded={open}
                    aria-label="Theme"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-fg-subtle shadow-sm transition-colors hover:border-line-strong hover:text-fg"
                >
                    <Current />
                </button>

                {open && (
                    <div
                        role="group"
                        aria-label="Theme"
                        className="absolute bottom-full left-0 mb-1.5 flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-lg divide-y divide-line"
                    >
                        {OPTIONS.map(({ value, label, Icon }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => {
                                    setPreference(value);
                                    setOpen(false);
                                }}
                                aria-pressed={preference === value}
                                aria-label={label}
                                title={label}
                                className={optionClass(preference === value)}
                            >
                                <Icon />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
