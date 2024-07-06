import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton3 from '../components/CustomButton3';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const { width, height } = Dimensions.get('window');

const CreateAnAccountScreen2 = ({ route, navigation }) => {
  const { firstName, lastName, email, password, rememberMe } = route.params;
  const [username, setUsername] = useState(`${firstName}.${lastName}`);
  const [dob, setDob] = useState(new Date());
  const [country, setCountry] = useState('United States');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [genderError, setGenderError] = useState('');

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
      setCountryError('Please enter your country');
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
        const response = await axios.post('http://<YOUR_BACKEND_URL>/api/users/register', {
          firstName,
          lastName,
          email,
          password,
          rememberMe,
          username,
          dob,
          country,
          gender
        });
        if (response.status === 201) {
          Alert.alert('Success', 'User registered successfully');
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to register user');
      }
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
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
                onChangeText={setUsername}
              />
              <Ionicons name="checkmark-circle" size={24} color="green" style={styles.inlineIcon} />
            </View>
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.inputLine}
                placeholder="Enter your date of birth"
                placeholderTextColor="#999"
                value={dob.toDateString()}
                onFocus={() => setShowDatePicker(true)}
              />
              <Ionicons name="calendar" size={24} color="#1877F2" style={styles.inlineIcon} onPress={() => setShowDatePicker(true)} />
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}

            <Text style={styles.label}>Country</Text>
            <View style={styles.inputWrapper}>
              <RNPickerSelect
                onValueChange={(value) => setCountry(value)}
                items={[
                  { label: 'United States', value: 'United States' },
                  { label: 'Canada', value: 'Canada' },
                  { label: 'United Kingdom', value: 'United Kingdom' },
                  // Add more countries as needed
                  { label: 'India', value: 'India' },
                  { label: 'Australia', value: 'Australia' },
                  { label: 'Germany', value: 'Germany' },
                  { label: 'France', value: 'France' },
                  { label: 'Italy', value: 'Italy' },
                  { label: 'Brazil', value: 'Brazil' },
                  { label: 'Japan', value: 'Japan' },
                  { label: 'China', value: 'China' },
                  { label: 'Russia', value: 'Russia' },
                  { label: 'South Africa', value: 'South Africa' },
                  { label: 'Mexico', value: 'Mexico' },
                  // Continue adding as needed
                ]}
                style={{
                  inputIOS: styles.inputLine,
                  inputAndroid: styles.inputLine
                }}
                value={country}
                placeholder={{}}
              />
              <Ionicons name="chevron-down" size={24} color="#1877F2" style={styles.inlineIcon} />
            </View>
            {countryError ? <Text style={styles.errorText}>{countryError}</Text> : null}

            <Text style={styles.label}>Gender</Text>
            <View style={styles.inputWrapper}>
              <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Other', value: 'Other' },
                  // Add more gender options as needed
                ]}
                style={{
                  inputIOS: styles.inputLine,
                  inputAndroid: styles.inputLine
                }}
                value={gender}
                placeholder={{}}
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
});

export default CreateAnAccountScreen2;


