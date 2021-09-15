import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, ScrollView, View } from 'react-native';
import AllButtons from './components/buttons/AllButtons';
import Header from './components/navigation/Header';
import NavigationBar from './components/navigation/NavigationBar';


export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <AllButtons />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
