import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useTheme } from "../../constants/ThemeContext";
import StreakBadge from "../../components/StreakBadge";

const headerStyles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingLeft: 64,
    paddingRight: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  logoContainer: {
    width: 84,
    height: 36,
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  linkText: {
    fontSize: 16,
    fontFamily: "IBM Plex Sans",
    fontWeight: "400",
    lineHeight: 24,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  secondaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: "IBM Plex Sans",
    fontWeight: "400",
    lineHeight: 24,
  },
  primaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: "IBM Plex Sans",
    fontWeight: "400",
    lineHeight: 24,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function Header({ textColor }: { textColor: string }) {
  return (
    <View
      style={[
        headerStyles.headerContainer,
        {
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1200,
          alignSelf: "center",
        },
      ]}
    >
      <View style={headerStyles.leftSection}>
        <View style={headerStyles.logoContainer}></View>
        <View style={headerStyles.navLinks}>
          <ThemedText style={[headerStyles.linkText, { color: textColor }]}>
            Home
          </ThemedText>
          <ThemedText style={[headerStyles.linkText, { color: textColor }]}>
            Features
          </ThemedText>
          <ThemedText style={[headerStyles.linkText, { color: textColor }]}>
            Pricing
          </ThemedText>
        </View>
      </View>
      <View style={headerStyles.rightSection}>
        <TouchableOpacity style={headerStyles.secondaryButton}>
          <ThemedText
            style={[headerStyles.secondaryButtonText, { color: textColor }]}
          >
            Sign In
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={headerStyles.primaryButton}>
          <ThemedText
            style={[headerStyles.primaryButtonText, { color: textColor }]}
          >
            Get Started
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeScreen() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#fff" : "#000";
  const bgColor = theme === "dark" ? "#000" : "#fff";

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
      <Header textColor={textColor} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={{ color: textColor }}>
          Home
        </ThemedText>
        <ThemedText style={{ color: textColor }}>
          Welcome to Pulse Personal Growth Tracker!
        </ThemedText>
        <StreakBadge />
      </ScrollView>
    </ThemedView>
  );
}

export default HomeScreen;
