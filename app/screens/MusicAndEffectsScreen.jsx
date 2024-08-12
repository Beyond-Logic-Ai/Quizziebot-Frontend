import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import backgroundMusicManager from '../managers/BackgroundMusicManager'; // Assuming this is the correct path

const MusicAndEffectsScreen = ({ navigation }) => {
  const [isMusicEnabled, setMusicEnabled] = useState(true);
  const [isSoundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [isVibrationsEnabled, setVibrationsEnabled] = useState(true);

  // Use a ref to track the initial load of the music preference
  const initialLoad = useRef(true);

  useEffect(() => {
    // Load the music preference when the component mounts
    const loadMusicPreference = async () => {
      try {
        const musicPreference = await AsyncStorage.getItem('isMusicEnabled');
        if (musicPreference !== null) {
          setMusicEnabled(JSON.parse(musicPreference));
        }
      } catch (error) {
        console.error('Failed to load music preference:', error);
      }
    };

    loadMusicPreference();
  }, []);

  useEffect(() => {
    // Only run this effect if it's not the initial load
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    const saveMusicPreference = async () => {
      try {
        await AsyncStorage.setItem('isMusicEnabled', JSON.stringify(isMusicEnabled));
        if (isMusicEnabled) {
          backgroundMusicManager.play();
        } else {
          backgroundMusicManager.pause();
        }
      } catch (error) {
        console.error('Failed to save music preference:', error);
      }
    };

    saveMusicPreference();
  }, [isMusicEnabled]);

  return (
    <ImageBackground source={images.homescreenbg} style={styles.backgroundImage} resizeMode="cover" blurRadius={22}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Music & Effects</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Music</Text>
            <Switch
              value={isMusicEnabled}
              onValueChange={setMusicEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isMusicEnabled ? "#0044F2" : "#f4f3f4"}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Sound Effects</Text>
            <Switch
              value={isSoundEffectsEnabled}
              onValueChange={setSoundEffectsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isSoundEffectsEnabled ? "#0044F2" : "#f4f3f4"}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Vibrations</Text>
            <Switch
              value={isVibrationsEnabled}
              onValueChange={setVibrationsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isVibrationsEnabled ? "#0044F2" : "#f4f3f4"}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: hp(2),
    
  },

  headerTitle: {
    fontSize: 24,
    marginLeft:wp(10),
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Nunito',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: hp(4),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: hp(1.2),
    
  },
  optionText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
});

export default MusicAndEffectsScreen;
