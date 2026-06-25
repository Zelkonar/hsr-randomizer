export function EmptySlotCard({ short = false }: { short?: boolean }) {
    return (
        <article className="group relative flex flex-col overflow-hidden rounded-xl border border-dashed border-border bg-muted/40">
            <div
                className={
                    "relative flex w-full items-center justify-center " + (short ? "aspect-square" : "aspect-[3/4]")
                }
            >
                <span className="text-3xl text-muted-foreground/30" aria-hidden="true">
                    +
                </span>
            </div>
            {short ? (
                <div className="flex flex-col gap-0.5 px-1.5 py-1 md:gap-1 md:px-2 md:py-1.5">
                    <div className="h-[2em] md:h-[2.5em]" />
                    <div className="h-3 md:h-4" />
                </div>
            ) : (
                <div className="flex items-center px-3 py-2">
                    <div className="h-[2.5em] w-full" />
                </div>
            )}
        </article>
    );
}
