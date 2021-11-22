import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import StackNavigatorMain from './routes/StackNavigatorMain'

// Load custom fonts from the assets folder
export default function App() {
  let [fontsLoaded] = useFonts({
    // Naming convention from assets/fonts/weightMapping.json
    // Considering there is only one font family: Clarity City

    'Bold': require('./assets/fonts/ClarityCity-Bold.otf'),
    'Medium': require('./assets/fonts/ClarityCity-Medium.otf'),
    'SemiBold': require('./assets/fonts/ClarityCity-SemiBold.otf'),
    'IcoMoon': require('./assets/fonts/icomoon.ttf') // Icons
  })

  if (fontsLoaded) {
    return (
      <StackNavigatorMain />
    );
  } else {
    return (
      <AppLoading />
    );
  }
}