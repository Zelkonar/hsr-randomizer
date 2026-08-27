import { useEffect, useRef, useState } from "react";
import { preloadAllWithTimeout } from "../lib/preloadImage";
import { resultImageUrls } from "../lib/resultImages";
import type { Result } from "./useRandomizer";

const MIN_SPINNER_MS = 350;
const LOAD_TIMEOUT_MS = 5000;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useReadyResult(result: Result | null): { displayed: Result | null; loading: boolean } {
    const [displayed, setDisplayed] = useState<Result | null>(result);
    const pending = useRef(0);

    useEffect(() => {
        if (result === null) return;

        const token = ++pending.current;
        const urls = resultImageUrls(result);

        void Promise.all([preloadAllWithTimeout(urls, LOAD_TIMEOUT_MS), delay(MIN_SPINNER_MS)]).then(() => {
            if (pending.current !== token) return;
            setDisplayed(result);
        });
    }, [result]);

    if (result === null) return { displayed: null, loading: false };

    return { displayed, loading: displayed !== result };
}
