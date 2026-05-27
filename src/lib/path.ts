import type { Path } from "../types/path";
import { ASSETS_CDN } from "../config/assets";

const CDN = `${ASSETS_CDN}/icons/path`;

const PATH_ICON_NAMES: Record<Path, string> = {
    "The Hunt": "Hunt",
    Destruction: "Destruction",
    Erudition: "Erudition",
    Harmony: "Harmony",
    Nihility: "Nihility",
    Preservation: "Preservation",
    Abundance: "Abundance",
    Remembrance: "Remembrance",
    Elation: "Joy",
};

export function getPathIconSmall(path: Path) {
    return `${CDN}/${PATH_ICON_NAMES[path]}Small.webp`;
}

export function getPathIcon(path: Path) {
    return `${CDN}/${PATH_ICON_NAMES[path]}Middle.webp`;
}

export function getPathIconLarge(path: Path) {
    return `${CDN}/${PATH_ICON_NAMES[path]}.webp`;
}

export function getPathIconLocal(path: Path) {
    return `/paths/${PATH_ICON_NAMES[path]}Middle.png`;
}

export function getPathIconLargeLocal(path: Path) {
    return `/paths/${PATH_ICON_NAMES[path]}.png`;
}
