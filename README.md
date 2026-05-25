# HSR Randomizer

A randomizer for Honkai: Star Rail team building. Filter your roster by element, path, and rarity, then let the app generate a random team: useful for challenge runs or just mixing things up.

Visit: https://hsr-randomizer.vercel.app/

## Stack

React, TypeScript, Tailwind CSS, Vite: deployed on Vercel.

## Local development

Requires **Node.js 20.19+** (22 LTS recommended).

```bash
npm install
npm run dev
```

## Assets

Character images, element icons, and path icons are served from **[hsr-randomizer-assets](https://github.com/Zelkonar/hsr-randomizer-assets)** via jsDelivr. When the assets repo publishes a new tag, bump `VERSION` in `src/config/assets.ts` to match, then run `npm run generate:characters`.

## Versioning

Version is tracked in the `VERSION` file (`vX.Y.Z`). A pre-commit hook validates the format. When opening a PR to `main`, CI checks that the version is greater than what's on `main`.
