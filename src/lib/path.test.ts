import { describe, it, expect } from "vitest";
import { getPathIcon, getPathIconSmall, getPathIconLarge, getPathIconLocal, getPathIconLargeLocal } from "./path";
import type { Path } from "../types/path";

const PATHS: Path[] = [
    "The Hunt", "Destruction", "Erudition", "Harmony",
    "Nihility", "Preservation", "Abundance", "Remembrance", "Elation",
];

describe("getPathIcon", () => {
    it("uses 'Hunt' for The Hunt", () => {
        expect(getPathIcon("The Hunt")).toContain("HuntMiddle.webp");
    });

    it("uses 'Joy' for Elation", () => {
        expect(getPathIcon("Elation")).toContain("JoyMiddle.webp");
    });

    it("returns a .webp URL for every path", () => {
        for (const path of PATHS) {
            expect(getPathIcon(path)).toMatch(/\.webp$/);
        }
    });
});

describe("getPathIconSmall", () => {
    it("uses 'Hunt' for The Hunt", () => {
        expect(getPathIconSmall("The Hunt")).toContain("HuntSmall.webp");
    });

    it("uses 'Joy' for Elation", () => {
        expect(getPathIconSmall("Elation")).toContain("JoySmall.webp");
    });

    it("returns a .webp URL for every path", () => {
        for (const path of PATHS) {
            expect(getPathIconSmall(path)).toMatch(/\.webp$/);
        }
    });
});

describe("getPathIconLarge", () => {
    it("uses 'Hunt' for The Hunt (no size suffix)", () => {
        expect(getPathIconLarge("The Hunt")).toMatch(/\/Hunt\.webp$/);
    });

    it("uses 'Joy' for Elation (no size suffix)", () => {
        expect(getPathIconLarge("Elation")).toMatch(/\/Joy\.webp$/);
    });

    it("returns a .webp URL for every path", () => {
        for (const path of PATHS) {
            expect(getPathIconLarge(path)).toMatch(/\.webp$/);
        }
    });
});

describe("getPathIconLocal", () => {
    it("uses 'Hunt' for The Hunt", () => {
        expect(getPathIconLocal("The Hunt")).toContain("HuntMiddle.png");
    });

    it("uses 'Joy' for Elation", () => {
        expect(getPathIconLocal("Elation")).toContain("JoyMiddle.png");
    });

    it("returns a local /paths/ URL for every path", () => {
        for (const path of PATHS) {
            expect(getPathIconLocal(path)).toMatch(/^\/paths\/.+\.png$/);
        }
    });
});

describe("getPathIconLargeLocal", () => {
    it("uses 'Hunt' for The Hunt (no size suffix)", () => {
        expect(getPathIconLargeLocal("The Hunt")).toMatch(/\/Hunt\.png$/);
    });

    it("uses 'Joy' for Elation (no size suffix)", () => {
        expect(getPathIconLargeLocal("Elation")).toMatch(/\/Joy\.png$/);
    });

    it("returns a local /paths/ URL for every path", () => {
        for (const path of PATHS) {
            expect(getPathIconLargeLocal(path)).toMatch(/^\/paths\/.+\.png$/);
        }
    });
});
