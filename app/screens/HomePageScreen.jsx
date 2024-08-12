import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CreateQuizzieButton from '../components/CreateQuizzieButton';

const { width, height } = Dimensions.get('window');

// Import your profile images
import maleProfilePic from '../../assets/images/profile-male.png';
import femaleProfilePic from '../../assets/images/profile-female.png';

// Import your badge images
import BronzeStar from '../../assets/images/BronzeStar.png';
import SilverStar from '../../assets/images/SilverStar.png';
import BronzeShield from '../../assets/images/BronzeShield.png';
import GoldWings from '../../assets/images/GoldWings.png';
import PlatinumWings from '../../assets/images/PlatinumWings.png';

const HomePageScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deferredLoading, setDeferredLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(maleProfilePic); // Default to male profile picture
  const [badgeImage, setBadgeImage] = useState(BronzeStar); // Default badge image

  const leagueToBadgeImage = {
    BronzeStar: BronzeStar,
    SilverStar: SilverStar,
    BronzeShield: BronzeShield,
    GoldWings: GoldWings,
    PlatinumWings: PlatinumWings,
  };

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

        // Set the profile picture based on gender
        if (data.gender === 'Female') {
          setProfilePic(femaleProfilePic);
        } else {
          setProfilePic(maleProfilePic);
        }

        // Set the badge image based on the league
        if (data.league && leagueToBadgeImage[data.league]) {
          setBadgeImage(leagueToBadgeImage[data.league]);
        }

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
    <ImageBackground source={images.homescreenbg11} style={styles.backgroundImage} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={profilePic} style={styles.profileImage} />
          <Text style={styles.username}>{username || 'User Not Found'}</Text>
          
          <View style={styles.coinContainer}>
            <Text style={styles.coinText}>{coins}</Text>
            <View style={styles.coinborder}>
              <Image source={images.coin} style={styles.coinImage} />
            </View>
          </View>
          
          <Image source={badgeImage} style={styles.badgeImage} />
          <TouchableOpacity  onPress={() => navigation.navigate('SettingsHomePageScreen')}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        {deferredLoading && (
          
            <View style={styles.body}>
              <View style={styles.textBox}>
                <Text style={styles.subtitle}>Unleash the power of AI! Discover {'\n'}quizzes made just for you</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ArcadePage')} style={styles.play}>
                  <LinearGradient
                    colors={['#9DFF4F', '#1ABD00']}
                    
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Play Now</Text>
                  </LinearGradient>                  
                </TouchableOpacity>
                <CreateQuizzieButton
                  // title="Create your own quiz by QUIZZIE BOT"
                  screenName="CreatingOwnQuizPage"
                  navigation={navigation}
                />
              </View>
            </View>
         
        )}
      </SafeAreaView>
      {deferredLoading && <Footer navigation={navigation} />}
    </ImageBackground>
  );
};

const Footer = ({ navigation }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.footerButton}>
      <Fontisto name="home" size={32} color="#000" />
      <Text style={styles.footerText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ProfilePage')}>
      <Ionicons name="person-outline" size={32} color="#000" />
      <Text style={styles.footerText}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('LeaderBoard')}>
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
    padding: hp(1.5),
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  profileImage: {
    width: 43,
    height: 43,
    borderRadius: 22,
    marginLeft:wp(2)
  },
  username: {
    flex: 0.95,
    marginLeft: 7,
    color: '#FFFFFF',
    fontSize: wp(4.5),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  coinContainer: {
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp(3.5),
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  coinborder: {
    right: -2,
    backgroundColor: '#1C58F2',
    width: 27,
    height: 27,
    borderRadius: 15,
    alignItems: "center"
  },
  coinImage: {
    top: 2,
    alignSelf: "center",
    width: 22,
    height: 22,
  },
  coinText: {
    left: -4,
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Nunito',
  },
  badgeImage: {
    marginLeft: 7,
    left:5,
    width: 37,
    height: 37,
  },
  notificationIcon: {
    marginLeft: 7,
    fontSize: 27,
    color: '#FFFFFF',
    
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
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: wp(6),
    width:wp(82),
    // paddingHorizontal: wp(1),
    paddingVertical:wp(3),
    alignItems: 'center',
    marginBottom: -wp(3)
  },
  subtitle: {
    fontSize: wp(4),
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#366EFF',
    width: wp(72),
    alignItems:"center",
    height: wp(14),
    borderRadius:wp(4),
    
  },
  play: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: wp(6.5),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    marginTop:wp(2.9)
    
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
    top:4,
    fontSize: wp(3),
    color: '#000',
    fontFamily: 'Nunito',
  },
  footerIcon: {
    fontSize: 32,
  },
});

export default HomePageScreen;
