/**
 * Game card and theme type definitions
 */

/**
 * Represents a single game card
 */
export type Card = {
  id: string;
  content: string;
  isOpening: boolean;
  isClosing: boolean;
};

/**
 * Represents a game theme
 */
export type GameTheme = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

/**
 * Available game theme slugs
 */
export type GameThemeSlug = "family" | "friends" | "couples";

/**
 * Collection of all game themes
 */
export type GameThemes = Record<GameThemeSlug, GameTheme>;

/**
 * Collection of game cards for each theme
 */
export type GameCardContents = Record<GameThemeSlug, Card[]>;
