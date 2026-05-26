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

type TeamSize = 1 | 2 | 3 | 4;

class NotEnoughCharactersError extends Error {
  constructor(needed: number, available: number) {
    super(`Need ${needed} characters but only ${available} are available after filtering.`);
    this.name = "NotEnoughCharactersError";
  }
}

function removeFromPool(pool: Character[], pick: Character): Character[] {
  return pool.filter((c) => c.id !== pick.id && c.name !== pick.name);
}

function buildTeam(members: Character[]): Team {
  if (members.length < 1 || members.length > 4) {
    throw new Error("A team must have between 1 and 4 members.");
  }
  return {
    id: crypto.randomUUID(),
    members: members as Team["members"],
    createdAt: Date.now(),
  };
}

// Pre-select one sustain per team upfront and remove them from the general pool.
// Each team rolls size-1 members freely. If the free picks include any sustain,
// the reserved one returns to the pool and the last slot is rolled freely too.
// If no sustain was rolled freely, the reserved sustain fills the last slot.
export function rollMultipleTeams(
  pool: Character[],
  count: number,
  size: TeamSize = 4,
  filter: CharacterFilter = {}
): Team[] {
  const { requireSustain, ...staticFilter } = filter;
  let remaining = applyFilter(pool, staticFilter);

  const reserved: (Character | null)[] = new Array(count).fill(null);
  if (requireSustain) {
    let sustainPool = remaining.filter(isSustain);
    if (sustainPool.length < count) {
      throw new NotEnoughCharactersError(count, sustainPool.length);
    }
    for (let i = 0; i < count; i++) {
      const pick = randomPick(sustainPool);
      reserved[i] = pick;
      sustainPool = removeFromPool(sustainPool, pick);
      remaining = removeFromPool(remaining, pick);
    }
  }

  const teams: Team[] = [];

  for (let i = 0; i < count; i++) {
    const members: Character[] = [];

    for (let j = 0; j < size - 1; j++) {
      const pick = randomPick(remaining);
      members.push(pick);
      remaining = removeFromPool(remaining, pick);
    }

    const sustain = reserved[i];
    if (sustain !== null) {
      if (members.some(isSustain)) {
        // Free picks already include a sustain — return reserved to pool and roll last slot freely
        remaining = [sustain, ...remaining];
        const pick = randomPick(remaining);
        members.push(pick);
        remaining = removeFromPool(remaining, pick);
      } else {
        members.push(sustain);
      }
    } else {
      const pick = randomPick(remaining);
      members.push(pick);
      remaining = removeFromPool(remaining, pick);
    }

    teams.push(buildTeam(members));
  }

  return teams;
}
