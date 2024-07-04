import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton3 from '../components/CustomButton3'; // Ensure correct import
import { images } from '../../constants/images'; // Ensure the path is correct

const { width, height } = Dimensions.get('window');

const SignInFirst = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.innerContainer}>
          <Image source={images.logo3} style={styles.image} resizeMode="contain" />

          <Text style={styles.signInText}>
            <Text style={styles.signInTextBlack}>Sign in to </Text>
            <Text style={styles.signInTextBlue}>Quizzie Bot</Text>
          </Text>

          <TextInput 
            style={styles.input}
            placeholder="Email"
          />

          <TextInput 
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <View style={styles.socialLogosContainer}>
            <Image source={images.logo4} style={styles.socialLogo} />
          </View>

          <CustomButton3
            title="SIGN IN"
            screenName="Home" // Update this to the correct screen name
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: height * 0.2,
    marginVertical: 20,
  },
  signInText: {
    flexDirection: 'row',
    fontSize: 24,
    marginVertical: 20,
  },
  signInTextBlack: {
    color: 'black',
    fontWeight: 'bold',
  },
  signInTextBlue: {
    color: '#1C58F2',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#1C58F2',
    alignSelf: 'flex-end',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    color: '#999999',
  },
  socialLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    marginVertical: 10,
  },
  socialLogo: {
    width: '35%', // Adjusted to make the logos bigger
    height: undefined,
    aspectRatio: 258 / 48, // Maintain aspect ratio
  },
});

export default SignInFirst;


