/**
 * Game Session Store
 * Manages overall game session, phase tracking, and special cards (opening/closing)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card, GameThemeSlug } from "@/types";

// State shape
interface GameSessionState {
  // Session identity
  sessionId: string | null;
  theme: GameThemeSlug | null;
  createdAt: string | null;
  updatedAt: string | null;

  // Phase management
  phase: "opening" | "playing" | "closing";
  openingShown: boolean; // Track if opening card was shown

  // Special cards
  openingCard: Card | null;
  closingCard: Card | null;

  // Initialization flag
  isInitialized: boolean;
}

// Actions
interface GameSessionActions {
  // Session lifecycle
  initializeSession: (theme: GameThemeSlug, players: string[]) => void;
  clearSession: () => void;

  // Phase management
  setPhase: (phase: "opening" | "playing" | "closing") => void;
  startPlaying: () => void; // Convenience: setPhase + mark openingShown
  startClosing: () => void; // Convenience: setPhase("closing")

  // Opening/closing cards
  setOpeningCard: (card: Card | null) => void;
  setClosingCard: (card: Card | null) => void;
  markOpeningShown: () => void;

  // Utilities
  updateTimestamp: () => void;
}

// Getters
interface GameSessionGetters {
  getSessionId: () => string | null;
  getTheme: () => GameThemeSlug | null;
  getPhase: () => "opening" | "playing" | "closing";
  isInPlayingPhase: () => boolean;
  shouldShowOpening: () => boolean;
  shouldShowClosing: () => boolean;
}

// Combined store type
type GameSessionStore = GameSessionState &
  GameSessionActions &
  GameSessionGetters;

// Initial state
const initialState: GameSessionState = {
  sessionId: null,
  theme: null,
  createdAt: null,
  updatedAt: null,
  phase: "opening",
  openingShown: false,
  openingCard: null,
  closingCard: null,
  isInitialized: false,
};

export const useGameSessionStore = create<GameSessionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Session lifecycle actions
      initializeSession: (theme, _players) => {
        const now = new Date().toISOString();
        set({
          sessionId: `session-${Date.now()}`,
          theme,
          phase: "opening",
          openingShown: false,
          createdAt: now,
          updatedAt: now,
          isInitialized: true,
        });
      },

      clearSession: () => {
        set(initialState);
      },

      // Phase management
      setPhase: (phase) => {
        set({ phase, updatedAt: new Date().toISOString() });
      },

      startPlaying: () => {
        set({
          phase: "playing",
          openingShown: true,
          updatedAt: new Date().toISOString(),
        });
      },

      startClosing: () => {
        set({
          phase: "closing",
          updatedAt: new Date().toISOString(),
        });
      },

      // Opening/closing cards
      setOpeningCard: (card) => {
        set({ openingCard: card, updatedAt: new Date().toISOString() });
      },

      setClosingCard: (card) => {
        set({ closingCard: card, updatedAt: new Date().toISOString() });
      },

      markOpeningShown: () => {
        set({ openingShown: true, updatedAt: new Date().toISOString() });
      },

      // Utilities
      updateTimestamp: () => {
        set({ updatedAt: new Date().toISOString() });
      },

      // Getters
      getSessionId: () => get().sessionId,
      getTheme: () => get().theme,
      getPhase: () => get().phase,
      isInPlayingPhase: () => get().phase === "playing",
      shouldShowOpening: () => get().phase === "opening" && !get().openingShown,
      shouldShowClosing: () => get().phase === "closing",
    }),
    {
      name: "game-session-state", // localStorage key
      partialize: (state) => ({
        // Only persist relevant fields
        sessionId: state.sessionId,
        theme: state.theme,
        phase: state.phase,
        openingCard: state.openingCard,
        closingCard: state.closingCard,
        openingShown: state.openingShown,
        createdAt: state.createdAt,
        updatedAt: state.updatedAt,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
