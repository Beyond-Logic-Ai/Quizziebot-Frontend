import React, { useEffect, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
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
        <View style={styles.headerContainer}>
                 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                     <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                 </View>
      

        {/* Main Content */}
        <View style={styles.robotContainer}>
          <Image source={images.arcaderobo} style={styles.robotImage} />
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.title}>Pick your path: Creator, Classic, or Arcade. Dive in!</Text>
          
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
            
         
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
    
  //   borderWidth:2
  // },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: hp(2),
   
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotContainer: {
    alignItems: 'center',
    
    marginBottom:wp(12)
  },
  robotImage: {
    width: wp(60),
    height: wp(60),
    aspectRatio: 1,
    
  },
  mainContent: {
    height:wp(70),
    width:wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical:wp(3),
    borderRadius: wp(5),
    marginHorizontal: wp(6),
    marginBottom: hp(8),
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  title: {
    fontSize: wp(4),
    textAlign: 'center',
    color: '#FFF',
    marginTop: -hp(2),
    marginBottom:hp(3),
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
