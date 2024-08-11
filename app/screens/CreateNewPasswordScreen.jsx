import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton3 from '../components/CustomButton3';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CreateNewPasswordScreen = ({ navigation, route }) => {
    const { email, otp } = route.params || {}; // Safely accessing route.params
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    useEffect(() => {
        if (!email || !otp) {
            Alert.alert('Error', 'Email or OTP is missing. Please try again.');
            navigation.goBack();
        }
    }, [email, otp, navigation]);

    const validatePassword = (password) => {
        const regexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        return regexp.test(password);
    };

    const handlePasswordChange = (value) => {
        setNewPassword(value);
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
    };

    const handleContinue = async () => {
        if (!validatePassword(newPassword)) {
            Alert.alert(
                'Invalid Password',
                'Password must be at least 8 characters long, contain at least one digit, one lower case letter, one upper case letter, and one special character.'
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('https://api.quizziebot.com/api/auth/reset-password', {
                email,
                otp,
                newPassword,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Your password has been reset successfully.');
                navigation.navigate('HomePageScreen'); // Navigate to home page after successful password reset
            } else {
                Alert.alert('Error', 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                Alert.alert('Error', error.response.data.message || 'Failed to reset password.');
            } else {
                Alert.alert('Error', 'Failed to reset password. Please check your connection and try again.');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>
                    Create new <Text style={styles.highlightText}>password 🔒</Text>
                </Text>
                <Text style={styles.description}>
                    Save the new password in a safe place, if you forget it then you have to do a forgot password again.
                </Text>
                <Text style={styles.label}>Create a new password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputLine}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        secureTextEntry={!isPasswordVisible}
                        value={newPassword}
                        onChangeText={handlePasswordChange}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                    >
                        <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Confirm new password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputLine}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        secureTextEntry={!isConfirmPasswordVisible}
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    >
                        <Ionicons name={isConfirmPasswordVisible ? "eye" : "eye-off"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <CustomButton3 title="CONTINUE" onPress={handleContinue} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    highlightText: {
        color: '#1C58F2',
    },
    description: {
        textAlign: 'center',
        color: '#999',
        marginBottom: 32,
    },
    label: {
        alignSelf: 'flex-start',
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputLine: {
        flex: 1,
        height: 40,
        borderColor: '#1C58F2',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
});

export default CreateNewPasswordScreen;
