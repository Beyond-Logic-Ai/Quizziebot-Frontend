
import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const ProfilePage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deferredLoading, setDeferredLoading] = useState(false);
  const achievements = [
    { id: 1, label: 'Quizzle', value: '85', icon: images.logo1 },
    { id: 2, label: 'Lifetime Point', value: '245,679', icon: images.coins },
    { id: 3, label: 'Quiz Passed', value: '124', icon: images.quizpassedimg },
    { id: 4, label: 'Top 3 Positions', value: '38', icon: images.top3img },
    { id: 5, label: 'Challenge Passed', value: '269', icon: images.challengepassedimg },
    { id: 6, label: 'Fastest Record', value: '72', icon: images.avgtime },
  ];

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
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover" blurRadius={22}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.coinContainer}>
              <Text style={styles.coinText}>{coins}</Text>
              <View style={styles.coinborder}>
                <Image source={images.coin} style={styles.coinImage} />
              </View>
            </View>
            <Image source={images.badge} style={styles.badgeImage} />
            <TouchableOpacity onPress={() => navigation.navigate('SettingsHomePageScreen')}>
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image source={images.profilepic} style={styles.profileImage} />
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.userHandle}>@johnbrown_12</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.statisticsSection}>
            <View style={styles.statisticsRow}>
              <View style={styles.statisticBox1}>
                <Text style={styles.statisticValue}>45</Text>
                <Text style={styles.statisticLabel}>Quizzle</Text>
              </View>
              <View style={styles.statisticBox2}>
                <Text style={styles.statisticValue}>5.6M</Text>
                <Text style={styles.statisticLabel}>Plays</Text>
              </View>
              <View style={styles.statisticBox}>
                <Text style={styles.statisticValue}>16.8M</Text>
                <Text style={styles.statisticLabel}>Rank</Text>
              </View>
            </View>
          </View>

           <Text style={styles.statisticsTitle}>My Statistics</Text>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Your Point this Week</Text>
            <View style={styles.chart}>
              <Text style={{ color: '#FFF' }}>Chart goes here</Text>
            </View>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={styles.achievementsTitle}>Your Achievements</Text>
            <View style={styles.achievementGrid}>
              {achievements.map(achievement => (
                <View key={achievement.id} style={styles.achievementItem}>
                  <View style={styles.iconAndValue}>
                    <Image source={achievement.icon} style={styles.achievementIcon} />
                    <Text style={styles.achievementValue}>{achievement.value}</Text>
                  </View>
                  <Text style={styles.achievementText}>{achievement.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView> 
      </SafeAreaView>
      <Footer navigation={navigation} />
    </ImageBackground>
  );
};

const Footer = ({ navigation }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HomePageScreen')}>
      <SimpleLineIcons name="home" size={32} color="#000" />
      <Text style={styles.footerText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ProfilePage')}>
      <Ionicons name="person" size={32} color="#000" />
      <Text style={styles.footerText}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('LeaderBoard')}>
      <Ionicons name="trophy-outline" size={32} color="#000" />
      <Text style={styles.footerText}>Leaderboard</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SettingsHomePageScreen')}>
      <Ionicons name="options-outline" size={32} color="#000" />
      <Text style={styles.footerText}>Settings</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: hp(-3.2),
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: hp(2),
    paddingBottom: hp(1),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    right: wp(10),
    fontFamily: 'Nunito',
  },
  coinContainer: {
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  coinborder: {
    right: -2,
    backgroundColor: 'blue',
    width: 27,
    height: 27,
    borderRadius: 15,
    alignItems: 'center',
  },
  coinText: {
    left: -4,
    marginLeft: 4,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  coinImage: {
    top: 2,
    alignSelf: 'center',
    width: 22,
    height: 22,
  },
  badgeImage: {
    marginLeft: 7,
    width: 37,
    height: 37,
  },
  notificationIcon: {
    marginLeft: 7,
    fontSize: 29,
    color: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: hp(0),
  },
  usernameContainer: {
    flex: 0.7,
    marginLeft: 3,
  },
  username: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  userHandle: {
    fontSize: 16,
    color: '#FFFFFF',
    top: 7,
  },
  editProfileButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    position: 'absolute',
    right: wp(5),
    alignSelf: 'center',
  },
  editProfileButtonText: {
    color: '#1C58F2',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  statisticsSection: {
    // borderColor:"black",
    // borderWidth:1
    marginTop: hp(2),
    marginHorizontal:wp(4),
    paddingHorizontal: 16,
    padding: 5,
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderTopWidth:1

  },
  statisticsTitle: {
    marginTop:30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    // borderWidth:2,
    marginLeft:14
   
    
  },
  statisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    // borderRadius: 10,
    
    
  },
  statisticBox: {
    alignItems: 'center',
    flex: 1,
    borderColor:"#FFFFFF",
    // borderRightWidth:2
  },
  statisticBox1: {
    alignItems: 'center',
    flex: 1,
    borderColor:"#FFFFFF",
    borderRightWidth:1
  },
  statisticBox2: {
    alignItems: 'center',
    flex: 1,
    borderColor:"#FFFFFF",
    borderRightWidth:1
  },
  statisticValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  statisticLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: hp(2),
    paddingHorizontal:0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingVertical: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: hp(1),
    textAlign: 'center',
  },
  chart: {
    alignItems: 'center',
  },
  achievementsSection: {
    marginTop: hp(2),
    paddingHorizontal: 16,
  },
  achievementsTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: hp(1),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 10,
  },
  achievementItem: {
    alignItems: 'center',
    width: '45%',
    marginVertical: 6,
    borderColor: '#887272',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor:"#FFFFFF",
    
  },
  iconAndValue: {
    flexDirection: 'row',
    alignItems: 'center',
    
    width:"75%",
  },
  achievementIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
    
  },
  achievementText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  achievementValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
    fontFamily: 'Nunito',
  },
  footerIcon: {
    fontSize: 32,
  },
});

export default ProfilePage;
