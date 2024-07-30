import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SecondScreen from './screens/SecondScreen';
import SignInFirst from './screens/SignInFirst';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import CreateAnAccountScreen1 from './screens/CreateAnAccountScreen1';
import CreateAnAccountScreen2 from './screens/CreateAnAccountScreen2';
import AfterSignedScreen from './screens/AfterSignedScreen';
import SignUpSuccessScreen from './screens/SignUpSuccessScreen';
import HomePageScreen from './screens/HomePageScreen';
import SettingsHomePageScreen from './screens/SettingsHomePageScreen';
import ArcadePage from './screens/AracdePage'
import LoadingScreen from './screens/LoadingScreen';
import QuizQuestionScreen from './screens/QuizQuestionScreen';
import QuizResultScreen from './screens/QuizResultScreen';
import ArcadeLoadingScreen from './screens/ArcadeLoadingScreen';
import ArcadeCategory from './screens/ArcadeCategory';
import ArcadeModes from './screens/ArcadeModes';
import ArcadeResult from './screens/ArcadeResult';
import ArcadeQuestionScreen from './screens/ArcadeQuestionScreen';


const Stack = createNativeStackNavigator();

function Navigation() {
  const [initialRoute, setInitialRoute] = useState('Splash');

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
    <NavigationContainer>
      <Stack.Navigator  initialRouteName={initialRoute} >
      
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, animation: 'fade'}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false , animation: 'fade'}} />
        <Stack.Screen name="Second" component={SecondScreen} options={{ headerShown: false , animation: 'fade' }} />
        <Stack.Screen name="SignInFirst" component={SignInFirst} options={{ headerShown: false , animation: 'fade'}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false , animation: 'fade'}} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="CreateAnAccountScreen1" component={CreateAnAccountScreen1} options={{ headerShown: false , animation: 'fade'}} />
        <Stack.Screen name="CreateAnAccountScreen2" component={CreateAnAccountScreen2} options={{ headerShown: false , animation: 'fade'}} />
        <Stack.Screen name="AfterSignedScreen" component={AfterSignedScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="SignUpSuccessScreen" component={SignUpSuccessScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="HomePageScreen" component={HomePageScreen} options={{ headerShown: false, animation: 'fade' }} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
