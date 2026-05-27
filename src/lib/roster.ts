type ImportResult = { ok: true; ids: number[]; skipped: number } | { ok: false; error: string };

export function parseRosterImport(text: string, validIds: Set<number>): ImportResult {
    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch {
        return { ok: false, error: "Invalid JSON: expected an array of IDs" };
    }

    if (!Array.isArray(data)) {
        return { ok: false, error: "Invalid JSON: expected an array of IDs" };
    }

    const valid = data.filter((id): id is number => typeof id === "number" && validIds.has(id));

    if (!valid.length) {
        return { ok: false, error: "No valid character IDs found" };
    }

    return { ok: true, ids: valid, skipped: data.length - valid.length };
}
