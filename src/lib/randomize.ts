import type { Character } from "../types/character";

/**
 * Returns 4 unique randomly selected characters from the provided pool.
 * Throws if the pool has fewer than 4 characters.
 */
export function randomTeam(pool: Character[]): [Character, Character, Character, Character] {
  if (pool.length < 4) {
    throw new Error(`Need at least 4 characters to build a team, got ${pool.length}`);
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2], shuffled[3]];
}
