import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton3 from '../components/CustomButton3';

const OtpVerificationScreen = ({ navigation, route }) => {
    const { email } = route.params || {}; // Ensure email is passed from previous screen
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [resendTimeout, setResendTimeout] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true); // State to manage resend button
    const otpInputs = useRef([]); // Use useRef to create a ref array

    useEffect(() => {
        if (!email) {
            Alert.alert('Error', 'Email is missing. Please go back and try again.');
            navigation.goBack();
        }

        const timer = setInterval(() => {
            setResendTimeout((prevTimeout) => {
                if (prevTimeout === 0) {
                    clearInterval(timer);
                    setResendDisabled(false); // Enable resend button after timeout
                    return prevTimeout;
                }
                return prevTimeout - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Clear timer on component unmount
    }, [email, navigation]);

    const handleOtpChange = (index, value) => {
        if (/^\d*$/.test(value)) { // Ensure only numbers are entered
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 5) {
                otpInputs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (event) => {
        const pastedOtp = event.nativeEvent.text.split('').filter(char => /^\d$/.test(char)).slice(0, 6);
        if (pastedOtp.length === 6) {
            setOtp(pastedOtp);
            otpInputs.current[5].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                otpInputs.current[index - 1].focus();
            }
        }
    };

    const handleConfirmOtp = () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            Alert.alert('Error', 'Please enter the 6-digit OTP.');
            return;
        }

        // Simulate OTP verification logic here
        Alert.alert('OTP Verified', `The entered OTP is: ${otpCode}`);
        navigation.navigate('CreateNewPasswordScreen', { email, otp: otpCode });
    };

    const handleResendCode = () => {
        // Simulate the resend logic
        Alert.alert('Code Resent', 'A new OTP has been generated (simulated).');
        setResendDisabled(true);
        setResendTimeout(60); // Restart the countdown

        const timer = setInterval(() => {
            setResendTimeout((prevTimeout) => {
                if (prevTimeout === 0) {
                    clearInterval(timer);
                    setResendDisabled(false); // Enable resend button after timeout
                    return prevTimeout;
                }
                return prevTimeout - 1;
            });
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>
                    You’ve got <Text style={styles.highlightText}>mail 📧</Text>
                </Text>
                <Text style={styles.description}>
                    We have sent the OTP verification code to your email address. Check your email and enter the code below.
                </Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (otpInputs.current[index] = el)} // Save reference to each TextInput
                            style={styles.otpInput}
                            keyboardType="numeric"
                            maxLength={1} // Limit to one character per box
                            value={digit}
                            onChangeText={(value) => handleOtpChange(index, value)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            placeholder="0"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onPaste={handlePaste}
                        />
                    ))}
                </View>
                <TouchableOpacity onPress={handleResendCode} disabled={resendDisabled}>
                    <Text style={[styles.resendText, { color: resendDisabled ? '#999' : '#1C58F2' }]}>
                        {resendTimeout > 0 ? `You can resend code in ${resendTimeout}s` : "Didn't receive email? Resend code"}
                    </Text>
                </TouchableOpacity>
                <CustomButton3 title="CONFIRM" onPress={handleConfirmOtp} />
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#1C58F2',
        textAlign: 'center',
        fontSize: 24,
    },
    resendText: {
        color: '#1C58F2',
        marginBottom: 20,
    },
});

export default OtpVerificationScreen;
