import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MOODS = ['😃', '🙂', '😐', '😕', '😢'];

export default function CheckInScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [proudOf, setProudOf] = useState('');

  const handleSubmit = async () => {
    if (!selectedMood || !proudOf.trim()) {
      Alert.alert('Hold up', 'Please select a mood and write something.');
      return;
    }

    const newEntry = {
      mood: selectedMood,
      proudOf: proudOf.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const existing = await AsyncStorage.getItem('checkins');
      const checkins = existing ? JSON.parse(existing) : [];
      checkins.unshift(newEntry); // most recent first
      await AsyncStorage.setItem('checkins', JSON.stringify(checkins));

      setSelectedMood(null);
      setProudOf('');
      Alert.alert('Nice!', 'Your check-in was saved.');
    } catch (err) {
      console.error(err);
      Alert.alert('Oops', 'Could not save your check-in.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How do you feel today?</Text>
      <FlatList
        data={MOODS}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedMood(item)}
            style={[styles.moodButton, selectedMood === item && styles.selectedMood]}
          >
            <Text style={styles.mood}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ marginBottom: 24 }}
      />

      <Text style={styles.subHeader}>What’s one thing you’re proud of?</Text>
      <TextInput
        style={styles.input}
        value={proudOf}
        onChangeText={setProudOf}
        placeholder="Type here..."
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Check In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: '600', marginBottom: 16 },
  subHeader: { fontSize: 18, marginBottom: 8 },
  moodButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8
  },
  selectedMood: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F0FF'
  },
  mood: { fontSize: 28 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 24
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});