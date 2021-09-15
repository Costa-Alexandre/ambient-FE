import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NavigationBar() {
  return (
    <View style={styles.navBar}>
      <Text style={styles.navBarText}>
        NavBar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarText: {
    color: '#fff',
  }
});