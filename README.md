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

## Versioning and releases

Versions are computed from [Conventional Commit](https://www.conventionalcommits.org/) subjects by
[release-please](https://github.com/googleapis/release-please); nothing is bumped by hand. `package.json` holds the
version, and a `commit-msg` hook runs commitlint so a malformed subject fails before it reaches CI.

| Prefix                       | Effect on version      |
| ---------------------------- | ---------------------- |
| `fix:`                       | patch (0.2.0 -> 0.2.1) |
| `feat:`                      | minor (0.2.0 -> 0.3.0) |
| `feat!:` / `BREAKING CHANGE` | minor while pre-1.0    |
| `chore:`, `docs:`, `test:`   | no release             |

Cutting a release:

1. Merge work into `main` with Conventional Commit subjects.
2. release-please keeps a `chore: release` PR open showing the next version and its changelog. Merge it when ready:
   that bumps `package.json`, writes `CHANGELOG.md`, and creates the `vX.Y.Z` tag and GitHub Release.
3. Deploy by opening a PR from `main` to `release`. Merging it ships to production.

Step 3 is deliberate and separate: tagging a version does not deploy it.
