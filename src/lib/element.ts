import type { Element } from "../types/element";
import { ASSETS_CDN } from "../config/assets";

const CDN = `${ASSETS_CDN}/icons/element`;

export const ELEMENT_STYLES: Record<
    Element,
    { bg: string; text: string; border: string; glow: string; hex: string; icon: string; iconLocal: string }
> = {
    Fire: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/40",
        glow: "shadow-red-500/30",
        hex: "#f87171",
        icon: `${CDN}/Fire.webp`,
        iconLocal: "/elements/Fire.png",
    },
    Ice: {
        bg: "bg-sky-400/20",
        text: "text-sky-300",
        border: "border-sky-400/40",
        glow: "shadow-sky-400/30",
        hex: "#7dd3fc",
        icon: `${CDN}/Ice.webp`,
        iconLocal: "/elements/Ice.png",
    },
    Lightning: {
        bg: "bg-violet-500/20",
        text: "text-violet-400",
        border: "border-violet-500/40",
        glow: "shadow-violet-500/30",
        hex: "#a78bfa",
        icon: `${CDN}/Thunder.webp`,
        iconLocal: "/elements/Thunder.png",
    },
    Wind: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-400",
        border: "border-emerald-500/40",
        glow: "shadow-emerald-500/30",
        hex: "#34d399",
        icon: `${CDN}/Wind.webp`,
        iconLocal: "/elements/Wind.png",
    },
    Quantum: {
        bg: "bg-indigo-500/20",
        text: "text-indigo-400",
        border: "border-indigo-500/40",
        glow: "shadow-indigo-500/30",
        hex: "#818cf8",
        icon: `${CDN}/Quantum.webp`,
        iconLocal: "/elements/Quantum.png",
    },
    Imaginary: {
        bg: "bg-yellow-400/20",
        text: "text-yellow-300",
        border: "border-yellow-400/40",
        glow: "shadow-yellow-400/30",
        hex: "#fde047",
        icon: `${CDN}/Imaginary.webp`,
        iconLocal: "/elements/Imaginary.png",
    },
    Physical: {
        bg: "bg-stone-400/20",
        text: "text-stone-300",
        border: "border-stone-400/40",
        glow: "shadow-stone-400/30",
        hex: "#d6d3d1",
        icon: `${CDN}/Physical.webp`,
        iconLocal: "/elements/Physical.png",
    },
};

export function getElementStyles(element: Element) {
    return ELEMENT_STYLES[element];
}
