"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { GameCard } from "@/components/game-card";
import { CardStack } from "@/components/card-stack";
import { GameDeck } from "@/components/game-deck";
import { gameCardContents } from "@/configs/contents";

type GameThemeSlug = "family" | "friends" | "boyfriendGirlfriend";

interface GameCardItem {
  id: string;
  content: string;
  isOpening: boolean;
  isClosing: boolean;
}

export default function GameRoomPage() {
  const [cardsOnStack] = useState<GameCardItem[]>([]);
  const [cardsOnDeck, setCardsOnDeck] = useState<GameCardItem[]>([]);
  const [selectedCard, setSelectedCard] = useState<GameCardItem | null>(null);
  const [currentTheme] = useState<GameThemeSlug>("family");

  const handleDrawCard = () => {
    const themeCards = gameCardContents[currentTheme];
    const remainingCards = themeCards.filter(
      (card) =>
        !cardsOnStack.some((c) => c.id === card.id) &&
        !cardsOnDeck.some((c) => c.id === card.id)
    );

    if (remainingCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      const drawnCard = remainingCards[randomIndex];
      setCardsOnDeck((prev) => [...prev, drawnCard]);
    }
  };

  const handleSelectCard = (card: GameCardItem) => {
    setSelectedCard(card);
  };

  const handleEndTurn = () => {
    if (selectedCard) {
      setCardsOnDeck((prev) => prev.filter((c) => c.id !== selectedCard.id));
      setSelectedCard(null);
    }
  };

  const handleBackToMenu = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-950 dark:to-rose-950 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              Room: Obrolan
            </h1>
            <p className="text-sm text-base-content/60 dark:text-base-content/40">
              Tema: {gameCardContents[currentTheme][0]?.id.includes("family") ? "Keluarga" : "Sahabat"}
            </p>
          </div>
          <Button variant="ghost" onClick={handleBackToMenu}>
            Keluar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-6">
            <CardStack
              remainingCount={
                gameCardContents[currentTheme].length -
                cardsOnStack.length -
                cardsOnDeck.length
              }
              onDrawCard={handleDrawCard}
            />
          </div>

          <div className="lg:col-span-2">
            <GameDeck title="Pilih Kartu">
              {cardsOnDeck.length === 0 ? (
                <p className="text-base-content/40 dark:text-base-content/30 text-center py-12">
                  Tekan tombol di sebelah untuk menarik kartu
                </p>
              ) : (
                cardsOnDeck.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    isOpen={selectedCard?.id === card.id}
                    onSelect={() => handleSelectCard(card)}
                  >
                    {card.content}
                  </GameCard>
                ))
              )}
            </GameDeck>
          </div>
        </div>

        {selectedCard && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-base-300/90 border-t border-orange-100 dark:border-orange-800/30">
            <div className="max-w-4xl mx-auto flex justify-center">
              <Button variant="primary" size="lg" onClick={handleEndTurn}>
                Selesai
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
