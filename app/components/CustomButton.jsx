import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width } = Dimensions.get('window');

const CustomButton = ({ title, screenName }) => {
  const navigation = useNavigation();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/Vibrant_Next_Page_Button.wav') // Ensure the sound file path is correct
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
  button: {
    width: width * 0.9,
    height: 64,
    backgroundColor: '#FBFCF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 29,
    marginVertical: 15,
  },
  buttonText: {
    color: '#1C58F2',
    fontSize: wp(4),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
});

export default CustomButton;
