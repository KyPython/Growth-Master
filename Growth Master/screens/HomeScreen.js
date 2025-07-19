import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
    
    // Refresh entries when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      loadEntries();
    });

    return unsubscribe;
  }, [navigation]);

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('growthEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load entries:', error);
      setLoading(false);
    }
  };

  // Get mood color based on score
  const getMoodColor = (score) => {
    if (score <= 3) return '#FF6B6B'; // Red for low scores
    if (score <= 6) return '#FFD166'; // Yellow for medium scores
    return '#06D6A0'; // Green for high scores
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate average mood score
  const getAverageMood = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((total, entry) => total + entry.score, 0);
    return (sum / entries.length).toFixed(1);
  };

  // Get last 7 days entries
  const getRecentEntries = () => {
    return entries
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pulse</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="#343a40" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Growth Summary</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{entries.length}</Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getAverageMood()}</Text>
            <Text style={styles.statLabel}>Avg Mood</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {entries.length > 0 ? entries[entries.length - 1].score : '-'}
            </Text>
            <Text style={styles.statLabel}>Last Entry</Text>
          </View>
        </View>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Entries</Text>
        {loading ? (
          <Text style={styles.emptyText}>Loading...</Text>
        ) : entries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No entries yet</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('Add')}
            >
              <Text style={styles.addButtonText}>Add Your First Entry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={getRecentEntries()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.entryItem}>
                <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(item.score) }]}>
                  <Text style={styles.moodScore}>{item.score}</Text>
                </View>
                <View style={styles.entryContent}>
                  <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
                  {item.note && <Text style={styles.entryNote}>{item.note}</Text>}
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4263eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#dee2e6',
  },
  recentSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 12,
  },
  entryItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  moodIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moodScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryContent: {
    flex: 1,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#343a40',
    marginBottom: 4,
  },
  entryNote: {
    fontSize: 14,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4263eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;