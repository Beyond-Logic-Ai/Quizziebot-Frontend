import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { images } from '../../constants/images'; // Ensure the path is correct

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.innerContainer}>
          <Image source={images.title} style={styles.image} resizeMode="contain" />
          <Image source={images.logo1} style={[styles.image, styles.logoImage]} resizeMode="contain" />
          <CustomButton 
           title="START"
           screenName="Second"
          />
          <Text style={styles.text}>Copyright © 2024 Beyond Logic</Text>
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
    height: '100%',
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 317,
    height: 180,
    marginVertical: 20,
  },
  logoImage: {
    width: 348,
    height: 327,
  },
  text: {
    color: '#FBFCF6',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
