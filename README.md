# HSR Randomizer

A team randomizer for Honkai: Star Rail. Configure your owned roster, pick a mode, and generate random teams from your available characters: useful for challenge runs or mixing things up.

**Live:** https://hsr-randomizer.zelkonar.com/

## Features

- **Roster management** - toggle which characters you own; filter by element, path, and rarity
- **Saved rosters** - name and save roster snapshots to switch between quickly (e.g. "Lightning only", "Full roster")
- **Multiple modes** - generate 1, 2, 3, or 4 random teams at once
- **Sustain requirement** - optionally enforce that each team includes a healer/shield character
- **Import / Export** - share your roster as a JSON array of character IDs

## Stack

React 19, TypeScript, Tailwind CSS v4, Vite, deployed on Vercel.

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

## Assets & character data

Character images and metadata are sourced from **[Mar-7th/StarRailRes](https://github.com/Mar-7th/StarRailRes)** and served via Cloudflare R2.

Character data is **generated and uploaded from [`hsr-randomizer-infra`](https://github.com/Zelkonar/hsr-randomizer-infra)** (`npm run deploy` there), not bundled into this app. The app fetches `data/version.json` from R2 at runtime and loads the content-hashed `characters.<hash>.json` it points to, so a data update lands without redeploying the front end.

`src/data/characters.fallback.json` is a bundled snapshot used only when the live fetch fails (offline / R2 down). Refresh it from the current R2 data with `npm run update:fallback`.

## Branching and deployment

| Branch           | Purpose           | Vercel environment |
| ---------------- | ----------------- | ------------------ |
| `release`        | Production        | Production         |
| `main`           | Staging / preview | Preview            |
| Feature branches | Development       | Not deployed       |

Pushing to `release` creates a GitHub Release tagged with the `VERSION` file contents. PRs targeting `release` must contain a `VERSION` bump greater than what's currently on `release`.
