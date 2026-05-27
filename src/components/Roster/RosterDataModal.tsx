import { useEffect, useRef, useState } from "react";
import { CHARACTERS } from "../../data/characters";

const VALID_IDS = new Set(CHARACTERS.map((c) => c.id));

const styles = {
    backdrop: "fixed inset-0 z-[60] flex items-center justify-center p-4",
    overlay: "absolute inset-0 bg-black/60 backdrop-blur-sm",
    panel: "relative z-10 flex flex-col w-full max-w-sm rounded-2xl bg-gray-900 border border-white/10 shadow-2xl",
    header: "flex items-center justify-between px-5 py-4 border-b border-white/10",
    title: "text-sm font-bold tracking-widest uppercase text-white",
    closeButton: "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors",
    body: "p-5",
    textarea: "w-full h-40 resize-none rounded-lg border border-white/10 bg-white/5 text-white/70 text-xs font-mono px-3 py-2.5 focus:outline-none focus:border-white/30",
    footer: "flex items-center justify-between px-5 pb-5 gap-3",
    status: "text-[11px] min-w-0",
    buttons: "flex gap-2 shrink-0",
    button: "flex items-center h-8 px-4 rounded-lg border border-white/10 text-white/50 text-[11px] font-semibold uppercase tracking-widest hover:text-white hover:border-white/30 transition-colors",
    primaryButton: "flex items-center h-8 px-4 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[11px] font-semibold uppercase tracking-widest hover:bg-sky-500/20 hover:border-sky-500/50 transition-colors",
};

type Status = { ok: boolean; text: string };

interface RosterDataModalProps {
    mode: "import" | "export";
    rosterIds: number[];
    onImport: (ids: number[]) => void;
    onClose: () => void;
}

export function RosterDataModal({ mode, rosterIds, onImport, onClose }: RosterDataModalProps) {
    const [text, setText] = useState(() => mode === "export" ? JSON.stringify(rosterIds) : "");
    const [status, setStatus] = useState<Status | null>(null);
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.focus();
        if (mode === "export") el.select();
    }, [mode]);

    useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

    function handleCopy() {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            if (copyTimer.current) clearTimeout(copyTimer.current);
            copyTimer.current = setTimeout(() => setCopied(false), 2000);
        });
    }

    function handleImport() {
        try {
            const data = JSON.parse(text);
            if (!Array.isArray(data)) throw new Error();
            const valid = data.filter((id): id is number => typeof id === "number" && VALID_IDS.has(id));
            const unknown = data.length - valid.length;
            if (!valid.length) {
                setStatus({ ok: false, text: "No valid character IDs found" });
                return;
            }
            onImport(valid);
            setStatus({
                ok: unknown === 0,
                text: unknown > 0
                    ? `Imported ${valid.length} characters (${unknown} unknown IDs skipped)`
                    : `Imported ${valid.length} characters`,
            });
        } catch {
            setStatus({ ok: false, text: "Invalid JSON — expected an array of IDs" });
        }
    }

    return (
        <div className={styles.backdrop}>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.panel}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{mode === "export" ? "Export Roster" : "Import Roster"}</h2>
                    <button onClick={onClose} className={styles.closeButton}>✕</button>
                </div>
                <div className={styles.body}>
                    <textarea
                        ref={textareaRef}
                        className={styles.textarea}
                        value={text}
                        onChange={(e) => { setText(e.target.value); setStatus(null); }}
                        placeholder={mode === "import" ? "Paste a JSON array of character IDs…" : undefined}
                        readOnly={mode === "export"}
                        spellCheck={false}
                    />
                </div>
                <div className={styles.footer}>
                    <div className={styles.status}>
                        {status && (
                            <p className={status.ok ? "text-green-400/70" : "text-red-400/70"}>{status.text}</p>
                        )}
                    </div>
                    <div className={styles.buttons}>
                        {mode === "import" ? (
                            <button onClick={handleImport} className={styles.primaryButton}>Import</button>
                        ) : (
                            <button onClick={handleCopy} className={styles.button}>
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
