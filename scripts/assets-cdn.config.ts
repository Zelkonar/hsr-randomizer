/**
 * jsDelivr CDN base for hsr-randomizer-assets (no trailing slash).
 *
 * 1. In the assets repo: `npm run sync` → commit → push → tag.
 * 2. Set BASE below to that tag, e.g. https://cdn.jsdelivr.net/gh/Zelkonar/hsr-randomizer-assets@v1
 * 3. Run `npm run generate:characters`.
 */
export const ASSETS_CDN_BASE =
  "https://cdn.jsdelivr.net/gh/Zelkonar/hsr-randomizer-assets@v1";

/** File extension under each variant folder ({id}.{ext}) */
export const ASSETS_EXT = "webp";
