"use client";

import { useState } from "react";
import type { GameThemeSlug, Card } from "@/types";
import { Button } from "@/components/button";
import { GameCard } from "@/components/game-card";
import { CardStack } from "@/components/card-stack";
import { GameDeck } from "@/components/game-deck";
import { gameCardContents } from "@/configs/contents";

export default function GameRoomPage() {
  const [cardsOnStack] = useState<Card[]>([]);
  const [cardsOnDeck, setCardsOnDeck] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
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

  const handleSelectCard = (card: Card) => {
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
    <div className="min-h-full py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Room: Obrolan
            </h1>
            <p className="text-sm text-base-content/60">
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
                <p className="text-base-content/40 text-center py-12">
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
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-200/90 backdrop-blur-sm border-t-2 border-primary/20 shadow-warm">
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
