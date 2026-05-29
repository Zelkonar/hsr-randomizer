import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ASSETS_CDN } from "../config/assets";

// Shared between the JSON mock and the assertions.
const { BUNDLED } = vi.hoisted(() => ({
    BUNDLED: {
        hash: "bundled-hash",
        characters: [
            {
                id: 1001,
                name: "March 7th",
                element: "Ice",
                path: "Preservation",
                rarity: 4,
                icon: "icon",
                preview: "preview",
                portrait: "portrait",
            },
        ],
    },
}));

vi.mock("./characters.fallback.json", () => ({ default: BUNDLED }));

// Imported after the mock is registered (vi.mock is hoisted, so this is safe).
const { loadCharacters } = await import("./loadCharacters");

const VERSION_URL = `${ASSETS_CDN}/data/en/version.json`;

const LIVE = [
    {
        id: 1002,
        name: "Dan Heng",
        element: "Wind",
        path: "The Hunt",
        rarity: 4,
        icon: "icon",
        preview: "preview",
        portrait: "portrait",
    },
];

function jsonResponse(data: unknown): Response {
    return { ok: true, status: 200, json: async () => data } as unknown as Response;
}

function errorResponse(status: number): Response {
    return { ok: false, status, statusText: "error", json: async () => ({}) } as unknown as Response;
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("loadCharacters", () => {
    it("reuses the bundled snapshot (no data fetch) when the version hash matches", async () => {
        fetchMock.mockResolvedValueOnce(jsonResponse({ hash: "bundled-hash", file: "characters.bundled-hash.json" }));

        const result = await loadCharacters();

        expect(result).toBe(BUNDLED.characters);
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(VERSION_URL, { cache: "no-cache" });
    });

    it("fetches the content-hashed data file when the version hash differs", async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse({ hash: "new-hash", file: "characters.new-hash.json" }))
            .mockResolvedValueOnce(jsonResponse(LIVE));

        const result = await loadCharacters();

        expect(result).toEqual(LIVE);
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(fetchMock).toHaveBeenLastCalledWith(`${ASSETS_CDN}/data/en/characters.new-hash.json`, {
            cache: "default",
        });
    });

    it("falls back to the bundled snapshot when the version fetch rejects (offline)", async () => {
        fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));

        const result = await loadCharacters();

        expect(result).toBe(BUNDLED.characters);
    });

    it("falls back to the bundled snapshot when version.json returns a non-ok status", async () => {
        fetchMock.mockResolvedValueOnce(errorResponse(500));

        const result = await loadCharacters();

        expect(result).toBe(BUNDLED.characters);
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("falls back to the bundled snapshot when the data file fetch fails", async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse({ hash: "new-hash", file: "characters.new-hash.json" }))
            .mockRejectedValueOnce(new TypeError("Failed to fetch"));

        const result = await loadCharacters();

        expect(result).toBe(BUNDLED.characters);
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });
});
