# HSR Randomizer

## Product Vision

The core product is a **Challenges** system - the randomizer is a secondary feature.

**Core concept:** Users create shareable constraint sets ("challenges"), others try to satisfy them by building a valid team.

**Two interaction modes:**

- System generates a valid team within constraints (proves satisfiability)
- User selects characters manually and system validates against constraints

**Key features to build toward:**

- Constraint builder UI (elements, paths, rarities, specific characters, team size 1-4)
- Satisfiability checker (CSP - is a valid team possible given the current roster?)
- Shareable challenges via URL (base64-encoded constraint object, no backend needed) or stored in R2 for a community feed
- Team validator (user picks characters, did they meet the challenge?)

When suggesting features or scoping work, treat the Challenges tab as the primary product surface. Randomizer improvements are lower priority unless they feed into the constraint system.

## Planned: Styling Refactor

Replace the `const styles = {}` pattern across all component files with `cn` + `cva`.

Steps:

1. Install `clsx` and `tailwind-merge`
2. Create `src/lib/cn.ts` - a `cn()` utility combining clsx + tailwind-merge
3. Replace `const styles = {}` objects with inline `cn()` calls on JSX elements
4. Extract variant logic to `cva` for components with states: `RandomizeButton` (active/disabled), `SavedRosters` save button (save/overwrite), `RosterModalHeader` saved button (open/closed)
5. Add `darkMode: 'class'` to `tailwind.config` so dark variants work when theme toggle is built

After the refactor, theming is just adding `dark:` variants to existing `cn()` calls and a toggle that sets `class="dark"` on `<html>`.

## Writing Style

No em dashes or AI writing tells in any repo artifact - code comments, commit messages, or docs. Use colons or hyphens instead. Chat responses are fine.
