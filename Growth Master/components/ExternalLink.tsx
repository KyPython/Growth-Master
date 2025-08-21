import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

interface ExternalLinkProps extends TouchableOpacityProps {
  href: string;
}

export function ExternalLink({ href, ...props }: ExternalLinkProps) {
  const handlePress = () => {
    WebBrowser.openBrowserAsync(href);
  };

  return <TouchableOpacity onPress={handlePress} {...props} />;
}
