import React, { useEffect } from "react";
import { ThemeProvider } from "../constants/ThemeContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
// Remove useColorScheme import if not used elsewhere
// import { useColorScheme } from "react-native";

// Import your custom fonts if they are not automatically loaded elsewhere.
const customFonts = {
  "SpaceMono-Regular": require("@/assets/fonts/SpaceMono-Regular.ttf"),
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(customFonts);

  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
      SplashScreen.hideAsync();
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        {/* Add other global screens here if needed */}
      </Stack>
    </ThemeProvider>
  );
}
