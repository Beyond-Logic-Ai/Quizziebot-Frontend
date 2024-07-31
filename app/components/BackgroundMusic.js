// components/BackgroundMusic.js
import React, { useEffect } from 'react';
import { Audio } from 'expo-av';
import { sounds } from '../../constants/sounds';

const BackgroundMusic = () => {
  useEffect(() => {
    let soundObject = new Audio.Sound();

    const playMusic = async () => {
      try {
        await soundObject.loadAsync(sounds.gamebgm);
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
      } catch (error) {
        console.log(error);
      }
    };

    playMusic();

    return () => {
      soundObject.unloadAsync();
    };
  }, []);

  return null;
};

export default BackgroundMusic;
