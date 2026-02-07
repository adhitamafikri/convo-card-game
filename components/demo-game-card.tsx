"use client";

import { useState, HTMLAttributes, forwardRef } from "react";

interface DemoGameCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  content: string;
  cardNumber?: number;
  theme?: string;
}

export const DemoGameCard = forwardRef<HTMLDivElement, DemoGameCardProps>(
  ({ content, cardNumber = 12, theme = "Sahabat", className = "", ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        ref={ref}
        className={`card w-full md:w-[400px] lg:w-[440px] h-56 md:h-64 lg:h-72 transition-all duration-300 animate-float select-none ${
          isOpen
            ? "bg-gradient-to-br from-[#fdfcf9] to-[#f9f8f5] border-2 border-secondary shadow-warm-lg"
            : "bg-gradient-to-br from-primary to-secondary border-2 border-primary shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105 active:scale-95"
        } ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <div className="card-body items-center justify-center p-4 text-center relative">
          {isOpen ? (
            <>
              {/* Card Number - Top Left */}
              <div className="absolute top-4 left-4">
                <span className="text-base md:text-lg font-bold text-primary">#{cardNumber}</span>
              </div>

              {/* Content - Center */}
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="flex-1 flex items-center justify-center px-4">
                  <p className="font-content text-lg md:text-2xl font-medium text-base-content leading-relaxed">
                    {content}
                  </p>
                </div>

                {/* Logo + Theme - Bottom */}
                <div className="flex flex-col items-center gap-1.5 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5 text-primary-content"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base font-bold text-primary">SambungRasa</span>
                  </div>
                  <span className="text-xs text-base-content/60 font-medium uppercase tracking-wide">
                    {theme}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-base-100/20 backdrop-blur-sm flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 md:w-12 md:h-12 text-primary-content"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <p className="text-base md:text-lg font-medium text-primary-content">
                Tap to reveal
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

DemoGameCard.displayName = "DemoGameCard";
