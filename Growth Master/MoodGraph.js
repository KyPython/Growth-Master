import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const moodMap = {
  '😢': 1,
  '😔': 2,
  '😐': 3,
  '😊': 4,
  '😁': 5
};

export default function MoodGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadCheckins = async () => {
      const stored = await AsyncStorage.getItem('checkins');
      const parsed = stored ? JSON.parse(stored) : [];

      const sorted = parsed.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      const moodValues = sorted.map(entry => moodMap[entry.mood] || 3);
      setData(moodValues);
    };

    loadCheckins();
  }, []);

  if (data.length < 2) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mood Over Time</Text>
      <LineChart
        style={{ height: 160 }}
        data={data}
        svg={{ stroke: '#007AFF', strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveMonotoneX}
      >
        <Grid />
      </LineChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  }
});