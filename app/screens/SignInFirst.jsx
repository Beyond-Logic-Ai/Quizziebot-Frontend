// import React, { useState } from 'react';
// import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
// import CustomButton3 from '../components/CustomButton3'; // Ensure correct import
// import { images } from '../../constants/images'; // Ensure the path is correct
// import BouncyCheckbox from "react-native-bouncy-checkbox"; // Use react-native-bouncy-checkbox

// const { width, height } = Dimensions.get('window');

// const SignInFirst = ({ navigation }) => {
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 6;
//   };

//   const handleSignIn = () => {
//     let valid = true;
//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address');
//       valid = false;
//     } else {
//       setEmailError('');
//     }

//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters long');
//       valid = false;
//     } else {
//       setPasswordError('');
//     }

//     if (valid) {
//       navigation.navigate('Home'); // Update this to the correct screen name
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <View style={styles.innerContainer}>
//             <Image source={images.logo3} style={styles.image} resizeMode="contain" />

//             <Text style={styles.signInText}>
//               <Text style={styles.signInTextBlack}>Sign in to </Text>
//               <Text style={styles.signInTextBlue}>Quizzie Bot</Text>
//             </Text>

//             <Text style={styles.label}>Email</Text>
//             <TextInput 
//               style={styles.inputLine}
//               placeholder="Enter your email"
//               placeholderTextColor="#999"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />
//             {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//             <Text style={styles.label}>Password</Text>
//             <View style={styles.passwordContainer}>
//               <TextInput 
//                 style={styles.inputLine}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!isPasswordVisible}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setPasswordVisible(!isPasswordVisible)}
//               >
//                 <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={24} color="black" />
//               </TouchableOpacity>
//             </View>
//             {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

//             <View style={styles.rememberMeContainer}>
//               <BouncyCheckbox
//                 size={25}
//                 fillColor="#1C58F2"
//                 unfillColor="#FFFFFF"
//                 text="Remember me"
//                 iconStyle={{ borderColor: "#1C58F2" }}
//                 innerIconStyle={{ borderWidth: 2 }}
//                 isChecked={rememberMe}
//                 onPress={() => setRememberMe(!rememberMe)}
//                 textStyle={styles.rememberMeText}
//               />
//             </View>

//             <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <Text style={styles.orText}>or</Text>

//             <View style={styles.socialLogosContainer}>
//               <Image source={images.logo4} style={styles.socialLogo} />
//             </View>

//             <CustomButton3
//               title="SIGN IN"
//               onPress={handleSignIn}
//             />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollViewContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     margin: 16,
//   },
//   innerContainer: {
//     width: '90%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: '80%',
//     height: height * 0.15,
//     marginVertical: 20,
//   },
//   signInText: {
//     flexDirection: 'row',
//     fontSize: 24,
//     marginVertical: 10,
//   },
//   signInTextBlack: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   signInTextBlue: {
//     color: '#1C58F2',
//     fontWeight: 'bold',
//   },
//   label: {
//     alignSelf: 'flex-start',
//     color: 'black',
//     fontWeight: 'bold',
//     marginBottom: 5,
//     fontSize: 16,
//   },
//   inputLine: {
//     width: '100%',
//     height: 40,
//     borderColor: '#1C58F2',
//     borderBottomWidth: 1,
//     paddingHorizontal: 10,
//     marginVertical: 10,
//   },
//   passwordContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 10,
//   },
//   rememberMeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     marginVertical: 10,
//   },
//   rememberMeText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#000',
//   },
//   forgotPasswordText: {
//     color: '#1C58F2',
//     alignSelf: 'flex-end',
//     marginVertical: 10,
//     fontWeight: 'bold',
//   },
//   orText: {
//     marginVertical: 10,
//     color: '#999999',
//   },
//   socialLogosContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '90%',
//     marginVertical: 10,
//   },
//   socialLogo: {
//     width: '35%', // Adjusted to make the logos bigger
//     height: undefined,
//     aspectRatio: 258 / 48, // Maintain aspect ratio
//   },
//   errorText: {
//     color: 'red',
//     alignSelf: 'flex-start',
//     marginTop: -10,
//     marginBottom: 10,
//   },
// });

// export default SignInFirst;



import React, { useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
import CustomButton3 from '../components/CustomButton3'; // Ensure correct import
import { images } from '../../constants/images'; // Ensure the path is correct
import BouncyCheckbox from "react-native-bouncy-checkbox"; // Use react-native-bouncy-checkbox

const { width, height } = Dimensions.get('window');

const SignInFirst = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignIn = () => {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      navigation.navigate('Home'); // Update this to the correct screen name
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

            <Text style={styles.signInText}>
              <Text style={styles.signInTextBlack}>Sign in to </Text>
              <Text style={styles.signInTextBlue}>Quizzie Bot</Text>
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
                textStyle={styles.rememberMeText}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <View style={styles.socialLogosContainer}>
              <Image source={images.logo4} style={styles.socialLogo} />
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton3
                title="SIGN IN"
                onPress={handleSignIn}
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
    // flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 16,
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: '80%',
    height: height * 0.15,
    marginVertical: 10,
  },
  signInText: {
    flexDirection: 'row',
    fontSize: 24,
    marginVertical: 10,
  },
  signInTextBlack: {
    color: 'black',
    fontWeight: 'bold',
  },
  signInTextBlue: {
    color: '#1C58F2',
    fontWeight: 'bold',
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

export default SignInFirst;

