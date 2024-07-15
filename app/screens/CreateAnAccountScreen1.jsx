import React, { useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton3 from '../components/CustomButton3';
import { images } from '../../constants/images';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';

const { width } = Dimensions.get('window');

const CreateAnAccountScreen1 = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phoneNumber);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignUp = () => {
    let valid = true;

    if (!firstName) {
      setFirstNameError('Please enter your first name');
      valid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Please enter your last name');
      valid = false;
    } else {
      setLastNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number');
      valid = false;
    } else {
      setPhoneNumberError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      navigation.navigate('CreateAnAccountScreen2', {
        firstname: firstName,
        lastname: lastName,
        email,
        phoneNumber,
        password,
        rememberMe,
        loginType: 'email',
        accountType: 'teacher'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}></View>
            </View>
          </View>
          
          <View style={styles.innerContainer}>
            <Text style={styles.title}>
              <Text style={styles.titleBlack}>Create an </Text>
              <Text style={styles.titleBlue}>account</Text>
            </Text>
            
            <Text style={styles.infoText}>
              Please Complete your profile. {'\n'}Don't worry, your data will remain private and {'\n'}only you can see it.
            </Text>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput 
                  style={styles.inputLine}
                  placeholder="First Name"
                  placeholderTextColor="#999"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput 
                  style={styles.inputLine}
                  placeholder="Last Name"
                  placeholderTextColor="#999"
                  value={lastName}
                  onChangeText={setLastName}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
              </View>
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.inputLine}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
              style={styles.inputLine}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.inputLine}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={24} color="black" />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <View style={styles.rememberMeContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#1C58F2"
                unfillColor="#FFFFFF"
                text="Remember me"
                iconStyle={{ borderColor: "#1C58F2" }}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
                textStyle={{ ...styles.rememberMeText, textDecorationLine: 'none' }}
              />
            </View>

            <Text style={styles.orText}>or</Text>

            <View style={styles.socialLogosContainer}>
              <TouchableOpacity onPress={() => { /* handle Google sign-up */ }}>
                <Image source={images.google} style={styles.socialLogo} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { /* handle Apple sign-up */ }}>
                <Image source={images.apple} style={styles.socialLogo} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { /* handle Facebook sign-up */ }}>
                <Image source={images.facebook} style={styles.socialLogo} />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton3
                title="CONTINUE"
                onPress={handleSignUp}
              />
            </View>
          </View>
        </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  backButton: {
    marginRight: 16,
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
  },
  progressBar: {
    width: '20%', // Adjust this value based on progress
    height: '100%',
    backgroundColor: '#1C58F2',
    borderRadius: 5,
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  titleBlack: {
    color: 'black',
    fontWeight: 'bold',
  },
  titleBlue: {
    color: '#1C58F2',
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    width: '48%',
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
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'none',
  },
  orText: {
    marginVertical: 10,
    color: '#999999',
  },
  socialLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // Adjusted width to reduce space between logos
    marginVertical: 10,
  },
  socialLogo: {
    width: width * 0.25, // Adjusted the size
    height: undefined,
    aspectRatio: 258 / 48, // Maintain aspect ratio
    resizeMode: 'contain',
    marginHorizontal: 10, // Reduced gap between images
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: -10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default CreateAnAccountScreen1;
