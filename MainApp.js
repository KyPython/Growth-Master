import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainApp() {
  const [entries, setEntries] = useState([]);
  const [currentScore, setCurrentScore] = useState(5);
  
  // Load saved entries on startup
  useEffect(() => {
    loadEntries();
  }, []);

  // Load entries from AsyncStorage
  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('growthEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Failed to load entries:', error);
    }
  };

  // Save entries to AsyncStorage
  const saveEntries = async (newEntries) => {
    try {
      await AsyncStorage.setItem('growthEntries', JSON.stringify(newEntries));
    } catch (error) {
      console.error('Failed to save entries:', error);
    }
  };

  // Add a new entry
  const addEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score: currentScore,
    };
    
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
    setCurrentScore(5); // Reset to default
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pulse Growth Tracker</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>How are you feeling today?</Text>
        <View style={styles.scoreContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <TouchableOpacity
              key={score}
              style={[
                styles.scoreButton,
                currentScore === score && styles.selectedScore
              ]}
              onPress={() => setCurrentScore(score)}
            >
              <Text 
                style={[
                  styles.scoreText,
                  currentScore === score && styles.selectedScoreText
                ]}
              >
                {score}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addEntry}>
          <Text style={styles.addButtonText}>Add Entry</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.historyTitle}>History</Text>
      <ScrollView style={styles.entriesContainer}>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet. Add your first one!</Text>
        ) : (
          entries.slice().reverse().map((entry) => (
            <View key={entry.id} style={styles.entryItem}>
              <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
              <View style={[
                styles.entryScore, 
                { backgroundColor: getScoreColor(entry.score) }
              ]}>
                <Text style={styles.entryScoreText}>{entry.score}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to get color based on score
function getScoreColor(score) {
  if (score <= 3) return '#FF6B6B'; // Red for low scores
  if (score <= 6) return '#FFD166'; // Yellow for medium scores
  return '#06D6A0'; // Green for high scores
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    color: '#495057',
    fontWeight: '500',
  },
  scoreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scoreButton: {
    width: '18%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedScore: {
    backgroundColor: '#4263eb',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  selectedScoreText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#4263eb',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
  entriesContainer: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 20,
    fontSize: 16,
  },
  entryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  entryDate: {
    fontSize: 14,
    color: '#495057',
    flex: 1,
  },
  entryScore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryScoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});