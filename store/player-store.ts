/**
 * Player Store
 * Manages player list and turn rotation
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "@/types";

// State shape
interface PlayerState {
  players: Player[];
  currentPlayerIndex: number;
}

// Actions
interface PlayerActions {
  // Player management
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;

  // Turn management
  advanceToNextPlayer: () => void;
  setCurrentPlayerIndex: (index: number) => void;

  // Reset
  resetPlayers: () => void;
}

// Getters
interface PlayerGetters {
  getCurrentPlayer: () => Player | null;
  getPlayerCount: () => number;
  getPlayers: () => Player[];
  getCurrentPlayerIndex: () => number;
  isPlayerTurn: (playerId: string) => boolean;
}

// Combined store type
type PlayerStore = PlayerState & PlayerActions & PlayerGetters;

// Initial state
const initialState: PlayerState = {
  players: [],
  currentPlayerIndex: 0,
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Player management
      setPlayers: (players) => {
        set({ players, currentPlayerIndex: 0 });
      },

      addPlayer: (player) => {
        set((state) => ({
          players: [...state.players, player],
        }));
      },

      removePlayer: (playerId) => {
        set((state) => ({
          players: state.players.filter((p) => p.id !== playerId),
        }));
      },

      // Turn management
      advanceToNextPlayer: () => {
        set((state) => ({
          currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
        }));
      },

      setCurrentPlayerIndex: (index) => {
        set({ currentPlayerIndex: index });
      },

      // Reset
      resetPlayers: () => {
        set(initialState);
      },

      // Getters
      getCurrentPlayer: () => {
        const state = get();
        return state.players[state.currentPlayerIndex] || null;
      },

      getPlayerCount: () => get().players.length,

      getPlayers: () => get().players,

      getCurrentPlayerIndex: () => get().currentPlayerIndex,

      isPlayerTurn: (playerId) => {
        const state = get();
        const currentPlayer = state.players[state.currentPlayerIndex];
        return currentPlayer?.id === playerId;
      },
    }),
    {
      name: "player-state", // localStorage key
      partialize: (state) => ({
        // Persist all state
        players: state.players,
        currentPlayerIndex: state.currentPlayerIndex,
      }),
    }
  )
);
