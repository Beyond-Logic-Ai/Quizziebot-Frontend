import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CustomButton2 = ({title,screenName}) => {
 
    const navigation = useNavigation();
    
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenName)}>
    <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      width: 382,
      height: 64,
      backgroundColor: '#1D3853',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 29, // Adjust if your button has rounded corners
      marginVertical: 50,
      marginBottom: 15,
    },
    buttonText: {
      color: '#FBFCF6',
      fontSize: 16, // Adjust the font size as per your design
      fontWeight: 'bold', // Adjust the font weight as per your design
    },
  });

export default CustomButton2