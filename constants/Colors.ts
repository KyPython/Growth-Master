// Updated color palette based on new design system
const tintColorLight = '#FF6B9E'; // Fuschia Pink
const tintColorDark = '#FF6B9E';  // Same for dark mode for brand consistency

export default {
  light: {
    text: '#212121',           // neutral600
    background: '#FFFFFF',     // neutral100
    tint: tintColorLight,      // fuschiaPink
    tabIconDefault: '#9E9E9E', // neutral400
    tabIconSelected: tintColorLight,
    secondary: '#A6D685',      // appleBlossom
    border: '#E0E0E0',         // neutral300
    card: '#F5F5F5',           // neutral200
    notification: '#FF6B6B',   // error
  },
  dark: {
    text: '#F5F5F5',           // neutral200
    background: '#121212',     // neutral700
    tint: tintColorDark,       // fuschiaPink
    tabIconDefault: '#616161', // neutral500
    tabIconSelected: tintColorDark,
    secondary: '#A6D685',      // appleBlossom
    border: '#616161',         // neutral500
    card: '#212121',           // neutral600
    notification: '#FF6B6B',   // error
  },
};
