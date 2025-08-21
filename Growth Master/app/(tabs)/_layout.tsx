import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../constants/ThemeContext";
import Colors from "../../constants/Colors";

export default function TabLayout() {
  const { theme } = useTheme();

  // Use your Colors object for theme-aware colors
  const tabBarActiveTintColor =
    theme === "dark" ? Colors.dark.tint : Colors.light.tint;
  const tabBarInactiveTintColor =
    theme === "dark" ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault;
  const tabBarStyleBackgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle: {
          backgroundColor: tabBarStyleBackgroundColor,
        },
        headerStyle: {
          backgroundColor: tabBarStyleBackgroundColor,
        },
        headerTitleStyle: {
          color: theme === "dark" ? Colors.dark.text : Colors.light.text,
        },
        headerTintColor:
          theme === "dark" ? Colors.dark.text : Colors.light.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Entry",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="add-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="compass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
