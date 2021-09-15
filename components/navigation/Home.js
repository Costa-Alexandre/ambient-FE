import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Home() {
  return (
    <View>
      <Header />
      <ScrollView>
        <View>
          <AllButtons />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({

});