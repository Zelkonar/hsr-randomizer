# HSR Randomizer

A team randomizer for Honkai: Star Rail. Configure your owned roster, pick a mode, and generate random teams from your available characters: useful for challenge runs or mixing things up.

**Live:** https://hsr-randomizer.vercel.app/

## Features

- **Roster management** - toggle which characters you own; filter by element, path, and rarity
- **Saved rosters** - name and save roster snapshots to switch between quickly (e.g. "Lightning only", "Full roster")
- **Multiple modes** - generate 1, 2, 3, or 4 random teams at once
- **Sustain requirement** - optionally enforce that each team includes a healer/shield character
- **Import / Export** - share your roster as a JSON array of character IDs

## Stack

React 19, TypeScript, Tailwind CSS v4, Vite — deployed on Vercel.

## Local development

Requires **Node.js 20.19+** (22 LTS recommended).

```bash
npm install
npm run dev
```

Run tests:

```bash
npm test
```

## Assets

Character images live in a separate repo: **[hsr-randomizer-assets](https://github.com/Zelkonar/hsr-randomizer-assets)**, sourced from **[Mar-7th/StarRailRes](https://github.com/Mar-7th/StarRailRes)**. They are served via jsDelivr.

When the assets repo publishes a new tag, bump the version in `src/config/assets.ts` to match, then run `npm run generate:characters` to regenerate `src/data/characters.ts`.

## Branching and deployment

| Branch           | Purpose           | Vercel environment |
| ---------------- | ----------------- | ------------------ |
| `release`        | Production        | Production         |
| `main`           | Staging / preview | Preview            |
| Feature branches | Development       | Not deployed       |

Pushing to `release` creates a GitHub Release tagged with the `VERSION` file contents. PRs targeting `release` must contain a `VERSION` bump greater than what's currently on `release`.
