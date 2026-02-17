import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, GAME_CONFIG } from "../../constants/GameConfig";
import { useGameState } from "../../hooks/useGameState";

export default function HomeScreen() {
  const router = useRouter();
  const { points, streak, loadGameData } = useGameState(); // ✅ Now has loadGameData

  useEffect(() => {
    loadGameData();
  }, []);

  const getNextUnlock = (): { name: string; pointsNeeded: number } | null => {
    if (points < GAME_CONFIG.UNLOCK_THRESHOLDS.POKEMON) {
      return {
        name: "Pokemon",
        pointsNeeded: GAME_CONFIG.UNLOCK_THRESHOLDS.POKEMON - points,
      };
    } else if (points < GAME_CONFIG.UNLOCK_THRESHOLDS.DORAEMON) {
      return {
        name: "Doraemon",
        pointsNeeded: GAME_CONFIG.UNLOCK_THRESHOLDS.DORAEMON - points,
      };
    } else if (points < GAME_CONFIG.UNLOCK_THRESHOLDS.WWF) {
      return {
        name: "WWF",
        pointsNeeded: GAME_CONFIG.UNLOCK_THRESHOLDS.WWF - points,
      };
    }
    return null;
  };

  const nextUnlock = getNextUnlock();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🃏 TRUMP CARDS </Text>
      <Text style={styles.subtitle}>Vintage Card Battle</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{points}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{streak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => router.push("/game")}
      >
        <Text style={styles.playButtonText}>▶ PLAY GAME </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.collectionButton}
        onPress={() => router.push("/collection")}
      >
        <Text style={styles.collectionButtonText}>📚 MY COLLECTION </Text>
      </TouchableOpacity>

      {nextUnlock && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Next Unlock: {nextUnlock.name} ({nextUnlock.pointsNeeded} points)
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 40,
    letterSpacing: 2,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 50,
  },
  statBox: {
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: "center",
    minWidth: 120,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 5,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
    width: "85%",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  collectionButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: "85%",
    alignItems: "center",
  },
  collectionButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 30,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
