import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Buttons from '../screens/Buttons';
import Icons from '../screens/Icons';
import Fonts from '../screens/Fonts';

export default function Navigator() {

  const Stack = createNativeStackNavigator();
    
  return (
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#fff'} }}
        >
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: 'Components'}} />
        <Stack.Screen 
          name="Buttons" 
          component={Buttons} 
          />
          <Stack.Screen
          name="Fonts"
          component={Fonts}
          />
          <Stack.Screen
          name="Icons"
          component={Icons}
          />
      </Stack.Navigator>
    )
}

