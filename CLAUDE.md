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

## Styling

Tailwind v4 (CSS-based config, no `tailwind.config`). Styles are inline utility classes on JSX, composed with `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge). State-driven components use `cva` (`ModeSelector`, `RandomizeButton`, `RosterCard`, `TeamView`). There is no `const styles = {}` pattern.

### Semantic color tokens

Colors are driven by semantic tokens (shadcn-style naming), not literal Tailwind colors with `dark:` pairs. The palette is defined once in `src/index.css`: light values in `:root`, dark overrides under `.dark`, exposed as utilities via `@theme inline`. Components reference roles, so a class like `border-border bg-card text-muted-foreground` themes itself with no `dark:` variant.

Token values point at Tailwind's own palette variables (e.g. `--card: var(--color-gray-900)`), so they stay in the same oklch color space as the rest of the system and compose with the opacity modifier.

Token vocabulary:

- Surfaces: `bg-background` (page), `bg-card` (cards/modals/popovers and controls), `bg-muted` (inset/hover on a surface). `popover` mirrors `card`.
- Text: `text-foreground`, `text-muted-foreground`. For extra tiers, lean on the opacity modifier rather than new tokens: `text-foreground/80` (prominent secondary), `text-muted-foreground/70` (faint).
- Borders: `border-border` (default), `input`/`ring` for form/focus. A stronger hover/active border is `border-foreground/25`.
- Accent (the sky brand): `text-primary`, with soft fills and borders derived by opacity - `bg-primary/10`, `border-primary/50`.

Prefer the opacity modifier over inventing new tokens (it works because values are channel-based). To retheme, edit the variable blocks in `src/index.css`. To add a role, add the variable to both blocks plus a `--color-*` mapping in `@theme inline`.

Stay on tokens for structural/neutral UI. Literal colors are reserved for things outside the theme palette: element colors (`src/lib/element.ts`), rarity colors, status colors (red/amber/green/rose), and a few intentional one-offs (the deliberately dark tooltip, white monochrome icons toggled with `invert dark:invert-0`).

### Theme switching

`useTheme` (`src/hooks/useTheme.ts`) manages a `light | dark | system` preference, persisted to localStorage and applied as a `.dark` class on `<html>`. `system` defaults on first visit and tracks the OS live. An inline script in `index.html` applies the resolved theme before first paint to avoid a flash. `ThemeSelector` is the pinned bottom-left control.

## Writing Style

No em dashes or AI writing tells in any repo artifact - code comments, commit messages, or docs. Use colons or hyphens instead. Chat responses are fine.
