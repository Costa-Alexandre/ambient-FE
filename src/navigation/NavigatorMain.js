import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Login, Show } from 'screens';
import TabNavigator from './TabNavigator'

export default function NavigatorMain() {

  const Stack = createNativeStackNavigator();
    
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="transparent" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }} >
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{ title: 'Login / Sign Up'}} />
          <Stack.Screen 
            name="Home" 
            component={TabNavigator} />
          <Stack.Screen 
            name="Show" 
            component={Show} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

