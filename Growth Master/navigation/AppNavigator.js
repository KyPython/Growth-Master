import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import LoadingScreen from '../screens/LoadingScreen'; // Assuming you create a LoadingScreen

// Constants for route names and storage keys
const ROUTE_NAMES = {
  HOME: 'Home',
  ADD: 'Add',
  SETTINGS: 'Settings',
  ONBOARDING: 'Onboarding',
  MAIN_APP: 'MainApp', // Renamed from 'Main' for clarity if App.js uses it
};

const ASYNC_STORAGE_KEYS = {
  HAS_LAUNCHED: 'hasLaunched',
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabs = () => {
  // Optional: Icon mapping for scalability
  const tabIcons = {
    [ROUTE_NAMES.HOME]: { focused: 'home', unfocused: 'home-outline' },
    [ROUTE_NAMES.ADD]: { focused: 'add-circle', unfocused: 'add-circle-outline' },
    [ROUTE_NAMES.SETTINGS]: { focused: 'settings', unfocused: 'settings-outline' },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const currentTabIcons = tabIcons[route.name];
          const iconName = focused ? currentTabIcons.focused : currentTabIcons.unfocused;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4263eb',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name={ROUTE_NAMES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTE_NAMES.ADD} component={AddEntryScreen} />
      <Tab.Screen name={ROUTE_NAMES.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Root navigator
const AppNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first launch
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.HAS_LAUNCHED)
      .then(value => {
        setIsFirstLaunch(value === null);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error checking first launch:', err);
        setIsLoading(false);
        setIsFirstLaunch(false); // Default to not first launch on error
      });
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Display a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          // Optional: Add a default transition animation for a smoother feel
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, 
        }}
      >
        {isFirstLaunch ? (
          <Stack.Screen name={ROUTE_NAMES.ONBOARDING} component={OnboardingScreen} />
        ) : (
          // It's good practice to give this route a distinct name
          // if 'Main' is used elsewhere or if you want more clarity.
          <Stack.Screen name={ROUTE_NAMES.MAIN_APP} component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;