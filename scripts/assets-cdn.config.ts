/**
 * Cloudflare R2 CDN base for hsr-randomizer-assets (no trailing slash).
 *
 * 1. In hsr-randomizer-infra: `npm run deploy` to sync and upload new assets to R2.
 * 2. Run `npm run generate:characters`.
 */
export { ASSETS_CDN as ASSETS_CDN_BASE } from "../src/config/assets";

/** File extension under each variant folder ({id}.{ext}) */
export const ASSETS_EXT = "webp";
