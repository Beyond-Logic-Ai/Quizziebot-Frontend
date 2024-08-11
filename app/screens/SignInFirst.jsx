import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton3 from '../components/CustomButton3';
import { images } from '../../constants/images';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Ensure that WebBrowser is properly configured for Google Sign-In
WebBrowser.maybeCompleteAuthSession();

const SignInFirst = ({ navigation }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Google Sign-In configuration
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: 'com.googleusercontent.apps.608340923812-dctjjsforifedvf0fp2817vekig17hsn', // Replace with your iOS client ID
    });

    useEffect(() => {
        const checkSession = async () => {
            const userSession = await AsyncStorage.getItem('userSession');
            if (userSession) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePageScreen' }],
                });
            }
        };
        checkSession();

        if (response?.type === 'success') {
            const { id_token } = response.params;
            handleGoogleSignIn(id_token);
        }
    }, [navigation, response]);

    const handleGoogleSignIn = async (idToken) => {
        try {
            const response = await axios.post('https://api.quizziebot.com/api/auth/google', { idToken });

            if (response.status === 200) {
                const userSession = {
                    token: response.data.token,
                    username: response.data.username,
                    coins: response.data.coins || 0,
                };
                await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePageScreen', params: { user: userSession } }],
                });
            } else {
                Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to sign in. Please check your connection and try again.');
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSignIn = async () => {
        let valid = true;
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            try {
                const response = await axios.post('https://api.quizziebot.com/api/auth/signin', { identifier: email, password });

                if (response.status === 200) {
                    const userSession = {
                        token: response.data.token,
                        username: response.data.username,
                        coins: response.data.coins || 0,
                    };
                    await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomePageScreen', params: { user: userSession } }],
                    });
                } else {
                    Alert.alert('Error', 'Invalid credentials. Please try again.');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    Alert.alert('Invalid Credentials', 'The email or password you entered is incorrect. Please try again.');
                } else {
                    Alert.alert('Error', 'Failed to sign in. Please check your connection and try again.');
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
                <Image source={images.logo3} style={styles.robotImage} resizeMode="contain" />
                    </View>
                        

                        

                        
                        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.innerContainer}>
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
                            autoCapitalize="none"
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
                                textStyle={styles.rememberMeText}
                            />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        
                        </View>
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <CustomButton3
                                title="SIGN IN"
                                onPress={handleSignIn}
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
//   backButton: {
//     alignSelf: 'flex-start',
//     margin: 16,
//   },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

    marginBottom:hp(6)
    
  },
  
  signInText: {
    flexDirection: 'row',
    fontSize: wp(7),
    fontWeight:"bold",
    fontFamily: 'Nunito',
    top:-hp(6)
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
    fontWeight:"bold"
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
    marginVertical: wp(2),
    
  },
  rememberMeText: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight:"bold",
    color: '#000',
    marginLeft:-wp(1),
    textDecorationLine: 'none',
    
  },
  forgotPasswordText: {
    color: '#1C58F2',
    fontSize:wp(4),
    alignSelf: 'flex-end',
    marginTop:hp(5),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  orText: {
    color: '#999999',
    fontSize: wp(2)
  },
  socialLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(2),
    backgroundColor: '#FFF',
    paddingBottom: hp(2),
    paddingHorizontal: wp(-1),
    marginHorizontal: wp(-2)
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom:wp(4)
  },
});

export default SignInFirst;
