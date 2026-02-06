interface GameStatsProps {
  closedCardsCount: number;
  deckCardsCount: number;
  cardsInStackCount: number;
}

export function GameStats({
  closedCardsCount,
  deckCardsCount,
  cardsInStackCount,
}: GameStatsProps) {
  const stats = [
    {
      label: "Selesai",
      value: closedCardsCount,
      color: "text-secondary",
    },
    {
      label: "Di Meja",
      value: deckCardsCount,
      color: "text-primary",
    },
    {
      label: "Tumpukan",
      value: cardsInStackCount,
      color: "text-base-content",
    },
  ];

  return (
    <div className="w-full p-4 bg-base-200 rounded-lg border-2 border-primary/30 shadow-warm">
      <h3 className="text-sm font-bold text-secondary mb-3 uppercase tracking-wide">
        Statistik
      </h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between py-2 px-3 bg-base-300/50 rounded-md"
          >
            <span className="text-sm text-base-content/70">{stat.label}</span>
            <span className={`text-lg font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
