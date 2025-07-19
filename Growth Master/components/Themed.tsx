import {
  Text as DefaultText,
  View as DefaultView,
  useColorScheme,
} from "react-native";
import Colors from "@/constants/Colors";

import { useTheme } from "../constants/ThemeContext";
const { theme } = useTheme();
// Use theme === "dark" or "light" to set colors/styles
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps &
  DefaultText["props"] & {
    type?: "default" | "title" | "subtitle" | "defaultSemiBold" | "link";
  };

export type ViewProps = ThemeProps & DefaultView["props"];

export function ThemedText(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    type = "default",
    ...otherProps
  } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  let textStyle = {};
  switch (type) {
    case "title":
      textStyle = { fontSize: 28, fontWeight: "bold", marginBottom: 16 };
      break;
    case "subtitle":
      textStyle = { fontSize: 20, fontWeight: "600", marginBottom: 12 };
      break;
    case "defaultSemiBold":
      textStyle = { fontWeight: "600" };
      break;
    case "link":
      textStyle = { color: Colors.light.tint, textDecorationLine: "underline" };
      break;
    default:
      textStyle = {};
  }

  return <DefaultText style={[{ color }, textStyle, style]} {...otherProps} />;
}

export function ThemedView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
