import React from 'react';
import { StyleSheet } from 'react-native';
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
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
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

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colorStyles.card,
    borderTopColor: colorStyles.card,
    borderTopWidth: 1,
  },
});