// app/_layout.tsx  — wire SplashScreen before routing begins

import { Stack } from "expo-router";
import React, { useState } from "react";
import SplashScreen from "../../components/splashscreen"; // adjust path

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="game" />
      <Stack.Screen name="collection" />
    </Stack>
  );
}
