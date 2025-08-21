import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { useTheme } from "../constants/ThemeContext";

interface ThemedViewProps extends ViewProps {
  lightBackground?: string;
  darkBackground?: string;
}

export function ThemedView({
  style,
  lightBackground,
  darkBackground,
  ...props
}: ThemedViewProps) {
  const { theme } = useTheme();
  const backgroundColor =
    theme === "dark"
      ? darkBackground || Colors.dark.background
      : lightBackground || Colors.light.background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}

const styles = StyleSheet.create({});

export default ThemedView;
// export default ThemedView;
// import
