import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { images } from '../../constants/images'; // Ensure th    e path is correct

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.innerContainer}>
          <Image source={images.title} style={styles.titleImage} resizeMode="contain" />
          <Image source={images.logo1} style={styles.botImage} resizeMode="contain" />
          <View style={styles.bottomContainer}>
            <CustomButton 
              title="START"
              screenName="Second"
            />
            <Text style={styles.text}>Copyright © 2024 Beyond Logic</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C58F2',
  },
  scrollViewContainer: {
    flexGrow: 1,
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
    height: height * 0.15, // Increased size of the title logo
    marginTop: height * 0.05,
  },
  botImage: {
    width: '80%',
    height: height * 0.4,
    marginVertical: height * 0.05, // Added margin to center the image better
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


