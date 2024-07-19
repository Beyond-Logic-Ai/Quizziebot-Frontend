import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import Navigation from './app/Navigation';
import { useFonts } from 'expo-font';

export default function App() {
  useEffect(() => {
    // Lock the orientation to portrait
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    
  });

  return <Navigation />;
}