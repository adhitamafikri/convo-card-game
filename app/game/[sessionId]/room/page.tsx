"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Card } from "@/types";
import { Button } from "@/components/button";
import { CardStack } from "@/components/card-stack";
import { GameGrid } from "@/components/game-grid";
import { PlayerList } from "@/components/player-list";
import { GameStats } from "@/components/game-stats";
import { GameHeader } from "@/components/game-header";
import { ForceStopButton } from "@/components/force-stop-button";
import { useGameSessionStore } from "@/store/game-session-store";
import { usePlayerStore } from "@/store/player-store";
import { useCardStore } from "@/store/card-store";
import { calculateColumns } from "@/lib/game-helpers";

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
  const params = useParams();
  const sessionIdFromUrl = params.sessionId as string;

  // Read from stores using selectors
  const sessionIdFromStore = useGameSessionStore((s) => s.sessionId);
  const phase = useGameSessionStore((s) => s.phase);
  const openingCard = useGameSessionStore((s) => s.openingCard);
  const closingCard = useGameSessionStore((s) => s.closingCard);
  const isInitialized = useGameSessionStore((s) => s.isInitialized);

  const players = usePlayerStore((s) => s.players);
  const currentPlayerIndex = usePlayerStore((s) => s.currentPlayerIndex);

  const cardsOnStack = useCardStore((s) => s.cardsOnStack);
  const cardsOnDeck = useCardStore((s) => s.cardsOnDeck);
  const closedCards = useCardStore((s) => s.closedCards);
  const selectedCard = useCardStore((s) => s.selectedCard);

  // Get actions from stores
  const { startPlaying, clearSession, startClosing } = useGameSessionStore();
  const { advanceToNextPlayer } = usePlayerStore();
  const { selectCard, drawCardsToTable, moveSelectedCardToClosed } =
    useCardStore();

  // Validate session on mount
  useEffect(() => {
    // Wait for store rehydration
    if (!isInitialized) return;

    // Check if URL sessionId matches store sessionId
    if (sessionIdFromUrl !== sessionIdFromStore) {
      // Mismatch -> redirect to session not found page
      router.push(`/game/${sessionIdFromUrl}/not-found`);
      return;
    }
  }, [sessionIdFromUrl, sessionIdFromStore, isInitialized, router]);

  // Handle starting playing phase
  const handleStartPlaying = () => {
    startPlaying();
    // Auto-draw cards based on player count
    drawCardsToTable(players.length);
  };

  // Handle card selection
  const handleSelectCard = (card: Card) => {
    if (selectedCard !== null) return; // Guard: only one selection per turn
    selectCard(card);
  };

  // Handle end turn
  const handleEndTurn = () => {
    if (!selectedCard) return;

    // Move card to closed and clear selection
    moveSelectedCardToClosed();

    // Draw 1 new card if stack has cards
    if (cardsOnStack.length > 0) {
      drawCardsToTable(1);
    }

    // Advance to next player
    advanceToNextPlayer();

    // Check if should transition to closing
    if (cardsOnStack.length === 0 && cardsOnDeck.length === 1) {
      startClosing();
    }
  };

  // Handle force stop
  const handleForceStop = () => {
    clearSession();
    router.push("/");
  };

  // Handle exit
  const handleExit = () => {
    handleForceStop();
  };

  // Back to menu
  const backToMenu = () => {
    clearSession();
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/8 via-base-100 to-secondary/5">
      <GameHeader onExit={handleExit} />

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        {/* Mobile/Tablet: Card Stack */}
        <div className="lg:hidden">
          <CardStack remainingCount={cardsOnStack.length} />
        </div>

        {/* Mobile/Tablet: Player List */}
        <div className="lg:hidden">
          <PlayerList players={players} currentPlayerIndex={currentPlayerIndex} />
        </div>

        {/* Desktop: Left Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-[300px] gap-4">
          <CardStack remainingCount={cardsOnStack.length} />
          <PlayerList players={players} currentPlayerIndex={currentPlayerIndex} />
          <GameStats
            closedCardsCount={closedCards.length}
            deckCardsCount={cardsOnDeck.length}
            cardsInStackCount={cardsOnStack.length}
          />
          <ForceStopButton onForceStop={handleForceStop} />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center min-h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-xl">
          {phase === "opening" && (
            <OpeningCardDisplay
              card={openingCard}
              onBegin={handleStartPlaying}
            />
          )}
          {phase === "playing" && (
            <GameGrid
              cards={cardsOnDeck}
              selectedCardId={selectedCard?.id ?? null}
              onCardSelect={handleSelectCard}
              columns={calculateColumns(players.length)}
            />
          )}
          {phase === "closing" && (
            <ClosingCardDisplay card={closingCard} onBackToMenu={backToMenu} />
          )}
        </main>

        {/* Mobile/Tablet: Statistics */}
        <div className="lg:hidden">
          <GameStats
            closedCardsCount={closedCards.length}
            deckCardsCount={cardsOnDeck.length}
            cardsInStackCount={cardsOnStack.length}
          />
        </div>

        {/* Mobile/Tablet: End Game Button */}
        <div className="lg:hidden">
          <ForceStopButton onForceStop={handleForceStop} />
        </div>
      </div>

      {/* Bottom Action Bar */}
      {selectedCard && phase === "playing" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-200/90 backdrop-blur-sm border-t border-primary/20 shadow-lg">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleEndTurn}
            >
              Akhiri Giliran
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
