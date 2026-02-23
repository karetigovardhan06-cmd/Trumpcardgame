import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";


const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressOpacity = useRef(new Animated.Value(0)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence: cards fade in → title slides up → progress bar animates → finish
    Animated.sequence([
      // Step 1: Cards fade in
      Animated.timing(cardsOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Step 2: Title slides up
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Step 3: Subtitle & progress appear
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(progressOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // Step 4: Progress bar fills
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Small pause then navigate
      setTimeout(onFinish, 300);
    });
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const progressPercent = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.container}>
      {/* Top label */}
      <View style={styles.topLabel}>
        <Text style={styles.topLabelIcon}>♛</Text>
        <Text style={styles.topLabelText}>THE ROYAL COLLECTION</Text>
      </View>

      {/* Card stack — replace with your actual image asset */}
      <Animated.View style={[styles.cardStack, { opacity: cardsOpacity }]}>
        {/* Back card LEFT (K) */}
        <View style={[styles.card, styles.cardLeft]}>
          <Text style={styles.cardCornerText}>K</Text>
        </View>

        {/* Back card RIGHT (Q) */}
        <View style={[styles.card, styles.cardRight]}>
          <Text style={styles.cardCornerText}>Q</Text>
        </View>

        {/* Front card (A) — swap this Image for your asset */}
        <View style={[styles.card, styles.cardFront]}>
          <Text style={styles.cardCornerTextFront}>A</Text>
          <View style={styles.cardCenter}>
            <Image
              source={require("../assets/images/splash-card.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            {/* ← Image is self-closed, Text is a sibling below, not inside */}
            {/* Delete this line if you don't want the crown showing over the image */}
            {/* <Text style={styles.cardCrownPlaceholder}>♛</Text> */}
          </View>
        </View>
      </Animated.View>

      {/* Title */}
      <Animated.View
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslate }],
        }}
      >
        <Text style={styles.titleLine1}>TRUMP</Text>
        <Text style={styles.titleLine2}>LEGENDS</Text>
      </Animated.View>

      {/* Subtitle */}
      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
        HIGH STAKES • HIGH GLOSS
      </Animated.Text>

      {/* Progress section */}
      <Animated.View
        style={[styles.progressSection, { opacity: progressOpacity }]}
      >
        <Text style={styles.systemLabel}>SYSTEM STATUS</Text>

        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Shuffling the Deck...</Text>
          <AnimatedProgressText animValue={progressAnim} />
        </View>

        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        <Text style={styles.progressSubLabel}>
          Loading high-fidelity assets & vintage textures
        </Text>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerLeft}>v2.4.0-GOLD</Text>
        <Text style={styles.footerRight}>VARIANT 1 OF 10</Text>
      </View>
    </View>
  );
}

// Small helper to animate the percentage number
function AnimatedProgressText({ animValue }: { animValue: Animated.Value }) {
  const [percent, setPercent] = React.useState(0);

  useEffect(() => {
    const listener = animValue.addListener(({ value }) => {
      setPercent(Math.round(value * 100));
    });
    return () => animValue.removeListener(listener);
  }, [animValue]);

  return <Text style={styles.progressPercent}>{percent}%</Text>;
}

const GOLD = "#D4A017";
const GOLD_LIGHT = "#F0C040";
const BG = "#0A0A0A";
const CARD_BG = "#111111";
const CARD_BORDER = "#2A2A2A";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  // ── Top label ──────────────────────────────────────────────────
  topLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
  },
  topLabelIcon: {
    fontSize: 16,
    color: GOLD,
  },
  topLabelText: {
    fontSize: 11,
    color: GOLD,
    letterSpacing: 4,
    fontWeight: "600",
  },

  // ── Card Stack ─────────────────────────────────────────────────
  cardStack: {
    width: 200,
    height: 250,
    position: "relative",
    marginBottom: 36,
  },
  card: {
    position: "absolute",
    width: 150,
    height: 210,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: GOLD,
  },
  cardLeft: {
    left: -10,
    top: 20,
    transform: [{ rotate: "-12deg" }],
    zIndex: 1,
    opacity: 0.7,
    borderColor: "#333",
  },
  cardRight: {
    right: -10,
    top: 20,
    transform: [{ rotate: "12deg" }],
    zIndex: 1,
    opacity: 0.7,
    borderColor: "#333",
  },
  cardFront: {
    left: 25,
    top: 0,
    zIndex: 3,
    borderColor: GOLD,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },
  cardCornerText: {
    position: "absolute",
    top: 10,
    left: 12,
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  cardCornerTextFront: {
    position: "absolute",
    top: 10,
    left: 12,
    fontSize: 16,
    color: GOLD,
    fontWeight: "bold",
  },
  cardCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCrownPlaceholder: {
    fontSize: 64,
    color: GOLD,
  },
  cardImage: {
    width: 120,
    height: 150,
  },

  // ── Title ─────────────────────────────────────────────────────
  titleLine1: {
    fontSize: 52,
    fontWeight: "900",
    color: GOLD_LIGHT,
    textAlign: "center",
    letterSpacing: 6,
    lineHeight: 56,
  },
  titleLine2: {
    fontSize: 52,
    fontWeight: "900",
    color: GOLD,
    textAlign: "center",
    letterSpacing: 6,
    lineHeight: 56,
    marginBottom: 10,
  },

  // ── Subtitle ──────────────────────────────────────────────────
  subtitle: {
    fontSize: 11,
    color: GOLD,
    letterSpacing: 3,
    marginTop: 6,
    marginBottom: 32,
    textAlign: "center",
  },

  // ── Progress ──────────────────────────────────────────────────
  progressSection: {
    width: "100%",
    marginBottom: 16,
  },
  systemLabel: {
    fontSize: 9,
    color: "#555",
    letterSpacing: 2,
    marginBottom: 6,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: "#CCCCCC",
    fontWeight: "500",
  },
  progressPercent: {
    fontSize: 14,
    color: "#EEEEEE",
    fontWeight: "700",
  },
  progressTrack: {
    width: "100%",
    height: 4,
    backgroundColor: "#1E1E1E",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: GOLD,
    borderRadius: 2,
  },
  progressSubLabel: {
    fontSize: 10,
    color: "#444",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  // ── Footer ────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 40,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLeft: {
    fontSize: 10,
    color: "#444",
    letterSpacing: 1,
  },
  footerRight: {
    fontSize: 10,
    color: "#444",
    letterSpacing: 1,
  },
});
