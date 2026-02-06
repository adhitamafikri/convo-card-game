import { ReactNode } from "react";

interface GameDeckProps {
  children: ReactNode;
  title?: string;
}

export function GameDeck({ children, title = "Pick a Card" }: GameDeckProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
      <h3 className="text-lg font-semibold text-secondary">
        {title}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-6 p-6 bg-base-200/60 backdrop-blur-sm rounded-xl border-2 border-primary/20 shadow-warm min-h-[200px] w-full">
        {children}
      </div>
    </div>
  );
}
