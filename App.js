import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Home from './screens/Home';
import AllButtons from './screens/AllButtons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Fonts from './screens/Fonts';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'clarity-city-bold': require('./assets/fonts/ClarityCity-Bold.otf'),
    'clarity-city-medium': require('./assets/fonts/ClarityCity-Medium.otf'),
    'clarity-city-semibold': require('./assets/fonts/ClarityCity-SemiBold.otf')
  })

  if (fontsLoaded) {
    return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#fff'} }}
        >
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: 'Components'}} />
        <Stack.Screen 
          name="Buttons" 
          component={AllButtons} 
          />
          <Stack.Screen
          name="Fonts"
          component={Fonts}
          />
      </Stack.Navigator>
    </NavigationContainer>
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
