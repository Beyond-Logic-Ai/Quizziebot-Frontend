import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ImageBackground, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const EditProfilePage = ({ navigation }) => {
  const [coins, setCoins] = useState(0);
  const [userData, setUserData] = useState({
    userId: '', // Include userId in the state
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

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
        setUserData({
          userId: data.userId, // Store the userId
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
        setCoins(data.coins != null ? data.coins : 0);
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
      return () => {};
    }, [fetchUserData])
  );

  const handleSave = async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const { token } = JSON.parse(userSession);

        const response = await axios.patch('https://api.quizziebot.com/api/profile/update', userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          alert('Profile updated successfully');
          await AsyncStorage.removeItem('userSession');
          navigation.navigate('SignInFirst');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

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
            {/* <Image source={images.badge} style={styles.badgeImage} />
            <TouchableOpacity onPress={() => navigation.navigate('SettingsHomePageScreen')}>
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={styles.notificationIcon} />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image source={images.profilepic} style={styles.profileImage} />
          <TouchableOpacity style={styles.editProfileIcon}>
            <Ionicons name="pencil" size={wp(6)} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {['username', 'firstName', 'lastName', 'email'].map((field, index) => (
            <View key={index} style={styles.infoSection}>
              <Text style={styles.infoLabel}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}</Text>
              <TextInput
                style={styles.infoTextInput}
                value={userData[field]}
                onChangeText={(text) => setUserData({ ...userData, [field]: text })}
                autoCapitalize="none"
              />
            </View>
          ))}
          <TouchableOpacity style={styles.editProfileButton} onPress={handleSave}>
            <Text style={styles.editProfileButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
    backgroundColor: '#003f5c',
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
    right: wp(20),
    fontFamily: 'Nunito',
  },
  coinContainer: {
    right:wp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  coinborder: {
    right: -2,
    backgroundColor: '#0048BF',
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
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  profileImage: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(5),
  },
  editProfileIcon: {
    position: 'absolute',
    right: wp(38),
    bottom: wp(0),
    backgroundColor: '#FFF',
    borderRadius: wp(2),
    padding: wp(1),
  },
  infoSection: {
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    borderColor: "#FFF",
    borderBottomWidth: wp(0.2),
    paddingVertical: wp(1.5),
  },
  infoLabel: {
    fontSize: wp(3),
    color: '#FFFFFF',
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  infoTextInput: {
    fontSize: wp(4.5),
    color: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    marginTop: wp(2),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    autoCapitalize: 'none',
  },
  editProfileButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: wp(5),
  },
  editProfileButtonText: {
    color: '#1C58F2',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
});

export default EditProfilePage;
