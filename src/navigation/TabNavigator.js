import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';
import { Home } from 'screens';
import { CustomIcon } from 'ui';
import { colorStyles } from 'styles';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconColor = focused ? colorStyles.text : colorStyles.textSecondary;
            return <CustomIcon name={route.name} size={20} color={iconColor} />;
          },
          tabBarInactiveBackgroundColor: colorStyles.card,
          tabBarActiveBackgroundColor: colorStyles.card,
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