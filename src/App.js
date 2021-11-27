import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import StackNavigator from 'navigation/StackNavigator'
import { loadFonts } from 'helpers';


export default function App() {
    const fontsLoaded = loadFonts();

    return (
    <>
      {!fontsLoaded && (<AppLoading />)}
      { fontsLoaded && (<StackNavigator />)}
    </>
    );
};