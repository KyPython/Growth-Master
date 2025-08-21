import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import MainApp from './MainApp';
import { scheduleDailyReminder } from './services/notificationService';

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if this is the first launch
  useEffect(() => {
    AsyncStorage.getItem('hasLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('hasLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      setIsLoading(false);
    });
  }, []);

  // Schedule daily reminder
  useEffect(() => {
    scheduleDailyReminder(); // Default 8:00 PM
  }, []);

  if (isLoading) return null;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isFirstLaunch ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : (
            <Stack.Screen name="Main" component={MainApp} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
