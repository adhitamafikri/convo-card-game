import type { Card } from "@/types";
import { GameCard } from "./game-card";

interface GameGridProps {
  cards: Card[];
  selectedCardId: string | null;
  onCardSelect: (card: Card) => void;
  columns?: 2 | 3 | 4;
}

export function GameGrid({
  cards,
  selectedCardId,
  onCardSelect,
  columns = 2,
}: GameGridProps) {
  const gridColsClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[columns];

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-base-content/40 text-center text-lg">
          Belum ada kartu di meja
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className={`grid ${gridColsClass} gap-3 md:gap-4`}>
        {cards.map((card) => (
          <GameCard
            key={card.id}
            cardId={card.id}
            isOpen={selectedCardId === card.id}
            onSelect={() => onCardSelect(card)}
            className="w-full max-w-[200px] md:max-w-[240px]"
          >
            {card.content}
          </GameCard>
        ))}
      </div>
    </div>
  );
}
