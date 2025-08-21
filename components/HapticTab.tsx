import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: any) {
  const { onPress, ...otherProps } = props;
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) {
      onPress();
    }
  };
  
  return <TouchableOpacity {...otherProps} onPress={handlePress} />;
}
