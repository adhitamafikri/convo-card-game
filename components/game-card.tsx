import { ReactNode, HTMLAttributes, forwardRef } from "react";

interface GameCardProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onSelect?: () => void;
  cardId: string;
  children?: ReactNode;
}

export const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ isOpen, onSelect, cardId: _cardId, children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card w-64 h-80 transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 border-2 border-orange-400 dark:border-orange-500"
            : "bg-white dark:bg-base-300 border border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-500 cursor-pointer hover:shadow-lg hover:shadow-orange-200/50 dark:hover:shadow-orange-900/20"
        } ${className}`}
        onClick={onSelect}
        {...props}
      >
        <div className="card-body items-center justify-center p-6 text-center">
          {isOpen ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg font-medium text-base-content dark:text-base-content-dark leading-relaxed">
                  {children}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-orange-500 dark:text-orange-400">
                Tap to reveal
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

GameCard.displayName = "GameCard";
