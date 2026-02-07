/**
 * Card Store
 * Manages all card state (stack, deck, closed) and card operations
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card } from "@/types";
import { shuffleArray } from "@/lib/game-helpers";

// State shape
interface CardState {
  cardsOnStack: Card[]; // Not yet drawn (remaining deck)
  cardsOnDeck: Card[]; // Currently on table (drawable)
  closedCards: Card[]; // Already played
  selectedCard: Card | null;
}

// Actions
interface CardActions {
  // Initialization
  initializeCards: (allCards: Card[]) => void; // Receives 28 convo cards (shuffled)
  resetCards: () => void;

  // Card drawing
  drawCardsToTable: (count: number) => void; // Move N cards from stack to deck

  // Selection
  selectCard: (card: Card) => void;
  deselectCard: () => void;

  // Turn completion
  moveSelectedCardToClosed: () => void; // Moves selectedCard to closedCards, clears selection

  // Utilities
  shuffleCards: (cards: Card[]) => Card[]; // Fisher-Yates shuffle
}

// Getters
interface CardGetters {
  getCardsOnStack: () => Card[];
  getCardsOnDeck: () => Card[];
  getClosedCards: () => Card[];
  getSelectedCard: () => Card | null;

  // Counts
  getStackCount: () => number;
  getDeckCount: () => number;
  getClosedCount: () => number;

  // Checks
  hasSelectedCard: () => boolean;
  isStackEmpty: () => boolean;
  isDeckEmpty: () => boolean;
  canDrawCards: (count: number) => boolean; // Check if stack has enough cards
}

// Combined store type
type CardStore = CardState & CardActions & CardGetters;

// Initial state
const initialState: CardState = {
  cardsOnStack: [],
  cardsOnDeck: [],
  closedCards: [],
  selectedCard: null,
};

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Initialization
      initializeCards: (allCards) => {
        const shuffled = shuffleArray(allCards);
        set({
          cardsOnStack: shuffled,
          cardsOnDeck: [],
          closedCards: [],
          selectedCard: null,
        });
      },

      resetCards: () => {
        set(initialState);
      },

      // Card drawing
      drawCardsToTable: (count) => {
        set((state) => {
          const cardsToDraw = state.cardsOnStack.slice(0, count);
          const remainingStack = state.cardsOnStack.slice(count);

          return {
            cardsOnStack: remainingStack,
            cardsOnDeck: [...state.cardsOnDeck, ...cardsToDraw],
          };
        });
      },

      // Selection
      selectCard: (card) => {
        // Only allow selection if no card is currently selected
        if (get().selectedCard === null) {
          set({ selectedCard: card });
        }
      },

      deselectCard: () => {
        set({ selectedCard: null });
      },

      // Turn completion
      moveSelectedCardToClosed: () => {
        set((state) => {
          if (!state.selectedCard) return state;

          return {
            closedCards: [...state.closedCards, state.selectedCard],
            cardsOnDeck: state.cardsOnDeck.filter(
              (c) => c.id !== state.selectedCard?.id
            ),
            selectedCard: null,
          };
        });
      },

      // Utilities
      shuffleCards: (cards) => shuffleArray(cards),

      // Getters
      getCardsOnStack: () => get().cardsOnStack,
      getCardsOnDeck: () => get().cardsOnDeck,
      getClosedCards: () => get().closedCards,
      getSelectedCard: () => get().selectedCard,

      // Counts
      getStackCount: () => get().cardsOnStack.length,
      getDeckCount: () => get().cardsOnDeck.length,
      getClosedCount: () => get().closedCards.length,

      // Checks
      hasSelectedCard: () => get().selectedCard !== null,
      isStackEmpty: () => get().cardsOnStack.length === 0,
      isDeckEmpty: () => get().cardsOnDeck.length === 0,
      canDrawCards: (count) => get().cardsOnStack.length >= count,
    }),
    {
      name: "card-state", // localStorage key
      partialize: (state) => ({
        // Persist all card state
        cardsOnStack: state.cardsOnStack,
        cardsOnDeck: state.cardsOnDeck,
        closedCards: state.closedCards,
        selectedCard: state.selectedCard,
      }),
    }
  )
);
