import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useTheme } from "../../constants/ThemeContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [entryCount, setEntryCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  const { theme } = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme === "dark" ? "#222" : "#fff",
      },
      headerTitleStyle: {
        color: theme === "dark" ? "#fff" : "#222",
      },
      headerTintColor: theme === "dark" ? "#fff" : "#222",
    });
  }, [navigation, theme]);

  useEffect(() => {
    const loadStats = async () => {
      // Load entries
      const data = await AsyncStorage.getItem("growthEntries");
      const entries = data ? JSON.parse(data) : [];
      setEntryCount(entries.length);

      // Calculate streak
      const uniqueDates = new Set(
        entries
          .map((entry: { timestamp?: string; date?: string }) => {
            const dateStr = entry.timestamp || entry.date;
            if (!dateStr) return null;
            const d = new Date(dateStr);
            return Number.isNaN(d.getTime())
              ? null
              : d.toISOString().split("T")[0];
          })
          .filter(Boolean)
      );
      const today = new Date();
      let currentStreak = 0;
      for (let i = 0; i < 365; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        if (Number.isNaN(day.getTime())) break;
        const dateStr = day.toISOString().split("T")[0];
        if (uniqueDates.has(dateStr)) {
          currentStreak++;
        } else {
          break;
        }
      }
      setStreak(currentStreak);

      // Load profile image URI
      const uri = await AsyncStorage.getItem("profileImageUri");
      setProfileImageUri(uri);
    };
    loadStats();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.avatarContainer}>
        {profileImageUri && (
          <Image
            source={{ uri: profileImageUri }}
            style={styles.avatar}
            resizeMode="cover"
          />
        )}
      </View>
      <ThemedText type="title" style={{ marginBottom: 8 }}>
        Profile
      </ThemedText>
      <ThemedText style={styles.info}>Username: Guest</ThemedText>
      <ThemedText style={styles.info}>Current Streak: {streak} days</ThemedText>
      <ThemedText style={styles.info}>Total Entries: {entryCount}</ThemedText>
      <ThemedText style={styles.info}>Member since: 2024</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 16,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#4263eb",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  info: {
    fontSize: 16,
    marginVertical: 4,
  },
});
