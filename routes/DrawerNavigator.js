import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import myComponents from '../screens/myComponents';
import StackNavigatorMain from './StackNavigatorMain';
import { colorStyles } from '../styles/colorStyles';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        screenOptions={{
          drawerActiveTintColor: colorStyles.accent,
          drawerType: 'slide',
          headerTitle : '',
        }}
        initialRouteName="Real App"
        >
        <Drawer.Screen
          name="Components"
          component={myComponents}
          options={{ drawerLabel: 'Components' }}
        />
        <Drawer.Screen
          name="Real App"
          component={StackNavigatorMain}
          options={{ drawerLabel: 'Real App' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}