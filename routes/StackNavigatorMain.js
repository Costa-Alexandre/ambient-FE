import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/App/Login';
import Home from '../screens/App/Home';

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
          name="Home" 
          component={Home} 
          />
      </Stack.Navigator>
    )
}

