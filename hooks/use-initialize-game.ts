/**
 * Game initialization hook
 * Handles initialization of all game stores from session data
 */

import type { GameThemeSlug } from "@/types";
import { useGameSessionStore } from "@/store/game-session-store";
import { usePlayerStore } from "@/store/player-store";
import { useCardStore } from "@/store/card-store";
import { gameCardContents } from "@/configs/contents";
import { generatePlayerId } from "@/lib/game-helpers";

export function useInitializeGame() {
  const initializeSession = useGameSessionStore((s) => s.initializeSession);
  const setPlayers = usePlayerStore((s) => s.setPlayers);
  const initializeCards = useCardStore((s) => s.initializeCards);

  const initGame = (sessionData: {
    theme: GameThemeSlug;
    players: string[];
  }) => {
    const { theme, players: playerNames } = sessionData;

    // 1. Initialize session
    initializeSession(theme, playerNames);

    // 2. Create Player objects
    const timestamp = Date.now();
    const players = playerNames.map((name, index) => ({
      id: generatePlayerId(index, timestamp),
      name,
    }));
    setPlayers(players);

    // 3. Load and separate cards
    const allCards = gameCardContents[theme];
    const openingCard = allCards.find((c) => c.isOpening) || null;
    const closingCard = allCards.find((c) => c.isClosing) || null;
    const convoCards = allCards.filter((c) => !c.isOpening && !c.isClosing);

    // 4. Initialize cards (will be shuffled in store)
    initializeCards(convoCards);

    // 5. Set opening/closing cards in session store
    useGameSessionStore.getState().setOpeningCard(openingCard);
    useGameSessionStore.getState().setClosingCard(closingCard);
  };

  return { initGame };
}
