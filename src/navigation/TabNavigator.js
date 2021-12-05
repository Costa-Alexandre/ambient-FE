import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';
import { Home } from 'screens';
import { CustomIcon } from 'ui';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Host>
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
    </Host>
  );
}