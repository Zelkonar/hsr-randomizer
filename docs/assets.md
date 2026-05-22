# Character images (CDN)

Images live in **[hsr-randomizer-assets](https://github.com/Zelkonar/hsr-randomizer-assets)** and are loaded via jsDelivr. This repo has no image files and no sync/compression scripts.

## After updating assets

1. In the assets repo: `npm run sync` → commit → push → tag (e.g. `v2`).
2. Here: edit `scripts/assets-cdn.config.ts` to match the tag:

   ```ts
   export const ASSETS_CDN_BASE =
     "https://cdn.jsdelivr.net/gh/Zelkonar/hsr-randomizer-assets@v2";
   ```

3. Regenerate character URLs:

   ```bash
   npm run generate:characters
   ```

4. Commit `src/data/characters.ts` and deploy.

## Variants in the app

| Field | Used for |
|-------|----------|
| `preview` | Roster grid |
| `portrait` | Random team cards |
| `icon` | Available on `Character.icon` |

Sync tooling, WebP settings, and publishing steps are documented in the assets repo README.
