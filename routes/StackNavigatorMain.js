import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/App/Login';
import Show from '../screens/App/Show';
import tabNavigator from './tabNavigator'

export default function NavigatorMain() {

  const Stack = createNativeStackNavigator();
    
  return (
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
          {/* <Stack.Screen 
          name="Show" 
          component={Show}
          /> */}
      </Stack.Navigator>
    )
}

