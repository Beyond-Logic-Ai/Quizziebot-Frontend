import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const PlaynowButton = ({ title, screenName }) => {
  const navigation = useNavigation();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/playnow.wav') // Ensure the sound file path is correct
    );
    await sound.playAsync();
  };

  const handlePress = async () => {
    Vibration.vibrate(100);
    await playSound();
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: '100%',
    borderRadius: 35,
    marginBottom: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#0044F2',
    paddingVertical: 5, // Increased padding
    paddingHorizontal: 60, // Increased padding
    borderRadius: 27,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito', // Ensure you have the Nunito font properly linked in your project
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 34.752,
    letterSpacing: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
});

export default PlaynowButton;
