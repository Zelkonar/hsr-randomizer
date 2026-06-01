export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "hsr-randomizer:theme";

export function getStoredTheme(): Theme | null {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
}

export function getSystemTheme(): Theme {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// Resolves the theme to use on first paint: an explicit saved choice wins,
// otherwise fall back to the operating system preference.
export function getInitialTheme(): Theme {
    return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme): void {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
}
