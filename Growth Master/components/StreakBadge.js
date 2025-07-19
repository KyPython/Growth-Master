import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const calculateStreak = async () => {
      try {
        const stored = await AsyncStorage.getItem('growthEntries');
        const parsed = stored ? JSON.parse(stored) : [];

        const uniqueDates = new Set(
  parsed
    .map(entry => {
      // Support both 'timestamp' and 'date' fields
      const dateStr = entry.timestamp || entry.date;
      if (!dateStr) return null;
      const d = new Date(dateStr);
      return isNaN(d) ? null : d.toISOString().split('T')[0];
    })
    .filter(Boolean)
);

const today = new Date();
let currentStreak = 0;

for (let i = 0; i < 365; i++) {
  const day = new Date(today);
  day.setDate(today.getDate() - i);
  if (isNaN(day)) break; // Prevent invalid date
  const dateStr = day.toISOString().split('T')[0];

  if (uniqueDates.has(dateStr)) {
    currentStreak++;
  } else {
    break;
  }
}

        setStreak(currentStreak);
        setMessage(getEncouragementMessage(currentStreak));
      } catch (err) {
        console.error('Error calculating streak:', err);
      }
    };

    calculateStreak();
  }, []);

  const getEncouragementMessage = (streak) => {
    if (streak === 0) return "Let's start your streak today!";
    if (streak < 5) return "You're off to a great start! Keep going!";
    if (streak < 10) return "Amazing! You're building a strong habit!";
    return "You're unstoppable! Keep shining!";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.streakText}>🔥 {streak}-Day Streak</Text>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  streakText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});