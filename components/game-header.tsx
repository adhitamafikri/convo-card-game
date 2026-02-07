import { Button } from "./button";
import { Logo } from "./logo";

interface GameHeaderProps {
  onExit: () => void;
}

export function GameHeader({ onExit }: GameHeaderProps) {
  return (
    <header className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Logo size="md" />

        <Button variant="ghost" size="md" onClick={onExit}>
          Keluar
        </Button>
      </div>
    </header>
  );
}
