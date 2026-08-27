import { describe, it, expect } from "vitest";
import { collectPrefetchUrls } from "./useImagePrefetch";
import type { Character } from "../types/character";

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

const characters = [char(1), char(2), char(3)];

describe("collectPrefetchUrls", () => {
    it("only returns artwork for owned characters", () => {
        const urls = collectPrefetchUrls([1, 3], characters);
        expect(urls).not.toContain("preview/2");
        expect(urls).not.toContain("portrait/2");
        expect(urls).toHaveLength(4);
    });

    it("orders every preview ahead of the portraits", () => {
        const urls = collectPrefetchUrls([1, 2], characters);
        expect(urls).toEqual(["preview/1", "preview/2", "portrait/1", "portrait/2"]);
    });

    it("returns nothing for an empty roster", () => {
        expect(collectPrefetchUrls([], characters)).toEqual([]);
    });

    it("ignores ids with no matching character", () => {
        expect(collectPrefetchUrls([99], characters)).toEqual([]);
    });
});
