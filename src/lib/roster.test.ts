import { describe, it, expect } from "vitest";
import { parseRosterImport } from "./roster";

const VALID = new Set([1, 2, 3, 4, 5]);

describe("parseRosterImport", () => {
    describe("invalid input", () => {
        it("returns error for malformed JSON", () => {
            const result = parseRosterImport("not json", VALID);
            expect(result.ok).toBe(false);
        });

        it("returns error for a JSON object", () => {
            const result = parseRosterImport('{"id": 1}', VALID);
            expect(result.ok).toBe(false);
        });

        it("returns error for a JSON number", () => {
            const result = parseRosterImport("42", VALID);
            expect(result.ok).toBe(false);
        });

        it("returns error for an empty array", () => {
            const result = parseRosterImport("[]", VALID);
            expect(result.ok).toBe(false);
        });

        it("returns error when no entries match valid IDs", () => {
            const result = parseRosterImport("[999, 1000]", VALID);
            expect(result.ok).toBe(false);
            if (!result.ok) expect(result.error).toMatch(/no valid/i);
        });
    });

    describe("valid input", () => {
        it("returns all IDs when every entry is valid", () => {
            const result = parseRosterImport("[1, 2, 3]", VALID);
            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.ids).toEqual([1, 2, 3]);
            expect(result.skipped).toBe(0);
        });

        it("filters out unknown numeric IDs and reports skipped count", () => {
            const result = parseRosterImport("[1, 999, 2]", VALID);
            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.ids).toEqual([1, 2]);
            expect(result.skipped).toBe(1);
        });

        it("filters out non-number entries (strings, null, booleans)", () => {
            const result = parseRosterImport('[1, "two", null, true, 3]', VALID);
            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.ids).toEqual([1, 3]);
            expect(result.skipped).toBe(3);
        });

        it("preserves order of valid IDs", () => {
            const result = parseRosterImport("[3, 1, 2]", VALID);
            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.ids).toEqual([3, 1, 2]);
        });
    });
});
