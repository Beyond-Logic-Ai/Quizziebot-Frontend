import React, { useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton3 from '../components/CustomButton3';
import { images } from '../../constants/images';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import debounce from 'lodash.debounce';

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
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingPhoneNumber, setIsCheckingPhoneNumber] = useState(false);

  const validateEmailFormat = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumberFormat = (phoneNumber) => {
    const re = /^[0-9]{10}$/;
    return re.test(phoneNumber);
  };

  const checkIdentifier = async (identifier, type) => {
    try {
      const response = await axios.get(`https://api.quizziebot.com/api/auth/check-identifier?identifier=${identifier}&identifierType=${type}`);
      return !response.data.exists;
    } catch (error) {
      console.error(`Error checking ${type}:`, error);
      return false;
    }
  };

  const debouncedCheckEmail = debounce(async (email) => {
    if (validateEmailFormat(email)) {
      setIsCheckingEmail(true);
      const isValid = await checkIdentifier(email, 'email');
      setIsEmailValid(isValid);
      setIsCheckingEmail(false);
    } else {
      setIsEmailValid(false);
    }
  }, 500);

  const debouncedCheckPhoneNumber = debounce(async (phoneNumber) => {
    if (validatePhoneNumberFormat(phoneNumber)) {
      setIsCheckingPhoneNumber(true);
      const isValid = await checkIdentifier(phoneNumber, 'phoneNumber');
      setIsPhoneNumberValid(isValid);
      setIsCheckingPhoneNumber(false);
    } else {
      setIsPhoneNumberValid(false);
    }
  }, 500);

  const handleEmailChange = (text) => {
    setEmail(text);
    debouncedCheckEmail(text);
  };

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(formattedText);
    debouncedCheckPhoneNumber(formattedText);
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

    if (!validateEmailFormat(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePhoneNumberFormat(phoneNumber)) {
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

    if (valid && isEmailValid && isPhoneNumberValid) {
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
              </View>
            </View>

            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.inputLine}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {isCheckingEmail ? (
                <ActivityIndicator style={styles.inlineIcon} size="small" color="#1C58F2" />
              ) : (
                isEmailValid === true ? (
                  <Ionicons name="checkmark-circle" size={24} color="green" style={styles.inlineIcon} />
                ) : isEmailValid === false ? (
                  <Ionicons name="close-circle" size={24} color="red" style={styles.inlineIcon} />
                ) : null
              )}
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.inputLine}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                autoCapitalize="none"
                maxLength={10} // Ensure maximum length is 10 digits
              />
              {isCheckingPhoneNumber ? (
                <ActivityIndicator style={styles.inlineIcon} size="small" color="#1C58F2" />
              ) : (
                isPhoneNumberValid === true ? (
                  <Ionicons name="checkmark-circle" size={24} color="green" style={styles.inlineIcon} />
                ) : isPhoneNumberValid === false ? (
                  <Ionicons name="close-circle" size={24} color="red" style={styles.inlineIcon} />
                ) : null
              )}
            </View>
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
                autoCapitalize="none"
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    justifyContent: 'space-around',
    paddingVertical: hp(1),
    backgroundColor: '#FFF',
    marginHorizontal: wp(2)
  },
  socialLogo: {
    width: hp(4),
    height: hp(4),
    marginHorizontal: wp(4),
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: -10,
    marginBottom: 10,
  },
  inlineIcon: {
    position: 'absolute',
    right: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default CreateAnAccountScreen1;
