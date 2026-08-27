export function preloadImage(url: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();

        const done = () => resolve();

        img.onload = () => {
            const decoded = img.decode?.();
            if (decoded) decoded.then(done, done);
            else done();
        };
        img.onerror = done;
        img.src = url;
    });
}

export function preloadAllWithTimeout(urls: string[], ms: number): Promise<void> {
    if (urls.length === 0) return Promise.resolve();

    const all = Promise.all(urls.map(preloadImage)).then(() => undefined);
    const cap = new Promise<void>((resolve) => setTimeout(resolve, ms));

    return Promise.race([all, cap]);
}
