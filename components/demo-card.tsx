"use client";

import { useState } from "react";

export function DemoCard() {
  const [isRevealed, setIsRevealed] = useState(false);

  const sampleQuestion = "Siapa nih yang pernah ghosting grup gara-gara takut ditagih tagihan?";

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <div
        className={`card w-72 h-96 transition-all duration-300 cursor-pointer ${
          isRevealed
            ? "bg-base-200 border-4 border-secondary shadow-2xl"
            : "bg-base-200 border-4 border-base-content/10 hover:border-secondary/50 card-hover shadow-xl"
        }`}
        onClick={() => setIsRevealed(!isRevealed)}
      >
        <div className="card-body items-center justify-center p-6 text-center">
          {isRevealed ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg font-medium text-base-content leading-relaxed">
                  {sampleQuestion}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-content"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-primary">
                Tap to reveal
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
