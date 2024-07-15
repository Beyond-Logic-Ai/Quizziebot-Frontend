import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import Navigation from './app/Navigation';

export default function App() {
  useEffect(() => {
    // Lock the orientation to portrait
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return <Navigation />;
}