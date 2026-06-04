// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { Character } from "../types/character";
import { setCharacters } from "../data/characters";
import { useRoster } from "./useRoster";

const ROSTER_KEY = "hsr-randomizer:roster";

// useRoster only reads `id`, so a minimal cast is enough for these tests.
const MOCK_CHARACTERS = [{ id: 1 }, { id: 2 }, { id: 3 }] as Character[];

beforeEach(() => {
    localStorage.clear();
    setCharacters(MOCK_CHARACTERS);
});

describe("useRoster", () => {
    it("defaults to every character enabled on a fresh install", () => {
        const { result } = renderHook(() => useRoster());
        expect(result.current.rosterIds).toEqual([1, 2, 3]);
        expect(result.current.isInRoster(2)).toBe(true);
    });

    it("loads the stored roster when present", () => {
        localStorage.setItem(ROSTER_KEY, JSON.stringify([2]));
        const { result } = renderHook(() => useRoster());
        expect(result.current.rosterIds).toEqual([2]);
        expect(result.current.isInRoster(1)).toBe(false);
    });

    it("toggles a character off then on, persisting each change", () => {
        const { result } = renderHook(() => useRoster());
        act(() => result.current.toggleRoster(2));
        expect(result.current.isInRoster(2)).toBe(false);
        expect(JSON.parse(localStorage.getItem(ROSTER_KEY)!)).not.toContain(2);

        act(() => result.current.toggleRoster(2));
        expect(result.current.isInRoster(2)).toBe(true);
        expect(JSON.parse(localStorage.getItem(ROSTER_KEY)!)).toContain(2);
    });

    it("enableAll adds ids without duplicating", () => {
        localStorage.setItem(ROSTER_KEY, JSON.stringify([1]));
        const { result } = renderHook(() => useRoster());
        act(() => result.current.enableAll([1, 2, 2]));
        expect(result.current.rosterIds).toEqual([1, 2]);
    });

    it("disableAll removes the given ids", () => {
        localStorage.setItem(ROSTER_KEY, JSON.stringify([1, 2, 3]));
        const { result } = renderHook(() => useRoster());
        act(() => result.current.disableAll([2, 3]));
        expect(result.current.rosterIds).toEqual([1]);
    });

    it("importRoster replaces the roster and persists it", () => {
        const { result } = renderHook(() => useRoster());
        act(() => result.current.importRoster([7, 8, 9]));
        expect(result.current.rosterIds).toEqual([7, 8, 9]);
        expect(JSON.parse(localStorage.getItem(ROSTER_KEY)!)).toEqual([7, 8, 9]);
    });
});
