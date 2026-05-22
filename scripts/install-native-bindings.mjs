/**
 * Ensures Vite (rolldown) and Tailwind platform native bindings are installed.
 * Works around npm optional-dependency bugs when lockfiles are created on another OS.
 */
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { arch, platform } from "node:os";

const require = createRequire(import.meta.url);

const BINDINGS = {
  "darwin-arm64": {
    rolldown: "@rolldown/binding-darwin-arm64@1.0.2",
    tailwind: "@tailwindcss/oxide-darwin-arm64@4.3.0",
  },
  "darwin-x64": {
    rolldown: "@rolldown/binding-darwin-x64@1.0.2",
    tailwind: "@tailwindcss/oxide-darwin-x64@4.3.0",
  },
  "win32-x64": {
    rolldown: "@rolldown/binding-win32-x64-msvc@1.0.2",
    tailwind: "@tailwindcss/oxide-win32-x64-msvc@4.3.0",
  },
  "win32-arm64": {
    rolldown: "@rolldown/binding-win32-arm64-msvc@1.0.2",
    tailwind: "@tailwindcss/oxide-win32-arm64-msvc@4.3.0",
  },
};

const key = `${platform()}-${arch()}`;
const pair = BINDINGS[key];
if (!pair) {
  console.warn(`[postinstall] No native binding map for ${key}; skipping.`);
  process.exit(0);
}

function packageName(spec) {
  const versionAt = spec.lastIndexOf("@");
  return versionAt > 0 ? spec.slice(0, versionAt) : spec;
}

function isInstalled(spec) {
  const name = packageName(spec);
  try {
    require.resolve(name);
    return true;
  } catch {
    return false;
  }
}

const missing = [pair.rolldown, pair.tailwind].filter((spec) => !isInstalled(spec));
if (missing.length === 0) process.exit(0);

console.log(`[postinstall] Installing native bindings for ${key}: ${missing.join(" ")}`);
execSync(`npm install --no-save --ignore-engines --force ${missing.join(" ")}`, {
  stdio: "inherit",
  env: process.env,
});

for (const spec of missing) {
  const name = packageName(spec);
  if (!isInstalled(spec)) {
    console.error(`[postinstall] Failed to install ${name}. Upgrade to Node 20+ and re-run npm install.`);
    process.exit(1);
  }
}
