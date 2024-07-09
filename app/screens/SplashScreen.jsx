// SplashScreen.jsx
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  useEffect(() => {
    // Play sound and trigger vibration
    playSound();
    triggerVibration();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Fade in duration
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, // Fade out duration
          useNativeDriver: true,
        }).start(() => {
          // Navigate to Home screen after fade-out
          navigation.replace('Home');
        });
      }, 2000); // Show splash screen for 2 seconds
    });
  }, [fadeAnim, navigation]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('/Users/sandeepgantasala/Developer/projects/Quizziebot/updatedcode/Quizziebot-Frontend/assets/intro.wav') // Ensure the path is correct
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const triggerVibration = () => {
    Vibration.vibrate(500); // Vibrate for 500 milliseconds
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('/Users/sandeepgantasala/Developer/projects/Quizziebot/updatedcode/Quizziebot-Frontend/assets/beyondlogic.png')} style={styles.image} resizeMode="contain" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  image: {
    width: '80%',
    height: height * 0.4,
  },
});

export default SplashScreen;
