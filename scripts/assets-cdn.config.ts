/**
 * jsDelivr CDN base for hsr-randomizer-assets (no trailing slash).
 *
 * 1. In the assets repo: `npm run sync` → commit → push → tag.
 * 2. Update ASSETS_CDN in src/config/assets.ts to the new tag.
 * 3. Run `npm run generate:characters`.
 */
export { ASSETS_CDN as ASSETS_CDN_BASE } from "../src/config/assets";

/** File extension under each variant folder ({id}.{ext}) */
export const ASSETS_EXT = "webp";
