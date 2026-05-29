// Loads character data from R2 at runtime with a bundled snapshot fallback.
//
// Flow (see plan): fetch the tiny, always-revalidated version.json pointer; if
// its hash matches the bundled snapshot, reuse the bundle (no data fetch);
// otherwise fetch the content-hashed, immutably-cached data file. Any failure
// (offline, R2 down) falls back to the bundled snapshot, so the app always has
// data.
import { ASSETS_CDN } from "../config/assets";
import type { Character } from "../types/character";
import fallback from "./characters.fallback.json";

interface VersionManifest {
    hash: string;
    file: string;
}

// Only character names are localized; data is namespaced by language on R2.
// When multi-language lands, make this a runtime choice instead of a constant.
const LANG = "en";
const DATA_BASE = `${ASSETS_CDN}/data/${LANG}`;

const bundled = fallback as unknown as { hash: string; characters: Character[] };

async function fetchJson<T>(url: string, cache: RequestCache): Promise<T> {
    const res = await fetch(url, { cache });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as T;
}

export async function loadCharacters(): Promise<Character[]> {
    try {
        const version = await fetchJson<VersionManifest>(`${DATA_BASE}/version.json`, "no-cache");
        if (version.hash === bundled.hash) return bundled.characters;
        return await fetchJson<Character[]>(`${DATA_BASE}/${version.file}`, "default");
    } catch (err) {
        console.warn("[characters] live load failed; using bundled snapshot", err);
        return bundled.characters;
    }
}
