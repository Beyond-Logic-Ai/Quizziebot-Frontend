import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const CustomButton2 = ({ title, screenName }) => {
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
    width: wp(90),
    height: wp(15),
    backgroundColor: '#1D3853',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(15),
    marginVertical: wp(3.5),
  },
  buttonText: {
    color: '#FBFCF6',
    fontSize: wp(4.5),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    letterSpacing:1.5
  },
});

export default CustomButton2;
