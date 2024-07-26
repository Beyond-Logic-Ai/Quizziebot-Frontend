

import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import Feather from 'react-native-vector-icons/Feather'; // Import Feather
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomePageScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const { token } = JSON.parse(userSession);
        const response = await axios.get('https://api.quizziebot.com/api/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUsername(data.username);
        setCoins(data.coins != null ? data.coins : 0);
      } else {
        navigation.navigate('SignInFirst');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData(); // Fetch user data when the screen is focused

      return () => {}; // Cleanup if needed
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserData();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#366EFF" />
      </View>
    );
  }

  return (
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={images.profileImage}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{username || 'Shiva Nagendra'}</Text>
          <View style={styles.coinBadgeContainer}>
            <View style={styles.coinContainer}>
              <Image
                source={images.coinImage}
                style={styles.coinImage}
              />
              <Text style={styles.coinText}>{coins}</Text>
            </View>
            <Image
              source={images.badgeImage}
              style={styles.badgeImage}
            />
          </View>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
        </View>

        <ImageBackground source={images.homepagecoins} style={styles.overlayImage} resizeMode="cover">
          <View style={styles.body}>
            <View style={styles.textBox}>
              <Text style={styles.subtitle}>Unleash the power of AI! Discover quizzes made just for you</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ArcadePage')}>
                <Text style={styles.buttonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        </SafeAreaView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <Feather name="home" size={32} color="#000" />
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="person-outline" size={32} color="#000" />
            <Text style={styles.footerText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Image source={images.trophyicon} style={styles.footerIcon} />
            <Text style={styles.footerText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SettingsHomePageScreen')}>
            <Image source={images.settingsicon} style={styles.footerIcon} />
            <Text style={styles.footerText}>Settings</Text>
          </TouchableOpacity>
        </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    flex: 1,
    marginLeft: 16,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  coinImage: {
    width: 24,
    height: 24,
  },
  coinText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  badgeImage: {
    width: 37,
    height: 37,
  },
  notificationIcon: {
    marginLeft: 16,
    color: '#FFFFFF',
  },
  overlayImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#366EFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 27,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '4%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: wp(3.5),
    borderTopRightRadius: wp(3.5),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingBottom: hp(3),
    paddingHorizontal: '5%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: wp(3),
    color: '#000',
  },
  footerIcon: {
    width: 32,
    height: 32,
  },
});

export default HomePageScreen;
