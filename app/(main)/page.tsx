"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GameThemeSlug } from "@/types";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { DemoGameCard } from "@/components/demo-game-card";
import { gameThemes } from "@/configs/contents";

export default function Home() {
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(["", ""]);
  const [selectedTheme, setSelectedTheme] = useState<GameThemeSlug>("family");
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  const [showThemeSelection, setShowThemeSelection] = useState(false);

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
    const sessionData = {
      theme: selectedTheme,
      players: playerNames.filter((n) => n.trim()),
      timestamp: Date.now(),
    };
    localStorage.setItem("gameSession", JSON.stringify(sessionData));
    router.push("/game-room");
  };

  const isValidPlayerNames = playerNames.filter((n) => n.trim()).length >= 2;

  return (
    <div className="min-h-full flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-12 min-h-[calc(100vh-68px-80px)]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Tagline and Description */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-base-content leading-[1.1] tracking-tight">
                  Buat obrolan jadi lebih bermakna
                </h1>
              </div>

              <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Kartu percakapan untuk keluarga, teman, dan pasangan yang mau
                lebih dekat
              </p>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-primary hover:opacity-90 text-white border-none shadow-lg hover:shadow-xl transition-all font-bold text-lg px-8 py-4"
                  onClick={() => setShowThemeSelection(true)}
                >
                  MAIN SEKARANG
                </Button>
              </div>
            </div>

            {/* Right: Interactive Demo Card */}
            <div className="flex justify-center lg:justify-end">
              <DemoGameCard content="Siapa nih yang pernah ghosting grup gara-gara takut ditagih tagihan?" />
            </div>
          </div>
        </div>
      </section>

      {/* Player Input Modal */}
      <Modal
        isOpen={showPlayerInput}
        onClose={() => setShowPlayerInput(false)}
        title="Masukkan Pemain"
        showCloseButton={false}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-base-content">
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
              <span className="text-2xl font-bold text-primary w-12 text-center">
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
            <h4 className="font-medium text-base-content">Nama Pemain</h4>
            {playerNames.map((name, index) => (
              <Input
                key={index}
                placeholder={`Pemain ${index + 1}`}
                value={name}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                className={
                  !name.trim() && isValidPlayerNames ? "border-warning/50" : ""
                }
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
              disabled={!isValidPlayerNames}
            >
              Mulai
            </Button>
          </div>
        </div>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        isOpen={showThemeSelection}
        onClose={() => setShowThemeSelection(false)}
        title="Pilih Tema Permainan"
        showCloseButton={false}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(gameThemes).map(([key, theme]) => (
              <label
                key={key}
                className={`flex flex-col gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all shadow-warm ${
                  selectedTheme === key
                    ? "border-primary bg-base-200 shadow-warm-lg"
                    : "border-primary/30 hover:border-primary bg-base-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="theme"
                    className="radio radio-primary radio-sm mt-1"
                    checked={selectedTheme === key}
                    onChange={() => setSelectedTheme(key as GameThemeSlug)}
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-secondary mb-2">
                      {theme.name}
                    </h4>
                    <p className="text-sm text-base-content/70 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-center gap-3 pt-2">
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
      </Modal>
    </div>
  );
}
