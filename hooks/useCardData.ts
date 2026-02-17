import { useEffect, useState } from "react";
import { CardSet, CardSetId } from "../types/game";

// Import card data
import wweCardsData from '../data/wwe-cards.json';
import cricketCardsData from '../data/cricket-cards.json';
// import pokemonCardsData from '../data/pokemon-cards.json';
import doraemonCardsData from "../data/doraemon-cards.json";
import wwfCardsData from "../data/wwf-cards.json";

export const useCardData = (setId: CardSetId): CardSet | null => {
  const [cardSet, setCardSet] = useState<CardSet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCardSet = () => {
      setLoading(true);

      try {
        let data: CardSet;

        switch (setId) {
            case "wwe":
              data = wweCardsData as CardSet;
              break;
            case "cricket":
              data = cricketCardsData as CardSet;
              break;
          //   case "pokemon":
          //     data = pokemonCardsData as CardSet;
          //     break;
          case "doraemon":
            data = doraemonCardsData as CardSet;
            break;
          case "wwf":
            data = wwfCardsData as CardSet;
            break;
          default:
            throw new Error(`Unknown card set: ${setId}`);
        }

        setCardSet(data);
      } catch (error) {
        console.error("Error loading card data:", error);
        setCardSet(null);
      } finally {
        setLoading(false);
      }
    };

    loadCardSet();
  }, [setId]);

  return cardSet;
};

export const useAllCardSets = (unlockedSets: CardSetId[]): CardSet[] => {
  const [cardSets, setCardSets] = useState<CardSet[]>([]);

  useEffect(() => {
    const loadAllSets = () => {
      const sets: CardSet[] = [];

      unlockedSets.forEach((setId) => {
        switch (setId) {
            case "wwe":
              sets.push(wweCardsData as CardSet);
              break;
            case "cricket":
              sets.push(cricketCardsData as CardSet);
              break;
          //   case "pokemon":
          //     sets.push(pokemonCardsData as CardSet);
          //     break;
          case "doraemon":
            sets.push(doraemonCardsData as CardSet);
            break;
          case "wwf":
            sets.push(wwfCardsData as CardSet);
            break;
        }
      });

      setCardSets(sets);
    };

    loadAllSets();
  }, [unlockedSets]);

  return cardSets;
};
