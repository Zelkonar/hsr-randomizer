import { useCallback, useState } from "react";

type Updater<T> = T | ((prev: T) => T);

// A useState that mirrors its value to localStorage as JSON. The value is read
// once on mount and written on every update; reads and writes are wrapped so a
// corrupt entry or unavailable storage (private mode, quota) falls back quietly.
//
// `parse` transforms the raw decoded value before it becomes state, which lets a
// caller validate or migrate what was stored (e.g. drop a stale enum value).
export function useLocalStorageState<T>(
    key: string,
    initialValue: T | (() => T),
    parse: (stored: unknown) => T = (stored) => stored as T
): [T, (next: Updater<T>) => void] {
    const [value, setValue] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            if (raw !== null) return parse(JSON.parse(raw));
        } catch {
            // Corrupt JSON or no storage access: use the initial value.
        }
        return initialValue instanceof Function ? (initialValue as () => T)() : initialValue;
    });

    const set = useCallback(
        (next: Updater<T>) => {
            setValue((prev) => {
                const resolved = next instanceof Function ? (next as (prev: T) => T)(prev) : next;
                try {
                    localStorage.setItem(key, JSON.stringify(resolved));
                } catch {
                    // Ignore write failures; keep the in-memory value authoritative.
                }
                return resolved;
            });
        },
        [key]
    );

    return [value, set];
}
