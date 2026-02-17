import { Card, ComparisonResult } from "../types/game";

/**
 * Compare two cards based on a specific attribute
 */
export const compareCards = (
  playerCard: Card,
  opponentCard: Card,
  attribute: string,
): ComparisonResult => {
  const playerValue = playerCard.attributes[attribute];
  const opponentValue = opponentCard.attributes[attribute];

  if (playerValue > opponentValue) {
    return {
      winner: "player",
      playerValue,
      opponentValue,
      difference: playerValue - opponentValue,
    };
  } else if (playerValue < opponentValue) {
    return {
      winner: "opponent",
      playerValue,
      opponentValue,
      difference: opponentValue - playerValue,
    };
  } else {
    return {
      winner: "draw",
      playerValue,
      opponentValue,
      difference: 0,
    };
  }
};

/**
 * Get a random card from a deck
 */
export const getRandomCard = (cards: Card[]): Card => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
};

/**
 * Get available attributes for a card
 */
export const getCardAttributes = (card: Card): string[] => {
  return Object.keys(card.attributes);
};

/**
 * Select random attribute for comparison
 */
export const getRandomAttribute = (card: Card): string => {
  const attributes = getCardAttributes(card);
  const randomIndex = Math.floor(Math.random() * attributes.length);
  return attributes[randomIndex];
};

/**
 * Shuffle an array (Fisher-Yates algorithm)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
