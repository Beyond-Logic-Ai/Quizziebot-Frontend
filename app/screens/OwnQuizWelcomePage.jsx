import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const OwnQuizWelcomePage = ({ navigation }) => {
  const [sessionId, setSessionId] = useState(null);
  
  useEffect(() => {
    const startSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const storedUserId = await AsyncStorage.getItem('userId');
        
        if (userSession && storedUserId) {
          const { token } = JSON.parse(userSession);

          const response = await axios.post(
            `https://api.quizziebot.com/api/chat/startSession?userId=${storedUserId}`, 
            {}, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSessionId(response.data.id);
        } else {
          navigation.navigate('SignInFirst');
        }
      } catch (error) {
        console.error('Failed to start session:', error);
      }
    };

    startSession();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={wp(6)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.closeText}>Close</Text>
      </View>
      
      <View style={styles.robotImageContainer}>
        <Svg height="75%" width="75%" viewBox="0 0 100 100" style={styles.gradient}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="47%"
              cy="50%"
              r="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="40%" stopColor="#6F98DB" stopOpacity="1" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
        </Svg>
        <Image source={images.logo2} style={styles.robotImage} />
      </View>
      
      <Text style={styles.title}>Welcome to{'\n'}Quizzie Bot</Text>

      <View style={styles.bottomContainer}>
        <Text style={styles.subtitle}>Ask anything, get your answer</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type Here.."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('OwnQuizChatPage', { sessionId })}>
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  closeText: {
    marginLeft: wp(8),
    fontSize: wp(5),
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  robotImageContainer: {
    width: hp(20),
    height: hp(22),
    borderRadius: wp(17.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: wp(7),
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  robotImage: {
    width: hp(20),
    height: hp(20),
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: hp(4),
    color: '#000',
    marginTop: wp(4),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: hp(4),
    width: wp(100),
    alignItems: 'center',
  },
  subtitle: {
    fontSize: hp(2),
    fontFamily: 'Nunito',
    marginBottom: hp(3),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    height: hp(6),
    backgroundColor: '#f0f0f0',
    borderRadius: wp(1),
    paddingHorizontal: wp(2),
    borderWidth: wp(.2),
    borderColor: '#ccc',
    marginBottom:hp(2)
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    
  },
  sendButton: {
    backgroundColor: '#0048BF',
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
  },
});

export default OwnQuizWelcomePage;
