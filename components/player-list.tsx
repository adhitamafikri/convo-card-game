import type { Player } from "@/types";

interface PlayerListProps {
  players: Player[];
  currentPlayerIndex: number;
}

export function PlayerList({ players, currentPlayerIndex }: PlayerListProps) {
  if (players.length === 0) {
    return (
      <div className="w-full p-4 bg-base-200 rounded-lg border-2 border-primary/30">
        <p className="text-sm text-base-content/40 text-center">
          Belum ada pemain
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-base-200 rounded-lg border-2 border-primary/30 shadow-warm">
      <h3 className="text-sm font-bold text-secondary mb-3 uppercase tracking-wide">
        Pemain
      </h3>
      <ul className="space-y-2">
        {players.map((player, index) => {
          const isCurrentPlayer = index === currentPlayerIndex;
          return (
            <li
              key={player.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                isCurrentPlayer
                  ? "bg-primary/20 border border-primary/40"
                  : "bg-base-300/50"
              }`}
            >
              <span
                className={`text-sm font-bold ${
                  isCurrentPlayer ? "text-primary" : "text-transparent"
                }`}
              >
                ▸
              </span>
              <span
                className={`text-sm font-medium ${
                  isCurrentPlayer
                    ? "text-primary font-bold"
                    : "text-base-content/70"
                }`}
              >
                {player.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
