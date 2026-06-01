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

Colors are driven by semantic tokens, not literal Tailwind colors with `dark:` pairs. The palette is defined once in `src/index.css`: light values in `:root`, dark overrides under `.dark`, exposed as utilities via `@theme inline`. Components reference roles, so a class like `border-line bg-fill text-fg-subtle` themes itself with no `dark:` variant.

Token vocabulary:

- Surfaces: `bg-canvas` (page), `bg-surface` (cards/modals/popovers), `bg-fill` (controls on canvas), `bg-muted` (inset/hover on a surface)
- Text: `text-fg`, `text-fg-muted`, `text-fg-subtle`, `text-fg-faint`
- Borders: `border-line`, `border-line-strong` (hover/active), `border-line-subtle` (faint edges)
- Accent: `text-accent`, `bg-accent-soft`, `border-accent-line`

To retheme or add a theme, edit the variable blocks in `src/index.css`. To add a new role, add the variable to both blocks plus a `--color-*` mapping in `@theme inline`.

Stay on tokens for structural/neutral UI. Literal colors are reserved for things outside the theme palette: element colors (`src/lib/element.ts`), rarity colors, status colors (red/amber/green/rose), and a few intentional one-offs (the deliberately dark tooltip, white monochrome icons toggled with `invert dark:invert-0`).

### Theme switching

`useTheme` (`src/hooks/useTheme.ts`) manages a `light | dark | system` preference, persisted to localStorage and applied as a `.dark` class on `<html>`. `system` defaults on first visit and tracks the OS live. An inline script in `index.html` applies the resolved theme before first paint to avoid a flash. `ThemeSelector` is the pinned bottom-left control.

## Writing Style

No em dashes or AI writing tells in any repo artifact - code comments, commit messages, or docs. Use colons or hyphens instead. Chat responses are fine.
