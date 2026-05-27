import { describe, it, expect } from "vitest";
import { isSustain, applyFilter, rollMultipleTeams, removeFromPool } from "./randomize";
import type { Character } from "../types/character";
import type { Element } from "../types/element";
import type { Path } from "../types/path";
import type { Rarity } from "../types/rarity";

function char(id: number, name: string, path: Path, element: Element = "Fire", rarity: Rarity = 5): Character {
    return { id, name, path, element, rarity, icon: "", preview: "", portrait: "" };
}

function repeat(n: number, fn: () => void) {
    for (let i = 0; i < n; i++) fn();
}

// Sustains
const GEPARD = char(1, "Gepard", "Preservation", "Ice");
const BAILU = char(2, "Bailu", "Abundance", "Lightning");
const FU_XUAN = char(3, "Fu Xuan", "Preservation", "Quantum");
const HYACINE = char(1409, "Hyacine", "Remembrance", "Ice"); // sustain by ID, not path

// Non-sustains
const SEELE = char(4, "Seele", "The Hunt", "Quantum");
const JINGLIU = char(5, "Jingliu", "Destruction", "Ice");
const ACHERON = char(6, "Acheron", "Nihility", "Lightning");
const FEIXIAO = char(7, "Feixiao", "The Hunt", "Wind");
const KAFKA = char(8, "Kafka", "Nihility", "Lightning");
const ARGENTI = char(9, "Argenti", "Erudition", "Fire");
const BRONYA = char(10, "Bronya", "Harmony", "Wind");
const RUAN_MEI = char(11, "Ruan Mei", "Harmony", "Ice");
const FIREFLY = char(12, "Firefly", "Destruction", "Fire");
const BLADE = char(13, "Blade", "Destruction", "Wind");
const TOPAZ = char(14, "Topaz", "The Hunt", "Fire");
const IMBIBITOR = char(15, "Imbibitor", "Destruction", "Imaginary");

const ALL = [
    GEPARD,
    BAILU,
    FU_XUAN,
    HYACINE,
    SEELE,
    JINGLIU,
    ACHERON,
    FEIXIAO,
    KAFKA,
    ARGENTI,
    BRONYA,
    RUAN_MEI,
    FIREFLY,
    BLADE,
    TOPAZ,
    IMBIBITOR,
];

describe("removeFromPool", () => {
    it("removes the character matching the given id", () => {
        const result = removeFromPool([GEPARD, BAILU, SEELE], GEPARD);
        expect(result).not.toContain(GEPARD);
        expect(result).toHaveLength(2);
    });

    it("removes by name match as well as id match", () => {
        // A character with a different id but the same name should also be removed
        const imposter = char(999, "Gepard", "The Hunt");
        const result = removeFromPool([GEPARD, imposter, SEELE], GEPARD);
        expect(result).toHaveLength(1);
        expect(result[0]).toBe(SEELE);
    });

    it("returns the pool unchanged when the character is not present", () => {
        const result = removeFromPool([BAILU, SEELE], GEPARD);
        expect(result).toHaveLength(2);
    });

    it("does not mutate the original array", () => {
        const pool = [GEPARD, BAILU, SEELE];
        removeFromPool(pool, GEPARD);
        expect(pool).toHaveLength(3);
    });
});

describe("isSustain", () => {
    it("returns true for Preservation path", () => {
        expect(isSustain(GEPARD)).toBe(true);
        expect(isSustain(FU_XUAN)).toBe(true);
    });

    it("returns true for Abundance path", () => {
        expect(isSustain(BAILU)).toBe(true);
    });

    it("returns true for Hyacine by ID regardless of path", () => {
        expect(isSustain(HYACINE)).toBe(true);
        // Confirm it's the ID, not the Remembrance path, that qualifies it
        expect(isSustain(char(999, "Other Remembrance", "Remembrance"))).toBe(false);
    });

    it("returns false for non-sustain paths", () => {
        expect(isSustain(SEELE)).toBe(false); // The Hunt
        expect(isSustain(JINGLIU)).toBe(false); // Destruction
        expect(isSustain(ACHERON)).toBe(false); // Nihility
        expect(isSustain(BRONYA)).toBe(false); // Harmony
        expect(isSustain(ARGENTI)).toBe(false); // Erudition
    });
});

describe("applyFilter", () => {
    it("returns all characters when no filter is provided", () => {
        expect(applyFilter(ALL)).toHaveLength(ALL.length);
    });

    it("filters by includeIds", () => {
        const result = applyFilter(ALL, { includeIds: [1, 2, 4] });
        expect(result).toHaveLength(3);
        expect(result.map((c) => c.id).sort()).toEqual([1, 2, 4]);
    });

    it("returns empty array when no IDs match", () => {
        expect(applyFilter(ALL, { includeIds: [9999] })).toHaveLength(0);
    });

    it("filters by element", () => {
        const result = applyFilter(ALL, { elements: ["Ice"] });
        expect(result.length).toBeGreaterThan(0);
        expect(result.every((c) => c.element === "Ice")).toBe(true);
    });

    it("filters by path", () => {
        const result = applyFilter(ALL, { paths: ["The Hunt"] });
        expect(result.length).toBeGreaterThan(0);
        expect(result.every((c) => c.path === "The Hunt")).toBe(true);
    });

    it("filters by rarity", () => {
        const with4star = [...ALL, char(100, "4star", "The Hunt", "Fire", 4)];
        expect(applyFilter(with4star, { rarities: [4] })).toHaveLength(1);
        expect(applyFilter(with4star, { rarities: [5] })).toHaveLength(ALL.length);
    });

    it("combines multiple filter types with AND logic", () => {
        // Only JINGLIU is both Ice and Destruction
        const result = applyFilter(ALL, { elements: ["Ice"], paths: ["Destruction"] });
        expect(result).toHaveLength(1);
        expect(result[0]).toBe(JINGLIU);
    });
});

describe("rollMultipleTeams", () => {
    describe("team structure", () => {
        it("returns the requested number of teams", () => {
            expect(rollMultipleTeams(ALL, 1, 4)).toHaveLength(1);
            expect(rollMultipleTeams(ALL, 2, 4)).toHaveLength(2);
            expect(rollMultipleTeams(ALL, 3, 4)).toHaveLength(3);
        });

        it("each team has the requested size", () => {
            for (const size of [1, 2, 3, 4] as const) {
                const [team] = rollMultipleTeams(ALL, 1, size);
                expect(team.members).toHaveLength(size);
            }
        });
    });

    describe("no duplicates", () => {
        it("no character appears twice within the same team", () => {
            repeat(200, () => {
                const [team] = rollMultipleTeams(ALL, 1, 4);
                const ids = team.members.map((c) => c.id);
                expect(new Set(ids).size).toBe(ids.length);
            });
        });

        it("no character appears in more than one team", () => {
            repeat(200, () => {
                const teams = rollMultipleTeams(ALL, 3, 4);
                const allIds = teams.flatMap((t) => t.members.map((c) => c.id));
                expect(new Set(allIds).size).toBe(allIds.length);
            });
        });
    });

    describe("requireSustain", () => {
        it("every team contains at least one sustain", () => {
            repeat(200, () => {
                const teams = rollMultipleTeams(ALL, 2, 4, { requireSustain: true });
                for (const team of teams) {
                    expect(team.members.some(isSustain)).toBe(true);
                }
            });
        });

        it("sustains are not shared between teams", () => {
            repeat(200, () => {
                const teams = rollMultipleTeams(ALL, 2, 4, { requireSustain: true });
                const allIds = teams.flatMap((t) => t.members.map((c) => c.id));
                expect(new Set(allIds).size).toBe(allIds.length);
            });
        });

        it("works when a free pick happens to be a sustain (reserved sustain returned to pool)", () => {
            // Pool with only 2 sustains and 6 others: forces the edge case where the reserved
            // sustain may need to return to the pool because a free pick covered it.
            const tightPool = [GEPARD, BAILU, SEELE, JINGLIU, ACHERON, FEIXIAO, KAFKA, ARGENTI];
            repeat(200, () => {
                const teams = rollMultipleTeams(tightPool, 2, 4, { requireSustain: true });
                for (const team of teams) {
                    expect(team.members.some(isSustain)).toBe(true);
                }
                const allIds = teams.flatMap((t) => t.members.map((c) => c.id));
                expect(new Set(allIds).size).toBe(allIds.length);
            });
        });
    });

    describe("errors", () => {
        it("throws when pool has fewer characters than team size", () => {
            expect(() => rollMultipleTeams(ALL.slice(0, 3), 1, 4)).toThrow();
        });

        it("throws when pool is too small for multiple teams", () => {
            expect(() => rollMultipleTeams(ALL.slice(0, 4), 2, 4)).toThrow();
        });

        it("throws when there are no sustains but requireSustain is true", () => {
            const noSustains = [SEELE, JINGLIU, ACHERON, FEIXIAO];
            expect(() => rollMultipleTeams(noSustains, 1, 4, { requireSustain: true })).toThrow();
        });

        it("throws when there are fewer sustains than teams", () => {
            // 1 sustain, 2 teams: can't guarantee one sustain per team
            const oneSustain = [GEPARD, SEELE, JINGLIU, ACHERON, FEIXIAO, KAFKA, ARGENTI, BRONYA];
            expect(() => rollMultipleTeams(oneSustain, 2, 4, { requireSustain: true })).toThrow();
        });
    });

    describe("filter passthrough", () => {
        it("only picks characters from the includeIds filter", () => {
            const allowed = [1, 4, 5, 6]; // GEPARD, SEELE, JINGLIU, ACHERON
            const [team] = rollMultipleTeams(ALL, 1, 4, { includeIds: allowed });
            for (const member of team.members) {
                expect(allowed).toContain(member.id);
            }
        });
    });

    describe("requireSustain edge cases", () => {
        it("size-1 teams are always a sustain", () => {
            repeat(200, () => {
                const [team] = rollMultipleTeams(ALL, 1, 1, { requireSustain: true });
                expect(isSustain(team.members[0])).toBe(true);
            });
        });

        it("respects element filter alongside requireSustain", () => {
            // FU_XUAN is the only Quantum sustain; SEELE is the only other Quantum character
            repeat(50, () => {
                const [team] = rollMultipleTeams(ALL, 1, 2, {
                    requireSustain: true,
                    elements: ["Quantum"],
                });
                expect(team.members.some(isSustain)).toBe(true);
                expect(team.members.every((c) => c.element === "Quantum")).toBe(true);
            });
        });

        it("throws when element filter leaves no sustains", () => {
            // No Fire sustains in ALL
            expect(() => rollMultipleTeams(ALL, 1, 4, { requireSustain: true, elements: ["Fire"] })).toThrow();
        });
    });
});
