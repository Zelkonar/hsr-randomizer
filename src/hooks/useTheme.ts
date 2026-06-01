import { useCallback, useEffect, useState } from "react";
import { applyTheme, getInitialPreference, THEME_STORAGE_KEY, type ThemePreference } from "../lib/theme";

// The resolved theme is applied before React mounts (see the inline script in
// index.html), so initial state only needs to mirror the saved preference.
export function useTheme() {
    const [preference, setPreferenceState] = useState<ThemePreference>(getInitialPreference);

    const setPreference = useCallback((next: ThemePreference) => {
        setPreferenceState(next);
        applyTheme(next);
        localStorage.setItem(THEME_STORAGE_KEY, next);
    }, []);

    // While following the system, re-apply whenever the OS preference flips.
    useEffect(() => {
        if (preference !== "system") return;
        const query = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => applyTheme("system");
        query.addEventListener("change", handler);
        return () => query.removeEventListener("change", handler);
    }, [preference]);

    return { preference, setPreference };
}
