
import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ImageBackground, ActivityIndicator, TextInput, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const countries = [
  'United States', 'Canada', 'United Kingdom', 'India', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
  // Add more countries here...
];

const EditProfilePage = ({ navigation }) => {
  const [coins, setCoins] = useState(0);
  const [userData, setUserData] = useState({
    username: 'John_Brown12',
    firstName: 'John',
    lastName: 'Brown',
    email: 'john.brown@bu.edu',
    dob: new Date('1995-12-27'),
    country: 'United States',
  });
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);

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
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dob: new Date(data.dob),
          country: data.country,
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

        const response = await axios.post('https://api.quizziebot.com/api/update-profile', userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          alert('Profile updated successfully');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || userData.dob;
    setShowDatePicker(false);
    setUserData({ ...userData, dob: currentDate });
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setUserData({ ...userData, country: item });
      setShowCountryModal(false);
    }}>
      <View style={styles.countryItem}>
        <Text style={styles.countryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

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
              />
            </View>
          ))}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.infoTextInput, { color: userData.dob ? '#FFF' : '#999' }]}>
                {userData.dob ? userData.dob.toDateString() : 'Enter your date of birth'}
              </Text>
              <Ionicons name="calendar" size={24} color="#FFF" style={styles.inlineIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Country</Text>
            <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowCountryModal(true)}>
              <Text style={[styles.infoTextInput, userData.country ? styles.inputSelected : styles.inputPlaceholder]}>
                {userData.country || 'Select Country'}
              </Text>
              <Ionicons name="chevron-down" size={24} color="#FFF" style={styles.inlineIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.editProfileButton} onPress={handleSave}>
            <Text style={styles.editProfileButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={showCountryModal}
          onRequestClose={() => setShowCountryModal(false)}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Your Country or Region</Text>
                <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                  <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={countries}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.countryList}
              />
            </View>
          </View>
        </Modal>

        {showDatePicker && (
          <Modal
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={userData.dob}
                  mode="date"
                  display="spinner"
                  onChange={onChangeDate}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                />
                <TouchableOpacity
                  onPress={() => setShowDatePicker(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
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
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  coinText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  coinImage: {
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
  },
  datePicker: {
    width: '100%',
    marginTop: wp(2),
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inlineIcon: {
    position: 'absolute',
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countryList: {
    width: '100%',
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  countryText: {
    fontSize: 16,
    color: '#000',
  },
  datePickerContainer: {
    backgroundColor: '#000',
    padding: 30,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: '#1877F2',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputPlaceholder: {
    color: '#999',
  },
  inputSelected: {
    color: '#FFF',
  },
});

export default EditProfilePage;
