import React, { useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
import CustomButton3 from '../components/CustomButton3'; // Ensure correct import
import { images } from '../../constants/images'; // Ensure the path is correct
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Improved email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleContinue = async () => {
    const normalizedEmail = email.trim().toLowerCase(); // Trim and convert email to lowercase
    if (!validateEmail(normalizedEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      try {
        // API call to send OTP to user's email
        const response = await axios.post('https://api.quizziebot.com/api/auth/forgot-password', { email: normalizedEmail });

        if (response.status === 200) {
          // Navigate to OTP verification screen after successfully sending OTP
          navigation.navigate('OtpVerificationScreen', { email: normalizedEmail });
        } else {
          Alert.alert('Error', 'Failed to send OTP. Please try again.');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          Alert.alert('Error', error.response.data.message || 'Failed to send OTP.');
        } else {
          Alert.alert('Error', 'Failed to send OTP. Please check your connection and try again.');
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        
        <View style={styles.headerContainer}>
                 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                     <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
        </View>
        <View style={styles.robotImageContainer}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Defs>
             <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#1C58F2" stopOpacity="1" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
        </Svg>
                <Image source={images.logo4} style={styles.robotImage} resizeMode="contain" />
                    </View>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>
              <Text style={styles.titleBlack}>Forgot </Text>
              <Text style={styles.titleBlue}>Password</Text>
            </Text>
            <Text style={styles.description}>
              Enter your email address to get an OTP code to reset your password
            </Text>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.inputLine}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"  // Disable automatic capitalization
              autoCorrect={false}    // Disable autocorrect for email input
              textContentType="emailAddress"  // Specify that this is an email field
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <CustomButton3
            title="CONTINUE"
            onPress={handleContinue}  // Corrected onPress prop to call handleContinue function
          />
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // backButton: {
  //   alignSelf: 'flex-start',
  //   margin: 16,
  // },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: hp(2),
   
  },
  robotImageContainer: {
    width: hp(16),
    height: hp(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
    alignSelf:"center",
  },
  robotImage: {
    position: 'absolute',
    width: hp(20),
    height: hp(20),
    resizeMode: 'contain',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: '60%',
    height: height * 0.15,
    marginVertical: 10,
  },
  title: {
    flexDirection: 'row',
    fontSize: wp(6),
    marginVertical: 10,
  },
  titleBlack: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  titleBlue: {
    color: '#1C58F2',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  description: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Nunito',
  },
  label: {
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  inputLine: {
    width: '100%',
    height: 40,
    borderColor: '#1C58F2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontFamily: 'Nunito',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: -10,
    marginBottom: 10,
    fontFamily: 'Nunito',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom:wp(4) // Add space from the bottom
  },
});

export default ForgotPasswordScreen;
