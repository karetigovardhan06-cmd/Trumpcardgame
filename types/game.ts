// Core game types and interfaces

export interface CardAttributes {
  [key: string]: number;
}

export interface Card {
  id: string;
  name: string;
  image: string;
  attributes: CardAttributes;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface CardSet {
  setName: string;
  setId: string;
  unlockAt?: number;
  cards: Card[];
}

export type CardSetId = "wwe" | "cricket" | "pokemon" | "doraemon" | "wwf";

export interface GameState {
  points: number;
  streak: number;
  unlockedSets: CardSetId[]; // ✅ Changed from string[] to CardSetId[]
  totalWins: number;
  totalLosses: number;
}

export interface ComparisonResult {
  winner: "player" | "opponent" | "draw";
  playerValue: number;
  opponentValue: number;
  difference: number;
}
