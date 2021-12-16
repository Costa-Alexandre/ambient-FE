import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fontStyles, colorStyles } from 'styles'

import Logotype from 'assets/icons/Logotype';
import Logomark from 'assets/icons/Logomark';

export default function Placeholder() {
  return (
    <View style={styles.logoContainer}>
      <View style={{width:60, height:60, marginBottom: 20}}>
        <Logomark />
      </View>
      <Text style={[fontStyles.subtitle, styles.demoText]}>
      THIS FEATURE IS NOT AVAILABLE {'\n'}
      FOR THIS DEMO</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: "#000",
  },
  demoText: {
    color: colorStyles.text,
    textAlign: 'center'
  },
});
