import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Fonts() {

    return (
      <View style={styles.page}>
        <Text>MOBILE</Text>
        <Text>title</Text>
        <Text>section</Text>
        <Text>button</Text>
        <Text>subtitle</Text>
        <Text>body</Text>
        <Text>titleSecondary</Text>
        <Text>subtitleSecondary</Text>
        <Text>bodySecondary</Text>
        <Text>subtext</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 64,
  },
  text: {
    marginBottom: 10,
  },
});