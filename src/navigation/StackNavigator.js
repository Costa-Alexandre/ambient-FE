import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Login from 'screens/login/Login';
import Show from 'screens/show/Show';
import tabNavigator from './TabNavigator'

export default function NavigatorMain() {

  const Stack = createNativeStackNavigator();
    
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ title: 'Login / Sign Up'}} />
        <Stack.Screen 
          name="App" 
          component={tabNavigator}
          />
          <Stack.Screen 
          name="Show" 
          component={Show}
          />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

