import { useEffect } from "react";
import { CHARACTERS } from "../data/characters";
import type { Character } from "../types/character";

// Module scope so a remount or a roster edit never refetches the same URL.
const warmed = new Set<string>();

const MAX_CONCURRENT = 4;

export function collectPrefetchUrls(rosterIds: number[], characters: Character[] = CHARACTERS): string[] {
    const owned = new Set(rosterIds);
    const inRoster = characters.filter((c) => owned.has(c.id));
    return [...inRoster.map((c) => c.preview), ...inRoster.map((c) => c.portrait)];
}

function shouldSkipPrefetch(): boolean {
    const conn = (
        navigator as Navigator & {
            connection?: { saveData?: boolean; effectiveType?: string };
        }
    ).connection;
    if (!conn) return false;
    if (conn.saveData) return true;
    return conn.effectiveType === "slow-2g" || conn.effectiveType === "2g";
}

function warm(url: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
            warmed.add(url);
            resolve();
        };
        img.src = url;
    });
}

function runQueue(urls: string[], signal: AbortSignal): void {
    const queue = urls.filter((u) => !warmed.has(u));
    let next = 0;

    const pump = async (): Promise<void> => {
        while (next < queue.length && !signal.aborted) {
            const url = queue[next++];
            await warm(url);
        }
    };

    for (let i = 0; i < Math.min(MAX_CONCURRENT, queue.length); i++) void pump();
}

export function useImagePrefetch(rosterIds: number[]): void {
    const key = rosterIds.join(",");

    useEffect(() => {
        if (shouldSkipPrefetch()) return;

        const controller = new AbortController();
        const urls = collectPrefetchUrls(key ? key.split(",").map(Number) : []);

        const start = () => runQueue(urls, controller.signal);

        const { requestIdleCallback: idle, cancelIdleCallback: cancelIdle } = window as Partial<Window>;

        let cancel: () => void;
        if (idle) {
            const handle = idle(start, { timeout: 2000 });
            cancel = () => cancelIdle?.(handle);
        } else {
            const handle = window.setTimeout(start, 200);
            cancel = () => window.clearTimeout(handle);
        }

        return () => {
            controller.abort();
            cancel();
        };
    }, [key]);
}
