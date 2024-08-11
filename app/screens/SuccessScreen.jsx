import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton3 from '../components/CustomButton3';
import { images } from '../../constants/images';

const SuccessScreen = ({ navigation }) => {
    // Automatically navigate to HomePageScreen after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('HomePageScreen');
        }, 3000); // 3 seconds delay

        // Cleanup the timer if component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image source={images.successIcon} style={styles.image} resizeMode="contain" />
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.description}>
                    You have successfully reset and created a new password.
                </Text>
                <CustomButton3 title="GO TO HOME" onPress={() => navigation.navigate('HomePageScreen')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        textAlign: 'center',
        color: '#999',
        marginBottom: 32,
    },
});

export default SuccessScreen;
