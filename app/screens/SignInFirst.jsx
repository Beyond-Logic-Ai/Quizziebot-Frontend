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

                        <Text style={styles.orText}>or</Text>

                        <View style={styles.socialLogosContainer}>
                            <TouchableOpacity onPress={() => promptAsync()}>
                                <Image source={images.google} style={styles.socialLogo} />
                            </TouchableOpacity>
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
    marginVertical: 20,
  },
});

export default SignInFirst;
