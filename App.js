import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigator from './routes/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './routes/DrawerNavigator';

// Load custom fonts from the assets folder
export default function App() {
  let [fontsLoaded] = useFonts({
    'clarity-city-bold': require('./assets/fonts/ClarityCity-Bold.otf'),
    'clarity-city-medium': require('./assets/fonts/ClarityCity-Medium.otf'),
    'clarity-city-semibold': require('./assets/fonts/ClarityCity-SemiBold.otf'),
    'IcoMoon': require('./assets/fonts/icomoon.ttf')
  })

  if (fontsLoaded) {
    return (
      <MyDrawer />
    );
  } else {
    return (
      <AppLoading />
    );
  }
}