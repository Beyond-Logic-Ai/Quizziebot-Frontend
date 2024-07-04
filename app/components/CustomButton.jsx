import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CustomButton = ({ title, screenName }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;

