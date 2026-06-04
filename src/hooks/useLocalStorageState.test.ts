// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLocalStorageState } from "./useLocalStorageState";

const KEY = "test:key";

beforeEach(() => {
    localStorage.clear();
});

describe("useLocalStorageState", () => {
    it("returns the initial value when nothing is stored", () => {
        const { result } = renderHook(() => useLocalStorageState(KEY, "fallback"));
        expect(result.current[0]).toBe("fallback");
    });

    it("supports a lazy initial value", () => {
        const { result } = renderHook(() => useLocalStorageState(KEY, () => [1, 2, 3]));
        expect(result.current[0]).toEqual([1, 2, 3]);
    });

    it("reads an existing stored value", () => {
        localStorage.setItem(KEY, JSON.stringify({ a: 1 }));
        const { result } = renderHook(() => useLocalStorageState(KEY, { a: 0 }));
        expect(result.current[0]).toEqual({ a: 1 });
    });

    it("persists updates as JSON", () => {
        const { result } = renderHook(() => useLocalStorageState(KEY, 0));
        act(() => result.current[1](5));
        expect(result.current[0]).toBe(5);
        expect(localStorage.getItem(KEY)).toBe("5");
    });

    it("supports updater functions", () => {
        const { result } = renderHook(() => useLocalStorageState<number[]>(KEY, []));
        act(() => result.current[1]((prev) => [...prev, 1]));
        act(() => result.current[1]((prev) => [...prev, 2]));
        expect(result.current[0]).toEqual([1, 2]);
        expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual([1, 2]);
    });

    it("falls back to the initial value when stored JSON is malformed", () => {
        localStorage.setItem(KEY, "not json{");
        const { result } = renderHook(() => useLocalStorageState(KEY, "fallback"));
        expect(result.current[0]).toBe("fallback");
    });

    it("runs the parse transform on the stored value", () => {
        localStorage.setItem(KEY, JSON.stringify("legacy"));
        const { result } = renderHook(() =>
            useLocalStorageState<string>(KEY, "default", (stored) => (stored === "legacy" ? "migrated" : "default"))
        );
        expect(result.current[0]).toBe("migrated");
    });
});
