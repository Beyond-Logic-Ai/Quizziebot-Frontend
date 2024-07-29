// src/services/authService.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (userSession) => {
  try {
    const { token, userId } = userSession;
    await AsyncStorage.setItem('userSession', JSON.stringify({ token }));
    await AsyncStorage.setItem('userId', userId);
    console.log('User session and ID saved successfully');
  } catch (error) {
    console.error('Failed to save user session and ID:', error);
  }
};
