// app/Navigation.js
import React, { useEffect, useState, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../app/screens/SplashScreen';
import HomeScreen from '../app/screens/HomeScreen';
import SecondScreen from '../app/screens/SecondScreen';
import SignInFirst from '../app/screens/SignInFirst';
import ForgotPasswordScreen from '../app/screens/ForgotPasswordScreen';
import CreateNewPasswordScreen from '../app/screens/CreateNewPasswordScreen';
import CreateAnAccountScreen1 from '../app/screens/CreateAnAccountScreen1';
import CreateAnAccountScreen2 from '../app/screens/CreateAnAccountScreen2';
import AfterSignedScreen from '../app/screens/AfterSignedScreen';
import SignUpSuccessScreen from '../app/screens/SignUpSuccessScreen';
import HomePageScreen from '../app/screens/HomePageScreen';
import SettingsHomePageScreen from '../app/screens/SettingsHomePageScreen';
import ArcadePage from '../app/screens/AracdePage';
import LoadingScreen from '../app/screens/LoadingScreen';
import QuizQuestionScreen from '../app/screens/QuizQuestionScreen';
import QuizResultScreen from '../app/screens/QuizResultScreen';
import CreatingOwnQuizPage from './screens/CreatingOwnQuizPage';
import ArcadeLoadingScreen from '../app/screens/ArcadeLoadingScreen';
import ArcadeCategory from '../app/screens/ArcadeCategory';
import ArcadeModes from '../app/screens/ArcadeModes';
import ArcadeResult from '../app/screens/ArcadeResult';
import ArcadeQuestionScreen from '../app/screens/ArcadeQuestionScreen';
import BackgroundMusic from '../app/components/BackgroundMusic';
import { BackgroundMusicContext } from '../app/context/BackgroundMusicContext';
import MusicAndEffectsScreen from '../app/screens/MusicAndEffectsScreen';
import ProfilePage from '../app/screens/ProfilePage';
import LeaderBoard from '../app/screens/LeaderBoard';
import EditProfilePage from '../app/screens/EditProfilePage';
import OwnQuizWelcomePage from '../app/screens/OwnQuizWelcomePage';
import OwnQuizChatPage from '../app/screens/OwnQuizChatPage';
const Stack = createNativeStackNavigator();

function Navigation() {
  const [initialRoute, setInitialRoute] = useState('Splash');
  const { setIsPlaying } = useContext(BackgroundMusicContext);
  const routeNameRef = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          setInitialRoute('HomePageScreen');
        } else {
          setInitialRoute('SecondScreen');
        }
      } catch (error) {
        console.error('Failed to check user session:', error);
        setInitialRoute('SecondScreen');
      }
    };

    checkUserSession();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (currentRouteName === 'Splash') {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="HomePageScreen"
          component={HomePageScreen}
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="Second" component={SecondScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="SignInFirst" component={SignInFirst} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="CreateAnAccountScreen1" component={CreateAnAccountScreen1} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="CreateAnAccountScreen2" component={CreateAnAccountScreen2} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="AfterSignedScreen" component={AfterSignedScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="SignUpSuccessScreen" component={SignUpSuccessScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="SettingsHomePageScreen" component={SettingsHomePageScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="ArcadePage" component={ArcadePage} options={{ headerShown: false , animation: 'fade'}} /> 
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="QuizQuestionScreen" component={QuizQuestionScreen} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="QuizResultScreen" component={QuizResultScreen} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="ArcadeLoadingScreen" component={ArcadeLoadingScreen} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="ArcadeCategory" component={ArcadeCategory} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="ArcadeModes" component={ArcadeModes} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="ArcadeResult" component={ArcadeResult} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="ArcadeQuestionScreen" component={ArcadeQuestionScreen} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="CreatingOwnQuizPage" component={CreatingOwnQuizPage} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="MusicAndEffectsScreen" component={MusicAndEffectsScreen} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="EditProfilePage" component={EditProfilePage} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="OwnQuizWelcomePage" component={OwnQuizWelcomePage} options={{headerShown: false , animation: 'fade'}}/>
        <Stack.Screen name="OwnQuizChatPage" component={OwnQuizChatPage} options={{headerShown: false , animation: 'fade'}}/>
      </Stack.Navigator>
      {routeNameRef.current !== 'Splash' && <BackgroundMusic />}
    </NavigationContainer>
  );
}

export default Navigation;