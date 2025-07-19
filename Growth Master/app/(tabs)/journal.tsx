import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useTheme } from "../../constants/ThemeContext";
import Colors from "../../constants/Colors";

type JournalEntry = {
  id: string;
  date: string;
  note?: string;
};

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const loadEntries = async () => {
      const data = await AsyncStorage.getItem("growthEntries");
      setEntries(data ? JSON.parse(data) : []);
    };
    loadEntries();
  }, []);

  const entryBg = theme === "dark" ? Colors.dark.card : Colors.light.card;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const headerBg =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.header, { backgroundColor: headerBg }]}>
        <ThemedText
          type="title"
          style={{
            color: textColor,
            textAlign: "center",
            fontSize: 26,
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Your Journal Entries
        </ThemedText>
      </ThemedView>
      {entries.length === 0 ? (
        <ThemedText
          style={{ color: textColor, textAlign: "center", marginTop: 24 }}
        >
          No journal entries yet.
        </ThemedText>
      ) : (
        <FlatList
          data={entries.slice().reverse()} // newest first
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 0, marginTop: 0 }}
          style={{ flex: 1, marginTop: 0 }}
          renderItem={({ item }) => (
            <ThemedView style={[styles.entry, { backgroundColor: entryBg }]}>
              <ThemedText style={{ color: textColor }}>
                {new Date(item.date).toLocaleDateString()}:{" "}
                {item.note || "(No note)"}
              </ThemedText>
            </ThemedView>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "transparent",
  },
  header: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 0,
    marginBottom: 0, // Remove margin to eliminate white space
    alignItems: "center",
    justifyContent: "center",
  },
  entry: {
    marginVertical: 4,
    padding: 16,
    borderRadius: 0,
    width: "100%",
  },
});

// export default JournalScreen;
// import
