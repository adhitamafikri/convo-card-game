"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { GameThemeSlug, Card, Player } from "@/types";
import { Button } from "@/components/button";
import { GameCard } from "@/components/game-card";
import { CardStack } from "@/components/card-stack";
import { GameGrid } from "@/components/game-grid";
import { PlayerList } from "@/components/player-list";
import { GameStats } from "@/components/game-stats";
import { GameHeader } from "@/components/game-header";
import { ForceStopButton } from "@/components/force-stop-button";
import { gameCardContents, gameThemes } from "@/configs/contents";

// Helper Functions
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generatePlayerId(index: number): string {
  return `player-${index + 1}-${Date.now()}`;
}

function calculateColumns(playerCount: number): 2 | 3 | 4 {
  if (playerCount === 2) return 2;
  if (playerCount === 3) return 3;
  return 2; // For 4 players, use 2 columns (2x2 grid)
}

// Phase Display Components
function OpeningCardDisplay({
  card,
  onBegin,
}: {
  card: Card | null;
  onBegin: () => void;
}) {
  if (!card) return null;
  return (
    <div className="max-w-2xl mx-auto p-8 bg-base-200 rounded-2xl shadow-warm-lg border-2 border-primary">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Aturan & Keselamatan
      </h2>
      <p className="text-lg text-base-content leading-relaxed mb-6">
        {card.content}
      </p>
      <Button variant="primary" size="lg" onClick={onBegin}>
        Mulai Bermain
      </Button>
    </div>
  );
}

function ClosingCardDisplay({
  card,
  onBackToMenu,
}: {
  card: Card | null;
  onBackToMenu: () => void;
}) {
  if (!card) return null;
  return (
    <div className="max-w-2xl mx-auto p-8 bg-base-200 rounded-2xl shadow-warm-lg border-2 border-secondary">
      <h2 className="text-2xl font-bold text-secondary mb-4">Terima Kasih!</h2>
      <p className="text-lg text-base-content leading-relaxed mb-6">
        {card.content}
      </p>
      <Button variant="primary" size="lg" onClick={onBackToMenu}>
        Kembali ke Menu
      </Button>
    </div>
  );
}

export default function GameRoomPage() {
  const router = useRouter();

  // Game setup state
  const [theme, setTheme] = useState<GameThemeSlug>("family");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Card management state
  const [cardsOnStack, setCardsOnStack] = useState<Card[]>([]);
  const [cardsOnDeck, setCardsOnDeck] = useState<Card[]>([]);
  const [closedCards, setClosedCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  // Game flow state
  const [phase, setPhase] = useState<"opening" | "playing" | "closing">(
    "opening"
  );
  const [openingCard, setOpeningCard] = useState<Card | null>(null);
  const [closingCard, setClosingCard] = useState<Card | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize game from session data
  const initializeGame = (sessionData: {
    theme: GameThemeSlug;
    players: string[];
  }) => {
    // Create Player objects
    const playerObjects: Player[] = sessionData.players.map((name, index) => ({
      id: generatePlayerId(index),
      name: name,
    }));

    // Load cards for theme
    const themeCards = gameCardContents[sessionData.theme];

    // Separate opening, closing, and convo cards
    const opening = themeCards.find((card) => card.isOpening);
    const closing = themeCards.find((card) => card.isClosing);
    const convoCards = themeCards.filter(
      (card) => !card.isOpening && !card.isClosing
    );

    // Shuffle convo cards
    const shuffled = shuffleArray(convoCards);

    // Set state
    setTheme(sessionData.theme);
    setPlayers(playerObjects);
    setOpeningCard(opening || null);
    setClosingCard(closing || null);
    setCardsOnStack(shuffled);
    setPhase("opening");
    setIsInitialized(true);
  };

  // Session validation on mount
  useEffect(() => {
    const sessionData = localStorage.getItem("gameSession");
    if (!sessionData) {
      router.push("/");
      return;
    }

    try {
      const parsed = JSON.parse(sessionData);
      if (!parsed.theme || !parsed.players || parsed.players.length < 2) {
        router.push("/");
        return;
      }
      initializeGame(parsed);
    } catch (error) {
      console.error("Failed to parse session data:", error);
      router.push("/");
    }
  }, [router]);

  // Start playing phase
  const startPlaying = () => {
    setPhase("playing");
    drawCardsToTable(players.length);
  };

  // Draw cards to table
  const drawCardsToTable = (count: number) => {
    const cardsToDraw = cardsOnStack.slice(0, count);
    const remainingCards = cardsOnStack.slice(count);

    setCardsOnDeck((prev) => [...prev, ...cardsToDraw]);
    setCardsOnStack(remainingCards);
  };

  // Select card
  const selectCard = (card: Card) => {
    setSelectedCard(card);
  };

  // End turn
  const endTurn = () => {
    if (!selectedCard) return;

    // Move selected card to closed cards
    setClosedCards((prev) => [...prev, selectedCard]);

    // Remove from deck
    setCardsOnDeck((prev) => prev.filter((c) => c.id !== selectedCard.id));

    // Draw 1 new card if available
    if (cardsOnStack.length > 0) {
      drawCardsToTable(1);
    } else if (cardsOnDeck.length === 1) {
      // Last card on deck, no cards in stack -> prepare closing
      setPhase("closing");
    }

    // Advance to next player
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);

    // Clear selection
    setSelectedCard(null);
  };

  // Handle exit
  const handleExit = () => {
    forceStopSession();
  };

  // Force stop session
  const forceStopSession = () => {
    localStorage.removeItem("gameSession");
    router.push("/");
  };

  // Back to menu
  const backToMenu = () => {
    localStorage.removeItem("gameSession");
    router.push("/");
  };

  // Don't render until initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/60">Memuat permainan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader onExit={handleExit} roomName="SambungRasa" />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[250px_1fr_250px] gap-4 p-4">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-4">
          <CardStack remainingCount={cardsOnStack.length} />
          <PlayerList players={players} currentPlayerIndex={currentPlayerIndex} />
        </div>

        {/* Center */}
        <div className="flex items-center justify-center">
          {phase === "opening" && (
            <OpeningCardDisplay card={openingCard} onBegin={startPlaying} />
          )}
          {phase === "playing" && (
            <GameGrid
              cards={cardsOnDeck}
              selectedCardId={selectedCard?.id ?? null}
              onCardSelect={selectCard}
              columns={calculateColumns(players.length)}
            />
          )}
          {phase === "closing" && (
            <ClosingCardDisplay card={closingCard} onBackToMenu={backToMenu} />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4">
          <ForceStopButton onForceStop={forceStopSession} />
          <GameStats
            closedCardsCount={closedCards.length}
            deckCardsCount={cardsOnDeck.length}
            cardsInStackCount={cardsOnStack.length}
          />
        </div>
      </div>

      {/* Bottom Action Bar */}
      {selectedCard && phase === "playing" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-200/90 backdrop-blur-sm border-t border-primary/20">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={endTurn}
            >
              Akhiri Giliran
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
