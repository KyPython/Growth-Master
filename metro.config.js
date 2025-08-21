// filepath: /Users/ky/Desktop/GitHub/VS_Code/Growth-Master-2/metro.config.js
// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support by default for Expo projects.
  // This is beneficial if you plan to use CSS or CSS-in-JS solutions
  // that compile to StyleSheet objects.
  // Set to false if you don't need this feature.
  isCSSEnabled: true,
});

// The asset extensions you specified were: ['db', 'mp3', 'ttf', 'png', 'jpg', 'json']
// We'll add these to the default assetExts provided by expo/metro-config.
// Note:
// - 'ttf', 'png', 'jpg', 'mp3' are typically already included in expo/metro-config defaults.
// - 'json' is usually treated as a source file (module) by Metro, not a static asset.
//   If you specifically need .json files to be copied as assets, include 'json' here.
//   Otherwise, Metro handles `require('./data.json')` by parsing the JSON content.
const userAssetExts = ['db', 'mp3', 'ttf', 'png', 'jpg', 'json'];

// Add user-specified asset extensions to the defaults, ensuring no duplicates.
config.resolver.assetExts = Array.from(
  new Set([...config.resolver.assetExts, ...userAssetExts])
);

module.exports = config;