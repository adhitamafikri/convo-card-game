import { ReactNode } from "react";

interface CardStackProps {
  children?: ReactNode;
  remainingCount: number;
  onDrawCard?: () => void;
}

export function CardStack({ children, remainingCount, onDrawCard }: CardStackProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative cursor-pointer group"
        onClick={onDrawCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onDrawCard?.();
          }
        }}
      >
        <div className="w-24 h-36 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 border-2 border-orange-300 dark:border-orange-600 shadow-lg transform transition-transform group-hover:scale-105 group-active:scale-95 flex flex-col items-center justify-between p-3">
          <div className="w-full text-center">
            <span className="text-xs font-bold text-white/90">OBROLAN</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{remainingCount}</span>
          </div>
          <div className="w-full text-center">
            <span className="text-[10px] text-white/80">cards left</span>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-base-300 dark:bg-base-100 border-2 border-orange-400 dark:border-orange-500 flex items-center justify-center shadow-md">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
            {remainingCount}
          </span>
        </div>
      </div>
      <span className="text-sm text-base-content/60 dark:text-base-content/50">
        Card Stack
      </span>
    </div>
  );
}
