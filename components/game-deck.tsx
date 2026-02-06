import { ReactNode } from "react";

interface GameDeckProps {
  children: ReactNode;
  title?: string;
}

export function GameDeck({ children, title = "Pick a Card" }: GameDeckProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
      <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
        {title}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-6 p-6 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-800/30 min-h-[200px] w-full">
        {children}
      </div>
    </div>
  );
}
