import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/App/Home';
import CustomIcon from '../components/icons/CustomIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? ''
                : '';
            } else if (route.name === 'Settings') {
              iconName = focused ? '' : '';
            }

            // You can return any component that you like here!
            return <CustomIcon name={route.name} size={20} color='#000' />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="clips" component={Home} />
        <Tab.Screen name="search" component={Home} />
        <Tab.Screen name="message" component={Home} />
      </Tab.Navigator>
  );
}