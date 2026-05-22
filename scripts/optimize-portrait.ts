#!/usr/bin/env tsx
import sharp from "sharp";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const INDEX_URL =
    "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_min/en/characters.json";

const RAW_BASE =
    "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master";

const OUT_DIR = resolve(process.cwd(), "public/images/portrait");

// 0-100
const WEBP_QUALITY = 80;

const CONCURRENCY = 5;

interface RawCharacter {
    id: string;
    name: string;
    portrait: string;
}

async function downloadAndConvert(character: RawCharacter): Promise<void> {
    const outPath = resolve(OUT_DIR, `${character.id}.webp`);

    if (existsSync(outPath)) {
        console.log(`  ↷ ${character.name} (${character.id}) — already exists, skipping`);
        return;
    }

    const url = `${RAW_BASE}/${character.portrait}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    const webp = await sharp(buffer).webp({ quality: WEBP_QUALITY }).toBuffer();

    writeFileSync(outPath, webp);

    const originalKB = Math.round(buffer.byteLength / 1024);
    const convertedKB = Math.round(webp.byteLength / 1024);
    const saving = Math.round((1 - webp.byteLength / buffer.byteLength) * 100);

    console.log(
        `  ✓ ${character.name} (${character.id}) — ${originalKB}KB → ${convertedKB}KB (${saving}% smaller)`
    );
}

async function withConcurrency<T>(
    tasks: (() => Promise<T>)[],
    limit: number
): Promise<T[]> {
    const results: T[] = [];
    let index = 0;

    async function worker() {
        while (index < tasks.length) {
            const current = index++;
            results[current] = await tasks[current]();
        }
    }

    await Promise.all(Array.from({ length: limit }, worker));
    return results;
}

async function main() {
    console.log("Fetching character index...");
    const res = await fetch(INDEX_URL);
    if (!res.ok) throw new Error(`Failed to fetch index: ${res.status}`);

    const raw: Record<string, RawCharacter> = await res.json();
    const characters = Object.values(raw).sort((a, b) => Number(a.id) - Number(b.id));

    console.log(`  Found ${characters.length} characters.`);

    mkdirSync(OUT_DIR, { recursive: true });
    console.log(`\nDownloading and converting to WebP (quality: ${WEBP_QUALITY})...\n`);

    const tasks = characters.map((c) => () => downloadAndConvert(c));
    await withConcurrency(tasks, CONCURRENCY);

    console.log(`\n✓ Done. Images saved to ${OUT_DIR}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});