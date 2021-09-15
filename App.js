import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import Home from './screens/Home';


export default function App() {
  let [fontsLoaded] = useFonts({
      'clarity-city-bold': require('./assets/fonts/ClarityCity-Bold.otf'),
      'clarity-city-medium': require('./assets/fonts/ClarityCity-Medium.otf'),
      'clarity-city-semibold': require('./assets/fonts/ClarityCity-SemiBold.otf')
    })

  if(fontsLoaded) {
    return (
      <Home />
    );
  } else {
    return (
    <AppLoading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
