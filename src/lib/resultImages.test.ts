import { describe, it, expect } from "vitest";
import { resultImageUrls } from "./resultImages";
import type { Character, Team } from "../types/character";

function char(id: number): Character {
    return {
        id,
        name: `Char ${id}`,
        element: "Ice",
        path: "Preservation",
        rarity: 4,
        icon: `icon/${id}`,
        preview: `preview/${id}`,
        portrait: `portrait/${id}`,
    };
}

function team(base: number): Team {
    return {
        id: `team-${base}`,
        members: [char(base), char(base + 1), char(base + 2), char(base + 3)],
        createdAt: 0,
    };
}

describe("resultImageUrls", () => {
    it("returns nothing for no result", () => {
        expect(resultImageUrls(null)).toEqual([]);
    });

    it("uses portraits for the solo team layout", () => {
        const urls = resultImageUrls({ mode: "team", team: team(1) });
        expect(urls).toEqual(["portrait/1", "portrait/2", "portrait/3", "portrait/4"]);
    });

    it("uses portraits for both panel layouts in twoteam", () => {
        const urls = resultImageUrls({ mode: "twoteam", teams: [team(1), team(5)] });
        expect(urls).toHaveLength(8);
        expect(urls.every((u) => u.startsWith("portrait/"))).toBe(true);
    });

    it("mixes previews and portraits for starward, matching compact and panel layouts", () => {
        const urls = resultImageUrls({ mode: "starward", nodes: [team(1), team(5), team(9)] });
        expect(urls.filter((u) => u.startsWith("preview/"))).toHaveLength(8);
        expect(urls.filter((u) => u.startsWith("portrait/"))).toHaveLength(4);
        // Node 3 is the panel, so it contributes the portraits.
        expect(urls.slice(8)).toEqual(["portrait/9", "portrait/10", "portrait/11", "portrait/12"]);
    });

    it("uses previews for aa knights and portraits for the king", () => {
        const urls = resultImageUrls({
            mode: "aa",
            knights: [team(1), team(5), team(9)],
            king: team(13),
        });
        expect(urls.filter((u) => u.startsWith("preview/"))).toHaveLength(12);
        expect(urls.slice(12)).toEqual(["portrait/13", "portrait/14", "portrait/15", "portrait/16"]);
    });
});
