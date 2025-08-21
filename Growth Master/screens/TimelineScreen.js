import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimelineScreen() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCheckins = async () => {
    try {
      const stored = await AsyncStorage.getItem('checkins');
      const parsed = stored ? JSON.parse(stored) : [];
      setCheckins(parsed);
    } catch (err) {
      console.error('Failed to load check-ins:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = loadCheckins();
    return () => unsubscribe;
  }, []);

  const renderItem = ({ item }) => {
    const date = new Date(item.timestamp);
    const formattedDate = date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });

    return (
      <View style={styles.card}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.mood}>{item.mood}</Text>
        <Text style={styles.entry}>{item.proudOf}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (checkins.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No check-ins yet. Start today!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={checkins}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 24 },
  card: {
    padding: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    marginBottom: 12
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888'
  },
  mood: {
    fontSize: 24,
    marginTop: 4
  },
  entry: {
    fontSize: 16,
    marginTop: 8,
    color: '#333'
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    color: '#aaa'
  }
});

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const TimelineItem = ({ mood, note, date }) => {
  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.mood}>Mood: {mood}</Text>
      <Text style={styles.note}>{note}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  date: { fontWeight: 'bold' },
  mood: { fontSize: 16, marginTop: 4 },
  note: { color: '#555', marginTop: 4 },
});

export default TimelineItem;