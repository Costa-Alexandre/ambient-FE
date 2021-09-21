import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Home from './screens/Home';
import AllButtons from './screens/AllButtons';
import AllUsers from './screens/AllUsers';
import Fonts from './screens/Fonts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createIconSetFromIcoMoon } from '@expo/vector-icons'

  const Icon = createIconSetFromIcoMoon(
    require('./assets/fonts/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
  );

// Load custom fonts from the assets folder
export default function App() {
  let [fontsLoaded] = useFonts({
    'clarity-city-bold': require('./assets/fonts/ClarityCity-Bold.otf'),
    'clarity-city-medium': require('./assets/fonts/ClarityCity-Medium.otf'),
    'clarity-city-semibold': require('./assets/fonts/ClarityCity-SemiBold.otf'),
    'IcoMoon': require('./assets/fonts/icomoon.ttf')
  })

const Stack = createNativeStackNavigator();

  if (fontsLoaded) {
    return (
      // <View style={styles.container}>
      //   <Icon name="Spotify-icon" size={50} color="#37BB64" />
      // </View>

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
          name="User" 
          component={AllUsers} 
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
