import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants/images';
import { animation } from '../../constants/animations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpSuccessScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Save user session
      const userSession = {
        email: 'user@example.com', // Replace with actual user data
        token: 'jwt_token', // Replace with actual token
      };
      await AsyncStorage.setItem('userSession', JSON.stringify(userSession));

      navigation.reset({
        index: 0,
        routes: [{ name: 'HomePageScreen' }],
      });
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Image
          source={images.logosuccess} // Replace with your bot logo path
          style={styles.logo}
        />
        <Text style={styles.successText}>Successful</Text>
        <Text style={styles.infoText}>
          Please wait a moment we are {'\n'}
          preparing for you...
        </Text>
        <LottieView
          source={animation.loadinganimation} // Replace with your loading animation file
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C58F2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
});

export default SignUpSuccessScreen;
