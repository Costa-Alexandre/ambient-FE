import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import MainContextProvider from './store/MainProvider';
import { NavigatorMain } from 'navigation'
import { loadFonts } from 'helpers';


export default function App() {
    const fontsLoaded = loadFonts();

    return (
    <MainContextProvider>
      {!fontsLoaded && (<AppLoading />)}
      { fontsLoaded && (<NavigatorMain />)}
    </MainContextProvider>
    );
};