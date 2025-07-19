import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Map SF Symbol names to Ionicons names
const symbolToIonicon: Record<string, string> = {
  'house.fill': 'home',
  'book.fill': 'book',
  'person.fill': 'person',
  'plus.circle.fill': 'add-circle',
  'paperplane.fill': 'paper-plane',
  'gearshape.fill': 'settings',
  'chart.line.uptrend.xyaxis.circle.fill': 'stats-chart',
  'plus.circle': 'add-circle-outline',
  'chevron.left.forwardslash.chevron.right': 'code-outline',
};

interface IconSymbolProps {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: string;
}

export function IconSymbol({ name, size = 24, color, style, weight = 'regular' }: IconSymbolProps) {
  // Convert SF Symbol name to Ionicons name
  const iconName = symbolToIonicon[name] || 'help-circle';
  
  return (
    <Ionicons 
      name={iconName as any} 
      size={size} 
      color={color} 
      style={style} 
    />
  );
}
