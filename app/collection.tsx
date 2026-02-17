import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, GAME_CONFIG } from "../constants/GameConfig";
import { useGameState } from "../hooks/useGameState";

interface CardSetInfo {
  name: string;
  id: string;
  locked: boolean;
  unlockAt?: number;
  cards: number;
}

export default function CollectionScreen() {
  const router = useRouter();
  const { unlockedSets } = useGameState();

  const cardSets: CardSetInfo[] = [
    { name: "WWE", id: "wwe", locked: false, cards: 20 },
    { name: "Cricket", id: "cricket", locked: false, cards: 20 },
    {
      name: "Pokemon",
      id: "pokemon",
      locked: !unlockedSets.includes("pokemon"),
      unlockAt: GAME_CONFIG.UNLOCK_THRESHOLDS.POKEMON,
      cards: 15,
    },
    {
      name: "Doraemon",
      id: "doraemon",
      locked: !unlockedSets.includes("doraemon"),
      unlockAt: GAME_CONFIG.UNLOCK_THRESHOLDS.DORAEMON,
      cards: 12,
    },
    {
      name: "WWF",
      id: "wwf",
      locked: !unlockedSets.includes("wwf"),
      unlockAt: GAME_CONFIG.UNLOCK_THRESHOLDS.WWF,
      cards: 18,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Collection</Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {cardSets.map((set) => (
          <View
            key={set.id}
            style={[styles.setCard, set.locked && styles.setCardLocked]}
          >
            <View style={styles.setInfo}>
              <Text style={styles.setName}>
                {set.locked ? "🔒" : "✅"} {set.name}
              </Text>
              {!set.locked && (
                <Text style={styles.cardCount}>{set.cards} Cards</Text>
              )}
              {set.locked && set.unlockAt && (
                <Text style={styles.unlockText}>
                  Unlock at {set.unlockAt} points
                </Text>
              )}
            </View>

            {!set.locked && (
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  setCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setCardLocked: {
    backgroundColor: "#2a2a3e",
    opacity: 0.6,
  },
  setInfo: {
    flex: 1,
  },
  setName: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardCount: {
    color: COLORS.primary,
    fontSize: 14,
  },
  unlockText: {
    color: "#888",
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewButtonText: {
    color: COLORS.text,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: COLORS.text,
    fontSize: 16,
  },
});
