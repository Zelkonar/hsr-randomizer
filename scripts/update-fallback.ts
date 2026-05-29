#!/usr/bin/env tsx
/**
 * Refresh the bundled character snapshot from the live data on R2.
 *
 * The snapshot in src/data/characters.fallback.json is the offline/failure
 * fallback the app ships with. Character data itself is generated and uploaded
 * from hsr-randomizer-infra; this script just downloads the current version so
 * the bundled copy doesn't drift too far. Run it after a data update (a future
 * scheduled job can call it the same way).
 *
 * Usage (from repo root):
 *   npm run update:fallback
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { ASSETS_CDN } from "../src/config/assets";

const LANG = "en";
const DATA_BASE = `${ASSETS_CDN}/data/${LANG}`;
const OUT_PATH = resolve(process.cwd(), "src/data/characters.fallback.json");

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    return (await res.json()) as T;
}

async function main() {
    console.log("Fetching version.json from R2...");
    const version = await fetchJson<{ hash: string; file: string; count: number }>(`${DATA_BASE}/version.json`);
    console.log(`  Current: ${version.file} (hash ${version.hash}, ${version.count} characters)`);

    const characters = await fetchJson<unknown[]>(`${DATA_BASE}/${version.file}`);
    writeFileSync(OUT_PATH, JSON.stringify({ hash: version.hash, characters }, null, 2) + "\n", "utf-8");

    console.log(`  ✓ Wrote ${OUT_PATH} (${characters.length} characters)`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
