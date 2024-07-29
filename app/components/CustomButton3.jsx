import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, Vibration } from 'react-native';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const CustomButton3 = ({ title, onPress }) => {
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/Vibrant_Next_Page_Button.wav') // Ensure the sound file path is correct
    );
    await sound.playAsync();
  };

  const handlePress = async () => {
    Vibration.vibrate(100);
    await playSound();
    onPress();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width * 0.9,
    height: 64,
    backgroundColor: '#1C58F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 29,
    marginVertical: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton3;
