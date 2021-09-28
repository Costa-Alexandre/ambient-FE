import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontStyles } from '../styles/fontStyles';

export default function Fonts() {

    return (
      <View style={styles.page}>
        <Text>MOBILE</Text>
        <Text style={fontStyles.title}>title</Text>
        <Text style={fontStyles.section}>section</Text>
        <Text style={fontStyles.button}>button</Text>
        <Text style={fontStyles.subtitle}>subtitle</Text>
        <Text style={fontStyles.body}>body</Text>
        <Text style={fontStyles.titleSecondary}>titleSecondary</Text>
        <Text style={fontStyles.subtitleSecondary}>subtitleSecondary</Text>
        <Text style={fontStyles.bodySecondary}>bodySecondary</Text>
        <Text style={fontStyles.subtext}>subtext</Text>
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