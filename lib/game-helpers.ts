/**
 * Game utility functions
 * Shared helpers for game logic across stores and components
 */

/**
 * Fisher-Yates shuffle algorithm
 * Shuffles array in place and returns a new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate unique player ID
 */
export function generatePlayerId(index: number, timestamp: number): string {
  return `player-${index + 1}-${timestamp}`;
}

/**
 * Generate unique session ID
 */
export function generateSessionId(): string {
  return `session-${Date.now()}`;
}

/**
 * Calculate grid columns based on player count
 * - 2 players: 2 columns
 * - 3 players: 3 columns
 * - 4 players: 2 columns (2x2 grid)
 */
export function calculateColumns(playerCount: number): 2 | 3 | 4 {
  if (playerCount === 2) return 2;
  if (playerCount === 3) return 3;
  return 2; // For 4 players, use 2 columns (2x2 grid)
}
