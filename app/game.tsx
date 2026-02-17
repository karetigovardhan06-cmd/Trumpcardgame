import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../components/card";
import { COLORS } from "../constants/GameConfig";
import { useAllCardSets } from "../hooks/useCardData";
import { useGameState } from "../hooks/useGameState";
import { Card as CardType } from "../types/game";
import {
    compareCards,
    getRandomAttribute,
    getRandomCard,
} from "../utils/GameLogic";

export default function GameScreen() {
  const router = useRouter();
  const { addWin, addLoss, unlockedSets } = useGameState();
  const cardSets = useAllCardSets(unlockedSets);

  const [playerCard, setPlayerCard] = useState<CardType | null>(null);
  const [opponentCard, setOpponentCard] = useState<CardType | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(
    null,
  );
  const [gameState, setGameState] = useState<"ready" | "playing" | "result">(
    "ready",
  );
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    // Get all cards from unlocked sets
    const allCards = cardSets.flatMap((set) => set.cards);

    if (allCards.length === 0) {
      Alert.alert("No Cards", "No cards available to play");
      return;
    }

    // Pick random cards
    const pCard = getRandomCard(allCards);
    const oCard = getRandomCard(allCards);

    setPlayerCard(pCard);
    setOpponentCard(oCard);
    setSelectedAttribute(null);
    setGameState("ready");
    setResult("");
  };

  const handleFlip = () => {
    if (!playerCard || !opponentCard) return;

    // Select random attribute
    const attribute = getRandomAttribute(playerCard);
    setSelectedAttribute(attribute);

    // Compare cards
    const comparison = compareCards(playerCard, opponentCard, attribute);

    setGameState("result");

    if (comparison.winner === "player") {
      setResult("You Win! 🎉");
      addWin();
    } else if (comparison.winner === "opponent") {
      setResult("You Lose 😔");
      addLoss();
    } else {
      setResult("It's a Draw! 🤝");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trump Card Battle</Text>
      </View>

      {result && (
        <View style={styles.resultBanner}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      <View style={styles.gameArea}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardLabel}>Your Card</Text>
          <Card card={playerCard} showAttributes={gameState === "result"} />
        </View>

        <Text style={styles.vsText}>VS</Text>

        <View style={styles.cardContainer}>
          <Text style={styles.cardLabel}>Opponent</Text>
          <Card card={opponentCard} showAttributes={gameState === "result"} />
        </View>
      </View>

      {selectedAttribute && (
        <Text style={styles.attributeText}>
          Comparing: {selectedAttribute.toUpperCase()}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        {gameState === "ready" && (
          <TouchableOpacity style={styles.flipButton} onPress={handleFlip}>
            <Text style={styles.flipButtonText}>Flip Card</Text>
          </TouchableOpacity>
        )}

        {gameState === "result" && (
          <TouchableOpacity style={styles.nextButton} onPress={startNewRound}>
            <Text style={styles.nextButtonText}>Next Round</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
  },
  resultBanner: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  gameArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  cardLabel: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 10,
  },
  vsText: {
    color: COLORS.primary,
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 20,
  },
  attributeText: {
    color: COLORS.primary,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  flipButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
  },
  flipButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: COLORS.success,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
  },
  nextButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  backButtonText: {
    color: COLORS.text,
    fontSize: 16,
  },
});
