import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

<LottieView
  source={require('../assets/Check Mark.json')}
  autoPlay
  loop={false}
  style={{ width: 200, height: 200 }}
/>
// import LottieView from 'lottie-react-native';
// For web, you may need to use 'lottie-react-native' with Expo or 'lottie-react' directly.

// It's good practice to define constants for dimensions or magic numbers
const ANIMATION_WIDTH_PERCENTAGE = 0.7;
const ANIMATION_HEIGHT = 200; // Or calculate based on aspect ratio

const SuccessAnimation = ({ onAnimationFinish }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    // The autoPlay prop is set to true, which should handle the initial play.r
    // However, explicitly calling play() via a ref can be useful for more complex scenarios
    // or to ensure playback if autoPlay has any quirks in specific environments.
    // If autoPlay={true} is consistently working for the initial play, this effect
    // for just playing on mount might be simplified.
    // For now, it's a clear intent to play.
    animationRef.current?.play();

    // Optional: If you want to reset the animation to its first frame when the component
    // re-renders or when a specific condition changes, you could add:
    // animationRef.current?.reset();
    // animationRef.current?.play();
  }, []);

  const handleAnimationFinish = () => {
    if (onAnimationFinish) {
      onAnimationFinish();
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        // Assuming your Lottie file is in the root 'assets' folder,
        // using the Babel module resolver alias '@' is a good practice.
        // If './assets/' is indeed a subdirectory of 'components', the original path is fine.
        source={require('../assets/Check Mark.json')}
        speed={1}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={handleAnimationFinish} // Callback for when animation completes
        // Consider adding resizeMode if the animation doesn't scale as expected
        // resizeMode="cover" or "contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // If this animation is meant to be an overlay, you might need:
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // zIndex: 1000, // Ensure it's on top
    // backgroundColor: 'rgba(0,0,0,0.3)', // Optional semi-transparent background
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: Dimensions.get('window').width * ANIMATION_WIDTH_PERCENTAGE,
    height: ANIMATION_HEIGHT,
    // If your Lottie animation has a specific aspect ratio,
    // you might want to set it here to prevent distortion.
    // For example, if the animation is square:
    // aspectRatio: 1,
    // height: undefined, // Let height be determined by width and aspectRatio
    // Or, ensure your Lottie JSON is designed to scale well within these dimensions.
  }
});

export default SuccessAnimation;