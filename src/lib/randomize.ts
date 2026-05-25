import type { Character, CharacterFilter, Path, Team } from "../types/character";

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const SUSTAIN_PATHS = new Set<Path>(["Preservation", "Abundance"]);
const SUSTAIN_IDS = new Set([1409]); // Hyacine

export function isSustain(c: Character): boolean {
  return SUSTAIN_PATHS.has(c.path) || SUSTAIN_IDS.has(c.id);
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

function removeFromPool(pool: Character[], pick: Character): Character[] {
  return pool.filter((c) => c.id !== pick.id && c.name !== pick.name);
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

  if (filter.requireSustain) {
    for (let i = 0; i < size - 1; i++) {
      const pick = randomPick(remaining);
      team.push(pick);
      remaining = removeFromPool(remaining, pick);
    }
    const lastPool = !team.some(isSustain) && remaining.some(isSustain)
      ? remaining.filter(isSustain)
      : remaining;
    team.push(randomPick(lastPool));
  } else {
    while (team.length < size) {
      const pick = randomPick(remaining);
      team.push(pick);
      remaining = removeFromPool(remaining, pick);
    }
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

// Roll N teams from a shared pool — each team excludes characters already picked.
// Static filters (includeIds, elements, paths, rarities) are applied once up front;
// requireSustain is enforced per team.
export function rollMultipleTeams(
  pool: Character[],
  count: number,
  size: TeamSize = 4,
  filter: CharacterFilter = {}
): Team[] {
  const { requireSustain, ...staticFilter } = filter;
  let remaining = applyFilter(pool, staticFilter);
  const teams: Team[] = [];

  for (let i = 0; i < count; i++) {
    const members = rollTeam(remaining, size, { requireSustain });
    teams.push(buildTeam(members));
    const pickedIds = new Set(members.map((c) => c.id));
    remaining = remaining.filter((c) => !pickedIds.has(c.id));
  }

  return teams;
}
