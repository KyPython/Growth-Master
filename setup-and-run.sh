#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Create assets directory if it doesn't exist
mkdir -p assets

# Create basic placeholder images if they don't exist
if [ ! -f assets/icon.png ]; then
  echo "Creating placeholder assets..."
  # Create a simple colored square for icon.png (1024x1024)
  echo "Creating icon.png..."
  convert -size 1024x1024 xc:blue assets/icon.png 2>/dev/null || touch assets/icon.png
  
  # Create a simple colored square for splash.png (2048x2048)
  echo "Creating splash.png..."
  convert -size 2048x2048 xc:white assets/splash.png 2>/dev/null || touch assets/splash.png
  
  # Create a simple colored square for adaptive-icon.png (1024x1024)
  echo "Creating adaptive-icon.png..."
  convert -size 1024x1024 xc:blue assets/adaptive-icon.png 2>/dev/null || touch assets/adaptive-icon.png
  
  # Create a simple colored square for favicon.png (48x48)
  echo "Creating favicon.png..."
  convert -size 48x48 xc:blue assets/favicon.png 2>/dev/null || touch assets/favicon.png
fi

# Create a basic babel.config.js if it doesn't exist
if [ ! -f babel.config.js ]; then
  echo "Creating babel.config.js..."
  cat > babel.config.js << 'EOL'
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
EOL
fi

echo "Setup complete! You can now run the app with:"
echo "npm run ios    # for iOS"
echo "npm run android    # for Android"
echo "npm start      # for development server"