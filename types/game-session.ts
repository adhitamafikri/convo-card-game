import type { Player } from "./player";
import type { Card, GameThemeSlug } from "./game-card";

/**
 * Game session type definition
 * Represents the complete state of an active game session
 */
export type GameSession = {
  /**
   * Unique identifier for the session
   */
  id: string;

  /**
   * Selected game theme for this session
   */
  theme: GameThemeSlug;

  /**
   * List of players in the session
   */
  players: Player[];

  /**
   * Index of the current player (0-based)
   */
  currentPlayerIndex: number;

  /**
   * Cards remaining in the stack (not yet drawn)
   */
  cardsOnStack: Card[];

  /**
   * Cards currently on the deck (available for selection)
   */
  cardsOnDeck: Card[];

  /**
   * Currently selected card (null if no card is selected)
   */
  selectedCard: Card | null;

  /**
   * Timestamp when the session was created
   */
  createdAt: string;

  /**
   * Timestamp when the session was last updated
   */
  updatedAt: string;

  /**
   * Game phase: 'opening' | 'playing' | 'closing'
   */
  phase: "opening" | "playing" | "closing";

  /**
   * Whether the opening card has been shown
   */
  openingShown: boolean;
};

/**
 * Minimal data needed to create a new game session
 */
export type CreateSessionData = {
  theme: GameThemeSlug;
  players: Player[];
};
