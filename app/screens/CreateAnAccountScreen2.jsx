import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert, FlatList, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton3 from '../components/CustomButton3';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import debounce from 'lodash.debounce';

const { width, height } = Dimensions.get('window');

const generateRandomUsername = (firstName, lastName) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_-';
  let randomUsername = `${firstName}.${lastName}`.toLowerCase();
  for (let i = randomUsername.length; i < 8; i++) {
    randomUsername += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomUsername;
};

const countries = [
  'United States', 'Canada', 'United Kingdom', 'India', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
  // Add more countries here...
];

const CreateAnAccountScreen2 = ({ route, navigation }) => {
  const { firstname, lastname, email, phoneNumber, password, rememberMe, loginType, accountType } = route.params;
  const [username, setUsername] = useState(generateRandomUsername(firstname, lastname));
  const [dob, setDob] = useState(new Date());
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [isSignUpSuccessVisible, setIsSignUpSuccessVisible] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    setUsername(generateRandomUsername(firstname, lastname));
  }, [firstname, lastname]);

  const checkUsernameExists = async (username) => {
    if (username.length < 3 || username.length > 14) {
      setIsUsernameValid(false);
      return;
    }
    setIsCheckingUsername(true);
    try {
      const response = await axios.get(`https://api.quizziebot.com/api/auth/check-identifier?identifier=${username}&identifierType=username`);
      setIsUsernameValid(!response.data.exists);
    } catch (error) {
      console.error('Error checking username:', error);
      setIsUsernameValid(false);
    }
    setIsCheckingUsername(false);
  };

  const debouncedCheckUsernameExists = debounce(checkUsernameExists, 500);

  const handleUsernameChange = (text) => {
    const lowerCaseText = text.toLowerCase();
    if (lowerCaseText.length <= 14) {
      setUsername(lowerCaseText);
      if (lowerCaseText.length >= 3) { // Minimum length for username to check
        debouncedCheckUsernameExists(lowerCaseText);
      } else {
        setIsUsernameValid(null); // Reset if less than minimum length
      }
    }
  };

  const handleFinalSignUp = async () => {
    let valid = true;

    if (!username) {
      setUsernameError('Please enter a username');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!dob) {
      setDobError('Please enter your date of birth');
      valid = false;
    } else {
      setDobError('');
    }

    if (!country) {
      setCountryError('Please select your country');
      valid = false;
    } else {
      setCountryError('');
    }

    if (!gender) {
      setGenderError('Please select your gender');
      valid = false;
    } else {
      setGenderError('');
    }

    if (valid) {
      try {
        const requestBody = {
          email,
          password,
          phoneNumber,
          firstname,
          lastname,
          username,
          gender,
          dob: dob.toISOString(),
          country,
          loginType,
          accountType,
          age: new Date().getFullYear() - dob.getFullYear(),
          rememberMe
        };

        console.log('Sending request to backend with body:', requestBody);

        const response = await axios.post('https://api.quizziebot.com/api/auth/signup', requestBody);

        console.log('Response from backend:', response);

        if (response.status === 201 || response.status === 200) {
          // Log in the user to get the token
          try {
            const loginRequestBody = {
              identifier: email,
              password,
            };
            console.log('Sending login request to backend with body:', loginRequestBody);

            const loginResponse = await axios.post('https://api.quizziebot.com/api/auth/signin', loginRequestBody);

            console.log('Login response from backend:', loginResponse);

            if (loginResponse.status === 200) {
              const userSession = {
                token: loginResponse.data.token,
                userId: loginResponse.data.userId,
                username: requestBody.username,
                coins: 0, // Initialize coins to 0 after signup
              };
              console.log('Saving user session:', userSession);
              await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
              navigation.navigate('HomePageScreen');
            } else {
              Alert.alert('Error', 'Login failed. Please try again.');
            }
          } catch (loginError) {
            console.error('Error during login:', loginError);
            Alert.alert('Error', `Failed to login user: ${loginError.response ? loginError.response.data.message : loginError.message}`);
          }
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        Alert.alert('Error', `Failed to register user: ${error.response ? error.response.data.message : error.message}`);
      }
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setDob(currentDate);
    setShowDatePicker(false); // Hide the picker once the date is selected
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setCountry(item);
      setShowCountryModal(false);
    }}>
      <View style={styles.countryItem}>
        <Text style={styles.countryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '40%' }]}></View>
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

            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputLine}
                placeholder="Enter your username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                maxLength={14}
              />
              {isCheckingUsername ? (
                <ActivityIndicator style={styles.inlineIcon} size="small" color="#1C58F2" />
              ) : (
                isUsernameValid === true ? (
                  <Ionicons name="checkmark-circle" size={24} color="green" style={styles.inlineIcon} />
                ) : isUsernameValid === false ? (
                  <Ionicons name="close-circle" size={24} color="red" style={styles.inlineIcon} />
                ) : null
              )}
            </View>
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.inputLine, { color: dob ? 'black' : '#999' }]}>
                {dob ? dob.toDateString() : 'Enter your date of birth'}
              </Text>
              <Ionicons name="calendar" size={24} color="#1877F2" style={styles.inlineIcon} />
            </TouchableOpacity>
            {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}

            <Text style={styles.label}>Country</Text>
            <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowCountryModal(true)}>
              <Text style={[styles.inputLine, country ? styles.inputSelected : styles.inputPlaceholder]}>
                {country || 'Select Country'}
              </Text>
              <Ionicons name="chevron-down" size={24} color="#1877F2" style={styles.inlineIcon} />
            </TouchableOpacity>
            {countryError ? <Text style={styles.errorText}>{countryError}</Text> : null}

            <Text style={styles.label}>Gender</Text>
            <View style={styles.inputWrapper}>
              <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Other', value: 'Other' },
                ]}
                style={pickerSelectStyles}
                value={gender}
                placeholder={{ label: 'Choose Gender', value: null }}
              />
              <Ionicons name="chevron-down" size={24} color="#1877F2" style={styles.inlineIcon} />
            </View>
            {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}

            <View style={styles.buttonContainer}>
              <CustomButton3
                title="SIGN UP"
                onPress={handleFinalSignUp}
              />
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={showCountryModal}
          onRequestClose={() => setShowCountryModal(false)}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Your Country or Region</Text>
                <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                  <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={countries}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.countryList}
              />
            </View>
          </View>
        </Modal>

        {showDatePicker && (
          <Modal
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={dob}
                  mode="date"
                  display="spinner"
                  onChange={onChangeDate}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                />
                <TouchableOpacity
                  onPress={() => setShowDatePicker(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {isSignUpSuccessVisible && (
          <SignUpSuccessScreen visible={isSignUpSuccessVisible} />
        )}
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
  label: {
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputLine: {
    flex: 1,
    height: 40,
    borderColor: '#1C58F2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: 'black',
  },
  inputPlaceholder: {
    color: '#999',
  },
  inputSelected: {
    color: 'black',
  },
  inlineIcon: {
    position: 'absolute',
    right: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countryList: {
    width: '100%',
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  countryText: {
    fontSize: 16,
    color: 'black',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: '#1877F2',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    height: 40,
    borderColor: '#1C58F2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: 'black',
  },
  inputAndroid: {
    flex: 1,
    height: 40,
    borderColor: '#1C58F2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: 'black',
  },
  placeholder: {
    color: '#999',
  },
});

export default CreateAnAccountScreen2;
