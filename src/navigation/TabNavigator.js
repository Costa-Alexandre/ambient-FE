import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from 'screens/home/Home';
import CustomIcon from 'ui/CustomIcon';
import { colorStyles } from 'styles/colorStyles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconColor = focused ? 'white': '#ffffff50';
            return <CustomIcon name={route.name} size={20} color={iconColor} />;
          },
          tabBarInactiveBackgroundColor: '#1b1b1fff',
          tabBarActiveBackgroundColor: '#1b1b1fff',
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="clips" component={Home} />
        <Tab.Screen name="search" component={Home} />
        <Tab.Screen name="message" component={Home} />
      </Tab.Navigator>
  );
}