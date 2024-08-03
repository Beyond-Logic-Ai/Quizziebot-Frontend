
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

const mockLeaderboardData = [
  { id: 1, name: 'Bobby Gantasala Fisher', points: 36, avatar: images.profilepic },
  { id: 2, name: 'sandeeo Cormier', points: 35, avatar: images.profilepic },
  { id: 3, name: 'You', points: 34, avatar: images.profilepic },
  { id: 4, name: 'Dronacharya Schmidt', points: 33, avatar: images.profilepic },
  { id: 5, name: 'Kalki Veum', points: 32, avatar: images.profilepic },
  { id: 6, name: 'Bobby Gantasala', points: 31, avatar: images.profilepic },
  { id: 7, name: 'Sandeep Sanford', points: 31, avatar: images.profilepic },
  { id: 8, name: 'Drona Sanford', points: 31, avatar: images.profilepic },
  { id: 9, name: 'gantasala Sanford', points: 31, avatar: images.profilepic },
  { id: 10, name: 'Gary Sanford', points: 31, avatar: images.profilepic },
  { id: 11, name: 'Gary Sanford', points: 31, avatar: images.profilepic },
  { id: 12, name: 'Gary Sanford', points: 31, avatar: images.profilepic },
  { id: 13, name: 'Gary Sanford', points: 31, avatar: images.profilepic },

];

const LeaderBoard = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState(mockLeaderboardData); // Use mock data for testing
  const [activeTab, setActiveTab] = useState('Global');
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
        setLeaderboard(data.leaderboard || mockLeaderboardData); // Fallback to mock data if needed

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
      }, 500);
    }
  }, [loading]);

  const renderTopThree = () => {
    return (
      <View style={styles.topThreeContainer}>
        <View style={styles.topThreeContainercurve}>
          <View style={styles.topThreeItem2}>
            <Image source={images.profilepic} style={styles.topThreeAvatar2} />
            <View style={styles.topnum2}>
                <Text style={{ marginTop: 3, color: "#FFFFFF",fontWeight:"bold",fontSize:20 }} >2</Text>
            </View>
            <Text style={styles.topThreeName}>Jackson</Text>
            <Text style={styles.topThreePoints}>1847</Text>
            <Text style={styles.userid2}>@username</Text>
          </View>
          <View style={styles.topThreeItemFirst}>
            <Image source={images.crown} style={styles.crownImage} />
            <Image source={images.profilepic} style={styles.topThreeAvatar} />
            <View style={styles.topnum1}>
                <Text style={{ marginTop: 3, color: "#FFFFFF",fontWeight:"bold",fontSize:20 }} >1</Text>
            </View>
            <Text style={styles.topThreeName1}>Eiden biden</Text>
            <Text style={styles.topThreePoints1}>243022</Text>
            <Text style={styles.userid}>@username</Text>
          </View>
          <View style={styles.topThreeItem3}>
            <Image source={images.profilepic} style={styles.topThreeAvatar3} />
            <View style={styles.topnum3}>
                <Text style={{ marginTop: 3, color: "#FFFFFF",fontWeight:"bold",fontSize:20 }} >3</Text>
            </View>
            <Text style={styles.topThreeName}>Emma Aria</Text>
            <Text style={styles.topThreePoints}>1674</Text>
            <Text style={styles.userid3}>@username</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points} pts</Text>
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
    <TouchableOpacity style={styles.footerButton}onPress={() => navigation.navigate('LeaderBoard')}>
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
    marginTop: 30,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 60,
  },
  topThreeContainercurve:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '95%',
    marginTop: 80,
    height: hp(12),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#F0F0F0"
  },
  topThreeItem: {
    alignItems: 'center',
    width: wp(25),
  },
  topThreeItemFirst: {
    alignItems: 'center',
    width: wp(30),
    height: hp(18),
    top: -hp(3),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    
  },

  topThreeItem2:{
    alignItems: "center",
    top: -40,
    marginLeft: 30
    
  },
  topThreeItem3:{
    alignItems: "center",
    top: -40,
    marginRight: 30
  },
  topThreeAvatar: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderColor: "#FFAA00",
    borderWidth: 4,
    marginBottom: 5,
    top: -79
  },
  topThreeAvatar2: {
    width: 80,
    height: 80,
    borderRadius: 60,
    borderColor: "#009BD6",
    borderWidth: 4,
    marginBottom: 5,
    bottom:-24
  },
  topnum2:{
    width: 30,
    height: 30,
    // textAlignVertical:"center",
   alignItems:"center",
    // borderColor: "#009BD6",
    borderRadius:20,
    backgroundColor:"#009BD6"
    
  },
  topnum3:{
    width: 30,
    height: 30,
    // textAlignVertical:"center",
   alignItems:"center",
    // borderColor: "#009BD6",
    borderRadius:20,
    backgroundColor:"#00D95F"
    
  },
  topnum1:{
    width: 30,
    height: 30,
    // textAlignVertical:"center",
   alignItems:"center",
    // borderColor: "#009BD6",
    borderRadius:20,
    backgroundColor:"#FFAA00",
    top:-99
    
  },
  topThreeAvatar3: {
    width: 80,
    height: 80,
    borderRadius: 60,
    borderColor: "#00D95F",
    borderWidth: 4,
    marginBottom: 5,
    bottom:-24
  },
  crownImage: {
    width: 40,
    height: 40,
    top: -75
  },
  topThreeName: {
    // flexDirection:"row",
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Nunito',
  },
  topThreeName1: {
    // flexDirection:"row",
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    top:-80,
    fontFamily: 'Nunito',
   
  },
  topThreePoints: {
    fontSize: 14,
    alignSelf: "center",
    color: '#000000',
    fontFamily: 'Nunito',
    // fontWeight:"bold"
  },
  topThreePoints1: {
    fontSize: 14,
    alignSelf: "center",
    color: '#000000',
    top:-80,
    fontFamily: 'Nunito',
  },
  userid:{
    top:-80,
    fontFamily: 'Nunito',
    
  },
  userid2:{
    fontFamily: 'Nunito',
  },
  userid3:{
    fontFamily: 'Nunito',
  },
  leaderboardHeader: {
    height: hp(5.5),
    width: wp(85),
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 20,
    marginHorizontal: wp(8),
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
  },
  tab: {
    height: "auto",
    width: "40%",
  },
  activeTab: {
    // backgroundColor: '#0048BF',
    
    borderColor:"#0048BF",
    borderBottomWidth:4
  },
  tabText: {
    alignSelf: "center",
    fontSize: 20,
    top: hp(.8),
    fontWeight: "bold",
    fontFamily: 'Nunito',
    color: '#0048BF',
  },
  activeTabText: {
    color: '#0048BF',
  },
  leaderboard: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    marginBottom:-hp(5)
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal:10,
    
    backgroundColor:"#FFFFFF"
    
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Nunito',
    
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    

  },
  name: {
    flex:.7,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Nunito',
  },
  points: {
    fontSize: 16,
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
