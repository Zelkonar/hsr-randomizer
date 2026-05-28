import type { Path } from "../types/path";

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
    return `/paths/${PATH_ICON_NAMES[path]}Small.png`;
}

export function getPathIcon(path: Path) {
    return `/paths/${PATH_ICON_NAMES[path]}Middle.png`;
}

export function getPathIconLarge(path: Path) {
    return `/paths/${PATH_ICON_NAMES[path]}.png`;
}

export function getPathIconLocal(path: Path) {
    return `/paths/${PATH_ICON_NAMES[path]}Middle.png`;
}

export function getPathIconLargeLocal(path: Path) {
    return `/paths/${PATH_ICON_NAMES[path]}.png`;
}
