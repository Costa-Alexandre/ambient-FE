import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import MainContextProvider from './store/MainProvider';
import { NavigatorMain } from 'navigation'
import { loadFonts } from 'helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorStyles } from "styles";


export default function App() {
    const fontsLoaded = loadFonts();

    return (
    <MainContextProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: colorStyles.background}}>
        {!fontsLoaded && (<AppLoading />)}
        { fontsLoaded && (<NavigatorMain />)}
      </SafeAreaView>
    </MainContextProvider>
    );
};