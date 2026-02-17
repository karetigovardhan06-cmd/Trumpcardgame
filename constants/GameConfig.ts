import { CardSetId } from "../types/game";

// Game configuration and constants
export const GAME_CONFIG = {
  // Points system
  POINTS_PER_WIN: 5,
  POINTS_LOST_ON_STREAK_BREAK: 2,

  // Unlock thresholds
  UNLOCK_THRESHOLDS: {
    POKEMON: 500,
    DORAEMON: 1000,
    WWF: 1500,
  },

  // Card sets
  CARD_SETS: {
    WWE: "wwe" as CardSetId,
    CRICKET: "cricket" as CardSetId,
    POKEMON: "pokemon" as CardSetId,
    DORAEMON: "doraemon" as CardSetId,
    WWF: "wwf" as CardSetId,
  },

  // Initial unlocked sets
  INITIAL_UNLOCKED_SETS: ["wwe", "cricket"] as CardSetId[],
} as const;

// Color scheme
export const COLORS = {
  primary: "#504d4d",
  secondary: "#6d94e8",
  background: "#010101",
  cardBackground: "#0f3460",
  text: "#ffffff",
  textSecondary: "#16213e",
  success: "#4caf50",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
} as const;

// Rarity colors
export const RARITY_COLORS = {
  legendary: "#ffd700",
  epic: "#9b59b6",
  rare: "#3498db",
  common: "#95a5a6",
} as const;
