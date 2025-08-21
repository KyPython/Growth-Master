const fs = require('fs');
const path = require('path');

// Define required assets
const requiredAssets = [
  'assets/icon.png',
  'assets/splash.png',
  'assets/adaptive-icon.png',
  'assets/favicon.png',
  'assets/notification-icon.png'
];

// Create assets directory if it doesn't exist
if (!fs.existsSync('assets')) {
  console.log('Creating assets directory...');
  fs.mkdirSync('assets');
}

// Check each required asset
let allAssetsExist = true;
requiredAssets.forEach(assetPath => {
  if (!fs.existsSync(assetPath)) {
    console.log(`Missing asset: ${assetPath}`);
    allAssetsExist = false;
  } else {
    console.log(`✓ Found: ${assetPath}`);
  }
});

if (allAssetsExist) {
  console.log('\nAll required assets exist! Your app is ready to build.');
} else {
  console.log('\nSome assets are missing. Please create the missing assets or run:');
  console.log('npx expo-doctor');
  console.log('to get more information about fixing your project.');
}