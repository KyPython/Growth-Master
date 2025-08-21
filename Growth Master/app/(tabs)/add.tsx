import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParallaxScrollView } from "../../components/ParallaxScrollView";
import { ThemedView, ThemedText } from "../../components/Themed";
import { IconSymbol } from "../../components/ui/IconSymbol";

export default function AddEntryScreen() {
  const [score, setScore] = useState(5);
  const [note, setNote] = useState("");
  const navigation = useNavigation();

  const saveEntry = async () => {
    try {
      // Generate a unique ID
      const id = Date.now().toString();

      // Create entry object
      const newEntry = {
        id,
        score,
        note,
        date: new Date().toISOString(),
      };

      // Get existing entries
      const existingEntriesJson = await AsyncStorage.getItem("growthEntries");
      const existingEntries = existingEntriesJson
        ? JSON.parse(existingEntriesJson)
        : [];

      // Add new entry
      const updatedEntries = [...existingEntries, newEntry];

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "growthEntries",
        JSON.stringify(updatedEntries)
      );

      // Navigate back to home
      navigation.navigate("Home" as never);
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  // Get color based on score
  const getMoodColor = () => {
    if (score <= 3) return "#FF6B6B"; // Red for low scores
    if (score <= 6) return "#FFD166"; // Yellow for medium scores
    return "#06D6A0"; // Green for high scores
  };

  // Get mood text based on score
  const getMoodText = () => {
    if (score <= 2) return "Struggling";
    if (score <= 4) return "Challenging";
    if (score <= 6) return "Neutral";
    if (score <= 8) return "Good";
    return "Excellent";
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#E8F4F8", dark: "#1D3D47" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#A1CEDC"
          name="plus.circle.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">How are you feeling today?</ThemedText>

        <ThemedView style={styles.moodContainer}>
          <ThemedText style={styles.moodText}>{getMoodText()}</ThemedText>
          <ThemedView style={styles.sliderContainer}>
            <TouchableOpacity
              onPress={() => score > 1 && setScore(score - 1)}
              style={styles.sliderButton}
            >
              <ThemedText style={styles.sliderButtonText}>-</ThemedText>
            </TouchableOpacity>

            <ThemedView style={styles.scoreContainer}>
              <ThemedView
                style={[
                  styles.scoreCircle,
                  { backgroundColor: getMoodColor() },
                ]}
              >
                <ThemedText style={styles.scoreText}>{score}</ThemedText>
              </ThemedView>
            </ThemedView>

            <TouchableOpacity
              onPress={() => score < 10 && setScore(score + 1)}
              style={styles.sliderButton}
            >
              <ThemedText style={styles.sliderButtonText}>+</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.noteContainer}>
          <ThemedText type="subtitle">Reflection</ThemedText>
          <TextInput
            style={styles.noteInput}
            placeholder="What's on your mind today? (optional)"
            placeholderTextColor="#999"
            multiline
            value={note}
            onChangeText={setNote}
          />
        </ThemedView>

        <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
          <ThemedText style={styles.saveButtonText}>Save Entry</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
    opacity: 0.7,
  },
  moodContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  moodText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 16,
  },
  sliderButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8F4F8",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scoreContainer: {
    flex: 1,
    alignItems: "center",
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  noteContainer: {
    marginTop: 32,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    minHeight: 120,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4263eb",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
