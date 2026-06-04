// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useOptions } from "./useOptions";

const OPTIONS_KEY = "hsr-randomizer:options";

beforeEach(() => {
    localStorage.clear();
});

describe("useOptions", () => {
    it("defaults to no sustain requirement and the single-team mode", () => {
        const { result } = renderHook(() => useOptions());
        expect(result.current.requireSustain).toBe(false);
        expect(result.current.mode).toBe("team");
    });

    it("persists requireSustain and mode", () => {
        const { result } = renderHook(() => useOptions());
        act(() => result.current.setRequireSustain(true));
        act(() => result.current.setMode("starward"));
        expect(result.current.requireSustain).toBe(true);
        expect(result.current.mode).toBe("starward");
        expect(JSON.parse(localStorage.getItem(OPTIONS_KEY)!)).toEqual({ requireSustain: true, mode: "starward" });
    });

    it("loads persisted options", () => {
        localStorage.setItem(OPTIONS_KEY, JSON.stringify({ requireSustain: true, mode: "aa" }));
        const { result } = renderHook(() => useOptions());
        expect(result.current.requireSustain).toBe(true);
        expect(result.current.mode).toBe("aa");
    });

    it("falls back to team for a stale or unknown stored mode", () => {
        localStorage.setItem(OPTIONS_KEY, JSON.stringify({ requireSustain: false, mode: "moc" }));
        const { result } = renderHook(() => useOptions());
        expect(result.current.mode).toBe("team");
    });
});
