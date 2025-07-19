import React from 'react';
import { View, Text, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({ navigation }) => {
  const handleDone = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem('hasLaunched', 'true');
      
      // Navigate to Home screen if using navigation
      if (navigation) {
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/wins.png')} style={{ width: 200, height: 200 }} />,
          title: 'Track Little Wins',
          subtitle: 'Acknowledge small victories that add up over time.',
        },
        {
          backgroundColor: '#f7f7f7',
          image: <Image source={require('../assets/mood.png')} style={{ width: 200, height: 200 }} />,
          title: 'See Your Mood Shift',
          subtitle: 'Visualize progress with gentle mood charts.',
        },
        {
          backgroundColor: '#e6f7ff',
          image: <Image source={require('../assets/reminder.png')} style={{ width: 200, height: 200 }} />,
          title: 'Stay Consistent',
          subtitle: 'Get daily encouragement without pressure.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
