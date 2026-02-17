import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { COLORS, RARITY_COLORS } from "../constants/GameConfig";
import { Card as CardType } from "../types/game";

interface CardProps {
  card: CardType | null;
  showAttributes?: boolean;
  size?: "small" | "normal" | "large";
  style?: ViewStyle;
}

export default function Card({
  card,
  showAttributes = true,
  size = "normal",
  style,
}: CardProps) {
  if (!card) {
    return (
      <View style={[styles.container, sizeStyles[size], style]}>
        <Text style={styles.emptyText}>No Card</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, sizeStyles[size], style]}>
      {/* Card Image Placeholder */}
      <View style={[styles.imagePlaceholder, imageSizeStyles[size]]}>
        <Text style={[styles.imageEmoji, emojiSizeStyles[size]]}>🎴</Text>
      </View>

      {/* Card Name */}
      <Text style={[styles.cardName, nameSizeStyles[size]]} numberOfLines={1}>
        {card.name}
      </Text>

      {/* Card Attributes */}
      {showAttributes && size !== "small" && (
        <View style={styles.attributesContainer}>
          {Object.entries(card.attributes).map(([key, value]) => (
            <View key={key} style={styles.attributeRow}>
              <Text style={styles.attributeName}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>
              <Text style={styles.attributeValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Rarity Badge */}
      <View
        style={[
          styles.rarityBadge,
          { backgroundColor: RARITY_COLORS[card.rarity] },
        ]}
      >
        <Text style={styles.rarityText}>{card.rarity.toUpperCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 15,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: "center",
  },
  imagePlaceholder: {
    backgroundColor: "#1a1a2e",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imageEmoji: {
    fontSize: 60,
  },
  cardName: {
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
    textAlign: "center",
  },
  attributesContainer: {
    width: "100%",
    marginTop: 5,
  },
  attributeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  attributeName: {
    color: "#aaa",
    fontSize: 12,
  },
  attributeValue: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  rarityBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  rarityText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
  },
});

// Size-specific styles
const sizeStyles = StyleSheet.create({
  small: {
    width: 120,
    padding: 8,
  },
  normal: {
    width: 200,
    padding: 15,
  },
  large: {
    width: 250,
    padding: 20,
  },
});

const imageSizeStyles = StyleSheet.create({
  small: {
    width: 80,
    height: 80,
  },
  normal: {
    width: 150,
    height: 150,
  },
  large: {
    width: 200,
    height: 200,
  },
});

const emojiSizeStyles = StyleSheet.create({
  small: {
    fontSize: 40,
  },
  normal: {
    fontSize: 60,
  },
  large: {
    fontSize: 80,
  },
});

const nameSizeStyles = StyleSheet.create({
  small: {
    fontSize: 12,
  },
  normal: {
    fontSize: 18,
  },
  large: {
    fontSize: 22,
  },
});
