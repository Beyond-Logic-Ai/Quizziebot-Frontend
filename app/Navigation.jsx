import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SecondScreen from './screens/SecondScreen';
import SignInFirst from './screens/SignInFirst';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import CreateAnAccountScreen1 from './screens/CreateAnAccountScreen1';
import CreateAnAccountScreen2 from './screens/CreateAnAccountScreen2';
import AfterSignedScreen from './screens/AfterSignedScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false}} />
        <Stack.Screen name="Second" component={SecondScreen} options={{headerShown:false}} />
        <Stack.Screen name="Third" component={SignInFirst} options={{headerShown:false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{headerShown:false}} />
        <Stack.Screen name="CreateAnAccountScreen1" component={CreateAnAccountScreen1} options={{headerShown:false}} />
        <Stack.Screen name="CreateAnAccountScreen2" component={CreateAnAccountScreen2} options={{headerShown:false}} />
        <Stack.Screen name="AfterSignedScreen" component={AfterSignedScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
