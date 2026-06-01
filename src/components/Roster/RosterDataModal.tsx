import { useEffect, useRef, useState } from "react";
import { CHARACTERS } from "../../data/characters";
import { parseRosterImport } from "../../lib/roster";

const VALID_IDS = new Set(CHARACTERS.map((c) => c.id));

type Status = { ok: boolean; text: string };

interface RosterDataModalProps {
    mode: "import" | "export";
    rosterIds: number[];
    onImport: (ids: number[]) => void;
    onClose: () => void;
}

export function RosterDataModal({ mode, rosterIds, onImport, onClose }: RosterDataModalProps) {
    const [text, setText] = useState(() => (mode === "export" ? JSON.stringify(rosterIds) : ""));
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

    useEffect(
        () => () => {
            if (copyTimer.current) clearTimeout(copyTimer.current);
        },
        []
    );

    function handleCopy() {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            if (copyTimer.current) clearTimeout(copyTimer.current);
            copyTimer.current = setTimeout(() => setCopied(false), 2000);
        });
    }

    function handleImport() {
        const result = parseRosterImport(text, VALID_IDS);
        if (!result.ok) {
            setStatus({ ok: false, text: result.error });
            return;
        }
        onImport(result.ids);
        setStatus({
            ok: result.skipped === 0,
            text:
                result.skipped > 0
                    ? `Imported ${result.ids.length} characters (${result.skipped} unknown IDs skipped)`
                    : `Imported ${result.ids.length} characters`,
        });
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 flex flex-col w-full max-w-sm rounded-2xl bg-white border border-gray-200 shadow-2xl dark:bg-gray-900 dark:border-white/10">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/10">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-gray-900 dark:text-white">
                        {mode === "export" ? "Export Roster" : "Import Roster"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors dark:border-white/10 dark:text-white/50 dark:hover:text-white dark:hover:border-white/30"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-5">
                    <textarea
                        ref={textareaRef}
                        className="w-full h-40 resize-none rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-xs font-mono px-3 py-2.5 focus:outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:focus:border-white/30"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            setStatus(null);
                        }}
                        placeholder={mode === "import" ? "Paste a JSON array of character IDs…" : undefined}
                        readOnly={mode === "export"}
                        spellCheck={false}
                    />
                </div>
                <div className="flex items-center justify-between px-5 pb-5 gap-3">
                    <div className="text-[11px] min-w-0">
                        {status && (
                            <p
                                className={
                                    status.ok
                                        ? "text-green-600 dark:text-green-400/70"
                                        : "text-red-600 dark:text-red-400/70"
                                }
                            >
                                {status.text}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                        {mode === "import" ? (
                            <button
                                onClick={handleImport}
                                className="flex items-center h-8 px-4 rounded-lg bg-sky-100 border border-sky-300 text-sky-700 text-[11px] font-semibold uppercase tracking-widest hover:bg-sky-200 hover:border-sky-400 transition-colors dark:bg-sky-500/10 dark:border-sky-500/30 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:border-sky-500/50"
                            >
                                Import
                            </button>
                        ) : (
                            <button
                                onClick={handleCopy}
                                className="flex items-center h-8 px-4 rounded-lg border border-gray-300 text-gray-500 text-[11px] font-semibold uppercase tracking-widest hover:text-gray-900 hover:border-gray-400 transition-colors dark:border-white/10 dark:text-white/50 dark:hover:text-white dark:hover:border-white/30"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
