// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useSavedRosters } from "./useSavedRosters";

const SAVED_ROSTERS_KEY = "hsr-randomizer:saved-rosters";

beforeEach(() => {
    localStorage.clear();
});

describe("useSavedRosters", () => {
    it("starts empty", () => {
        const { result } = renderHook(() => useSavedRosters());
        expect(result.current.savedRosters).toEqual({});
    });

    it("saves a roster under a name and persists it", () => {
        const { result } = renderHook(() => useSavedRosters());
        act(() => result.current.saveRoster("main", [1, 2, 3]));
        expect(result.current.savedRosters).toEqual({ main: [1, 2, 3] });
        expect(JSON.parse(localStorage.getItem(SAVED_ROSTERS_KEY)!)).toEqual({ main: [1, 2, 3] });
    });

    it("deletes a saved roster", () => {
        localStorage.setItem(SAVED_ROSTERS_KEY, JSON.stringify({ a: [1], b: [2] }));
        const { result } = renderHook(() => useSavedRosters());
        act(() => result.current.deleteSavedRoster("a"));
        expect(result.current.savedRosters).toEqual({ b: [2] });
    });

    it("loads existing saved rosters", () => {
        localStorage.setItem(SAVED_ROSTERS_KEY, JSON.stringify({ x: [9] }));
        const { result } = renderHook(() => useSavedRosters());
        expect(result.current.savedRosters).toEqual({ x: [9] });
    });
});
