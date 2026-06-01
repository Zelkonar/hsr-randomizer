export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "hsr-randomizer:theme";

export function getStoredPreference(): ThemePreference | null {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" || value === "system" ? value : null;
}

export function getSystemTheme(): ResolvedTheme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// No saved choice means follow the operating system.
export function getInitialPreference(): ThemePreference {
    return getStoredPreference() ?? "system";
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
    return preference === "system" ? getSystemTheme() : preference;
}

export function applyTheme(preference: ThemePreference): void {
    const resolved = resolveTheme(preference);
    const root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.style.colorScheme = resolved;
}
