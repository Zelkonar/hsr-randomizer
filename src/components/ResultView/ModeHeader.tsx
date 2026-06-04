export function ModeHeader({ label }: { label: string }) {
    return (
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground/80">
            <span className="block h-px flex-1 bg-border" />
            {label}
            <span className="block h-px flex-1 bg-border" />
        </p>
    );
}
