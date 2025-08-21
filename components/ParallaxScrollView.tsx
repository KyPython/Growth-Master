import React from 'react';
import { ScrollView, View, StyleSheet, useColorScheme } from 'react-native';

interface ParallaxScrollViewProps {
  children: React.ReactNode;
  headerImage?: React.ReactNode;
  headerBackgroundColor?: {
    light: string;
    dark: string;
  };
}

export function ParallaxScrollView({ children, headerImage, headerBackgroundColor }: ParallaxScrollViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = headerBackgroundColor 
    ? headerBackgroundColor[colorScheme || 'light'] 
    : '#f0f0f0';

  return (
    <ScrollView style={styles.container}>
      {headerImage && (
        <View style={[styles.headerContainer, { backgroundColor }]}>
          {headerImage}
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
});
