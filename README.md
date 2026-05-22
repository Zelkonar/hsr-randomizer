# hsr-randomizer-react

Random HSR Teams

Visit: https://hsr-randomizer.vercel.app/

## Local development

Requires **Node.js 20.19+** (22 LTS recommended). Vite 8 and Tailwind 4 use platform-specific native binaries; install dependencies on each machine (do not copy `node_modules` from macOS to Windows).

```bash
npm install
npm run dev
```

### Character images (separate repo + jsDelivr)

Images and sync scripts live in **[hsr-randomizer-assets](https://github.com/Zelkonar/hsr-randomizer-assets)**. This app only references jsDelivr URLs — see **[docs/assets.md](docs/assets.md)**.

Quick flow: sync in assets repo → bump tag in `scripts/assets-cdn.config.ts` → `npm run generate:characters`.

### Deploying on Vercel

Vercel runs `npm run build`, which automatically runs **`prebuild`** → `tsx scripts/write-version.ts` before `tsc` and `vite build`. You do not need to commit `src/data/version.ts` (it is gitignored and generated on every build).

Default project settings are enough: **Framework Preset: Vite**, **Build Command: `npm run build`**, **Output Directory: `dist`**.

### Windows notes

- Use Node 20+ from [nodejs.org](https://nodejs.org/) or `nvm-windows`. The repo ships `.nvmrc` with `22`.
- If `npm run build` fails with "Cannot find native binding", delete `node_modules` and run `npm install` again on Windows (not after copying `node_modules` from another OS).
- `postinstall` installs the correct rolldown/Tailwind bindings for your platform when npm skips optional dependencies.
