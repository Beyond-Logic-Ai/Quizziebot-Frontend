import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import CustomButton from '../components/CustomButton';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={images.title} style={styles.titleImage} resizeMode="contain" />
        <View style={styles.botImageContainer}>
          <Svg height="80%" width="80%" viewBox="0 0 100 100" style={styles.gradient}>
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                r="50%"
                gradientUnits="userSpaceOnUse"
              >
                <Stop offset="0%" stopColor="#FBFCF6" stopOpacity=".6" />
                <Stop offset="100%" stopColor="#1C58F2" stopOpacity="1" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100" height="100" fill="url(#grad)" />
          </Svg>
          <Image source={images.logo1} style={styles.botImage} resizeMode="contain" />
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton 
            title="START"
            screenName="Second"
          />
          <Text style={styles.text}>Copyright © 2024 Beyond Logic</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C58F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.05,
  },
  titleImage: {
    width: '80%',
    height: height * 0.17,
    marginTop: height * 0.04,
    top:-hp(1)
   
    
  },
  botImageContainer: {
    width: wp(80), // Ensure square dimensions for perfect circle
    height: wp(80), // Use widthPercentageToDP for responsive sizing
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.05,
    position: 'relative',
    overflow: 'hidden',
    top:-hp(2),
    // borderWidth:2
    

  },
  gradient: {
    width:"100%",
    height:"100%",
    position: 'absolute',
    top:hp(6)
    
  },
  botImage: {
    width: wp(80), // Adjust this to fit the image within the circle
    height: wp(80),
    resizeMode: 'contain',
    
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop:hp(2),
    marginBottom: hp(1)
  },
  text: {
    color: '#FBFCF6',
    fontWeight: 'bold',
    marginTop: hp(2),
    fontFamily: 'Nunito',
  },
});

export default HomeScreen;
