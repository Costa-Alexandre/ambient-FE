import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Home() {

    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Logged</Text>
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