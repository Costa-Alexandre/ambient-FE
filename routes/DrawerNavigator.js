import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import myComponents from '../screens/myComponents';
import RealApp from '../screens/RealApp';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Components">
        <Drawer.Screen
          name="Components"
          component={myComponents}
          options={{ drawerLabel: 'Components' }}
        />
        <Drawer.Screen
          name="Real App"
          component={RealApp}
          options={{ drawerLabel: 'Real App' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}