import React, { useEffect, useContext, useRef } from 'react';
import { BackgroundMusicContext } from '../context/BackgroundMusicContext';
import backgroundMusicManager from '../managers/BackgroundMusicManager';

const BackgroundMusic = () => {
  const { isPlaying } = useContext(BackgroundMusicContext);
  const isMusicPlaying = useRef(false);

  useEffect(() => {
    if (isPlaying && !isMusicPlaying.current) {
      console.log("Starting background music");
      backgroundMusicManager.play();
      isMusicPlaying.current = true;
    } else if (!isPlaying && isMusicPlaying.current) {
      console.log("Pausing background music");
      backgroundMusicManager.pause();
      isMusicPlaying.current = false;
    }

    return () => {
      if (isMusicPlaying.current) {
        console.log("Stopping background music");
        backgroundMusicManager.stop();
        isMusicPlaying.current = false;
      }
    };
  }, [isPlaying]);

  return null;
};

export default BackgroundMusic;
