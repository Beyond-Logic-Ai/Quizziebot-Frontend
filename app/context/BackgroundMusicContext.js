import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BackgroundMusicContext = createContext();

export const BackgroundMusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const loadMusicPreference = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem('isPlaying');
        if (savedPreference !== null) {
          setIsPlaying(JSON.parse(savedPreference));
        }
      } catch (error) {
        console.error('Failed to load music preference', error);
      }
    };

    loadMusicPreference();
  }, []);

  useEffect(() => {
    const saveMusicPreference = async () => {
      try {
        await AsyncStorage.setItem('isPlaying', JSON.stringify(isPlaying));
      } catch (error) {
        console.error('Failed to save music preference', error);
      }
    };

    saveMusicPreference();
  }, [isPlaying]);

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};
