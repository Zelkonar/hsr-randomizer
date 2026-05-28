/**
 * Cloudflare R2 CDN base for character images (no trailing slash).
 *
 * When new characters are added, run `npm run generate:characters`.
 */
export { ASSETS_CDN as ASSETS_CDN_BASE } from "../src/config/assets";

/** File extension under each variant folder ({id}.{ext}) */
export const ASSETS_EXT = "webp";
