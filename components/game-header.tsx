import { Button } from "./button";

interface GameHeaderProps {
  onExit: () => void;
  roomName?: string;
}

export function GameHeader({ onExit, roomName = "SambungRasa" }: GameHeaderProps) {
  return (
    <header className="w-full bg-base-200 border-b-2 border-primary/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-primary-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            {roomName}
          </h1>
        </div>

        <Button variant="ghost" size="md" onClick={onExit}>
          Keluar
        </Button>
      </div>
    </header>
  );
}
