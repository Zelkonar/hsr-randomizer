import { useCallback, useState } from "react";
import { applyTheme, getInitialTheme, THEME_STORAGE_KEY, type Theme } from "../lib/theme";

// The .dark class is applied before React mounts (see the inline script in
// index.html), so initial state only needs to mirror that resolved value.
export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    const setTheme = useCallback((next: Theme) => {
        setThemeState(next);
        applyTheme(next);
        localStorage.setItem(THEME_STORAGE_KEY, next);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => {
            const next = prev === "dark" ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(THEME_STORAGE_KEY, next);
            return next;
        });
    }, []);

    return { theme, setTheme, toggleTheme };
}
