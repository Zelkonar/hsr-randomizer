// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useRandomizer } from "./useRandomizer";
import { setCharacters } from "../data/characters";
import type { Character } from "../types/character";
import type { GameMode } from "../types/gameMode";

// requireSustain is always false in these tests, so path/element/rarity values
// are never inspected; only unique id+name (rollMultipleTeams dedupes on both).
const MOCK_CHARACTERS = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Character ${i + 1}`,
    element: "Fire",
    path: "Erudition",
    rarity: 4,
})) as Character[];

const ALL_IDS = MOCK_CHARACTERS.map((c) => c.id);

beforeEach(() => {
    setCharacters(MOCK_CHARACTERS);
});

describe("useRandomizer", () => {
    it("starts with no result", () => {
        const { result } = renderHook(() => useRandomizer(ALL_IDS, "team", false));
        expect(result.current.result).toBeNull();
    });

    it("caches a result for the mode that rolled it", () => {
        const { result } = renderHook(() => useRandomizer(ALL_IDS, "team", false));
        act(() => result.current.randomize());
        expect(result.current.result?.mode).toBe("team");
    });

    it("retains a mode's cached result when switching to another mode and back", () => {
        const { result, rerender } = renderHook(({ mode }) => useRandomizer(ALL_IDS, mode, false), {
            initialProps: { mode: "team" as GameMode },
        });

        act(() => result.current.randomize());
        const teamResult = result.current.result;
        expect(teamResult?.mode).toBe("team");

        rerender({ mode: "starward" });
        expect(result.current.result).toBeNull();

        act(() => result.current.randomize());
        expect(result.current.result?.mode).toBe("starward");

        rerender({ mode: "team" });
        expect(result.current.result).toEqual(teamResult);
    });

    it("rolling in one mode does not affect another mode's cached result", () => {
        const { result, rerender } = renderHook(({ mode }) => useRandomizer(ALL_IDS, mode, false), {
            initialProps: { mode: "team" as GameMode },
        });

        act(() => result.current.randomize());
        const teamResult = result.current.result;

        rerender({ mode: "twoteam" });
        act(() => result.current.randomize());

        rerender({ mode: "team" });
        expect(result.current.result).toEqual(teamResult);
    });
});
