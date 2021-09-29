import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Buttons from '../screens/Buttons';
import Icons from '../screens/Icons';
import Fonts from '../screens/Fonts';
import Users from '../screens/Users';

export default function Navigator() {

  const Stack = createNativeStackNavigator();
    
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { 
            backgroundColor: '#000',
            }, 
            headerTitleStyle: {
              color: '#fff',
              fontFamily: 'Bold',
            },
            headerTintColor: '#fff'
        }}
        >
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: 'Custom Components'}} />
        <Stack.Screen 
          name="Buttons" 
          component={Buttons} 
          />
          <Stack.Screen
          name="Fonts"
          component={Fonts}
          />
          <Stack.Screen
          name="User"
          component={Users}
          />
          <Stack.Screen
          name="Icons"
          component={Icons}
          />
      </Stack.Navigator>
    )
}

