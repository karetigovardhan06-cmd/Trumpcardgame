import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGameState } from "../../hooks/useGameState";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { points, streak, loadGameData } = useGameState();

  // Animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const hubScale = useRef(new Animated.Value(0.8)).current;
  const hubOpacity = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.6)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadGameData();

    // Entrance animation
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(hubScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(hubOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Glow pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  
  return (
    <View style={styles.container}>
      {/* Radial glow background */}
      <Animated.View style={[styles.glowBg, { opacity: glowAnim }]} />

      {/* ── HEADER: Member info ── */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <View style={styles.memberRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>K</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberLabel}>MEMBER</Text>
            <Text style={styles.memberName}>KINGSLEY.VIP</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>♦</Text>
              <Text style={styles.statChipValue}>
                {points.toLocaleString()}
              </Text>
            </View>
            <View style={styles.statChip}>
              <Text style={styles.statChipIcon}>◎</Text>
              <Text style={styles.statChipValue}>
                {streak >= 1000
                  ? `${(streak / 1000).toFixed(1)}M`
                  : streak.toString()}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* ── CENTER HUB ── */}
      <Animated.View
        style={[
          styles.hubContainer,
          { opacity: hubOpacity, transform: [{ scale: hubScale }] },
        ]}
      >
        {/* Side buttons */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => router.push("/collection")}
        >
          <Text style={styles.sideButtonIcon}>🃏</Text>
          <Text style={styles.sideButtonLabel}>CARDS</Text>
        </TouchableOpacity>

        {/* Main play button */}
        <View style={styles.playRing}>
          {/* Outer decorative ring */}
          <Animated.View style={[styles.outerGlow, { opacity: glowAnim }]} />
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => router.push("/game")}
            activeOpacity={0.85}
          >
            <Text style={styles.playIcon}>▶</Text>
            <Text style={styles.playLabel}>START</Text>
          </TouchableOpacity>
        </View>

        {/* Profile button */}
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonIcon}>👤</Text>
          <Text style={styles.sideButtonLabel}>PROFILE</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── MODE LABEL ── */}
      <Animated.View style={{ opacity: hubOpacity }}>
        <Text style={styles.modeTitle}>ROYAL NOIR</Text>
        <Text style={styles.modeSubtitle}>TOURNAMENT LIVE</Text>
      </Animated.View>

      {/* ── BOTTOM NAV ── */}
      <Animated.View style={[styles.bottomNav, { opacity: footerOpacity }]}>
        <NavItem icon="⊞" label="HUB" active />
        <NavItem
          icon="🏛"
          label="VAULT"
          onPress={() => router.push("/collection")}
        />
        <NavItem icon="🏆" label="RANKS" />
        <NavItem icon="⚙" label="SETTINGS" />
      </Animated.View>
    </View>
  );
}

// ── Nav Item Component ────────────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Text style={[styles.navIcon, active && styles.navIconActive]}>
        {icon}
      </Text>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const GOLD = "#D4A017";
const GOLD_LIGHT = "#F0C040";
const BG = "#080808";
const SURFACE = "rgba(255,255,255,0.05)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#FFFFFF";
const TEXT_DIM = "#888888";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
  },

  // Ambient glow
  glowBg: {
    position: "absolute",
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: "transparent",
    // Simulated radial glow with a very large shadow
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 180,
    top: height * 0.25,
    alignSelf: "center",
    elevation: 0,
  },

  // ── Header ──
  header: {
    width: "100%",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SURFACE,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: GOLD,
    fontWeight: "bold",
    fontSize: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberLabel: {
    fontSize: 9,
    color: TEXT_DIM,
    letterSpacing: 2,
  },
  memberName: {
    fontSize: 13,
    color: TEXT,
    fontWeight: "700",
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statChipIcon: {
    fontSize: 12,
    color: GOLD,
  },
  statChipValue: {
    fontSize: 13,
    color: TEXT,
    fontWeight: "600",
  },

  // ── Hub ──
  hubContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginTop: 20,
  },
  sideButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  sideButtonIcon: {
    fontSize: 22,
  },
  sideButtonLabel: {
    fontSize: 8,
    color: TEXT_DIM,
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  playRing: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: GOLD,
    opacity: 0.3,
  },
  playButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: GOLD_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
    gap: 2,
  },
  playIcon: {
    fontSize: 28,
    color: "#111",
    fontWeight: "bold",
  },
  playLabel: {
    fontSize: 12,
    color: "#111",
    fontWeight: "900",
    letterSpacing: 3,
  },

  // ── Mode label ──
  modeTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: TEXT,
    textAlign: "center",
    letterSpacing: 4,
    marginTop: 30,
  },
  modeSubtitle: {
    fontSize: 10,
    color: TEXT_DIM,
    textAlign: "center",
    letterSpacing: 3,
    marginTop: 4,
    marginBottom: 30,
  },

  // ── Bottom Nav ──
  bottomNav: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingBottom: 30,
    paddingTop: 14,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  navIcon: {
    fontSize: 20,
    color: TEXT_DIM,
  },
  navIconActive: {
    color: GOLD,
  },
  navLabel: {
    fontSize: 9,
    color: TEXT_DIM,
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  navLabelActive: {
    color: GOLD,
  },
});
