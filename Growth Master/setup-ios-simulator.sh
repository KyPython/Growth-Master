#!/bin/bash

echo "Setting up iOS simulator..."

# Check if Xcode is installed
if ! command -v xcrun &> /dev/null; then
    echo "Error: Xcode is not installed or not properly configured."
    echo "Please install Xcode from the App Store and run 'sudo xcode-select --install'"
    exit 1
fi

# List available simulator runtimes
echo "Available iOS simulator runtimes:"
xcrun simctl list runtimes | grep iOS

# List available devices
echo -e "\nAvailable simulators:"
xcrun simctl list devices | grep -v unavailable

# Create a new simulator if none exists
if ! xcrun simctl list devices | grep -q "iPhone"; then
    echo -e "\nNo iPhone simulators found. Creating a new iPhone 14 simulator..."
    
    # Get the latest iOS runtime
    LATEST_RUNTIME=$(xcrun simctl list runtimes | grep iOS | tail -1 | awk '{print $NF}')
    
    if [ -z "$LATEST_RUNTIME" ]; then
        echo "Error: No iOS runtimes found. Please install iOS simulator runtimes through Xcode."
        echo "Open Xcode > Preferences > Components > Simulators"
        exit 1
    fi
    
    # Create a new iPhone 14 simulator
    xcrun simctl create "iPhone 14" "com.apple.CoreSimulator.SimDeviceType.iPhone-14" "$LATEST_RUNTIME"
    
    echo "iPhone 14 simulator created."
else
    echo -e "\nExisting iPhone simulators found."
fi

# Boot a simulator
echo -e "\nBooting a simulator..."
DEVICE_ID=$(xcrun simctl list devices | grep iPhone | grep -v unavailable | head -1 | sed -E 's/.*\(([A-Za-z0-9-]+)\).*/\1/')

if [ -n "$DEVICE_ID" ]; then
    echo "Booting simulator with ID: $DEVICE_ID"
    xcrun simctl boot "$DEVICE_ID"
    
    # Open the Simulator app
    echo "Opening Simulator app..."
    open -a Simulator
    
    echo -e "\nSimulator setup complete. You can now run your app with:"
    echo "npx expo run:ios --device-id $DEVICE_ID"
    echo "or simply:"
    echo "npm run ios"
else
    echo "Error: Could not find a valid simulator device."
    echo "Please open Xcode and install iOS simulator components."
fi