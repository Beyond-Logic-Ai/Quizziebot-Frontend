import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LeaderBoard = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('Global');
  const [userId, setUserId] = useState('');
  const [userCountry, setUserCountry] = useState('');

  const fetchUserData = useCallback(async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const { token } = JSON.parse(userSession);

        const userResponse = await axios.get('https://api.quizziebot.com/api/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data;
        setUsername(userData.username);
        setCoins(userData.coins != null ? userData.coins : 0);
        setUserId(userData.userId);
        setUserCountry(userData.country);

        await AsyncStorage.setItem('userId', userData.userId);

        // Fetch leaderboard and user rank data in parallel
        const [leaderboardResponse, userRankResponse] = await Promise.all([
          axios.get(
            activeTab === 'Global' ? 
              'https://api.quizziebot.com/api/leaderboard/global' : 
              `https://api.quizziebot.com/api/leaderboard/local?country=${userData.country}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.get(`https://api.quizziebot.com/api/leaderboard/user/${userData.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ]);

        const leaderboardData = leaderboardResponse.data.map(item => ({
          id: item.userId,
          name: item.username,
          points: item.score,
          avatar: images.profilepic,
        }));

        const userRankData = userRankResponse.data;
        const userRank = {
          id: userRankData.userId,
          name: userRankData.username,
          points: userRankData.score,
          avatar: images.profilepic,
        };

        // Ensure the user's rank is included only once in the leaderboard
        const updatedLeaderboard = leaderboardData.filter(item => item.id !== userRank.id);
        updatedLeaderboard.push(userRank);

        setLeaderboard(updatedLeaderboard.sort((a, b) => b.points - a.points));
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
  }, [navigation, activeTab]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();

      const interval = setInterval(() => {
        fetchUserData();
      }, 30000);

      return () => clearInterval(interval);
    }, [fetchUserData])
  );

  const renderTopThree = () => {
    if (leaderboard.length < 3) return null;
    const topThree = leaderboard.slice(0, 3);
    return (
      <View style={styles.topThreeContainer}>
        <View style={styles.topThreeContainercurve}>
          <View style={styles.topThreeItem2}>
            <Image source={images.profilepic} style={styles.topThreeAvatar2} />
            <View style={styles.topnum2}>
              <Text style={{ marginTop: wp(.5), color: "#FFFFFF", fontWeight: "bold", fontSize: wp(3) }}>2</Text>
            </View>
            <Text style={styles.topThreeName}>{topThree[1].name}</Text>
            <Text style={styles.topThreePoints}>{topThree[1].points}</Text>
            <Text style={styles.userid2}>@{topThree[1].name}</Text>
          </View>
          <View style={styles.topThreeItemFirst}>
            <Image source={images.crown} style={styles.crownImage} />
            <Image source={images.profilepic} style={styles.topThreeAvatar} />
            <View style={styles.topnum1}>
              <Text style={{ marginTop: wp(1), color: "#FFFFFF", fontWeight: "bold", fontSize: wp(3) }}>1</Text>
            </View>
            <Text style={styles.topThreeName1}>{topThree[0].name}</Text>
            <Text style={styles.topThreePoints1}>{topThree[0].points}</Text>
            <Text style={styles.userid}>@{topThree[0].name}</Text>
          </View>
          <View style={styles.topThreeItem3}>
            <Image source={images.profilepic} style={styles.topThreeAvatar3} />
            <View style={styles.topnum3}>
              <Text style={{ marginTop: wp(.5), color: "#FFFFFF", fontWeight: "bold", fontSize: wp(3) }}>3</Text>
            </View>
            <Text style={styles.topThreeName}>{topThree[2].name}</Text>
            <Text style={styles.topThreePoints}>{topThree[2].points}</Text>
            <Text style={styles.userid3}>@{topThree[2].name}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.leaderboardItem, item.id === userId && styles.currentUserItem]} key={item.id}>
      <Text style={[styles.rank, item.id === userId && styles.currentUserName]}>{index + 1}</Text>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={[styles.name, item.id === userId && styles.currentUserName]} >{item.id === userId ? 'You' : item.name}</Text>
      <Text style={[styles.points, item.id === userId && styles.currentUserName]}>{item.points} pts</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#366EFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Leaderboard</Text>
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
        <View style={styles.leaderboardHeader}>
          <TouchableOpacity style={[styles.tab, activeTab === 'Global' && styles.activeTab]} onPress={() => setActiveTab('Global')}>
            <Text style={[styles.tabText, activeTab === 'Global' && styles.activeTabText]}>Global</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'National' && styles.activeTab]} onPress={() => setActiveTab('National')}>
            <Text style={[styles.tabText, activeTab === 'National' && styles.activeTabText]}>National</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leaderboardContainer}>
          {renderTopThree()}
          <FlatList
            data={leaderboard}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.leaderboard}
          />
        </View>
      </SafeAreaView>
      <Footer navigation={navigation} />
    </View>
  );
};

const Footer = ({ navigation }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HomePageScreen')}>
      <SimpleLineIcons name="home" size={32} color="#000" />
      <Text style={styles.footerText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ProfilePage')}>
      <Ionicons name="person-outline" size={32} color="#000" />
      <Text style={styles.footerText}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('LeaderBoard')}>
      <Ionicons name="trophy" style={styles.footerIcon} />
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
    backgroundColor: '#0048BF',
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
    backgroundColor: "#0048BF",
  },
  headerTitle: {
    flex: 0.9,
    left: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  coinImage: {
    top: 2,
    alignSelf: 'center',
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
    width: 37,
    height: 37,
  },
  notificationIcon: {
    marginLeft: 7,
    fontSize: 29,
    color: '#FFFFFF',
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: wp(2.5),
  },
  topThreeContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:"center",
    width: wp(85),
    height:wp(40),
    marginTop:wp(7),
  },
  topThreeContainercurve:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: wp(85),
    marginTop: wp(30),
    height:wp(25),
    borderRadius:wp(4),
    backgroundColor: "#F0F0F0",
  },
  topThreeItemFirst: {
    alignItems: 'center',
    top: -wp(4),
    width:wp(28),
    height:wp(33),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: wp(7),
    borderTopRightRadius: wp(7),
  },
  topThreeItem2:{
    alignItems: "center",
    top: -wp(8),
    marginLeft: wp(4),
  },
  topThreeItem3:{
    alignItems: "center",
    top: -wp(8),
    marginRight: wp(4),
  },
  topThreeAvatar: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(10),
    borderColor: "#FFAA00",
    borderWidth: wp(1),
    marginBottom: hp(0),
    bottom:-wp(3),
    top: -wp(4.5)
  },
  topThreeAvatar2: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(8),
    borderColor: "#009BD6",
    borderWidth: wp(1),
    marginBottom: hp(.5),
    bottom:-hp(2)
  },
  topnum2:{
    width: wp(6),
    height: wp(5),
    alignItems:"center",
    borderRadius:wp(3),
    backgroundColor:"#009BD6"
  },
  topnum3:{
    width: wp(6),
    height: wp(5),
    alignItems:"center",
    borderRadius:wp(3),
    backgroundColor:"#00D95F"
  },
  topnum1:{
    width: wp(7),
    height: wp(6),
    alignItems:"center",
    borderRadius:wp(3),
    backgroundColor:"#FFAA00",
    top: -wp(7)
  },
  topThreeAvatar3: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(8),
    borderColor: "#00D95F",
    borderWidth: wp(1),
    marginBottom: hp(.5),
    bottom:-hp(2)
  },
  crownImage: {
    width: wp(8),
    height: wp(8),
    bottom:-wp(3.5),
    marginTop:-wp(11),
    top: -wp(4)
  },
  topThreeName: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Nunito',
  },
  topThreeName1: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#000000',
    top: -wp(7),
    fontFamily: 'Nunito',
  },
  topThreePoints: {
    fontSize: wp(3),
    alignSelf: "center",
    color: '#000000',
    fontFamily: 'Nunito',
  },
  topThreePoints1: {
    fontSize: wp(3.5),
    alignSelf: "center",
    color: '#000000',
    top: -wp(7),
    fontFamily: 'Nunito',
  },
  userid:{
    top: -wp(7),
    fontFamily: 'Nunito',
    fontSize:wp(3),
    marginBottom:wp(2)
  },
  userid2:{
    fontSize:wp(2.5),
    fontFamily: 'Nunito',
  },
  userid3:{
    fontSize:wp(2.5),
    fontFamily: 'Nunito',
  },
  leaderboardHeader: {
    height: hp(5.5),
    width: wp(85),
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: hp(2),
    marginHorizontal: wp(8),
    borderRadius: wp(2),
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
  },
  tab: {
    height: "auto",
    width: "30%",
  },
  activeTab: {
    borderColor:"#0048BF",
    borderBottomWidth:hp(0.5)
  },
  tabText: {
    alignSelf: "center",
    fontSize: wp(3.5),
    top: hp(.7),
    fontWeight: "bold",
    fontFamily: 'Nunito',
    color: '#0048BF',
  },
  activeTabText: {
    color: '#0048BF',
  },
  leaderboard: {
    flex: 1,
    marginTop:wp(13),
    backgroundColor: "#F0F0F0",
    borderRadius: wp(4),
    marginBottom:-wp(10),
    marginHorizontal:wp(2.5)
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    marginBottom: wp(1),
    marginHorizontal:wp(1),
    backgroundColor:"#FFFFFF"
  },
  currentUserItem: {
    backgroundColor: '#1C58F2', 
    color:'#1C58F2'// Highlight color for current user
  },
  rank: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Nunito',
    
  },
  avatar: {
    width: wp(6),
    height: wp(6),
    borderRadius: 20,
  },
  name: {
    flex:.9,
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Nunito',
  },
  currentUserName:{
    color: '#FFF',
  },
  points: {
    fontSize: wp(3),
    color: '#000',
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
    fontFamily: 'Nunito',
  },
  footerIcon: {
    fontSize: 32,
  },
});

export default LeaderBoard;
