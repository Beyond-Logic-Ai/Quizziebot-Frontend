import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './app/Navigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundMusicProvider } from './app/context/BackgroundMusicContext';
import backgroundMusicManager from './app/managers/BackgroundMusicManager';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'NegritaProOblique':require('./assets/fonts/NegritaProOblique.ttf'),
    'NegritaPro':require('./assets/fonts/NegritaPro.ttf')
  });

  const [isMusicLoaded, setIsMusicLoaded] = useState(false);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
    const prepareSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    };
    prepareSplashScreen();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const controlBackgroundMusic = async () => {
      const savedPreference = await AsyncStorage.getItem('isMusicEnabled');
      const isMusicEnabled = savedPreference === 'true';

      if (isMusicEnabled && !isMusicLoaded) {
        await backgroundMusicManager.loadMusic();
        setIsMusicLoaded(true);
        backgroundMusicManager.play();
      } else if (!isMusicEnabled && isMusicLoaded) {
        backgroundMusicManager.pause();
      }
    };

    controlBackgroundMusic();

    return () => {
      backgroundMusicManager.pause();
    };
  }, [isMusicLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BackgroundMusicProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </BackgroundMusicProvider>
  );
}
