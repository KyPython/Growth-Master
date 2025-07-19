import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleDailyReminder } from '../services/notificationService';

const SettingsScreen = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Load saved notification time when component mounts
  useEffect(() => {
    const loadSavedTime = async () => {
      try {
        const savedTime = await AsyncStorage.getItem('notifTime');
        if (savedTime) {
          const { hours, minutes } = JSON.parse(savedTime);
          const newTime = new Date();
          newTime.setHours(hours);
          newTime.setMinutes(minutes);
          setTime(newTime);
        }
      } catch (error) {
        console.error('Failed to load notification time:', error);
      }
    };

    loadSavedTime();
  }, []);

  const handleTimeChange = async (event, selectedTime) => {
    const chosen = selectedTime || time;
    setShowPicker(Platform.OS === 'ios');
    setTime(chosen);

    const hours = chosen.getHours();
    const minutes = chosen.getMinutes();

    await AsyncStorage.setItem('notifTime', JSON.stringify({ hours, minutes }));
    scheduleDailyReminder(hours, minutes);
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const { time: formattedTime, period } = formatTimeParts(time);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Reminder Time</Text>
        <Text style={styles.timeDisplay}>Current time: {formatTime(time)}</Text>
        <Button 
          title="Change Reminder Time" 
          onPress={() => setShowPicker(true)} 
        />
{showPicker && (
  <DateTimePicker
    value={time}
    mode="time"
    is24Hour={false}
    display="default"
    onChange={handleTimeChange}
  />
)}
<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
  <Text style={styles.timeDisplay}>Current time: {formattedTime}</Text>
  <Text style={styles.period}>{period}</Text>
</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    color: '#343a40',
  },
  timeDisplay: {
    fontSize: 16,
    marginBottom: 16,
    color: '#495057',
    fontVariant: ['tabular-nums'],
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    minWidth: 120,
    alignSelf: 'flex-start',
  },
});

// Helper to format time and period
const formatTimeParts = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minStr = minutes < 10 ? `0${minutes}` : minutes;
  return { time: `${hours}:${minStr}`, period };
};


export default SettingsScreen;
