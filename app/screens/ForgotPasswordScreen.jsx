import React, { useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
import CustomButton3 from '../components/CustomButton3'; // Ensure correct import
import { images } from '../../constants/images'; // Ensure the path is correct
import CreateNewPasswordScreen from './CreateNewPasswordScreen';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleContinue = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      // Continue to the next step
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
            <Image source={images.logo3} style={styles.image} resizeMode="contain" />
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
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <CustomButton3
            title="CONTINUE"
            onPress="CreateNewPassword"
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

// for AfterSignedScreen.jsx

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// const AccountTypeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.progressBar}>
//         <View style={styles.progress} />
//       </View>
//       <Text style={styles.title}>
//         What type of account do you like to <Text style={styles.createText}>create</Text> ? 🤓
//       </Text>
//       <Text style={styles.subtitle}>You can skip it if you're not sure.</Text>

//       <TouchableOpacity style={[styles.optionButton, styles.personal]}>
//         <Text style={styles.optionText}>Personal</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.optionButton, styles.teacher]}>
//         <Text style={styles.optionText}>Teacher</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.optionButton, styles.student]}>
//         <Text style={styles.optionText}>Student</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.optionButton, styles.professional]}>
//         <Text style={styles.optionText}>Professional</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.skipButton}>
//         <Text style={styles.skipButtonText}>SKIP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   progressBar: {
//     height: 4,
//     backgroundColor: '#eee',
//     borderRadius: 2,
//     marginVertical: 20,
//     overflow: 'hidden',
//   },
//   progress: {
//     width: '50%',
//     height: '100%',
//     backgroundColor: '#3b82f6',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   createText: {
//     color: '#3b82f6',
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 20,
//   },
//   optionButton: {
//     height: 60,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 5,
//     flexDirection: 'row',
//     paddingHorizontal: 15,
//   },
//   optionText: {
//     fontSize: 18,
//     color: '#fff',
//   },
//   personal: {
//     backgroundColor: '#3b82f6',
//   },
//   teacher: {
//     backgroundColor: '#f59e0b',
//   },
//   student: {
//     backgroundColor: '#10b981',
//   },
//   professional: {
//     backgroundColor: '#ef4444',
//   },
//   skipButton: {
//     marginTop: 20,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#3b82f6',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   skipButtonText: {
//     fontSize: 18,
//     color: '#fff',
//   },
// });

// export default AccountTypeScreen;
