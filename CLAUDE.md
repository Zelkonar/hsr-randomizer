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
