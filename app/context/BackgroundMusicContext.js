// context/BackgroundMusicContext.js
import React, { createContext, useState } from 'react';

export const BackgroundMusicContext = createContext();

export const BackgroundMusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};
