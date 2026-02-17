import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { GAME_CONFIG } from "../constants/GameConfig";
import { CardSetId, GameState } from "../types/game";

interface GameStore extends GameState {
  // Actions
  addWin: () => void;
  addLoss: () => void;
  checkUnlocks: (currentPoints: number) => CardSetId | null;
  saveGameData: () => Promise<void>;
  loadGameData: () => Promise<void>;
  resetGame: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  points: 0,
  streak: 0,
  unlockedSets: [...GAME_CONFIG.INITIAL_UNLOCKED_SETS] as CardSetId[], // ✅ Fixed type
  totalWins: 0,
  totalLosses: 0,

  // Actions
  addWin: () => {
    const currentStreak = get().streak;
    const newPoints = get().points + GAME_CONFIG.POINTS_PER_WIN;
    const newStreak = currentStreak + 1;

    set({
      points: newPoints,
      streak: newStreak,
      totalWins: get().totalWins + 1,
    });

    // Check for unlocks
    get().checkUnlocks(newPoints);

    // Save to storage
    get().saveGameData();
  },

  addLoss: () => {
    const currentStreak = get().streak;
    const penaltyPoints =
      currentStreak > 0 ? GAME_CONFIG.POINTS_LOST_ON_STREAK_BREAK : 0;
    const newPoints = Math.max(0, get().points - penaltyPoints);

    set({
      points: newPoints,
      streak: 0, // Reset streak on loss
      totalLosses: get().totalLosses + 1,
    });

    // Save to storage
    get().saveGameData();
  },

  checkUnlocks: (currentPoints: number): CardSetId | null => {
    const unlockedSets = [...get().unlockedSets];
    let newUnlock: CardSetId | null = null;

    // Check Pokemon unlock
    if (
      currentPoints >= GAME_CONFIG.UNLOCK_THRESHOLDS.POKEMON &&
      !unlockedSets.includes("pokemon")
    ) {
      unlockedSets.push("pokemon");
      newUnlock = "pokemon";
    }

    // Check Doraemon unlock
    if (
      currentPoints >= GAME_CONFIG.UNLOCK_THRESHOLDS.DORAEMON &&
      !unlockedSets.includes("doraemon")
    ) {
      unlockedSets.push("doraemon");
      newUnlock = "doraemon";
    }

    // Check WWF unlock
    if (
      currentPoints >= GAME_CONFIG.UNLOCK_THRESHOLDS.WWF &&
      !unlockedSets.includes("wwf")
    ) {
      unlockedSets.push("wwf");
      newUnlock = "wwf";
    }

    if (newUnlock) {
      set({ unlockedSets: unlockedSets as CardSetId[] }); // ✅ Fixed type
      return newUnlock;
    }

    return null;
  },

  // Persistence
  saveGameData: async () => {
    try {
      const gameData: GameState = {
        points: get().points,
        streak: get().streak,
        unlockedSets: get().unlockedSets,
        totalWins: get().totalWins,
        totalLosses: get().totalLosses,
      };

      await AsyncStorage.setItem("gameData", JSON.stringify(gameData));
    } catch (error) {
      console.error("Error saving game data:", error);
    }
  },

  loadGameData: async () => {
    try {
      const savedData = await AsyncStorage.getItem("gameData");

      if (savedData) {
        const gameData: GameState = JSON.parse(savedData);
        set(gameData);
      }
    } catch (error) {
      console.error("Error loading game data:", error);
    }
  },

  resetGame: async () => {
    set({
      points: 0,
      streak: 0,
      unlockedSets: [...GAME_CONFIG.INITIAL_UNLOCKED_SETS] as CardSetId[], // ✅ Fixed type
      totalWins: 0,
      totalLosses: 0,
    });

    await AsyncStorage.removeItem("gameData");
  },
}));
