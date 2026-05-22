import type { Element } from "../types/element";

// Tailwind bg + text + border + glow per element.
// These use arbitrary values so Tailwind doesn't purge them —
// add to your safelist in CSS if you switch to a Tailwind config file.
export const ELEMENT_STYLES: Record<
  Element,
  { bg: string; text: string; border: string; glow: string; hex: string }
> = {
  Fire: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/40", glow: "shadow-red-500/30", hex: "#f87171" },
  Ice: { bg: "bg-sky-400/20", text: "text-sky-300", border: "border-sky-400/40", glow: "shadow-sky-400/30", hex: "#7dd3fc" },
  Lightning: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/40", glow: "shadow-violet-500/30", hex: "#a78bfa" },
  Wind: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/40", glow: "shadow-emerald-500/30", hex: "#34d399" },
  Quantum: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/40", glow: "shadow-indigo-500/30", hex: "#818cf8" },
  Imaginary: { bg: "bg-yellow-400/20", text: "text-yellow-300", border: "border-yellow-400/40", glow: "shadow-yellow-400/30", hex: "#fde047" },
  Physical: { bg: "bg-stone-400/20", text: "text-stone-300", border: "border-stone-400/40", glow: "shadow-stone-400/30", hex: "#d6d3d1" },
};

export function getElementStyles(element: Element) {
  return ELEMENT_STYLES[element];
}
