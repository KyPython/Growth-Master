import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { useTheme } from "../constants/ThemeContext";

interface ThemedTextProps extends TextProps {
  type?:
    | "default"
    | "defaultSemiBold"
    | "title"
    | "subtitle"
    | "link"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "caption";
  lightColor?: string;
  darkColor?: string;
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...props
}: ThemedTextProps) {
  const { theme } = useTheme();
  const color =
    theme === "dark"
      ? darkColor || Colors.dark.text
      : lightColor || Colors.light.text;

  let textStyle;
  switch (type) {
    case "h1":
      textStyle = styles.h1;
      break;
    case "h2":
      textStyle = styles.h2;
      break;
    case "h3":
      textStyle = styles.h3;
      break;
    case "h4":
      textStyle = styles.h4;
      break;
    case "title":
      textStyle = styles.title;
      break;
    case "subtitle":
      textStyle = styles.subtitle;
      break;
    case "defaultSemiBold":
      textStyle = styles.defaultSemiBold;
      break;
    case "link":
      textStyle = styles.link;
      break;
    case "caption":
      textStyle = styles.caption;
      break;
    default:
      textStyle = styles.default;
  }

  return <Text style={[textStyle, { color }, style]} {...props} />;
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "BioRhyme_700Bold",
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 16,
  },
  h2: {
    fontFamily: "BioRhyme_700Bold",
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 14,
  },
  h3: {
    fontFamily: "BioRhyme_400Regular",
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 12,
  },
  h4: {
    fontFamily: "BioRhyme_400Regular",
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
  },
  default: {
    fontFamily: "IBMPlexSans_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  defaultSemiBold: {
    fontFamily: "IBMPlexSans_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  title: {
    fontFamily: "BioRhyme_700Bold",
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "BioRhyme_400Regular",
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
  },
  link: {
    fontFamily: "IBMPlexSans_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.tint,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  caption: {
    fontFamily: "IBMPlexSans_300Light",
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 6,
  },
});
