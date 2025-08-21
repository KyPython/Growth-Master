import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  
  return (
    <View 
      style={[
        styles.background, 
        { backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#ffffff' }
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});
