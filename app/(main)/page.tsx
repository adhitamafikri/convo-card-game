"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { GameThemeSlug, Player } from "@/types";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { DemoGameCard } from "@/components/demo-game-card";
import { gameThemes } from "@/configs/contents";
import { useGameSessionStore } from "@/store/game-session-store";
import { usePlayerStore } from "@/store/player-store";
import { useCardStore } from "@/store/card-store";
import { useInitializeGame } from "@/hooks/use-initialize-game";
import { cleanupLegacyStorage } from "@/lib/cleanup-legacy-storage";

// Hook to detect existing session
function useExistingSession() {
  const sessionId = useGameSessionStore((s) => s.sessionId);
  const theme = useGameSessionStore((s) => s.theme);
  const phase = useGameSessionStore((s) => s.phase);
  const createdAt = useGameSessionStore((s) => s.createdAt);
  const updatedAt = useGameSessionStore((s) => s.updatedAt);
  const players = usePlayerStore((s) => s.players);
  const closedCardsCount = useCardStore((s) => s.closedCards.length);
  const stackCount = useCardStore((s) => s.cardsOnStack.length);
  const deckCount = useCardStore((s) => s.cardsOnDeck.length);

  const hasExistingSession =
    sessionId !== null && theme !== null && players.length > 0;

  return {
    hasExistingSession,
    session: hasExistingSession
      ? {
          sessionId,
          theme,
          phase,
          createdAt,
          updatedAt,
          players,
          stats: {
            closedCards: closedCardsCount,
            cardsOnStack: stackCount,
            cardsOnDeck: deckCount,
          },
        }
      : null,
  };
}

// Session Preview Modal Component
function SessionPreviewModal({
  session,
  onContinue,
  onStartNew,
  onClose,
}: {
  session: {
    sessionId: string;
    theme: GameThemeSlug;
    phase: "opening" | "playing" | "closing";
    createdAt: string | null;
    updatedAt: string | null;
    players: Player[];
    stats: { closedCards: number; cardsOnStack: number; cardsOnDeck: number };
  };
  onContinue: () => void;
  onStartNew: () => void;
  onClose: () => void;
}) {
  const themeData = gameThemes[session.theme];

  const formatTimestamp = (isoString: string | null) => {
    if (!isoString) return "—";
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoString));
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "opening":
        return "Pembukaan";
      case "playing":
        return "Sedang Bermain";
      case "closing":
        return "Penutupan";
      default:
        return phase;
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Lanjutkan Permainan?" showCloseButton={false}>
      <div className="space-y-6">
        {/* Theme Info */}
        <div className="bg-primary/10 p-4 rounded-lg">
          <h3 className="font-semibold text-primary mb-1">Tema Permainan</h3>
          <p className="text-lg">{themeData.name}</p>
          <p className="text-sm text-base-content/60">{themeData.description}</p>
        </div>

        {/* Players */}
        <div>
          <h3 className="font-semibold mb-2">
            Pemain ({session.players.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {session.players.map((player) => (
              <span
                key={player.id}
                className="px-3 py-1 bg-base-300 rounded-full text-sm"
              >
                {player.name}
              </span>
            ))}
          </div>
        </div>

        {/* Game Progress */}
        <div>
          <h3 className="font-semibold mb-2">Status Permainan</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-base-200 p-3 rounded">
              <p className="text-xs text-base-content/60">Fase</p>
              <p className="font-semibold">{getPhaseLabel(session.phase)}</p>
            </div>
            <div className="bg-base-200 p-3 rounded">
              <p className="text-xs text-base-content/60">Kartu Tersisa</p>
              <p className="font-semibold">{session.stats.cardsOnStack}</p>
            </div>
            <div className="bg-base-200 p-3 rounded">
              <p className="text-xs text-base-content/60">Kartu di Meja</p>
              <p className="font-semibold">{session.stats.cardsOnDeck}</p>
            </div>
            <div className="bg-base-200 p-3 rounded">
              <p className="text-xs text-base-content/60">Kartu Selesai</p>
              <p className="font-semibold">{session.stats.closedCards}</p>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="text-sm text-base-content/60">
          <p>Dibuat: {formatTimestamp(session.createdAt)}</p>
          <p>Terakhir dimainkan: {formatTimestamp(session.updatedAt)}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={onContinue}
          >
            Lanjutkan
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onStartNew}
          >
            Mulai Baru
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function Home() {
  const router = useRouter();
  const { hasExistingSession, session } = useExistingSession();
  const { clearSession } = useGameSessionStore();
  const { resetPlayers } = usePlayerStore();
  const { resetCards } = useCardStore();
  const { initGame } = useInitializeGame();

  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(["", ""]);
  const [selectedTheme, setSelectedTheme] = useState<GameThemeSlug>("family");
  const [showSessionPreview, setShowSessionPreview] = useState(false);
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  const [showThemeSelection, setShowThemeSelection] = useState(false);

  // Cleanup legacy storage and check for existing session on mount
  useEffect(() => {
    cleanupLegacyStorage();

    // Check for existing session only once on initial mount
    if (hasExistingSession) {
      setShowSessionPreview(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty - run only once on mount

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

  const handleContinueSession = () => {
    if (!session) return;
    router.push(`/game/${session.sessionId}/room`);
  };

  const handleStartNewGame = () => {
    // Clear all stores
    clearSession();
    resetPlayers();
    resetCards();

    // Close preview, show theme selection
    setShowSessionPreview(false);
    setShowThemeSelection(true);
  };

  const handleMainButtonClick = () => {
    if (hasExistingSession) {
      setShowSessionPreview(true);
    } else {
      setShowThemeSelection(true);
    }
  };

  const handleStartGame = () => {
    const sessionData = {
      theme: selectedTheme,
      players: playerNames.filter((n) => n.trim()),
    };

    // Initialize all stores (this generates sessionId)
    initGame(sessionData);

    // Get the generated sessionId
    const sessionId = useGameSessionStore.getState().sessionId;

    // Navigate to dynamic route
    router.push(`/game/${sessionId}/room`);
  };

  const isValidPlayerNames = playerNames.filter((n) => n.trim()).length >= 2;

  return (
    <div className="min-h-full flex flex-col">
      {/* Session Preview Modal */}
      {showSessionPreview && session && (
        <SessionPreviewModal
          session={session}
          onContinue={handleContinueSession}
          onStartNew={handleStartNewGame}
          onClose={() => setShowSessionPreview(false)}
        />
      )}

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
                  onClick={handleMainButtonClick}
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
