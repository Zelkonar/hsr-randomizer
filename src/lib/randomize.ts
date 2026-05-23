import type { Character, CharacterFilter, Team } from "../types/character";

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function applyFilter(
  pool: Character[],
  filter: CharacterFilter = {}
): Character[] {
  return pool.filter((c) => {
    if (filter.elements?.length && !filter.elements.includes(c.element)) return false;
    if (filter.paths?.length && !filter.paths.includes(c.path)) return false;
    if (filter.rarities?.length && !filter.rarities.includes(c.rarity)) return false;
    if (filter.includeIds && !filter.includeIds.includes(c.id)) return false;
    return true;
  });
}


export type TeamSize = 1 | 2 | 3 | 4;

export class NotEnoughCharactersError extends Error {
  constructor(needed: number, available: number) {
    super(`Need ${needed} characters but only ${available} are available after filtering.`);
    this.name = "NotEnoughCharactersError";
  }
}

export function rollTeam(
  pool: Character[],
  size: TeamSize = 4,
  filter: CharacterFilter = {}
): Character[] {
  let remaining = applyFilter(pool, filter);

  if (remaining.length < size) {
    throw new NotEnoughCharactersError(size, remaining.length);
  }

  const team: Character[] = [];

  for (let i = 0; i < size; i++) {
    const pick = randomPick(remaining);
    team.push(pick);

    // remove picked character as well as any variants
    remaining = remaining.filter((c) => c.id !== pick.id && c.name !== pick.name);
  }

  return team;
}

export function buildTeam(members: Character[]): Team {
  if (members.length < 1 || members.length > 4) {
    throw new Error("A team must have between 1 and 4 members.");
  }

  return {
    id: crypto.randomUUID(),
    members: members as Team["members"],
    createdAt: Date.now(),
  };
}

// Convenience: roll and build in one call.
export function rollAndBuildTeam(
  pool: Character[],
  size: TeamSize = 4,
  filter: CharacterFilter = {}
): Team {
  const members = rollTeam(pool, size, filter);
  return buildTeam(members);
}
