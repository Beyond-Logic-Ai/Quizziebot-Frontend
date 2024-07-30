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
          <Svg height="100%" width="100%" viewBox="0 0 100 100" style={styles.gradient}>
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                r="50%"
                gradientUnits="userSpaceOnUse"
              >
                <Stop offset="0%" stopColor="#FBFCF6" stopOpacity="1" />
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
    height: height * 0.15,
    marginTop: height * 0.05,
  },
  botImageContainer: {
    width: wp(70), // Ensure square dimensions for perfect circle
    height: wp(70), // Use widthPercentageToDP for responsive sizing
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.05,
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  botImage: {
    width: '100%', // Adjust this to fit the image within the circle
    height: '100%',
    resizeMode: 'contain',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  text: {
    color: '#FBFCF6',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default HomeScreen;
