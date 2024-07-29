import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const HomePageScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deferredLoading, setDeferredLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
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
        
        await AsyncStorage.setItem('userId', data.userId);
      } else {
        navigation.navigate('SignInFirst');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();

      const interval = setInterval(() => {
        fetchUserData();
      }, 30000);

      return () => clearInterval(interval);
    }, [fetchUserData])
  );

  useEffect(() => {
    if (!loading) {
      // Defer loading of additional content
      setTimeout(() => {
        setDeferredLoading(true);
      }, 500); // Adjust this delay as needed
    }
  }, [loading]);

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
          <Image source={images.profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{username || 'Shiva Nagendra'}</Text>
          <View style={styles.coinBadgeContainer}>
            <View style={styles.coinContainer}>
              <Text style={styles.coinText}>{coins}</Text>
              <Image source={images.coinImage} style={styles.coinImage} />
            </View>
          </View>
          <Image source={images.badge} style={styles.badgeImage} />
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
        </View>

        {deferredLoading && (
          <ImageBackground source={images.homepagecoins} style={styles.overlayImage} resizeMode="cover">
            <View style={styles.body}>
              <View style={styles.textBox}>
                <Text style={styles.subtitle}>Unleash the power of AI! Discover quizzes made just for you</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ArcadePage')} style={styles.play}>
                  <LinearGradient
                    colors={['#366EFF', '#0044F2']}
                    start={{ x: 0.5, y: 0.15 }}
                    end={{ x: 0.5, y: 0.6 }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Play Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      </SafeAreaView>
      {deferredLoading && <Footer navigation={navigation} />}
    </ImageBackground>
  );
};

const Footer = ({ navigation }) => (
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
      <Ionicons name="trophy-outline" style={styles.footerIcon} />
      <Text style={styles.footerText}>Leaderboard</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SettingsHomePageScreen')}>
      <Ionicons name="options-outline" style={styles.footerIcon} />
      <Text style={styles.footerText}>Settings</Text>
    </TouchableOpacity>
  </View>
);

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
    borderColor: 'black',
    borderWidth: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
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
    borderColor: 'black',
    borderWidth: 2,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 0,
    borderColor: 'black',
    borderWidth: 2,
  },
  coinImage: {
    width: 20,
    height: 24,
    borderColor: 'black',
    borderWidth: 2,
  },
  coinText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  badgeImage: {
    marginLeft: 7,
    width: 37,
    height: 37,
    borderColor: 'black',
    borderWidth: 2,
  },
  notificationIcon: {
    marginLeft: 7,
    fontSize: 29,
    color: '#FFFFFF',
    borderColor: 'black',
    borderWidth: 2,
  },
  overlayImage: {
    flex: 1,
    textAlign: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: wp(4.8),
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#366EFF',
    width: 250,
    height: 48,
    borderRadius: wp(9),
    borderColor: '#031952',
    borderWidth: 0.1,
  },
  play: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: wp(6),
    fontWeight: 'bold',
    marginTop: 7,
    fontFamily: 'Nunito',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '4%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingBottom: hp(4),
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
    fontSize: 32,
  },
});

export default HomePageScreen;
