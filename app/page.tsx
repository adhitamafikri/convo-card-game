"use client";

import { useState, useEffect } from "react";
import type { GameThemeSlug } from "@/types";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { gameThemes } from "@/configs/contents";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(["", ""]);
  const [selectedTheme, setSelectedTheme] = useState<GameThemeSlug>("family");
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  const [showThemeSelection, setShowThemeSelection] = useState(false);

  useEffect(() => {
    const splashHidden = sessionStorage.getItem("splash-hidden");
    if (splashHidden) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStartSplash = () => {
    sessionStorage.setItem("splash-hidden", "true");
    setShowSplash(false);
  };

  const handlePlayerCountChange = (count: number) => {
    const clampedCount = Math.max(2, Math.min(4, count));
    setPlayerCount(clampedCount);
    setPlayerNames((prev) => {
      const newNames = [...prev];
      if (clampedCount > newNames.length) {
        for (let i = newNames.length; i < clampedCount; i++) {
          newNames.push("");
        }
      } else {
        newNames.length = clampedCount;
      }
      return newNames;
    });
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    console.log("Starting game with:", {
      theme: selectedTheme,
      players: playerNames.filter((n) => n.trim()),
    });
  };

  if (showSplash) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-primary-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary">
            Obrolan Card Game
          </h1>
          <p className="text-base-content/60 max-w-md mx-auto">
            A conversation card game to make your gathering more engaging,
            fun, and enjoyable
          </p>
          <div className="pt-4">
            <Button onClick={handleStartSplash} variant="primary" size="lg">
              Mulai Bermain
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            Obrolan Card Game
          </h1>
          <p className="text-base-content/60">
            Mari mulai permainan
          </p>
        </div>

        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body items-center text-center space-y-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full max-w-xs"
              onClick={() => setShowThemeSelection(true)}
            >
              Main Sekarang
            </Button>

            <Button variant="outline" className="w-full max-w-xs">
              Cara Bermain
            </Button>
          </div>
        </div>
      </div>

      {showPlayerInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-200 rounded-xl shadow-xl max-w-md w-full p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-base-content">
                Berapa pemain yang akan bergabung?
              </h3>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePlayerCountChange(playerCount - 1)}
                  disabled={playerCount <= 2}
                >
                  -
                </Button>
                <span className="text-2xl font-bold text-primary w-12">
                  {playerCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePlayerCountChange(playerCount + 1)}
                  disabled={playerCount >= 4}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-base-content">
                Nama-nama Pemain
              </h4>
              {playerNames.map((name, index) => (
                <Input
                  key={index}
                  placeholder={`Pemain ${index + 1}`}
                  value={name}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                />
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPlayerInput(false);
                  setShowThemeSelection(true);
                }}
              >
                Kembali
              </Button>
              <Button
                variant="primary"
                onClick={handleStartGame}
              >
                Mulai Permainan
              </Button>
            </div>
          </div>
        </div>
      )}

      {showThemeSelection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-200 rounded-xl shadow-xl max-w-md w-full p-6 space-y-6">
            <h3 className="font-semibold text-lg text-base-content">
              Pilih Tema Permainan
            </h3>

            <div className="space-y-3">
              {Object.entries(gameThemes).map(([key, theme]) => (
                <label
                  key={key}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTheme === key
                      ? "border-primary bg-base-200"
                      : "border-base-300 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="theme"
                    className="radio radio-primary radio-sm"
                    checked={selectedTheme === key}
                    onChange={() => setSelectedTheme(key as GameThemeSlug)}
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-base-content">
                      {theme.name}
                    </h4>
                    <p className="text-sm text-base-content/60">
                      {theme.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowThemeSelection(false)}
              >
                Kembali
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowThemeSelection(false);
                  setShowPlayerInput(true);
                }}
              >
                Lanjut
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
