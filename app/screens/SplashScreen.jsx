// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants/images';
import { sounds } from '../../constants/sounds';

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
      duration: 1200, // Fade in duration
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800, // Fade out duration
          useNativeDriver: true,
        }).start(() => {
          // Navigate to Home screen after fade-out
          navigation.replace('Home');
        });
      }, 1000); // Show splash screen for 2 seconds
    });
  }, [fadeAnim, navigation]);

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(sounds.intro);
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
      <Image source={images.beyondlogiclogo} style={styles.image} resizeMode="contain" />
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
