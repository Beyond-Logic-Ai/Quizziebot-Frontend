import React, { useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton3 from '../components/CustomButton3';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.innerContainer}>
            <Image source={{uri: 'your-logo-url'}} style={styles.image} resizeMode="contain" />
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
  backButton: {
    alignSelf: 'flex-start',
    margin: 16,
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
    fontSize: 24,
    marginVertical: 10,
  },
  titleBlack: {
    color: 'black',
    fontWeight: 'bold',
  },
  titleBlue: {
    color: '#1C58F2',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  inputLine: {
    width: '100%',
    height: 40,
    borderColor: '#1C58F2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: -10,
    marginBottom: 10,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40, // Add space from the bottom
  },
});

export default ForgotPasswordScreen;
