import { useEffect } from "react";
import { useGameStore } from "../store/GameStore";

/**
 * Hook to load game state on mount and provide game actions
 */
export const useGameState = () => {
  const store = useGameStore();

  // Load saved game data on mount
  useEffect(() => {
    store.loadGameData();
  }, []);

  return {
    // State
    points: store.points,
    streak: store.streak,
    unlockedSets: store.unlockedSets,
    totalWins: store.totalWins,
    totalLosses: store.totalLosses,

    // Actions
    addWin: store.addWin,
    addLoss: store.addLoss,
    resetGame: store.resetGame,
    loadGameData: store.loadGameData, // ✅ Added this

    // Computed
    winRate:
      store.totalWins + store.totalLosses > 0
        ? (
            (store.totalWins / (store.totalWins + store.totalLosses)) *
            100
          ).toFixed(1)
        : "0",
  };
};
