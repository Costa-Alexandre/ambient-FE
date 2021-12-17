import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';
import { Home, Placeholder } from 'screens';
import { CustomIcon } from 'ui';
import { colorStyles } from 'styles';
import { MainContext } from 'store/MainProvider';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { activeShow } = useContext(MainContext);

  let averageColor = activeShow.averageColor;

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
          tabBarActiveBackgroundColor: averageColor ? 'rgba(0, 0, 0, 0.5)' : colorStyles.card,
          tabBarInactiveBackgroundColor: averageColor ? 'rgba(0, 0, 0, 0.5)' : colorStyles.card,
          tabBarStyle: activeShow._id ? 
          {
            backgroundColor: averageColor ? averageColor : colorStyles.card,
            borderTopWidth: 0,
            borderTopColor: averageColor ? averageColor : colorStyles.card
          } : styles.tabBarStyle,
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="clips" component={Placeholder} />
        <Tab.Screen name="search" component={Placeholder} />
        <Tab.Screen name="message" component={Placeholder} />
      </Tab.Navigator>
    </Host>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colorStyles.card,
    borderTopWidth: 0,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    overflow: "hidden",
  }
});