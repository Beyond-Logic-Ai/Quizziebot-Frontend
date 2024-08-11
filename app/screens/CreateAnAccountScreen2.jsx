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
import * as Notifications from 'expo-notifications';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

// Function to generate a username like (firstname) + (_ or -) + (numbers)
const generateRandomUsername = (firstName) => {
  const randomNumber = Math.floor(Math.random() * 10000); // Generates a random number between 0 and 9999
  const separator = Math.random() < 0.5 ? '_' : '-'; // Randomly choose between '_' and '-'
  const username = `${firstName}${separator}${randomNumber}`;
  return username.toLowerCase();
};

const countries = [
  'United States', 'Canada', 'United Kingdom', 'India', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
  // Add more countries here...
];

const CreateAnAccountScreen2 = ({ route, navigation }) => {
  const { firstname, lastname, email, phoneNumber, password, rememberMe, loginType, accountType } = route.params;
  const [username, setUsername] = useState(generateRandomUsername(firstname));
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
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    setUsername(generateRandomUsername(firstname));
    registerForPushNotificationsAsync();
  }, [firstname, lastname]);

  // Function to register for push notifications and get the fcmToken
  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync({
        projectId: '94b07c5a-a102-4d27-b5eb-4c6eb9659a2e', // Replace with your actual project ID
      })).data;
      
      // Remove the "ExponentPushToken[" prefix and "]" suffix
      const cleanedToken = token.replace(/^ExponentPushToken\[(.*)\]$/, '$1');
      console.log('Cleaned FCM Token:', cleanedToken);
      setFcmToken(cleanedToken); // Save the cleaned fcmToken in the state
    } catch (error) {
      console.error('Error getting FCM token:', error);
      Alert.alert('Error', 'Unable to retrieve FCM Token. Please try again.');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

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
      if (lowerCaseText.length >= 3) {
        debouncedCheckUsernameExists(lowerCaseText);
      } else {
        setIsUsernameValid(null);
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

    if (!fcmToken) {
      Alert.alert('Error', 'Unable to retrieve FCM Token. Please try again.');
      valid = false;
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
          rememberMe,
          fcmToken // Include the cleaned fcmToken in the request body
        };

        console.log('Sending request to backend with body:', requestBody);

        const response = await axios.post('https://api.quizziebot.com/api/auth/signup', requestBody);

        console.log('Response from backend:', response);

        if (response.status === 201 || response.status === 200) {
          try {
            const loginRequestBody = {
              identifier: email,
              password,
            };

            console.log('Sending login request to backend with body:', loginRequestBody);

            const loginResponse = await axios.post('https://api.quizziebot.com/api/auth/signin', loginRequestBody);

            console.log('Login response from backend:', loginResponse.data);

            const userSession = {
              token: loginResponse.data.token,
              userId: loginResponse.data.userId || loginResponse.data.user?.id, // Adjust if necessary
              username: requestBody.username,
              coins: 0,
              fcmToken: fcmToken, // Add the cleaned fcmToken here
            };

            console.log('Saving user session:', userSession);
            await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
            navigation.navigate('SignUpSuccessScreen');
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
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '40%' }]}></View>
          </View>
        </View>
        <Text style={styles.title}>
          <Text style={styles.titleBlack}>Create an </Text>
          <Text style={styles.titleBlue}>account</Text>
        </Text>
        <Text style={styles.infoText}>
          Please Complete your profile. {'\n'}Don't worry, your data will remain private and {'\n'}only you can see it.
        </Text>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.innerContainer}>
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
            <View style={styles.inputWrapper1}>
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
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton3
            title="SIGN UP"
            onPress={handleFinalSignUp}
          />
        </View>

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
    flexGrow: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: hp(2),
  },
  backButton: {
    marginRight: 16,
  },
  progressBarContainer: {
    flex: 0.65,
    height: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: wp(3),
    marginLeft: wp(14.5),
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1C58F2',
    borderRadius: wp(3),
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -wp(3),
  },
  title: {
    alignSelf: "center",
    fontSize: wp(6.5),
    fontFamily: 'Nunito',
    marginBottom: hp(1.5),
    marginTop: hp(3)
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
    marginTop: hp(0.5),
    marginBottom: hp(2),
    color: '#212121',
    fontSize: wp(3.8),
    fontFamily: 'Nunito',
    lineHeight: 22,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp(3)
  },
  inputLine: {
    flex: 1,
    height: 40,
    borderColor: '#1C58F2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: wp(3),
    color: 'black',
    fontFamily: 'Nunito',
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
    marginBottom: wp(4)
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
