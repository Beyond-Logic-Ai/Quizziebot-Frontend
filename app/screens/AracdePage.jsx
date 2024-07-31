import React, { useEffect, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ClassicButton from '../components/ClassicButton';
import ArcadeButton from '../components/ArcadeButton';
import CreateQuizzieButton from '../components/CreateQuizzieButton';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: screenHeight } = Dimensions.get('window');

const ArcadePage = ({ navigation }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const { userId } = JSON.parse(userSession);
        setUserId(userId);
      } else {
        navigation.navigate('SignInFirst');
      }
    };
    fetchUserId();
  }, []);

  return (
    <ImageBackground source={images.homescreenbg1} style={styles.backgroundImage} blurRadius={15}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePageScreen')}>
            <Icon name="arrow-back" size={wp(6)} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.robotContainer}>
          <Image source={images.arcaderobo} style={styles.robotImage} />
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.title}>Pick your path: Creator, Classic, or Arcade. Dive in!</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ClassicButton
              title="Classic"
              screenName="LoadingScreen"
              image={images.classicimg}
              navigation={navigation}
              userId={userId}
            />
            <ArcadeButton
              title="Arcade"
              screenName="ArcadeCategory"
              image={images.arcadeimg}
              navigation={navigation}
            />
            
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4%',
  },
  backButton: {
    marginRight: '4%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotContainer: {
    alignItems: 'center',
    marginBottom: '-5%',
  },
  robotImage: {
    width: wp(30),
    height: hp(30),
    aspectRatio: 1,
    marginTop: '2%',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: '5%',
    borderRadius: wp(5),
    marginHorizontal: wp(6),
    marginTop: hp(0),
    marginBottom: hp(8),
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  title: {
    fontSize: wp(5),
    textAlign: 'center',
    color: '#FFF',
    marginTop: hp(2),
    marginBottom: hp(-1),
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '4%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingBottom: hp(3),
    paddingHorizontal: '5%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: wp(6),
    height: wp(6),
  },
  footerText: {
    fontSize: wp(3),
    color: '#000',
  },
});

export default ArcadePage;
